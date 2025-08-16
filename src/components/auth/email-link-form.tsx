import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mail, Loader2, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { emailLinkSchema, type EmailLinkInput } from "@/lib/validations/auth"
import { createClient } from "@/lib/supabase/client"

interface EmailLinkFormProps {
  mode: "login" | "signup"
  onSuccess?: () => void
}

export function EmailLinkForm({ mode, onSuccess }: EmailLinkFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)
  
  const supabase = createClient()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<EmailLinkInput>({
    resolver: zodResolver(emailLinkSchema),
  })
  
  const onSubmit = async (data: EmailLinkInput) => {
    if (isLoading) return
    
    setIsLoading(true)
    
    try {
      const redirectTo = `${window.location.origin}/auth/callback`
      
      if (mode === "signup") {
        const { error } = await supabase.auth.signInWithOtp({
          email: data.email,
          options: {
            emailRedirectTo: redirectTo,
          },
        })
        if (error) throw error
      } else {
        const { error } = await supabase.auth.signInWithOtp({
          email: data.email,
          options: {
            emailRedirectTo: redirectTo,
          },
        })
        if (error) throw error
      }
      
      setIsSuccess(true)
      setResendCooldown(30)
      onSuccess?.()
      
      // Start countdown
      const timer = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      
    } catch (error) {
      console.error('Auth error:', error)
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleResend = async () => {
    if (resendCooldown > 0) return
    
    const email = getValues("email")
    if (!email) return
    
    await onSubmit({ email })
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
            We've sent a magic link to your email address. Click the link to {mode === "signup" ? "create your account" : "sign in"}.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={handleResend}
          disabled={resendCooldown > 0}
        >
          {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend email"}
        </Button>
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
      
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending magic link...
          </>
        ) : (
          <>
            <Mail className="mr-2 h-4 w-4" />
            Send magic link
          </>
        )}
      </Button>
      
      <p className="text-xs text-center text-muted-foreground">
        We'll email you a magic link for a password-free {mode === "signup" ? "sign up" : "sign in"}.
      </p>
    </form>
  )
}