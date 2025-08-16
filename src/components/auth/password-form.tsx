import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Lock, User, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { loginSchema, signupSchema, type LoginInput, type SignupInput } from "@/lib/validations/auth"
import { PasswordStrength } from "./password-strength"
import { createClient } from "@/lib/supabase/client"
import { useNavigate } from "react-router-dom"

interface PasswordFormProps {
  mode: "login" | "signup"
  onSuccess?: () => void
}

export function PasswordForm({ mode, onSuccess }: PasswordFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const navigate = useNavigate()
  const supabase = createClient()
  
  const schema = mode === "signup" ? signupSchema : loginSchema
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignupInput | LoginInput>({
    resolver: zodResolver(schema),
  })
  
  const password = watch("password")
  
  const onSubmit = async (data: SignupInput | LoginInput) => {
    if (isLoading) return
    
    setIsLoading(true)
    setError(null)
    
    try {
      if (mode === "signup") {
        const signupData = data as SignupInput
        const { error } = await supabase.auth.signUp({
          email: signupData.email,
          password: signupData.password,
          options: {
            data: {
              name: signupData.name,
            },
          },
        })
        if (error) throw error
        
        // Redirect to dashboard after successful signup
        navigate("/dashboard")
      } else {
        const loginData = data as LoginInput
        const { error } = await supabase.auth.signInWithPassword({
          email: loginData.email,
          password: loginData.password,
        })
        if (error) throw error
        
        // Redirect to dashboard after successful login
        navigate("/dashboard")
      }
      
      onSuccess?.()
    } catch (error: any) {
      setError(error.message || "An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {mode === "signup" && (
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              className="pl-10"
              {...register("name" as any)}
            />
          </div>
          {'name' in errors && errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
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
        {mode === "signup" && password && (
          <PasswordStrength password={password} />
        )}
      </div>
      
      {mode === "signup" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                className="pl-10 pr-10"
                {...register("confirmPassword" as any)}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {'confirmPassword' in errors && errors.confirmPassword && (
              <p className="text-sm text-destructive">{(errors as any).confirmPassword.message}</p>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              id="acceptTerms"
              type="checkbox"
              className="rounded border-input"
              {...register("acceptTerms" as any)}
            />
            <Label htmlFor="acceptTerms" className="text-sm leading-none">
              I agree to the{" "}
              <a href="/terms" className="underline hover:no-underline" target="_blank">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="underline hover:no-underline" target="_blank">
                Privacy Policy
              </a>
            </Label>
          </div>
          {'acceptTerms' in errors && errors.acceptTerms && (
            <p className="text-sm text-destructive">{(errors as any).acceptTerms.message}</p>
          )}
        </>
      )}
      
      {error && (
        <div className="rounded-md bg-destructive/10 p-3">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}
      
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {mode === "signup" ? "Creating account..." : "Signing in..."}
          </>
        ) : (
          mode === "signup" ? "Create account" : "Sign in"
        )}
      </Button>
      
      {mode === "login" && (
        <div className="text-center">
          <a
            href="/reset-password"
            className="text-sm text-primary hover:underline"
          >
            Forgot your password?
          </a>
        </div>
      )}
    </form>
  )
}