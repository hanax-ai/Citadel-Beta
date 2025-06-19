import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { ScrollArea } from '@/components/ui/scroll-area.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { 
  Server, 
  Database, 
  Brain, 
  Code, 
  TestTube, 
  Settings, 
  Monitor,
  Shield,
  Layers,
  Network,
  HardDrive,
  Cpu,
  Memory,
  Zap,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react'

const ArchitecturePage = () => {
  const serverSpecs = [
    {
      name: 'Database Server',
      hostname: 'db',
      ip: '192.168.10.35',
      icon: Database,
      color: 'text-blue-600',
      role: 'Central Data Hub',
      technologies: ['PostgreSQL 16.1', 'Redis 7.2.4', 'pgAdmin 4', 'Redis Insight'],
      specs: {
        cpu: '16 cores',
        memory: '64GB RAM',
        storage: '1TB NVMe SSD',
        network: '10Gbps'
      },
      description: 'Serves as the central data persistence and management hub for the entire Citadel platform, hosting both relational and in-memory data storage systems.'
    },
    {
      name: 'Language Model Server',
      hostname: 'llm',
      ip: '192.168.10.29',
      icon: Brain,
      color: 'text-green-600',
      role: 'AI Processing Hub',
      technologies: ['Ollama 0.1.26', 'CUDA 12.4', 'Nginx 1.24.0', 'Multiple LLMs'],
      specs: {
        cpu: '16 cores',
        memory: '64GB RAM',
        storage: '1TB NVMe SSD',
        gpu: '2x RTX 4070 Ti SUPER',
        network: '10Gbps'
      },
      description: 'Provides core AI processing capabilities, hosting large language models and inference services for natural language processing and code generation.'
    },
    {
      name: 'Vector Database Server',
      hostname: 'vectordb',
      ip: '192.168.10.30',
      icon: Network,
      color: 'text-purple-600',
      role: 'Semantic Search Engine',
      technologies: ['Qdrant 1.7.4', 'Docker 24.0.7', 'Embedding Services', 'FastAPI'],
      specs: {
        cpu: '16 cores',
        memory: '64GB RAM',
        storage: '1TB NVMe SSD',
        network: '10Gbps'
      },
      description: 'Specialized storage and retrieval for high-dimensional vector data, supporting semantic search and AI-powered content discovery.'
    },
    {
      name: 'Development Server',
      hostname: 'dev',
      ip: '192.168.10.33',
      icon: Code,
      color: 'text-orange-600',
      role: 'Development Environment',
      technologies: ['VS Code Server 4.20.0', 'Node.js 20', 'Python 3.11', 'Docker'],
      specs: {
        cpu: '16 cores',
        memory: '64GB RAM',
        storage: '1TB NVMe SSD',
        network: '10Gbps'
      },
      description: 'Primary development environment with web-based IDE and comprehensive development tools for efficient software development.'
    },
    {
      name: 'Testing Server',
      hostname: 'test',
      ip: '192.168.10.34',
      icon: TestTube,
      color: 'text-red-600',
      role: 'Quality Assurance Hub',
      technologies: ['pytest 7.4.3', 'Selenium Grid', 'Jenkins 2.426.1', 'Performance Tools'],
      specs: {
        cpu: '16 cores',
        memory: '64GB RAM',
        storage: '1TB NVMe SSD',
        network: '10Gbps'
      },
      description: 'Comprehensive testing infrastructure for quality assurance, automated testing, and performance validation of platform components.'
    },
    {
      name: 'Orchestration Server',
      hostname: 'orca',
      ip: '192.168.10.31',
      icon: Settings,
      color: 'text-indigo-600',
      role: 'Workflow Coordinator',
      technologies: ['LangGraph 0.0.40', 'Celery 5.3.4', 'RabbitMQ 3.12.10', 'FastAPI'],
      specs: {
        cpu: '16 cores',
        memory: '64GB RAM',
        storage: '1TB NVMe SSD',
        network: '10Gbps'
      },
      description: 'Manages complex workflow coordination and multi-agent functionality with sophisticated AI agent orchestration capabilities.'
    },
    {
      name: 'DevOps Server',
      hostname: 'dev-ops',
      ip: '192.168.10.36',
      icon: Monitor,
      color: 'text-cyan-600',
      role: 'Operations Management',
      technologies: ['Windows 11 Pro', 'Prometheus 2.48.0', 'Grafana 10.2.2', 'PowerShell 7'],
      specs: {
        cpu: '16 cores',
        memory: '64GB RAM',
        storage: '1TB NVMe SSD',
        network: '10Gbps'
      },
      description: 'Comprehensive infrastructure management, monitoring, and operational support using Windows 11 with integrated Linux capabilities.'
    }
  ]

  const architecturePrinciples = [
    {
      title: 'Scalability',
      description: 'Designed for horizontal scaling with container orchestration and load balancing capabilities',
      icon: Layers
    },
    {
      title: 'Reliability',
      description: 'High availability design with redundancy planning and comprehensive monitoring',
      icon: Shield
    },
    {
      title: 'Performance',
      description: 'Optimized for AI workloads with GPU acceleration and high-speed networking',
      icon: Zap
    },
    {
      title: 'Maintainability',
      description: 'Clear separation of concerns with documented procedures and automated operations',
      icon: Settings
    }
  ]

  const networkTopology = [
    { source: 'All Servers', target: 'db (192.168.10.35)', protocol: 'PostgreSQL/Redis', port: '5432/6379', purpose: 'Database/Cache Access' },
    { source: 'orca, dev, test', target: 'llm (192.168.10.29)', protocol: 'HTTP', port: '11434', purpose: 'LLM Inference' },
    { source: 'llm, orca', target: 'vectordb (192.168.10.30)', protocol: 'HTTP', port: '6333', purpose: 'Vector Operations' },
    { source: 'All Servers', target: 'dev-ops (192.168.10.36)', protocol: 'HTTP', port: '9090', purpose: 'Metrics Collection' },
    { source: 'dev, test', target: 'orca (192.168.10.31)', protocol: 'HTTP', port: '8000', purpose: 'Workflow API' },
    { source: 'orca', target: 'orca (192.168.10.31)', protocol: 'AMQP', port: '5672', purpose: 'Message Queue' }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Layers className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">Architecture Blueprint</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Comprehensive system architecture for the Citadel Beta Release infrastructure, 
          designed for enterprise-grade AI orchestration with systematic deployment across 
          the HANA-X Lab environment.
        </p>
      </div>

      {/* Architecture Principles */}
      <Card>
        <CardHeader>
          <CardTitle>Architecture Principles</CardTitle>
          <CardDescription>
            Core design principles guiding the Citadel infrastructure architecture
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {architecturePrinciples.map((principle, index) => {
              const Icon = principle.icon
              return (
                <div key={index} className="text-center space-y-3">
                  <div className="flex justify-center">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold">{principle.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{principle.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Server Architecture */}
      <Card>
        <CardHeader>
          <CardTitle>HANA-X Lab Server Architecture</CardTitle>
          <CardDescription>
            Detailed specifications and role allocation for each server in the infrastructure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="network">Network Topology</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {serverSpecs.map((server, index) => {
                  const Icon = server.icon
                  return (
                    <Card key={index} className="relative">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 bg-background border rounded-lg`}>
                              <Icon className={`h-5 w-5 ${server.color}`} />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{server.name}</CardTitle>
                              <CardDescription>{server.hostname} • {server.ip}</CardDescription>
                            </div>
                          </div>
                          <Badge variant="outline">{server.role}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">{server.description}</p>
                        
                        <div>
                          <h4 className="font-medium mb-2">Key Technologies</h4>
                          <div className="flex flex-wrap gap-2">
                            {server.technologies.map((tech, techIndex) => (
                              <Badge key={techIndex} variant="secondary" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Hardware Specifications</h4>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="flex items-center space-x-2">
                              <Cpu className="h-3 w-3 text-muted-foreground" />
                              <span>{server.specs.cpu}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Memory className="h-3 w-3 text-muted-foreground" />
                              <span>{server.specs.memory}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <HardDrive className="h-3 w-3 text-muted-foreground" />
                              <span>{server.specs.storage}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Network className="h-3 w-3 text-muted-foreground" />
                              <span>{server.specs.network}</span>
                            </div>
                            {server.specs.gpu && (
                              <div className="flex items-center space-x-2 col-span-2">
                                <Zap className="h-3 w-3 text-muted-foreground" />
                                <span>{server.specs.gpu}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>
            
            <TabsContent value="specifications" className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-border">
                  <thead>
                    <tr className="bg-muted">
                      <th className="border border-border p-3 text-left">Server</th>
                      <th className="border border-border p-3 text-left">Hostname</th>
                      <th className="border border-border p-3 text-left">IP Address</th>
                      <th className="border border-border p-3 text-left">CPU</th>
                      <th className="border border-border p-3 text-left">Memory</th>
                      <th className="border border-border p-3 text-left">Storage</th>
                      <th className="border border-border p-3 text-left">Special Hardware</th>
                    </tr>
                  </thead>
                  <tbody>
                    {serverSpecs.map((server, index) => (
                      <tr key={index} className="hover:bg-muted/50">
                        <td className="border border-border p-3 font-medium">{server.name}</td>
                        <td className="border border-border p-3">{server.hostname}</td>
                        <td className="border border-border p-3 font-mono">{server.ip}</td>
                        <td className="border border-border p-3">{server.specs.cpu}</td>
                        <td className="border border-border p-3">{server.specs.memory}</td>
                        <td className="border border-border p-3">{server.specs.storage}</td>
                        <td className="border border-border p-3">{server.specs.gpu || 'Standard'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="network" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Info className="h-4 w-4" />
                  <span>Network communication patterns and protocols between servers</span>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-border">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border border-border p-3 text-left">Source</th>
                        <th className="border border-border p-3 text-left">Target</th>
                        <th className="border border-border p-3 text-left">Protocol</th>
                        <th className="border border-border p-3 text-left">Port</th>
                        <th className="border border-border p-3 text-left">Purpose</th>
                      </tr>
                    </thead>
                    <tbody>
                      {networkTopology.map((connection, index) => (
                        <tr key={index} className="hover:bg-muted/50">
                          <td className="border border-border p-3">{connection.source}</td>
                          <td className="border border-border p-3 font-mono">{connection.target}</td>
                          <td className="border border-border p-3">
                            <Badge variant="outline">{connection.protocol}</Badge>
                          </td>
                          <td className="border border-border p-3 font-mono">{connection.port}</td>
                          <td className="border border-border p-3">{connection.purpose}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Implementation Notes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
            Implementation Considerations
          </CardTitle>
          <CardDescription>
            Key considerations for successful deployment and operation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-green-600">✓ Advantages</h4>
              <ul className="space-y-2 text-sm">
                <li>• Dedicated server allocation prevents resource conflicts</li>
                <li>• High-speed 10Gbps networking enables efficient data transfer</li>
                <li>• GPU acceleration on LLM server optimizes AI workloads</li>
                <li>• Comprehensive monitoring across all infrastructure components</li>
                <li>• Scalable architecture supports future expansion</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-orange-600">⚠ Considerations</h4>
              <ul className="space-y-2 text-sm">
                <li>• LLM server requires CUDA driver configuration</li>
                <li>• Network latency between servers should be monitored</li>
                <li>• Backup procedures must account for large model files</li>
                <li>• Security configuration appropriate for development environment</li>
                <li>• Resource monitoring essential for optimal performance</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ArchitecturePage

