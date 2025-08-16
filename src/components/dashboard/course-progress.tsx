import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Play, Clock, CheckCircle, ArrowRight, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { MagicCard } from "@/components/ui/magic-card"
import { createClient } from "@/lib/supabase/client"

interface Course {
  id: string
  name: string
  description: string
  progress: number
  totalLessons: number
  completedLessons: number
  nextLesson: {
    id: string
    title: string
    duration: number
  }
  status: 'in_progress' | 'completed' | 'not_started'
}

export function CourseProgress() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  
  const supabase = createClient()

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        // Get enrolled courses
        const { data: enrollments } = await supabase
          .from('enrollments')
          .select(`
            *,
            cohorts (
              id,
              name,
              description,
              start_date,
              end_date
            )
          `)
          .eq('user_id', user.id)
          .eq('payment_status', 'completed')

        // For now, create mock course data since we don't have full lesson tracking
        const mockCourses: Course[] = [
          {
            id: '1',
            name: 'No-Code to Product Mastery',
            description: '5-week intensive course to build profitable products without coding',
            progress: 24,
            totalLessons: 50,
            completedLessons: 12,
            nextLesson: {
              id: '13',
              title: 'Building Your First MVP with Bubble',
              duration: 18
            },
            status: 'in_progress'
          }
        ]

        setCourses(mockCourses)
      } catch (error) {
        console.error('Error fetching courses:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [supabase])

  if (loading) {
    return (
      <MagicCard className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-muted rounded w-1/3" />
          <div className="h-4 bg-muted rounded w-2/3" />
          <div className="h-2 bg-muted rounded w-full" />
          <div className="h-10 bg-muted rounded w-32" />
        </div>
      </MagicCard>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Your Courses</h2>
        <Link to="/dashboard/courses">
          <Button variant="outline" size="sm">
            View All
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {courses.map((course) => (
          <MagicCard
            key={course.id}
            className="p-6"
            gradientColor="rgba(251, 191, 36, 0.1)"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-foreground">
                    {course.name}
                  </h3>
                  <Badge variant={course.status === 'completed' ? 'default' : 'secondary'}>
                    {course.status === 'in_progress' ? 'In Progress' : 
                     course.status === 'completed' ? 'Completed' : 'Not Started'}
                  </Badge>
                </div>
                
                <p className="text-muted-foreground mb-4">
                  {course.description}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {course.completedLessons} of {course.totalLessons} lessons completed
                    </span>
                    <span className="font-medium text-foreground">
                      {course.progress}%
                    </span>
                  </div>
                  
                  <Progress value={course.progress} className="h-3" />
                </div>

                {course.nextLesson && (
                  <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Next Lesson
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {course.nextLesson.title}
                        </p>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 mr-1" />
                        {course.nextLesson.duration}m
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                {course.status === 'in_progress' && (
                  <Link to={`/dashboard/courses/${course.id}/lessons/${course.nextLesson.id}`}>
                    <Button className="w-full sm:w-auto">
                      <Play className="w-4 h-4 mr-2" />
                      Continue Learning
                    </Button>
                  </Link>
                )}
                
                {course.status === 'completed' && (
                  <Link to={`/dashboard/courses/${course.id}`}>
                    <Button variant="outline" className="w-full sm:w-auto">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Review Course
                    </Button>
                  </Link>
                )}
                
                {course.status === 'not_started' && (
                  <Link to={`/dashboard/courses/${course.id}`}>
                    <Button className="w-full sm:w-auto">
                      <Play className="w-4 h-4 mr-2" />
                      Start Course
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </MagicCard>
        ))}
      </div>

      {courses.length === 0 && (
        <MagicCard className="p-12 text-center">
          <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No Courses Yet
          </h3>
          <p className="text-muted-foreground mb-6">
            Enroll in a course to start your learning journey
          </p>
          <Link to="/pricing">
            <Button>
              Browse Courses
            </Button>
          </Link>
        </MagicCard>
      )}
    </div>
  )
}