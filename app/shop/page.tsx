'use client'

import { useState } from 'react'
import { Navbar }       from '@/components/layout/Navbar'
import { Footer }       from '@/components/layout/Footer'
import { ProductCard }  from '@/components/shop/ProductCard'
import { products }     from '@/lib/products'
import { useLang }      from '@/contexts/LanguageContext'

export default function ShopPage() {
  const { t } = useLang()

  const occasions = [
    { id: 'All',          label: t('occ_all') },
    { id: 'Birthday',     label: t('occ_birthday') },
    { id: "Valentine's",  label: t('occ_valentine') },
    { id: 'Eid',          label: t('occ_eid') },
    { id: 'Corporate',    label: t('occ_corporate') },
    { id: 'Just Because', label: t('occ_just') },
  ] as const

  const [activeFilter, setActiveFilter] = useState('All')

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 min-h-screen bg-cream">
        <div className="max-w-7xl mx-auto px-6">

          {/* Header */}
          <div className="text-center py-14">
            <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-3">
              {t('shop_fresh_label')}
            </p>
            <h1 className="font-playfair text-5xl font-bold text-brown">
              {t('shop_heading')}
            </h1>
            <p className="mt-4 text-brown-light max-w-xl mx-auto leading-relaxed">
              {t('shop_pick')}
            </p>
          </div>

          {/* Occasion Filter Bar */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-10 justify-start md:justify-center scrollbar-hide">
            {occasions.map((occasion) => {
              const isActive = activeFilter === occasion.id
              return (
                <button
                  key={occasion.id}
                  onClick={() => setActiveFilter(occasion.id)}
                  className={[
                    'flex-shrink-0 cursor-pointer px-5 py-2 rounded-full font-inter text-sm font-semibold transition-all duration-200 whitespace-nowrap',
                    isActive
                      ? 'bg-gold text-cream shadow-sm'
                      : 'bg-cream-dark text-brown border border-gold-pale/60 hover:border-gold',
                  ].join(' ')}
                >
                  {occasion.label}
                </button>
              )
            })}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
