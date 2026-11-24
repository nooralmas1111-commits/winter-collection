import { PRODUCTS } from "@/data/products";
import { Product, ProductFilterOptions, CategoryType } from "@/types/product";

export async function getProducts(options?: ProductFilterOptions): Promise<Product[]> {
  // Simulate minimal async delay for realistic mock API experience
  await new Promise((resolve) => setTimeout(resolve, 50));
  
  let result = [...PRODUCTS];

  if (!options) return result;

  if (options.category && options.category !== 'all') {
    result = result.filter((p) => p.category === options.category);
  }

  if (options.subcategory) {
    result = result.filter((p) => p.subcategory.toLowerCase() === options.subcategory?.toLowerCase());
  }

  if (options.minPrice !== undefined) {
    result = result.filter((p) => p.price >= options.minPrice!);
  }

  if (options.maxPrice !== undefined) {
    result = result.filter((p) => p.price <= options.maxPrice!);
  }

  if (options.colors && options.colors.length > 0) {
    result = result.filter((p) =>
      p.colors.some((c) => options.colors!.some(colorFilter => c.name.toLowerCase().includes(colorFilter.toLowerCase())))
    );
  }

  if (options.sizes && options.sizes.length > 0) {
    result = result.filter((p) =>
      p.sizes.some((s) => options.sizes!.includes(s))
    );
  }

  if (options.inStockOnly) {
    result = result.filter((p) => p.stock > 0);
  }

  if (options.onSaleOnly) {
    result = result.filter((p) => p.isSale || (p.discountPercent && p.discountPercent > 0));
  }

  // Sorting
  if (options.sortBy) {
    switch (options.sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "featured":
      default:
        result.sort((a, b) => (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0));
        break;
    }
  }

  return result;
}

export async function getProductById(id: string): Promise<Product | null> {
  await new Promise((resolve) => setTimeout(resolve, 30));
  const product = PRODUCTS.find((p) => p.id === id || p.slug === id);
  return product || null;
}

export async function getProductsByCategory(category: CategoryType): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 30));
  return PRODUCTS.filter((p) => p.category === category);
}

export async function getTrendingProducts(): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 30));
  return PRODUCTS.filter((p) => p.isTrending);
}

export async function getBestSellingProducts(): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 30));
  return PRODUCTS.filter((p) => p.isBestSeller);
}

export async function getSaleProducts(): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 30));
  return PRODUCTS.filter((p) => p.isSale);
}

export async function getRelatedProducts(currentId: string, limit = 4): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 30));
  const current = PRODUCTS.find((p) => p.id === currentId);
  if (!current) return PRODUCTS.slice(0, limit);

  return PRODUCTS
    .filter((p) => p.id !== currentId && (p.category === current.category || p.subcategory === current.subcategory))
    .slice(0, limit);
}

export async function searchProducts(query: string): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  if (!query || !query.trim()) return [];

  const q = query.toLowerCase().trim();
  return PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.subcategory.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.materials.toLowerCase().includes(q)
  );
}
