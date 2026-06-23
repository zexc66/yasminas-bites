'use client'

import Image from 'next/image'
import { useLang } from '@/contexts/LanguageContext'

export function AboutSection() {
  const { t } = useLang()

  const vals = [
    { label: t('about_val_fresh'),     desc: t('about_val_fresh_desc') },
    { label: t('about_val_premium'),   desc: t('about_val_premium_desc') },
    { label: t('about_val_crafted'),   desc: t('about_val_crafted_desc') },
    { label: t('about_val_delivered'), desc: t('about_val_delivered_desc') },
  ]

  return (
    <section id="about" className="py-24 bg-cream">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* Brand logo card */}
        <div className="relative flex justify-center">
          <div className="flex items-center justify-center w-full max-w-sm aspect-square rounded-3xl overflow-hidden bg-cream-dark shadow-2xl shadow-brown/20 border border-gold-pale">
            <Image
              src="/images/logo.svg"
              alt="Yasmina's Bites brand logo"
              width={340}
              height={340}
              className="object-contain p-8"
            />
          </div>
          {/* Floating badge */}
          <div className="absolute -bottom-6 -right-6 md:-right-2 w-28 h-28 rounded-full bg-gold flex flex-col items-center justify-center text-cream shadow-lg shadow-gold/30 z-10">
            <p className="font-playfair font-bold text-2xl">500+</p>
            <p className="text-[10px] text-center leading-tight font-medium">{t('about_happy_customers')}</p>
          </div>
        </div>

        {/* Copy */}
        <div>
          <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-3">
            {t('nav_story')}
          </p>
          <h2 className="font-playfair text-4xl font-bold text-brown mb-6 leading-snug">
            {t('about_heading1')}<br />{t('about_heading2')}
          </h2>
          <div className="space-y-4 text-brown-light leading-relaxed">
            <p>{t('about_body1')}</p>
            <p>{t('about_body2')}</p>
          </div>

          {/* Values */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            {vals.map(({ label, desc }) => (
              <div key={label} className="bg-gold-pale rounded-xl p-4">
                <p className="font-playfair font-bold text-brown">{label}</p>
                <p className="text-xs text-brown-light mt-0.5">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
