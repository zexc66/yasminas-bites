'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'

export function EmailCapture() {
  const [email, setEmail] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!email.trim()) return
    toast.success("You're in! Check your inbox for your discount code. 🎉")
    setEmail('')
  }

  return (
    <section className="bg-gold text-cream py-20 px-6">
      <div className="max-w-2xl mx-auto text-center">
        {/* Label */}
        <p className="text-xs tracking-widest uppercase text-gold-pale/80 mb-4">
          Join the family
        </p>

        {/* Heading */}
        <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-cream mb-4">
          Get 10% off your first order
        </h2>

        {/* Subtext */}
        <p className="text-cream/80 text-sm sm:text-base leading-relaxed mb-8">
          Be the first to hear about new flavours, seasonal specials, and exclusive offers.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mt-8"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
            className="flex-1 px-5 py-3 rounded-full bg-cream/20 text-cream placeholder-cream/50 border border-cream/30 focus:outline-none focus:border-cream transition-colors"
          />
          <button
            type="submit"
            className="px-7 py-3 rounded-full bg-cream text-gold font-semibold hover:bg-cream-dark transition-colors cursor-pointer whitespace-nowrap"
          >
            Claim my 10%
          </button>
        </form>
      </div>
    </section>
  )
}
