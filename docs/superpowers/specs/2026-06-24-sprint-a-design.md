# Sprint A — Quick Wins Design Spec
**Date:** 2026-06-24
**Project:** Yasmina's Bites (Next.js 16 App Router, Firebase, Tailwind v4)

---

## Scope

Five independent improvements that ship together as one PR:

1. Order history — reorder button + product images + i18n
2. SEO structured data — JSON-LD (LocalBusiness + Product schemas)
3. PWA manifest + icons
4. WhatsApp button i18n
5. Real Firestore reviews on product pages + Arabic product names

---

## 1. Order History Improvements

### Current state
`app/account/orders/page.tsx` already queries Firestore (`orders` collection, filtered by `userId`, ordered by `createdAt desc`) and renders a list of order cards. Missing: reorder button, product image thumbnails, i18n, translated status labels.

### Reorder behaviour
- User clicks **Reorder** on any past order card.
- Handler: call `clearCart()`, then `addItem(product, quantity)` for every line item in that order.
- Navigate to `/cart` immediately after.
- Show toast: `t('acc_reorder_toast')` — "Cart replaced with your previous order" / "تم استبدال سلتك بطلبك السابق".
- If cart is already empty the flow is the same — no conditional needed.

### UI changes
- Each line item row gains a 20×20 product image thumbnail (rounded, object-cover) next to the product name.
- A "Reorder" button sits in the bottom-right of each order card, styled as a small gold outlined pill.
- Status badge labels translated via new `acc_status_*` keys (see i18n section).

### New translation keys
```
acc_orders_title      My Orders           / طلباتي
acc_orders_empty      No orders yet...    / لا توجد طلبات بعد...
acc_orders_shop       Shop Now            / تسوق الآن
acc_order_no          Order #             / رقم الطلب
acc_reorder           Reorder             / إعادة الطلب
acc_reorder_toast     Cart replaced with your previous order / تم استبدال سلتك بطلبك السابق
acc_status_pending    Pending             / معلق
acc_status_processing Processing          / قيد التجهيز
acc_status_shipped    Shipped             / في الطريق
acc_status_delivered  Delivered           / تم التوصيل
```

### Architecture
- Stays fully client-side. No new API routes.
- Uses existing `useCart` store (`clearCart`, `addItem`) and `useLang`.
- `CartItem.product` stored in Firestore must match the `Product` shape in `types/index.ts`. The `nameAr`/`descriptionAr` fields added in the last commit may not be present on old Firestore records — the reorder handler should fall back gracefully if they are missing (use `product.name` as the fallback for display; the cart will still work since price/id/image are always present).

---

## 2. SEO Structured Data (JSON-LD)

### Homepage — LocalBusiness schema
Injected in `app/page.tsx` via a server-side `<script type="application/ld+json">` tag inside the JSX (not via `next/script`, to avoid hydration warnings).

```json
{
  "@context": "https://schema.org",
  "@type": "Bakery",
  "name": "Yasmina's Bites",
  "description": "Artisan cookie cakes handcrafted with love. Baked fresh to order in Amman, Jordan.",
  "url": "https://yasminasbites.com",
  "telephone": "+962789006574",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Amman",
    "addressCountry": "JO"
  },
  "servesCuisine": "Bakery",
  "priceRange": "JD 14–JD 24",
  "currenciesAccepted": "JOD",
  "paymentAccepted": "Cash, Credit Card",
  "openingHours": "Mo-Su 09:00-21:00",
  "sameAs": ["https://instagram.com/yasminasbites"]
}
```

### Product pages — Product schema
Injected in `app/products/[id]/page.tsx` (server component, so no hydration issues).

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "<product.name>",
  "description": "<product.description>",
  "image": "<absolute URL to product.image>",
  "brand": { "@type": "Brand", "name": "Yasmina's Bites" },
  "offers": {
    "@type": "Offer",
    "price": "<product.price>",
    "priceCurrency": "JOD",
    "availability": "https://schema.org/InStock",
    "seller": { "@type": "Organization", "name": "Yasmina's Bites" }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "<product.rating>",
    "reviewCount": "<product.reviewCount>"
  }
}
```

`aggregateRating` is only included when `product.rating` and `product.reviewCount` are present.

### Base URL
Defined as a constant `SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yasminasbites.com'` used to build absolute image URLs.

---

## 3. PWA Manifest + Icons

### Files added
- `public/manifest.json` — full web app manifest
- `public/icon-192.png` — generated at build time from `public/images/logo.jpg` using `sharp`
- `public/icon-512.png` — same source, 512×512
- `public/apple-touch-icon.png` — 180×180, for iOS Safari

