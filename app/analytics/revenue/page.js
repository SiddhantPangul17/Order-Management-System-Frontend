"use client";

import { useEffect, useState } from "react";

export default function RevenuePage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      "http://localhost:5000/api/analytics/revenue-per-store"
    )
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <div className="min-h-screen p-10 bg-[#f7f6f2]">
      <h1 className="text-4xl font-bold mb-8">
        Revenue Per Store
      </h1>

      <table className="w-full bg-white rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-black text-white">
            <th className="p-4 text-left">
              Store ID
            </th>

            <th className="p-4 text-left">
              Revenue
            </th>

            <th className="p-4 text-left">
              Orders
            </th>
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
                ₹{row.revenue}
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