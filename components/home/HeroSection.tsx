'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Star, ChefHat, Truck, Sparkles } from 'lucide-react'
import { useLang } from '@/contexts/LanguageContext'

const springIn = (delay: number) => ({
  hidden: { opacity: 0, scale: 0.75, y: 16 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delay, type: 'spring' as const, stiffness: 220, damping: 18 },
  },
})

export function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-6%'])
  const { t, dir } = useLang()

  return (
    <section ref={ref} className="relative min-h-screen bg-cream overflow-hidden flex items-center">

      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none z-10 mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '220px',
        }}
        aria-hidden
      />

      {/* Background orbs */}
      <div className="absolute -top-40 right-0 w-[900px] h-[900px] rounded-full bg-gold-pale/40 blur-[140px] pointer-events-none" aria-hidden />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-cream-dark/90 blur-[90px] pointer-events-none translate-y-1/3" aria-hidden />
      <div className="absolute top-1/2 right-1/3 w-[280px] h-[280px] rounded-full bg-taupe/15 blur-[60px] pointer-events-none" aria-hidden />

      {/* Vertical decorative line */}
      <div className="absolute left-7 top-36 bottom-36 w-px bg-gradient-to-b from-transparent via-gold/25 to-transparent hidden xl:block" aria-hidden />
      <motion.div
        className="absolute left-3 top-1/2 -translate-y-1/2 -rotate-90 hidden xl:flex items-center gap-3 text-[9px] tracking-[0.35em] uppercase text-taupe/70 font-semibold select-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        aria-hidden
      >
        <span className="w-6 h-px bg-taupe/40" />
        Amman · Jordan
        <span className="w-6 h-px bg-taupe/40" />
      </motion.div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 pt-28 pb-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-4 items-center min-h-[calc(100vh-8rem)]">

          {/* ── LEFT: copy ── */}
          <motion.div style={{ y: textY }} className="flex flex-col gap-6 max-w-[560px]">

            {/* Pill label */}
            <motion.div
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 w-fit bg-gold/10 border border-gold/25 text-gold text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-full"
            >
              <Sparkles size={10} />
              {t('hero_badge_top')}
            </motion.div>

            {/* Headline — clip reveal */}
            <div>
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: '105%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
                  className="font-playfair font-bold text-brown leading-[0.88]"
                  style={{ fontSize: 'clamp(3.6rem, 7.5vw, 6.5rem)' }}
                >
                  Yasmina&apos;s
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.span
                  initial={{ y: '105%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
                  className="font-playfair font-bold text-gold leading-none block"
                  style={{ fontSize: 'clamp(4.5rem, 9.5vw, 8.5rem)' }}
                >
                  Bites
                </motion.span>
              </div>
            </div>

            {/* Script tagline */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="font-dancing text-gold-light -mt-1"
              style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)' }}
            >
              {t('hero_tagline')}
            </motion.p>

            {/* Gold line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.44, ease: [0.22, 1, 0.36, 1] }}
              className="origin-left h-px w-20 bg-gradient-to-r from-gold/70 to-transparent"
            />

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-brown-light leading-relaxed text-[0.95rem] max-w-[400px]"
            >
              {t('hero_desc')}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-3"
            >
              <Link
                href="/shop"
                className="group inline-flex items-center gap-2 bg-brown text-cream px-8 py-4 rounded-full font-semibold text-sm hover:bg-gold transition-all duration-300 shadow-xl shadow-brown/20"
              >
                {t('hero_cta_shop')}
                <ArrowRight
                  size={15}
                  className={`transition-transform duration-200 ${dir === 'rtl' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}
                />
              </Link>
              <Link
                href="/#about"
                className="inline-flex items-center gap-2 border border-gold/35 text-gold px-8 py-4 rounded-full font-semibold text-sm hover:bg-gold-pale/60 transition-colors"
              >
                {t('nav_story')}
              </Link>
            </motion.div>

            {/* Social proof row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.78 }}
              className="flex items-center gap-4 pt-1"
            >
              <div className="flex -space-x-2.5">
                {['#C9A47C', '#B8895E', '#A47248', '#916035'].map((bg, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-cream flex items-center justify-center text-[9px] font-bold text-cream shrink-0"
                    style={{ backgroundColor: bg }}
                  >
                    {['Y', 'S', 'M', 'R'][i]}
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={11} className="fill-gold text-gold" />
                  ))}
                  <span className="text-xs font-bold text-brown ml-1.5">4.9</span>
                </div>
                <p className="text-[11px] text-taupe">{t('hero_social_proof')}</p>
              </div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: image composition ── */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative">
              {/* Main image */}
              <div className="relative w-[300px] h-[390px] sm:w-[360px] sm:h-[470px] lg:w-[420px] lg:h-[560px] rounded-[2.75rem] overflow-hidden shadow-[0_32px_80px_rgba(60,30,8,0.22)]">
                <Image
                  src="/images/cookie-biscoff.jpg"
                  alt="Yasmina's Biscoff Caramel Drizzle cookie cake"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 300px, (max-width: 1024px) 360px, 420px"
                  priority
                  fetchPriority="high"
                  quality={75}
                />
                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-brown/60 via-brown/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="font-dancing text-cream/95 text-2xl leading-tight">Biscoff Caramel Drizzle</p>
                  <p className="text-cream/65 text-[11px] font-medium mt-0.5 tracking-wide">{t('hero_most_loved')}</p>
                </div>
              </div>

              {/* Badge: Price */}
              <motion.div
                variants={springIn(0.8)}
                initial="hidden"
                animate="show"
                className="absolute -top-5 -right-6 lg:-right-10 bg-gold text-cream rounded-2xl px-5 py-3 shadow-xl shadow-gold/35 flex flex-col items-center min-w-[88px]"
              >
                <span className="text-[9px] font-bold uppercase tracking-widest opacity-75">{t('hero_from')}</span>
                <span className="font-playfair font-bold text-2xl leading-snug">JD 14</span>
              </motion.div>

              {/* Badge: Rating */}
              <motion.div
                variants={springIn(1.0)}
                initial="hidden"
                animate="show"
                className="absolute top-[38%] -left-8 lg:-left-14 bg-cream/90 backdrop-blur-md border border-gold-pale rounded-2xl px-4 py-3 shadow-lg flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                  <Star size={17} className="fill-gold text-gold" />
                </div>
                <div>
                  <p className="font-playfair font-bold text-brown text-lg leading-none">4.9</p>
                  <p className="text-[10px] text-brown-light mt-0.5">312 {t('hero_reviews')}</p>
                </div>
              </motion.div>

              {/* Badge: Fresh baked */}
              <motion.div
                variants={springIn(1.15)}
                initial="hidden"
                animate="show"
                className="absolute -bottom-5 -left-6 lg:-left-12 bg-cream/90 backdrop-blur-md border border-gold-pale rounded-2xl px-4 py-3 shadow-lg"
              >
                <div className="flex items-center gap-2 mb-0.5">
                  <ChefHat size={13} className="text-gold shrink-0" />
                  <span className="text-xs font-bold text-brown">{t('hero_fresh_baked')}</span>
                </div>
                <p className="text-[10px] text-brown-light">{t('hero_fresh_sub')}</p>
              </motion.div>

              {/* Badge: Delivery */}
              <motion.div
                variants={springIn(1.05)}
                initial="hidden"
                animate="show"
                className="absolute -bottom-3 -right-4 lg:-right-8 bg-brown text-cream rounded-xl px-3.5 py-2 shadow-xl flex items-center gap-2 text-xs font-semibold"
              >
                <Truck size={13} className="shrink-0" />
                {t('hero_delivery')}
              </motion.div>

              {/* Mini thumbnail */}
              <motion.div
                variants={springIn(1.3)}
                initial="hidden"
                animate="show"
                className="absolute -top-8 left-6 w-[68px] h-[68px] rounded-2xl overflow-hidden shadow-xl border-[3px] border-cream hidden sm:block"
              >
                <Image
                  src="/images/cookie-pistachio.jpg"
                  alt="Pistachio Drizzle Cake"
                  fill
                  className="object-cover"
                  sizes="68px"
                />
              </motion.div>

              {/* Rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
                className="absolute inset-[-24px] rounded-[3rem] border border-dashed border-gold/15 pointer-events-none"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-taupe z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-[9px] tracking-[0.3em] uppercase font-semibold">Scroll</span>
        <motion.div
          className="w-px h-7 bg-gold/30 origin-top"
          animate={{ scaleY: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
