﻿import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { getFeaturedProducts } from '@/lib/products'
import { StarRating } from '@/components/ui/StarRating'

export function FeaturedProducts() {
  const products = getFeaturedProducts()

  return (
    <section className="py-24 bg-cream-dark">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-gold-pale border border-gold-pale rounded-full px-4 py-1.5 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
            <span className="text-gold text-xs font-bold tracking-widest uppercase">
              Our Collection
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
          </div>
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-brown">
            Made to be shared
          </h2>
          <p className="mt-4 text-brown-light max-w-xl mx-auto leading-relaxed">
            Every cookie cake is baked fresh when you order — no shortcuts, no compromises.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group bg-cream rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-56 bg-gold-pale overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="font-playfair text-xl font-bold text-brown mb-1 group-hover:text-gold transition-colors">
                  {product.name}
                </h3>
                {product.rating && (
                  <div className="mb-3">
                    <StarRating rating={product.rating} count={product.reviewCount} />
                  </div>
                )}
                <p className="text-sm text-brown-light leading-relaxed line-clamp-2 mb-4">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gold text-lg">
                    JD {product.price.toFixed(2)}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-gold font-semibold group-hover:gap-2 transition-all">
                    View <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 border border-gold text-gold px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-gold hover:text-cream transition-colors"
          >
            View All Cookies <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
