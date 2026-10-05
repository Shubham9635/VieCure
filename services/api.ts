import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
import { Product, Category, Enquiry, EnquiryFormData, CompanyInfo } from '../types';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '../constants/mockData';

// In-memory list of enquiries for fallback / demo
let mockEnquiries: Enquiry[] = [
  {
    id: 'enq-1',
    name: 'Dr. Suresh Mehta',
    phone: '+91 98231 45678',
    email: 'dr.mehta@dermatology.org',
    productId: 'prod-1',
    productName: 'Radiance Pro Niacinamide 10% Serum',
    companyName: 'Mehta Skin & Laser Center',
    enquiryType: 'Hospital / Clinic Distribution',
    message: 'Interested in stocking 200 units for our clinical patients. Please share wholesale tariff sheet.',
    status: 'new',
    createdAt: new Date(Date.now() - 3600000 * 4),
  },
  {
    id: 'enq-2',
    name: 'Ananya Sharma',
    phone: '+91 94123 78901',
    email: 'ananya.care@pharmacy.in',
    productId: 'prod-2',
    productName: 'Hydra-Barrier Ceramide Intense Cream',
    companyName: 'Wellness Chemist Chain',
    enquiryType: 'Retail Stockist / Pharmacy',
    message: 'Requesting distributor pricing for NCR region pharmacies.',
    status: 'contacted',
    createdAt: new Date(Date.now() - 86400000),
  },
];

// ─── Products ───────────────────────────────────────────────────────────────

export async function getProducts(): Promise<Product[]> {
  if (isFirebaseConfigured) {
    try {
      const q = query(collection(db, 'products'), where('isActive', '==', true));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            name: data.name,
            description: data.description,
            shortDescription: data.shortDescription,
            categoryId: data.categoryId,
            category: data.category || data.categoryName || 'General',
            categoryName: data.categoryName,
            images: data.images || [],
            benefits: data.benefits || [],
            ingredients: data.ingredients || [],
            activeIngredients: data.activeIngredients || data.ingredients || [],
            usage: data.usage,
            howToUse: data.howToUse || data.usage,
            precautions: data.precautions,
            packaging: data.packaging,
            additionalInfo: data.additionalInfo,
            isActive: data.isActive ?? true,
            isFeatured: data.isFeatured ?? false,
            tags: data.tags || [],
            createdAt: data.createdAt?.toDate?.() || new Date(),
            updatedAt: data.updatedAt?.toDate?.() || new Date(),
          };
        });
      }
    } catch (err) {
      console.warn('Firestore getProducts fallback to mock data:', err);
    }
  }

  // Fallback to local mock data
  return Promise.resolve(
    MOCK_PRODUCTS.filter((p) => p.isActive !== false).map((p) => ({
      ...p,
      category: p.category || p.categoryName || 'General',
      activeIngredients: p.activeIngredients || p.ingredients,
      howToUse: p.howToUse || p.usage,
    }))
  );
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const all = await getProducts();
  return all.filter((p) => p.isFeatured);
}

export async function getProductById(id: string): Promise<Product | null> {
  if (isFirebaseConfigured) {
    try {
      const docRef = doc(db, 'products', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          name: data.name,
          description: data.description,
          shortDescription: data.shortDescription,
          categoryId: data.categoryId,
          category: data.category || data.categoryName || 'General',
          categoryName: data.categoryName,
          images: data.images || [],
          benefits: data.benefits || [],
          ingredients: data.ingredients || [],
          activeIngredients: data.activeIngredients || data.ingredients || [],
          usage: data.usage,
          howToUse: data.howToUse || data.usage,
          precautions: data.precautions,
          packaging: data.packaging,
          additionalInfo: data.additionalInfo,
          isActive: data.isActive ?? true,
          isFeatured: data.isFeatured ?? false,
          tags: data.tags || [],
          createdAt: data.createdAt?.toDate?.() || new Date(),
          updatedAt: data.updatedAt?.toDate?.() || new Date(),
        };
      }
    } catch (err) {
      console.warn('Firestore getProductById fallback:', err);
    }
  }

  const all = await getProducts();
  const product = all.find((p) => p.id === id);
  return Promise.resolve(product || null);
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  const all = await getProducts();
  return all.filter((p) => p.categoryId === categoryId);
}

export async function searchProducts(queryText: string): Promise<Product[]> {
  const q = queryText.toLowerCase().trim();
  if (!q) return Promise.resolve([]);
  const all = await getProducts();
  return Promise.resolve(
    all.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.shortDescription && p.shortDescription.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q)) ||
        (p.tags && p.tags.some((t) => t.toLowerCase().includes(q))) ||
        (p.activeIngredients && p.activeIngredients.some((ing) => ing.toLowerCase().includes(q)))
    )
  );
}

