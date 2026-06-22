'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const giftProducts = [
  { id: 'biscoff-caramel', name: 'Biscoff Caramel Drizzle', price: 22, image: '/images/cookie-biscoff.jpg' },
  { id: 'pistachio-delight', name: 'Pistachio Drizzle Cake', price: 24, image: '/images/cookie-pistachio.jpg' },
  { id: 'pistachio-molten', name: 'Pistachio Molten Cookie', price: 14, image: '/images/cookie-molten-pistachio.png' },
  { id: 'pop-cake', name: 'Valentine Pop Cakes', price: 16, image: '/images/cookie-pop-cake.png' },
]

export default function GiftPage() {
  const [selectedProduct, setSelectedProduct] = useState<typeof giftProducts[0] | null>(null)
  const [recipient, setRecipient] = useState('')
  const [message, setMessage] = useState('')
  const [sender, setSender] = useState('')
  const [phone, setPhone] = useState('')

  const buildWhatsAppMessage = () => {
    if (!selectedProduct) return ''
    const lines = [
      `Hi Yasmina! I'd like to send a gift.`,
      ``,
      `Gift: ${selectedProduct.name} (JD ${selectedProduct.price})`,
      `To: ${recipient}`,
      `Message: ${message}`,
      `From: ${sender}`,
      phone ? `Phone: ${phone}` : `Phone: —`,
      ``,
      `Please help me arrange this!`,
    ]
    return encodeURIComponent(lines.join('\n'))
  }

  const canSend = selectedProduct && recipient.trim() && sender.trim()

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 min-h-screen bg-cream">
        <div className="max-w-3xl mx-auto px-6">

          {/* Header */}
          <div className="text-center py-12">
            <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-3">
              Send Love
            </p>
            <h1 className="font-playfair text-5xl font-bold text-brown">
              Gift a Treat
            </h1>
            <p className="mt-4 text-brown-light max-w-xl mx-auto leading-relaxed">
              Choose a treat, add a personal touch, and we&apos;ll help you deliver happiness — straight from our kitchen.
            </p>
          </div>

          {/* Section 1 — Pick a Treat */}
          <section className="mb-14">
            <h2 className="font-playfair text-2xl font-semibold text-brown mb-6">
              1. Pick a Treat
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {giftProducts.map((product) => {
                const isSelected = selectedProduct?.id === product.id
                return (
                  <button
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    className={[
                      'rounded-2xl overflow-hidden text-left transition-all duration-200 cursor-pointer',
                      isSelected
                        ? 'ring-2 ring-gold bg-gold-pale shadow-md'
                        : 'bg-cream-dark hover:ring-1 hover:ring-gold-pale ring-1 ring-transparent',
                    ].join(' ')}
                  >
                    <div className="relative aspect-square w-full">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 50vw, 25vw"
                      />
                    </div>
                    <div className="p-3">
                      <p className="font-inter text-sm font-semibold text-brown leading-snug">
                        {product.name}
                      </p>
                      <p className="font-inter text-sm text-gold font-semibold mt-1">
                        JD {product.price}
                      </p>
                      <span
                        className={[
                          'mt-2 inline-block text-xs font-semibold px-2.5 py-1 rounded-full transition-colors',
                          isSelected
                            ? 'bg-gold text-cream'
                            : 'bg-cream text-brown-light border border-gold-pale',
                        ].join(' ')}
                      >
                        {isSelected ? 'Selected' : 'Select'}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </section>

          {/* Section 2 — Personalise It */}
          <section className="mb-14">
            <h2 className="font-playfair text-2xl font-semibold text-brown mb-6">
              2. Personalise It
            </h2>
            <div className="space-y-5">
              <div>
                <label className="block font-inter text-sm font-semibold text-brown mb-1.5">
                  Who is this for? <span className="text-gold">*</span>
                </label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="Recipient's name"
                  className="w-full rounded-xl border border-gold-pale bg-cream-dark px-4 py-3 font-inter text-sm text-brown placeholder-taupe focus:outline-none focus:ring-2 focus:ring-gold transition"
                />
              </div>
              <div>
                <label className="block font-inter text-sm font-semibold text-brown mb-1.5">
                  Write a message <span className="text-taupe text-xs font-normal">(printed on card)</span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Happy birthday! You deserve the sweetest things..."
                  rows={4}
                  className="w-full rounded-xl border border-gold-pale bg-cream-dark px-4 py-3 font-inter text-sm text-brown placeholder-taupe focus:outline-none focus:ring-2 focus:ring-gold transition resize-none"
                />
              </div>
              <div>
                <label className="block font-inter text-sm font-semibold text-brown mb-1.5">
                  From <span className="text-gold">*</span>
                </label>
                <input
                  type="text"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-xl border border-gold-pale bg-cream-dark px-4 py-3 font-inter text-sm text-brown placeholder-taupe focus:outline-none focus:ring-2 focus:ring-gold transition"
                />
              </div>
              <div>
                <label className="block font-inter text-sm font-semibold text-brown mb-1.5">
                  Recipient&apos;s phone{' '}
                  <span className="text-taupe text-xs font-normal">(for delivery, optional)</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+962 7x xxx xxxx"
                  className="w-full rounded-xl border border-gold-pale bg-cream-dark px-4 py-3 font-inter text-sm text-brown placeholder-taupe focus:outline-none focus:ring-2 focus:ring-gold transition"
                />
              </div>
            </div>
          </section>

          {/* Section 3 — Send the Gift */}
          <section>
            <h2 className="font-playfair text-2xl font-semibold text-brown mb-6">
              3. Send the Gift
            </h2>

            {/* Summary box */}
            <div className="rounded-2xl border border-gold-pale bg-cream-dark p-6 mb-6 space-y-3">
              <h3 className="font-playfair text-lg font-semibold text-brown mb-4">Order Summary</h3>
              <div className="flex justify-between font-inter text-sm">
                <span className="text-taupe">Treat</span>
                <span className="text-brown font-medium">
                  {selectedProduct ? `${selectedProduct.name} — JD ${selectedProduct.price}` : '—'}
                </span>
              </div>
              <div className="flex justify-between font-inter text-sm">
                <span className="text-taupe">To</span>
                <span className="text-brown font-medium">{recipient || '—'}</span>
              </div>
              <div className="flex justify-between font-inter text-sm">
                <span className="text-taupe">Message</span>
                <span className="text-brown font-medium text-right max-w-[60%] truncate">
                  {message || '—'}
                </span>
              </div>
              <div className="flex justify-between font-inter text-sm">
                <span className="text-taupe">From</span>
                <span className="text-brown font-medium">{sender || '—'}</span>
              </div>
              {phone && (
                <div className="flex justify-between font-inter text-sm">
                  <span className="text-taupe">Phone</span>
                  <span className="text-brown font-medium">{phone}</span>
                </div>
              )}
            </div>

            {/* WhatsApp CTA */}
            <a
              href={
                canSend
                  ? `https://wa.me/962789006574?text=${buildWhatsAppMessage()}`
                  : undefined
              }
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!canSend}
              className={[
                'flex items-center justify-center gap-3 w-full rounded-full py-4 font-inter font-semibold text-base transition-all duration-200',
                canSend
                  ? 'bg-gold text-cream hover:bg-gold-light cursor-pointer shadow-md hover:shadow-lg'
                  : 'bg-taupe/40 text-taupe cursor-not-allowed pointer-events-none',
              ].join(' ')}
              onClick={(e) => { if (!canSend) e.preventDefault() }}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Send Gift Order via WhatsApp
            </a>

            {!canSend && (
              <p className="text-center font-inter text-xs text-taupe mt-3">
                Please select a treat, a recipient name, and your name to continue.
              </p>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
