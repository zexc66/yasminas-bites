'use client'

import { useState, FormEvent } from 'react'
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import { useCart } from '@/lib/cartStore'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export function StripeForm() {
  const stripe   = useStripe()
  const elements = useElements()
  const router   = useRouter()
  const clearCart = useCart((s) => s.clearCart)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setLoading(true)
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/checkout/success` },
      redirect: 'if_required',
    })

    if (error) {
      toast.error(error.message ?? 'Payment failed')
      setLoading(false)
      return
    }

    clearCart()
    toast.success('Order placed! Thank you 🍪')
    router.push('/checkout/success')
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="bg-gold text-cream py-3.5 rounded-full font-semibold text-sm hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-gold/20"
      >
        {loading ? 'Processing…' : 'Pay with Card'}
      </button>
    </form>
  )
}
