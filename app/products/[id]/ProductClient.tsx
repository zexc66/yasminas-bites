'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, Star, MessageCircle } from 'lucide-react'
import { useCart } from '@/lib/cartStore'
import { Product } from '@/types'
import { products, getProductName, getProductDescription } from '@/lib/products'
import { useLang } from '@/contexts/LanguageContext'
import toast from 'react-hot-toast'
import { whatsappOrderUrl } from '@/lib/whatsapp'
import { collection, query, where, orderBy, limit, getDocs, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface FirestoreReview {
  id: string
  productId: string
  name: string
  rating: number
  text: string
  approved: boolean
  createdAt: Timestamp
}

export function ProductClient({ product }: { product: Product }) {
  const { t, lang } = useLang()
  const addItem = useCart((s) => s.addItem)
  const [qty, setQty] = useState(1)
  const [reviews, setReviews] = useState<FirestoreReview[]>([])
  const [reviewsLoading, setReviewsLoading] = useState(true)

  useEffect(() => {
    if (!db) {
      setReviewsLoading(false)
      return
    }
    const q = query(
      collection(db, 'reviews'),
      where('productId', '==', product.id),
      where('approved', '==', true),
      orderBy('createdAt', 'desc'),
      limit(6)
    )
    getDocs(q)
      .then((snap) => {
        setReviews(snap.docs.map((d) => ({ id: d.id, ...d.data() } as FirestoreReview)))
      })
      .catch(() => {})
      .finally(() => setReviewsLoading(false))
  }, [product.id])

  const name = getProductName(product, lang)
  const description = getProductDescription(product, lang)

  const handleAdd = () => {
    addItem(product, qty)
    toast.success(`${name} added to cart`)
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
              alt={name}
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
                {name}
              </h1>
              <p className="text-3xl font-bold text-gold">JD {product.price.toFixed(2)}</p>
            </div>

            <p className="text-brown-light leading-relaxed">{description}</p>

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
              href={whatsappOrderUrl(name, qty)}
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

          {reviewsLoading ? (
            /* Skeleton */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[0, 1, 2].map((i) => (
                <div key={i} className="bg-cream-dark rounded-2xl p-5 animate-pulse">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-full bg-gold-pale/60 shrink-0" />
                    <div className="flex flex-col gap-1.5">
                      <div className="h-3 w-24 bg-gold-pale/60 rounded" />
                      <div className="h-2.5 w-16 bg-gold-pale/40 rounded" />
                    </div>
                  </div>
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, j) => (
                      <div key={j} className="w-3 h-3 rounded-full bg-gold-pale/60" />
                    ))}
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-2.5 bg-gold-pale/40 rounded w-full" />
                    <div className="h-2.5 bg-gold-pale/40 rounded w-4/5" />
                    <div className="h-2.5 bg-gold-pale/40 rounded w-3/5" />
                  </div>
                </div>
              ))}
            </div>
          ) : reviews.length === 0 ? (
            /* Empty state */
            <div className="flex flex-col items-center py-12 text-center gap-3">
              <Star size={32} className="text-gold-pale" />
              <p className="text-brown-light text-sm">{t('rev_be_first')}</p>
            </div>
          ) : (
            /* Real reviews */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <div key={review.id} className="bg-cream-dark rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-full bg-gold-pale flex items-center justify-center text-gold font-bold text-sm shrink-0">
                      {review.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-brown">{review.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={13}
                        className={i < review.rating ? 'fill-gold text-gold' : 'fill-gold-pale text-gold-pale'}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-brown-light leading-relaxed">{review.text}</p>
                </div>
              ))}
            </div>
          )}
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
                    alt={getProductName(p, lang)}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 33vw, 25vw"
                  />
                </div>
                <p className="font-playfair text-base font-semibold text-brown leading-tight mb-1">
                  {getProductName(p, lang)}
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
          <p className="text-xs text-brown-light font-medium truncate">{name}</p>
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
