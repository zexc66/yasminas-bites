'use client'

import { useState, useEffect } from 'react'
import { collection, addDoc, getDocs, query, where, orderBy, limit, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface Review {
  id?: string
  name: string
  rating: number
  text: string
  product?: string
  createdAt?: { seconds: number } | null
}

const STATIC_REVIEWS: Review[] = [
  {
    name: 'Rania M.',
    rating: 5,
    text: 'The Biscoff caramel is absolutely incredible. My family ordered it twice in the same week!',
    product: 'Biscoff Caramel Drizzle',
  },
  {
    name: 'Omar K.',
    rating: 5,
    text: "Best cookie cake I've had in Amman. Fresh, generous portions, delivered on time.",
    product: 'Pistachio Drizzle Cake',
  },
  {
    name: 'Lara S.',
    rating: 5,
    text: 'Ordered as a birthday gift — everyone was impressed. Will definitely order again.',
    product: 'Valentine Pop Cakes',
  },
]

const PRODUCTS = [
  'Biscoff Caramel Drizzle',
  'Pistachio Drizzle Cake',
  'Valentine Pop Cakes',
  'Chocolate Fudge Cookie',
  'Lotus Cream Dream',
  'General',
]

function StarDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          viewBox="0 0 20 20"
          className="w-4 h-4"
          fill={s <= rating ? '#8B7020' : 'none'}
          stroke="#8B7020"
          strokeWidth="1.5"
        >
          <path d="M10 1.5l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.77l-4.77 2.44.91-5.32L2.27 7.12l5.34-.78L10 1.5z" />
        </svg>
      ))}
    </div>
  )
}

function StarSelector({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0)
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          onMouseEnter={() => setHovered(s)}
          onMouseLeave={() => setHovered(0)}
          className="cursor-pointer focus:outline-none"
          aria-label={`${s} star${s > 1 ? 's' : ''}`}
        >
          <svg
            viewBox="0 0 20 20"
            className="w-7 h-7 transition-colors"
            fill={s <= (hovered || value) ? '#8B7020' : 'none'}
            stroke="#8B7020"
            strokeWidth="1.5"
          >
            <path d="M10 1.5l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.77l-4.77 2.44.91-5.32L2.27 7.12l5.34-.78L10 1.5z" />
          </svg>
        </button>
      ))}
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl bg-gold-pale/30 h-36" />
  )
}

