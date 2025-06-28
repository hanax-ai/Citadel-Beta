#!/usr/bin/env python3
"""
Enhanced System Validation Script with Deep Model Introspection
Version: 2.4 - NATIVE vLLM API EDITION
Designed for native vLLM API (non-OpenAI compatible)
"""

import os
import sys
import time
import signal
import subprocess
import json
import logging
import argparse
from typing import List, Dict, Any
from dataclasses import dataclass
from contextlib import contextmanager
import traceback
import psutil
import requests
from http.server import BaseHTTPRequestHandler, HTTPServer  # Handles web requests
import threading  # Lets the web server run in the background

@dataclass
class SystemConfig:
    required_users: List[str]
    required_services: List[str]
    required_ports: List[int]
    expected_service_ports: Dict[int, str]
    log_file: str
    timeout_seconds: int
    model_test_prompts: List[str]
    inference_timeout: int
    expected_model_name: str

    @classmethod
    def default(cls):
        return cls(
            required_users=["agent0", "vllm"],
            required_services=[
                "vllm.service",
                "prometheus.service", 
                "grafana-server.service",
                "prometheus-node-exporter.service"
            ],
            required_ports=[8000, 9090, 3000, 9100],
            expected_service_ports={
                8000: "python",
                9090: "prometheus",
                3000: "grafana", 
                9100: "node_exporter"
            },
            log_file="system_validation.log",
            timeout_seconds=30,
            model_test_prompts=[
                "Hello, my name is",
                "The capital of France is", 
                "In Python, a list is",
                "Complete this sentence: Artificial intelligence"
            ],
            inference_timeout=30,
            expected_model_name="meta-llama/Llama-2-7b-chat-hf"
        )

def setup_logging(level="INFO", log_file=None):
    logger = logging.getLogger("system_validator")
    logger.setLevel(getattr(logging, level.upper()))
    logger.handlers.clear()

    formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
    handler = logging.StreamHandler(sys.stdout)
    handler.setFormatter(formatter)
    logger.addHandler(handler)

    if log_file:
        try:
            fhandler = logging.FileHandler(log_file)
            fhandler.setFormatter(logging.Formatter(
                '%(asctime)s - %(name)s - %(levelname)s - %(funcName)s:%(lineno)d - %(message)s'
            ))
            fhandler.setLevel(logging.DEBUG)
            logger.addHandler(fhandler)
        except PermissionError:
            logger.warning(f"Cannot write to {log_file}, skipping file logging")

    return logger

@contextmanager
def timeout_context(seconds):
    def handler(signum, frame):
        raise TimeoutError(f"Operation timed out after {seconds} seconds")
    old_handler = signal.signal(signal.SIGALRM, handler)
    signal.alarm(seconds)
    try:
        yield
    finally:
        signal.alarm(0)
        signal.signal(signal.SIGALRM, old_handler)

def safe_subprocess_run(cmd: List[str], timeout=10, **kwargs):
    try:
        with timeout_context(timeout):
            result = subprocess.run(cmd, capture_output=True, text=True, timeout=timeout, **kwargs)
            return result
    except subprocess.TimeoutExpired:
        raise TimeoutError(f"Command timed out: {' '.join(cmd)}")
    except FileNotFoundError:
        raise FileNotFoundError(f"Command not found: {cmd[0]}")
    except Exception as e:
        raise RuntimeError(f"Command failed: {' '.join(cmd)} - {e}")

def get_proc_info(pid: int) -> Dict[str, Any]:
    try:
        if pid is None:
            return {"pid": None, "error": "No PID available"}
        
        if not psutil.pid_exists(pid):
            return {"pid": pid, "error": "Process no longer exists"}
            
        p = psutil.Process(pid)
        return {
            "pid": pid,
            "name": p.name(),
            "cmdline": " ".join(p.cmdline()) if p.cmdline() else "N/A",
            "user": p.username(),
            "status": p.status(),
            "cpu_percent": p.cpu_percent(),
            "memory_percent": round(p.memory_percent(), 2),
            "memory_info": p.memory_info()._asdict(),
            "create_time": time.ctime(p.create_time()),
            "num_threads": p.num_threads()
        }
    except Exception as e:
        return {"pid": pid, "error": f"Error getting process info: {e}"}

