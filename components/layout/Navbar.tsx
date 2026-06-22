'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Menu, X, User } from 'lucide-react'
import { useCart } from '@/lib/cartStore'
import { useAuth } from '@/contexts/AuthContext'
import { AnnouncementBar } from '@/components/ui/AnnouncementBar'

const NAV_LINKS = [
  { href: '/shop',          label: 'Shop'          },
  { href: '/custom-order',  label: 'Custom Order'  },
  { href: '/gift',          label: 'Gift'          },
  { href: '/gallery',       label: 'Gallery'       },
  { href: '/our-story',     label: 'Our Story'     },
  { href: '/#contact',      label: 'Contact'       },
]

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 shrink-0" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.558 4.115 1.535 5.84L.057 23.512a.75.75 0 00.931.931l5.672-1.478A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.717 9.717 0 01-4.964-1.366l-.356-.212-3.364.876.893-3.273-.231-.376A9.718 9.718 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
    </svg>
  )
}

export function Navbar() {
  const [open, setOpen]         = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { items, openCart }     = useCart()
  const { user }                = useAuth()
  const count                   = items.reduce((s, i) => s + i.quantity, 0)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex flex-col">

      {/* ── Announcement bar ── */}
      <AnnouncementBar />

      {/* ── Nav wrapper ── */}
      <div className="px-3 sm:px-4 pt-2">

      {/* ── Main bar ── */}
      <nav
        className={`max-w-7xl mx-auto rounded-2xl transition-all duration-500 ease-out ${
          scrolled
            ? 'bg-cream/96 backdrop-blur-2xl border border-gold-pale/70 shadow-[0_8px_32px_rgba(60,30,8,0.08)]'
            : 'bg-cream/78 backdrop-blur-lg border border-gold-pale/35'
        }`}
      >
        <div className="px-4 sm:px-5 flex items-center justify-between h-[76px] sm:h-[86px]">

          {/* Logo */}
          <Link
            href="/"
            aria-label="Yasmina's Bites home"
            className="shrink-0 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
          >
            <div className="relative w-[80px] h-[80px]">
              <Image
                src="/images/logo.svg"
                alt="Yasmina's Bites"
                fill
                className="object-contain"
                sizes="80px"
                priority
              />
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="relative text-[12.5px] lg:text-[13px] font-medium text-brown hover:text-gold transition-colors duration-200 group py-1 whitespace-nowrap"
              >
                {label}
                {/* Animated underline */}
                <span
                  className="absolute bottom-0 left-0 right-0 h-px bg-gold origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200"
                  aria-hidden
                />
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-0.5">

            {/* WhatsApp pill — desktop only */}
            <a
              href="https://wa.me/962789006574"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Order on WhatsApp"
              className="hidden md:inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-[#1ea952] border border-[#25D366]/35 bg-[#25D366]/10 hover:bg-[#25D366]/20 hover:border-[#25D366]/60 px-3.5 py-2 rounded-full transition-all duration-200 cursor-pointer mr-2"
            >
              <WhatsAppIcon />
              Order
            </a>

            {/* Account */}
            <Link
              href={user ? '/account' : '/auth/login'}
              aria-label={user ? 'My account' : 'Sign in'}
              className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-xl text-brown hover:text-gold hover:bg-gold-pale/55 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
            >
              <User size={18} />
            </Link>

            {/* Cart */}
            <button
              onClick={openCart}
              aria-label={`Open cart${count > 0 ? `, ${count} items` : ''}`}
              className="relative w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-xl text-brown hover:text-gold hover:bg-gold-pale/55 transition-all duration-200 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
            >
              <ShoppingBag size={18} />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    className="absolute top-1.5 right-1.5 min-w-[16px] h-4 bg-gold text-cream text-[9px] rounded-full flex items-center justify-center font-bold px-1 leading-none pointer-events-none"
                  >
                    {count > 9 ? '9+' : count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Hamburger — mobile */}
            <button
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl text-brown hover:bg-gold-pale/55 transition-colors duration-200 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {open ? <X size={20} /> : <Menu size={20} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile dropdown ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="md:hidden mt-2 max-w-7xl mx-auto rounded-2xl bg-cream/98 backdrop-blur-2xl border border-gold-pale/60 shadow-[0_12px_40px_rgba(60,30,8,0.10)] overflow-hidden"
          >
            <div className="px-4 pt-3 pb-4 flex flex-col gap-0.5">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="flex items-center h-12 px-3 rounded-xl text-brown hover:text-gold hover:bg-gold-pale/50 font-medium text-sm transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
                >
                  {label}
                </Link>
              ))}

              <Link
                href={user ? '/account' : '/auth/login'}
                onClick={() => setOpen(false)}
                className="flex items-center h-12 px-3 rounded-xl text-brown hover:text-gold hover:bg-gold-pale/50 font-medium text-sm transition-colors duration-150"
              >
                <User size={16} className="mr-2.5 text-taupe" />
                {user ? 'My Account' : 'Sign In'}
              </Link>

              {/* WhatsApp CTA */}
              <div className="mt-1.5 pt-3 border-t border-gold-pale/50">
                <a
                  href="https://wa.me/962789006574"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 h-12 px-4 rounded-xl bg-[#25D366]/10 border border-[#25D366]/25 text-[#1ea952] font-semibold text-sm hover:bg-[#25D366]/18 transition-colors duration-150 cursor-pointer"
                >
                  <WhatsAppIcon />
                  Order via WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>{/* end nav wrapper */}
    </header>
  )
}
