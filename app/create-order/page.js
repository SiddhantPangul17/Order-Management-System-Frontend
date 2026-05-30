"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { stores } from "@/data/stores";

export default function CreateOrderPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8 font-mono">

      {/* Header */}
      <div className="flex items-end justify-between border-b border-gray-200 pb-5 mb-8 flex-wrap gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-1">
            Order management
          </p>
          <h1 className="font-display text-4xl font-extrabold leading-none tracking-tight">
            Create Order
          </h1>
        </div>
        <div className="flex gap-6 text-right">
          <div>
            <span className="block text-2xl font-bold leading-none">{stores.length}</span>
            <span className="text-[10px] uppercase tracking-widest text-gray-400">Stores</span>
          </div>
          <div>
            <span className="block text-2xl font-bold leading-none text-green-400">{stores.length}</span>
            <span className="text-[10px] uppercase tracking-widest text-gray-400">Online</span>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-2.5 mb-8">
        {[
          { label: "Total stores", value: stores.length },
          { label: "Avg rating",   value: "4.5+"       },
          { label: "Cuisines",     value: "10+"        },
        ].map(({ label, value }) => (
          <div key={label} className="bg-gray-100 rounded-lg p-4">
            <span className="block text-[11px] uppercase tracking-widest text-gray-400 mb-1">
              {label}
            </span>
            <span className="block font-display text-xl font-bold">{value}</span>
          </div>
        ))}
      </div>

      {/* Store Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-7">
        {stores.map((store) => (
          <Link key={store.store_id} href={`/create-order/${store.store_id}`}>
            <div className="group relative bg-white border border-gray-100 rounded-lg p-4 hover:border-gray-300 hover:bg-gray-50 transition-all cursor-pointer h-full flex flex-col overflow-hidden">

              {/* Orange accent bar on hover */}
              <div className="absolute top-0 inset-x-0 h-0.5 bg-gray-100 group-hover:bg-orange-500 transition-colors" />

              <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">
                STR-{store.store_id}
              </p>
              <p className="font-display font-bold text-base leading-tight mb-2">
                {store.name}
              </p>
              <p className="text-[11px] text-gray-400 mb-3 line-clamp-2 flex-1">
                {store.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                  Open
                </div>
                <span className="text-[11px] text-gray-400">{store.rating}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 pt-5 flex items-center justify-between">
        <p className="text-[11px] tracking-wide text-gray-400">
          ↑ select a store to place an order
        </p>
        <Link href="/stores">
          <button className="inline-flex items-center gap-2 bg-gray-900 text-white text-[13px] font-medium px-5 py-2.5 rounded-lg hover:bg-gray-700 transition-colors">
            <ArrowRight size={15} />
            Browse all stores
          </button>
        </Link>
      </div>

    </div>
  );
}