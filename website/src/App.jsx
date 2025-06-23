import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { ScrollArea } from '@/components/ui/scroll-area.jsx'
import { 
  BookOpen, 
  Server, 
  Database, 
  Brain, 
  Code, 
  TestTube, 
  Settings, 
  Monitor,
  Search,
  Menu,
  X,
  Home,
  FileText,
  Layers,
  GitBranch,
  Zap,
  Shield,
  Clock,
  ChevronRight,
  ExternalLink,
  Download,
  CheckCircle,
  ListChecks,
  Target,
  Workflow,
  Users,
  Building,
  Briefcase,
  Cpu,
  Globe
} from 'lucide-react'
import './App.css'

// Simple Navigation Component
const Navigation = ({ isOpen, setIsOpen }) => {
  const location = useLocation()
  
  const navItems = [
    { path: '/', label: 'AI Operating System', icon: Home },
    { path: '/architecture', label: 'System Architecture', icon: Layers },
    { path: '/business-apps', label: 'Business Applications', icon: Briefcase },
    { path: '/ai-inference', label: 'AI Inference Engine', icon: Brain },
    { path: '/enterprise', label: 'Enterprise Features', icon: Building },
    { path: '/techstack', label: 'Technology Stack', icon: Code },
    { path: '/deployment', label: 'Implementation Guide', icon: Workflow },
    { path: '/monitoring', label: 'Operations & Monitoring', icon: Monitor },
    { path: '/security', label: 'Security & Governance', icon: Shield },
  ]

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">Citadel Docs</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(false)}
          className="lg:hidden"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </ScrollArea>
    </div>
  )
}

