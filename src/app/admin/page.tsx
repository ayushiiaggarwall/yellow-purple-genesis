"use client"

import { useEffect, useState } from "react"
import { redirect } from "next/navigation"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminStats } from "@/components/admin/admin-stats"
import { UserManagement } from "@/components/admin/user-management"
import { ContentManagement } from "@/components/admin/content-management"
import { PaymentOverview } from "@/components/admin/payment-overview"
import { SystemHealth } from "@/components/admin/system-health"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"
import type { Database } from "@/lib/supabase/database.types"

type Profile = Database['public']['Tables']['profiles']['Row']

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        redirect('/auth/login')
      }

      setUser(user)

      // Get user profile and check if admin
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (!profile || profile.role !== 'admin') {
        redirect('/dashboard')
      }

      setProfile(profile)
      setLoading(false)
    }

    getUser()
  }, [supabase])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user || !profile) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader user={user} profile={profile} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Admin Dashboard 🛠️
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage users, content, and monitor system performance
          </p>
        </div>

        <div className="space-y-8">
          {/* Stats Overview */}
          <AdminStats />

          {/* Management Sections */}
          <div className="grid lg:grid-cols-2 gap-8">
            <UserManagement />
            <ContentManagement />
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <PaymentOverview />
            <SystemHealth />
          </div>
        </div>
      </main>
    </div>
  )
}