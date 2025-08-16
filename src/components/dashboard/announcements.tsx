import { useEffect, useState } from "react"
import { MessageSquare, Calendar, ExternalLink, Pin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MagicCard } from "@/components/ui/magic-card"
import { createClient } from "@/lib/supabase/client"

interface Announcement {
  id: string
  title: string
  content: string
  type: 'general' | 'update' | 'event' | 'important'
  isPinned: boolean
  createdAt: string
  link?: string
}

export function Announcements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)
  
  const supabase = createClient()

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        // Get announcements from database
        const { data } = await supabase
          .from('announcements')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5)

        // For now, use mock data since we don't have announcements in our schema yet
        const mockAnnouncements: Announcement[] = [
          {
            id: '1',
            title: 'Welcome to the Course! 🎉',
            content: 'Welcome to No-Code to Product Mastery! We\'re excited to have you join our community of makers and entrepreneurs.',
            type: 'important',
            isPinned: true,
            createdAt: '2024-01-15T10:00:00Z'
          },
          {
            id: '2',
            title: 'New Bonus Module: AI Integration',
            content: 'We\'ve added a special bonus module on integrating AI tools with your no-code applications. Check it out in Week 4!',
            type: 'update',
            isPinned: false,
            createdAt: '2024-01-14T14:30:00Z',
            link: '/dashboard/courses/1/modules/bonus-ai'
          },
          {
            id: '3',
            title: 'Live Q&A Session - Tomorrow 3PM',
            content: 'Join our instructor for a live Q&A session tomorrow at 3 PM PST. Bring your questions about Bubble and no-code development!',
            type: 'event',
            isPinned: false,
            createdAt: '2024-01-13T09:15:00Z',
            link: '/dashboard/events/qa-session'
          },
          {
            id: '4',
            title: 'Community Showcase: Student Projects',
            content: 'Check out amazing projects built by your fellow students in our community showcase. Get inspired and share your own!',
            type: 'general',
            isPinned: false,
            createdAt: '2024-01-12T16:45:00Z',
            link: '/dashboard/community/showcase'
          }
        ]

        setAnnouncements(mockAnnouncements)
      } catch (error) {
        console.error('Error fetching announcements:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnnouncements()
  }, [supabase])

  const getTypeColor = (type: Announcement['type']) => {
    switch (type) {
      case 'important': return 'destructive'
      case 'update': return 'default'
      case 'event': return 'secondary'
      case 'general': return 'outline'
      default: return 'outline'
    }
  }

  const getTypeIcon = (type: Announcement['type']) => {
    switch (type) {
      case 'event': return <Calendar className="w-4 h-4" />
      default: return <MessageSquare className="w-4 h-4" />
    }
  }

  if (loading) {
    return (
      <MagicCard className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-muted rounded w-1/2" />
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-3 bg-muted rounded w-full" />
              <div className="h-3 bg-muted rounded w-1/2" />
            </div>
          ))}
        </div>
      </MagicCard>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Announcements</h2>

      <MagicCard className="p-6" gradientColor="rgba(34, 197, 94, 0.1)">
        <div className="space-y-6">
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="p-4 rounded-lg border bg-background/50 hover:bg-background/80 transition-colors"
            >
              <div className="flex items-start gap-3">
                {announcement.isPinned && (
                  <Pin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                )}
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={getTypeColor(announcement.type)} className="text-xs">
                      <span className="mr-1">{getTypeIcon(announcement.type)}</span>
                      {announcement.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(announcement.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <h3 className="font-medium text-foreground mb-2">
                    {announcement.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {announcement.content}
                  </p>
                  
                  {announcement.link && (
                    <Button variant="link" size="sm" className="mt-2 p-0 h-auto">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Learn More
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {announcements.length === 0 && (
          <div className="text-center py-8">
            <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No Announcements
            </h3>
            <p className="text-muted-foreground">
              We'll notify you of important updates here
            </p>
          </div>
        )}
      </MagicCard>

      {/* Quick Actions */}
      <MagicCard className="p-4">
        <h3 className="font-medium text-foreground mb-3">Quick Actions</h3>
        <div className="grid grid-cols-1 gap-2">
          <Button variant="outline" size="sm" className="justify-start">
            <MessageSquare className="w-4 h-4 mr-2" />
            Join Community Discussion
          </Button>
          <Button variant="outline" size="sm" className="justify-start">
            <Calendar className="w-4 h-4 mr-2" />
            View Upcoming Events
          </Button>
        </div>
      </MagicCard>
    </div>
  )
}