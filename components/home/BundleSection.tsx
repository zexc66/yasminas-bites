'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useLang } from '@/contexts/LanguageContext'

interface Bundle {
  name:     string
  nameAr:   string
  badge:    string
  items:    string[]
  itemsAr:  string[]
  was:      number
  now:      number
  save:     number
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const cardVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
}

export function BundleSection() {
  const { t, lang } = useLang()

  const BUNDLES: Bundle[] = [
    {
      name: 'The Classic Duo',     nameAr: 'الثنائي الكلاسيكي',
      badge: t('bundle_badge_popular'),
      items: ['Biscoff Caramel', 'Cookie Bites Box'],
      itemsAr: ['كيك البيسكوف بالكراميل', 'صندوق قطع الكوكيز'],
      was: 40, now: 34, save: 6,
    },
    {
      name: 'The Gift Set',        nameAr: 'طقم الهدية',
      badge: t('bundle_badge_gift'),
      items: ['Pistachio Drizzle', 'Pop Cakes Box (6)'],
      itemsAr: ['كيك الفستق بالصوص', 'بوب كيك (٦ حبات)'],
      was: 40, now: 33, save: 7,
    },
    {
      name: 'The Full Experience', nameAr: 'التجربة الكاملة',
      badge: t('bundle_badge_value'),
      items: ['Biscoff Caramel', 'Pistachio Drizzle', 'Pop Cakes Box', 'Cookie Bites Box'],
      itemsAr: ['كيك البيسكوف', 'كيك الفستق', 'بوب كيك', 'صندوق قطع الكوكيز'],
      was: 80, now: 64, save: 16,
    },
  ]

  return (
    <section className="bg-cream-dark py-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl sm:text-5xl text-brown font-bold mb-3">
            {t('bundle_heading')}
          </h2>
          <p className="text-brown-light text-base">
            {t('bundle_sub')}
          </p>
        </div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {BUNDLES.map((bundle) => (
            <motion.div
              key={bundle.name}
              variants={cardVariants}
              className="relative bg-white rounded-3xl p-6 shadow-sm border border-gold-pale/50 flex flex-col"
            >
              {/* Badge */}
              <span className="absolute top-5 right-5 bg-gold text-cream text-[11px] font-semibold px-3 py-1 rounded-full">
                {bundle.badge}
              </span>

              {/* Bundle name */}
              <h3 className="font-playfair text-xl font-bold text-brown mb-4 pr-24">
                {lang === 'ar' ? bundle.nameAr : bundle.name}
              </h3>

              {/* Items */}
              <ul className="flex flex-col gap-2 mb-6">
                {(lang === 'ar' ? bundle.itemsAr : bundle.items).map((item) => (
                  <li key={item} className="flex items-center gap-2 text-brown text-sm">
                    <Check size={14} className="text-gold shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Pricing */}
              <div className="mt-auto">
                <div className="flex items-end gap-3 mb-2">
                  <span className="font-playfair font-bold text-3xl text-gold">
                    JD {bundle.now}
                  </span>
                  <span className="text-taupe line-through text-sm mb-1">
                    JD {bundle.was}
                  </span>
                </div>

                {/* Save pill */}
                <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-5">
                  {t('bundle_save')} {bundle.save}
                </span>

                {/* WhatsApp CTA */}
                <a
                  href={`https://wa.me/962789006574?text=Hi! I'd like to order ${encodeURIComponent(bundle.name)} (${bundle.now} JD)`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-brown text-cream text-sm font-semibold py-3 rounded-2xl hover:bg-brown-light transition-colors duration-200"
                >
                  {t('order_wa')}
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
