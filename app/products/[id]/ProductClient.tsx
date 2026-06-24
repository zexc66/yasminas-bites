'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, Star, MessageCircle } from 'lucide-react'
import { useCart } from '@/lib/cartStore'
import { Product } from '@/types'
import { products } from '@/lib/products'
import { useLang } from '@/contexts/LanguageContext'
import toast from 'react-hot-toast'
import { whatsappOrderUrl } from '@/lib/whatsapp'

const mockReviews = [
  {
    initials: 'EL',
    name: 'Emma L.',
    date: 'June 2025',
    text: "Absolutely perfect for my sister's birthday. Everyone was asking where I ordered from. Will definitely be back!",
  },
  {
    initials: 'MW',
    name: 'Marcus W.',
    date: 'May 2025',
    text: 'The packaging is beautiful and the taste is incredible. Arrived perfectly fresh. 10/10 recommend.',
  },
  {
    initials: 'AR',
    name: 'Aisha R.',
    date: 'April 2025',
    text: "I've ordered 3 times now and it never disappoints. The quality and freshness is unmatched.",
  },
]

export function ProductClient({ product }: { product: Product }) {
  const { t } = useLang()
  const addItem = useCart((s) => s.addItem)
  const [qty, setQty] = useState(1)

  const handleAdd = () => {
    addItem(product, qty)
    toast.success(`${product.name} added to cart`)
  }

  const related = products.filter((p) => p.id !== product.id).slice(0, 3)

  return (
    <>
      {/* Main wrapper with bottom padding for mobile sticky bar */}
      <div className="pb-20 lg:pb-0">

        {/* Hero grid: photo + info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative w-full aspect-square max-w-lg mx-auto lg:mx-0 rounded-3xl overflow-hidden shadow-2xl shadow-brown/15 bg-cream-dark"
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </motion.div>

          {/* Product info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            {/* Stars */}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="fill-gold text-gold" />
              ))}
              <span className="text-sm text-brown-light ml-2">{t('pd_fresh')}</span>
            </div>

            <div>
              <h1 className="font-playfair text-4xl font-bold text-brown mb-2">
                {product.name}
              </h1>
              <p className="text-3xl font-bold text-gold">JD {product.price.toFixed(2)}</p>
            </div>

            <p className="text-brown-light leading-relaxed">{product.description}</p>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-brown">{t('pd_quantity')}</span>
              <div className="flex items-center border border-gold-pale rounded-full overflow-hidden">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-brown hover:bg-gold-pale transition-colors"
                >
                  −
                </button>
                <span className="w-10 text-center text-brown font-semibold">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-10 h-10 flex items-center justify-center text-brown hover:bg-gold-pale transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to cart — desktop only */}
            <button
              onClick={handleAdd}
              className="flex items-center justify-center gap-3 bg-gold text-cream py-4 rounded-full font-semibold hover:bg-gold-light transition-colors shadow-lg shadow-gold/20 text-sm cursor-pointer"
            >
              <ShoppingBag size={18} />
              {t('add_to_cart')} · JD {(product.price * qty).toFixed(2)}
            </button>

            {/* WhatsApp order button */}
            <a
              href={whatsappOrderUrl(product.name, qty)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-[#25D366] text-white py-4 rounded-full font-semibold hover:bg-[#20b858] transition-colors shadow-md text-sm cursor-pointer"
            >
              <MessageCircle size={18} />
              {t('order_wa')}
            </a>

            {/* Badges */}
            <div className="flex flex-wrap gap-3 pt-2">
              {([t('pd_badge1'), t('pd_badge2'), t('pd_badge3')] as string[]).map((b) => (
                <span
                  key={b}
                  className="text-xs bg-gold-pale text-brown px-3 py-1.5 rounded-full font-medium"
                >
                  {b}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Reviews section */}
        <section className="mt-20">
          <h2 className="font-playfair text-2xl text-brown mb-8">{t('testimonials_label')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockReviews.map((review) => (
              <div key={review.name} className="bg-cream-dark rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-gold-pale flex items-center justify-center text-gold font-bold text-sm shrink-0">
                    {review.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-brown">{review.name}</p>
                    <p className="text-xs text-brown-light">{review.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} className="fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-sm text-brown-light leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related products */}
        <section className="mt-20">
          <h2 className="font-playfair text-2xl text-brown mb-8">{t('pd_related')}</h2>
          <div className="grid grid-cols-3 gap-4 sm:gap-6">
            {related.map((p) => (
              <Link key={p.id} href={`/products/${p.id}`} className="group">
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-cream-dark mb-3">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 33vw, 25vw"
                  />
                </div>
                <p className="font-playfair text-base font-semibold text-brown leading-tight mb-1">
                  {p.name}
                </p>
                <p className="text-gold font-bold text-sm">JD {p.price.toFixed(2)}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Mobile sticky CTA — hidden on desktop */}
      <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-cream border-t border-gold-pale px-4 py-3 flex items-center gap-3">
        <div className="flex-1">
          <p className="text-xs text-brown-light font-medium truncate">{product.name}</p>
          <p className="text-base font-bold text-gold">JD {(product.price * qty).toFixed(2)}</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-gold text-cream px-6 py-3 rounded-full font-semibold text-sm hover:bg-gold-light transition-colors cursor-pointer"
        >
          <ShoppingBag size={16} />
          {t('pd_add_bag')}
        </button>
      </div>
    </>
  )
}
