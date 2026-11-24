"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { formatPrice } from "@/lib/utils";
import {
  TrendingUp,
  Package,
  Users,
  AlertTriangle,
  ShoppingBag,
  Plus,
  Trash2,
  CheckCircle2,
  Shield,
  Layers,
  ArrowRight,
  Clock,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, isLoading, openAuthModal } = useAuth();

  const [activeTab, setActiveTab] = useState<"overview" | "products" | "orders" | "coupons">("overview");
  const [metrics, setMetrics] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  // New Product Modal State
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    slug: "",
    categoryId: "women",
    price: 19990,
    compareAtPrice: 24990,
    description: "Handcrafted winter luxury outerwear.",
    imageUrl: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=1000",
    color: "Warm Ivory",
    colorCode: "#F7F5F0",
    size: "M",
    stock: 20,
  });

  const isAuthorized = user && user.role === "ADMIN";

  const fetchAdminData = async () => {
    try {
      setLoadingData(true);
      const [resMetrics, resOrders, resProducts] = await Promise.all([
        fetch("/api/admin/metrics"),
        fetch("/api/orders"),
        fetch("/api/products?limit=100"),
      ]);

      if (resMetrics.ok) {
        const d = await resMetrics.json();
        setMetrics(d.metrics);
      }

      if (resOrders.ok) {
        const d = await resOrders.json();
        setOrders(d.orders || []);
      }

      if (resProducts.ok) {
        const d = await resProducts.json();
        setProducts(d.products || []);
      }
    } catch (e) {
      console.warn("Error loading admin data:", e);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (isAuthorized) {
      fetchAdminData();
    }
  }, [isAuthorized]);

  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        toast.error("Failed to update status");
        return;
      }

      toast.success(`Order ${orderId} updated to ${newStatus}`);
      fetchAdminData();
    } catch {
      toast.error("Error updating order status");
    }
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}?`)) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (!res.ok) {
        toast.error("Failed to delete product");
        return;
      }
      toast.success(`Product ${name} deleted.`);
      fetchAdminData();
    } catch {
      toast.error("Error deleting product");
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        name: newProduct.name,
        slug: newProduct.slug || newProduct.name.toLowerCase().replace(/\s+/g, "-"),
        categoryId: newProduct.categoryId,
        price: Number(newProduct.price),
        compareAtPrice: Number(newProduct.compareAtPrice),
        description: newProduct.description,
        images: [newProduct.imageUrl],
        variants: [
          {
            size: newProduct.size,
            color: newProduct.color,
            colorCode: newProduct.colorCode,
            stockQuantity: Number(newProduct.stock),
          },
        ],
      };

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const d = await res.json();
        toast.error(d.error || "Failed to create product");
        return;
      }

      toast.success("New product created in catalog!");
      setIsAddProductOpen(false);
      fetchAdminData();
    } catch {
      toast.error("Unable to create product.");
    }
  };

  if (isLoading) {
    return (
      <div className="bg-[#F7F5F0] min-h-screen py-24 text-center text-xs text-[#737D87]">
        Verifying administrator credentials...
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="bg-[#F7F5F0] min-h-screen py-24 flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-8 border border-[#E6E1D9] text-center space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-[#C26D53]/15 text-[#C26D53] flex items-center justify-center mx-auto">
            <Shield className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-2xl text-[#292D32]">
            Atelier Administrator Access Required
          </h2>
          <p className="text-xs text-[#737D87] leading-relaxed">
            This management console is restricted to authenticated store administrators.
          </p>
          <div className="pt-2">
            <button
              onClick={() => openAuthModal("login")}
              className="bg-[#292D32] text-white px-6 py-3 text-xs uppercase tracking-wider font-semibold w-full hover:bg-[#3E4349]"
            >
              Sign In as Administrator
            </button>
          </div>
          <p className="text-[10px] text-[#A99B8A]">
            Tip: Use demo account <strong>admin@frostandflair.pk</strong>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F7F5F0] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-[#E6E1D9] pb-6 mb-8 flex flex-col sm:flex-row sm:items-baseline justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.24em] font-semibold text-[#A99B8A] mb-1">
              <Sparkles className="w-3 h-3 text-[#D8C8B3]" />
              ATELIER MANAGEMENT SYSTEM
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#292D32]">
              Store Administration
            </h1>
          </div>

          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            <button
              onClick={() => setIsAddProductOpen(true)}
              className="bg-[#292D32] text-white px-4 py-2.5 text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5 hover:bg-[#3E4349] transition-all shadow-xs"
            >
              <Plus className="w-4 h-4" /> Add Product
            </button>
            <Link
              href="/account"
              className="bg-white border border-[#E6E1D9] text-[#292D32] px-4 py-2.5 text-xs uppercase tracking-wider font-medium hover:bg-[#EEEAE2]"
            >
              My Account
            </Link>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#E6E1D9] mb-8 space-x-8 text-xs uppercase tracking-wider font-semibold">
          <button
            onClick={() => setActiveTab("overview")}
            className={`pb-3 border-b-2 transition-all ${
              activeTab === "overview"
                ? "border-[#292D32] text-[#292D32]"
                : "border-transparent text-[#737D87] hover:text-[#292D32]"
            }`}
          >
            Overview & Metrics
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`pb-3 border-b-2 transition-all ${
              activeTab === "orders"
                ? "border-[#292D32] text-[#292D32]"
                : "border-transparent text-[#737D87] hover:text-[#292D32]"
            }`}
          >
            Orders Fulfillment ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`pb-3 border-b-2 transition-all ${
              activeTab === "products"
                ? "border-[#292D32] text-[#292D32]"
                : "border-transparent text-[#737D87] hover:text-[#292D32]"
            }`}
          >
            Product Catalog ({products.length})
          </button>
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="space-y-10">
            {/* Metric KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white border border-[#E6E1D9] p-6 shadow-xs">
                <div className="flex items-center justify-between text-[#737D87] text-xs mb-2">
                  <span className="uppercase tracking-wider">Total Sales Volume</span>
                  <TrendingUp className="w-4 h-4 text-[#3E6B48]" />
                </div>
                <div className="font-serif text-2xl sm:text-3xl font-medium text-[#292D32]">
                  {formatPrice(metrics?.totalRevenue || 128450)}
                </div>
                <p className="text-[11px] text-[#3E6B48] mt-1">Insured national transactions</p>
              </div>

              <div className="bg-white border border-[#E6E1D9] p-6 shadow-xs">
                <div className="flex items-center justify-between text-[#737D87] text-xs mb-2">
                  <span className="uppercase tracking-wider">Total Reservations</span>
                  <Package className="w-4 h-4 text-[#A99B8A]" />
                </div>
                <div className="font-serif text-2xl sm:text-3xl font-medium text-[#292D32]">
                  {metrics?.totalOrders || orders.length}
                </div>
                <p className="text-[11px] text-[#737D87] mt-1">Orders processed</p>
              </div>

              <div className="bg-white border border-[#E6E1D9] p-6 shadow-xs">
                <div className="flex items-center justify-between text-[#737D87] text-xs mb-2">
                  <span className="uppercase tracking-wider">Active Catalog</span>
                  <ShoppingBag className="w-4 h-4 text-[#A99B8A]" />
                </div>
                <div className="font-serif text-2xl sm:text-3xl font-medium text-[#292D32]">
                  {metrics?.totalProducts || products.length}
                </div>
                <p className="text-[11px] text-[#737D87] mt-1">Live winter styles</p>
              </div>

              <div className="bg-white border border-[#E6E1D9] p-6 shadow-xs">
                <div className="flex items-center justify-between text-[#737D87] text-xs mb-2">
                  <span className="uppercase tracking-wider">Inventory Alerts</span>
                  <AlertTriangle className="w-4 h-4 text-[#C26D53]" />
                </div>
                <div className="font-serif text-2xl sm:text-3xl font-medium text-[#C26D53]">
                  {metrics?.lowStockCount || 3}
                </div>
                <p className="text-[11px] text-[#C26D53] mt-1">Variants low in stock</p>
              </div>
            </div>

            {/* Recent Orders in Overview */}
            <div className="bg-white border border-[#E6E1D9] p-6 sm:p-8 shadow-xs">
              <h3 className="font-serif text-xl text-[#292D32] mb-4 pb-3 border-b border-[#E6E1D9]">
                Recent Winter Orders
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-[#E6E1D9] text-[#737D87] uppercase tracking-wider">
                      <th className="py-2.5">Order Number</th>
                      <th className="py-2.5">Date</th>
                      <th className="py-2.5">Customer</th>
                      <th className="py-2.5">Amount</th>
                      <th className="py-2.5">Status</th>
                      <th className="py-2.5">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E6E1D9]">
                    {orders.slice(0, 5).map((o) => (
                      <tr key={o.id} className="hover:bg-[#F7F5F0]/60">
                        <td className="py-3 font-mono font-bold text-[#292D32]">{o.orderNumber}</td>
                        <td className="py-3 text-[#737D87]">
                          {new Date(o.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                        <td className="py-3 text-[#292D32]">{o.shippingAddress?.fullName || "Guest Patron"}</td>
                        <td className="py-3 font-semibold text-[#292D32]">
                          {formatPrice(Number(o.totalAmount))}
                        </td>
                        <td className="py-3">
                          <span className="px-2 py-0.5 bg-[#3E6B48]/15 text-[#3E6B48] font-semibold text-[10px]">
                            {o.orderStatus}
                          </span>
                        </td>
                        <td className="py-3">
                          <button
                            onClick={() => setActiveTab("orders")}
                            className="text-[#292D32] hover:text-[#A99B8A] font-semibold underline"
                          >
                            Manage
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ORDERS TAB */}
        {activeTab === "orders" && (
          <div className="bg-white border border-[#E6E1D9] p-6 sm:p-8 shadow-xs space-y-6">
            <h3 className="font-serif text-xl text-[#292D32] pb-4 border-b border-[#E6E1D9]">
              Client Orders Management & Fulfillment
            </h3>

            <div className="space-y-4">
              {orders.map((o) => (
                <div key={o.id} className="border border-[#E6E1D9] p-5 bg-[#F7F5F0] space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E6E1D9] pb-3 text-xs">
                    <div>
                      <span className="font-mono font-bold text-sm text-[#292D32] mr-3">
                        {o.orderNumber}
                      </span>
                      <span className="text-[#737D87]">
                        {new Date(o.createdAt).toLocaleString("en-US")}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[#737D87]">Update Status:</span>
                      <select
                        value={o.orderStatus}
                        onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                        className="bg-white border border-[#E6E1D9] px-2 py-1 text-xs font-semibold text-[#292D32] focus:outline-none"
                      >
                        <option value="CONFIRMED">CONFIRMED</option>
                        <option value="PROCESSING">PROCESSING</option>
                        <option value="SHIPPED">SHIPPED</option>
                        <option value="DELIVERED">DELIVERED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <p className="font-semibold text-[#292D32] mb-1">
                        Recipient & Destination:
                      </p>
                      <p className="text-[#737D87]">
                        {o.shippingAddress?.fullName} ({o.shippingAddress?.phone})<br />
                        {o.shippingAddress?.address}, {o.shippingAddress?.city}
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold text-[#292D32] mb-1">Financials:</p>
                      <p className="text-[#737D87]">
                        Subtotal: {formatPrice(Number(o.subtotal))} | Shipping: {formatPrice(Number(o.shippingCost))}<br />
                        Grand Total: <strong className="text-[#292D32]">{formatPrice(Number(o.totalAmount))}</strong> ({o.paymentMethod})
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PRODUCTS TAB */}
        {activeTab === "products" && (
          <div className="bg-white border border-[#E6E1D9] p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E6E1D9]">
              <h3 className="font-serif text-xl text-[#292D32]">
                Active Winter Styles
              </h3>
              <button
                onClick={() => setIsAddProductOpen(true)}
                className="bg-[#292D32] text-white px-4 py-2 text-xs uppercase tracking-wider font-semibold"
              >
                + New Product
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-[#E6E1D9] text-[#737D87] uppercase tracking-wider">
                    <th className="py-2.5">Product</th>
                    <th className="py-2.5">Category</th>
                    <th className="py-2.5">Price</th>
                    <th className="py-2.5">Available Stock</th>
                    <th className="py-2.5">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E6E1D9]">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-[#F7F5F0]/60">
                      <td className="py-3 font-semibold text-[#292D32]">{p.name}</td>
                      <td className="py-3 capitalize text-[#737D87]">{p.category}</td>
                      <td className="py-3 font-medium text-[#292D32]">{formatPrice(p.price)}</td>
                      <td className="py-3 text-[#3E6B48] font-medium">{p.stock} units</td>
                      <td className="py-3">
                        <button
                          onClick={() => handleDeleteProduct(p.id, p.name)}
                          className="text-[#C26D53] hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-[#292D32]/60 backdrop-blur-sm"
            onClick={() => setIsAddProductOpen(false)}
          />
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <div className="relative w-full max-w-lg bg-[#F7F5F0] border border-[#E6E1D9] p-6 sm:p-8 shadow-2xl z-10">
              <h3 className="font-serif text-2xl text-[#292D32] mb-4">
                Add New Winter Product
              </h3>

              <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#737D87] block mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    placeholder="e.g. Glacier Down Parka"
                    className="w-full bg-white border border-[#E6E1D9] px-3 py-2 text-xs focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#737D87] block mb-1">
                      Department *
                    </label>
                    <select
                      value={newProduct.categoryId}
                      onChange={(e) => setNewProduct({ ...newProduct, categoryId: e.target.value })}
                      className="w-full bg-white border border-[#E6E1D9] px-3 py-2 text-xs focus:outline-none"
                    >
                      <option value="women">Women</option>
                      <option value="men">Men</option>
                      <option value="kids">Kids</option>
                      <option value="accessories">Accessories</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#737D87] block mb-1">
                      Price (PKR) *
                    </label>
                    <input
                      type="number"
                      required
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                      className="w-full bg-white border border-[#E6E1D9] px-3 py-2 text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#737D87] block mb-1">
                    Image URL (High-res Unsplash)
                  </label>
                  <input
                    type="url"
                    required
                    value={newProduct.imageUrl}
                    onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                    className="w-full bg-white border border-[#E6E1D9] px-3 py-2 text-xs focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[10px] uppercase text-[#737D87] block mb-1">Color Name</label>
                    <input
                      type="text"
                      value={newProduct.color}
                      onChange={(e) => setNewProduct({ ...newProduct, color: e.target.value })}
                      className="w-full bg-white border border-[#E6E1D9] px-2 py-1.5 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-[#737D87] block mb-1">Size</label>
                    <input
                      type="text"
                      value={newProduct.size}
                      onChange={(e) => setNewProduct({ ...newProduct, size: e.target.value })}
                      className="w-full bg-white border border-[#E6E1D9] px-2 py-1.5 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-[#737D87] block mb-1">Stock</label>
                    <input
                      type="number"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
                      className="w-full bg-white border border-[#E6E1D9] px-2 py-1.5 text-xs"
                    />
                  </div>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-[#292D32] text-white py-3 text-xs uppercase tracking-wider font-semibold"
                  >
                    Save Product
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddProductOpen(false)}
                    className="px-4 py-3 border border-[#E6E1D9] text-[#737D87] text-xs uppercase tracking-wider"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
