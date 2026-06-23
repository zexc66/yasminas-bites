'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChefHat, Star, Heart, MapPin } from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { useLang } from '@/contexts/LanguageContext'

const WHATSAPP = 'https://wa.me/962789006574'

/* ── Animation helpers ── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}

const staggerContainer = (stagger = 0.12) => ({
  hidden: {},
  show:   { transition: { staggerChildren: stagger } },
})

export default function OurStoryPage() {
  const { t } = useLang()

  const VALUES = [
    { icon: ChefHat, label: t('story_val_fresh'),       desc: t('story_val_fresh_desc') },
    { icon: Star,    label: t('story_val_premium'),      desc: t('story_val_premium_desc') },
    { icon: Heart,   label: t('story_val_handcrafted'),  desc: t('story_val_handcrafted_desc') },
    { icon: MapPin,  label: t('story_val_local'),        desc: t('story_val_local_desc') },
  ]

  const TIMELINE = [
    { year: '2022', event: t('story_t1_event'), desc: t('story_t1_desc') },
    { year: '2023', event: t('story_t2_event'), desc: t('story_t2_desc') },
    { year: '2024', event: t('story_t3_event'), desc: t('story_t3_desc') },
  ]

  return (
    <>
      <Navbar />

      <main>

        {/* ── 1. Hero ── */}
        <section className="pt-28 pb-24 bg-choco relative overflow-hidden">
          {/* Decorative glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold/6 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gold-light/4 blur-3xl rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="flex justify-center mb-10"
            >
              <div className="relative w-[160px] h-[160px] sm:w-[200px] sm:h-[200px]">
                <Image
                  src="/images/logo.svg"
                  alt="Yasmina's Bites"
                  fill
                  className="object-contain"
                  sizes="200px"
                  priority
                />
              </div>
            </motion.div>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
            >
              <p className="text-gold text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase mb-4">
                Yasmina&apos;s Bites
              </p>
              <h1 className="font-playfair text-5xl sm:text-7xl font-bold text-cream leading-tight">
                {t('nav_story')}
              </h1>
              <p className="mt-5 font-dancing text-2xl sm:text-3xl text-taupe">
                {t('story_hero_tagline')}
              </p>
              <p className="mt-6 text-taupe/80 leading-relaxed max-w-xl mx-auto text-sm sm:text-base">
                {t('story_hero_sub')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── 2. Founder section ── */}
        <section className="py-24 bg-cream">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

            {/* Image left */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-brown/20 border border-gold-pale">
                <Image
                  src="/images/cookie-biscoff.jpg"
                  alt="Yasmina's signature Biscoff cookie cake"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Floating badge */}
                <div className="absolute bottom-5 right-5 bg-choco/90 backdrop-blur-sm border border-gold/30 rounded-2xl px-4 py-3 text-center">
                  <p className="font-playfair font-bold text-gold text-xl">500+</p>
                  <p className="text-cream text-[10px] font-medium">{t('story_happy_customers')}</p>
                </div>
              </div>
            </motion.div>

            {/* Text right */}
            <motion.div
              variants={staggerContainer()}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              className="flex flex-col gap-6"
            >
              <motion.div variants={fadeUp}>
                <p className="text-gold text-xs font-semibold tracking-[0.25em] uppercase mb-3">
                  {t('story_founder_label')}
                </p>
                <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-brown leading-snug">
                  {t('story_founder_heading1')}<br />{t('story_founder_heading2')}
                </h2>
              </motion.div>

              <motion.p variants={fadeUp} className="text-brown-light leading-relaxed">
                {t('story_founder_body1')}
              </motion.p>

              <motion.p variants={fadeUp} className="text-brown-light leading-relaxed">
                {t('story_founder_body2')}
              </motion.p>

              <motion.p variants={fadeUp} className="text-brown-light leading-relaxed">
                {t('story_founder_body3')}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ── 3. Values grid ── */}
        <section className="py-24 bg-gold-pale/40">
          <div className="max-w-5xl mx-auto px-6">

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              className="text-center mb-14"
            >
              <p className="text-gold text-xs font-semibold tracking-[0.25em] uppercase mb-3">
                {t('story_values_label')}
              </p>
              <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-brown">
                {t('story_values_heading')}
              </h2>
            </motion.div>

            <motion.div
              variants={staggerContainer(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {VALUES.map(({ icon: Icon, label, desc }) => (
                <motion.div
                  key={label}
                  variants={fadeUp}
                  className="bg-cream rounded-2xl p-7 border border-gold-pale shadow-sm hover:shadow-md hover:border-gold/30 transition-all duration-200 text-center group"
                >
                  <div className="w-12 h-12 mx-auto mb-5 rounded-xl bg-gold-pale flex items-center justify-center group-hover:bg-gold/15 transition-colors duration-200">
                    <Icon className="w-6 h-6 text-gold" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-playfair text-xl font-bold text-brown mb-2">{label}</h3>
                  <p className="text-sm text-brown-light leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── 4. Timeline ── */}
        <section className="py-24 bg-cream">
          <div className="max-w-5xl mx-auto px-6">

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              className="text-center mb-16"
            >
              <p className="text-gold text-xs font-semibold tracking-[0.25em] uppercase mb-3">
                {t('story_timeline_label')}
              </p>
              <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-brown">
                {t('story_milestones')}
              </h2>
            </motion.div>

            {/* Desktop: horizontal / Mobile: vertical */}
            <motion.div
              variants={staggerContainer(0.15)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              className="relative"
            >
              {/* Connector line — desktop only */}
              <div className="hidden md:block absolute top-8 left-[calc(16.67%-0.5px)] right-[calc(16.67%-0.5px)] h-px bg-gold-pale" />

              <div className="flex flex-col md:flex-row gap-10 md:gap-0 md:justify-between">
                {TIMELINE.map(({ year, event, desc }, i) => (
                  <motion.div
                    key={year}
                    variants={fadeUp}
                    className="relative md:flex-1 md:px-6 flex md:flex-col gap-5 md:gap-0"
                  >
                    {/* Vertical line — mobile only */}
                    {i < TIMELINE.length - 1 && (
                      <div className="md:hidden absolute left-5 top-10 bottom-[-2.5rem] w-px bg-gold-pale" />
                    )}

                    {/* Dot */}
                    <div className="relative z-10 shrink-0 w-10 h-10 md:mx-auto rounded-full bg-gold flex items-center justify-center shadow-md shadow-gold/30 md:mb-6">
                      <span className="w-3 h-3 rounded-full bg-cream" />
                    </div>

                    {/* Content */}
                    <div className="md:text-center pb-2">
                      <span className="inline-block text-xs font-bold tracking-widest uppercase text-gold mb-1">
                        {year}
                      </span>
                      <h3 className="font-playfair text-lg font-bold text-brown leading-snug mb-2">
                        {event}
                      </h3>
                      <p className="text-sm text-brown-light leading-relaxed max-w-[220px] md:mx-auto">
                        {desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── 5. CTA ── */}
        <section className="py-24 bg-choco relative overflow-hidden">
          {/* Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-brown/60 via-transparent to-gold/5 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gold/6 blur-3xl rounded-full pointer-events-none" />

          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="relative z-10 max-w-2xl mx-auto px-6 text-center"
          >
            <motion.p variants={fadeUp} className="text-gold text-xs font-semibold tracking-[0.25em] uppercase mb-4">
              {t('story_cta_label')}
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-playfair text-4xl sm:text-5xl font-bold text-cream leading-tight mb-4">
              {t('story_cta_heading')}
            </motion.h2>
            <motion.p variants={fadeUp} className="font-dancing text-2xl text-taupe mb-10">
              {t('story_cta_tagline')}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-cream font-semibold px-8 py-4 rounded-full text-sm transition-colors duration-200 cursor-pointer shadow-lg shadow-gold/25"
              >
                {t('hero_cta_shop')}
              </Link>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-[#25D366]/40 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#4ade80] font-semibold px-8 py-4 rounded-full text-sm transition-colors duration-200 cursor-pointer"
              >
                <WhatsAppIcon />
                {t('order_wa')}
              </a>
            </motion.div>
          </motion.div>
        </section>

      </main>

      <Footer />
    </>
  )
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.558 4.115 1.535 5.84L.057 23.512a.75.75 0 00.931.931l5.672-1.478A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.717 9.717 0 01-4.964-1.366l-.356-.212-3.364.876.893-3.273-.231-.376A9.718 9.718 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
    </svg>
  )
}
