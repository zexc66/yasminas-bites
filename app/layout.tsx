import type { Metadata } from 'next'
import { Playfair_Display, Dancing_Script, Inter } from 'next/font/google'
import { Providers } from '@/components/Providers'
import './globals.css'

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
})

const dancing = Dancing_Script({
  variable: '--font-dancing',
  subsets: ['latin'],
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Yasmina's Bites — Little Bites of Happiness",
  description:
    'Artisan cookie cakes handcrafted with love. Chocolate chip, Biscoff caramel, pistachio, and more. Order yours today.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dancing.variable} ${inter.variable}`}
    >
      <body className="bg-cream text-brown antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
