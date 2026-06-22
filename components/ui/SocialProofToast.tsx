'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'

const ORDERS = [
  { name: 'Rania',  area: 'Abdoun',       product: 'Biscoff Caramel Drizzle',  time: '2 min ago'  },
  { name: 'Omar',   area: 'Sweifieh',     product: 'Pistachio Drizzle Cake',   time: '8 min ago'  },
  { name: 'Lara',   area: 'Khalda',       product: 'Valentine Pop Cakes',       time: '15 min ago' },
  { name: 'Ahmad',  area: 'Shmeisani',    product: 'Pistachio Molten Cookie',   time: '23 min ago' },
  { name: 'Sara',   area: 'Jabal Amman',  product: 'Biscoff Caramel Drizzle',  time: '31 min ago' },
]

export function SocialProofToast() {
  const [visible, setVisible] = useState(false)
  const [index, setIndex]     = useState(0)
  const cycleRef              = useRef<ReturnType<typeof setTimeout> | null>(null)

  const scheduleNext = (currentIndex: number) => {
    // Show for 5 s, then hide for 15 s, then show next
    const nextIndex = (currentIndex + 1) % ORDERS.length
    cycleRef.current = setTimeout(() => {
      setVisible(false)
      cycleRef.current = setTimeout(() => {
        setIndex(nextIndex)
        setVisible(true)
        scheduleNext(nextIndex)
      }, 15000)
    }, 5000)
  }

  useEffect(() => {
    // Initial delay of 4 s before first appearance
    cycleRef.current = setTimeout(() => {
      setVisible(true)
      scheduleNext(0)
    }, 4000)

    return () => {
      if (cycleRef.current) clearTimeout(cycleRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const order = ORDERS[index]

  return (
    <div className="fixed bottom-24 left-4 z-40 pointer-events-none">
      <AnimatePresence>
        {visible && (
          <motion.div
            key={index}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0,   opacity: 1 }}
            exit={{   x: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="bg-white border border-gold-pale rounded-2xl shadow-xl p-3 w-64 pointer-events-auto"
          >
            <div className="flex items-start gap-2.5">
              <div className="shrink-0 mt-0.5">
                <ShoppingBag size={16} className="text-gold" />
              </div>
              <div className="min-w-0">
                <p className="text-brown text-sm font-bold leading-snug truncate">
                  {order.name} from {order.area}
                </p>
                <p className="text-brown-light text-xs leading-snug mt-0.5 truncate">
                  {order.product}
                </p>
                <p className="text-taupe text-[10px] mt-1">
                  {order.time}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
