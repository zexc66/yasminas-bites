'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore'
import Image from 'next/image'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { ShoppingBag, RotateCcw } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { db } from '@/lib/firebase'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { useCart } from '@/lib/cartStore'
import { useLang } from '@/contexts/LanguageContext'
import { Order } from '@/types'

const STATUS_KEY: Record<string, 'acc_status_pending' | 'acc_status_processing' | 'acc_status_shipped' | 'acc_status_delivered'> = {
  pending:    'acc_status_pending',
  processing: 'acc_status_processing',
  shipped:    'acc_status_shipped',
  delivered:  'acc_status_delivered',
}

const STATUS_COLOR: Record<string, string> = {
  pending:    'bg-gold-pale text-brown',
  processing: 'bg-blue-50 text-blue-700',
  shipped:    'bg-purple-50 text-purple-700',
  delivered:  'bg-green-50 text-green-700',
}

export default function OrdersPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const { t } = useLang()
  const { clearCart, addItem } = useCart()
  const [orders, setOrders] = useState<Order[]>([])
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    if (!loading && !user) router.push('/auth/login')
  }, [user, loading, router])

  useEffect(() => {
    if (!user || !db) return

    const q = query(
      collection(db, 'orders'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    )

    getDocs(q)
      .then((snap) => {
        setOrders(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Order)))
      })
      .finally(() => setFetching(false))
  }, [user])

  const handleReorder = (order: Order) => {
    clearCart()
    order.items.forEach(({ product, quantity }) => {
      // Gracefully handle old Firestore records that predate nameAr/descriptionAr fields
      const safeProduct = {
        ...product,
        nameAr: product.nameAr ?? product.name,
        descriptionAr: product.descriptionAr ?? product.description,
      }
      addItem(safeProduct, quantity)
    })
    toast.success(t('acc_reorder_toast'))
    router.push('/cart')
  }

  if (loading || !user) return null

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 min-h-screen bg-cream">
        <div className="max-w-3xl mx-auto px-6">

          <h1 className="font-playfair text-4xl font-bold text-brown mb-10">
            {t('acc_orders_title')}
          </h1>

          {fetching ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 rounded-full border-2 border-gold border-t-transparent animate-spin" />
            </div>
          ) : orders.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-20 text-center">
              <ShoppingBag size={48} className="text-gold-pale" />
              <p className="text-brown-light">{t('acc_orders_empty')}</p>
              <Link
                href="/shop"
                className="bg-gold text-cream px-7 py-3 rounded-full font-semibold text-sm hover:bg-gold-light transition-colors"
              >
                {t('acc_orders_shop')}
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-2xl p-6 shadow-sm">

                  {/* Order header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-xs text-brown-light mb-1">
                        {t('acc_order_no')}{order.id.slice(0, 8).toUpperCase()}
                      </p>
                      <p className="text-xs text-brown-light">
                        {new Date(order.createdAt).toLocaleDateString('en-GB')}
                      </p>
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${STATUS_COLOR[order.status] ?? 'bg-gold-pale text-brown'}`}>
                      {t(STATUS_KEY[order.status] ?? 'acc_status_pending')}
                    </span>
                  </div>

                  {/* Line items with thumbnails */}
                  <div className="flex flex-col gap-2 mb-4">
                    {order.items.map(({ product, quantity }) => (
                      <div key={product.id} className="flex items-center justify-between text-sm text-brown-light gap-3">
                        <div className="flex items-center gap-2 min-w-0">
                          {product.image && (
                            <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0 bg-gold-pale">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                                sizes="32px"
                              />
                            </div>
                          )}
                          <span className="truncate">{product.name} × {quantity}</span>
                        </div>
                        <span className="font-semibold text-brown shrink-0">
                          JD {(product.price * quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Footer: total + reorder */}
                  <div className="border-t border-gold-pale pt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-brown">
                      <span className="text-sm font-medium text-brown-light">Total</span>
                      <span className="text-gold">JD {order.total.toFixed(2)}</span>
                    </div>
                    <button
                      onClick={() => handleReorder(order)}
                      className="flex items-center gap-1.5 text-xs font-semibold text-gold border border-gold px-4 py-1.5 rounded-full hover:bg-gold hover:text-cream transition-colors cursor-pointer"
                    >
                      <RotateCcw size={12} />
                      {t('acc_reorder')}
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
