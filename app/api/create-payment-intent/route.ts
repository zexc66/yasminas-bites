import Stripe from 'stripe'
import { getProduct } from '@/lib/products'
import { CartItem } from '@/types'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-05-27.dahlia' })

export async function POST(request: Request) {
  const { items } = await request.json() as { items: Array<{ id: string; quantity: number }> }

  if (!Array.isArray(items) || items.length === 0) {
    return Response.json({ error: 'Cart is empty' }, { status: 400 })
  }

  // Compute total server-side from canonical product prices — never trust client amount
  let total = 0
  for (const { id, quantity } of items) {
    const product = getProduct(id)
    if (!product) return Response.json({ error: `Unknown product: ${id}` }, { status: 400 })
    total += product.price * quantity
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(total * 100),
    currency: 'gbp',
    automatic_payment_methods: { enabled: true },
  })

  return Response.json({ clientSecret: paymentIntent.client_secret })
}
