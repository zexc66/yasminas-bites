import { Product } from '@/types'

export const products: Product[] = [
  {
    id: 'biscoff-caramel',
    name: 'Biscoff Caramel Drizzle',
    nameAr: 'كيك البيسكوف بالكراميل',
    description:
      'A luscious Biscoff-base cookie cake glazed with smooth caramel, scattered with white and dark chocolate buttons, and finished with a silky chocolate drizzle. The one everyone orders twice.',
    descriptionAr:
      'كيك كوكيز بقاعدة بيسكوف فاخرة، مغطى بكراميل ناعم ومزيّن بأزرار شوكولاتة بيضاء وداكنة، مكسو بتدفق شوكولاتة حريري. الكيك الذي يطلبه الجميع مرتين.',
    price: 22,
    image: '/images/cookie-biscoff.jpg',
    featured: true,
    rating: 4.9,
    reviewCount: 312,
  },
  {
    id: 'pistachio-delight',
    name: 'Pistachio Drizzle Cake',
    nameAr: 'كيك الفستق بالصوص',
    description:
      'Our show-stopping pistachio cookie cake drizzled with luscious pistachio cream and rich chocolate — a bold, nutty flavour that photographs as beautifully as it tastes.',
    descriptionAr:
      'كيك كوكيز بالفستق يسيل من عليه كريمة فستق شهية وشوكولاتة غنية — نكهة جريئة ومكسّرة تبدو جميلة بقدر ما تكون لذيذة.',
    price: 24,
    image: '/images/cookie-pistachio.jpg',
    featured: true,
    rating: 4.8,
    reviewCount: 189,
  },
  {
    id: 'pistachio-molten',
    name: 'Pistachio Molten Cookie',
    nameAr: 'كوكيز الفستق المنصهر',
    description:
      'A warm, gooey pistachio molten cookie topped with crushed pistachios and dark chocolate chips — served in our signature kraft bowl. Pure comfort in every spoonful.',
    descriptionAr:
      'كوكيز فستق دافئ وطري من الداخل، محاط بفستق مجروش وقطع شوكولاتة داكنة — يُقدَّم في كوب الكرافت المميز. راحة خالصة في كل ملعقة.',
    price: 14,
    image: '/images/cookie-molten-pistachio.png',
    featured: true,
    rating: 4.9,
    reviewCount: 247,
  },
  {
    id: 'classic-choc-chip',
    name: 'Cookie Bites Box',
    nameAr: 'صندوق قطع الكوكيز',
    description:
      'A generous bowl of freshly baked chocolate chip cookie bites, served with your choice of dipping sauce. Perfect for sharing — or not.',
    descriptionAr:
      'وعاء سخي من قطع كوكيز الشوكولاتة الطازجة، يُقدَّم مع صوص التغميس من اختيارك. مثالي للمشاركة — أو لا.',
    price: 18,
    image: '/images/cookie-choc-chip.jpg',
    featured: false,
    rating: 4.7,
    reviewCount: 156,
  },
  {
    id: 'pop-cake',
    name: 'Valentine Pop Cakes',
    nameAr: 'بوب كيك عيد الحب',
    description:
      'Handcrafted Oreo pop cakes dipped in velvety white chocolate, drizzled with red and finished with festive red sprinkles — presented in a gift box with shredded paper. Perfect for gifting.',
    descriptionAr:
      'بوب كيك أوريو مصنوع يدوياً، مغموس في شوكولاتة بيضاء مخملية ومزيّن بلمسات حمراء ورشّة احتفالية — يُقدَّم في علبة هدية أنيقة. هدية مثالية.',
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

export function getProductName(product: Product, lang: string): string {
  return lang === 'ar' ? product.nameAr : product.name
}

export function getProductDescription(product: Product, lang: string): string {
  return lang === 'ar' ? product.descriptionAr : product.description
}
