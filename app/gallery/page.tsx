import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { GalleryContent } from '@/components/gallery/GalleryContent'

export const metadata = {
  title: "Gallery — Yasmina's Bites",
  description: 'Browse our full collection of handcrafted artisan cookie cakes. Each creation is baked fresh to order in Amman, Jordan.',
}

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 min-h-screen bg-cream">
        <GalleryContent />
      </main>
      <Footer />
    </>
  )
}
