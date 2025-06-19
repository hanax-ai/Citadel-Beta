import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { ScrollArea } from '@/components/ui/scroll-area.jsx'
import { 
  Code, 
  Search,
  Server, 
  Database, 
  Brain, 
  TestTube, 
  Settings, 
  Monitor,
  Package,
  Layers,
  Filter,
  CheckCircle,
  AlertTriangle,
  Info,
  ExternalLink
} from 'lucide-react'

const TechStackPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedServer, setSelectedServer] = useState('all')

  // Complete technology stack data
  const techStack = {
    'db': {
      name: 'Database Server',
      ip: '192.168.10.35',
      icon: Database,
      color: 'text-blue-600',
      technologies: [
        { name: 'PostgreSQL', version: '16.1', category: 'Database', purpose: 'Primary relational database' },
        { name: 'Redis', version: '7.2.4', category: 'Cache', purpose: 'In-memory data store' },
        { name: 'pgAdmin 4', version: '7.8', category: 'Management', purpose: 'Database administration' },
        { name: 'Redis Insight', version: '2.32', category: 'Management', purpose: 'Redis administration' },
        { name: 'PgBouncer', version: '1.21.0', category: 'Connection Pool', purpose: 'Connection management' },
        { name: 'Python', version: '3.11.7', category: 'Runtime', purpose: 'Scripting and automation' },
        { name: 'psycopg2-binary', version: '2.9.9', category: 'Library', purpose: 'PostgreSQL adapter' },
        { name: 'redis-py', version: '5.0.1', category: 'Library', purpose: 'Redis client library' },
        { name: 'SQLAlchemy', version: '2.0.23', category: 'Library', purpose: 'ORM framework' },
        { name: 'Node Exporter', version: '1.7.0', category: 'Monitoring', purpose: 'System metrics' }
      ]
    },
    'llm': {
      name: 'LLM Server',
      ip: '192.168.10.29',
      icon: Brain,
      color: 'text-green-600',
      technologies: [
        { name: 'Ollama', version: '0.1.26', category: 'AI Platform', purpose: 'LLM serving platform' },
        { name: 'NVIDIA CUDA', version: '12.4', category: 'GPU Runtime', purpose: 'GPU acceleration' },
        { name: 'cuDNN', version: '8.9.7', category: 'GPU Library', purpose: 'Deep learning primitives' },
        { name: 'Nginx', version: '1.24.0', category: 'Web Server', purpose: 'Load balancing' },
        { name: 'Docker', version: '24.0.7', category: 'Container', purpose: 'Containerization' },
        { name: 'Python', version: '3.11.7', category: 'Runtime', purpose: 'AI services' },
        { name: 'PyTorch', version: '2.1.2+cu121', category: 'AI Framework', purpose: 'Deep learning' },
        { name: 'Transformers', version: '4.36.2', category: 'AI Library', purpose: 'Model handling' },
        { name: 'FastAPI', version: '0.104.1', category: 'API Framework', purpose: 'API services' },
        { name: 'llama2:13b', version: 'Q4_K_M', category: 'AI Model', purpose: 'General conversation' },
        { name: 'codellama:13b', version: 'Q4_K_M', category: 'AI Model', purpose: 'Code generation' },
        { name: 'mistral:7b', version: 'Q4_K_M', category: 'AI Model', purpose: 'Efficient reasoning' }
      ]
    },
    'vectordb': {
      name: 'Vector DB Server',
      ip: '192.168.10.30',
      icon: Layers,
      color: 'text-purple-600',
      technologies: [
        { name: 'Qdrant', version: '1.7.4', category: 'Vector Database', purpose: 'Vector storage and search' },
        { name: 'Docker', version: '24.0.7', category: 'Container', purpose: 'Service deployment' },
        { name: 'FastAPI', version: '0.104.1', category: 'API Framework', purpose: 'Embedding service' },
        { name: 'sentence-transformers', version: '2.2.2', category: 'AI Library', purpose: 'Text embeddings' },
        { name: 'all-MiniLM-L6-v2', version: '384d', category: 'Embedding Model', purpose: 'General text embedding' },
        { name: 'all-mpnet-base-v2', version: '768d', category: 'Embedding Model', purpose: 'High-quality embedding' },
        { name: 'Python', version: '3.11.7', category: 'Runtime', purpose: 'Embedding services' },
        { name: 'qdrant-client', version: '1.7.0', category: 'Library', purpose: 'Qdrant Python client' },
        { name: 'uvicorn', version: '0.24.0', category: 'Server', purpose: 'ASGI server' },
        { name: 'asyncio', version: '3.11', category: 'Library', purpose: 'Async programming' }
      ]
    },
    'dev': {
      name: 'Development Server',
      ip: '192.168.10.33',
      icon: Code,
      color: 'text-orange-600',
      technologies: [
        { name: 'VS Code Server', version: '4.20.0', category: 'IDE', purpose: 'Web-based development' },
        { name: 'Node.js', version: '20.10.0', category: 'Runtime', purpose: 'Frontend development' },
        { name: 'Python', version: '3.11.7', category: 'Runtime', purpose: 'Backend development' },
        { name: 'Docker', version: '24.0.7', category: 'Container', purpose: 'Development containers' },
        { name: 'Git', version: '2.43.0', category: 'Version Control', purpose: 'Source code management' },
        { name: 'GitHub CLI', version: '2.40.1', category: 'Tool', purpose: 'GitHub operations' },
        { name: 'React', version: '18.2.0', category: 'Frontend Framework', purpose: 'UI development' },
        { name: 'Vue.js', version: '3.3.8', category: 'Frontend Framework', purpose: 'Alternative UI framework' },
        { name: 'TypeScript', version: '5.3.2', category: 'Language', purpose: 'Type-safe JavaScript' },
        { name: 'Tailwind CSS', version: '3.3.6', category: 'CSS Framework', purpose: 'Utility-first CSS' },
        { name: 'Vite', version: '5.0.0', category: 'Build Tool', purpose: 'Fast build tool' },
        { name: 'ESLint', version: '2.4.4', category: 'Tool', purpose: 'JavaScript linting' }
      ]
    },
    'test': {
      name: 'Testing Server',
      ip: '192.168.10.34',
      icon: TestTube,
      color: 'text-red-600',
      technologies: [
        { name: 'pytest', version: '7.4.3', category: 'Testing Framework', purpose: 'Python unit testing' },
        { name: 'Selenium', version: '4.16.0', category: 'Testing Tool', purpose: 'Browser automation' },
        { name: 'Jenkins', version: '2.426.1', category: 'CI/CD', purpose: 'Build automation' },
        { name: 'Selenium Grid', version: '4.16.0', category: 'Testing Infrastructure', purpose: 'Distributed testing' },
        { name: 'Locust', version: '2.17.0', category: 'Performance Testing', purpose: 'Load testing' },
        { name: 'pytest-cov', version: '4.1.0', category: 'Testing Tool', purpose: 'Code coverage' },
        { name: 'pytest-xdist', version: '3.5.0', category: 'Testing Tool', purpose: 'Parallel execution' },
        { name: 'Chromium', version: '119.0.6045.105', category: 'Browser', purpose: 'Web testing' },
        { name: 'Firefox', version: '119.0', category: 'Browser', purpose: 'Cross-browser testing' },
        { name: 'PostgreSQL', version: '16.1', category: 'Test Database', purpose: 'Test data storage' },
        { name: 'factory-boy', version: '3.3.0', category: 'Testing Library', purpose: 'Test data generation' },
        { name: 'Faker', version: '20.1.0', category: 'Testing Library', purpose: 'Synthetic data' }
      ]
    },
    'orca': {
      name: 'Orchestration Server',
      ip: '192.168.10.31',
      icon: Settings,
      color: 'text-indigo-600',
      technologies: [
        { name: 'LangGraph', version: '0.0.40', category: 'Workflow Engine', purpose: 'AI workflow orchestration' },
        { name: 'LangChain', version: '0.0.350', category: 'AI Framework', purpose: 'Agent coordination' },
        { name: 'Celery', version: '5.3.4', category: 'Task Queue', purpose: 'Distributed task processing' },
        { name: 'RabbitMQ', version: '3.12.10', category: 'Message Broker', purpose: 'Message queuing' },
        { name: 'Flower', version: '2.0.1', category: 'Monitoring', purpose: 'Celery monitoring' },
        { name: 'FastAPI', version: '0.104.1', category: 'API Framework', purpose: 'RESTful services' },
        { name: 'Redis', version: '7.2.4', category: 'Result Backend', purpose: 'Task result storage' },
        { name: 'SQLAlchemy', version: '2.0.23', category: 'ORM', purpose: 'Database abstraction' },
        { name: 'OpenAI Client', version: '1.3.7', category: 'AI Integration', purpose: 'OpenAI API' },
        { name: 'Anthropic Client', version: '0.7.8', category: 'AI Integration', purpose: 'Claude API' },
        { name: 'httpx', version: '0.25.2', category: 'HTTP Client', purpose: 'Async HTTP requests' },
        { name: 'Pydantic', version: '2.5.2', category: 'Validation', purpose: 'Data validation' }
      ]
    },
    'dev-ops': {
      name: 'DevOps Server',
      ip: '192.168.10.36',
      icon: Monitor,
      color: 'text-cyan-600',
      technologies: [
        { name: 'Windows 11', version: 'Professional', category: 'Operating System', purpose: 'Host OS' },
        { name: 'WSL 2', version: 'Ubuntu 24.04', category: 'Linux Subsystem', purpose: 'Linux compatibility' },
        { name: 'PowerShell', version: '7.4.0', category: 'Automation', purpose: 'Scripting and automation' },
        { name: 'Prometheus', version: '2.48.0', category: 'Monitoring', purpose: 'Metrics collection' },
        { name: 'Grafana', version: '10.2.2', category: 'Visualization', purpose: 'Dashboards and alerting' },
        { name: 'Alertmanager', version: '0.26.0', category: 'Alerting', purpose: 'Alert routing' },
        { name: 'Nginx', version: '1.24.0', category: 'Reverse Proxy', purpose: 'Load balancing' },
        { name: 'Docker Desktop', version: '4.25.2', category: 'Container Platform', purpose: 'Container management' },
        { name: 'Visual Studio Code', version: '1.84.2', category: 'Editor', purpose: 'Configuration editing' },
        { name: 'pgAdmin 4', version: '7.8', category: 'Database Tool', purpose: 'Remote DB admin' },
        { name: 'Redis Insight', version: '2.32', category: 'Database Tool', purpose: 'Redis administration' },
        { name: 'Postman', version: '10.20.0', category: 'API Tool', purpose: 'API testing' }
      ]
    }
  }

  // Get all technologies for search and filtering
  const allTechnologies = useMemo(() => {
    const techs = []
    Object.entries(techStack).forEach(([serverKey, server]) => {
      server.technologies.forEach(tech => {
        techs.push({
          ...tech,
          server: serverKey,
          serverName: server.name,
          serverIp: server.ip
        })
      })
    })
    return techs
  }, [])

  // Filter technologies based on search and server selection
  const filteredTechnologies = useMemo(() => {
    return allTechnologies.filter(tech => {
      const matchesSearch = tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tech.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tech.purpose.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesServer = selectedServer === 'all' || tech.server === selectedServer
      return matchesSearch && matchesServer
    })
  }, [allTechnologies, searchTerm, selectedServer])

  // Get technology categories
  const categories = useMemo(() => {
    const cats = new Set(allTechnologies.map(tech => tech.category))
    return Array.from(cats).sort()
  }, [allTechnologies])

  // Get technology statistics
  const stats = useMemo(() => {
    return {
      totalTechnologies: allTechnologies.length,
      totalServers: Object.keys(techStack).length,
      totalCategories: categories.length,
      averagePerServer: Math.round(allTechnologies.length / Object.keys(techStack).length)
    }
  }, [allTechnologies, categories])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Code className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">Technology Stack</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Comprehensive mapping of all 150+ technologies, frameworks, and packages 
          across the Citadel Beta Release infrastructure with detailed specifications 
          and server allocations.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6 text-center">
            <Package className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.totalTechnologies}</div>
            <p className="text-sm text-muted-foreground">Total Technologies</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Server className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.totalServers}</div>
            <p className="text-sm text-muted-foreground">Servers</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Layers className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.totalCategories}</div>
            <p className="text-sm text-muted-foreground">Categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Settings className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.averagePerServer}</div>
            <p className="text-sm text-muted-foreground">Avg per Server</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="h-5 w-5 mr-2" />
            Search & Filter Technologies
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search technologies, categories, or purposes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-full md:w-48">
              <select
                value={selectedServer}
                onChange={(e) => setSelectedServer(e.target.value)}
                className="w-full px-3 py-2 border border-input bg-background rounded-md"
              >
                <option value="all">All Servers</option>
                {Object.entries(techStack).map(([key, server]) => (
                  <option key={key} value={key}>{server.name}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            Showing {filteredTechnologies.length} of {allTechnologies.length} technologies
          </div>
        </CardContent>
      </Card>

      {/* Technology Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Technology Details</CardTitle>
          <CardDescription>
            Detailed breakdown by server and comprehensive technology listing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="by-server" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="by-server">By Server</TabsTrigger>
              <TabsTrigger value="all-technologies">All Technologies</TabsTrigger>
              <TabsTrigger value="by-category">By Category</TabsTrigger>
            </TabsList>
            
            <TabsContent value="by-server" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {Object.entries(techStack).map(([serverKey, server]) => {
                  const Icon = server.icon
                  return (
                    <Card key={serverKey}>
                      <CardHeader>
                        <div className="flex items-center space-x-3">
                          <Icon className={`h-5 w-5 ${server.color}`} />
                          <div>
                            <CardTitle className="text-lg">{server.name}</CardTitle>
                            <CardDescription>{server.ip}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-64">
                          <div className="space-y-2">
                            {server.technologies.map((tech, index) => (
                              <div key={index} className="flex items-center justify-between p-2 border rounded">
                                <div>
                                  <div className="font-medium text-sm">{tech.name}</div>
                                  <div className="text-xs text-muted-foreground">{tech.purpose}</div>
                                </div>
                                <div className="text-right">
                                  <Badge variant="outline" className="text-xs">{tech.category}</Badge>
                                  <div className="text-xs text-muted-foreground mt-1">{tech.version}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>
            
            <TabsContent value="all-technologies" className="space-y-4">
              <ScrollArea className="h-96">
                <div className="space-y-2">
                  {filteredTechnologies.map((tech, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded hover:bg-muted/50">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <div className="font-medium">{tech.name}</div>
                          <Badge variant="outline">{tech.category}</Badge>
                          <Badge variant="secondary">{tech.serverName}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">{tech.purpose}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-sm">{tech.version}</div>
                        <div className="text-xs text-muted-foreground">{tech.serverIp}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="by-category" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map(category => {
                  const categoryTechs = filteredTechnologies.filter(tech => tech.category === category)
                  return (
                    <Card key={category}>
                      <CardHeader>
                        <CardTitle className="text-lg">{category}</CardTitle>
                        <CardDescription>{categoryTechs.length} technologies</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {categoryTechs.slice(0, 5).map((tech, index) => (
                            <div key={index} className="text-sm">
                              <div className="font-medium">{tech.name}</div>
                              <div className="text-xs text-muted-foreground">{tech.serverName}</div>
                            </div>
                          ))}
                          {categoryTechs.length > 5 && (
                            <div className="text-xs text-muted-foreground">
                              +{categoryTechs.length - 5} more...
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Compatibility Matrix */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
            Version Compatibility & Dependencies
          </CardTitle>
          <CardDescription>
            Key version requirements and compatibility considerations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3 text-green-600">✓ Verified Compatibility</h4>
                <div className="space-y-2 text-sm">
                  <div>• Python 3.11.x across all servers</div>
                  <div>• Docker 24.x for containerization</div>
                  <div>• PostgreSQL 16.x with Redis 7.x</div>
                  <div>• CUDA 12.4 with RTX 4070 Ti SUPER</div>
                  <div>• Node.js 20.x LTS for frontend</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3 text-orange-600">⚠ Version Dependencies</h4>
                <div className="space-y-2 text-sm">
                  <div>• LangGraph requires Python 3.11+</div>
                  <div>• CUDA 12.4 requires driver 545.29.06+</div>
                  <div>• Qdrant 1.7.4 needs Docker 24.0+</div>
                  <div>• VS Code Server needs Node.js 20+</div>
                  <div>• Selenium Grid requires Java 17</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default TechStackPage

