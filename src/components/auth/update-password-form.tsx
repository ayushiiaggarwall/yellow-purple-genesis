import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Lock, Loader2, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updatePasswordSchema, type UpdatePasswordInput } from "@/lib/validations/auth"
import { PasswordStrength } from "./password-strength"
import { createClient } from "@/lib/supabase/client"
import { useNavigate, useSearchParams } from "react-router-dom"

interface UpdatePasswordFormProps {
  onSuccess?: () => void
}

export function UpdatePasswordForm({ onSuccess }: UpdatePasswordFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isValidSession, setIsValidSession] = useState<boolean | null>(null)
  
  const navigate = useNavigate()
  const searchParams = useSearchParams()
  const supabase = createClient()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<UpdatePasswordInput>({
    resolver: zodResolver(updatePasswordSchema),
  })
  
  const password = watch("password")
  
  useEffect(() => {
    // Check if user has a valid session (from reset password email)
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setIsValidSession(!!session)
      
      if (!session) {
        // If no session, redirect to reset password page
        setTimeout(() => {
          navigate("/reset-password")
        }, 3000)
      }
    }
    
    checkSession()
  }, [supabase.auth, router])
  
  const onSubmit = async (data: UpdatePasswordInput) => {
    if (isLoading) return
    
    setIsLoading(true)
    setError(null)
    
    try {
      const { error } = await supabase.auth.updateUser({
        password: data.password,
      })
      
      if (error) throw error
      
      setIsSuccess(true)
      onSuccess?.()
      
      // Redirect to dashboard after successful password update
      setTimeout(() => {
        navigate("/dashboard")
      }, 2000)
    } catch (error: any) {
      setError(error.message || "An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }
  
  if (isValidSession === null) {
    return (
      <div className="text-center space-y-4">
        <Loader2 className="w-8 h-8 animate-spin mx-auto" />
        <p className="text-muted-foreground">Verifying your session...</p>
      </div>
    )
  }
  
  if (isValidSession === false) {
    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
          <Lock className="w-8 h-8 text-red-600" />
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-destructive">Invalid Session</h3>
          <p className="text-sm text-muted-foreground">
            Your password reset link has expired or is invalid. You'll be redirected to request a new one.
          </p>
        </div>
      </div>
    )
  }
  
  if (isSuccess) {
    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold">Password updated successfully</h3>
          <p className="text-sm text-muted-foreground">
            Your password has been updated. You'll be redirected to your dashboard shortly.
          </p>
        </div>
      </div>
    )
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="password">New password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your new password"
            className="pl-10 pr-10"
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
        {password && <PasswordStrength password={password} />}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm new password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your new password"
            className="pl-10 pr-10"
            {...register("confirmPassword")}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
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
            Updating password...
          </>
        ) : (
          <>
            <Lock className="mr-2 h-4 w-4" />
            Update password
          </>
        )}
      </Button>
    </form>
  )
}