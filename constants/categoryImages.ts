export const CATEGORY_IMAGES: Record<string, any> = {
  'cat-1': require('../assets/category-skincare.png'),
  'cat-2': require('../assets/category-haircare.png'),
  'cat-3': require('../assets/category-personalcare.png'),
  'cat-4': require('../assets/category-wellness.png'),
  'cat-5': require('../assets/category-healthcare.png'),
  skincare: require('../assets/category-skincare.png'),
  'hair care': require('../assets/category-haircare.png'),
  haircare: require('../assets/category-haircare.png'),
  'personal care': require('../assets/category-personalcare.png'),
  personalcare: require('../assets/category-personalcare.png'),
  wellness: require('../assets/category-wellness.png'),
  healthcare: require('../assets/category-healthcare.png'),
};

export function getCategoryImage(category?: {
  id?: string;
  name?: string;
  localImage?: any;
  image?: string;
}): any {
  if (!category) return null;
  if (category.localImage) return category.localImage;

  const idKey = category.id?.toLowerCase();
  if (idKey && CATEGORY_IMAGES[idKey]) {
    return CATEGORY_IMAGES[idKey];
  }

  const nameKey = category.name?.toLowerCase().trim();
  if (nameKey && CATEGORY_IMAGES[nameKey]) {
    return CATEGORY_IMAGES[nameKey];
  }

  if (category.image && typeof category.image === 'string' && category.image.trim().length > 0) {
    return { uri: category.image };
  }

  return null;
}
