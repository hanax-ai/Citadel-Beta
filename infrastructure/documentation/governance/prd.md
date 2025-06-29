Product Requirements Document: LLM Server Infrastructure Delivery (Phase 2A)
1. Introduction/Overview
This document outlines the requirements for establishing the foundational infrastructure of the LLM Server (hostname llm, IP 192.168.10.29), designated for the Citadel AI Operating System Phase 2. The primary goal is to deliver a robust and optimized server environment capable of hosting large language models and supporting subsequent AI infrastructure deployments. This phase ensures the underlying hardware and essential software components are correctly provisioned, configured, and validated, with a focus on a development environment's security posture.

2. Goals
Provision Core Infrastructure: Successfully deploy and configure the physical and virtual foundational components for the LLM server.

Optimize Hardware Performance: Maximize the performance of CPU, GPU, memory, and storage to support intensive AI workloads.

Establish Basic Security: Implement fundamental security measures to protect the server in a development environment.

Deploy Monitoring Foundation: Set up essential monitoring capabilities to ensure operational visibility and proactive issue detection.

Prepare for AI Workloads: Create a stable and optimized environment ready for the deployment of core AI infrastructure and LLM services.

3. User Stories
As an Infrastructure Team member, I need to ensure all server hardware is verified and correctly configured, so that the base system is stable and reliable.

As a Development Team member, I need a Python environment with necessary libraries and CUDA support, so that I can deploy and run large language models efficiently.

As a Security Team member, I need basic security controls implemented on the server, so that unauthorized access is minimized in a development environment.

As an Operations Team member, I need comprehensive monitoring dashboards and alerts, so that I can track server health, performance, and quickly respond to issues.

4. Functional Requirements
The LLM Server infrastructure must include:

System Preparation:

Verified server hardware specifications (GPUs, RAM, storage).

Clean installation and configuration of Ubuntu Server 24.04.2 LTS.

Static IP, hostname, and updated system packages.

Installation of essential build tools and libraries.

Configured Python 3.12.x environment with a dedicated virtual environment and core packages.

Mounted and optimized NVMe storage (/opt/citadel/models) and HDD storage (/opt/citadel/logs, /opt/citadel/backups).

Implemented storage monitoring and automated backup procedures.

Optimized filesystem performance.

Configured network interfaces, internal routing, and DNS resolution.

Implemented basic network security (iptables for essential services) and monitoring.

Created necessary service accounts (citadel, vllm, router) with appropriate permissions.

Configured key-based SSH access, sudo, file permissions, and audit logging.

Hardware Optimization:

Installed and configured NVIDIA GPU drivers (CUDA Toolkit 12.9 compatible).

Enabled GPU persistence mode and optimized power/memory management.

Implemented GPU monitoring.

Installed CUDA Toolkit 12.9 and cuDNN library, with verified functionality.

Optimized CUDA environment variables and memory management for multi-model serving.

Model Deployment Specifications:
- DeepCoder-14B is deployed with FP8 quantization, utilizing approximately 13.5 GB of VRAM.
- MiMo-VL-7B-RL is deployed in Q4_K quantized format, utilizing about 3.5 GB of VRAM.
These quantization strategies enable efficient memory usage and support multi-model serving on available GPU resources.

Installed thermal monitoring tools, configured fan control, and implemented thermal alerting/logging.

Optimized CPU governor, memory settings, I/O scheduler, CPU affinity, and network stack.

Passed comprehensive hardware tests for CPU, GPU, memory, and storage.

Documented hardware configuration.

Security Framework (Minimal for Dev Environment):

Installed and configured UFW firewall with specific port rules for LLM services and secure SSH access.

Disabled root SSH login and enforced key-based authentication for team members.

Configured basic sudo access and initial audit logging for critical actions.

Set up file permissions to ensure service operation and prevent accidental unauthorized access.

Monitoring Foundation:

Installed Prometheus node_exporter and nvidia_exporter.

Configured comprehensive system, GPU, and process metrics collection.

Configured Prometheus for scraping, metric retention, aggregation, and federation.

Implemented Prometheus data backup and recovery.

Created Grafana dashboards for system overview, GPU monitoring, LLM performance, business metrics, and alert management.

Configured critical system, performance, capacity, and security alerts.

Implemented alert routing to appropriate teams.

5. Non-Goals (Out of Scope)
Deployment of specific LLM applications or models onto the server.

Integration with external user-facing applications (e.g., Kilo Code AI Assistant).

Development of the Database Server, Vector Database Server, or Development Server.

Training or fine-tuning of large language models.

Phase 2B (Core AI Infrastructure) and subsequent phases.

Advanced Security Measures: This includes comprehensive intrusion detection, disk encryption, advanced vulnerability scanning, and formal incident response procedures beyond basic logging and alerting for a development environment.

6. Design Considerations (Optional)
Adherence to enterprise-grade stability and performance best practices.

Scalability considerations for future expansion of LLM workloads.

Maintainability through clear configurations and documentation.

7. Technical Considerations (Optional)
Targeted Hardware: 2x RTX 4070 Ti SUPER (32GB VRAM total), 128GB RAM, 8TB NVMe, 2x 10TB HDD.

Operating System: Ubuntu Server 24.04.2 LTS.

Key Technologies: Python 3.12.x, NVIDIA CUDA Toolkit 12.9, cuDNN 8.9, UFW, Prometheus, Grafana.

Network Integration: 192.168.10.29 static IP, routing to 192.168.10.30 (Vector Server) and 192.168.10.35 (Database Server).

8. Success Metrics
Technical Validation: All Phase 2A tasks completed and validated as per the "Citadel AI Operating System - Phase 2 Implementation Tasks" document.

Operational Readiness: Ubuntu 24.04.2 LTS installed and optimized, hardware components verified and optimized, basic security framework implemented and tested, and monitoring foundation deployed and operational.

Infrastructure Preparedness: Infrastructure is ready for Phase 2B (Core AI Infrastructure) with established performance baselines.

Documentation & Training: All team members trained on new systems, documentation complete and accessible.

Stakeholder Sign-off: Formal stakeholder sign-off on Phase 2A completion.