// Overview Page Component
const OverviewPage = () => {
  const stats = [
    { label: 'Servers', value: '7', icon: Server, color: 'text-blue-600' },
    { label: 'AI Models', value: '7', icon: Brain, color: 'text-green-600' },
    { label: 'Technologies', value: '200+', icon: Code, color: 'text-purple-600' },
    { label: 'Business Apps', value: '4+', icon: Briefcase, color: 'text-orange-600' },
  ]

  const servers = [
    { name: 'Database Server', ip: '192.168.10.35', role: 'Enterprise Data Hub', tech: 'PostgreSQL 16.1, Redis 7.2.4, AALS Schema', status: 'Ready' },
    { name: 'LLM Server', ip: '192.168.10.29', role: 'AI Inference Engine', tech: 'vLLM 0.2.7, 7 Specialized Models, Task Router', status: 'Ready' },
    { name: 'Vector DB Server', ip: '192.168.10.30', role: 'Knowledge Management', tech: 'Qdrant 1.7.4, Crawl4AI 0.3.x, RAG Pipeline', status: 'Ready' },
    { name: 'Development Server', ip: '192.168.10.33', role: 'Business Applications Hub', tech: 'ag-ui, CopilotKit, React 18, Proactor Agent', status: 'Ready' },
    { name: 'Testing Server', ip: '192.168.10.34', role: 'Quality Assurance Hub', tech: 'pytest 7.4, Selenium Grid 4.15, Jenkins 2.426', status: 'Ready' },
    { name: 'Orchestration Server', ip: '192.168.10.31', role: 'Agent Orchestration', tech: 'Proactor Runtime, Multi-Agent Workflows, Policy Engine', status: 'Ready' },
    { name: 'DevOps Server', ip: '192.168.10.36', role: 'Operations Management', tech: 'Prometheus 2.48, Grafana 10.2, Loki 2.9, SIEM Integration', status: 'Ready' },
  ]

  const features = [
    {
      title: 'AI Operating System Kernel',
      description: 'Complete runtime environment for enterprise AI operations with governance and audit',
      icon: Cpu,
      items: [
                'Proactor Agent Runtime with 5-phase lifecycle management',
                'Clerk Identity Management with enterprise SSO and RBAC',
                'Agent Activity Log Schema (AALS) for complete audit trails',
                'Real-time policy enforcement and compliance validation'
              ]
    },
    {
      title: 'Business Applications Suite',
      description: 'Ready-to-deploy applications for finance, HR, legal, and IT operations',
      icon: Briefcase,
      items: [
                'Finance: Invoice processing, expense classification, compliance monitoring',
                'HR: Resume screening, interview prep, employee onboarding automation',
                'Legal: Contract analysis, risk assessment, compliance tracking',
                'IT Operations: Incident management, automated remediation, monitoring'
              ]
    },
    {
      title: 'Enterprise AI Infrastructure',
      description: 'Sophisticated AI inference with intelligent routing and specialized capabilities',
      icon: Brain,
      items: [
                'HANA-X Inference Engine with 7 specialized models',
                'Intelligent task routing with automatic model selection',
                'Advanced RAG pipeline with Crawl4AI and Qdrant integration',
                'Advanced caching with Redis 7.2.4 and Qdrant vector storage',
                'Comprehensive logging and alerting infrastructure'
              ]
    },
    {
      title: 'Development-Optimized Configuration',
      description: 'Minimal security barriers with maximum development productivity',
      icon: Zap,
      items: [
                'Simplified authentication and access controls',
                'Predetermined account naming conventions (hxadmin, hxapp, etc.)',
                'Local backup storage without external dependencies',
                'Development-friendly monitoring and logging'
              ]
    }
  ]

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Citadel AI Operating System</h1>
        <p className="text-xl text-gray-600 mb-2">Enterprise-Grade AI Runtime Environment</p>
        <p className="text-lg text-gray-500 mb-8">Complete Business Operations Platform with Governance, Orchestration & Intelligence</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index}>
                <CardContent className="flex items-center p-6">
                  <Icon className={`h-8 w-8 ${stat.color} mr-4`} />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Icon className="h-6 w-6 text-blue-600" />
                  <CardTitle>{feature.title}</CardTitle>
                </div>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {feature.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Server className="h-5 w-5" />
            <span>HANA-X Lab Server Overview</span>
          </CardTitle>
          <CardDescription>Complete infrastructure mapping with IP addresses and technology stack</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {servers.map((server, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{server.name}</h3>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    {server.status}
                  </Badge>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <div><strong>IP:</strong> {server.ip}</div>
                  <div><strong>Role:</strong> {server.role}</div>
                  <div><strong>Tech:</strong> {server.tech}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Network Configuration</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <div>• <strong>Network:</strong> 192.168.10.0/24 (HANA-X Lab)</div>
              <div>• <strong>User Account:</strong> agent0 (standardized across all servers)</div>
              <div>• <strong>OS:</strong> Ubuntu 24.04 Desktop (Python 3.12.x native)</div>
              <div>• <strong>Security:</strong> Minimal hardening for development efficiency</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Access</CardTitle>
          <CardDescription>Jump to key documentation sections</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/phase1-prd" className="block">
              <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <FileText className="h-6 w-6 text-blue-600 mb-2" />
                <h3 className="font-semibold">Phase 1 PRD</h3>
                <p className="text-sm text-gray-600">Database Server Requirements</p>
              </div>
            </Link>
            <Link to="/phase1-tasks" className="block">
              <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <ListChecks className="h-6 w-6 text-green-600 mb-2" />
                <h3 className="font-semibold">Phase 1 Tasks</h3>
                <p className="text-sm text-gray-600">Implementation Task List</p>
              </div>
            </Link>
            <Link to="/deployment" className="block">
              <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <Workflow className="h-6 w-6 text-purple-600 mb-2" />
                <h3 className="font-semibold">Deployment Order</h3>
                <p className="text-sm text-gray-600">7-Phase Strategy</p>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Architecture Page Component
const ArchitecturePage = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-gray-900">HANA-X Inference Architecture</h1>
    <p className="text-lg text-gray-600">Sophisticated AI inference with intelligent task routing and specialized model deployment.</p>
    
    <Card>
      <CardHeader>
        <CardTitle>HANA-X Architecture Overview</CardTitle>
        <CardDescription>Advanced AI platform with intelligent task routing and multimodal capabilities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">AI Inference Engine</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• vLLM 0.2.7 with 2-10x performance improvement</li>
                <li>• 7 specialized models with intelligent routing</li>
                <li>• Mixtral-8x7B for general reasoning</li>
                <li>• Yi-34B for 32K context processing</li>
                <li>• DeepCoder-14B for code intelligence and debugging</li>
                <li>• MiMo-VL-7B-RL for multimodal capabilities</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Infrastructure Components</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• PostgreSQL 16.1 + Redis 7.2.4 data layer</li>
                <li>• Qdrant 1.7.4 vector database</li>
                <li>• Prometheus + Grafana monitoring</li>
                <li>• LangGraph workflow orchestration</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">HANA-X Architecture Principles</h4>
            <ul className="space-y-1 text-sm text-blue-800">
              <li>• Intelligent task routing with automatic model selection</li>
              <li>• Specialized model deployment for optimal performance</li>
              <li>• Production-ready service management with systemd</li>
              <li>• Development-friendly configuration with minimal barriers</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Specialized Model Deployment</CardTitle>
        <CardDescription>Seven purpose-built AI models with intelligent task routing</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Text Processing Models</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Mixtral-8x7B (Port 11400)</strong>
                  <p className="text-gray-600">General reasoning and fallback operations</p>
                </div>
                <div>
                  <strong>Nous Hermes 2 Mistral (Port 11401)</strong>
                  <p className="text-gray-600">RAG-optimized for document Q&A</p>
                </div>
                <div>
                  <strong>OpenChat 3.5 (Port 11402)</strong>
                  <p className="text-gray-600">Dialogue and tool integration</p>
                </div>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Specialized Models</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Phi-3 Mini (Port 11403)</strong>
                  <p className="text-gray-600">Ultra-fast micro-agent operations</p>
                </div>
                <div>
                  <strong>Yi-34B (Port 11404)</strong>
                  <p className="text-gray-600">32K context for long documents</p>
                </div>
                <div>
                  <strong>DeepCoder-14B (Port 11405)</strong>
                  <p className="text-gray-600">Code intelligence and debugging</p>
                </div>
                <div>
                  <strong>MiMo-VL-7B-RL (Port 11500)</strong>
                  <p className="text-gray-600">Vision-language multimodal processing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Intelligent Task Routing System</CardTitle>
        <CardDescription>Automatic model selection and request optimization</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Request Analysis</h3>
              <p className="text-sm text-gray-600 mb-2">Intelligent content inspection</p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Token length analysis</li>
                <li>• Content type detection</li>
                <li>• Image/multimodal routing</li>
                <li>• Performance requirements</li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Model Selection</h3>
              <p className="text-sm text-gray-600 mb-2">Optimal model assignment</p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Task-specific optimization</li>
                <li>• Load balancing</li>
                <li>• Fallback strategies</li>
                <li>• Performance monitoring</li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Response Optimization</h3>
              <p className="text-sm text-gray-600 mb-2">Enhanced user experience</p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Caching strategies</li>
                <li>• Response formatting</li>
                <li>• Error handling</li>
                <li>• Analytics collection</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
)

// Infrastructure Diagrams Page
const DiagramsPage = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-gray-900">Infrastructure Diagrams</h1>
    <p className="text-lg text-gray-600">Visual representation of system architecture and data flows.</p>
    
    <Card>
      <CardHeader>
        <CardTitle>Network Topology</CardTitle>
        <CardDescription>HANA-X Lab network configuration and server connectivity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="text-center mb-4">
            <h3 className="font-semibold">HANA-X Lab Network (192.168.10.0/24)</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white p-3 rounded border text-center">
              <div className="font-semibold">Database</div>
              <div className="text-gray-600">192.168.10.35</div>
              <div className="text-xs text-gray-500">PostgreSQL + Redis</div>
            </div>
            <div className="bg-white p-3 rounded border text-center">
              <div className="font-semibold">LLM</div>
              <div className="text-gray-600">192.168.10.29</div>
              <div className="text-xs text-gray-500">vLLM + 6 Models</div>
            </div>
            <div className="bg-white p-3 rounded border text-center">
              <div className="font-semibold">Vector DB</div>
              <div className="text-gray-600">192.168.10.30</div>
              <div className="text-xs text-gray-500">Qdrant</div>
            </div>
            <div className="bg-white p-3 rounded border text-center">
              <div className="font-semibold">Development</div>
              <div className="text-gray-600">192.168.10.33</div>
              <div className="text-xs text-gray-500">MiMo-VL + AG-UI</div>
            </div>
            <div className="bg-white p-3 rounded border text-center">
              <div className="font-semibold">Testing</div>
              <div className="text-gray-600">192.168.10.34</div>
              <div className="text-xs text-gray-500">pytest + Selenium</div>
            </div>
            <div className="bg-white p-3 rounded border text-center">
              <div className="font-semibold">Orchestration</div>
              <div className="text-gray-600">192.168.10.31</div>
              <div className="text-xs text-gray-500">LangGraph</div>
            </div>
            <div className="bg-white p-3 rounded border text-center">
              <div className="font-semibold">DevOps</div>
              <div className="text-gray-600">192.168.10.36</div>
              <div className="text-xs text-gray-500">Prometheus</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Data Flow Architecture</CardTitle>
        <CardDescription>Information flow between system components</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">HANA-X Request Processing Flow</h4>
            <div className="flex items-center space-x-2 text-sm">
              <span className="bg-blue-100 px-2 py-1 rounded">User Interface</span>
              <ChevronRight className="h-4 w-4" />
              <span className="bg-green-100 px-2 py-1 rounded">Task Router</span>
              <ChevronRight className="h-4 w-4" />
              <span className="bg-purple-100 px-2 py-1 rounded">Specialized Model</span>
              <ChevronRight className="h-4 w-4" />
              <span className="bg-orange-100 px-2 py-1 rounded">Response Cache</span>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">AI Processing Pipeline</h4>
            <div className="flex items-center space-x-2 text-sm">
              <span className="bg-red-100 px-2 py-1 rounded">Input</span>
              <ChevronRight className="h-4 w-4" />
              <span className="bg-yellow-100 px-2 py-1 rounded">Vector Search</span>
              <ChevronRight className="h-4 w-4" />
              <span className="bg-indigo-100 px-2 py-1 rounded">LLM Generation</span>
              <ChevronRight className="h-4 w-4" />
              <span className="bg-pink-100 px-2 py-1 rounded">Response</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
)

// Server Configuration Page
const ServersPage = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-gray-900">Server Configuration</h1>
    <p className="text-lg text-gray-600">Detailed configuration specifications for all HANA-X Lab servers.</p>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-5 w-5" />
            <span>Database Server (db)</span>
          </CardTitle>
          <CardDescription>192.168.10.35 - Foundation infrastructure</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-sm">Software Stack</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• PostgreSQL 16.1 (primary database)</li>
                <li>• Redis 7.2.4 (caching layer)</li>
                <li>• Ubuntu 24.04 Desktop</li>
                <li>• Python 3.12.x (native)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm">Hardware Specs</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 16 CPU cores</li>
                <li>• 64GB RAM</li>
                <li>• 1TB NVMe SSD</li>
                <li>• 10Gbps Ethernet</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm">Database Accounts</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• hxadmin (administrative)</li>
                <li>• hxapp (application)</li>
                <li>• hxdev (development)</li>
                <li>• hxtest (testing)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5" />
            <span>LLM Server (llm)</span>
          </CardTitle>
          <CardDescription>192.168.10.29 - AI processing core</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-sm">AI Stack</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Ollama 0.1.26 (LLM runtime)</li>
                <li>• CUDA 12.4 (GPU acceleration)</li>
                <li>• Multiple model support</li>
                <li>• RAG pipeline ready</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm">Hardware Specs</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 16 CPU cores</li>
                <li>• 64GB RAM</li>
                <li>• 2x RTX 4070 Ti SUPER</li>
                <li>• 1TB NVMe SSD</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Code className="h-5 w-5" />
            <span>Development Server (dev)</span>
          </CardTitle>
          <CardDescription>192.168.10.33 - Development environment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-sm">Development Stack</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• VS Code Server 4.20.0</li>
                <li>• AG-UI Component Library</li>
                <li>• CopilotKit Integration</li>
                <li>• Node.js 20 + Python 3.12.x</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm">Frontend Frameworks</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• React 18 + TypeScript</li>
                <li>• @ag-ui/components</li>
                <li>• @copilotkit/react-core</li>
                <li>• Tailwind CSS</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TestTube className="h-5 w-5" />
            <span>Testing Server (test)</span>
          </CardTitle>
          <CardDescription>192.168.10.34 - QA and testing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-sm">Testing Stack</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• pytest (Python testing)</li>
                <li>• Selenium Grid (web testing)</li>
                <li>• Jenkins (CI/CD)</li>
                <li>• Performance testing tools</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
)

// Technology Stack Page
const TechStackPage = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-gray-900">Technology Stack</h1>
    <p className="text-lg text-gray-600">Comprehensive mapping of all 170+ technologies across the infrastructure.</p>
    
    <Card>
      <CardHeader>
        <CardTitle>Master Technology Distribution</CardTitle>
        <CardDescription>Overview of technology allocation across all servers</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Category</th>
                <th className="text-left p-2">db</th>
                <th className="text-left p-2">llm</th>
                <th className="text-left p-2">vectordb</th>
                <th className="text-left p-2">dev</th>
                <th className="text-left p-2">test</th>
                <th className="text-left p-2">orca</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              <tr className="border-b">
                <td className="p-2 font-semibold">Operating System</td>
                <td className="p-2">Ubuntu 24.04</td>
                <td className="p-2">Ubuntu 24.04</td>
                <td className="p-2">Ubuntu 24.04</td>
                <td className="p-2">Ubuntu 24.04</td>
                <td className="p-2">Ubuntu 24.04</td>
                <td className="p-2">Ubuntu 24.04</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-semibold">Programming Runtime</td>
                <td className="p-2">Python 3.12.x</td>
                <td className="p-2">Python 3.12.x</td>
                <td className="p-2">Python 3.12.x</td>
                <td className="p-2">Python 3.12.x, Node.js 20</td>
                <td className="p-2">Python 3.12.x, Node.js 20</td>
                <td className="p-2">Python 3.12.x</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-semibold">Frontend Frameworks</td>
                <td className="p-2">-</td>
                <td className="p-2">-</td>
                <td className="p-2">-</td>
                <td className="p-2">AG-UI, CopilotKit, React 18</td>
                <td className="p-2">Testing frameworks</td>
                <td className="p-2">-</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-semibold">Database Systems</td>
                <td className="p-2">PostgreSQL 16.1, Redis 7.2.4</td>
                <td className="p-2">-</td>
                <td className="p-2">Qdrant 1.7.4</td>
                <td className="p-2">Development DBs</td>
                <td className="p-2">Test DBs</td>
                <td className="p-2">-</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-semibold">AI/ML Stack</td>
                <td className="p-2">-</td>
                <td className="p-2">Ollama 0.1.26, CUDA 12.4</td>
                <td className="p-2">Vector embeddings</td>
                <td className="p-2">AI development tools</td>
                <td className="p-2">AI testing</td>
                <td className="p-2">LangGraph 0.0.40</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Enterprise Frontend Frameworks</CardTitle>
          <CardDescription>Professional UI development stack</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-sm mb-2">AG-UI Component Library</h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• @ag-ui/components (enterprise React components)</li>
                <li>• AGGrid, AGCard, AGTypography, AGChip</li>
                <li>• AGButton, AGTabs, AGDataGrid</li>
                <li>• AGChatInterface, AGSelect, AGSlider</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">CopilotKit Integration</h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• @copilotkit/react-core (AI integration)</li>
                <li>• useCopilotChat, useCopilotAction</li>
                <li>• CopilotProvider, CopilotTextarea</li>
                <li>• CopilotSidebar, AI-powered interfaces</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Database Account Naming Convention</CardTitle>
          <CardDescription>Standardized account structure across all servers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span className="font-mono text-sm">hxadmin</span>
              <span className="text-xs text-gray-600">Administrative account</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span className="font-mono text-sm">hxapp</span>
              <span className="text-xs text-gray-600">Application service account</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span className="font-mono text-sm">hxdev</span>
              <span className="text-xs text-gray-600">Development account</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span className="font-mono text-sm">hxtest</span>
              <span className="text-xs text-gray-600">Testing account</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span className="font-mono text-sm">hxmonitor</span>
              <span className="text-xs text-gray-600">Monitoring account</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span className="font-mono text-sm">hxbackup</span>
              <span className="text-xs text-gray-600">Backup account</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
)

