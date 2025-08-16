import { useEffect, useState } from "react"
import { DollarSign, TrendingUp, CreditCard, AlertCircle, CheckCircle, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { MagicCard } from "@/components/ui/magic-card"
import { Progress } from "@/components/ui/progress"
import { createClient } from "@/lib/supabase/client"

interface PaymentData {
  totalRevenue: number
  monthlyRevenue: number
  successfulPayments: number
  failedPayments: number
  pendingPayments: number
  revenueGrowth: number
}

interface RecentTransaction {
  id: string
  userEmail: string
  amount: number
  status: 'completed' | 'pending' | 'failed'
  paymentMethod: string
  date: string
  courseName: string
}

export function PaymentOverview() {
  const [paymentData, setPaymentData] = useState<PaymentData>({
    totalRevenue: 0,
    monthlyRevenue: 0,
    successfulPayments: 0,
    failedPayments: 0,
    pendingPayments: 0,
    revenueGrowth: 0
  })
  const [recentTransactions, setRecentTransactions] = useState<RecentTransaction[]>([])
  const [loading, setLoading] = useState(true)
  
  const supabase = createClient()

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        // Get enrollment data
        const { data: enrollments } = await supabase
          .from('enrollments')
          .select('*')
          .order('enrolled_at', { ascending: false })

        const completedPayments = enrollments?.filter((e: any) => e.payment_status === 'completed') || []
        const pendingPayments = enrollments?.filter((e: any) => e.payment_status === 'pending') || []
        
        // Mock realistic payment data
        const mockPaymentData: PaymentData = {
          totalRevenue: completedPayments.length * 9999, // Assuming ₹9999 per course
          monthlyRevenue: Math.floor(completedPayments.length * 9999 * 0.3), // 30% this month
          successfulPayments: completedPayments.length,
          failedPayments: Math.floor(completedPayments.length * 0.05), // 5% failure rate
          pendingPayments: pendingPayments.length,
          revenueGrowth: 15.8
        }

        const mockTransactions: RecentTransaction[] = [
          {
            id: '1',
            userEmail: 'sarah.chen@example.com',
            amount: 9999,
            status: 'completed',
            paymentMethod: 'Razorpay',
            date: '2024-01-15T10:30:00Z',
            courseName: 'No-Code to Product Mastery'
          },
          {
            id: '2',
            userEmail: 'marcus.t@example.com',
            amount: 9999,
            status: 'completed',
            paymentMethod: 'Stripe',
            date: '2024-01-15T09:15:00Z',
            courseName: 'No-Code to Product Mastery'
          },
          {
            id: '3',
            userEmail: 'emily.r@example.com',
            amount: 9999,
            status: 'pending',
            paymentMethod: 'Razorpay',
            date: '2024-01-15T08:45:00Z',
            courseName: 'No-Code to Product Mastery'
          },
          {
            id: '4',
            userEmail: 'david.k@example.com',
            amount: 9999,
            status: 'failed',
            paymentMethod: 'Stripe',
            date: '2024-01-14T16:20:00Z',
            courseName: 'No-Code to Product Mastery'
          }
        ]

        setPaymentData(mockPaymentData)
        setRecentTransactions(mockTransactions)
      } catch (error) {
        console.error('Error fetching payment data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPaymentData()
  }, [supabase])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'pending': return <Clock className="w-4 h-4 text-amber-600" />
      case 'failed': return <AlertCircle className="w-4 h-4 text-red-600" />
      default: return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'default'
      case 'pending': return 'secondary'
      case 'failed': return 'destructive'
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
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-8 h-8 bg-muted rounded" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </MagicCard>
    )
  }

  return (
    <MagicCard className="p-6" gradientColor="rgba(34, 197, 94, 0.1)">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Payment Overview</h2>
          <Badge variant="outline" className="text-green-600 border-green-600">
            <TrendingUp className="w-3 h-3 mr-1" />
            +{paymentData.revenueGrowth}%
          </Badge>
        </div>

        {/* Revenue Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <span className="text-sm text-muted-foreground">Total Revenue</span>
            </div>
            <div className="text-2xl font-bold text-foreground">
              ₹{(paymentData.totalRevenue / 100000).toFixed(1)}L
            </div>
          </div>
          
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-muted-foreground">This Month</span>
            </div>
            <div className="text-2xl font-bold text-foreground">
              ₹{(paymentData.monthlyRevenue / 1000).toFixed(0)}k
            </div>
          </div>
        </div>

        {/* Payment Status */}
        <div className="space-y-3">
          <h3 className="font-medium text-foreground">Payment Status</h3>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Successful Payments</span>
              <span className="font-medium text-green-600">{paymentData.successfulPayments}</span>
            </div>
            <Progress 
              value={(paymentData.successfulPayments / (paymentData.successfulPayments + paymentData.failedPayments + paymentData.pendingPayments)) * 100} 
              className="h-2"
            />
          </div>

          <div className="grid grid-cols-3 gap-4 text-center text-sm">
            <div>
              <div className="text-green-600 font-medium">{paymentData.successfulPayments}</div>
              <div className="text-muted-foreground">Completed</div>
            </div>
            <div>
              <div className="text-amber-600 font-medium">{paymentData.pendingPayments}</div>
              <div className="text-muted-foreground">Pending</div>
            </div>
            <div>
              <div className="text-red-600 font-medium">{paymentData.failedPayments}</div>
              <div className="text-muted-foreground">Failed</div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="space-y-3">
          <h3 className="font-medium text-foreground">Recent Transactions</h3>
          
          <div className="space-y-2">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 rounded-lg border bg-background/50"
              >
                <div className="flex items-center gap-3">
                  {getStatusIcon(transaction.status)}
                  <div>
                    <div className="text-sm font-medium text-foreground">
                      {transaction.userEmail}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {transaction.courseName} • {transaction.paymentMethod}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">
                    ₹{transaction.amount.toLocaleString()}
                  </div>
                  <Badge variant={getStatusColor(transaction.status)} className="text-xs">
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="border-t pt-4">
          <div className="grid grid-cols-2 gap-3">
            <button className="text-left p-3 rounded-lg border hover:bg-muted/50 transition-colors">
              <div className="text-sm font-medium text-foreground">Refunds</div>
              <div className="text-xs text-muted-foreground">Process refunds</div>
            </button>
            <button className="text-left p-3 rounded-lg border hover:bg-muted/50 transition-colors">
              <div className="text-sm font-medium text-foreground">Export</div>
              <div className="text-xs text-muted-foreground">Download reports</div>
            </button>
          </div>
        </div>
      </div>
    </MagicCard>
  )
}