"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Product } from "@/types/product";
import { CartItem } from "@/types/cart";
import { toast } from "sonner";

interface CartContextType {
  items: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (product: Product, selectedColor: string, selectedSize: string, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  totalCount: number;
  freeShippingThreshold: number;
  freeShippingProgress: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "frost_flair_cart_v1";
const FREE_SHIPPING_THRESHOLD = 5000;
const STANDARD_SHIPPING_FEE = 350;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch (e) {
      console.warn("Could not load cart from localStorage:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      } catch (e) {
        console.warn("Could not save cart to localStorage:", e);
      }
    }
  }, [items, isLoaded]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const addToCart = (
    product: Product,
    selectedColor: string,
    selectedSize: string,
    quantity = 1
  ) => {
    const itemId = `${product.id}-${selectedColor}-${selectedSize}`;

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === itemId);

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevItems,
          {
            id: itemId,
            product,
            selectedColor,
            selectedSize,
            quantity
          }
        ];
      }
    });

    toast.success(`${product.name} added to your bag`, {
      description: `${selectedColor} · Size ${selectedSize}`,
      action: {
        label: "View Bag",
        onClick: () => setIsCartOpen(true)
      }
    });
  };

  const removeFromCart = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
    toast.info("Item removed from your bag");
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const shippingFee =
    subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;

  const discount = 0; // Can be coupon or seasonal discount
  const total = Math.max(0, subtotal + shippingFee - discount);

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const freeShippingProgress = Math.min(
    100,
    Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  );

  return (
    <CartContext.Provider
      value={{
        items,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        shippingFee,
        discount,
        total,
        totalCount,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        freeShippingProgress
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
