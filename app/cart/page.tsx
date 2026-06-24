'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Navbar }    from '@/components/layout/Navbar'
import { Footer }    from '@/components/layout/Footer'
import { useCart }   from '@/lib/cartStore'
import { useLang }   from '@/contexts/LanguageContext'
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react'

export default function CartPage() {
  const { t } = useLang()
  const { items, removeItem, updateQuantity, subtotal } = useCart()

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="pt-28 pb-20 min-h-screen bg-cream flex flex-col items-center justify-center gap-6">
          <ShoppingBag size={56} className="text-gold-pale" />
          <h2 className="font-playfair text-3xl font-bold text-brown">{t('cart_page_empty')}</h2>
          <p className="text-brown-light">{t('cart_page_empty_sub')}</p>
          <Link
            href="/shop"
            className="bg-gold text-cream px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-gold-light transition-colors"
          >
            {t('cart_browse')}
          </Link>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 min-h-screen bg-cream">
        <div className="max-w-5xl mx-auto px-6">

          <h1 className="font-playfair text-4xl font-bold text-brown mb-10">{t('cart_page_heading')}</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Items */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex gap-5 bg-white rounded-2xl p-5 shadow-sm items-center"
                >
                  {/* Image */}
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gold-pale">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-playfair font-bold text-brown truncate">{product.name}</h3>
                    <p className="text-gold font-semibold text-sm mt-0.5">
                      JD {product.price.toFixed(2)} {t('cart_each')}
                    </p>
                    {/* Qty controls */}
                    <div className="flex items-center gap-2 mt-3">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="w-7 h-7 rounded-full border border-gold-pale text-brown hover:bg-gold-pale transition-colors flex items-center justify-center text-sm"
                      >−</button>
                      <span className="w-6 text-center text-sm font-semibold text-brown">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="w-7 h-7 rounded-full border border-gold-pale text-brown hover:bg-gold-pale transition-colors flex items-center justify-center text-sm"
                      >+</button>
                    </div>
                  </div>

                  {/* Line total + remove */}
                  <div className="flex flex-col items-end gap-3 flex-shrink-0">
                    <span className="font-bold text-brown">
                      JD {(product.price * quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeItem(product.id)}
                      className="text-brown-light hover:text-red-500 transition-colors"
                      aria-label="Remove"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-white rounded-2xl p-6 shadow-sm h-fit flex flex-col gap-4">
              <h2 className="font-playfair text-xl font-bold text-brown">{t('cart_summary')}</h2>

              <div className="flex justify-between text-sm text-brown-light">
                <span>{t('cart_subtotal')}</span>
                <span className="font-semibold text-brown">JD {subtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-brown-light">
                <span>{t('cart_delivery')}</span>
                <span className="font-semibold text-brown">{t('cart_delivery_calc')}</span>
              </div>

              <div className="border-t border-gold-pale pt-4 flex justify-between font-bold text-brown">
                <span>{t('cart_total')}</span>
                <span className="text-gold text-lg">JD {subtotal().toFixed(2)}</span>
              </div>

              <Link
                href="/checkout"
                className="flex items-center justify-center gap-2 bg-gold text-cream py-3.5 rounded-full font-semibold text-sm hover:bg-gold-light transition-colors shadow-md shadow-gold/20 mt-2"
              >
                {t('cart_checkout')} <ArrowRight size={16} />
              </Link>

              <Link
                href="/shop"
                className="text-center text-sm text-brown-light hover:text-gold transition-colors"
              >
                {t('cart_continue')}
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
