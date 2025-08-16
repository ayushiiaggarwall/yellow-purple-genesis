import { useMemo } from "react"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface PasswordStrengthProps {
  password: string
  className?: string
}

export function PasswordStrength({ password, className }: PasswordStrengthProps) {
  const strength = useMemo(() => {
    if (!password) return { score: 0, label: "", color: "", progress: 0 }
    
    let score = 0
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    }
    
    score = Object.values(checks).filter(Boolean).length
    
    const strengthMap = {
      0: { label: "", color: "", progress: 0 },
      1: { label: "Very weak", color: "text-red-500", progress: 20 },
      2: { label: "Weak", color: "text-orange-500", progress: 40 },
      3: { label: "Fair", color: "text-yellow-500", progress: 60 },
      4: { label: "Good", color: "text-blue-500", progress: 80 },
      5: { label: "Strong", color: "text-green-500", progress: 100 },
    }
    
    return { ...strengthMap[score as keyof typeof strengthMap], score }
  }, [password])
  
  if (!password) return null
  
  return (
    <div className={cn("space-y-2", className)}>
      <Progress value={strength.progress} className="h-2" />
      <div className="flex justify-between text-xs">
        <span className={cn("font-medium", strength.color)}>
          {strength.label && `Password strength: ${strength.label}`}
        </span>
        <span className="text-muted-foreground">{strength.progress}%</span>
      </div>
    </div>
  )
}