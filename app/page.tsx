import { Navbar }              from '@/components/layout/Navbar'
import { Footer }              from '@/components/layout/Footer'
import { HeroSection }         from '@/components/home/HeroSection'
import { FeaturedProducts }    from '@/components/home/FeaturedProducts'
import { AboutSection }        from '@/components/home/AboutSection'
import { TrustBar }            from '@/components/layout/TrustBar'
import { DeliveryStrip }       from '@/components/home/DeliveryStrip'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { EmailCapture }        from '@/components/home/EmailCapture'
import { MarqueeStrip }        from '@/components/ui/MarqueeStrip'
import { SignatureSection }    from '@/components/home/SignatureSection'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <MarqueeStrip />
        <TrustBar />
        <FeaturedProducts />
        <SignatureSection />
        <DeliveryStrip />
        <TestimonialsSection />
        <AboutSection />
        <EmailCapture />
      </main>
      <Footer />
    </>
  )
}
