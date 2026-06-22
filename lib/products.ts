import { Product } from '@/types'

export const products: Product[] = [
  {
    id: 'biscoff-caramel',
    name: 'Biscoff Caramel Drizzle',
    description:
      'A luscious Biscoff-base cookie cake glazed with smooth caramel, scattered with white and dark chocolate buttons, and finished with a silky chocolate drizzle. The one everyone orders twice.',
    price: 22,
    image: '/images/cookie-biscoff.jpg',
    featured: true,
    rating: 4.9,
    reviewCount: 312,
  },
  {
    id: 'pistachio-delight',
    name: 'Pistachio Drizzle Cake',
    description:
      'Our show-stopping pistachio cookie cake drizzled with luscious pistachio cream and rich chocolate — a bold, nutty flavour that photographs as beautifully as it tastes.',
    price: 24,
    image: '/images/cookie-pistachio.jpg',
    featured: true,
    rating: 4.8,
    reviewCount: 189,
  },
  {
    id: 'pistachio-molten',
    name: 'Pistachio Molten Cookie',
    description:
      'A warm, gooey pistachio molten cookie topped with crushed pistachios and dark chocolate chips — served in our signature kraft bowl. Pure comfort in every spoonful.',
    price: 14,
    image: '/images/cookie-molten-pistachio.png',
    featured: true,
    rating: 4.9,
    reviewCount: 247,
  },
  {
    id: 'classic-choc-chip',
    name: 'Cookie Bites Box',
    description:
      'A generous bowl of freshly baked chocolate chip cookie bites, served with your choice of dipping sauce. Perfect for sharing — or not.',
    price: 18,
    image: '/images/cookie-choc-chip.jpg',
    featured: false,
    rating: 4.7,
    reviewCount: 156,
  },
  {
    id: 'pop-cake',
    name: 'Valentine Pop Cakes',
    description:
      'Handcrafted Oreo pop cakes dipped in velvety white chocolate, drizzled with red and finished with festive red sprinkles — presented in a gift box with shredded paper. Perfect for gifting.',
    price: 16,
    image: '/images/cookie-pop-cake.png',
    featured: true,
    rating: 4.9,
    reviewCount: 94,
  },
]

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured)
}
