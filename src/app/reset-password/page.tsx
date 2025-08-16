"use client"

import { AuthCard } from "@/components/auth/auth-card"
import { ResetPasswordForm } from "@/components/auth/reset-password-form"
import { useRouter } from "next/navigation"

export default function ResetPasswordPage() {
  const router = useRouter()

  const handleBack = () => {
    router.push("/auth/login")
  }

  return (
    <AuthCard
      title="Reset your password"
      description="Enter your email and we'll send you a link to reset your password"
    >
      <ResetPasswordForm onBack={handleBack} />
    </AuthCard>
  )
}