'use client'

import { useEffect, useRef } from 'react'
import { motion, useAnimationControls } from 'framer-motion'

const ITEMS = [
  'Freshly Baked',
  'Little Bites of Happiness',
  'Pistachio',
  'Biscoff Caramel',
  'Made with Love',
  'Amman, Jordan',
  'Cookie Cakes',
  'Handcrafted',
  'Pistachio Molten',
  'Gift Wrapped',
]

function Dot() {
  return <span className="mx-4 w-1.5 h-1.5 rounded-full bg-gold inline-block align-middle opacity-60" />
}

export function MarqueeStrip({ dark = false }: { dark?: boolean }) {
  const track = [...ITEMS, ...ITEMS, ...ITEMS]

  return (
    <div
      className={`relative overflow-hidden py-4 border-y ${
        dark
          ? 'bg-choco border-gold/20'
          : 'bg-cream-dark border-gold-pale/60'
      }`}
      aria-hidden
    >
      {/* Fade edges */}
      <div className={`absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none ${dark ? 'bg-gradient-to-r from-choco' : 'bg-gradient-to-r from-cream-dark'}`} />
      <div className={`absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none ${dark ? 'bg-gradient-to-l from-choco' : 'bg-gradient-to-l from-cream-dark'}`} />

      <motion.div
        className="flex whitespace-nowrap w-max"
        animate={{ x: ['0%', '-33.333%'] }}
        transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
      >
        {track.map((item, i) => (
          <span key={i} className={`inline-flex items-center text-sm font-medium tracking-widest uppercase ${dark ? 'text-gold' : 'text-brown-light'}`}>
            {item}
            <Dot />
          </span>
        ))}
      </motion.div>
    </div>
  )
}
