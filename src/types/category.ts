import { CategoryType } from "./product";

export interface CategoryInfo {
  id: string;
  name: string;
  slug: CategoryType;
  tagline: string;
  description: string;
  image: string;
  subcategories: string[];
  featuredCount?: number;
}
