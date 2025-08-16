import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'

// Initialize Stripe only if secret key is available
let stripe: Stripe | null = null
if (process.env.STRIPE_SECRET_KEY && !process.env.STRIPE_SECRET_KEY.includes('your-stripe')) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-07-30.basil',
  })
}

export async function POST(request: NextRequest) {
  try {
    // Check if Stripe is configured
    if (!stripe) {
      return NextResponse.json(
        { error: 'Stripe not configured' }, 
        { status: 503 }
      )
    }

    // Verify user is authenticated
    const supabase = createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { sessionId } = await request.json()

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status === 'paid') {
      // Log successful payment
      console.log('Stripe payment verified successfully:', {
        sessionId: session.id,
        paymentIntentId: session.payment_intent,
        userId: user.id,
        courseId: session.metadata?.courseId,
      })

      return NextResponse.json({
        verified: true,
        courseId: session.metadata?.courseId,
        courseName: session.metadata?.courseName,
        paymentIntentId: session.payment_intent,
        amount: session.amount_total,
        currency: session.currency,
      })
    }

    return NextResponse.json({
      verified: false,
      error: 'Payment not completed',
    })
  } catch (error: any) {
    console.error('Stripe session verification error:', error)
    return NextResponse.json(
      { error: 'Failed to verify session', details: error.message },
      { status: 500 }
    )
  }
}