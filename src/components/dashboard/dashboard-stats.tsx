import { useEffect, useState } from "react"
import { BookOpen, Clock, Trophy, Target } from "lucide-react"
import { MagicCard } from "@/components/ui/magic-card"
import { Progress } from "@/components/ui/progress"
import { createClient } from "@/lib/supabase/client"

interface DashboardStatsProps {}

export function DashboardStats({}: DashboardStatsProps) {
  const [stats, setStats] = useState({
    coursesEnrolled: 0,
    lessonsCompleted: 0,
    totalLessons: 0,
    hoursLearned: 0,
    achievements: 0
  })
  const [loading, setLoading] = useState(true)
  
  const supabase = createClient()

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        // Get enrolled courses count
        const { count: coursesCount } = await supabase
          .from('enrollments')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id)
          .eq('payment_status', 'completed')

        // For now, set mock data since we don't have lesson tracking yet
        setStats({
          coursesEnrolled: coursesCount || 1,
          lessonsCompleted: 12,
          totalLessons: 50,
          hoursLearned: 24,
          achievements: 3
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [supabase])

  const statsCards = [
    {
      title: "Courses Enrolled",
      value: stats.coursesEnrolled,
      icon: <BookOpen className="w-6 h-6" />,
      color: "rgba(251, 191, 36, 0.1)", // Yellow
      change: "+1 this month"
    },
    {
      title: "Lessons Completed",
      value: `${stats.lessonsCompleted}/${stats.totalLessons}`,
      icon: <Target className="w-6 h-6" />,
      color: "rgba(168, 85, 247, 0.1)", // Purple
      change: `${Math.round((stats.lessonsCompleted / stats.totalLessons) * 100)}% complete`,
      progress: (stats.lessonsCompleted / stats.totalLessons) * 100
    },
    {
      title: "Hours Learned",
      value: stats.hoursLearned,
      icon: <Clock className="w-6 h-6" />,
      color: "rgba(34, 197, 94, 0.1)", // Green
      change: "+4 this week"
    },
    {
      title: "Achievements",
      value: stats.achievements,
      icon: <Trophy className="w-6 h-6" />,
      color: "rgba(245, 101, 101, 0.1)", // Red
      change: "Latest: First Lesson"
    }
  ]

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsCards.map((stat, index) => (
        <MagicCard
          key={index}
          className="p-6"
          gradientColor={stat.color}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <div className="text-primary">
                {stat.icon}
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-foreground">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.title}
              </div>
            </div>
          </div>
          
          {stat.progress !== undefined && (
            <div className="mb-3">
              <Progress value={stat.progress} className="h-2" />
            </div>
          )}
          
          <div className="text-xs text-muted-foreground">
            {stat.change}
          </div>
        </MagicCard>
      ))}
    </div>
  )
}