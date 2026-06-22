'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export function SignatureSection() {
  return (
    <section className="relative bg-choco overflow-hidden py-24 px-6">

      {/* Subtle grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      {/* Warm glow behind logo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left: dark logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex justify-center lg:justify-start"
        >
          <div className="relative w-72 h-72 sm:w-80 sm:h-80">
            <Image
              src="/images/logo-dark.svg"
              alt="Yasmina's Bites"
              width={320}
              height={320}
              className="object-contain drop-shadow-2xl"
            />
          </div>
        </motion.div>

        {/* Right: copy */}
        <motion.div
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col gap-6"
        >
          <motion.p variants={fadeUp} className="text-xs font-semibold tracking-widest uppercase text-gold">
            Signature Collection
          </motion.p>

          <motion.h2 variants={fadeUp} className="font-playfair text-4xl sm:text-5xl font-bold text-cream leading-tight">
            Every cake is a
            <br />
            <span className="text-gold">work of art.</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-cream/60 leading-relaxed max-w-md">
            Handcrafted from premium ingredients, baked fresh for every single order.
            No pre-made. No compromise. Just pure, gooey, golden perfection —
            delivered to your door.
          </motion.p>

          {/* Stats */}
          <motion.div variants={fadeUp} className="grid grid-cols-3 gap-6 py-6 border-y border-gold/15">
            {[
              { number: '500+', label: 'Happy Customers' },
              { number: '4',    label: 'Signature Flavours' },
              { number: '100%', label: 'Fresh to Order' },
            ].map(({ number, label }) => (
              <div key={label}>
                <p className="font-playfair text-2xl font-bold text-gold">{number}</p>
                <p className="text-xs text-cream/50 mt-1 leading-snug">{label}</p>
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-gold text-choco px-7 py-3.5 rounded-full font-bold text-sm hover:bg-gold-light transition-colors cursor-pointer"
            >
              Order Now <ArrowRight size={16} />
            </Link>
            <Link
              href="/#about"
              className="inline-flex items-center gap-2 border border-gold/40 text-gold px-7 py-3.5 rounded-full font-semibold text-sm hover:border-gold hover:bg-gold/10 transition-all cursor-pointer"
            >
              Our Story
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
