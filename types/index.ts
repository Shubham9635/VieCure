// TypeScript types for VieCure app

export interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription?: string;
  categoryId: string;
  categoryName?: string;
  category?: string;
  images: string[];
  localImage?: any;
  benefits?: string[];
  ingredients?: string[];
  activeIngredients?: string[];
  usage?: string;
  howToUse?: string;
  precautions?: string;
  packaging?: string;
  additionalInfo?: string;
  isActive?: boolean;
  isFeatured?: boolean;
  tags?: string[];
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
  productCount: number;
  isActive?: boolean;
  order?: number;
  color?: string;
}

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  productId?: string;
  productName?: string;
  companyName?: string;
  enquiryType?: string;
  message: string;
  status: 'new' | 'contacted' | 'in_progress' | 'resolved';
  createdAt: Date | string;
  updatedAt?: Date | string;
}

export interface EnquiryFormData {
  name: string;
  phone: string;
  email?: string;
  productId?: string;
  productName?: string;
  companyName?: string;
  enquiryType?: string;
  message: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  favorites: string[];
  createdAt: Date | string;
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  type: 'new_product' | 'announcement' | 'enquiry_update' | 'promotion';
  isRead: boolean;
  productId?: string;
  createdAt: Date | string;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  isActive: boolean;
  createdAt: Date | string;
}

export interface CompanyInfo {
  address: string;
  phone: string;
  email: string;
  website: string;
  tagline: string;
  aboutText: string;
  vision: string;
  mission: string;
  values: string[];
  mapUrl?: string;
}

export interface AppSettings {
  maintenanceMode: boolean;
  minimumAppVersion: string;
  featuredProductIds: string[];
  featuredCategoryIds: string[];
}

export type ThemeMode = 'light' | 'dark' | 'system';

export interface SearchResult {
  products: Product[];
  total: number;
  query: string;
}