class NativeVLLMIntrospector:
    """Native vLLM API validation and introspection"""
    
    def __init__(self, config: SystemConfig, logger: logging.Logger):
        self.config = config
        self.logger = logger
        self.base_url = "http://192.168.10.29:8000"
        
    def discover_vllm_processes(self) -> Dict[str, Any]:
        """Analyze vLLM process details"""
        self.logger.info("🔍 Analyzing vLLM processes...")
        
        discovery = {
            "processes_found": [],
            "total_processes": 0,
            "total_memory_mb": 0,
            "total_cpu_percent": 0,
            "tensor_parallel_workers": 0
        }
        
        try:
            vllm_processes = []
            
            for proc in psutil.process_iter(['pid', 'name', 'cmdline', 'memory_info', 'cpu_percent']):
                try:
                    cmdline = proc.info['cmdline']
                    if not cmdline:
                        continue
                    
                    cmdline_str = ' '.join(cmdline)
                    
                    # Look for vLLM processes
                    if ('vllm.entrypoints.api_server' in cmdline_str or 
                        'meta-llama/Llama-2-7b-chat-hf' in cmdline_str):
                        
                        proc_detail = get_proc_info(proc.info['pid'])
                        proc_detail.update({
                            'cmdline_full': cmdline_str,
                            'memory_mb': round(proc.info['memory_info'].rss / (1024**2), 2),
                            'is_worker': '--tensor-parallel-size' in cmdline_str
                        })
                        vllm_processes.append(proc_detail)
                        
                except (psutil.NoSuchProcess, psutil.AccessDenied):
                    continue
            
            discovery["processes_found"] = vllm_processes
            discovery["total_processes"] = len(vllm_processes)
            discovery["tensor_parallel_workers"] = len([p for p in vllm_processes if p.get('is_worker')])
            
            for proc in vllm_processes:
                discovery["total_memory_mb"] += proc.get('memory_mb', 0)
                discovery["total_cpu_percent"] += proc.get('cpu_percent', 0)
            
            self.logger.info(f"🔍 Found {discovery['total_processes']} vLLM processes")
            self.logger.info(f"   Total Memory: {discovery['total_memory_mb']:.1f} MB")
            self.logger.info(f"   Total CPU: {discovery['total_cpu_percent']:.1f}%") 
            self.logger.info(f"   Tensor Parallel Workers: {discovery['tensor_parallel_workers']}")
            
        except Exception as e:
            self.logger.error(f"❌ Error discovering processes: {e}")
            discovery["error"] = str(e)
        
        return discovery
    
    def check_gpu_status(self) -> Dict[str, Any]:
        """Comprehensive GPU analysis"""
        self.logger.info("🎮 Analyzing GPU status...")
        
        try:
            result = safe_subprocess_run([
                "nvidia-smi", 
                "--query-gpu=index,name,driver_version,memory.total,memory.used,memory.free,utilization.gpu,utilization.memory,temperature.gpu",
                "--format=csv,noheader,nounits"
            ], timeout=10)
            
            if result.returncode != 0:
                return {"status": "error", "error": "nvidia-smi failed"}
            
            gpus = []
            for line in result.stdout.strip().split('\n'):
                try:
                    parts = [p.strip() for p in line.split(',')]
                    if len(parts) >= 9:
                        gpu_data = {
                            "index": int(parts[0]),
                            "name": parts[1],
                            "driver_version": parts[2],
                            "memory_total_mb": int(parts[3]),
                            "memory_used_mb": int(parts[4]),
                            "memory_free_mb": int(parts[5]),
                            "utilization_gpu": int(parts[6]),
                            "utilization_memory": int(parts[7]),
                            "temperature_c": int(parts[8]),
                            "memory_usage_percent": round((int(parts[4]) / int(parts[3])) * 100, 1)
                        }
                        gpus.append(gpu_data)
                        
                        self.logger.info(f"🎮 GPU {gpu_data['index']}: {gpu_data['name']}")
                        self.logger.info(f"   Memory: {gpu_data['memory_used_mb']}/{gpu_data['memory_total_mb']}MB ({gpu_data['memory_usage_percent']}%)")
                        self.logger.info(f"   Utilization: {gpu_data['utilization_gpu']}% GPU, {gpu_data['utilization_memory']}% Memory")
                        self.logger.info(f"   Temperature: {gpu_data['temperature_c']}°C")
                        
                except (ValueError, IndexError):
                    continue
            
            return {
                "status": "success",
                "gpu_count": len(gpus),
                "gpus": gpus,
                "total_memory_gb": sum(gpu["memory_total_mb"] for gpu in gpus) / 1024,
                "total_used_memory_gb": sum(gpu["memory_used_mb"] for gpu in gpus) / 1024
            }
            
        except Exception as e:
            self.logger.error(f"❌ GPU analysis failed: {e}")
            return {"status": "error", "error": str(e)}
    
    def test_native_api_endpoints(self) -> Dict[str, Any]:
        """Test native vLLM API endpoints"""
        self.logger.info("🌐 Testing native vLLM API endpoints...")
        
        results = {}
        
        # Test health endpoint
        try:
            self.logger.info("🧪 Testing health endpoint...")
            response = requests.get(f"{self.base_url}/health", timeout=10)
            results["health"] = {
                "status": "success",
                "status_code": response.status_code,
                "response_time": response.elapsed.total_seconds(),
                "available": response.status_code == 200,
                "response": response.text if response.status_code == 200 else None
            }
            status_icon = "✅" if response.status_code == 200 else "❌"
            self.logger.info(f"{status_icon} Health: {response.status_code} ({response.elapsed.total_seconds():.2f}s)")
            
        except Exception as e:
            results["health"] = {"status": "error", "error": str(e), "available": False}
            self.logger.error(f"❌ Health endpoint failed: {e}")
        
        # Test generate endpoint with minimal request
        try:
            self.logger.info("🧪 Testing generate endpoint...")
            test_payload = {
                "prompt": "Hello",
                "max_tokens": 5,
                "temperature": 0.1
            }
            response = requests.post(f"{self.base_url}/generate", json=test_payload, timeout=15)
            
            results["generate"] = {
                "status": "success",
                "status_code": response.status_code,
                "response_time": response.elapsed.total_seconds(),
                "available": response.status_code == 200
            }
            
            if response.status_code == 200:
                try:
                    response_data = response.json()
                    results["generate"]["response_data"] = response_data
                    self.logger.info(f"✅ Generate: {response.status_code} ({response.elapsed.total_seconds():.2f}s)")
                except:
                    results["generate"]["response_text"] = response.text[:200]
            else:
                results["generate"]["error"] = response.text[:200]
                self.logger.error(f"❌ Generate: {response.status_code}")
                
        except Exception as e:
            results["generate"] = {"status": "error", "error": str(e), "available": False}
            self.logger.error(f"❌ Generate endpoint failed: {e}")
        
        return results
    
    def perform_comprehensive_inference_tests(self) -> Dict[str, Any]:
        """Comprehensive inference testing with multiple prompts"""
        self.logger.info("🧠 Performing comprehensive inference tests...")
        
        # Check if generate endpoint is available
        try:
            health_check = requests.get(f"{self.base_url}/health", timeout=5)
            if health_check.status_code != 200:
                return {"status": "skipped", "reason": "Health endpoint not available"}
        except:
            return {"status": "skipped", "reason": "Cannot reach API"}
        
        test_results = []
        
        for i, prompt in enumerate(self.config.model_test_prompts):
            self.logger.info(f"🧪 Test {i+1}/{len(self.config.model_test_prompts)}: '{prompt[:30]}...'")
            
            test_payload = {
                "prompt": prompt,
                "max_tokens": 15,
                "temperature": 0.7,
                "top_p": 0.9,
                "stream": False
            }
            
            start_time = time.time()
            
            try:
                response = requests.post(
                    f"{self.base_url}/generate",
                    json=test_payload,
                    timeout=self.config.inference_timeout
                )
                
                end_time = time.time()
                response_time = end_time - start_time
                
                if response.status_code == 200:
                    try:
                        response_data = response.json()
                        
                        # Extract completion text (vLLM native format)
                        completion_text = ""
                        if isinstance(response_data, dict):
                            if "text" in response_data:
                                completion_text = response_data["text"][0] if isinstance(response_data["text"], list) else response_data["text"]
                            elif "choices" in response_data:
                                completion_text = response_data["choices"][0].get("text", "")
                            elif isinstance(response_data, str):
                                completion_text = response_data
                        
                        # Estimate tokens (rough)
                        tokens_generated = len(completion_text.split())
                        tokens_per_second = tokens_generated / response_time if response_time > 0 else 0
                        
                        test_result = {
                            "test_id": i + 1,
                            "prompt": prompt,
                            "status": "success",
                            "response_time": round(response_time, 2),
                            "completion": completion_text.strip(),
                            "tokens_generated": tokens_generated,
                            "tokens_per_second": round(tokens_per_second, 2),
                            "full_response": response_data
                        }
                        
                        self.logger.info(f"✅ Test {i+1} success: {response_time:.2f}s, {tokens_per_second:.1f} tok/s")
                        self.logger.debug(f"   Completion: '{completion_text.strip()}'")
                        
                    except Exception as parse_error:
                        test_result = {
                            "test_id": i + 1,
                            "prompt": prompt,
                            "status": "parse_error",
                            "error": f"Could not parse response: {parse_error}",
                            "response_time": round(response_time, 2),
                            "raw_response": response.text[:200]
                        }
                        self.logger.error(f"❌ Test {i+1}: Parse error")
                else:
                    test_result = {
                        "test_id": i + 1,
                        "prompt": prompt,
                        "status": "http_error",
                        "status_code": response.status_code,
                        "error": response.text[:200],
                        "response_time": round(response_time, 2)
                    }
                    self.logger.error(f"❌ Test {i+1}: HTTP {response.status_code}")
                    
            except requests.exceptions.Timeout:
                test_result = {
                    "test_id": i + 1,
                    "prompt": prompt,
                    "status": "timeout",
                    "error": f"Request timeout after {self.config.inference_timeout}s"
                }
                self.logger.error(f"⏱️ Test {i+1}: Timeout")
                
            except Exception as e:
                test_result = {
                    "test_id": i + 1,
                    "prompt": prompt,
                    "status": "error",
                    "error": str(e)
                }
                self.logger.error(f"❌ Test {i+1}: {e}")
            
            test_results.append(test_result)
            time.sleep(1)  # Brief pause between tests
        
        # Calculate summary
        successful_tests = [t for t in test_results if t.get("status") == "success"]
        
        if successful_tests:
            avg_response_time = sum(t["response_time"] for t in successful_tests) / len(successful_tests)
            avg_tokens_per_second = sum(t.get("tokens_per_second", 0) for t in successful_tests) / len(successful_tests)
            
            summary = {
                "status": "completed",
                "total_tests": len(test_results),
                "successful_tests": len(successful_tests),
                "success_rate": round((len(successful_tests) / len(test_results)) * 100, 1),
                "average_response_time": round(avg_response_time, 2),
                "average_tokens_per_second": round(avg_tokens_per_second, 2),
                "test_results": test_results
            }
        else:
            summary = {
                "status": "all_failed",
                "total_tests": len(test_results),
                "successful_tests": 0,
                "success_rate": 0.0,
                "test_results": test_results
            }
        
        self.logger.info(f"🧠 Inference testing complete: {len(successful_tests)}/{len(test_results)} tests passed")
        return summary
