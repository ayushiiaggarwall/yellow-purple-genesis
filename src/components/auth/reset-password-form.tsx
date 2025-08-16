import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mail, Loader2, CheckCircle, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { resetPasswordSchema, type ResetPasswordInput } from "@/lib/validations/auth"
import { createClient } from "@/lib/supabase/client"

interface ResetPasswordFormProps {
  onBack?: () => void
  onSuccess?: () => void
}

export function ResetPasswordForm({ onBack, onSuccess }: ResetPasswordFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const supabase = createClient()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  })
  
  const onSubmit = async (data: ResetPasswordInput) => {
    if (isLoading) return
    
    setIsLoading(true)
    setError(null)
    
    try {
      const redirectTo = `${window.location.origin}/reset-password/update`
      
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo,
      })
      
      if (error) throw error
      
      setIsSuccess(true)
      onSuccess?.()
    } catch (error: any) {
      setError(error.message || "An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }
  
  if (isSuccess) {
    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold">Check your inbox</h3>
          <p className="text-sm text-muted-foreground">
            We've sent a password reset link to {getValues("email")}. Click the link to reset your password.
          </p>
        </div>
        <div className="space-y-2">
          <Button variant="outline" onClick={() => setIsSuccess(false)}>
            Try another email
          </Button>
          {onBack && (
            <Button variant="ghost" onClick={onBack} className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to sign in
            </Button>
          )}
        </div>
      </div>
    )
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email address</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="pl-10"
            {...register("email")}
          />
        </div>
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>
      
      {error && (
        <div className="rounded-md bg-destructive/10 p-3">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}
      
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending reset link...
          </>
        ) : (
          <>
            <Mail className="mr-2 h-4 w-4" />
            Send reset link
          </>
        )}
      </Button>
      
      {onBack && (
        <Button type="button" variant="ghost" onClick={onBack} className="w-full">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to sign in
        </Button>
      )}
      
      <p className="text-xs text-center text-muted-foreground">
        Remember your password?{" "}
        <button
          type="button"
          onClick={onBack}
          className="text-primary hover:underline"
        >
          Sign in
        </button>
      </p>
    </form>
  )
}