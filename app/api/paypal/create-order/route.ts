import { getProduct } from '@/lib/products'

export async function POST(request: Request) {
  const { items } = await request.json() as { items: Array<{ id: string; quantity: number }> }

  if (!Array.isArray(items) || items.length === 0) {
    return Response.json({ error: 'Cart is empty' }, { status: 400 })
  }

  // Compute total server-side — never trust client-supplied amount
  let total = 0
  for (const { id, quantity } of items) {
    const product = getProduct(id)
    if (!product) return Response.json({ error: `Unknown product: ${id}` }, { status: 400 })
    total += product.price * quantity
  }

  const accessToken = await getPayPalAccessToken()

  const res = await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [{ amount: { currency_code: 'GBP', value: total.toFixed(2) } }],
    }),
  })

  const order = await res.json()
  return Response.json({ id: order.id })
}

async function getPayPalAccessToken(): Promise<string> {
  const res = await fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(
        `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
      ).toString('base64')}`,
    },
    body: 'grant_type=client_credentials',
  })
  const data = await res.json()
  return data.access_token
}
