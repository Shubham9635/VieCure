export const APP_CONFIG = {
  name: 'VieCure Lifesciences',
  tagline: 'Science Behind Better Care',
  description: 'A pioneering force dedicated to advancing global health and well-being through a comprehensive array of healthcare solutions.',
  website: 'https://viecurelifesciences.in',
  version: '1.0.0',

  // Company Info (configurable from backend)
  company: {
    name: 'Viecure Lifesciences LLP',
    address: '[Address configurable from admin panel]',
    phone: '[Phone configurable from admin panel]',
    email: '[Email configurable from admin panel]',
    website: 'https://viecurelifesciences.in',
  },

  // Pagination
  productsPerPage: 20,
  notificationsPerPage: 20,

  // Cache TTL (milliseconds)
  cacheTTL: {
    products: 5 * 60 * 1000,     // 5 minutes
    categories: 10 * 60 * 1000,  // 10 minutes
    companyInfo: 30 * 60 * 1000, // 30 minutes
  },

  // Onboarding
  onboardingSlides: [
    {
      id: '1',
      headline: 'Science Behind Better Care',
      subtext: 'Pioneering healthcare solutions grounded in research, designed for your wellbeing.',
      image: 'onboarding_1',
    },
    {
      id: '2',
      headline: 'Care Designed With Purpose',
      subtext: 'From skincare to wellness — a curated range built for real results, every day.',
      image: 'onboarding_2',
    },
    {
      id: '3',
      headline: 'Trusted. Modern. Effective.',
      subtext: 'Join thousands who trust Viecure for premium, research-driven healthcare products.',
      image: 'onboarding_3',
    },
  ],

  // Why VieCure Features
  whyVieCure: [
    {
      id: '1',
      icon: 'flask-conical',
      title: 'Research Driven',
      description: 'Every product is backed by scientific research and clinical standards.',
    },
    {
      id: '2',
      icon: 'shield-check',
      title: 'Quality Focused',
      description: 'Rigorous quality control at every step of formulation and production.',
    },
    {
      id: '3',
      icon: 'leaf',
      title: 'Natural Ingredients',
      description: 'Carefully selected ingredients that are effective and skin-friendly.',
    },
    {
      id: '4',
      icon: 'sparkles',
      title: 'Modern Formulations',
      description: 'Contemporary skincare science meets proven healthcare principles.',
    },
  ],

  // Mock Categories (fallback if Firebase is not configured)
  mockCategories: [
    { id: 'cat-1', name: 'Skincare', description: 'Creams, serums, face washes & more', productCount: 12, color: '#2d7a52' },
    { id: 'cat-2', name: 'Hair Care', description: 'Shampoos, conditioners & treatments', productCount: 8, color: '#1a5c3a' },
    { id: 'cat-3', name: 'Personal Care', description: 'Soaps, body care & hygiene', productCount: 10, color: '#7aaa8a' },
    { id: 'cat-4', name: 'Wellness', description: 'Supplements & health support', productCount: 6, color: '#b8976a' },
    { id: 'cat-5', name: 'Healthcare', description: 'Pharmaceutical & medical products', productCount: 9, color: '#0d3d26' },
  ],
} as const;

export const ASYNC_STORAGE_KEYS = {
  onboardingComplete: '@viecure/onboarding_complete',
  themeMode: '@viecure/theme_mode',
  favorites: '@viecure/favorites',
  recentSearches: '@viecure/recent_searches',
  userProfile: '@viecure/user_profile',
  fcmToken: '@viecure/fcm_token',
} as const;

export const ENQUIRY_STATUS = {
  NEW: 'new',
  CONTACTED: 'contacted',
  IN_PROGRESS: 'in_progress',
  RESOLVED: 'resolved',
} as const;

export type EnquiryStatus = typeof ENQUIRY_STATUS[keyof typeof ENQUIRY_STATUS];
