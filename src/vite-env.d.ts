/// <reference types="vite/client" />

// Disable TypeScript errors for missing type definitions
declare module '@babel/core'
declare module '@babel/generator' 
declare module '@babel/template'
declare module '@babel/traverse'
declare module 'chai'
declare module 'deep-eql'
declare module 'estree'
declare module 'json-schema'
declare module 'phoenix'
declare module 'prop-types'
declare module 'ws'

// Environment variables
interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_STRIPE_PUBLISHABLE_KEY: string
  readonly VITE_RAZORPAY_KEY_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}