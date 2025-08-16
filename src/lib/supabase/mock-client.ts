// Mock Supabase client for demo purposes
export const createMockClient = () => ({
  auth: {
    getUser: async () => ({ data: { user: null }, error: null }),
    signUp: async () => ({ data: null, error: new Error('Demo mode - Supabase not configured') }),
    signInWithPassword: async () => ({ data: null, error: new Error('Demo mode - Supabase not configured') }),
    signInWithOtp: async () => ({ data: null, error: new Error('Demo mode - Supabase not configured') }),
    signInWithOAuth: async () => ({ data: null, error: new Error('Demo mode - Supabase not configured') }),
    signOut: async () => ({ error: null }),
    resetPasswordForEmail: async () => ({ data: null, error: new Error('Demo mode - Supabase not configured') }),
    updateUser: async () => ({ data: null, error: new Error('Demo mode - Supabase not configured') }),
    exchangeCodeForSession: async () => ({ data: null, error: new Error('Demo mode - Supabase not configured') }),
    getSession: async () => ({ data: { session: null }, error: null }),
  },
  from: (table: string) => ({
    select: () => ({
      eq: () => ({
        single: async () => ({ data: null, error: new Error('Demo mode - Supabase not configured') }),
        limit: () => ({
          then: async () => ({ data: [], error: null })
        }),
        then: async () => ({ data: [], error: null })
      }),
      order: () => ({
        limit: () => ({
          then: async () => ({ data: [], error: null })
        }),
        then: async () => ({ data: [], error: null })
      }),
      then: async () => ({ data: [], error: null })
    }),
    insert: () => ({
      then: async () => ({ data: null, error: new Error('Demo mode - Supabase not configured') })
    }),
    upsert: () => ({
      then: async () => ({ data: null, error: new Error('Demo mode - Supabase not configured') })
    }),
    update: () => ({
      eq: () => ({
        then: async () => ({ data: null, error: new Error('Demo mode - Supabase not configured') })
      })
    }),
    delete: () => ({
      eq: () => ({
        then: async () => ({ data: null, error: new Error('Demo mode - Supabase not configured') })
      })
    })
  })
})