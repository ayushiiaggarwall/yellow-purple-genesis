import { useState } from "react"
import { CreditCard, Loader2, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { razorpay } from "@/lib/payments/razorpay"
import { stripe } from "@/lib/payments/stripe"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"

interface PaymentButtonProps {
  amount: number
  courseId?: string
  courseName: string
  className?: string
  variant?: "default" | "outline" | "secondary" | "destructive" | "ghost" | "link"
  size?: "sm" | "lg" | "icon"
  preferredProvider?: "razorpay" | "stripe"
  onSuccess?: (paymentId: string) => void
  onError?: (error: any) => void
}

export function PaymentButton({
  amount,
  courseId,
  courseName,
  className,
  variant = "default",
  size,
  preferredProvider = "razorpay",
  onSuccess,
  onError,
}: PaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [currentProvider, setCurrentProvider] = useState<"razorpay" | "stripe" | null>(null)
  const { toast } = useToast()
  const supabase = createClient()

  const handlePayment = async (provider: "razorpay" | "stripe") => {
    if (isLoading) return

    setIsLoading(true)
    setCurrentProvider(provider)

    try {
      // Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to continue with payment",
          variant: "destructive",
        })
        return
      }

      // Get user profile for name
      const { data: profile } = await supabase
        .from('profiles')
        .select('name')
        .eq('id', user.id)
        .single()

      const userName = profile?.name || user.email?.split('@')[0] || 'User'

      const paymentOptions = {
        amount,
        courseId,
        courseName,
        onSuccess: (paymentId: string) => {
          toast({
            title: "Payment successful!",
            description: `Welcome to ${courseName}. You can now access the course content.`,
          })
          onSuccess?.(paymentId)
        },
        onError: (error: any) => {
          console.error('Payment error:', error)
          toast({
            title: "Payment failed",
            description: error.message || "Something went wrong. Please try again.",
            variant: "destructive",
          })
          onError?.(error)
          
          // If Razorpay fails, offer Stripe as fallback
          if (provider === "razorpay") {
            toast({
              title: "Try alternative payment",
              description: "You can also try paying with card via Stripe.",
              action: (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePayment("stripe")}
                >
                  Try Card Payment
                </Button>
              ),
            })
          }
        },
      }

      if (provider === "razorpay") {
        await razorpay.processPayment({
          ...paymentOptions,
          userEmail: user.email!,
          userName,
        })
      } else {
        await stripe.processPayment({
          ...paymentOptions,
          successUrl: `${window.location.origin}/dashboard?payment=success&course=${courseId}`,
          cancelUrl: `${window.location.origin}/pricing?payment=cancelled`,
        })
      }
    } catch (error) {
      console.error('Payment initialization error:', error)
      toast({
        title: "Payment initialization failed",
        description: "Please try again or contact support if the problem persists.",
        variant: "destructive",
      })
      onError?.(error)
    } finally {
      setIsLoading(false)
      setCurrentProvider(null)
    }
  }

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="space-y-3">
      {/* Primary Payment Button */}
      <Button
        className={className}
        variant={variant}
        size={size}
        onClick={() => handlePayment(preferredProvider)}
        disabled={isLoading}
      >
        {isLoading && currentProvider === preferredProvider ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            {preferredProvider === "razorpay" ? (
              <Smartphone className="mr-2 h-4 w-4" />
            ) : (
              <CreditCard className="mr-2 h-4 w-4" />
            )}
            Pay {formatPrice(amount)}
            {preferredProvider === "razorpay" && (
              <Badge variant="secondary" className="ml-2 text-xs">
                UPI/Cards
              </Badge>
            )}
          </>
        )}
      </Button>

      {/* Alternative Payment Method */}
      {!isLoading && (
        <div className="flex items-center justify-center">
          <button
            onClick={() => handlePayment(preferredProvider === "razorpay" ? "stripe" : "razorpay")}
            className="text-sm text-muted-foreground hover:text-primary underline-offset-4 hover:underline"
          >
            {preferredProvider === "razorpay" ? (
              <>
                <CreditCard className="inline mr-1 h-3 w-3" />
                Pay with Card instead
              </>
            ) : (
              <>
                <Smartphone className="inline mr-1 h-3 w-3" />
                Pay with UPI/Cards instead
              </>
            )}
          </button>
        </div>
      )}

      {/* Payment Security Info */}
      <div className="text-xs text-muted-foreground text-center space-y-1">
        <p>🔒 Secure payment powered by {preferredProvider === "razorpay" ? "Razorpay" : "Stripe"}</p>
        <p>Your payment information is encrypted and secure</p>
      </div>
    </div>
  )
}