import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Play, Clock, CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MagicCard } from "@/components/ui/magic-card"

interface Lesson {
  id: string
  title: string
  description: string
  duration: number
  status: 'completed' | 'in_progress' | 'locked'
  courseId: string
  courseName: string
  videoUrl?: string
  completedAt?: string
}

export function RecentLessons() {
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data for recent lessons
    const mockLessons: Lesson[] = [
      {
        id: '1',
        title: 'Introduction to No-Code Development',
        description: 'Learn the fundamentals of building without code',
        duration: 15,
        status: 'completed',
        courseId: '1',
        courseName: 'No-Code to Product Mastery',
        completedAt: '2024-01-15'
      },
      {
        id: '2',
        title: 'Setting Up Your Bubble Account',
        description: 'Create and configure your first Bubble application',
        duration: 12,
        status: 'completed',
        courseId: '1',
        courseName: 'No-Code to Product Mastery',
        completedAt: '2024-01-16'
      },
      {
        id: '3',
        title: 'Building Your First Page',
        description: 'Design your first responsive page with Bubble',
        duration: 18,
        status: 'in_progress',
        courseId: '1',
        courseName: 'No-Code to Product Mastery'
      },
      {
        id: '4',
        title: 'Understanding Data Types',
        description: 'Learn how to structure your application data',
        duration: 22,
        status: 'locked',
        courseId: '1',
        courseName: 'No-Code to Product Mastery'
      }
    ]

    setLessons(mockLessons)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <MagicCard className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-muted rounded w-1/3" />
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-12 h-12 bg-muted rounded" />
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Recent Lessons</h2>
        <Link to="/dashboard/courses">
          <Button variant="outline" size="sm">
            View All
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>

      <MagicCard className="p-6" gradientColor="rgba(168, 85, 247, 0.1)">
        <div className="space-y-4">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="flex items-center gap-4 p-4 rounded-lg border bg-background/50 hover:bg-background/80 transition-colors"
            >
              {/* Status Icon */}
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                lesson.status === 'completed' 
                  ? 'bg-green-100 text-green-600' 
                  : lesson.status === 'in_progress'
                  ? 'bg-primary/10 text-primary'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {lesson.status === 'completed' ? (
                  <CheckCircle2 className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6" />
                )}
              </div>

              {/* Lesson Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-foreground truncate">
                    {lesson.title}
                  </h3>
                  <Badge 
                    variant={
                      lesson.status === 'completed' 
                        ? 'default' 
                        : lesson.status === 'in_progress'
                        ? 'secondary'
                        : 'outline'
                    }
                    className="ml-auto"
                  >
                    {lesson.status === 'completed' ? 'Completed' : 
                     lesson.status === 'in_progress' ? 'In Progress' : 'Locked'}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground truncate mb-2">
                  {lesson.description}
                </p>
                
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{lesson.courseName}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {lesson.duration}m
                  </div>
                  {lesson.completedAt && (
                    <span>Completed {new Date(lesson.completedAt).toLocaleDateString()}</span>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="flex-shrink-0">
                {lesson.status === 'completed' ? (
                  <Link to={`/dashboard/courses/${lesson.courseId}/lessons/${lesson.id}`}>
                    <Button variant="outline" size="sm">
                      Review
                    </Button>
                  </Link>
                ) : lesson.status === 'in_progress' ? (
                  <Link to={`/dashboard/courses/${lesson.courseId}/lessons/${lesson.id}`}>
                    <Button size="sm">
                      Continue
                    </Button>
                  </Link>
                ) : (
                  <Button variant="outline" size="sm" disabled>
                    Locked
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {lessons.length === 0 && (
          <div className="text-center py-8">
            <Play className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No Lessons Yet
            </h3>
            <p className="text-muted-foreground mb-4">
              Start a course to see your lessons here
            </p>
            <Link to="/dashboard/courses">
              <Button>
                Browse Courses
              </Button>
            </Link>
          </div>
        )}
      </MagicCard>
    </div>
  )
}