class MetricsHandler(BaseHTTPRequestHandler):
    """Simple handler for Prometheus metrics"""
    
    def do_GET(self):
        """Handle GET requests for metrics"""
        if self.path == '/metrics':
            # Run a quick validation check
            services_up = 0
            try:
                # Check if our main services are running
                result = subprocess.run(['systemctl', 'is-active', 'vllm.service'],
                                      capture_output=True, text=True)
                if result.returncode == 0:
                    services_up = 1
            except:
                services_up = 0
            
            # Create simple metrics
            metrics = f"""# HELP system_validation_services_up Services running status
# TYPE system_validation_services_up gauge
system_validation_services_up {services_up}

# HELP system_validation_last_check_timestamp Last validation check time
# TYPE system_validation_last_check_timestamp gauge
system_validation_last_check_timestamp {int(time.time())}
"""
            
            # Send the response
            self.send_response(200)
            self.send_header('Content-type', 'text/plain')
            self.end_headers()
            self.wfile.write(metrics.encode())
        else:
            # Send 404 for other paths
            self.send_response(404)
            self.end_headers()

def start_metrics_server():
    """Start the metrics server in a background thread"""
    server = HTTPServer(('0.0.0.0', 8080), MetricsHandler)
    print("📊 Metrics server starting on http://192.168.10.29:8080/metrics")
    server.serve_forever()

