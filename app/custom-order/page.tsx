'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronRight,
  ChevronLeft,
  Check,
  Cake,
  MapPin,
  CalendarDays,
  MessageSquare,
  Send,
  Sparkles,
} from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { useLang } from '@/contexts/LanguageContext'
import { TranslationKey } from '@/lib/i18n'

// ─── Types ────────────────────────────────────────────────────────────────────

type BaseOption = {
  id: string
  name: string
  price: string
  image: string | null
  description: string
}

type OrderState = {
  base: string
  occasion: string
  size: string
  giftMessage: string
  deliveryType: 'pickup' | 'delivery'
  address: string
  area: string
  preferredDate: string
  preferredTime: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const BASE_OPTIONS: BaseOption[] = [
  {
    id: 'biscoff',
    name: 'Biscoff Caramel',
    price: 'JD 22',
    image: '/images/cookie-biscoff.jpg',
    description: 'Caramelised Biscoff spread on a golden cookie base',
  },
  {
    id: 'pistachio-drizzle',
    name: 'Pistachio Drizzle',
    price: 'JD 24',
    image: '/images/cookie-pistachio.jpg',
    description: 'Rich pistachio cream with a golden drizzle finish',
  },
  {
    id: 'pistachio-molten',
    name: 'Pistachio Molten',
    price: 'JD 14',
    image: '/images/cookie-molten-pistachio.png',
    description: 'Warm molten pistachio centre, crisp shell',
  },
  {
    id: 'pop-cakes',
    name: 'Pop Cakes Box',
    price: 'JD 16',
    image: '/images/cookie-pop-cake.png',
    description: 'Assorted handcrafted pop cakes, perfectly boxed',
  },
  {
    id: 'surprise',
    name: 'Surprise Me',
    price: 'Chef decides',
    image: null,
    description: "Let Yasmina choose today's most beautiful creation",
  },
]

const OCCASION_KEYS: { value: string; key: TranslationKey }[] = [
  { value: 'Birthday', key: 'co_occ_birthday' },
  { value: 'Anniversary', key: 'co_occ_anniversary' },
  { value: "Valentine's", key: 'co_occ_valentine' },
  { value: 'Eid', key: 'co_occ_eid' },
  { value: 'Corporate', key: 'co_occ_corporate' },
  { value: 'Just Because', key: 'co_occ_just' },
  { value: 'Other', key: 'co_occ_other' },
]

const SIZE_KEYS: { id: string; labelKey: TranslationKey; detailKey: TranslationKey }[] = [
  { id: 'small',  labelKey: 'co_sz_small',  detailKey: 'co_sz_small_d' },
  { id: 'medium', labelKey: 'co_sz_medium', detailKey: 'co_sz_medium_d' },
  { id: 'large',  labelKey: 'co_sz_large',  detailKey: 'co_sz_large_d' },
]

const AREAS = [
  'Abdoun',
  'Sweifieh',
  'Khalda',
  'Shmeisani',
  'Mecca Street',
  'Jabal Amman',
  'Other',
]

const TIME_KEYS: { id: string; labelKey: TranslationKey; detailKey: TranslationKey }[] = [
  { id: 'morning',   labelKey: 'co_morning',   detailKey: 'co_morning_h' },
  { id: 'afternoon', labelKey: 'co_afternoon', detailKey: 'co_afternoon_h' },
  { id: 'evening',   labelKey: 'co_evening',   detailKey: 'co_evening_h' },
]

const STEP_KEYS: { titleKey: TranslationKey; subtitleKey: TranslationKey }[] = [
  { titleKey: 'co_s1_title', subtitleKey: 'co_s1_sub' },
  { titleKey: 'co_s2_title', subtitleKey: 'co_s2_sub' },
  { titleKey: 'co_s3_title', subtitleKey: 'co_s3_sub' },
  { titleKey: 'co_s4_title', subtitleKey: 'co_s4_sub' },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getTomorrow(): string {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toISOString().split('T')[0]
}

function buildWhatsAppMessage(order: OrderState): string {
  const base = BASE_OPTIONS.find((b) => b.id === order.base)
  const sizeObj = SIZE_KEYS.find((s) => s.id === order.size)
  const timeObj = TIME_KEYS.find((t) => t.id === order.preferredTime)

  const rawLines: string[] = [
    "Hello Yasmina's Bites! I'd like to place a custom order:",
    '',
    `*Base:* ${base?.name ?? ''} — ${base?.price ?? ''}`,
    `*Occasion:* ${order.occasion}`,
    order.size ? `*Size:* ${sizeObj?.id ?? ''} (${sizeObj?.id ?? ''})` : '',
    order.giftMessage ? `*Gift Message:* ${order.giftMessage}` : '',
    '',
    `*Delivery:* ${order.deliveryType === 'pickup' ? 'Pickup' : 'Delivery — Amman'}`,
    order.deliveryType === 'delivery' && order.area ? `*Area:* ${order.area}` : '',
    order.deliveryType === 'delivery' && order.address ? `*Address:* ${order.address}` : '',
    `*Date:* ${order.preferredDate}`,
    order.preferredTime ? `*Time:* ${timeObj?.id ?? ''} (${timeObj?.id ?? ''})` : '',
    '',
    'Thank you!',
  ]

  const lines = rawLines
    .filter((l, i) => !(l === '' && rawLines[i - 1] === ''))
    .join('\n')

  return `https://wa.me/962789006574?text=${encodeURIComponent(lines)}`
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProgressBar({ step }: { step: number }) {
  const { t } = useLang()

  return (
    <div className="flex items-center gap-0 mb-10">
      {STEP_KEYS.map((meta, i) => {
        const num      = i + 1
        const done     = num < step
        const current  = num === step

        return (
          <div key={i} className="flex items-center flex-1 last:flex-none">
            {/* Circle */}
            <div className="relative flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all duration-300 ${
                  done
                    ? 'bg-gold border-gold text-cream'
                    : current
                    ? 'bg-cream border-gold text-gold shadow-[0_0_0_4px_rgba(139,112,32,0.12)]'
                    : 'bg-cream border-taupe text-taupe'
                }`}
              >
                {done ? <Check size={15} strokeWidth={2.5} /> : num}
              </div>
              <span
                className={`absolute top-11 text-[10px] font-medium whitespace-nowrap hidden sm:block ${
                  done || current ? 'text-gold' : 'text-taupe'
                }`}
              >
                {t(meta.titleKey).split(' ')[0]}
              </span>
            </div>

            {/* Connector */}
            {i < STEP_KEYS.length - 1 && (
              <div className="flex-1 h-0.5 mx-1 relative overflow-hidden bg-gold-pale rounded-full">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gold rounded-full"
                  initial={false}
                  animate={{ width: done ? '100%' : '0%' }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── Step 1 ───────────────────────────────────────────────────────────────────

function Step1({
  order,
  setOrder,
  error,
}: {
  order: OrderState
  setOrder: (o: OrderState) => void
  error: string
}) {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {BASE_OPTIONS.map((opt) => {
          const selected = order.base === opt.id
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => setOrder({ ...order, base: opt.id })}
              className={`relative text-left rounded-2xl border-2 overflow-hidden transition-all duration-200 cursor-pointer group focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold ${
                selected
                  ? 'border-gold bg-gold-pale/30 shadow-[0_4px_20px_rgba(139,112,32,0.18)]'
                  : 'border-gold-pale/60 bg-cream hover:border-gold hover:shadow-md'
              }`}
              aria-pressed={selected}
            >
              {/* Image */}
              {opt.image ? (
                <div className="relative w-full h-44 overflow-hidden">
                  <Image
                    src={opt.image}
                    alt={opt.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brown/30 to-transparent" />
                </div>
              ) : (
                <div className="w-full h-44 bg-gold-pale/40 flex items-center justify-center">
                  <Sparkles size={40} className="text-gold/50" />
                </div>
              )}

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-playfair font-semibold text-brown text-base leading-tight">
                    {opt.name}
                  </p>
                  {/* Radio dot */}
                  <span
                    className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${
                      selected ? 'border-gold bg-gold' : 'border-taupe bg-transparent'
                    }`}
                  >
                    {selected && <Check size={11} className="text-cream" strokeWidth={3} />}
                  </span>
                </div>
                <p className="text-xs text-brown-light mt-1 leading-relaxed">{opt.description}</p>
                <p
                  className={`text-sm font-semibold mt-2.5 ${
                    selected ? 'text-gold' : 'text-gold-light'
                  }`}
                >
                  {opt.price}
                </p>
              </div>
            </button>
          )
        })}
      </div>
      {error && (
        <p className="mt-3 text-sm text-red-600 font-medium">{error}</p>
      )}
    </div>
  )
}

// ─── Step 2 ───────────────────────────────────────────────────────────────────

function Step2({
  order,
  setOrder,
  errors,
}: {
  order: OrderState
  setOrder: (o: OrderState) => void
  errors: Record<string, string>
}) {
  const { t } = useLang()
  const isSurprise = order.base === 'surprise'

  return (
    <div className="space-y-8">
      {/* Occasion chips */}
      <div>
        <label className="block text-sm font-semibold text-brown mb-3">
          {t('co_occasion_q')} <span className="text-red-500">*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {OCCASION_KEYS.map((occ) => {
            const selected = order.occasion === occ.value
            return (
              <button
                key={occ.value}
                type="button"
                onClick={() => setOrder({ ...order, occasion: occ.value })}
                className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all duration-150 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold ${
                  selected
                    ? 'border-gold bg-gold text-cream shadow-sm'
                    : 'border-gold-pale text-brown-light hover:border-gold hover:text-brown bg-cream'
                }`}
                aria-pressed={selected}
              >
                {t(occ.key)}
              </button>
            )
          })}
        </div>
        {errors.occasion && (
          <p className="mt-2 text-sm text-red-600">{errors.occasion}</p>
        )}
      </div>

      {/* Size — hidden for Surprise Me and Pop Cakes */}
      {!isSurprise && order.base !== 'pop-cakes' && (
        <div>
          <label className="block text-sm font-semibold text-brown mb-3">
            {t('co_size_label')} <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-3">
            {SIZE_KEYS.map((sz) => {
              const selected = order.size === sz.id
              return (
                <button
                  key={sz.id}
                  type="button"
                  onClick={() => setOrder({ ...order, size: sz.id })}
                  className={`py-4 px-3 rounded-xl border-2 text-center transition-all duration-150 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold ${
                    selected
                      ? 'border-gold bg-gold-pale/30 shadow-sm'
                      : 'border-gold-pale/60 bg-cream hover:border-gold'
                  }`}
                  aria-pressed={selected}
                >
                  <p
                    className={`font-semibold text-sm ${
                      selected ? 'text-gold' : 'text-brown'
                    }`}
                  >
                    {t(sz.labelKey)}
                  </p>
                  <p className="text-xs text-brown-light mt-0.5">{t(sz.detailKey)}</p>
                </button>
              )
            })}
          </div>
          {errors.size && (
            <p className="mt-2 text-sm text-red-600">{errors.size}</p>
          )}
        </div>
      )}

      {/* Gift message */}
      <div>
        <label
          htmlFor="gift-message"
          className="block text-sm font-semibold text-brown mb-2"
        >
          <MessageSquare size={14} className="inline mr-1.5 text-taupe" aria-hidden />
          {t('co_gift_msg')}{' '}
          <span className="font-normal text-taupe">{t('co_optional')}</span>
        </label>
        <textarea
          id="gift-message"
          rows={3}
          maxLength={200}
          value={order.giftMessage}
          onChange={(e) => setOrder({ ...order, giftMessage: e.target.value })}
          placeholder={t('co_gift_ph')}
          className="w-full px-4 py-3 rounded-xl border-2 border-gold-pale/60 bg-cream text-brown text-sm placeholder:text-taupe focus:outline-none focus:border-gold transition-colors duration-150 resize-none"
        />
        <p className="mt-1 text-xs text-taupe text-right">
          {order.giftMessage.length}/200
        </p>
      </div>
    </div>
  )
}

// ─── Step 3 ───────────────────────────────────────────────────────────────────

function Step3({
  order,
  setOrder,
  errors,
}: {
  order: OrderState
  setOrder: (o: OrderState) => void
  errors: Record<string, string>
}) {
  const { t } = useLang()

  return (
    <div className="space-y-8">
      {/* Delivery type */}
      <div>
        <label className="block text-sm font-semibold text-brown mb-3">
          {t('co_how_receive')} <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          {(['pickup', 'delivery'] as const).map((type) => {
            const selected = order.deliveryType === type
            const label    = type === 'pickup' ? t('co_pickup') : t('co_delivery_amman')
            const hint     = type === 'pickup' ? t('co_pickup_hint') : t('co_delivery_hint')
            return (
              <button
                key={type}
                type="button"
                onClick={() => setOrder({ ...order, deliveryType: type, address: '', area: '' })}
                className={`py-4 px-4 rounded-xl border-2 text-left transition-all duration-150 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold ${
                  selected
                    ? 'border-gold bg-gold-pale/30 shadow-sm'
                    : 'border-gold-pale/60 bg-cream hover:border-gold'
                }`}
                aria-pressed={selected}
              >
                <p
                  className={`font-semibold text-sm ${
                    selected ? 'text-gold' : 'text-brown'
                  }`}
                >
                  {label}
                </p>
                <p className="text-xs text-brown-light mt-0.5">{hint}</p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Delivery address fields — conditional */}
      {order.deliveryType === 'delivery' && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="space-y-4"
        >
          {/* Area dropdown */}
          <div>
            <label
              htmlFor="area"
              className="block text-sm font-semibold text-brown mb-2"
            >
              <MapPin size={14} className="inline mr-1.5 text-taupe" aria-hidden />
              {t('co_area')} <span className="text-red-500">*</span>
            </label>
            <select
              id="area"
              value={order.area}
              onChange={(e) => setOrder({ ...order, area: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-gold-pale/60 bg-cream text-brown text-sm focus:outline-none focus:border-gold transition-colors duration-150 cursor-pointer appearance-none"
            >
              <option value="">{t('co_select_area')}</option>
              {AREAS.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
            {errors.area && (
              <p className="mt-1.5 text-sm text-red-600">{errors.area}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-semibold text-brown mb-2"
            >
              {t('co_address')} <span className="text-red-500">*</span>
            </label>
            <input
              id="address"
              type="text"
              value={order.address}
              onChange={(e) => setOrder({ ...order, address: e.target.value })}
              placeholder={t('co_address_ph')}
              className="w-full px-4 py-3 rounded-xl border-2 border-gold-pale/60 bg-cream text-brown text-sm placeholder:text-taupe focus:outline-none focus:border-gold transition-colors duration-150"
            />
            {errors.address && (
              <p className="mt-1.5 text-sm text-red-600">{errors.address}</p>
            )}
          </div>
        </motion.div>
      )}

      {/* Preferred date */}
      <div>
        <label
          htmlFor="preferred-date"
          className="block text-sm font-semibold text-brown mb-2"
        >
          <CalendarDays size={14} className="inline mr-1.5 text-taupe" aria-hidden />
          {t('co_date')} <span className="text-red-500">*</span>
        </label>
        <input
          id="preferred-date"
          type="date"
          min={getTomorrow()}
          value={order.preferredDate}
          onChange={(e) => setOrder({ ...order, preferredDate: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border-2 border-gold-pale/60 bg-cream text-brown text-sm focus:outline-none focus:border-gold transition-colors duration-150 cursor-pointer"
        />
        {errors.preferredDate && (
          <p className="mt-1.5 text-sm text-red-600">{errors.preferredDate}</p>
        )}
      </div>

      {/* Preferred time */}
      <div>
        <label className="block text-sm font-semibold text-brown mb-3">
          {t('co_time_label')} <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-3 gap-3">
          {TIME_KEYS.map((slot) => {
            const selected = order.preferredTime === slot.id
            return (
              <button
                key={slot.id}
                type="button"
                onClick={() => setOrder({ ...order, preferredTime: slot.id })}
                className={`py-4 px-2 rounded-xl border-2 text-center transition-all duration-150 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold ${
                  selected
                    ? 'border-gold bg-gold-pale/30 shadow-sm'
                    : 'border-gold-pale/60 bg-cream hover:border-gold'
                }`}
                aria-pressed={selected}
              >
                <p
                  className={`font-semibold text-sm ${
                    selected ? 'text-gold' : 'text-brown'
                  }`}
                >
                  {t(slot.labelKey)}
                </p>
                <p className="text-xs text-brown-light mt-0.5">{t(slot.detailKey)}</p>
              </button>
            )
          })}
        </div>
        {errors.preferredTime && (
          <p className="mt-2 text-sm text-red-600">{errors.preferredTime}</p>
        )}
      </div>
    </div>
  )
}

// ─── Step 4 ───────────────────────────────────────────────────────────────────

function ReviewRow({ label, value }: { label: string; value: string }) {
  if (!value) return null
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-gold-pale/50 last:border-0">
      <span className="text-sm text-brown-light shrink-0 w-32">{label}</span>
      <span className="text-sm font-medium text-brown text-right">{value}</span>
    </div>
  )
}

function Step4({ order }: { order: OrderState }) {
  const { t } = useLang()
  const base = BASE_OPTIONS.find((b) => b.id === order.base)
  const sizeObj = SIZE_KEYS.find((s) => s.id === order.size)
  const timeObj = TIME_KEYS.find((ti) => ti.id === order.preferredTime)

  return (
    <div>
      <div className="rounded-2xl border-2 border-gold bg-gold-pale/10 overflow-hidden">
        {/* Header */}
        <div className="bg-gold-pale/30 px-6 py-4 border-b border-gold/20">
          <p className="font-playfair text-lg font-semibold text-brown">
            {t('co_review_title')}
          </p>
          <p className="text-xs text-brown-light mt-0.5">
            {t('co_review_sub')}
          </p>
        </div>

        {/* Rows */}
        <div className="px-6 py-2">
          <ReviewRow label={t('co_row_base')}     value={`${base?.name ?? ''} — ${base?.price ?? ''}`} />
          <ReviewRow label={t('co_row_occasion')} value={order.occasion} />
          {sizeObj && (
            <ReviewRow label={t('co_row_size')} value={`${t(sizeObj.labelKey)} (${t(sizeObj.detailKey)})`} />
          )}
          {order.giftMessage && (
            <ReviewRow label={t('co_row_gift')} value={`"${order.giftMessage}"`} />
          )}
          <ReviewRow
            label={t('co_row_delivery')}
            value={
              order.deliveryType === 'pickup'
                ? t('co_row_pickup')
                : `${t('co_row_delivery_amman')}${order.area ? ' — ' + order.area : ''}`
            }
          />
          {order.deliveryType === 'delivery' && order.address && (
            <ReviewRow label={t('co_row_address')} value={order.address} />
          )}
          <ReviewRow label={t('co_row_date')} value={order.preferredDate} />
          {timeObj && (
            <ReviewRow label={t('co_row_time')} value={`${t(timeObj.labelKey)} (${t(timeObj.detailKey)})`} />
          )}
        </div>
      </div>

      {/* Note */}
      <p className="mt-5 text-xs text-center text-brown-light leading-relaxed px-4">
        {t('co_send_note')}
      </p>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

const TOTAL_STEPS = 4

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -60 : 60,
    opacity: 0,
  }),
}

export default function CustomOrderPage() {
  const { t } = useLang()
  const [step, setStep]   = useState(1)
  const [dir, setDir]     = useState(1)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [order, setOrder] = useState<OrderState>({
    base:          '',
    occasion:      '',
    size:          '',
    giftMessage:   '',
    deliveryType:  'pickup',
    address:       '',
    area:          '',
    preferredDate: '',
    preferredTime: '',
  })

  // ── Validation ──────────────────────────────────────────────────────────────

  function validate(currentStep: number): boolean {
    const errs: Record<string, string> = {}

    if (currentStep === 1) {
      if (!order.base) errs.base = t('co_err_base')
    }

    if (currentStep === 2) {
      if (!order.occasion) errs.occasion = t('co_err_occasion')
      if (
        order.base !== 'surprise' &&
        order.base !== 'pop-cakes' &&
        !order.size
      ) {
        errs.size = t('co_err_size')
      }
    }

    if (currentStep === 3) {
      if (!order.preferredDate) errs.preferredDate = t('co_err_date')
      if (!order.preferredTime) errs.preferredTime = t('co_err_time')
      if (order.deliveryType === 'delivery') {
        if (!order.area)    errs.area    = t('co_err_area')
        if (!order.address) errs.address = t('co_err_address')
      }
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function goNext() {
    if (!validate(step)) return
    setDir(1)
    setErrors({})
    setStep((s) => Math.min(s + 1, TOTAL_STEPS))
  }

  function goBack() {
    setDir(-1)
    setErrors({})
    setStep((s) => Math.max(s - 1, 1))
  }

  function handleSend() {
    window.open(buildWhatsAppMessage(order), '_blank', 'noopener,noreferrer')
  }

  const meta = STEP_KEYS[step - 1]

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-cream pt-28 pb-20 px-4">
        <div className="max-w-2xl mx-auto">

          {/* Page heading */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-gold-pale/50 border border-gold-pale text-gold-light text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
              <Cake size={13} aria-hidden />
              {t('co_label')}
            </div>
            <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-brown leading-tight">
              {t('co_heading')}
            </h1>
            <p className="text-brown-light text-sm mt-2 max-w-sm mx-auto">
              {t('co_sub')}
            </p>
          </div>

          {/* Progress bar */}
          <ProgressBar step={step} />

          {/* Step card */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl border border-gold-pale/60 shadow-[0_8px_40px_rgba(60,30,8,0.08)] overflow-hidden mt-8 sm:mt-12">

            {/* Step header */}
            <div className="px-6 sm:px-8 pt-7 pb-5 border-b border-gold-pale/40">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-6 h-6 rounded-full bg-gold text-cream text-[11px] font-bold flex items-center justify-center shrink-0">
                  {step}
                </span>
                <h2 className="font-playfair text-xl font-semibold text-brown">
                  {t(meta.titleKey)}
                </h2>
              </div>
              <p className="text-sm text-brown-light ml-8">{t(meta.subtitleKey)}</p>
            </div>

            {/* Animated step content */}
            <div className="px-6 sm:px-8 py-7 min-h-[320px] relative overflow-hidden">
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={step}
                  custom={dir}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                >
                  {step === 1 && (
                    <Step1
                      order={order}
                      setOrder={setOrder}
                      error={errors.base ?? ''}
                    />
                  )}
                  {step === 2 && (
                    <Step2
                      order={order}
                      setOrder={setOrder}
                      errors={errors}
                    />
                  )}
                  {step === 3 && (
                    <Step3
                      order={order}
                      setOrder={setOrder}
                      errors={errors}
                    />
                  )}
                  {step === 4 && <Step4 order={order} />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="px-6 sm:px-8 pb-7 pt-2 border-t border-gold-pale/40 flex items-center justify-between gap-3">
              {/* Back */}
              {step > 1 ? (
                <button
                  type="button"
                  onClick={goBack}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl border-2 border-gold-pale text-brown-light text-sm font-medium hover:border-gold hover:text-brown transition-all duration-150 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
                >
                  <ChevronLeft size={16} aria-hidden />
                  {t('co_back')}
                </button>
              ) : (
                <div />
              )}

              {/* Next / Send */}
              {step < TOTAL_STEPS ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="flex items-center gap-1.5 px-7 py-2.5 rounded-xl bg-gold text-cream text-sm font-semibold hover:bg-gold-light transition-all duration-150 cursor-pointer shadow-sm hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
                >
                  {t('co_next')}
                  <ChevronRight size={16} aria-hidden />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSend}
                  className="flex items-center gap-2 px-7 py-2.5 rounded-xl bg-[#25D366] text-white text-sm font-semibold hover:bg-[#22c55e] transition-all duration-150 cursor-pointer shadow-sm hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#25D366]"
                >
                  <Send size={15} aria-hidden />
                  {t('co_send')}
                </button>
              )}
            </div>
          </div>

          {/* Trust note */}
          <p className="mt-6 text-center text-xs text-taupe leading-relaxed">
            {t('co_note')}{' '}
            <span className="text-brown-light">{t('co_no_payment')}</span>
          </p>
        </div>
      </main>

      <Footer />
    </>
  )
}
