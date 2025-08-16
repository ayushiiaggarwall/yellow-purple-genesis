"use client"

import { Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { AlertCircle, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AuthCard } from "@/components/auth/auth-card"

function ErrorContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const error = searchParams.get("message") || "An authentication error occurred"

  const handleGoBack = () => {
    router.push("/auth/login")
  }

  return (
    <AuthCard
      title="Authentication Error"
      description="Something went wrong during authentication"
    >
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        
        <div className="space-y-2">
          <h3 className="font-semibold text-destructive">Authentication Failed</h3>
          <p className="text-sm text-muted-foreground">
            {error}
          </p>
        </div>

        <Button onClick={handleGoBack} className="w-full">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Sign In
        </Button>
      </div>
    </AuthCard>
  )
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={
      <AuthCard
        title="Authentication Error"
        description="Loading..."
      >
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-sm text-muted-foreground">Loading error details...</p>
        </div>
      </AuthCard>
    }>
      <ErrorContent />
    </Suspense>
  )
}