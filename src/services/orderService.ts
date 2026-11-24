import { CartItem } from "@/types/cart";
import { CustomerInfo, Order } from "@/types/order";

const ORDERS_STORAGE_KEY = "frost_flair_orders_v1";

export async function createMockOrder(
  items: CartItem[],
  customer: CustomerInfo,
  paymentMethod: "cod" | "card",
  subtotal: number,
  shippingFee: number,
  discount: number
): Promise<Order> {
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);
  const formattedDelivery = deliveryDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // 1. Try submitting to real Backend Database API
  try {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: items.map((item) => ({
          productId: item.product.id,
          productName: item.product.name,
          selectedSize: item.selectedSize,
          selectedColor: item.selectedColor,
          quantity: item.quantity,
          unitPrice: item.product.price,
        })),
        customer,
        paymentMethod: paymentMethod.toUpperCase(),
        couponCode: discount > 0 ? "WINTER20" : undefined,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      const dbOrder = data.order;

      const order: Order = {
        id: dbOrder.orderNumber || dbOrder.id,
        items,
        customer,
        paymentMethod,
        subtotal: Number(dbOrder.subtotal),
        shippingFee: Number(dbOrder.shippingCost),
        discount: Number(dbOrder.discount),
        total: Number(dbOrder.totalAmount),
        createdAt: dbOrder.createdAt,
        status: "Confirmed",
        estimatedDelivery: formattedDelivery,
      };

      // Save to localStorage as backup
      if (typeof window !== "undefined") {
        try {
          const existing = localStorage.getItem(ORDERS_STORAGE_KEY);
          const orders: Order[] = existing ? JSON.parse(existing) : [];
          orders.unshift(order);
          localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
        } catch {}
      }

      return order;
    }
  } catch (e) {
    console.warn("Backend order submission fallback to local storage:", e);
  }

  // 2. Resilient local fallback if database is offline or unmigrated
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const orderId = `FF-2026-${randomSuffix}`;

  const localOrder: Order = {
    id: orderId,
    items,
    customer,
    paymentMethod,
    subtotal,
    shippingFee,
    discount,
    total: subtotal + shippingFee - discount,
    createdAt: new Date().toISOString(),
    status: "Confirmed",
    estimatedDelivery: formattedDelivery,
  };

  if (typeof window !== "undefined") {
    try {
      const existing = localStorage.getItem(ORDERS_STORAGE_KEY);
      const orders: Order[] = existing ? JSON.parse(existing) : [];
      orders.unshift(localOrder);
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.warn("Could not save order locally:", e);
    }
  }

  return localOrder;
}

export function getLocalOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
