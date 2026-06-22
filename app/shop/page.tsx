'use client'

import { useState } from 'react'
import { Navbar }       from '@/components/layout/Navbar'
import { Footer }       from '@/components/layout/Footer'
import { ProductCard }  from '@/components/shop/ProductCard'
import { products }     from '@/lib/products'

const occasions = ['All', 'Birthday', "Valentine's", 'Eid', 'Corporate', 'Just Because'] as const
type Occasion = typeof occasions[number]

export default function ShopPage() {
  const [activeFilter, setActiveFilter] = useState<Occasion>('All')

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 min-h-screen bg-cream">
        <div className="max-w-7xl mx-auto px-6">

          {/* Header */}
          <div className="text-center py-14">
            <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-3">
              Fresh to Order
            </p>
            <h1 className="font-playfair text-5xl font-bold text-brown">
              Our Cookie Cakes
            </h1>
            <p className="mt-4 text-brown-light max-w-xl mx-auto leading-relaxed">
              Every cake is baked the day you order it. Pick your favourite,
              and we&apos;ll do the rest.
            </p>
          </div>

          {/* Occasion Filter Bar */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-10 justify-start md:justify-center scrollbar-hide">
            {occasions.map((occasion) => {
              const isActive = activeFilter === occasion
              return (
                <button
                  key={occasion}
                  onClick={() => setActiveFilter(occasion)}
                  className={[
                    'flex-shrink-0 cursor-pointer px-5 py-2 rounded-full font-inter text-sm font-semibold transition-all duration-200 whitespace-nowrap',
                    isActive
                      ? 'bg-gold text-cream shadow-sm'
                      : 'bg-cream-dark text-brown border border-gold-pale/60 hover:border-gold',
                  ].join(' ')}
                >
                  {occasion}
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
