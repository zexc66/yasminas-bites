'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLang } from '@/contexts/LanguageContext'

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  )
}

export function Footer() {
  const { t } = useLang()

  return (
    <footer className="bg-cream border-t border-gold-pale/60">

      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Brand */}
        <div className="flex flex-col items-start gap-4">
          <div className="relative w-28 h-28">
            <Image
              src="/images/logo.svg"
              alt="Yasmina's Bites"
              fill
              className="object-contain"
              sizes="112px"
            />
          </div>
          <p className="text-sm text-brown-light leading-relaxed max-w-xs">
            {t('footer_desc')}
          </p>
        </div>

        {/* Links */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gold mb-5">
            {t('footer_nav')}
          </p>
          <ul className="space-y-3 text-sm text-brown-light">
            <li><Link href="/shop"           className="hover:text-gold transition-colors">{t('footer_shop_all')}</Link></li>
            <li><Link href="/gallery"        className="hover:text-gold transition-colors">{t('nav_gallery')}</Link></li>
            <li><Link href="/our-story"      className="hover:text-gold transition-colors">{t('nav_story')}</Link></li>
            <li><Link href="/auth/login"     className="hover:text-gold transition-colors">{t('footer_signin')}</Link></li>
            <li><Link href="/account/orders" className="hover:text-gold transition-colors">{t('footer_orders')}</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div id="contact">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold mb-5">
            {t('footer_get_in_touch')}
          </p>
          <ul className="space-y-3 text-sm text-brown-light">
            <li>
              <a
                href="https://www.instagram.com/yasminabites/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-gold transition-colors"
              >
                <InstagramIcon />
                @yasminabites
              </a>
            </li>
            <li>
              <a
                href="mailto:hello@yasminasbites.com"
                className="hover:text-gold transition-colors"
              >
                hello@yasminasbites.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gold-pale/50 px-6 py-5 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-taupe">
        <span>© {new Date().getFullYear()} Yasmina&apos;s Bites. {t('footer_copyright')}</span>
        <span className="font-dancing text-base text-gold-light">{t('footer_tagline')}</span>
      </div>
    </footer>
  )
}
