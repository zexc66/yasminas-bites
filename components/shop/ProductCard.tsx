﻿'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag } from 'lucide-react'
import { motion } from 'framer-motion'
import { useCart } from '@/lib/cartStore'
import { Product } from '@/types'
import { StarRating } from '@/components/ui/StarRating'
import toast from 'react-hot-toast'

const BADGE_MAP: Record<string, { label: string; className: string }> = {
  'classic-choc-chip': {
    label: 'Most Popular',
    className: 'bg-gold text-cream',
  },
  'biscoff-caramel': {
    label: 'Most Popular',
    className: 'bg-gold text-cream',
  },
  'pistachio-delight': {
    label: 'New Flavour',
    className: 'bg-brown text-cream',
  },
}

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCart((s) => s.addItem)
  const badge = BADGE_MAP[product.id]

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(product)
    toast.success(`${product.name} added to cart`)
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Link
        href={`/products/${product.id}`}
        className="group block bg-cream rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow cursor-pointer"
      >
        {/* Image */}
        <div className="relative h-60 bg-gold-pale overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          {badge && (
            <span
              className={`absolute top-3 left-3 ${badge.className} text-[10px] font-bold px-2.5 py-1 rounded-full`}
            >
              {badge.label}
            </span>
          )}
        </div>

        {/* Body */}
        <div className="p-5">
          <h3 className="font-playfair text-lg font-bold text-brown mb-1 group-hover:text-gold transition-colors">
            {product.name}
          </h3>
          {product.rating && (
            <div className="mb-2">
              <StarRating rating={product.rating} count={product.reviewCount} />
            </div>
          )}
          <p className="text-sm text-brown-light line-clamp-2 leading-relaxed mb-4">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="font-bold text-gold text-lg">JD {product.price.toFixed(2)}</span>
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 bg-gold text-cream text-xs font-semibold px-4 py-2 rounded-full hover:bg-gold-light transition-colors"
            >
              <ShoppingBag size={13} /> Add
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
