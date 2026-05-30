import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f7f6f2] text-[#1a1a1a] font-sans">

      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
            Order Management
          </p>

          <h1 className="text-6xl font-black tracking-tight leading-none">
            Order Management
            <br />
            System
          </h1>

          <p className="mt-6 text-xl text-gray-600 max-w-2xl leading-relaxed">
            Manage orders, track statuses, and monitor stores
            using a clean and modern dashboard interface.
          </p>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Create Order */}
          <Link
            href="/create-order"
            className="group bg-white border border-gray-200 rounded-3xl p-8 hover:border-black hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-10">
              <span className="text-sm uppercase tracking-[0.25em] text-gray-500">
                01
              </span>

              <span className="text-2xl group-hover:translate-x-1 transition-transform">
                →
              </span>
            </div>

            <h2 className="text-3xl font-bold mb-3">
              Create Order
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed">
              Create new customer orders and assign them to stores.
            </p>
          </Link>

          {/* Orders */}
          <Link
            href="/orders"
            className="group bg-white border border-gray-200 rounded-3xl p-8 hover:border-black hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-10">
              <span className="text-sm uppercase tracking-[0.25em] text-gray-500">
                02
              </span>

              <span className="text-2xl group-hover:translate-x-1 transition-transform">
                →
              </span>
            </div>

            <h2 className="text-3xl font-bold mb-3">
              Orders List
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed">
              View all orders, filter by store, and track activity.
            </p>
          </Link>

          {/* Update Status */}
          <Link
            href="/update-status"
            className="group bg-white border border-gray-200 rounded-3xl p-8 hover:border-black hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-10">
              <span className="text-sm uppercase tracking-[0.25em] text-gray-500">
                03
              </span>

              <span className="text-2xl group-hover:translate-x-1 transition-transform">
                →
              </span>
            </div>

            <h2 className="text-3xl font-bold mb-3">
              Update Status
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed">
              Update order workflow status in real-time.
            </p>
          </Link>

          {/* Archive Orders */}
{/* Quick Actions */}
<div className="mt-8 flex flex-wrap gap-3">

  <Link
    href="/archive-orders"
    className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium hover:border-black transition"
  >
    Archive Orders
  </Link>

  <Link
    href="/analytics/orders-per-day"
    className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium hover:border-black transition"
  >
    Orders Per Day
  </Link>

  <Link
    href="/analytics/revenue"
    className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium hover:border-black transition"
  >
    Revenue Analytics
  </Link>

  <Link
    href="/analytics/top-items"
    className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium hover:border-black transition"
  >
    Top Selling Items
  </Link>

</div>

        </div>

        {/* Bottom Section */}
        <div className="mt-16 border-t border-gray-300 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <p className="text-gray-500 text-sm tracking-wide">
            Multi-store Order Management Dashboard
          </p>

          <p className="text-gray-400 text-sm">
            Built with Next.js · Tailwind CSS · Node.js
          </p>
        </div>

      </div>
    </div>
  );
}