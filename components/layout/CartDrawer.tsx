﻿'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/lib/cartStore'

export function CartDrawer() {
  const { isCartOpen, closeCart, items, removeItem, updateQuantity, subtotal } = useCart()
  const count = items.reduce((s, i) => s + i.quantity, 0)

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Dark overlay */}
          <motion.div
            key="overlay"
            className="fixed inset-0 bg-black/40 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />

          {/* Drawer panel */}
          <motion.div
            key="drawer"
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-cream z-50 flex flex-col shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gold-pale">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-gold" />
                <h2 className="font-playfair text-xl font-bold text-brown">Your Bag</h2>
                {count > 0 && (
                  <span className="text-sm text-brown-light">({count} items)</span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="text-brown-light hover:text-brown transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <X size={22} />
              </button>
            </div>

            {/* Items list */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                /* Empty state */
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <ShoppingBag size={48} className="text-gold-pale" />
                  <div>
                    <p className="font-medium text-brown">Your bag is empty</p>
                    <p className="text-sm text-brown-light mt-1">
                      Add some delicious cookie cakes!
                    </p>
                  </div>
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="mt-2 px-6 py-2.5 bg-gold text-cream rounded-full text-sm font-medium hover:bg-gold/90 transition-colors"
                  >
                    Shop Now
                  </Link>
                </div>
              ) : (
                <ul>
                  {items.map(({ product, quantity }) => (
                    <li
                      key={product.id}
                      className="flex items-center gap-4 py-4 border-b border-gold-pale/40 last:border-0"
                    >
                      {/* Product image */}
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>

                      {/* Info + controls */}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-brown text-sm truncate">{product.name}</p>
                        <p className="text-xs text-brown-light mt-0.5">
                          JD {product.price.toFixed(2)} each
                        </p>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center rounded-full border border-gold-pale text-brown-light hover:text-brown hover:border-gold transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-sm font-medium text-brown w-4 text-center">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center rounded-full border border-gold-pale text-brown-light hover:text-brown hover:border-gold transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>

                      {/* Line total + remove */}
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <p className="text-sm font-semibold text-brown">
                          JD {(product.price * quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => removeItem(product.id)}
                          className="text-taupe hover:text-brown transition-colors cursor-pointer"
                          aria-label={`Remove ${product.name}`}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer — always visible */}
            {items.length > 0 && (
              <div className="border-t border-gold-pale bg-cream px-6 py-5">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-brown">Subtotal</span>
                  <span className="text-base font-bold text-gold">
                    JD {subtotal().toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-brown-light mb-4">
                  Shipping calculated at checkout
                </p>

                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="block w-full bg-gold text-cream text-center rounded-full py-3.5 font-medium hover:bg-gold/90 transition-colors"
                >
                  Checkout
                </Link>

                <button
                  onClick={closeCart}
                  className="w-full border border-gold text-gold rounded-full py-3 mt-2 text-sm font-medium hover:bg-gold/5 transition-colors cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
