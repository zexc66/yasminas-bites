import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Dancing_Script, Inter, Noto_Sans_Arabic } from 'next/font/google'
import { Providers } from '@/components/Providers'
import './globals.css'

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
})

const dancing = Dancing_Script({
  variable: '--font-dancing',
  subsets: ['latin'],
  display: 'swap',
  preload: false,
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
})

const notoArabic = Noto_Sans_Arabic({
  variable: '--font-arabic',
  subsets: ['arabic'],
  display: 'swap',
  preload: false,
})

export const metadata: Metadata = {
  title: "Yasmina's Bites — Little Bites of Happiness",
  description:
    'Artisan cookie cakes handcrafted with love. Chocolate chip, Biscoff caramel, pistachio, and more. Order yours today.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: "Yasmina's Bites",
  },
  icons: {
    icon: '/images/logo.svg',
    shortcut: '/images/logo.svg',
    apple: '/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#8B7020',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dancing.variable} ${inter.variable} ${notoArabic.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-cream text-brown antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
