'use client'

import dynamic from 'next/dynamic'

const BundleSection       = dynamic(() => import('@/components/home/BundleSection').then(m => ({ default: m.BundleSection })), { ssr: false })
const SignatureSection    = dynamic(() => import('@/components/home/SignatureSection').then(m => ({ default: m.SignatureSection })), { ssr: false })
const DeliveryStrip       = dynamic(() => import('@/components/home/DeliveryStrip').then(m => ({ default: m.DeliveryStrip })), { ssr: false })
const TestimonialsSection = dynamic(() => import('@/components/home/TestimonialsSection').then(m => ({ default: m.TestimonialsSection })), { ssr: false })
const ReviewsSection      = dynamic(() => import('@/components/home/ReviewsSection').then(m => ({ default: m.ReviewsSection })), { ssr: false })
const EmailCapture        = dynamic(() => import('@/components/home/EmailCapture').then(m => ({ default: m.EmailCapture })), { ssr: false })

export function BelowFoldSections() {
  return (
    <>
      <BundleSection />
      <SignatureSection />
      <DeliveryStrip />
      <TestimonialsSection />
      <ReviewsSection />
      <EmailCapture />
    </>
  )
}
