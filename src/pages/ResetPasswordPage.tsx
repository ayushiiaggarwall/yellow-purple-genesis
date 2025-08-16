import { AuthCard } from "@/components/auth/auth-card"
import { ResetPasswordForm } from "@/components/auth/reset-password-form"
import { useNavigate } from "react-router-dom"

export default function ResetPasswordPage() {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate("/auth/login")
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