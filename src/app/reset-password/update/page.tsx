"use client"

import { Suspense } from "react"
import { AuthCard } from "@/components/auth/auth-card"
import { UpdatePasswordForm } from "@/components/auth/update-password-form"

export default function UpdatePasswordPage() {
  return (
    <Suspense fallback={
      <AuthCard
        title="Set your new password"
        description="Loading..."
      >
        <div className="space-y-4">
          <div className="h-10 bg-gray-200 rounded animate-pulse" />
          <div className="h-10 bg-gray-200 rounded animate-pulse" />
          <div className="h-10 bg-gray-200 rounded animate-pulse" />
        </div>
      </AuthCard>
    }>
      <AuthCard
        title="Set your new password"
        description="Choose a strong password to secure your account"
      >
        <UpdatePasswordForm />
      </AuthCard>
    </Suspense>
  )
}