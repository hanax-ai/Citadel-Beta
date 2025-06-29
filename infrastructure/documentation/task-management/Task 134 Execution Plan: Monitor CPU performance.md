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
     - Example: `134.0 Monitor CPU Performance_results.md`
   - Each file must include:
     - Every modified or created file path
     - A one-line description of its purpose

## Relevant Files

- `/etc/prometheus/rules.d/cpu_alerts.rules.yml` – Prometheus alerting rule for detecting high CPU usage.
- `http://hx-llm-01:9100/metrics` – Node Exporter endpoint exposing CPU metrics.
- Grafana Dashboard: `HANA-X LLM Server Overview` – Visual display for overall CPU utilization.
- `/home/agent0/Citadel-Beta/infrastructure/documentation/task-management/134.0 Monitor CPU Performance.md` – Task file describing configuration and validation procedures.
- `/home/agent0/Citadel-Beta/infrastructure/documentation/task-management/134.0 Monitor CPU Performance_results.md` – Post-task summary and Grafana screenshot/logs if required.

### Notes

- Node Exporter must be active and listening on `9100` for PromQL and alerting to function.
- Dashboard naming conventions must match to ensure traceability.
- Use `stress-ng` for test validation, and observe alert lifecycle in Prometheus UI (Pending → Firing).

## Tasks

- [ ] 134.0 Monitor CPU Performance
  - [ ] 134.1 Validate node_exporter CPU Metrics
    - [ ] Run: `curl -s localhost:9100/metrics | grep 'node_cpu_seconds_total'`
    - [ ] Confirm output contains metrics per core and CPU mode
  - [ ] 134.2 Create CPU Utilization Dashboard in Grafana
    - [ ] Create a new dashboard: **HANA-X LLM Server Overview**
    - [ ] Add panel: **Overall CPU Utilization %**
    - [ ] Use PromQL:
      ```
      100 - (avg by (instance) (rate(node_cpu_seconds_total{job="node_exporter", instance="hx-llm-01:9100", mode="idle"}[5m])) * 100)
      ```
    - [ ] Set unit to: **Percent (0–100)**
    - [ ] Confirm correct rendering
  - [ ] 134.3 Configure High CPU Usage Alert
    - [ ] Add to Prometheus alert rules:
      ```yaml
      - alert: HighCpuUsage
        expr: 100 - (avg by (instance) (rate(node_cpu_seconds_total{job="node_exporter", instance="hx-llm-01:9100", mode="idle"}[10m])) * 100) > 95
        for: 5m
        labels:
          severity: "warning"
        annotations:
          summary: "High CPU usage on {{ $labels.instance }}"
      ```
    - [ ] Reload Prometheus config and validate alert via:
      ```bash
      stress-ng --cpu $(nproc)
      ```
    - [ ] Confirm alert moves from Pending to Firing in Prometheus UI

## Final Instructions

1. Do NOT start next task without user’s instructions
