import dynamic from 'next/dynamic'
import { Navbar }           from '@/components/layout/Navbar'
import { Footer }           from '@/components/layout/Footer'
import { HeroSection }      from '@/components/home/HeroSection'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { AboutSection }     from '@/components/home/AboutSection'
import { TrustBar }         from '@/components/layout/TrustBar'
import { MarqueeStrip }     from '@/components/ui/MarqueeStrip'
import { DeliveryZone }     from '@/components/home/DeliveryZone'

// Below-fold 'use client' components — ssr:false drops Framer Motion + Firebase from initial bundle
const BundleSection       = dynamic(() => import('@/components/home/BundleSection').then(m => ({ default: m.BundleSection })), { ssr: false })
const SignatureSection    = dynamic(() => import('@/components/home/SignatureSection').then(m => ({ default: m.SignatureSection })), { ssr: false })
const DeliveryStrip       = dynamic(() => import('@/components/home/DeliveryStrip').then(m => ({ default: m.DeliveryStrip })), { ssr: false })
const TestimonialsSection = dynamic(() => import('@/components/home/TestimonialsSection').then(m => ({ default: m.TestimonialsSection })), { ssr: false })
const ReviewsSection      = dynamic(() => import('@/components/home/ReviewsSection').then(m => ({ default: m.ReviewsSection })), { ssr: false })
const EmailCapture        = dynamic(() => import('@/components/home/EmailCapture').then(m => ({ default: m.EmailCapture })), { ssr: false })

export default function Home() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/images/cookie-biscoff.jpg"
        fetchPriority="high"
      />
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
