﻿import { Truck, ChefHat, Heart } from 'lucide-react'

export function TrustBar() {
  const items = [
    { icon: <Truck size={13} />, text: 'Free delivery on orders over JD 20' },
    { icon: <ChefHat size={13} />, text: 'Baked fresh to order' },
    { icon: <Heart size={13} />, text: '500+ happy customers' },
  ]

  return (
    <div className="bg-cream-dark border-y border-gold-pale/60 py-3 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Mobile: vertical stack */}
        <div className="flex flex-col items-center gap-1.5 sm:hidden">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-1.5 text-xs font-medium text-brown-light">
              <span className="text-brown-light">{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>

        {/* Desktop: centered row with bullet separators */}
        <div className="hidden sm:flex items-center justify-center gap-0">
          {items.map((item, i) => (
            <div key={i} className="flex items-center">
              <div className="flex items-center gap-1.5 text-xs font-medium text-brown-light px-4">
                <span className="text-brown-light">{item.icon}</span>
                <span>{item.text}</span>
              </div>
              {i < items.length - 1 && (
                <span className="text-gold-pale/60 select-none">&bull;</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
