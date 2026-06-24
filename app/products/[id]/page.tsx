import { notFound }    from 'next/navigation'
import type { Metadata } from 'next'
import { Navbar }       from '@/components/layout/Navbar'
import { Footer }       from '@/components/layout/Footer'
import { ProductClient } from './ProductClient'
import { getProduct, products } from '@/lib/products'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yasminasbites.com'

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }))
}

export async function generateMetadata(
  props: PageProps<'/products/[id]'>
): Promise<Metadata> {
  const { id } = await props.params
  const product = getProduct(id)
  if (!product) return {}

  return {
    title: `${product.name} — Yasmina's Bites`,
    description: product.description,
    openGraph: {
      title: `${product.name} — Yasmina's Bites`,
      description: product.description,
      images: [{ url: product.image, width: 800, height: 800, alt: product.name }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} — Yasmina's Bites`,
      description: product.description,
      images: [product.image],
    },
  }
}

export default async function ProductPage(props: PageProps<'/products/[id]'>) {
  const { id } = await props.params
  const product = getProduct(id)
  if (!product) notFound()

  const productSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: `${SITE_URL}${product.image}`,
    brand: { '@type': 'Brand', name: "Yasmina's Bites" },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'JOD',
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: "Yasmina's Bites" },
    },
  }

  if (product.rating && product.reviewCount) {
    productSchema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <Navbar />
      <main className="pt-28 pb-20 min-h-screen bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <ProductClient product={product} />
        </div>
      </main>
      <Footer />
    </>
  )
}
