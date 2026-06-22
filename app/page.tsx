import { Navbar }              from '@/components/layout/Navbar'
import { Footer }              from '@/components/layout/Footer'
import { HeroSection }         from '@/components/home/HeroSection'
import { FeaturedProducts }    from '@/components/home/FeaturedProducts'
import { AboutSection }        from '@/components/home/AboutSection'
import { TrustBar }            from '@/components/layout/TrustBar'
import { DeliveryStrip }       from '@/components/home/DeliveryStrip'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { ReviewsSection }      from '@/components/home/ReviewsSection'
import { EmailCapture }        from '@/components/home/EmailCapture'
import { MarqueeStrip }        from '@/components/ui/MarqueeStrip'
import { SignatureSection }    from '@/components/home/SignatureSection'
import { BundleSection }       from '@/components/home/BundleSection'
import { DeliveryZone }        from '@/components/home/DeliveryZone'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <MarqueeStrip />
        <TrustBar />
        <FeaturedProducts />
        <BundleSection />
        <SignatureSection />
        <DeliveryStrip />
        <DeliveryZone />
        <TestimonialsSection />
        <ReviewsSection />
        <AboutSection />
        <EmailCapture />
      </main>
      <Footer />
    </>
  )
}