// Deployment Order Page
const DeploymentPage = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-gray-900">Deployment Order</h1>
    <p className="text-lg text-gray-600">Systematic 7-phase deployment strategy with dependency analysis.</p>
    
    <Card>
      <CardHeader>
        <CardTitle>Deployment Sequence Overview</CardTitle>
        <CardDescription>Optimal ordering based on dependencies and critical path analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[
            { phase: 1, name: 'Database Server (db)', duration: 'Days 1-4', description: 'Foundation infrastructure - no dependencies', color: 'bg-blue-100 text-blue-800' },
            { phase: 2, name: 'Development Server (dev)', duration: 'Days 4-7', description: 'Development environment setup', color: 'bg-green-100 text-green-800' },
            { phase: 3, name: 'DevOps Server (dev-ops)', duration: 'Days 6-11', description: 'Monitoring foundation', color: 'bg-purple-100 text-purple-800' },
            { phase: 4, name: 'Vector Database (vectordb)', duration: 'Days 9-15', description: 'Semantic search capabilities', color: 'bg-orange-100 text-orange-800' },
            { phase: 5, name: 'LLM Server (llm)', duration: 'Days 12-20', description: 'AI processing core', color: 'bg-red-100 text-red-800' },
            { phase: 6, name: 'Testing Server (test)', duration: 'Days 17-24', description: 'Quality assurance validation', color: 'bg-yellow-100 text-yellow-800' },
            { phase: 7, name: 'Orchestration (orca)', duration: 'Days 20-28', description: 'Workflow coordination', color: 'bg-indigo-100 text-indigo-800' },
          ].map((phase) => (
            <div key={phase.phase} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${phase.color}`}>
                    Phase {phase.phase}
                  </span>
                  <h3 className="font-semibold">{phase.name}</h3>
                </div>
                <span className="text-sm text-gray-600">{phase.duration}</span>
              </div>
              <p className="text-sm text-gray-600">{phase.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Critical Dependencies</CardTitle>
          <CardDescription>Key dependency relationships driving deployment order</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-sm">Database First</h4>
              <p className="text-xs text-gray-600">Foundation for all other components - no external dependencies</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-sm">Development Early</h4>
              <p className="text-xs text-gray-600">Enables parallel development while infrastructure deploys</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <h4 className="font-semibold text-sm">Vector DB Before LLM</h4>
              <p className="text-xs text-gray-600">LLM server requires vector search for RAG workflows</p>
            </div>
            <div className="p-3 bg-indigo-50 rounded-lg">
              <h4 className="font-semibold text-sm">Orchestration Last</h4>
              <p className="text-xs text-gray-600">Requires all components operational for coordination</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Implementation Benefits</CardTitle>
          <CardDescription>Advantages of the systematic deployment approach</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
              <span className="text-sm">Minimized deployment risks through dependency management</span>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
              <span className="text-sm">Optimized timeline with parallel development opportunities</span>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
              <span className="text-sm">Comprehensive validation at each phase</span>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
              <span className="text-sm">Early problem detection and resolution</span>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
              <span className="text-sm">Professional implementation with clear milestones</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
)

// Implementation Roadmap Page
const RoadmapPage = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-gray-900">Implementation Roadmap</h1>
    <p className="text-lg text-gray-600">10-week systematic deployment plan with clear phases and milestones.</p>
    
    <Card>
      <CardHeader>
        <CardTitle>Timeline Overview</CardTitle>
        <CardDescription>Complete implementation schedule with phase overlaps</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">10</div>
              <div className="text-sm text-gray-600">Total Weeks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">7</div>
              <div className="text-sm text-gray-600">Deployment Phases</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">6</div>
              <div className="text-sm text-gray-600">Server Deployments</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">28</div>
              <div className="text-sm text-gray-600">Implementation Days</div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-2">Key Milestones</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Week 1:</strong> Database foundation operational<br/>
                <strong>Week 2:</strong> Development environment ready<br/>
                <strong>Week 3:</strong> Monitoring and vector search deployed
              </div>
              <div>
                <strong>Week 4-5:</strong> AI processing capabilities online<br/>
                <strong>Week 6:</strong> Testing infrastructure validated<br/>
                <strong>Week 7-10:</strong> Full orchestration and optimization
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Risk Management</CardTitle>
        <CardDescription>Identified risks and mitigation strategies</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3">Technical Risks</h4>
            <div className="space-y-2 text-sm">
              <div className="p-2 bg-red-50 rounded">
                <strong>GPU Driver Issues:</strong> Pre-validate CUDA compatibility
              </div>
              <div className="p-2 bg-yellow-50 rounded">
                <strong>Network Configuration:</strong> Test connectivity early
              </div>
              <div className="p-2 bg-orange-50 rounded">
                <strong>Performance Bottlenecks:</strong> Monitor resource utilization
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Mitigation Strategies</h4>
            <div className="space-y-2 text-sm">
              <div className="p-2 bg-green-50 rounded">
                <strong>Rollback Procedures:</strong> Documented for each phase
              </div>
              <div className="p-2 bg-blue-50 rounded">
                <strong>Validation Checkpoints:</strong> Comprehensive testing
              </div>
              <div className="p-2 bg-purple-50 rounded">
                <strong>Parallel Development:</strong> Minimize critical path delays
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
)

// Phase 1 PRD Page
const Phase1PRDPage = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-gray-900">Phase 1 PRD</h1>
    <p className="text-lg text-gray-600">Product Requirements Document for Database Server deployment.</p>
    
    <Card>
      <CardHeader>
        <CardTitle>Executive Summary</CardTitle>
        <CardDescription>Phase 1 objectives and strategic importance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-gray-700">
            Phase 1 establishes the foundational database infrastructure for the Citadel Beta Release, 
            deploying PostgreSQL 16.1 and Redis 7.2.4 on Ubuntu 24.04 with development-optimized 
            configuration that minimizes security barriers while maintaining essential functionality.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900">Primary Objective</h4>
              <p className="text-sm text-blue-800">Deploy stable database foundation</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900">Success Criteria</h4>                <p className="text-sm text-green-800">100+ concurrent connections, &lt;100ms response</p>            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-900">Timeline</h4>
              <p className="text-sm text-purple-800">4 days implementation</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Technical Requirements</CardTitle>
        <CardDescription>Detailed specifications and constraints</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Functional Requirements</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• PostgreSQL 16.1 database engine with development-optimized configuration</li>
              <li>• Redis 7.2.4 caching system with 16GB memory allocation</li>
              <li>• Predetermined database accounts (hxadmin, hxapp, hxdev, hxtest, hxmonitor, hxbackup)</li>
              <li>• Local backup procedures with 7-day retention</li>
              <li>• Basic performance monitoring without administrative complexity</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Non-Functional Requirements</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Support minimum 100 concurrent development connections</li>
              <li>• Database query response time &lt;100ms for development workloads</li>
              <li>• 99.9% availability during development hours</li>
              <li>• Local backup completion within 30 minutes</li>
              <li>• Minimal security restrictions to prevent development barriers</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Hardware Specifications</h4>
            <div className="bg-gray-50 p-3 rounded text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <strong>CPU:</strong> 16 cores minimum<br/>
                  <strong>Memory:</strong> 64GB RAM<br/>
                  <strong>Storage:</strong> 1TB NVMe SSD
                </div>
                <div>
                  <strong>Network:</strong> 10Gbps Ethernet<br/>
                  <strong>IP Address:</strong> 192.168.10.35<br/>
                  <strong>Hostname:</strong> db
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>User Stories & Acceptance Criteria</CardTitle>
        <CardDescription>Stakeholder requirements and validation criteria</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-semibold">As a Development Team Member</h4>
            <p className="text-sm text-gray-600 mb-2">
              I want easy access to development databases so that I can efficiently develop and test Citadel platform features.
            </p>
            <div className="text-xs text-gray-500">
              <strong>Acceptance Criteria:</strong>
              <ul className="list-disc list-inside mt-1">
                <li>Can connect to PostgreSQL using hxdev account without authentication barriers</li>
                <li>Can access Redis cache for development testing</li>
                <li>Database performance adequate for development workloads</li>
              </ul>
            </div>
          </div>

          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-semibold">As a Database Administrator</h4>
            <p className="text-sm text-gray-600 mb-2">
              I want reliable database operations with simple backup procedures so that data is protected without operational complexity.
            </p>
            <div className="text-xs text-gray-500">
              <strong>Acceptance Criteria:</strong>
              <ul className="list-disc list-inside mt-1">
                <li>Automated nightly backups complete successfully</li>
                <li>Backup recovery procedures tested and documented</li>
                <li>Basic monitoring provides visibility into database health</li>
              </ul>
            </div>
          </div>

          <div className="border-l-4 border-purple-500 pl-4">
            <h4 className="font-semibold">As a System Administrator</h4>
            <p className="text-sm text-gray-600 mb-2">
              I want stable database server operation with minimal maintenance overhead so that the development team can focus on application development.
            </p>
            <div className="text-xs text-gray-500">
              <strong>Acceptance Criteria:</strong>
              <ul className="list-disc list-inside mt-1">
                <li>Database server operates reliably with 99.9% uptime</li>
                <li>System resources adequately allocated and monitored</li>
                <li>Integration ready for Phase 2 development server deployment</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
)

// Phase 1 Tasks Page
const Phase1TasksPage = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-gray-900">Phase 1 Task List</h1>
    <p className="text-lg text-gray-600">Granular implementation tasks for Database Server deployment.</p>
    
    <Card>
      <CardHeader>
        <CardTitle>Task Overview</CardTitle>
        <CardDescription>Development-optimized task breakdown with minimal security barriers</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">10</div>
            <div className="text-sm text-blue-800">Major Tasks</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">40+</div>
            <div className="text-sm text-green-800">Sub-Tasks</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">160+</div>
            <div className="text-sm text-purple-800">Validation Checks</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">2-4h</div>
            <div className="text-sm text-orange-800">Task Duration</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-2">Key Development-Friendly Features</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <ul className="space-y-1">
                <li>• Minimal security hardening to prevent development issues</li>
                <li>• Simplified authentication and access controls</li>
                <li>• Development-friendly firewall configuration</li>
                <li>• Easy SSH access with password authentication</li>
              </ul>
              <ul className="space-y-1">
                <li>• Predetermined database accounts with naming convention</li>
                <li>• Local backup storage without external dependencies</li>
                <li>• Basic monitoring without administrative complexity</li>
                <li>• Performance optimization for development workloads</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <div className="space-y-4">
      {[
        {
          id: 'DB-001',
          title: 'Ubuntu 24.04 Desktop Installation',
          duration: '2-3 hours',
          description: 'Install Ubuntu 24.04 Desktop with development-friendly configuration',
          subTasks: [
            'Pre-installation hardware verification',
            'Ubuntu 24.04 installation media preparation', 
            'Operating system installation with development configuration',
            'Initial system updates and Python 3.12.x verification'
          ]
        },
        {
          id: 'DB-002', 
          title: 'Network Configuration and Hostname Setup',
          duration: '1-2 hours',
          description: 'Configure static IP (192.168.10.35) and HANA-X Lab hostname mapping',
          subTasks: [
            'Static IP address configuration (192.168.10.35)',
            'Hostname configuration and HANA-X Lab hosts file setup',
            'Basic firewall configuration (development-friendly)',
            'Network performance basic configuration'
          ]
        },
        {
          id: 'DB-003',
          title: 'Basic System Configuration and User Setup', 
          duration: '1-2 hours',
          description: 'Configure agent0 user and development-friendly system settings',
          subTasks: [
            'Agent0 user configuration and development access',
            'SSH configuration for development access',
            'Basic system logging configuration',
            'Development tools and utilities installation'
          ]
        },
        {
          id: 'DB-004',
          title: 'PostgreSQL 16.1 Installation and Configuration',
          duration: '2-3 hours', 
          description: 'Install PostgreSQL with development-optimized performance settings',
          subTasks: [
            'PostgreSQL repository and package installation',
            'PostgreSQL service configuration and startup',
            'PostgreSQL performance configuration for development',
            'PostgreSQL development-friendly security configuration'
          ]
        },
        {
          id: 'DB-005',
          title: 'Redis 7.2.4 Installation and Configuration',
          duration: '1-2 hours',
          description: 'Install Redis caching system with development-friendly access',
          subTasks: [
            'Redis package installation and service setup',
            'Redis development-friendly configuration',
            'Redis basic persistence configuration', 
            'Redis development access configuration'
          ]
        },
        {
          id: 'DB-006',
          title: 'Database User Management and Naming Conventions',
          duration: '2-3 hours',
          description: 'Create predetermined database accounts with HANA-X Lab naming convention',
          subTasks: [
            'HANA-X Lab database account naming convention implementation',
            'Development-friendly access control configuration',
            'Database schema and development database creation',
            'Account documentation and team access setup'
          ]
        }
      ].map((task, index) => (
        <Card key={task.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{task.title}</CardTitle>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">{task.id}</Badge>
                <Badge variant="secondary">{task.duration}</Badge>
              </div>
            </div>
            <CardDescription>{task.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <h4 className="font-semibold text-sm mb-2">Sub-Tasks:</h4>
              <ul className="space-y-1">
                {task.subTasks.map((subTask, subIndex) => (
                  <li key={subIndex} className="flex items-start space-x-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{subTask}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>

    <Card>
      <CardHeader>
        <CardTitle>HANA-X Lab Database Account Naming Convention</CardTitle>
        <CardDescription>Standardized account structure for consistent implementation</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { account: 'hxadmin', purpose: 'Administrative account for database management' },
            { account: 'hxapp', purpose: 'Application service account for Citadel platform' },
            { account: 'hxdev', purpose: 'Development account for development team access' },
            { account: 'hxtest', purpose: 'Testing account for automated testing and QA' },
            { account: 'hxmonitor', purpose: 'Monitoring account for system monitoring' },
            { account: 'hxbackup', purpose: 'Backup account for backup and recovery operations' }
          ].map((item, index) => (
            <div key={index} className="p-3 border rounded-lg">
              <div className="font-mono text-sm font-semibold text-blue-600">{item.account}</div>
              <div className="text-xs text-gray-600 mt-1">{item.purpose}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
)

// Main App Component
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        
        <div className="lg:pl-64">
          <div className="sticky top-0 z-40 lg:hidden">
            <div className="flex items-center justify-between bg-white border-b px-4 py-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-2">
                <Cpu className="h-6 w-6 text-blue-600" />
                <span className="font-bold text-gray-900">Citadel AI OS</span>
              </div>
              <div className="w-8" />
            </div>
          </div>
          
          <main className="p-6">
            <Routes>
              <Route path="/" element={<OverviewPage />} />
              <Route path="/architecture" element={<ArchitecturePage />} />
              <Route path="/business-apps" element={<BusinessAppsPage />} />
              <Route path="/ai-inference" element={<AIInferencePage />} />
              <Route path="/enterprise" element={<EnterprisePage />} />
              <Route path="/techstack" element={<TechStackPage />} />
              <Route path="/deployment" element={<DeploymentPage />} />
              <Route path="/monitoring" element={<MonitoringPage />} />
              <Route path="/security" element={<SecurityPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App



// Business Applications Page
const BusinessAppsPage = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-gray-900">Business Applications Suite</h1>
    <p className="text-lg text-gray-600">Ready-to-deploy AI applications for finance, HR, legal, and IT operations.</p>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Briefcase className="h-5 w-5 text-green-600" />
            <span>Finance Applications</span>
          </CardTitle>
          <CardDescription>Automated financial operations and compliance</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
              <span className="text-sm">Invoice processing with 70-90% automation</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
              <span className="text-sm">Expense classification and reporting</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
              <span className="text-sm">Compliance monitoring and alerts</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
              <span className="text-sm">Financial analytics and insights</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-blue-600" />
            <span>HR Applications</span>
          </CardTitle>
          <CardDescription>Intelligent human resources automation</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
              <span className="text-sm">Resume screening with 60-80% efficiency gain</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
              <span className="text-sm">Interview preparation and candidate research</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
              <span className="text-sm">Employee onboarding automation</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
              <span className="text-sm">Performance management tracking</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-purple-600" />
            <span>Legal Applications</span>
          </CardTitle>
          <CardDescription>Contract analysis and compliance management</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
              <span className="text-sm">Contract analysis with 60-80% time reduction</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
              <span className="text-sm">Risk assessment and scoring</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
              <span className="text-sm">Compliance tracking and reporting</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
              <span className="text-sm">Legal research and document analysis</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5 text-orange-600" />
            <span>IT Operations</span>
          </CardTitle>
          <CardDescription>Automated incident management and system monitoring</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
              <span className="text-sm">Incident triage with 50-70% faster resolution</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
              <span className="text-sm">Automated remediation and self-healing</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
              <span className="text-sm">System monitoring and alerting</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
              <span className="text-sm">Capacity planning and optimization</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  </div>
)

// AI Inference Page
const AIInferencePage = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-gray-900">HANA-X AI Inference Engine</h1>
    <p className="text-lg text-gray-600">7 specialized models with intelligent task routing and advanced capabilities.</p>
    
    <Card>
      <CardHeader>
        <CardTitle>Specialized Model Architecture</CardTitle>
        <CardDescription>Purpose-built models optimized for specific business tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-blue-600">Mixtral-8x7B (Port 11400)</h4>
              <p className="text-sm text-gray-600">General reasoning and fallback operations</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-green-600">Nous Hermes 2 Mistral (Port 11401)</h4>
              <p className="text-sm text-gray-600">RAG-optimized for document Q&A</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-purple-600">OpenChat 3.5 (Port 11402)</h4>
              <p className="text-sm text-gray-600">Interactive workflows and tool integration</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-orange-600">Phi-3 Mini (Port 11403)</h4>
              <p className="text-sm text-gray-600">Ultra-fast operations and quick responses</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-red-600">Yi-34B (Port 11404)</h4>
              <p className="text-sm text-gray-600">32K context for long document processing</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-indigo-600">DeepCoder-14B (Port 11405)</h4>
              <p className="text-sm text-gray-600">Code intelligence and debugging</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-pink-600">MiMo-VL-7B-RL (Port 11406)</h4>
              <p className="text-sm text-gray-600">Vision-language multimodal processing</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
)

// Enterprise Features Page
const EnterprisePage = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-gray-900">Enterprise Features</h1>
    <p className="text-lg text-gray-600">Governance, security, and operational excellence for enterprise deployment.</p>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-blue-600" />
            <span>Proactor Agent Runtime</span>
          </CardTitle>
          <CardDescription>Structured agent lifecycle with comprehensive governance</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
              <span className="text-sm">5-phase lifecycle: Init → Plan → Execute → Analyze → Log</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
              <span className="text-sm">Agent Activity Log Schema (AALS) for audit trails</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
              <span className="text-sm">Real-time policy enforcement and validation</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
              <span className="text-sm">Multi-agent workflow orchestration</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-green-600" />
            <span>Clerk Identity Management</span>
          </CardTitle>
          <CardDescription>Enterprise authentication and authorization</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
              <span className="text-sm">Enterprise SSO and MFA support</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
              <span className="text-sm">Role-based access control (RBAC)</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
              <span className="text-sm">Directory integration and user management</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
              <span className="text-sm">Fine-grained permissions and policies</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  </div>
)

// Monitoring Page
const MonitoringPage = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-gray-900">Operations & Monitoring</h1>
    <p className="text-lg text-gray-600">Comprehensive observability and operational excellence framework.</p>
    
    <Card>
      <CardHeader>
        <CardTitle>Monitoring Stack</CardTitle>
        <CardDescription>Complete observability with metrics, logs, and alerting</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Monitor className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h4 className="font-semibold">Prometheus 2.48</h4>
            <p className="text-sm text-gray-600">Metrics collection and alerting</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <Database className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h4 className="font-semibold">Grafana 10.2</h4>
            <p className="text-sm text-gray-600">Visualization and dashboards</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <FileText className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <h4 className="font-semibold">Loki 2.9</h4>
            <p className="text-sm text-gray-600">Log aggregation and analysis</p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
)

// Security Page
const SecurityPage = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-gray-900">Security & Governance</h1>
    <p className="text-lg text-gray-600">Enterprise-grade security framework with comprehensive audit capabilities.</p>
    
    <Card>
      <CardHeader>
        <CardTitle>Security Framework</CardTitle>
        <CardDescription>Multi-layered security with governance and compliance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3">Security Features</h4>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <Shield className="h-4 w-4 text-green-500 mt-0.5" />
                <span className="text-sm">End-to-end encryption</span>
              </li>
              <li className="flex items-start space-x-2">
                <Shield className="h-4 w-4 text-green-500 mt-0.5" />
                <span className="text-sm">RBAC with fine-grained permissions</span>
              </li>
              <li className="flex items-start space-x-2">
                <Shield className="h-4 w-4 text-green-500 mt-0.5" />
                <span className="text-sm">Comprehensive audit trails</span>
              </li>
              <li className="flex items-start space-x-2">
                <Shield className="h-4 w-4 text-green-500 mt-0.5" />
                <span className="text-sm">SIEM integration</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Compliance</h4>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span className="text-sm">GDPR compliance</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span className="text-sm">HIPAA ready</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span className="text-sm">SOX compliance</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span className="text-sm">Industry standards</span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
)

