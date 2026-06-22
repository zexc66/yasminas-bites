import { Navbar }       from '@/components/layout/Navbar'
import { Footer }       from '@/components/layout/Footer'
import { ProductCard }  from '@/components/shop/ProductCard'
import { products }     from '@/lib/products'

export default function ShopPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 min-h-screen bg-cream">
        <div className="max-w-7xl mx-auto px-6">

          {/* Header */}
          <div className="text-center py-14">
            <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-3">
              Fresh to Order
            </p>
            <h1 className="font-playfair text-5xl font-bold text-brown">
              Our Cookie Cakes
            </h1>
            <p className="mt-4 text-brown-light max-w-xl mx-auto leading-relaxed">
              Every cake is baked the day you order it. Pick your favourite,
              and we&apos;ll do the rest.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
