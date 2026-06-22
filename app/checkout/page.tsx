'use client'

import { useState, useEffect } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { Navbar }       from '@/components/layout/Navbar'
import { Footer }       from '@/components/layout/Footer'
import { StripeForm }   from '@/components/checkout/StripeForm'
import { PayPalButton } from '@/components/checkout/PayPalButton'
import { stripePromise } from '@/lib/stripe'
import { useCart }      from '@/lib/cartStore'
import { whatsappOrderUrl } from '@/lib/whatsapp'
import {
  Truck, CreditCard, Banknote, CheckCircle2, Copy, ExternalLink,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import toast from 'react-hot-toast'

type Method = 'cod' | 'cliq' | 'card' | 'paypal'

const CLIQ_ALIAS = '0789006574'
const CLIQ_PHONE = '+962 7 8900 6574'

const METHODS: { id: Method; label: string; sub: string; icon: React.ReactNode }[] = [
  {
    id: 'cod',
    label: 'Cash on Delivery',
    sub: 'Pay when your order arrives',
    icon: <Banknote size={22} className="text-gold" />,
  },
  {
    id: 'cliq',
    label: 'CliQ',
    sub: 'Instant bank transfer · Jordan',
    icon: (
      <svg viewBox="0 0 40 40" className="w-[22px] h-[22px]" fill="none">
        <rect width="40" height="40" rx="8" fill="#00875A"/>
        <path d="M20 8 L32 20 L20 32 L8 20 Z" fill="white" opacity="0.9"/>
        <circle cx="20" cy="20" r="5" fill="#00875A"/>
      </svg>
    ),
  },
  {
    id: 'card',
    label: 'Credit / Debit Card',
    sub: 'Visa, Mastercard, Amex',
    icon: <CreditCard size={22} className="text-gold" />,
  },
  {
    id: 'paypal',
    label: 'PayPal',
    sub: 'Fast & secure checkout',
    icon: (
      <svg viewBox="0 0 24 24" className="w-[22px] h-[22px]" fill="#003087">
        <path d="M7.076 21.337H2.47a.641.641 0 01-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 00-.607-.541c-.013.076-.026.175-.041.254-.59 3.025-2.566 6.082-8.558 6.082H9.824l-1.164 7.366h3.248a.641.641 0 00.633-.546l.026-.139.502-3.18.032-.174a.641.641 0 01.633-.546h.399c2.58 0 4.597-.543 5.19-2.12.494-1.322.25-2.432-.202-3.456z"/>
      </svg>
    ),
  },
]

interface CodForm {
  name: string
  phone: string
  address: string
  notes: string
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()
  const [method, setMethod]       = useState<Method>('cod')
  const [clientSecret, setCS]     = useState<string | null>(null)
  const [codForm, setCodForm]     = useState<CodForm>({ name: '', phone: '', address: '', notes: '' })
  const [codDone, setCodDone]     = useState(false)
  const [savedTotal, setSavedTotal] = useState(0)
  const total = subtotal()

  useEffect(() => {
    if (method !== 'card' || total === 0) return
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: items.map((i) => ({ id: i.product.id, quantity: i.quantity })) }),
    })
      .then((r) => r.json())
      .then((d) => setCS(d.clientSecret))
  }, [method, total])

  const handleCodSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!codForm.name || !codForm.phone || !codForm.address) {
      toast.error('Please fill in all required fields')
      return
    }
    setSavedTotal(total)
    setCodDone(true)
    clearCart()
  }

  const copyAlias = () => {
    navigator.clipboard.writeText(CLIQ_ALIAS)
    toast.success('CliQ alias copied!')
  }

  if (items.length === 0 && !codDone) {
    return (
      <>
        <Navbar />
        <main className="pt-28 min-h-screen bg-cream flex items-center justify-center">
          <div className="text-center">
            <p className="text-brown-light mb-4">Your cart is empty.</p>
            <Link href="/shop" className="text-sm text-gold font-semibold hover:underline">Browse cookies</Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  // COD success screen
  if (codDone) {
    const waText = `Hi Yasmina! I just placed a Cash on Delivery order.\n\nName: ${codForm.name}\nPhone: ${codForm.phone}\nAddress: ${codForm.address}${codForm.notes ? `\nNotes: ${codForm.notes}` : ''}\nTotal: JD ${savedTotal.toFixed(2)}\n\nPlease confirm my order!`
    const waUrl = `https://wa.me/962789006574?text=${encodeURIComponent(waText)}`

    return (
      <>
        <Navbar />
        <main className="pt-28 pb-24 min-h-screen bg-cream flex items-center justify-center px-6">
          <div className="max-w-md w-full text-center flex flex-col items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 size={40} className="text-green-600" />
            </div>
            <h1 className="font-playfair text-3xl font-bold text-brown">Order Placed!</h1>
            <p className="text-brown-light leading-relaxed">
              Thank you, <strong className="text-brown">{codForm.name}</strong>! Your order of{' '}
              <strong className="text-brown">JD {savedTotal.toFixed(2)}</strong> is confirmed
              for Cash on Delivery to <em>{codForm.address}</em>.
              We&apos;ll contact you on <strong className="text-brown">{codForm.phone}</strong> to confirm.
            </p>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-full font-semibold text-sm shadow-lg hover:bg-[#20b858] transition-colors"
            >
              Confirm via WhatsApp
              <ExternalLink size={15} />
            </a>
            <Link href="/shop" className="text-sm text-gold hover:underline">Continue Shopping</Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-24 min-h-screen bg-cream">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="font-playfair text-4xl font-bold text-brown mb-10">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">

            {/* ── LEFT: Payment ── */}
            <div className="flex flex-col gap-8">

              {/* Method cards */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gold mb-4">Payment Method</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {METHODS.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setMethod(m.id)}
                      className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition-all cursor-pointer ${
                        method === m.id
                          ? 'border-gold bg-gold-pale/50 shadow-md shadow-gold/10'
                          : 'border-gold-pale/60 bg-white hover:border-gold/40 hover:bg-gold-pale/20'
                      }`}
                    >
                      {/* Radio dot */}
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                        method === m.id ? 'border-gold' : 'border-gold-pale'
                      }`}>
                        {method === m.id && (
                          <div className="w-2.5 h-2.5 rounded-full bg-gold" />
                        )}
                      </div>
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <span className="shrink-0">{m.icon}</span>
                        <div className="min-w-0">
                          <p className="font-semibold text-brown text-sm leading-tight">{m.label}</p>
                          <p className="text-[11px] text-brown-light mt-0.5 truncate">{m.sub}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* ── COD form ── */}
              {method === 'cod' && (
                <form onSubmit={handleCodSubmit} className="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-5">
                  <div className="flex items-center gap-3 pb-2 border-b border-gold-pale/60">
                    <Truck size={18} className="text-gold" />
                    <span className="font-semibold text-brown text-sm">Delivery Details</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-brown-light uppercase tracking-wide">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Yasmina Al-Ahmad"
                        value={codForm.name}
                        onChange={(e) => setCodForm({ ...codForm, name: e.target.value })}
                        className="border border-gold-pale rounded-xl px-4 py-3 text-sm text-brown placeholder:text-taupe/60 focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-brown-light uppercase tracking-wide">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+962 7X XXX XXXX"
                        value={codForm.phone}
                        onChange={(e) => setCodForm({ ...codForm, phone: e.target.value })}
                        className="border border-gold-pale rounded-xl px-4 py-3 text-sm text-brown placeholder:text-taupe/60 focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-brown-light uppercase tracking-wide">Delivery Address, Amman *</label>
                    <input
                      type="text"
                      required
                      placeholder="Area, Street, Building / Apartment number"
                      value={codForm.address}
                      onChange={(e) => setCodForm({ ...codForm, address: e.target.value })}
                      className="border border-gold-pale rounded-xl px-4 py-3 text-sm text-brown placeholder:text-taupe/60 focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-brown-light uppercase tracking-wide">Delivery Notes (optional)</label>
                    <textarea
                      rows={2}
                      placeholder="E.g. landmark, best time to deliver, gift message…"
                      value={codForm.notes}
                      onChange={(e) => setCodForm({ ...codForm, notes: e.target.value })}
                      className="border border-gold-pale rounded-xl px-4 py-3 text-sm text-brown placeholder:text-taupe/60 focus:outline-none focus:border-gold transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 bg-gold text-cream py-4 rounded-full font-semibold text-sm hover:bg-gold-light transition-colors shadow-lg shadow-gold/20 cursor-pointer mt-2"
                  >
                    <CheckCircle2 size={17} />
                    Place Order · JD {total.toFixed(2)}
                  </button>
                </form>
              )}

              {/* ── CliQ panel ── */}
              {method === 'cliq' && (
                <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-5">
                  <div className="flex items-center gap-3 pb-3 border-b border-gold-pale/60">
                    <div className="w-8 h-8 rounded-lg bg-[#00875A] flex items-center justify-center">
                      <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none">
                        <path d="M10 2 L18 10 L10 18 L2 10 Z" fill="white" opacity="0.9"/>
                        <circle cx="10" cy="10" r="3" fill="#00875A"/>
                      </svg>
                    </div>
                    <span className="font-semibold text-brown text-sm">Pay via CliQ</span>
                  </div>

                  <p className="text-sm text-brown-light leading-relaxed">
                    Send <strong className="text-brown font-bold">JD {total.toFixed(2)}</strong> to our CliQ account
                    using your bank&apos;s app (Arab Bank, Cairo Amman, Housing Bank, etc.)
                  </p>

                  {/* CliQ alias block */}
                  <div className="bg-gold-pale/50 rounded-xl p-4 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-brown-light mb-0.5">CliQ Phone Number</p>
                        <p className="font-playfair font-bold text-brown text-xl">{CLIQ_ALIAS}</p>
                      </div>
                      <button
                        onClick={copyAlias}
                        className="flex items-center gap-1.5 border border-gold/40 text-gold text-xs font-semibold px-3 py-2 rounded-lg hover:bg-gold-pale transition-colors cursor-pointer"
                      >
                        <Copy size={12} />
                        Copy
                      </button>
                    </div>
                    <div className="h-px bg-gold-pale" />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-brown-light mb-0.5">Or by Phone</p>
                      <p className="font-semibold text-brown">{CLIQ_PHONE}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 text-xs text-brown-light">
                    <p className="font-semibold text-brown text-sm">After payment:</p>
                    <p>1. Screenshot your payment confirmation</p>
                    <p>2. Send it to us on WhatsApp to confirm your order</p>
                  </div>

                  <a
                    href={`https://wa.me/962789006574?text=${encodeURIComponent(`Hi Yasmina! I just paid JD ${total.toFixed(2)} via CliQ. Here's my payment confirmation: [attach screenshot]`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 rounded-full font-semibold text-sm hover:bg-[#20b858] transition-colors shadow-md mt-1"
                  >
                    Send Payment Screenshot on WhatsApp
                    <ExternalLink size={14} />
                  </a>
                </div>
              )}

              {/* ── Stripe ── */}
              {method === 'card' && (
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  {clientSecret ? (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                      <StripeForm />
                    </Elements>
                  ) : (
                    <div className="flex items-center justify-center py-10">
                      <div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </div>
              )}

              {/* ── PayPal ── */}
              {method === 'paypal' && (
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <PayPalButton />
                </div>
              )}
            </div>

            {/* ── RIGHT: Summary ── */}
            <div className="h-fit sticky top-28">
              <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4">
                <h2 className="font-playfair text-xl font-bold text-brown">Order Summary</h2>

                <div className="flex flex-col gap-3">
                  {items.map(({ product, quantity }) => (
                    <div key={product.id} className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-cream-dark shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-brown truncate">{product.name}</p>
                        <p className="text-xs text-brown-light">Qty {quantity}</p>
                      </div>
                      <p className="text-sm font-bold text-brown shrink-0">
                        JD {(product.price * quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gold-pale/60 pt-3 flex flex-col gap-2">
                  <div className="flex justify-between text-sm text-brown-light">
                    <span>Subtotal</span>
                    <span className="font-semibold text-brown">JD {total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-brown-light">
                    <span>Delivery</span>
                    <span className="font-semibold text-green-600">
                      {total >= 20 ? 'Free' : 'Calculated'}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gold-pale pt-3 flex justify-between items-center">
                  <span className="font-bold text-brown">Total</span>
                  <span className="font-playfair font-bold text-gold text-2xl">JD {total.toFixed(2)}</span>
                </div>

                {total < 20 && (
                  <p className="text-[11px] text-brown-light bg-gold-pale/40 rounded-xl px-3 py-2 text-center">
                    Add JD {(20 - total).toFixed(2)} more for free delivery
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
