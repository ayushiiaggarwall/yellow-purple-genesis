import { useEffect, useState } from "react"
import { Plus, Edit, Trash2, Eye, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MagicCard } from "@/components/ui/magic-card"
import { Progress } from "@/components/ui/progress"

interface Course {
  id: string
  name: string
  description: string
  status: 'published' | 'draft' | 'archived'
  enrollments: number
  completionRate: number
  totalLessons: number
  lastUpdated: string
}

interface ContentManagementProps {}

export function ContentManagement({}: ContentManagementProps) {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock course data
    const mockCourses: Course[] = [
      {
        id: '1',
        name: 'No-Code to Product Mastery',
        description: '5-week intensive course to build profitable products without coding',
        status: 'published',
        enrollments: 356,
        completionRate: 78,
        totalLessons: 50,
        lastUpdated: '2024-01-15'
      },
      {
        id: '2',
        name: 'Advanced Bubble Development',
        description: 'Deep dive into complex Bubble applications and workflows',
        status: 'draft',
        enrollments: 0,
        completionRate: 0,
        totalLessons: 35,
        lastUpdated: '2024-01-10'
      },
      {
        id: '3',
        name: 'AI Integration for No-Code',
        description: 'Learn to integrate AI tools with your no-code applications',
        status: 'draft',
        enrollments: 0,
        completionRate: 0,
        totalLessons: 25,
        lastUpdated: '2024-01-08'
      }
    ]

    setCourses(mockCourses)
    setLoading(false)
  }, [])

  const getStatusColor = (status: Course['status']) => {
    switch (status) {
      case 'published': return 'default'
      case 'draft': return 'secondary'
      case 'archived': return 'outline'
      default: return 'outline'
    }
  }

  if (loading) {
    return (
      <MagicCard className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-muted rounded w-1/3" />
          <div className="h-10 bg-muted rounded" />
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-3 bg-muted rounded w-1/2" />
              <div className="h-2 bg-muted rounded w-full" />
            </div>
          ))}
        </div>
      </MagicCard>
    )
  }

  return (
    <MagicCard className="p-6" gradientColor="rgba(168, 85, 247, 0.1)">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Content Management</h2>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            New Course
          </Button>
        </div>

        {/* Content Stats */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-semibold text-foreground">
              {courses.filter(c => c.status === 'published').length}
            </div>
            <div className="text-xs text-muted-foreground">Published</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-foreground">
              {courses.filter(c => c.status === 'draft').length}
            </div>
            <div className="text-xs text-muted-foreground">Drafts</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-foreground">
              {courses.reduce((total, course) => total + course.totalLessons, 0)}
            </div>
            <div className="text-xs text-muted-foreground">Total Lessons</div>
          </div>
        </div>

        {/* Course List */}
        <div className="space-y-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="p-4 rounded-lg border bg-background/50 hover:bg-background/80 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium text-foreground">
                      {course.name}
                    </h3>
                    <Badge variant={getStatusColor(course.status)}>
                      {course.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {course.description}
                  </p>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {course.enrollments} enrolled
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">
                    {course.totalLessons} lessons
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Updated {new Date(course.lastUpdated).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">
                    {course.completionRate}% completion
                  </span>
                </div>
              </div>

              {course.status === 'published' && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Course Completion Rate</span>
                    <span>{course.completionRate}%</span>
                  </div>
                  <Progress value={course.completionRate} className="h-2" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="border-t pt-4">
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" size="sm">
              Bulk Edit
            </Button>
            <Button variant="outline" size="sm">
              Export Data
            </Button>
          </div>
        </div>
      </div>
    </MagicCard>
  )
}