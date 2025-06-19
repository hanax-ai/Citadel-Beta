
# HANA-X Inference Architecture – Text, RAG, and Vision-Aware Agents

---

## 1. System Overview

This architecture enables high-throughput, multi-model AI inference across:

- Text-only LLMs for planning, reasoning, coding, and summarization
- Retrieval-Augmented Generation (RAG) pipelines powered by Qdrant
- Vision-Language inference using MiMo-VL-7B-RL for GUI, screenshots, and image reasoning

---

## 2. Model Stack

| Role | Model | Serving Method | Port | Description |
|------|-------|----------------|------|-------------|
| Generalist LLM | Mixtral-8x7B | vLLM | 11400 | Default fallback for reasoning agents |
| RAG & QA | Nous Hermes 2 Mistral | vLLM | 11401 | Clean RAG-aware generation |
| Dialogue + Tools | OpenChat 3.5 | vLLM | 11402 | For plug-in agents and interactive flows |
| Fast Micro Agent | Phi-3 Mini | vLLM | 11403 | Fast fallback or short task executor |
| Long-Document Summary | Yi-34B | vLLM | 11404 | Supports 32K token inputs |
| Vision + Language | MiMo-VL-7B-RL | Standalone FastAPI | 11500 | Handles screenshots, GUI reasoning, captioning |

---

## 3. Node Responsibilities

### LLM Node (192.168.10.29)
- Hosts all vLLM instances (text-only models)
- Serves inference endpoints for agent pipelines
- Runs task router on port 8000 to dispatch per model

### Vector Node (192.168.10.30)
- Hosts Qdrant (only)
- Provides vector search for RAG workflows
- Connected to LLM node’s `/rag_pipeline_api.py`

### Dev Node (192.168.10.33)
- Hosts MiMo-VL-7B-RL as a standalone FastAPI service
- Accepts image + prompt payloads for multimodal tasks
- Not managed via vLLM (incompatible)

---

## 4. Task Router Behavior

A FastAPI service on the LLM node (port 8000) receives user prompts and performs:

- Token inspection
- Keyword classification
- `has_image` flag detection

Then dispatches to the correct model endpoint:
- `mixtral` for general
- `nous-hermes-2` for RAG
- `openchat` for tool/math
- `phi3-mini` for speed
- `yi-34b` for long-docs
- `mimo-vl` for any image-containing requests

---

## 5. Sample Routing Logic

- `"Summarize this document"` → Yi-34B (long context)
- `"What does this dashboard show?" + image` → MiMo-VL-7B-RL
- `"Calculate the average latency over time"` → OpenChat
- `"Quick check on Redis keys"` → Phi-3 Mini
- `"Explain this function"` → Mixtral

---

## 6. RAG Integration

- Agents or UIs trigger document ingestion/search
- Qdrant returns matched chunks from Vector Node
- LLM (usually Hermes 2 or Yi-34B) performs synthesis
- Results returned via `/rag/query` or `/rag/stream`

---

## 7. Design Rationale

- vLLM handles all **text-only** inference with performance, batching, and modular control
- MiMo-VL-7B-RL is kept **fully isolated** on a standalone FastAPI server due to vision architecture
- Vector services are **decentralized**: Qdrant is isolated on the vector node to simplify upgrades and reduce resource contention
- Agents interact only with the router, never directly with models

---

## 8. Operational Summary

| Component | Protocol | Managed By | Notes |
|-----------|----------|------------|-------|
| vLLM Models | HTTP (OpenAI API) | systemd / vLLM | One port per model |
| Task Router | HTTP (FastAPI) | systemd | Intelligent dispatcher |
| MiMo-VL | HTTP (FastAPI) | systemd | Dedicated service, separate from vLLM |
| Qdrant | HTTP + gRPC | systemd | External to inference, powers vector search |

---


---

# ✅ Benefits and Justification

---

## 1. Modular Model Serving via vLLM

Each text-only LLM (Mixtral, Hermes, Yi-34B, etc.) runs independently under `vLLM`, each on its own port.

**Benefits:**
- Horizontal scaling: Add/remove models freely
- Failure isolation between model processes
- GPU memory segmentation
- Continuous batching improves throughput and latency

---

## 2. Centralized Routing Logic with Smart Dispatch

The FastAPI-based router classifies incoming tasks and routes them to the best-fit model.

**Benefits:**
- Agents don’t need to know which model to call
- Latency optimization based on prompt size and task type
- Clean abstraction layer for all AI endpoints
- Extensible with no agent code changes

---

## 3. MiMo-VL-7B-RL as a Standalone Vision-Language Server

MiMo is deployed separately on the Dev Node using FastAPI, not under vLLM.

**Benefits:**
- Handles image + prompt tasks with native ViT support
- No interference with vLLM performance
- Supports advanced VQA and GUI simulation agents
- Retains architectural clarity and service independence

---

## 4. External Qdrant-Only Vector Node

Qdrant is the only service on the vector node and powers the RAG flow.

**Benefits:**
- Dedicated resource for vector operations
- Clear service boundaries and easy upgrades
- Decouples vector storage from LLM inference load
- Allows independent scaling and versioning

---

## 5. Purpose-Built LLM Assignments

Each LLM is chosen for its strength and runs in isolation:

| Function | Model | Strength |
|----------|-------|----------|
| General reasoning | Mixtral | Balanced, multi-turn MoE |
| RAG QA | Hermes 2 | Clean RAG alignment |
| Long context | Yi-34B | 32K token support |
| Math/toolchain | OpenChat | Instruction-tuned |
| Fast agents | Phi-3 Mini | Tiny, quick, low latency |
| Vision tasks | MiMo-VL | Screenshot and GUI support |

**Benefits:**
- Specialization increases accuracy and stability
- Flexibility for fallback and upgrades
- Pipeline-resilient by design

---

## 6. Security, Stability, and Observability

Only the router is externally exposed. Model ports are internal only.

**Benefits:**
- Prevents direct access to models
- Allows centralized logging, usage stats, and audit trails
- Fits well with systemd and local log aggregation

---

## 7. Easy Maintenance and Future Expansion

- New LLMs can be added by extending `models.json` and the router
- MiMo and Qdrant can be upgraded independently
- Router logic is centralized and editable

---

## Final Thought

This architecture is agent-native, pipeline-optimized, and built for long-term evolution. It supports RAG, multi-agent workflows, and visual reasoning without compromising speed or modularity. It enables the HANA-X Lab to operate as a robust, multi-modal AI research and execution environment.

---
