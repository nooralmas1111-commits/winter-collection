export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  productPurchased: string;
  date: string;
  verified: boolean;
}

export interface LookProductItem {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

export interface ShopTheLook {
  id: string;
  title: string;
  tagline: string;
  editorialImage: string;
  description: string;
  products: LookProductItem[];
  totalPrice: number;
}
