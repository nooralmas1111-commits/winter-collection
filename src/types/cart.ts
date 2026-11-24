import { Product } from "./product";

export interface CartItem {
  id: string; // Composite unique key: productId-color-size
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

export interface CartSummary {
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
}
