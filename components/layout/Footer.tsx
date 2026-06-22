import Link from 'next/link'
import Image from 'next/image'

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
            Handcrafted cookie cakes baked fresh to order,
            delivered across Amman with love.
          </p>
        </div>

        {/* Links */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gold mb-5">
            Navigate
          </p>
          <ul className="space-y-3 text-sm text-brown-light">
            <li><Link href="/shop"           className="hover:text-gold transition-colors">Shop All</Link></li>
            <li><Link href="/#about"         className="hover:text-gold transition-colors">Our Story</Link></li>
            <li><Link href="/auth/login"     className="hover:text-gold transition-colors">Sign In</Link></li>
            <li><Link href="/account/orders" className="hover:text-gold transition-colors">My Orders</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div id="contact">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold mb-5">
            Get in Touch
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
        <span>© {new Date().getFullYear()} Yasmina&apos;s Bites. All rights reserved.</span>
        <span className="font-dancing text-base text-gold-light">Little bites of happiness</span>
      </div>
    </footer>
  )
}
