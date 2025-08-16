import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = createClient()
    
    try {
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (error) {
        console.error('Auth callback error:', error)
        return NextResponse.redirect(`${requestUrl.origin}/auth/error?message=${encodeURIComponent(error.message)}`)
      }

      // Get the user to check if they need to complete their profile
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        // Check if user profile exists in our database
        const { data: profile } = await supabase
          .from('profiles')
          .select('id, name, avatar_url')
          .eq('id', user.id)
          .single()

        // If no profile exists, create one from the OAuth data
        if (!profile) {
          const { error: profileError } = await supabase
            .from('profiles')
            .insert({
              id: user.id,
              email: user.email!,
              name: user.user_metadata.name || user.user_metadata.full_name || user.email!.split('@')[0],
              avatar_url: user.user_metadata.avatar_url || null,
              role: 'student',
            })

          if (profileError) {
            console.error('Profile creation error:', profileError)
          }
        }
      }
      
      return NextResponse.redirect(`${requestUrl.origin}${next}`)
    } catch (error) {
      console.error('Unexpected auth callback error:', error)
      return NextResponse.redirect(`${requestUrl.origin}/auth/error?message=An unexpected error occurred`)
    }
  }

  // If no code, redirect to login
  return NextResponse.redirect(`${requestUrl.origin}/auth/login`)
}