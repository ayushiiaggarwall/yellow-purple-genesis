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

    const { 
      priceId, 
      courseId, 
      courseName, 
      amount, 
      currency = 'inr',
      successUrl,
      cancelUrl 
    } = await request.json()

    if (!courseName || !amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid course or amount' }, { status: 400 })
    }

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card'],
      customer_email: user.email,
      mode: 'payment',
      success_url: successUrl || `${request.nextUrl.origin}/dashboard?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${request.nextUrl.origin}/pricing?payment=cancelled`,
      metadata: {
        userId: user.id,
        courseId: courseId || '',
        courseName,
      },
    }

    if (priceId) {
      // Use existing price from Stripe Dashboard
      sessionParams.line_items = [
        {
          price: priceId,
          quantity: 1,
        },
      ]
    } else {
      // Create price dynamically
      sessionParams.line_items = [
        {
          price_data: {
            currency,
            unit_amount: Math.round(amount * 100), // Convert to smallest currency unit
            product_data: {
              name: courseName,
              description: `Access to ${courseName}`,
              images: [`${request.nextUrl.origin}/course-thumbnail.jpg`],
            },
          },
          quantity: 1,
        },
      ]
    }

    const session = await stripe.checkout.sessions.create(sessionParams)

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    })
  } catch (error: any) {
    console.error('Stripe session creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session', details: error.message },
      { status: 500 }
    )
  }
}