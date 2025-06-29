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
     - Example: `133.0 Configure CPU Scheduling_results.md`
   - Each file must include:
     - Every modified or created file path
     - A one-line description of its purpose

## Relevant Files

- `/etc/systemd/system/vllm.service` – Modified to include `CPUSchedulingPolicy=fifo` and `CPUSchedulingPriority=90`.
- `/home/agent0/Citadel-Beta/infrastructure/documentation/task-management/133.0 Configure CPU Scheduling.md` – Task configuration file.
- `/home/agent0/Citadel-Beta/infrastructure/documentation/task-management/133.0 Configure CPU Scheduling_results.md` – Result log validating scheduling policy and priority settings.

### Notes

- The `SCHED_FIFO` policy allows the vLLM service to pre-empt most standard tasks, improving latency under load.
- Priority `90` is aggressive and should be monitored; ensure system stability is not compromised.
- Root permissions are required for both configuring and inspecting real-time policies.

## Tasks

- [ ] 133.0 Configure CPU Scheduling
  - [ ] 133.1 Define Scheduling Policy
    - [ ] Select `FIFO` as the CPU scheduling policy with a priority of `90`
  - [ ] 133.2 Update systemd Service File with Scheduling Policies
    - [ ] Add the following under `[Service]` in `/etc/systemd/system/vllm.service`:
      - `CPUSchedulingPolicy=fifo`
      - `CPUSchedulingPriority=90`
  - [ ] 133.3 Reload and Restart the Service
    - [ ] Run `sudo systemctl daemon-reload`
    - [ ] Run `sudo systemctl restart vllm.service`
  - [ ] 133.4 Validation
    - [ ] Get vLLM PID using `pgrep -f vllm.entrypoints.api_server`
    - [ ] Run `chrt -p $PID` and confirm:
      - `current scheduling policy: SCHED_FIFO`
      - `current scheduling priority: 90`

## Final Instructions

1. Do NOT start next task without user’s instructions
