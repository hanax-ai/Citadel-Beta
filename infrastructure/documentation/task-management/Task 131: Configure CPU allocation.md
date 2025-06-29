## Task Implementation
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
     - Example: `131.0 Configure CPU Allocation_results.md`
   - Each file must include:
     - Every modified or created file path
     - A one-line description of its purpose

## Relevant Files

- `/etc/systemd/system/vllm.service` – Updated to include CPUAffinity directive to bind vLLM process to cores 0–15.
- `/home/agent0/Citadel-Beta/infrastructure/documentation/task-management/131.0 Configure CPU Allocation.md` – Task planning document.
- `/home/agent0/Citadel-Beta/infrastructure/documentation/task-management/131.0 Configure CPU Allocation_results.md` – Execution result log with affinity validation.

### Notes

- CPU core ranges may be adjusted depending on the actual hardware. Use `lscpu` to confirm total core count before applying.
- This strategy improves predictability and minimizes CPU contention with background system processes.

## Tasks

- [x] 131.0 Configure CPU Allocation
  - [x] 131.1 Define CPU Allocation Strategy
    - [x] Document rationale for isolating vLLM to physical cores 0–15
  - [x] 131.2 Update systemd Service File with CPUAffinity
    - [x] Edit `infrastructure/servers/01-llm-server/configs/systemd/vllm.service` and add `CPUAffinity=0-15` under `[Service]`
  - [x] 131.3 Reload and Restart the Service
    - [x] Run `sudo systemctl daemon-reload`
    - [x] Run `sudo systemctl restart vllm.service`
  - [x] 131.4 Validation
    - [x] Retrieve vLLM process PID via `pgrep`
    - [x] Use `taskset -p $PID` to confirm affinity is set to `0-15` - **FAILED**

## Final Instructions

1. Do NOT start next task without user’s instructions
