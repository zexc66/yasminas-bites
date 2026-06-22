export type Lang = 'en' | 'ar'

export const translations = {
  en: {
    // Navbar
    nav_shop: 'Shop',
    nav_custom: 'Custom Order',
    nav_gift: 'Gift',
    nav_gallery: 'Gallery',
    nav_story: 'Our Story',
    nav_contact: 'Contact',
    nav_order: 'Order',
    // Hero
    hero_badge: 'JD 14 · Free delivery over JD 20',
    hero_headline_1: 'Cookie Cakes',
    hero_headline_2: 'Worth Every',
    hero_headline_3: 'Bite',
    hero_sub: 'Handcrafted in Amman. Baked fresh when you order. Delivered to your door.',
    hero_cta_shop: 'Shop Now',
    hero_cta_wa: 'Order via WhatsApp',
    hero_social: 'orders this week',
    // Trust bar
    trust_fresh: 'Fresh baked to order',
    trust_delivery: 'Free delivery over JD 20',
    trust_quality: 'Premium ingredients',
    trust_amman: 'Delivering across Amman',
    // Shop
    shop_heading: 'Our Cookie Cakes',
    shop_sub: 'Every cake is baked the day you order it.',
    shop_all: 'All',
    // Footer
    footer_tagline: 'Little Bites of Happiness',
    footer_baked: 'Baked fresh in Amman, Jordan',
    footer_links: 'Quick Links',
    footer_contact: 'Contact',
    // Common
    add_to_cart: 'Add to Cart',
    order_wa: 'Order via WhatsApp',
    delivering: 'Delivering across Amman',
  },
  ar: {
    // Navbar
    nav_shop: 'المتجر',
    nav_custom: 'طلب مخصص',
    nav_gift: 'هدية',
    nav_gallery: 'المعرض',
    nav_story: 'قصتنا',
    nav_contact: 'تواصل',
    nav_order: 'اطلب',
    // Hero
    hero_badge: 'دينار ١٤ · توصيل مجاني فوق ٢٠ دينار',
    hero_headline_1: 'كيك الكوكيز',
    hero_headline_2: 'يستحق كل',
    hero_headline_3: 'قضمة',
    hero_sub: 'مصنوع يدوياً في عمّان. طازج عند الطلب. يوصل لبابك.',
    hero_cta_shop: 'تسوق الآن',
    hero_cta_wa: 'اطلب عبر واتساب',
    hero_social: 'طلب هذا الأسبوع',
    // Trust bar
    trust_fresh: 'طازج عند الطلب',
    trust_delivery: 'توصيل مجاني فوق ٢٠ دينار',
    trust_quality: 'مكونات فاخرة',
    trust_amman: 'التوصيل لجميع أنحاء عمّان',
    // Shop
    shop_heading: 'كيك الكوكيز',
    shop_sub: 'كل كيكة تُخبز يوم طلبك.',
    shop_all: 'الكل',
    // Footer
    footer_tagline: 'لقمات من السعادة',
    footer_baked: 'يُخبز طازجاً في عمّان، الأردن',
    footer_links: 'روابط سريعة',
    footer_contact: 'تواصل',
    // Common
    add_to_cart: 'أضف للسلة',
    order_wa: 'اطلب عبر واتساب',
    delivering: 'التوصيل لجميع أنحاء عمّان',
  },
} as const

export type TranslationKey = keyof typeof translations['en']
