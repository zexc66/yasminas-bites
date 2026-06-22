'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Navbar }  from '@/components/layout/Navbar'
import { Footer }  from '@/components/layout/Footer'
import { ShoppingBag, LogOut, User } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AccountPage() {
  const { user, loading, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) router.push('/auth/login')
  }, [user, loading, router])

  if (loading || !user) return null

  const handleLogout = async () => {
    await logout()
    toast.success('Signed out')
    router.push('/')
  }

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 min-h-screen bg-cream">
        <div className="max-w-2xl mx-auto px-6">

          {/* Header */}
          <div className="flex items-center gap-4 mb-10">
            <div className="w-16 h-16 rounded-full bg-gold-pale flex items-center justify-center">
              <User size={28} className="text-gold" />
            </div>
            <div>
              <h1 className="font-playfair text-2xl font-bold text-brown">
                {user.displayName ?? 'My Account'}
              </h1>
              <p className="text-sm text-brown-light">{user.email}</p>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <Link
              href="/account/orders"
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-full bg-gold-pale flex items-center justify-center group-hover:bg-gold transition-colors">
                <ShoppingBag size={20} className="text-gold group-hover:text-cream transition-colors" />
              </div>
              <div>
                <p className="font-semibold text-brown">My Orders</p>
                <p className="text-xs text-brown-light">Track your orders</p>
              </div>
            </Link>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-brown-light hover:text-red-500 transition-colors"
          >
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </main>
      <Footer />
    </>
  )
}