### manifest.json content
```json
{
  "name": "Yasmina's Bites",
  "short_name": "Yasmina's",
  "description": "Artisan cookie cakes, baked fresh to order in Amman",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#FAF7F2",
  "theme_color": "#8B7020",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any maskable" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any maskable" }
  ]
}
```

### layout.tsx additions
```tsx
export const metadata: Metadata = {
  // existing fields...
  manifest: '/manifest.json',
  themeColor: '#8B7020',
  appleWebApp: { capable: true, statusBarStyle: 'default', title: "Yasmina's Bites" },
  icons: {
    // existing...
    apple: '/apple-touch-icon.png',
  },
}
```

### Icon generation
A one-off Node script `scripts/generate-icons.mjs` uses `sharp` to resize `public/images/logo.jpg` to the three sizes. Run once, output committed to `public/`. No build-time dependency added.

---

## 4. WhatsApp Button — i18n

### Current state
`components/ui/WhatsAppButton.tsx` renders the label `"Order via WhatsApp"` hardcoded.

### Change
- Add `useLang()` and render `t('hero_cta_wa')` — that key already exists in both `en` and `ar` translations.
- `aria-label` also becomes `t('hero_cta_wa')`.

---

## 5. Real Firestore Reviews on Product Pages

### Current state
`ProductClient.tsx` renders `mockReviews` — three hardcoded objects. The homepage `ReviewsSection` writes approved reviews to Firestore (`reviews` collection) with fields: `productId`, `name`, `rating`, `text`, `approved`, `createdAt`.

### Data contract
```ts
interface FirestoreReview {
  id: string
  productId: string
  name: string
  rating: number      // 1–5
  text: string
  approved: boolean
  createdAt: Timestamp
}
```

### Fetch logic
- `useEffect` inside `ProductClient` queries:
  ```ts
  collection(db, 'reviews'),
  where('productId', '==', product.id),
  where('approved', '==', true),
  orderBy('createdAt', 'desc'),
  limit(6)
  ```
- State: `reviews: FirestoreReview[]`, `reviewsLoading: boolean`

### Loading state
Three skeleton cards (matching the review card dimensions) with a pulse animation while `reviewsLoading` is true.

### Empty state
When `reviews.length === 0` after loading: a soft message `t('rev_be_first')` — "Be the first to review this" / "كن أول من يقيّم هذا المنتج".

### Arabic product names
The existing `getProductName(product, lang)` helper is already used in the component header. Review cards themselves show the reviewer's name and text as written — no translation needed there. The section heading uses `t('testimonials_label')`.

### Firestore unavailable
If `db` is null (env vars not set), the `useEffect` returns early and renders the empty state. No crash.

### New translation key
```
rev_be_first    Be the first to review this / كن أول من يقيّم هذا المنتج
```

---

## i18n additions summary

All new keys added to both `en` and `ar` objects in `lib/i18n.ts`:

| Key | English | Arabic |
|---|---|---|
| `acc_orders_title` | My Orders | طلباتي |
| `acc_orders_empty` | No orders yet. Time to treat yourself! | لا توجد طلبات بعد. حان وقت الدلع! |
| `acc_orders_shop` | Shop Now | تسوق الآن |
| `acc_order_no` | Order # | طلب رقم |
| `acc_reorder` | Reorder | إعادة الطلب |
| `acc_reorder_toast` | Cart replaced with your previous order | تم استبدال سلتك بطلبك السابق |
| `acc_status_pending` | Pending | معلق |
| `acc_status_processing` | Processing | قيد التجهيز |
| `acc_status_shipped` | Shipped | في الطريق |
| `acc_status_delivered` | Delivered | تم التوصيل |
| `rev_be_first` | Be the first to review this | كن أول من يقيّم هذا المنتج |

---

## Files changed

| File | Change |
|---|---|
| `lib/i18n.ts` | Add 11 new keys (en + ar) |
| `app/account/orders/page.tsx` | Reorder button, thumbnails, i18n, status i18n |
| `app/page.tsx` | LocalBusiness JSON-LD |
| `app/products/[id]/page.tsx` | Product JSON-LD |
| `app/layout.tsx` | manifest link, themeColor, appleWebApp metadata |
| `public/manifest.json` | New file |
| `public/icon-192.png` | Generated from logo.jpg |
| `public/icon-512.png` | Generated from logo.jpg |
| `public/apple-touch-icon.png` | Generated from logo.jpg |
| `scripts/generate-icons.mjs` | One-off sharp script |
| `components/ui/WhatsAppButton.tsx` | i18n label |
| `app/products/[id]/ProductClient.tsx` | Real Firestore reviews, skeleton, empty state |

---

## Out of scope

Loyalty points, wishlist, occasion countdown — Sprint B/C.
