import { loadStripe, Stripe } from '@stripe/stripe-js'
import { createClient } from "@/lib/supabase/client"

let stripePromise: Promise<Stripe | null>

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
  }
  return stripePromise
}

export interface CreateCheckoutSessionRequest {
  priceId?: string
  courseId?: string
  courseName: string
  amount: number
  currency?: string
  successUrl?: string
  cancelUrl?: string
}

export interface CreateCheckoutSessionResponse {
  sessionId: string
  url: string
}

export class StripeClient {
  private supabase = createClient()

  async createCheckoutSession(request: CreateCheckoutSessionRequest): Promise<CreateCheckoutSessionResponse> {
    const response = await fetch('/api/payments/stripe/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      throw new Error('Failed to create Stripe checkout session')
    }

    return response.json()
  }

  async redirectToCheckout(sessionId: string): Promise<void> {
    const stripe = await getStripe()
    if (!stripe) {
      throw new Error('Failed to load Stripe')
    }

    const { error } = await stripe.redirectToCheckout({
      sessionId,
    })

    if (error) {
      throw error
    }
  }

  async processPayment(options: {
    amount: number
    courseId?: string
    courseName: string
    successUrl?: string
    cancelUrl?: string
    onError?: (error: any) => void
  }): Promise<void> {
    try {
      const { data: { user } } = await this.supabase.auth.getUser()
      if (!user) {
        throw new Error('User not authenticated')
      }

      // Create checkout session
      const session = await this.createCheckoutSession({
        courseId: options.courseId,
        courseName: options.courseName,
        amount: options.amount,
        currency: 'inr',
        successUrl: options.successUrl || `${window.location.origin}/dashboard?payment=success`,
        cancelUrl: options.cancelUrl || `${window.location.origin}/pricing?payment=cancelled`,
      })

      // Redirect to checkout
      await this.redirectToCheckout(session.sessionId)
    } catch (error) {
      console.error('Stripe payment error:', error)
      options.onError?.(error)
    }
  }

  async handleSuccessfulPayment(sessionId: string): Promise<void> {
    try {
      // Verify the session and update enrollment
      const response = await fetch('/api/payments/stripe/verify-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
      })

      if (!response.ok) {
        throw new Error('Failed to verify Stripe session')
      }

      const result = await response.json()
      
      if (result.verified && result.courseId) {
        const { data: { user } } = await this.supabase.auth.getUser()
        if (user) {
          await this.supabase
            .from('enrollments')
            .upsert({
              user_id: user.id,
              cohort_id: result.courseId,
              payment_status: 'completed',
              payment_id: result.paymentIntentId,
              enrolled_at: new Date().toISOString(),
            })
        }
      }
    } catch (error) {
      console.error('Stripe success verification error:', error)
      throw error
    }
  }
}

export const stripe = new StripeClient()