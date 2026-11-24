import { CartItem } from "./cart";

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  notes?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  customer: CustomerInfo;
  paymentMethod: "cod" | "card";
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  createdAt: string;
  status: "Confirmed" | "Processing" | "Shipped";
  estimatedDelivery: string;
}
