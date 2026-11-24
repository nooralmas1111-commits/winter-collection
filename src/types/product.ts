export type CategoryType = 'women' | 'men' | 'kids' | 'accessories';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: CategoryType;
  subcategory: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  description: string;
  shortDescription?: string;
  details: string[];
  materials: string;
  care: string;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  stock: number;
  rating: number;
  reviewCount: number;
  isTrending?: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
  isSale?: boolean;
  season?: string;
}

export interface ProductFilterOptions {
  category?: CategoryType | 'all';
  subcategory?: string;
  minPrice?: number;
  maxPrice?: number;
  colors?: string[];
  sizes?: string[];
  inStockOnly?: boolean;
  onSaleOnly?: boolean;
  sortBy?: 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating';
}
