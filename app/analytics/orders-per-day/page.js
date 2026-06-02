"use client";

import { useEffect, useState } from "react";

export default function OrdersPerDayPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/analytics/orders-per-day`
    )
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <div className="min-h-screen p-10 bg-[#f7f6f2]">
      <h1 className="text-4xl font-bold mb-8">
        Orders Per Day
      </h1>

      <table className="w-full bg-white rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-black text-white">
            <th className="p-4 text-left">Date</th>
            <th className="p-4 text-left">Orders</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <tr
              key={row._id}
              className="border-b"
            >
              <td className="p-4">
                {row._id}
              </td>

              <td className="p-4">
                {row.totalOrders}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}