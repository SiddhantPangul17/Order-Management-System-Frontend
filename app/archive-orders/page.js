"use client";

import { useState } from "react";

export default function ArchiveOrdersPage() {
  const [message, setMessage] = useState("");

  const archiveOrders = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/archive-old-orders`,
        {
          method: "POST",
        }
      );

      const data = await res.json();

      setMessage(
        `${data.archivedOrders || 0} orders archived successfully`
      );
    } catch (err) {
      setMessage("Failed to archive orders");
    }
  };

  return (
    <div className="min-h-screen p-10 bg-[#f7f6f2]">
      <h1 className="text-4xl font-bold mb-6">
        Archive Orders
      </h1>

      <button
        onClick={archiveOrders}
        className="bg-black text-white px-6 py-3 rounded-xl"
      >
        Archive Orders Older Than 30 Days
      </button>

      {message && (
        <p className="mt-6 text-lg">
          {message}
        </p>
      )}
    </div>
  );
}