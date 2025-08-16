import { createClient } from "@/lib/supabase/client"

declare global {
  interface Window {
    Razorpay: any
  }
}

export interface RazorpayOptions {
  key: string
  amount: number
  currency: string
  name: string
  description?: string
  order_id: string
  handler: (response: any) => void
  prefill?: {
    name?: string
    email?: string
    contact?: string
  }
  theme?: {
    color?: string
  }
  modal?: {
    ondismiss?: () => void
  }
}

export interface CreateOrderRequest {
  amount: number
  currency?: string
  receipt?: string
  notes?: Record<string, string>
}

export interface CreateOrderResponse {
  id: string
  entity: string
  amount: number
  amount_paid: number
  amount_due: number
  currency: string
  receipt: string
  status: string
  attempts: number
  notes: Record<string, string>
  created_at: number
}

export class RazorpayClient {
  private supabase = createClient()

  async createOrder(request: CreateOrderRequest): Promise<CreateOrderResponse> {
    const response = await fetch('/api/payments/razorpay/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      throw new Error('Failed to create Razorpay order')
    }

    return response.json()
  }

  async verifyPayment(paymentData: {
    razorpay_order_id: string
    razorpay_payment_id: string
    razorpay_signature: string
  }): Promise<boolean> {
    const response = await fetch('/api/payments/razorpay/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    })

    if (!response.ok) {
      throw new Error('Failed to verify Razorpay payment')
    }

    const result = await response.json()
    return result.verified
  }

  async processPayment(options: {
    amount: number
    courseId?: string
    courseName: string
    userEmail: string
    userName: string
    onSuccess?: (paymentId: string) => void
    onError?: (error: any) => void
  }): Promise<void> {
    try {
      // Load Razorpay script if not already loaded
      if (!window.Razorpay) {
        await this.loadRazorpayScript()
      }

      // Create order
      const order = await this.createOrder({
        amount: options.amount * 100, // Convert to paise
        currency: 'INR',
        receipt: `course_${options.courseId}_${Date.now()}`,
        notes: {
          courseId: options.courseId || '',
          courseName: options.courseName,
          userEmail: options.userEmail,
        },
      })

      // Initialize Razorpay
      const rzp = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'LMS Platform',
        description: `Payment for ${options.courseName}`,
        order_id: order.id,
        handler: async (response: any) => {
          try {
            // Verify payment
            const verified = await this.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            })

            if (verified) {
              // Update enrollment status in database
              if (options.courseId) {
                const { data: { user } } = await this.supabase.auth.getUser()
                if (user) {
                  await this.supabase
                    .from('enrollments')
                    .upsert({
                      user_id: user.id,
                      cohort_id: options.courseId,
                      payment_status: 'completed',
                      payment_id: response.razorpay_payment_id,
                      enrolled_at: new Date().toISOString(),
                    })
                }
              }

              options.onSuccess?.(response.razorpay_payment_id)
            } else {
              throw new Error('Payment verification failed')
            }
          } catch (error) {
            console.error('Payment verification error:', error)
            options.onError?.(error)
          }
        },
        prefill: {
          name: options.userName,
          email: options.userEmail,
        },
        theme: {
          color: '#FBBF24', // Yellow primary color
        },
        modal: {
          ondismiss: () => {
            options.onError?.(new Error('Payment cancelled by user'))
          },
        },
      })

      rzp.open()
    } catch (error) {
      console.error('Razorpay payment error:', error)
      options.onError?.(error)
    }
  }

  private loadRazorpayScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve()
      script.onerror = () => reject(new Error('Failed to load Razorpay script'))
      document.head.appendChild(script)
    })
  }
}

export const razorpay = new RazorpayClient()