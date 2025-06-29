## Task Implementation
- **One sub-task at a time:** Do **NOT** start the next sub‑task until you ask the user for permission and they say “yes” or "y"
- **Completion protocol:**  
  1. When you finish a **sub‑task**, immediately mark it as completed by changing `[ ]` to `[x]`.  
  2. If **all** subtasks underneath a parent task are now `[x]`, also mark the **parent task** as completed.  
  3. A task can be marked complete until it has been tested and passed.

## Task List Maintenance

1. **Update the task list as you work:**
   - Add new tasks as they emerge.
   - Create a corresponding `.md` file in `/home/agent0/Citadel-Beta/infrastructure/documentation/task-management`.

2. **Maintain the “Relevant Files” section:**
   - At the conclusion of each task, summarize your work including all files created or modified.
   - Provide each summary as a separate `.md` file named after the task, appended with `_results`.  
     - Example: `120.0 Optimize Inference Pipeline_results.md`
   - Each file must include:
     - Every modified or created file path
     - A one-line description of its purpose

## Relevant Files

- `~/vllm/benchmarks/benchmark_throughput.py` – Benchmark script used to measure vLLM inference throughput.
- `~/ShareGPT_V4.3_unfiltered_cleaned_split.json` – Sample dataset used to evaluate model performance under load.
- `/etc/systemd/system/vllm.service` – Ensures vLLM service is active and optimized prior to benchmarking.
- `/home/agent0/Citadel-Beta/infrastructure/documentation/task-management/120.0 Optimize Inference Pipeline.md` – Task execution file.
- `/home/agent0/Citadel-Beta/infrastructure/documentation/task-management/120.0 Optimize Inference Pipeline_results.md` – Implementation summary and output validation log.

### Notes

- The vLLM service must already include swap-space (Task 119), high GPU memory utilization (Task 116), and parallelism tuning.
- The benchmark must report **Throughput: X.XX requests/s** and **Throughput: Y.YY tokens/s** to confirm optimization.
- Benchmarking results will be referenced in future tuning tasks.

## Tasks

- [x] 120.0 Optimize Inference Pipeline
  - [x] 120.1 Establish a Formal Benchmark
    - [x] Clone the vLLM repo locally
    - [x] Download benchmarking dataset (ShareGPT Vicuna)
      **Note**: ShareGPT dataset unavailable (404 error), will use built-in sonnet dataset from vLLM repo
  - [x] 120.2 Run the Throughput Benchmark
    - [x] Confirm `vllm.service` is active and healthy
    - [x] Activate Python virtual environment
    - [x] Run `benchmark_throughput.py` with correct model and dataset
  - [x] 120.3 Validate Benchmark Output
    - [x] Confirm benchmark finishes successfully
    - [x] Record KPIs: requests/sec and tokens/sec throughput from output
      **Results**: 315.08 requests/s, 50,412.94 total tokens/s, 10,082.59 output tokens/s

## Final Instructions

1. Do NOT start next task without user’s instructions
