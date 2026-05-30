"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import {
  Search,
  Loader2,
  Package,
} from "lucide-react";

import { stores } from "@/data/stores";

const STATUS_STYLES = {
  PLACED: "bg-blue-50 text-blue-800 border-blue-200",
  CONFIRMED: "bg-green-50 text-green-800 border-green-200",
  PREPARING: "bg-yellow-50 text-yellow-800 border-yellow-200",
  READY: "bg-purple-50 text-purple-800 border-purple-200",
  DELIVERED: "bg-green-50 text-green-800 border-green-200",
  CANCELLED: "bg-red-50 text-red-800 border-red-200",
};

function formatDate(dateString) {
  if (!dateString) return "N/A";

  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [storeId, setStoreId] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchAttempted, setSearchAttempted] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setSearchAttempted(true);

      let url = "http://localhost:5000/orders";

      if (storeId.trim()) {
        url += `?store_id=${storeId}`;
      }

      const res = await axios.get(url);

      setOrders(res.data?.data || []);
    } catch (error) {
      console.error(error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStore = (id) => {
    return stores.find((s) => String(s.store_id) === String(id));
  };

  const getItem = (storeId, itemId) => {
    return getStore(storeId)?.items?.find(
      (i) => i.item_id === itemId
    );
  };

  const totalAmount = orders.reduce(
    (sum, order) => sum + (order.total_amount || 0),
    0
  );

  const totalItems = orders.reduce((sum, order) => {
    const qty = order.items?.reduce(
      (acc, item) => acc + item.qty,
      0
    );

    return sum + qty;
  }, 0);

  const activeCount = orders.filter((order) =>
    ["PLACED", "CONFIRMED", "PREPARING", "READY"].includes(
      order.status
    )
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 font-mono">
      <div className="max-w-5xl mx-auto p-8">

        {/* HEADER */}
        <div className="flex items-end justify-between border-b border-gray-200 pb-5 mb-6 flex-wrap gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-1">
              Order Management
            </p>

            <h1 className="text-4xl font-bold tracking-tight">
              Orders
            </h1>
          </div>

          <div className="flex gap-6 text-right">
            <div>
              <span className="block text-2xl font-bold">
                {orders.length}
              </span>

              <span className="text-[10px] uppercase tracking-widest text-gray-400">
                Orders
              </span>
            </div>

            <div>
              <span className="block text-2xl font-bold text-green-500">
                {activeCount}
              </span>

              <span className="text-[10px] uppercase tracking-widest text-gray-400">
                Active
              </span>
            </div>
          </div>
        </div>

        {/* SEARCH */}
        <div className="flex gap-2 items-end mb-1">
          <div className="flex-1">
            <label className="block text-[11px] uppercase tracking-widest text-gray-400 mb-2">
              Filter by Store ID
            </label>

            <input
              type="text"
              value={storeId}
              onChange={(e) => setStoreId(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && fetchOrders()
              }
              placeholder="e.g. 101, 102..."
              className="w-full h-10 px-3 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:border-gray-500"
            />
          </div>

          <button
            onClick={fetchOrders}
            disabled={loading}
            className="h-10 px-5 bg-black text-white rounded-lg flex items-center gap-2 disabled:opacity-40"
          >
            {loading ? (
              <>
                <Loader2
                  size={14}
                  className="animate-spin"
                />
                Searching...
              </>
            ) : (
              <>
                <Search size={14} />
                Search
              </>
            )}
          </button>
        </div>

        <p className="text-xs text-gray-400 mb-6">
          Leave empty to view all orders
        </p>

        {/* STATS */}
        {orders.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            <div className="bg-white border rounded-xl p-4">
              <p className="text-xs text-gray-400 mb-1">
                Total Orders
              </p>

              <h2 className="text-2xl font-bold">
                {orders.length}
              </h2>
            </div>

            <div className="bg-white border rounded-xl p-4">
              <p className="text-xs text-gray-400 mb-1">
                Total Amount
              </p>

              <h2 className="text-2xl font-bold">
                ₹{totalAmount}
              </h2>
            </div>

            <div className="bg-white border rounded-xl p-4">
              <p className="text-xs text-gray-400 mb-1">
                Total Items
              </p>

              <h2 className="text-2xl font-bold">
                {totalItems}
              </h2>
            </div>
          </div>
        )}

        {/* EMPTY */}
        {searchAttempted &&
          !loading &&
          orders.length === 0 && (
            <div className="border rounded-2xl p-12 text-center bg-white">
              <Package
                size={28}
                className="mx-auto text-gray-300 mb-4"
              />

              <h2 className="text-xl font-bold mb-2">
                No Orders Found
              </h2>

              <p className="text-sm text-gray-400">
                {storeId
                  ? `No orders found for store ${storeId}`
                  : "No orders available"}
              </p>
            </div>
          )}

        {/* LOADING */}
        {loading && (
          <div className="border rounded-2xl p-12 text-center bg-white">
            <Loader2
              size={28}
              className="mx-auto animate-spin text-gray-400 mb-3"
            />

            <p className="text-sm text-gray-400">
              Loading orders...
            </p>
          </div>
        )}

        {/* ORDERS */}
        {!loading && orders.length > 0 && (
          <div className="flex flex-col gap-4">
            {orders.map((order, index) => {
              const storeDetails = getStore(order.store_id);

              const orderQty = order.items?.reduce(
                (sum, item) => sum + item.qty,
                0
              );

              const statusStyle =
                STATUS_STYLES[order.status] ||
                "bg-gray-100 text-gray-700 border-gray-200";

              return (
                <div
                  key={order._id?.$oid || order._id || index}
                  className="bg-white border rounded-2xl overflow-hidden shadow-sm"
                >
                  {/* TOP BAR */}
                  <div className="h-1 bg-orange-500" />

                  {/* HEADER */}
                  <div className="flex justify-between items-center flex-wrap gap-4 px-5 py-4 border-b">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">
                        Order ID
                      </p>

                      <p className="text-sm break-all">
                        {order._id?.$oid || order._id}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-lg border text-xs font-medium ${statusStyle}`}
                    >
                      {order.status}
                    </span>
                  </div>

                  {/* BODY */}
                  <div className="p-5">

                    {/* STORE */}
                    <div className="mb-5">
                      <p className="text-xs text-gray-400 mb-1">
                        Store
                      </p>

                      <h3 className="font-bold">
                        {storeDetails?.name ||
                          `Store ${order.store_id}`}
                      </h3>
                    </div>

                    {/* ITEMS */}
                    <div className="space-y-3">
                      {order.items?.map((item, idx) => {
                        const detail = getItem(
                          order.store_id,
                          item.item_id
                        );

                        const price = detail?.price || 0;

                        return (
                          <div
                            key={idx}
                            className="flex justify-between border-b pb-2"
                          >
                            <div>
                              <p className="font-medium">
                                {item.item_id}
                              </p>

                              <p className="text-sm text-gray-400">
                                ₹{price} × {item.qty}
                              </p>
                            </div>

                            <p className="font-semibold">
                              ₹{price * item.qty}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* FOOTER */}
                  <div className="grid grid-cols-3 gap-3 border-t px-5 py-4 bg-gray-50">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">
                        Total
                      </p>

                      <p className="font-bold">
                        ₹{order.total_amount}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400 mb-1">
                        Date
                      </p>

                      <p className="text-sm">
                        {formatDate(
                          order.created_at?.$date ||
                            order.created_at
                        )}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400 mb-1">
                        Qty
                      </p>

                      <p className="font-bold">
                        {orderQty}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}