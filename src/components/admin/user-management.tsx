import { useEffect, useState } from "react"
import { Search, Filter, MoreVertical, Mail, Ban, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MagicCard } from "@/components/ui/magic-card"
import { createClient } from "@/lib/supabase/client"
import type { Database } from "@/lib/supabase/database.types"

type Profile = Database['public']['Tables']['profiles']['Row']

interface UserManagementProps {}

export function UserManagement({}: UserManagementProps) {
  const [users, setUsers] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState<string>("all")
  
  const supabase = createClient()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data: profiles } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10)

        setUsers(profiles || [])
      } catch (error) {
        console.error('Error fetching users:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [supabase])

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === "all" || user.role === filterRole
    return matchesSearch && matchesRole
  })

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'destructive'
      case 'instructor': return 'default'
      case 'student': return 'secondary'
      default: return 'outline'
    }
  }

  const getUserStatusIcon = (user: Profile) => {
    // Mock status logic - in real app, this would check last login, etc.
    const isActive = Math.random() > 0.3
    return isActive ? (
      <CheckCircle className="w-4 h-4 text-green-600" />
    ) : (
      <AlertCircle className="w-4 h-4 text-amber-600" />
    )
  }

  if (loading) {
    return (
      <MagicCard className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-muted rounded w-1/3" />
          <div className="h-10 bg-muted rounded" />
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-10 h-10 bg-muted rounded-full" />
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
    <MagicCard className="p-6" gradientColor="rgba(59, 130, 246, 0.1)">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">User Management</h2>
          <Button size="sm">Add User</Button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-3 py-2 border border-input bg-background rounded-md text-sm"
          >
            <option value="all">All Roles</option>
            <option value="student">Students</option>
            <option value="instructor">Instructors</option>
            <option value="admin">Admins</option>
          </select>
        </div>

        {/* User List */}
        <div className="space-y-3">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-4 p-4 rounded-lg border bg-background/50 hover:bg-background/80 transition-colors"
            >
              {/* Avatar */}
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-medium">
                  {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                </span>
              </div>

              {/* User Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-foreground truncate">
                    {user.name || 'No name'}
                  </h4>
                  {getUserStatusIcon(user)}
                  <Badge variant={getRoleColor(user.role || 'student')} className="text-xs">
                    {user.role || 'student'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {user.email}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                  <span>Joined {new Date(user.created_at).toLocaleDateString()}</span>
                  {user.role === 'student' && (
                    <span>Progress: 24%</span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Mail className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-8">
            <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No Users Found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* Quick Stats */}
        <div className="border-t pt-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-semibold text-foreground">
                {users.filter(u => u.role === 'student').length}
              </div>
              <div className="text-xs text-muted-foreground">Students</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-foreground">
                {users.filter(u => u.role === 'admin').length}
              </div>
              <div className="text-xs text-muted-foreground">Admins</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-foreground">
                {users.length}
              </div>
              <div className="text-xs text-muted-foreground">Total</div>
            </div>
          </div>
        </div>
      </div>
    </MagicCard>
  )
}