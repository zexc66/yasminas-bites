'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

interface Testimonial {
  name: string
  city: string
  initials: string
  quote: string
  stars: number
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah M',
    city: 'London',
    initials: 'SM',
    quote:
      'Ordered for my daughter\'s birthday and everyone was obsessed. The pistachio one disappeared in minutes!',
    stars: 5,
  },
  {
    name: 'James T',
    city: 'Manchester',
    initials: 'JT',
    quote:
      'Best cookie cake I\'ve ever had. The Biscoff caramel is absolutely next level. Will be ordering every month.',
    stars: 5,
  },
  {
    name: 'Priya K',
    city: 'Birmingham',
    initials: 'PK',
    quote:
      'Beautiful packaging, incredibly fresh, and the taste is just wow. Already ordered twice this week!',
    stars: 5,
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export function TestimonialsSection() {
  return (
    <section className="bg-cream-dark py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs tracking-widest uppercase text-gold mb-3">
            What people are saying
          </p>
          <h2 className="font-playfair text-3xl sm:text-4xl text-brown">
            Little bites of happiness
          </h2>
        </div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className="bg-cream rounded-2xl p-6 shadow-sm border border-gold-pale/50 flex flex-col gap-4"
            >
              {/* Stars */}
              <div className="flex items-center gap-0.5">
                {Array.from({ length: t.stars }).map((_, s) => (
                  <Star key={s} size={14} className="fill-gold text-gold" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-brown-light italic leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Avatar + Name */}
              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 bg-gold-pale text-gold font-bold flex items-center justify-center rounded-full text-sm flex-shrink-0">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-brown">{t.name}</p>
                  <p className="text-xs text-brown-light">{t.city}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
