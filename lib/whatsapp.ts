export const WHATSAPP_PHONE = '962789006574'

export function whatsappOrderUrl(productName?: string, quantity?: number): string {
  const base = `https://wa.me/${WHATSAPP_PHONE}`
  let text: string

  if (productName) {
    text = `Hi Yasmina! I'd like to order ${quantity && quantity > 1 ? `${quantity}x ` : ''}the ${productName}. Can you help me place my order? 🍪`
  } else {
    text = `Hi Yasmina! I'd like to place an order. Can you help me? 🍪`
  }

  return `${base}?text=${encodeURIComponent(text)}`
}