// ─── Categories ──────────────────────────────────────────────────────────────

export async function getCategories(): Promise<Category[]> {
  if (isFirebaseConfigured) {
    try {
      const q = query(collection(db, 'categories'), orderBy('order', 'asc'));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            name: data.name,
            description: data.description,
            image: data.image,
            productCount: data.productCount || 0,
            isActive: data.isActive ?? true,
            order: data.order ?? 0,
            color: data.color,
          };
        });
      }
    } catch (err) {
      console.warn('Firestore getCategories fallback to mock data:', err);
    }
  }

  return Promise.resolve(
    MOCK_CATEGORIES.filter((c) => c.isActive !== false).sort(
      (a, b) => (a.order || 0) - (b.order || 0)
    )
  );
}

export async function getCategoryById(id: string): Promise<Category | null> {
  const all = await getCategories();
  const cat = all.find((c) => c.id === id);
  return Promise.resolve(cat || null);
}

// ─── Enquiries ────────────────────────────────────────────────────────────────

export async function submitEnquiry(
  data: EnquiryFormData
): Promise<{ success: boolean; id: string }> {
  if (isFirebaseConfigured) {
    try {
      const docRef = await addDoc(collection(db, 'enquiries'), {
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        productId: data.productId || null,
        productName: data.productName || 'General Inquiry',
        companyName: data.companyName || null,
        enquiryType: data.enquiryType || 'General Question',
        message: data.message,
        status: 'new',
        createdAt: serverTimestamp(),
      });
      return { success: true, id: docRef.id };
    } catch (err) {
      console.warn('Firestore submitEnquiry fallback to memory:', err);
    }
  }

  const newEnquiry: Enquiry = {
    id: `enq-${Date.now()}`,
    name: data.name,
    phone: data.phone,
    email: data.email,
    productId: data.productId,
    productName: data.productName,
    companyName: data.companyName,
    enquiryType: data.enquiryType,
    message: data.message,
    status: 'new',
    createdAt: new Date(),
  };

  mockEnquiries = [newEnquiry, ...mockEnquiries];

  // Simulate network latency
  await new Promise((r) => setTimeout(r, 600));
  return { success: true, id: newEnquiry.id };
}

export async function getEnquiries(): Promise<Enquiry[]> {
  if (isFirebaseConfigured) {
    try {
      const q = query(collection(db, 'enquiries'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            name: data.name,
            phone: data.phone,
            email: data.email,
            productId: data.productId,
            productName: data.productName,
            companyName: data.companyName,
            enquiryType: data.enquiryType,
            message: data.message,
            status: data.status || 'new',
            createdAt: data.createdAt?.toDate?.() || new Date(),
            updatedAt: data.updatedAt?.toDate?.(),
          };
        });
      }
    } catch (err) {
      console.warn('Firestore getEnquiries fallback to mock data:', err);
    }
  }

  return Promise.resolve([...mockEnquiries]);
}

// ─── Company Info ─────────────────────────────────────────────────────────────

export async function getCompanyInfo(): Promise<CompanyInfo> {
  return Promise.resolve({
    address: 'Viecure Lifesciences LLP, India',
    phone: '+91 98765 43210',
    email: 'info@viecurelifesciences.in',
    website: 'https://viecurelifesciences.in',
    tagline: 'Science Behind Better Care',
    aboutText:
      'Welcome to VIECURE LIFESCIENCES LLP — a pioneering force dedicated to advancing global health and well-being through a comprehensive array of healthcare solutions. Our primary focus lies in clinical research, where we actively contribute to the development of groundbreaking drugs and innovative healthcare approaches. We are committed to bringing premium quality skincare, personal care, and wellness products to our customers.',
    vision:
      'To be a leading force in healthcare and wellness, delivering science-backed products that improve quality of life for people across India and beyond.',
    mission:
      'To develop and deliver premium, research-driven healthcare and skincare products that are safe, effective, and accessible — built on the foundation of scientific integrity and customer trust.',
    values: [
      'Scientific Integrity — Every product is backed by evidence-based research.',
      'Quality First — Uncompromising standards at every stage of production.',
      'Customer Trust — Building lasting relationships through transparency.',
      'Innovation — Continuously advancing our formulations.',
      'Accessibility — Making premium healthcare available to all.',
    ],
  });
}

// Global API export
export const api = {
  getProducts,
  getFeaturedProducts,
  getProductById,
  getProductsByCategory,
  searchProducts,
  getCategories,
  getCategoryById,
  submitEnquiry,
  getEnquiries,
  getCompanyInfo,
};
