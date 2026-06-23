import { Navbar }              from '@/components/layout/Navbar'
import { Footer }              from '@/components/layout/Footer'
import { HeroSection }         from '@/components/home/HeroSection'
import { FeaturedProducts }    from '@/components/home/FeaturedProducts'
import { AboutSection }        from '@/components/home/AboutSection'
import { TrustBar }            from '@/components/layout/TrustBar'
import { MarqueeStrip }        from '@/components/ui/MarqueeStrip'
import { DeliveryZone }        from '@/components/home/DeliveryZone'
import { BelowFoldSections }   from '@/components/home/BelowFoldSections'

export default function Home() {
  return (
    <>
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