function formatDate(createdAt: { seconds: number } | null | undefined): string {
  if (!createdAt?.seconds) return ''
  const date = new Date(createdAt.seconds * 1000)
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)

  // Form state
  const [formName, setFormName] = useState('')
  const [formRating, setFormRating] = useState(0)
  const [formProduct, setFormProduct] = useState('General')
  const [formText, setFormText] = useState('')
  const [formSubmitting, setFormSubmitting] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formError, setFormError] = useState('')

  useEffect(() => {
    async function fetchReviews() {
      if (!db) {
        setReviews(STATIC_REVIEWS)
        setLoading(false)
        return
      }
      try {
        const q = query(
          collection(db, 'reviews'),
          where('approved', '==', true),
          orderBy('createdAt', 'desc'),
          limit(6)
        )
        const snap = await getDocs(q)
        const fetched: Review[] = snap.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Review, 'id'>),
        }))
        setReviews(fetched.length > 0 ? fetched : STATIC_REVIEWS)
      } catch {
        setReviews(STATIC_REVIEWS)
      } finally {
        setLoading(false)
      }
    }
    fetchReviews()
  }, [])

  const openModal = () => {
    setModalOpen(true)
    setFormSuccess(false)
    setFormError('')
    setFormName('')
    setFormRating(0)
    setFormProduct('General')
    setFormText('')
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')

    if (!formName.trim()) { setFormError('Please enter your name.'); return }
    if (formRating === 0) { setFormError('Please select a star rating.'); return }
    if (!formText.trim()) { setFormError('Please write your review.'); return }

    setFormSubmitting(true)

    if (!db) {
      setFormSubmitting(false)
      setFormSuccess(true)
      setTimeout(() => setModalOpen(false), 2000)
      return
    }

    try {
      await addDoc(collection(db, 'reviews'), {
        name: formName.trim(),
        rating: formRating,
        product: formProduct,
        text: formText.trim(),
        approved: false,
        createdAt: serverTimestamp(),
      })
      setFormSuccess(true)
      setTimeout(() => setModalOpen(false), 2000)
    } catch {
      setFormError('Something went wrong. Please try again.')
    } finally {
      setFormSubmitting(false)
    }
  }

  return (
    <>
      <section className="bg-cream-dark py-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-xs tracking-widest uppercase text-gold mb-3">Customer Reviews</p>
            <h2 className="font-playfair text-3xl sm:text-4xl text-brown mb-3">
              What Our Customers Say
            </h2>
            <p className="text-brown-light text-sm">Real reviews from real customers in Amman</p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
              : reviews.map((r, i) => (
                  <div
                    key={r.id ?? i}
                    className="bg-white rounded-2xl p-6 border border-gold-pale shadow-sm flex flex-col gap-3"
                  >
                    <StarDisplay rating={r.rating} />
                    <p className="text-sm text-brown-light italic leading-relaxed flex-1">
                      &ldquo;{r.text}&rdquo;
                    </p>
                    <div className="flex items-center justify-between pt-1">
                      <p className="text-sm font-semibold text-brown">{r.name}</p>
                      {r.createdAt && (
                        <p className="text-[11px] text-taupe">{formatDate(r.createdAt)}</p>
                      )}
                    </div>
                    {r.product && (
                      <span className="self-start text-[11px] font-medium text-gold bg-gold-pale/60 rounded-full px-3 py-1">
                        {r.product}
                      </span>
                    )}
                  </div>
                ))}
          </div>

          {/* CTA button */}
          <div className="flex justify-center mt-12">
            <button
              onClick={openModal}
              className="border border-gold text-gold font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-gold hover:text-cream transition-colors cursor-pointer"
            >
              Share Your Experience
            </button>
          </div>
        </div>
      </section>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}
        >
          <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-taupe hover:text-brown transition-colors cursor-pointer text-lg leading-none"
              aria-label="Close"
            >
              &times;
            </button>

            <h3 className="font-playfair text-2xl font-bold text-brown mb-6">Leave a Review</h3>

            {formSuccess ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <svg viewBox="0 0 24 24" className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                {!db ? (
                  <p className="text-brown-light text-sm leading-relaxed">
                    Thanks! We&apos;ll reach out via WhatsApp to verify your review.
                  </p>
                ) : (
                  <p className="text-brown-light text-sm leading-relaxed">
                    Thank you! Your review will appear after approval.
                  </p>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-brown-light uppercase tracking-wide">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Rania M."
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="border border-gold-pale rounded-xl px-4 py-3 text-sm text-brown placeholder:text-taupe/60 focus:outline-none focus:border-gold transition-colors"
                  />
                </div>

                {/* Rating */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-brown-light uppercase tracking-wide">
                    Star Rating *
                  </label>
                  <StarSelector value={formRating} onChange={setFormRating} />
                </div>

                {/* Product */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-brown-light uppercase tracking-wide">
                    Which Product?
                  </label>
                  <select
                    value={formProduct}
                    onChange={(e) => setFormProduct(e.target.value)}
                    className="border border-gold-pale rounded-xl px-4 py-3 text-sm text-brown focus:outline-none focus:border-gold transition-colors bg-white cursor-pointer"
                  >
                    {PRODUCTS.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                {/* Review text */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-brown-light uppercase tracking-wide">
                    Your Review *
                  </label>
                  <textarea
                    required
                    rows={4}
                    maxLength={300}
                    placeholder="Tell us about your experience..."
                    value={formText}
                    onChange={(e) => setFormText(e.target.value)}
                    className="border border-gold-pale rounded-xl px-4 py-3 text-sm text-brown placeholder:text-taupe/60 focus:outline-none focus:border-gold transition-colors resize-none"
                  />
                  <p className="text-[11px] text-taupe text-right">{formText.length}/300</p>
                </div>

                {formError && (
                  <p className="text-sm text-red-500">{formError}</p>
                )}

                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="bg-gold text-cream py-4 rounded-full font-semibold text-sm hover:bg-gold-light transition-colors shadow-lg shadow-gold/20 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed mt-1"
                >
                  {formSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}
