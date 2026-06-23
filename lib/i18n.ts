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
    hero_badge_top: 'Handcrafted · Amman, Jordan',
    hero_tagline: 'Little bites of happiness',
    hero_desc: 'Artisan cookie cakes baked fresh to order — loaded with the finest chocolate, Biscoff, pistachio, and more. Every bite tells a story.',
    hero_cta_shop: 'Shop Now',
    hero_cta_wa: 'Order via WhatsApp',
    hero_social_proof: 'Loved by 500+ customers in Amman',
    hero_most_loved: 'Most loved · 312 happy reviews',
    hero_fresh_baked: 'Fresh baked',
    hero_fresh_sub: 'To order, every time',
    hero_delivery: 'Amman delivery',
    hero_from: 'From',
    hero_reviews: 'reviews',
    // Trust bar
    trust_fresh: 'Fresh baked to order',
    trust_delivery: 'Free delivery over JD 20',
    trust_quality: 'Premium ingredients',
    trust_amman: 'Delivering across Amman',
    trust_customers: '500+ happy customers',
    // Shop
    shop_heading: 'Our Cookie Cakes',
    shop_sub: 'Every cake is baked the day you order it.',
    shop_all: 'All',
    // Footer
    footer_tagline: 'Little Bites of Happiness',
    footer_desc: 'Handcrafted cookie cakes baked fresh to order, delivered across Amman with love.',
    footer_baked: 'Baked fresh in Amman, Jordan',
    footer_nav: 'Navigate',
    footer_shop_all: 'Shop All',
    footer_signin: 'Sign In',
    footer_orders: 'My Orders',
    footer_get_in_touch: 'Get in Touch',
    footer_links: 'Quick Links',
    footer_contact: 'Contact',
    footer_copyright: 'All rights reserved.',
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
    hero_badge_top: 'مصنوع يدوياً · عمّان، الأردن',
    hero_tagline: 'لقمات من السعادة',
    hero_desc: 'كيك كوكيز حرفي يُخبز طازجاً عند الطلب — محشو بأجود الشوكولاتة والبيسكوف والفستق والمزيد. كل قضمة تحكي قصة.',
    hero_cta_shop: 'تسوق الآن',
    hero_cta_wa: 'اطلب عبر واتساب',
    hero_social_proof: 'يحبه أكثر من ٥٠٠ عميل في عمّان',
    hero_most_loved: 'الأكثر حباً · ٣١٢ تقييم سعيد',
    hero_fresh_baked: 'طازج من الفرن',
    hero_fresh_sub: 'عند كل طلب',
    hero_delivery: 'توصيل عمّان',
    hero_from: 'من',
    hero_reviews: 'تقييم',
    // Trust bar
    trust_fresh: 'طازج عند الطلب',
    trust_delivery: 'توصيل مجاني فوق ٢٠ دينار',
    trust_quality: 'مكونات فاخرة',
    trust_amman: 'التوصيل لجميع أنحاء عمّان',
    trust_customers: 'أكثر من ٥٠٠ عميل سعيد',
    // Shop
    shop_heading: 'كيك الكوكيز',
    shop_sub: 'كل كيكة تُخبز يوم طلبك.',
    shop_all: 'الكل',
    // Footer
    footer_tagline: 'لقمات من السعادة',
    footer_desc: 'كيك كوكيز حرفي يُخبز طازجاً عند الطلب، يوصل لجميع أنحاء عمّان بكل حب.',
    footer_baked: 'يُخبز طازجاً في عمّان، الأردن',
    footer_nav: 'التنقل',
    footer_shop_all: 'تسوق الكل',
    footer_signin: 'تسجيل الدخول',
    footer_orders: 'طلباتي',
    footer_get_in_touch: 'تواصل معنا',
    footer_links: 'روابط سريعة',
    footer_contact: 'تواصل',
    footer_copyright: 'جميع الحقوق محفوظة.',
    // Common
    add_to_cart: 'أضف للسلة',
    order_wa: 'اطلب عبر واتساب',
    delivering: 'التوصيل لجميع أنحاء عمّان',
  },
} as const

export type TranslationKey = keyof typeof translations['en']
