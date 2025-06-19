# Project Citadel - Key Architecture & Technical Requirements Summary

## System Overview
Project Citadel is an enterprise-grade AI orchestration platform featuring:
- Multi-agent coordination with LangGraph workflows
- Advanced tool integration system with dynamic registry
- Document intelligence pipeline with AI-powered analysis
- Real-time streaming capabilities with Ollama model cluster
- Production-ready deployment with Kubernetes

## Core Technology Stack

### Frontend Layer
- **AG-UI Components**: Advanced React UI framework
- **CopilotKit**: AI-assisted development platform
- **Key Components**:
  - CitadelChatInterface (real-time streaming UI)
  - AdvancedConfigPanel (model & parameter control)
  - DocumentAnalysisPanel (AI insights display)
  - DocumentExplorer (source navigation)
  - MultiAgentWorkspace (team coordination hub)
  - ToolStudio (interactive tool execution)
  - WorkflowDesigner (visual workflow builder)

### API Gateway Layer
- **FastAPI Core**: Main API server (port 8000)
- **Ollama Gateway**: LLM processing (port 8001)
- **CopilotKit Backend**: AI assistance (port 8002)
- **LangGraph Orchestrator**: Workflow management (port 8004)
- **Multi-Agent Coordinator**: Agent orchestration (port 8005)
- **Tool Execution Engine**: Tool management (port 8006)
- **Document Pipeline**: Document intelligence (port 8007)
- **Feedback Orchestrator**: Quality management (port 8008)
- **Real-time Event System**: WebSocket/SSE/EventStream

### AI Processing Layer
- **LLM Orchestrator**: Model selection & routing
- **Conversation Manager**: Multi-turn context management
- **Configuration Manager**: Optimal parameter management
- **Stream Manager**: Real-time processing
- **Tool Registry**: Central tool management
- **Tool Selection Strategies**: 3 strategic approaches (All Tools, Task-Based, Dynamic)

### Document Intelligence Layer
- **Text Processing Pipeline**: Clean, normalize, chunk
- **Entity Extraction**: NER, keywords, relations
- **Content Classification**: 14 document types
- **Metadata Extraction**: Document intelligence
- **Multi-Level Summarizer**: 4-tier summarization

### Ollama Model Cluster
- **Mistral Latest**: 4.1GB - Fast response
- **DeepSeek R1 Latest**: 4.7GB - Balanced performance
- **DeepCoder 14B**: 9.0GB - Code generation
- **DeepSeek R1 32B**: 19GB - Premium analysis
- **DeepCoder BF16**: 29GB - Precision code generation

### Data & Storage Layer
- **Qdrant Vector DB**: Enhanced AI metadata storage
- **PostgreSQL**: Structured data & sessions
- **Redis Cluster**: Caching & real-time data
- **MinIO Object Storage**: Document files & artifacts

### Crawling & Ingestion
- **Crawl4AI Service**: Preserved intelligence crawling
- **Crawler Scheduler**: Automated ingestion
- **Enhanced Document Processor**: AI-augmented pipeline

### Infrastructure Layer
- **Kubernetes**: Container orchestration
- **Prometheus**: Metrics collection
- **Grafana**: Monitoring dashboard
- **Jaeger**: Distributed tracing

## Tool Integration System

### Core Tools
- **WebSearchTool**: Internet research capability
- **CalculatorTool**: Mathematical operations
- **FileOperationTool**: Secure file management
- **Custom Tool Framework**: Extensible architecture

### Tool Capabilities
- Secure file operations (read, write, list, validation)
- Web search with rate limiting and caching
- Safe mathematical expression evaluation
- Dynamic tool selection based on context
- Tool performance monitoring and analytics

## Resource Requirements
- **Total CPU Cores**: 41 cores
- **Total RAM**: 110 GB
- **GPU Requirements**: 1-2 NVIDIA Tesla/RTX GPUs for Ollama
- **Storage**: 200GB SSD for models + 500GB for data
- **Network**: 10Gbps internal, 1Gbps external

## Key Features
1. **Real-time Streaming**: WebSocket/SSE support for live AI responses
2. **Multi-Agent Coordination**: LangGraph-powered workflow orchestration
3. **Dynamic Tool Selection**: AI-powered tool selection strategies
4. **Document Intelligence**: 14-type classification with 4-tier summarization
5. **Enterprise Security**: Secure file operations and path validation
6. **Production Monitoring**: Comprehensive metrics and tracing
7. **Scalable Architecture**: Kubernetes-ready deployment
8. **Developer Experience**: CopilotKit integration for AI-assisted development

## Integration Points
- Frontend communicates via WebSocket/SSE for real-time updates
- API Gateway routes requests to appropriate processing services
- AI Processing Layer coordinates model selection and execution
- Document Intelligence Pipeline processes and analyzes content
- Tool System provides extensible functionality
- Data Layer provides persistent storage and caching
- Infrastructure Layer ensures scalability and monitoring

