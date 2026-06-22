import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle, Package } from 'lucide-react'

export const metadata = {
  title: "Order Confirmed — Yasmina's Bites",
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-6 py-20">
      {/* Logo */}
      <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gold-pale mb-8">
        <Image src="/images/logo.jpg" alt="Yasmina's Bites" fill className="object-cover" sizes="80px" />
      </div>

      {/* Success icon */}
      <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-6">
        <CheckCircle size={36} className="text-gold" />
      </div>

      {/* Heading */}
      <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-brown text-center mb-3">
        Order Confirmed!
      </h1>
      <p className="font-dancing text-2xl text-gold text-center mb-6">
        Little bites of happiness on their way
      </p>

      {/* Order details card */}
      <div className="bg-cream-dark border border-gold-pale rounded-2xl p-6 w-full max-w-md mb-8">
        <p className="text-sm text-brown-light mb-4 text-center">Thank you for your order</p>
        <div className="flex items-center justify-between py-3 border-b border-gold-pale/50">
          <span className="text-sm text-brown-light">Order number</span>
          <span className="text-sm font-bold text-brown font-mono">#YB-2024-1892</span>
        </div>
        <div className="flex items-center justify-between py-3 border-b border-gold-pale/50">
          <span className="text-sm text-brown-light">Estimated delivery</span>
          <span className="text-sm font-semibold text-brown">3–5 business days</span>
        </div>
        <div className="flex items-center justify-between py-3">
          <span className="text-sm text-brown-light">Payment</span>
          <span className="text-sm font-semibold text-gold">Confirmed</span>
        </div>
      </div>

      {/* Message */}
      <p className="text-brown-light text-center max-w-sm mb-8 text-sm leading-relaxed">
        We&apos;re already getting your order ready! You&apos;ll receive a confirmation email shortly with tracking information.
      </p>

      {/* Package icon strip */}
      <div className="flex items-center gap-3 text-brown-light text-sm mb-10">
        <Package size={18} className="text-gold" />
        <span>Freshly baked and carefully packaged with love</span>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
        <Link
          href="/shop"
          className="flex-1 text-center bg-gold text-cream py-3 rounded-full font-semibold text-sm hover:bg-gold-light transition-colors"
        >
          Order Again
        </Link>
        <Link
          href="/"
          className="flex-1 text-center border border-gold text-gold py-3 rounded-full font-semibold text-sm hover:bg-gold-pale transition-colors"
        >
          Back to Home
        </Link>
      </div>

      {/* Instagram share nudge */}
      <div className="mt-10 flex items-center gap-2 text-taupe text-xs">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5" aria-hidden>
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <circle cx="12" cy="12" r="4"/>
          <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
        </svg>
        <span>Tag us @yasminasbites to be featured</span>
      </div>
    </div>
  )
}
