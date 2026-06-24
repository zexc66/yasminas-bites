export interface Product {
  id: string
  name: string
  nameAr: string
  description: string
  descriptionAr: string
  price: number
  image: string
  featured: boolean
  rating?: number
  reviewCount?: number
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface ShippingAddress {
  name: string
  address: string
  city: string
  postalCode: string
  country: string
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  createdAt: string
  address: ShippingAddress
  paymentMethod: 'stripe' | 'paypal'
}
