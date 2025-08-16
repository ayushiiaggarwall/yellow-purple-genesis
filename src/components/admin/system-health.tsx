import { useEffect, useState } from "react"
import { Server, Database, Wifi, AlertTriangle, CheckCircle, Clock, Cpu } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { MagicCard } from "@/components/ui/magic-card"
import { Progress } from "@/components/ui/progress"

interface SystemMetric {
  name: string
  value: number
  status: 'healthy' | 'warning' | 'critical'
  unit: string
  icon: React.ReactNode
  description: string
}

interface SystemAlert {
  id: string
  type: 'info' | 'warning' | 'error'
  message: string
  timestamp: string
}

export function SystemHealth() {
  const [metrics, setMetrics] = useState<SystemMetric[]>([])
  const [alerts, setAlerts] = useState<SystemAlert[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock system health data
    const mockMetrics: SystemMetric[] = [
      {
        name: 'Server Uptime',
        value: 99.8,
        status: 'healthy',
        unit: '%',
        icon: <Server className="w-4 h-4" />,
        description: 'System availability'
      },
      {
        name: 'Database Performance',
        value: 95.2,
        status: 'healthy',
        unit: '%',
        icon: <Database className="w-4 h-4" />,
        description: 'Query response time'
      },
      {
        name: 'API Response Time',
        value: 142,
        status: 'healthy',
        unit: 'ms',
        icon: <Wifi className="w-4 h-4" />,
        description: 'Average response time'
      },
      {
        name: 'CPU Usage',
        value: 68,
        status: 'warning',
        unit: '%',
        icon: <Cpu className="w-4 h-4" />,
        description: 'Current CPU utilization'
      }
    ]

    const mockAlerts: SystemAlert[] = [
      {
        id: '1',
        type: 'warning',
        message: 'High CPU usage detected on server-02',
        timestamp: '2024-01-15T10:30:00Z'
      },
      {
        id: '2',
        type: 'info',
        message: 'Database backup completed successfully',
        timestamp: '2024-01-15T08:00:00Z'
      },
      {
        id: '3',
        type: 'info',
        message: 'SSL certificate renewed for api.learnforge.com',
        timestamp: '2024-01-14T16:45:00Z'
      }
    ]

    setMetrics(mockMetrics)
    setAlerts(mockAlerts)
    setLoading(false)
  }, [])

  const getStatusColor = (status: SystemMetric['status']) => {
    switch (status) {
      case 'healthy': return 'text-green-600'
      case 'warning': return 'text-amber-600'
      case 'critical': return 'text-red-600'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusIcon = (status: SystemMetric['status']) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'warning': return <AlertTriangle className="w-4 h-4 text-amber-600" />
      case 'critical': return <AlertTriangle className="w-4 h-4 text-red-600" />
      default: return null
    }
  }

  const getAlertIcon = (type: SystemAlert['type']) => {
    switch (type) {
      case 'info': return <CheckCircle className="w-4 h-4 text-blue-600" />
      case 'warning': return <AlertTriangle className="w-4 h-4 text-amber-600" />
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-600" />
      default: return null
    }
  }

  const getAlertColor = (type: SystemAlert['type']) => {
    switch (type) {
      case 'info': return 'default'
      case 'warning': return 'secondary'
      case 'error': return 'destructive'
      default: return 'outline'
    }
  }

  if (loading) {
    return (
      <MagicCard className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-muted rounded w-1/3" />
          <div className="grid grid-cols-2 gap-4">
            <div className="h-16 bg-muted rounded" />
            <div className="h-16 bg-muted rounded" />
          </div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-4 h-4 bg-muted rounded" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </MagicCard>
    )
  }

  return (
    <MagicCard className="p-6" gradientColor="rgba(245, 101, 101, 0.1)">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">System Health</h2>
          <Badge variant="outline" className="text-green-600 border-green-600">
            <CheckCircle className="w-3 h-3 mr-1" />
            All Systems Operational
          </Badge>
        </div>

        {/* System Metrics */}
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="p-4 bg-muted/50 rounded-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={getStatusColor(metric.status)}>
                    {metric.icon}
                  </div>
                  <span className="text-sm text-muted-foreground">{metric.name}</span>
                </div>
                {getStatusIcon(metric.status)}
              </div>
              
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-lg font-semibold text-foreground">
                  {metric.value}
                </span>
                <span className="text-sm text-muted-foreground">
                  {metric.unit}
                </span>
              </div>
              
              <div className="text-xs text-muted-foreground">
                {metric.description}
              </div>

              {metric.unit === '%' && (
                <Progress 
                  value={metric.value} 
                  className="h-1 mt-2"
                />
              )}
            </div>
          ))}
        </div>

        {/* Recent Alerts */}
        <div className="space-y-3">
          <h3 className="font-medium text-foreground">Recent Alerts</h3>
          
          <div className="space-y-2">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-start gap-3 p-3 rounded-lg border bg-background/50"
              >
                {getAlertIcon(alert.type)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-foreground">
                      {alert.message}
                    </span>
                    <Badge variant={getAlertColor(alert.type)} className="text-xs">
                      {alert.type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {new Date(alert.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Status Summary */}
        <div className="border-t pt-4">
          <div className="grid grid-cols-3 gap-4 text-center text-sm">
            <div>
              <div className="text-green-600 font-medium">
                {metrics.filter(m => m.status === 'healthy').length}
              </div>
              <div className="text-muted-foreground">Healthy</div>
            </div>
            <div>
              <div className="text-amber-600 font-medium">
                {metrics.filter(m => m.status === 'warning').length}
              </div>
              <div className="text-muted-foreground">Warning</div>
            </div>
            <div>
              <div className="text-red-600 font-medium">
                {metrics.filter(m => m.status === 'critical').length}
              </div>
              <div className="text-muted-foreground">Critical</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button className="text-left p-3 rounded-lg border hover:bg-muted/50 transition-colors">
            <div className="text-sm font-medium text-foreground">View Logs</div>
            <div className="text-xs text-muted-foreground">System activity logs</div>
          </button>
          <button className="text-left p-3 rounded-lg border hover:bg-muted/50 transition-colors">
            <div className="text-sm font-medium text-foreground">Run Diagnostics</div>
            <div className="text-xs text-muted-foreground">Health check</div>
          </button>
        </div>
      </div>
    </MagicCard>
  )
}