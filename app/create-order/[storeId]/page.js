"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import axios from "axios";
import {
  ArrowLeft,
  Check,
  ShoppingCart,
  Loader2,
} from "lucide-react";

import { stores } from "@/data/stores";

export default function StorePage() {
  const params = useParams();

  // FIX: convert param to string safely
  const storeId = String(params?.storeId || "");

  // FIX: store lookup
  const store = useMemo(() => {
    return stores.find((s) => String(s.store_id) === storeId);
  }, [storeId]);

  // FIX: removed TypeScript syntax from JS file
  const [cart, setCart] = useState({});

  const [isOrderPlacing, setIsOrderPlacing] = useState(false);

  const addItem = (item) => {
    setCart((prev) => ({
      ...prev,
      [item.item_id]: {
        ...item,
        qty: (prev[item.item_id]?.qty || 0) + 1,
      },
    }));
  };

  const removeItem = (item) => {
    setCart((prev) => {
      const updated = { ...prev };

      if (!updated[item.item_id]) return prev;

      updated[item.item_id] = {
        ...updated[item.item_id],
        qty: updated[item.item_id].qty - 1,
      };

      if (updated[item.item_id].qty <= 0) {
        delete updated[item.item_id];
      }

      return updated;
    });
  };

  const totalAmount = Object.values(cart).reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const totalItems = Object.values(cart).reduce(
    (acc, item) => acc + item.qty,
    0
  );

  const createOrder = async () => {
    if (totalItems === 0) return;

    try {
      setIsOrderPlacing(true);

      await axios.post("http://localhost:5000/orders", {
        store_id: store.store_id,
        items: Object.values(cart).map(({ item_id, qty }) => ({
          item_id,
          qty,
        })),
        total_amount: totalAmount,
      });

      alert("Order placed successfully!");

      setCart({});
    } catch (error) {
      console.error(error);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsOrderPlacing(false);
    }
  };

  // Store not found
  if (!store) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center font-mono">
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-3">
            404
          </p>

          <h1 className="text-3xl font-bold mb-4">
            Store not found
          </h1>

          <Link
            href="/create-order"
            className="text-sm text-blue-500 hover:underline"
          >
            Back to Stores
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-mono">
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">

        {/* LEFT SECTION */}
        <div>

          {/* HEADER */}
          <div className="mb-6 border-b pb-5">
            <Link
              href="/create-order"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-4"
            >
              <ArrowLeft size={14} />
              Back
            </Link>

            <p className="text-xs text-gray-400 uppercase mb-1">
              STR-{store.store_id}
            </p>

            <h1 className="text-4xl font-bold">
              {store.name}
            </h1>

            <div className="flex items-center gap-3 mt-3 text-sm text-gray-500">
              <span>⭐ {store.rating}</span>
              <span>{store.items.length} items</span>
            </div>
          </div>

          {/* MENU */}
          <p className="text-xs uppercase tracking-wider text-gray-400 mb-4">
            Menu Items
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {store.items.map((item) => (
              <div
                key={item.item_id}
                className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition"
              >
                <p className="text-xs text-gray-400 mb-1">
                  {item.item_id}
                </p>

                <h2 className="font-bold text-lg mb-2">
                  {item.name || item.item_id}
                </h2>

                <p className="text-sm text-gray-500 mb-4">
                  {item.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg">
                    ₹{item.price}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => removeItem(item)}
                      className="w-8 h-8 border rounded"
                    >
                      -
                    </button>

                    <span className="w-5 text-center">
                      {cart[item.item_id]?.qty || 0}
                    </span>

                    <button
                      onClick={() => addItem(item)}
                      className="w-8 h-8 border rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SECTION - CART */}
        <div className="sticky top-6 h-fit">
          <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">

            {/* CART HEADER */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <ShoppingCart size={18} />
                <span className="font-bold">Cart</span>
              </div>

              <span className="text-sm text-gray-500">
                {totalItems} items
              </span>
            </div>

            {/* CART ITEMS */}
            <div className="p-4 min-h-[120px] border-b">
              {totalItems === 0 ? (
                <p className="text-sm text-gray-400 text-center">
                  Cart is empty
                </p>
              ) : (
                <div className="space-y-3">
                  {Object.values(cart).map((item) => (
                    <div
                      key={item.item_id}
                      className="flex justify-between"
                    >
                      <div>
                        <p className="font-medium">
                          {item.item_id}
                        </p>

                        <p className="text-sm text-gray-400">
                          ₹{item.price} × {item.qty}
                        </p>
                      </div>

                      <p className="font-semibold">
                        ₹{item.price * item.qty}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* SUMMARY */}
            <div className="p-4 border-b">
              <div className="flex justify-between mb-2 text-sm">
                <span>Total Items</span>
                <span>{totalItems}</span>
              </div>

              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="p-4 flex flex-col gap-3">
              <button
                onClick={createOrder}
                disabled={totalItems === 0 || isOrderPlacing}
                className="bg-black text-white py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-40"
              >
                {isOrderPlacing ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Placing...
                  </>
                ) : (
                  <>
                    <Check size={16} />
                    Place Order
                  </>
                )}
              </button>

              <button
                onClick={() => setCart({})}
                disabled={totalItems === 0}
                className="border py-3 rounded-lg disabled:opacity-40"
              >
                Clear Cart
              </button>

              <Link
                href="/create-order"
                className="text-center text-sm text-gray-500 hover:text-black"
              >
                ← Choose another store
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}