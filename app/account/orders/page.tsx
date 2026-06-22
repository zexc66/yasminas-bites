﻿'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore'
import { useAuth } from '@/contexts/AuthContext'
import { db }      from '@/lib/firebase'
import { Navbar }  from '@/components/layout/Navbar'
import { Footer }  from '@/components/layout/Footer'
import { Order }   from '@/types'
import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'

export default function OrdersPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    if (!loading && !user) router.push('/auth/login')
  }, [user, loading, router])

  useEffect(() => {
    if (!user) return

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

  if (loading || !user) return null

  const statusColors: Record<string, string> = {
    pending:    'bg-gold-pale text-brown',
    processing: 'bg-blue-50 text-blue-700',
    shipped:    'bg-purple-50 text-purple-700',
    delivered:  'bg-green-50 text-green-700',
  }

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 min-h-screen bg-cream">
        <div className="max-w-3xl mx-auto px-6">

          <h1 className="font-playfair text-4xl font-bold text-brown mb-10">My Orders</h1>

          {fetching ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 rounded-full border-2 border-gold border-t-transparent animate-spin" />
            </div>
          ) : orders.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-20 text-center">
              <ShoppingBag size={48} className="text-gold-pale" />
              <p className="text-brown-light">No orders yet. Time to treat yourself!</p>
              <Link href="/shop" className="bg-gold text-cream px-7 py-3 rounded-full font-semibold text-sm hover:bg-gold-light transition-colors">
                Shop Now
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-xs text-brown-light mb-1">Order #{order.id.slice(0, 8).toUpperCase()}</p>
                      <p className="text-xs text-brown-light">{new Date(order.createdAt).toLocaleDateString('en-GB')}</p>
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${statusColors[order.status] ?? ''}`}>
                      {order.status}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5 mb-4">
                    {order.items.map(({ product, quantity }) => (
                      <div key={product.id} className="flex justify-between text-sm text-brown-light">
                        <span>{product.name} × {quantity}</span>
                        <span className="font-semibold text-brown">JD {(product.price * quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gold-pale pt-3 flex justify-between font-bold text-brown">
                    <span>Total</span>
                    <span className="text-gold">JD {order.total.toFixed(2)}</span>
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
