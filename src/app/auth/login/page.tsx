"use client"

import { useState } from "react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { AuthCard } from "@/components/auth/auth-card"
import { PasswordForm } from "@/components/auth/password-form"
import { EmailLinkForm } from "@/components/auth/email-link-form"
import { OAuthButtons } from "@/components/auth/oauth-buttons"

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("password")

  return (
    <AuthCard
      title="Welcome back"
      description="Sign in to your account to continue learning"
    >
      <div className="space-y-4">
        <OAuthButtons mode="login" />
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="email">Magic Link</TabsTrigger>
          </TabsList>
          
          <TabsContent value="password" className="space-y-4">
            <PasswordForm mode="login" />
          </TabsContent>
          
          <TabsContent value="email" className="space-y-4">
            <EmailLinkForm mode="login" />
          </TabsContent>
        </Tabs>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">Don't have an account? </span>
          <Link href="/auth/signup" className="text-primary hover:underline font-medium">
            Sign up
          </Link>
        </div>
      </div>
    </AuthCard>
  )
}