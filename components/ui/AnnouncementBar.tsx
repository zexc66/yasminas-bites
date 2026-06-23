'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const MESSAGES = [
  'Free delivery on orders over JD 20 across Amman',
  'Order before 2pm for same-day delivery',
  "Valentine's special — Pop Cakes now available",
]

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % MESSAGES.length)
    }, 4000)
    return () => clearInterval(id)
  }, [])

  if (dismissed) return null

  return (
    <div className="w-full h-9 bg-brown flex items-center justify-center">
      <div className="flex-1 flex items-center justify-center overflow-hidden px-10">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="text-cream text-xs font-medium tracking-wide text-center whitespace-nowrap"
          >
            {MESSAGES[index]}
          </motion.p>
        </AnimatePresence>
      </div>

      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss announcement"
        className="absolute right-3 flex items-center justify-center text-cream/70 hover:text-cream transition-colors duration-150 cursor-pointer"
      >
        <X size={16} />
      </button>
    </div>
  )
}
