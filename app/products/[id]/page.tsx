import { notFound }    from 'next/navigation'
import { Navbar }       from '@/components/layout/Navbar'
import { Footer }       from '@/components/layout/Footer'
import { ProductClient } from './ProductClient'
import { getProduct, products } from '@/lib/products'

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }))
}

export default async function ProductPage(props: PageProps<'/products/[id]'>) {
  const { id } = await props.params
  const product = getProduct(id)
  if (!product) notFound()

  return (
    <>
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
