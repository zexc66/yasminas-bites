import type { Metadata } from 'next'
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
  icons: {
    icon: '/images/logo.svg',
    shortcut: '/images/logo.svg',
    apple: '/images/logo.svg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dancing.variable} ${inter.variable} ${notoArabic.variable}`}
    >
      <body className="bg-cream text-brown antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