def check_system_basics(cfg: SystemConfig, logger) -> Dict[str, Any]:
    """Basic system validation"""
    logger.info("== System Basics ==")
    
    results = {
        "users": {"missing": [], "status": "unknown"},
        "services": {"failed": [], "status": "unknown"},
        "ports": {"missing": [], "conflicts": [], "status": "unknown"}
    }
    
    # User checks
    missing_users = []
    for user in cfg.required_users:
        try:
            subprocess.check_call(["id", user], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            logger.info(f"✅ User: {user}")
        except subprocess.CalledProcessError:
            logger.error(f"❌ User: {user}")
            missing_users.append(user)
    
    results["users"]["missing"] = missing_users
    results["users"]["status"] = "ok" if not missing_users else "failed"
    
    # Service checks
    failed_services = []
    for svc in cfg.required_services:
        try:
            if subprocess.call(["systemctl", "is-active", "--quiet", svc]) == 0:
                logger.info(f"✅ Service: {svc}")
            else:
                logger.error(f"❌ Service: {svc}")
                failed_services.append(svc)
        except Exception as e:
            logger.error(f"❌ Service {svc}: Error - {e}")
            failed_services.append(svc)
    
    results["services"]["failed"] = failed_services
    results["services"]["status"] = "ok" if not failed_services else "failed"
    
    # Port checks
    listening_ports = {}
    try:
        for conn in psutil.net_connections(kind='inet'):
            if conn.status == 'LISTEN' and conn.laddr.port:
                port = conn.laddr.port
                pid = conn.pid
                if port not in listening_ports:
                    listening_ports[port] = []
                proc_info = get_proc_info(pid)
                listening_ports[port].append(proc_info)
    except Exception as e:
        logger.error(f"Failed to get port information: {e}")
    
    missing_ports = []
    conflicts = []
    
    for port in cfg.required_ports:
        if port in listening_ports:
            processes = listening_ports[port]
            expected_service = cfg.expected_service_ports.get(port, "unknown")
            
            service_found = False
            valid_processes = []
            
            for proc in processes:
                if 'error' in proc or proc.get('pid') is None:
                    continue
                    
                valid_processes.append(proc)
                proc_name = proc.get('name', '').lower()
                proc_cmdline = proc.get('cmdline', '').lower()
                
                if (expected_service.lower() in proc_name or 
                    expected_service.lower() in proc_cmdline or
                    (expected_service == "python" and "vllm" in proc_cmdline)):
                    service_found = True
                    break
            
            if service_found:
                logger.info(f"✅ Port {port}: {expected_service}")
            else:
                if valid_processes:
                    logger.warning(f"⚠️ Port {port}: Unexpected service")
                    conflicts.extend([(port, proc) for proc in valid_processes])
                else:
                    logger.info(f"✅ Port {port}: System process")
        else:
            logger.error(f"❌ Port {port}: Not listening")
            missing_ports.append(port)
    
    results["ports"]["missing"] = missing_ports
    results["ports"]["conflicts"] = conflicts
    results["ports"]["status"] = "ok" if not missing_ports and not conflicts else "failed"
    
    return results

def main():
    """Enhanced main function with comprehensive native vLLM validation"""
    parser = argparse.ArgumentParser(description="Enhanced System Validation with Native vLLM API v2.4")
    parser.add_argument("--dry-run", action="store_true", help="Show what would be done")
    parser.add_argument("--verbose", action="store_true", help="Enable verbose logging")
    parser.add_argument("--skip-inference", action="store_true", help="Skip inference testing")
    parser.add_argument("--model-only", action="store_true", help="Only run model tests")
    parser.add_argument("--json-report", type=str, help="Output JSON report")
    args = parser.parse_args()

    config = SystemConfig.default()
    logger = setup_logging("DEBUG" if args.verbose else "INFO", config.log_file)

    
    if args.dry_run:
        logger.info("🔍 DRY RUN MODE - Enhanced validation with native vLLM API...")
    else:
        logger.info("🔍 Enhanced validation with native vLLM API...")
    
    introspector = NativeVLLMIntrospector(config, logger)
    
    validation_results = {
        "timestamp": time.strftime('%Y-%m-%d %H:%M:%S'),
        "hostname": os.uname().nodename,
        "validation_mode": "native_vllm_api",
        "dry_run": args.dry_run
    }
    
    try:
        # Basic system checks
        if not args.model_only:
            logger.info("="*60)
            logger.info("🖥️  SYSTEM VALIDATION")
            logger.info("="*60)
            validation_results["system"] = check_system_basics(config, logger)
        
        # Enhanced model validation
        logger.info("="*60)
        logger.info("🧠 NATIVE vLLM MODEL VALIDATION")
        logger.info("="*60)
        
        # Process analysis
        validation_results["vllm_processes"] = introspector.discover_vllm_processes()
        
        # GPU status
        validation_results["gpu_status"] = introspector.check_gpu_status()
        
        # API endpoint testing
        validation_results["api_endpoints"] = introspector.test_native_api_endpoints()
        
        # Comprehensive inference testing
        if not args.skip_inference:
            validation_results["inference_tests"] = introspector.perform_comprehensive_inference_tests()
        else:
            validation_results["inference_tests"] = {"status": "skipped", "reason": "User requested skip"}
        
        # Final summary
        logger.info("="*60)
        logger.info("📊 COMPREHENSIVE VALIDATION SUMMARY")
        logger.info("="*60)
        
        # System summary
        system_issues = 0
        if not args.model_only:
            system_results = validation_results.get("system") or {}
            for component, data in system_results.items():
                if isinstance(data, dict) and data.get("status") == "failed":
                    system_issues += 1
            logger.info(f"🖥️  System Issues: {system_issues}")

        # Model summary
        vllm_processes = validation_results.get("vllm_processes") or {}
        api_endpoints = validation_results.get("api_endpoints") or {}
        inference_tests = validation_results.get("inference_tests") or {}
        
        process_count = vllm_processes.get("total_processes", 0)
        health_info = api_endpoints.get("health") or {}
        generate_info = api_endpoints.get("generate") or {}
        
        health_available = health_info.get("available", False)
        generate_available = generate_info.get("available", False)
        inference_success_rate = inference_tests.get("success_rate", 0)

        logger.info(f"🧠 vLLM Processes: {process_count}")
        logger.info(f"🌐 Health Endpoint: {'✅' if health_available else '❌'}")
        logger.info(f"🌐 Generate Endpoint: {'✅' if generate_available else '❌'}")
        logger.info(f"🧪 Inference Success Rate: {inference_success_rate}%")

        # GPU summary
        gpu_status = validation_results.get("gpu_status") or {}
        if gpu_status.get("status") == "success":
            logger.info(f"🎮 GPUs: {gpu_status.get('gpu_count', 0)} detected, {gpu_status.get('total_used_memory_gb', 0):.1f}GB used")

        # Save JSON report
        if args.json_report:
            try:
                with open(args.json_report, 'w') as f:
                    json.dump(validation_results, f, indent=2, default=str)
                logger.info(f"📊 Report saved to {args.json_report}")
            except Exception as e:
                logger.error(f"Failed to save report: {e}")

        # Determine exit code
        critical_failures = 0
        if not args.model_only:
            system_results = validation_results.get("system") or {}
            services_results = system_results.get("services") or {}
            if services_results.get("status") == "failed":
                critical_failures += 1
        
        if not health_available or not generate_available:
            critical_failures += 1
        if inference_success_rate < 50 and not args.skip_inference:
            critical_failures += 1
            
        logger.info(f"🎯 Validation complete with {critical_failures} critical failures")
        return 1 if critical_failures > 0 else 0
        
    except KeyboardInterrupt:
        logger.info("Validation interrupted by user")
        return 130
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        logger.debug(traceback.format_exc())
        return 1

if __name__ == "__main__":
    # Start metrics server in background
    metrics_thread = threading.Thread(target=start_metrics_server, daemon=True)
    metrics_thread.start()
    time.sleep(1)  # Give server time to start
    
    # Run validation once
    exit_code = main()
    
    # Keep the script alive to serve metrics if validation passed
    if exit_code == 0:
        print("Validation complete. Serving metrics. Press Ctrl+C to exit.")
        try:
            while True:
                time.sleep(3600) # Keep main thread alive
        except KeyboardInterrupt:
            print("\nMetrics server shutting down.")
    
    sys.exit(exit_code)
