'use client'

import Image from 'next/image'
import { useLang } from '@/contexts/LanguageContext'

const WHATSAPP = 'https://wa.me/962789006574'

interface GalleryItem {
  src: string
  alt: string
  name: string
  height: string
}

const GALLERY_ITEMS: GalleryItem[] = [
  { src: '/images/cookie-biscoff.jpg',           alt: 'Biscoff Caramel Cookie Cake',    name: 'Biscoff Caramel',       height: 'h-80'  },
  { src: '/images/cookie-pistachio.jpg',          alt: 'Pistachio Cookie Cake',          name: 'Pistachio Dream',       height: 'h-64'  },
  { src: '/images/cookie-molten-pistachio.png',   alt: 'Molten Pistachio Cookie Cake',   name: 'Molten Pistachio',      height: 'h-96'  },
  { src: '/images/cookie-choc-chip.jpg',          alt: 'Chocolate Chip Cookie Cake',     name: 'Classic Choc Chip',     height: 'h-48'  },
  { src: '/images/cookie-pop-cake.png',           alt: 'Pop Cake Cookie',                name: 'Pop Cake Delight',      height: 'h-80'  },
  { src: '/images/cookie-pistachio.jpg',          alt: 'Pistachio Cookie Cake',          name: 'Pistachio Bliss',       height: 'h-64'  },
  { src: '/images/cookie-choc-chip.jpg',          alt: 'Chocolate Chip Cookie Cake',     name: 'Choc Chip Heaven',      height: 'h-96'  },
  { src: '/images/cookie-biscoff.jpg',            alt: 'Biscoff Caramel Cookie Cake',    name: 'Biscoff Special',       height: 'h-48'  },
  { src: '/images/cookie-molten-pistachio.png',   alt: 'Molten Pistachio Cookie Cake',   name: 'Pistachio Lava',        height: 'h-80'  },
  { src: '/images/cookie-pop-cake.png',           alt: 'Pop Cake Cookie',                name: 'Cake Pop Treat',        height: 'h-64'  },
  { src: '/images/cookie-biscoff.jpg',            alt: 'Biscoff Caramel Cookie Cake',    name: 'Caramel Biscoff',       height: 'h-48'  },
  { src: '/images/cookie-pistachio.jpg',          alt: 'Pistachio Cookie Cake',          name: 'Green Gold',            height: 'h-96'  },
  { src: '/images/cookie-choc-chip.jpg',          alt: 'Chocolate Chip Cookie Cake',     name: 'Golden Chips',          height: 'h-64'  },
  { src: '/images/cookie-molten-pistachio.png',   alt: 'Molten Pistachio Cookie Cake',   name: 'Molten Heart',          height: 'h-80'  },
  { src: '/images/cookie-pop-cake.png',           alt: 'Pop Cake Cookie',                name: 'Festive Pop Cake',      height: 'h-48'  },
  { src: '/images/cookie-biscoff.jpg',            alt: 'Biscoff Caramel Cookie Cake',    name: 'Biscoff Indulgence',    height: 'h-96'  },
]

export function GalleryContent() {
  const { t } = useLang()

  return (
    <>
      {/* ── Hero banner ── */}
      <div className="relative h-72 sm:h-96 overflow-hidden">
        {/* Dark gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-choco via-brown to-brown-light" />

        {/* Subtle gold shimmer overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent" />

        {/* Decorative circles */}
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-gold/5 blur-3xl" />
        <div className="absolute -bottom-10 -right-10 w-64 h-64 rounded-full bg-gold-light/8 blur-2xl" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <p className="text-gold text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase mb-4">
            Yasmina&apos;s Bites
          </p>
          <h1 className="font-playfair text-5xl sm:text-7xl font-bold text-cream leading-none tracking-tight">
            {t('gallery_heading')}
          </h1>
          <p className="mt-4 font-dancing text-2xl sm:text-3xl text-taupe">
            {t('gallery_tagline')}
          </p>
        </div>
      </div>

      {/* ── Page header ── */}
      <div className="text-center py-14 px-6">
        <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-brown">
          {t('gallery_creations')}
        </h2>
        <p className="mt-3 font-dancing text-2xl text-gold-light">
          {t('gallery_tagline')}
        </p>
        <p className="mt-4 text-brown-light max-w-lg mx-auto leading-relaxed text-sm">
          {t('gallery_sub')}
        </p>
      </div>

      {/* ── Masonry grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
        <div
          className="columns-2 md:columns-3 xl:columns-4 gap-4"
          style={{ columnGap: '1rem' }}
        >
          {GALLERY_ITEMS.map((item, i) => (
            <div
              key={i}
              className={`relative ${item.height} w-full mb-4 rounded-2xl overflow-hidden break-inside-avoid group cursor-pointer`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-choco/90 via-brown/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Hover content */}
              <div className="absolute inset-0 flex flex-col items-center justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0" style={{ transition: 'opacity 300ms, transform 300ms' }}>
                <p className="font-playfair text-cream font-semibold text-lg leading-tight text-center mb-3">
                  {item.name}
                </p>
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-cream text-sm font-semibold px-5 py-2.5 rounded-full transition-colors duration-200 cursor-pointer"
                  aria-label={`Order ${item.name} via WhatsApp`}
                >
                  {t('sig_order')}
                </a>
              </div>

              {/* Always-visible subtle label on mobile (no hover) */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-choco/70 to-transparent p-3 md:hidden">
                <p className="font-playfair text-cream text-sm font-medium text-center">
                  {item.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA strip ── */}
      <div className="bg-choco py-16 px-6 text-center">
        <p className="font-playfair text-3xl sm:text-4xl font-bold text-cream mb-3">
          See something you love?
        </p>
        <p className="font-dancing text-xl text-taupe mb-8">
          Order fresh, delivered to your door
        </p>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-gold hover:bg-gold-light text-cream font-semibold px-8 py-4 rounded-full text-base transition-colors duration-200 cursor-pointer shadow-lg shadow-gold/25"
        >
          <WhatsAppIcon />
          {t('order_wa')}
        </a>
      </div>
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
