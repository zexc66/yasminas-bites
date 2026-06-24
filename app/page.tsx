import { Navbar }              from '@/components/layout/Navbar'
import { Footer }              from '@/components/layout/Footer'
import { HeroSection }         from '@/components/home/HeroSection'
import { FeaturedProducts }    from '@/components/home/FeaturedProducts'
import { AboutSection }        from '@/components/home/AboutSection'
import { TrustBar }            from '@/components/layout/TrustBar'
import { MarqueeStrip }        from '@/components/ui/MarqueeStrip'
import { DeliveryZone }        from '@/components/home/DeliveryZone'
import { BelowFoldSections }   from '@/components/home/BelowFoldSections'

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'Bakery',
  name: "Yasmina's Bites",
  description: 'Artisan cookie cakes handcrafted with love. Baked fresh to order in Amman, Jordan.',
  url: 'https://yasminasbites.com',
  telephone: '+962789006574',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Amman',
    addressCountry: 'JO',
  },
  servesCuisine: 'Bakery',
  priceRange: 'JD 14–JD 24',
  currenciesAccepted: 'JOD',
  paymentAccepted: 'Cash, Credit Card',
  openingHours: 'Mo-Su 09:00-21:00',
  sameAs: ['https://instagram.com/yasminasbites'],
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Navbar />
      <main>
        <HeroSection />
        <MarqueeStrip />
        <TrustBar />
        <FeaturedProducts />
        <BelowFoldSections />
        <DeliveryZone />
        <AboutSection />
      </main>
      <Footer />
    </>
  )
}
