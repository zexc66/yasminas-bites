'use client'

import { useState, useEffect, FormEvent } from 'react'
import Image from 'next/image'
import { useAuth } from '@/contexts/AuthContext'
import { db } from '@/lib/firebase'
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'

// ── Types ────────────────────────────────────────────────────────────────────

interface OrderItem {
  name: string
  quantity: number
  price: number
}

interface Order {
  id: string
  customerName: string
  phone: string
  createdAt: { seconds: number; nanoseconds: number } | Date | null
  address: string
  area: string
  items: OrderItem[]
  total: number
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled'
}

interface Review {
  id: string
  reviewerName: string
  rating: number
  product: string
  createdAt: { seconds: number; nanoseconds: number } | Date | null
  text: string
  approved: boolean
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function toDate(val: Order['createdAt'] | Review['createdAt']): Date | null {
  if (!val) return null
  if (val instanceof Date) return val
  if ('seconds' in val) return new Date(val.seconds * 1000)
  return null
}

function formatRelative(val: Order['createdAt'] | Review['createdAt']): string {
  const date = toDate(val)
  if (!date) return '—'
  const diff = Date.now() - date.getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins} minute${mins !== 1 ? 's' : ''} ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`
  const days = Math.floor(hours / 24)
  if (days === 1) return 'yesterday'
  if (days < 7) return `${days} days ago`
  return date.toLocaleDateString()
}

const STATUS_STYLES: Record<string, string> = {
  pending:   'bg-amber-100 text-amber-700',
  confirmed: 'bg-blue-100 text-blue-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
}

// ── Login Form ────────────────────────────────────────────────────────────────

function LoginForm() {
  const { signIn } = useAuth()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [busy, setBusy]         = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      await signIn(email, password)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Sign-in failed. Check your credentials.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-screen bg-choco flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <Image src="/images/logo.svg" alt="Yasmina's Bites" width={80} height={80} />
        </div>
        <h1 className="font-playfair text-2xl text-brown text-center mb-6">Admin Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="border border-gold-pale rounded-lg px-4 py-2.5 text-brown placeholder-taupe focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="border border-gold-pale rounded-lg px-4 py-2.5 text-brown placeholder-taupe focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <button
            type="submit"
            disabled={busy}
            className="bg-gold text-cream font-inter font-semibold rounded-lg py-2.5 hover:bg-gold-light transition-colors disabled:opacity-60"
          >
            {busy ? 'Signing in…' : 'Sign In'}
          </button>
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        </form>
      </div>
    </div>
  )
}

// ── Orders Tab ────────────────────────────────────────────────────────────────

function OrdersTab() {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    if (!db) return
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'), limit(50))
    const unsub = onSnapshot(q, snap => {
      setOrders(snap.docs.map(d => ({ id: d.id, ...d.data() } as Order)))
    })
    return unsub
  }, [])

  if (!db) {
    return (
      <p className="text-brown-light text-center py-16">
        Firebase not configured — orders will appear here once Firebase is set up.
      </p>
    )
  }

  // Stats
  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
  const pending      = orders.filter(o => o.status === 'pending').length
  const weekRevenue  = orders
    .filter(o => {
      const d = toDate(o.createdAt)
      return d && d.getTime() > sevenDaysAgo
    })
    .reduce((sum, o) => sum + (o.total ?? 0), 0)

  async function updateStatus(id: string, status: string) {
    if (!db) return
    await updateDoc(doc(db, 'orders', id), { status })
  }

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Orders', value: orders.length },
          { label: 'Pending',      value: pending },
          { label: 'Revenue This Week', value: `JD ${weekRevenue.toFixed(2)}` },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl p-4 border border-gold-pale/50 text-center">
            <p className="text-2xl font-playfair font-bold text-gold">{s.value}</p>
            <p className="text-sm text-brown-light mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Order list */}
      {orders.length === 0 && (
        <p className="text-brown-light text-center py-12">No orders yet.</p>
      )}
      {orders.map(order => (
        <div key={order.id} className="bg-white rounded-2xl p-5 border border-gold-pale/50 mb-4 shadow-sm">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="font-inter font-bold text-brown">{order.customerName}</p>
              <p className="text-sm text-brown-light">{order.phone} · {formatRelative(order.createdAt)}</p>
              <p className="text-sm text-brown-light mt-0.5">{order.address}{order.area ? `, ${order.area}` : ''}</p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUS_STYLES[order.status] ?? 'bg-gray-100 text-gray-600'}`}>
                {order.status}
              </span>
              <select
                value={order.status}
                onChange={e => updateStatus(order.id, e.target.value)}
                className="text-sm border border-gold-pale rounded-lg px-2 py-1 text-brown focus:outline-none focus:ring-2 focus:ring-gold"
              >
                {['pending', 'confirmed', 'delivered', 'cancelled'].map(s => (
                  <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                ))}
              </select>
              <a
                href={`https://wa.me/${order.phone.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* Items */}
          {Array.isArray(order.items) && order.items.length > 0 && (
            <ul className="mt-3 space-y-0.5">
              {order.items.map((item, i) => (
                <li key={i} className="text-sm text-brown">
                  {item.quantity}x {item.name}
                  {item.price != null ? ` — JD ${(item.price * item.quantity).toFixed(2)}` : ''}
                </li>
              ))}
            </ul>
          )}

          <p className="mt-3 font-inter font-semibold text-gold">
            JD {(order.total ?? 0).toFixed(2)}
          </p>
        </div>
      ))}
    </div>
  )
}

// ── Reviews Tab ───────────────────────────────────────────────────────────────

function ReviewsTab() {
  const [reviews, setReviews] = useState<Review[]>([])

  useEffect(() => {
    if (!db) return
    const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'), limit(50))
    const unsub = onSnapshot(q, snap => {
      setReviews(snap.docs.map(d => ({ id: d.id, ...d.data() } as Review)))
    })
    return unsub
  }, [])

  if (!db) {
    return (
      <p className="text-brown-light text-center py-16">Firebase not configured.</p>
    )
  }

  async function approve(id: string) {
    if (!db) return
    setReviews(prev => prev.map(r => r.id === id ? { ...r, approved: true } : r))
    await updateDoc(doc(db, 'reviews', id), { approved: true })
  }

  async function revoke(id: string) {
    if (!db) return
    setReviews(prev => prev.map(r => r.id === id ? { ...r, approved: false } : r))
    await updateDoc(doc(db, 'reviews', id), { approved: false })
  }

  async function remove(id: string) {
    if (!db) return
    setReviews(prev => prev.filter(r => r.id !== id))
    await deleteDoc(doc(db, 'reviews', id))
  }

  const pending  = reviews.filter(r => !r.approved)
  const approved = reviews.filter(r => r.approved)

  function ReviewCard({ review }: { review: Review }) {
    return (
      <div className="bg-white rounded-2xl p-5 border border-gold-pale/50 mb-4 shadow-sm">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="font-inter font-bold text-brown">{review.reviewerName}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-gold text-sm">{'★'.repeat(review.rating ?? 0)}{'☆'.repeat(5 - (review.rating ?? 0))}</span>
              {review.product && (
                <span className="text-xs bg-gold-pale text-brown-light px-2 py-0.5 rounded-full">{review.product}</span>
              )}
              <span className="text-xs text-brown-light">{formatRelative(review.createdAt)}</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {review.approved ? (
              <button
                onClick={() => revoke(review.id)}
                className="text-sm bg-amber-100 text-amber-700 px-3 py-1.5 rounded-lg hover:bg-amber-200 transition-colors"
              >
                Revoke
              </button>
            ) : (
              <button
                onClick={() => approve(review.id)}
                className="text-sm bg-green-100 text-green-700 px-3 py-1.5 rounded-lg hover:bg-green-200 transition-colors"
              >
                Approve
              </button>
            )}
            <button
              onClick={() => remove(review.id)}
              className="text-sm bg-red-100 text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-200 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
        {review.text && (
          <p className="mt-3 text-sm text-brown leading-relaxed">{review.text}</p>
        )}
      </div>
    )
  }

  return (
    <div>
      <section className="mb-8">
        <h2 className="font-playfair text-lg text-brown font-semibold mb-4">
          Pending Approval
          {pending.length > 0 && (
            <span className="ml-2 text-sm bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-inter font-normal">
              {pending.length}
            </span>
          )}
        </h2>
        {pending.length === 0 ? (
          <p className="text-brown-light text-sm">No pending reviews.</p>
        ) : (
          pending.map(r => <ReviewCard key={r.id} review={r} />)
        )}
      </section>

      <section>
        <h2 className="font-playfair text-lg text-brown font-semibold mb-4">
          Approved
          {approved.length > 0 && (
            <span className="ml-2 text-sm bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-inter font-normal">
              {approved.length}
            </span>
          )}
        </h2>
        {approved.length === 0 ? (
          <p className="text-brown-light text-sm">No approved reviews yet.</p>
        ) : (
          approved.map(r => <ReviewCard key={r.id} review={r} />)
        )}
      </section>
    </div>
  )
}

// ── Dashboard ─────────────────────────────────────────────────────────────────

function Dashboard() {
  const { user, logout } = useAuth()
  const [tab, setTab]    = useState<'orders' | 'reviews'>('orders')

  return (
    <div className="min-h-screen bg-cream-dark">
      {/* Top bar */}
      <header className="bg-choco text-cream h-14 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <Image src="/images/logo.svg" alt="Yasmina's Bites" width={32} height={32} />
          <span className="font-playfair text-lg">Admin Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-cream/70 hidden sm:block">{user?.email}</span>
          <button
            onClick={logout}
            className="text-sm border border-cream/30 px-3 py-1.5 rounded-lg hover:bg-cream/10 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Tab pills */}
      <nav className="bg-white border-b border-gold-pale/40 px-6 flex gap-2 pt-3">
        {(['orders', 'reviews'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-t-lg text-sm font-inter font-medium transition-colors capitalize ${
              tab === t
                ? 'bg-gold text-cream'
                : 'text-brown-light hover:text-brown'
            }`}
          >
            {t}
          </button>
        ))}
      </nav>

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        {tab === 'orders'  && <OrdersTab />}
        {tab === 'reviews' && <ReviewsTab />}
      </main>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-choco flex items-center justify-center">
        <div className="animate-spin border-4 border-gold rounded-full w-8 h-8 border-t-transparent" />
      </div>
    )
  }

  if (!user || user.email !== 'zexc66@gmail.com') {
    return <LoginForm />
  }

  return <Dashboard />
}
