'use client'

import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import { useCart } from '@/lib/cartStore'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export function PayPalButton() {
  const { items, clearCart } = useCart()
  const router               = useRouter()

  return (
    <PayPalScriptProvider
      options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!, currency: 'GBP' }}
    >
      <PayPalButtons
        style={{ layout: 'vertical', color: 'gold', shape: 'pill', label: 'pay' }}
        createOrder={async () => {
          // Amount computed server-side from canonical product prices
          const res = await fetch('/api/paypal/create-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              items: items.map((i) => ({ id: i.product.id, quantity: i.quantity })),
            }),
          })
          const data = await res.json()
          if (!res.ok) throw new Error(data.error)
          return data.id
        }}
        onApprove={async (data, actions) => {
          await actions.order!.capture()
          clearCart()
          toast.success('Order placed! Thank you 🍪')
          router.push('/checkout/success')
        }}
        onError={() => toast.error('PayPal payment failed. Please try again.')}
      />
    </PayPalScriptProvider>
  )
}
