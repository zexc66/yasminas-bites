'use client'

import { motion } from 'framer-motion'
import { Truck, ChefHat, Gift, ShieldCheck } from 'lucide-react'
import { useLang } from '@/contexts/LanguageContext'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

export function DeliveryStrip() {
  const { t } = useLang()

  const tiles = [
    {
      icon: <Truck size={36} className="text-gold" />,
      title: t('ds_delivery_title'),
      subtitle: t('ds_delivery_sub'),
    },
    {
      icon: <ChefHat size={36} className="text-gold" />,
      title: t('ds_baked_title'),
      subtitle: t('ds_baked_sub'),
    },
    {
      icon: <Gift size={36} className="text-gold" />,
      title: t('ds_gift_title'),
      subtitle: t('ds_gift_sub'),
    },
    {
      icon: <ShieldCheck size={36} className="text-gold" />,
      title: t('ds_secure_title'),
      subtitle: t('ds_secure_sub'),
    },
  ]

  return (
    <section className="bg-cream py-16 px-6">
      <motion.div
        className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {tiles.map((tile, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="flex flex-col items-center text-center gap-3"
          >
            <div>{tile.icon}</div>
            <h3 className="font-playfair text-lg font-bold text-brown">{tile.title}</h3>
            <p className="text-sm text-brown-light leading-relaxed">{tile.subtitle}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
