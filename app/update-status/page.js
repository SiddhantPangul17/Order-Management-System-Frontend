"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function UpdateStatus() {
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState("PLACED");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  const statusOptions = [
    {
      value: "PLACED",
      label: "Placed",
      color:
        "bg-blue-50 border-blue-300 text-blue-900",
      desc: "Order received from customer",
    },
    {
      value: "PREPARING",
      label: "Preparing",
      color:
        "bg-orange-50 border-orange-300 text-orange-900",
      desc: "Being prepared in the kitchen",
    },
    {
      value: "COMPLETED",
      label: "Completed",
      color:
        "bg-green-50 border-green-300 text-green-900",
      desc: "Order fulfilled successfully",
    },
  ];

  const currentStatus = statusOptions.find(
    (s) => s.value === status
  );

  const updateStatus = async () => {
    if (!orderId.trim()) {
      setMessage("Please enter Order ID");
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);

      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}/status`,
        { status }
      );

      setMessage("Status updated successfully");
      setMessageType("success");

      setTimeout(() => {
        setMessage("");
      }, 4000);
    } catch (error) {
      console.log(error);

      setMessage(
        error.response?.data?.message ||
          "Failed to update order status"
      );

      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f6f2] font-sans text-[#1a1a1a]">

      <div className="max-w-6xl mx-auto px-6 py-14">

        {/* HEADER */}
        <div className="mb-10">
          <p className="text-xs tracking-[0.25em] uppercase text-gray-500 mb-3">
            Order Management
          </p>

          <h1 className="text-5xl font-black tracking-tight">
            Update Order Status
          </h1>
        </div>

        {/* NAVIGATION */}
        <div className="flex items-center gap-4 mb-10">
          <Link
            href="/create-order"
            className="border border-gray-400 rounded-2xl px-6 py-4 text-lg hover:bg-white transition"
          >
            ← Create order
          </Link>

          <span className="text-gray-400">·</span>

          <Link
            href="/orders"
            className="border border-gray-400 rounded-2xl px-6 py-4 text-lg hover:bg-white transition"
          >
            View orders →
          </Link>
        </div>

        {/* MAIN CARD */}
        <div className="bg-white border border-gray-200 rounded-3xl p-10">

          {/* ORDER ID */}
          <div className="mb-8">
            <label className="block text-sm uppercase tracking-[0.2em] text-gray-600 mb-4">
              Order ID
            </label>

            <input
              type="text"
              value={orderId}
              onChange={(e) =>
                setOrderId(e.target.value)
              }
              placeholder="e.g. abc123def456xyz"
              className="w-full h-16 rounded-2xl border border-gray-300 px-5 text-2xl bg-[#fafafa] outline-none focus:border-black transition"
            />

            <p className="text-gray-500 text-lg mt-3">
              Find the Order ID on the orders page
            </p>
          </div>

          {/* STATUS */}
          <div className="mb-8">
            <label className="block text-sm uppercase tracking-[0.2em] text-gray-600 mb-4">
              New Status
            </label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="w-full h-16 rounded-2xl border border-gray-300 px-5 text-2xl bg-[#fafafa] outline-none focus:border-black transition"
            >
              {statusOptions.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                >
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* PREVIEW */}
          <div className="mb-8">
            <label className="block text-sm uppercase tracking-[0.2em] text-gray-600 mb-4">
              Preview
            </label>

            <div
              className={`rounded-2xl border px-6 py-5 text-2xl font-medium ${currentStatus.color}`}
            >
              {currentStatus.label}
            </div>
          </div>

          {/* FLOW */}
          <div className="mb-10 bg-[#f4f2ec] rounded-2xl px-6 py-5 text-xl text-gray-700">
            Placed → Preparing → Completed
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col md:flex-row gap-4">
            <button
              onClick={updateStatus}
              disabled={loading}
              className="flex-1 h-16 rounded-2xl border border-gray-400 text-2xl font-medium hover:bg-black hover:text-white transition disabled:opacity-40"
            >
              {loading
                ? "Updating..."
                : "Update status"}
            </button>

            <button
              onClick={() => {
                setOrderId("");
                setStatus("PLACED");
                setMessage("");
              }}
              className="h-16 px-10 rounded-2xl border border-gray-400 text-2xl hover:bg-white transition"
            >
              Reset
            </button>
          </div>

          {/* MESSAGE */}
          {message && (
            <div
              className={`mt-8 rounded-2xl px-6 py-5 text-xl border ${
                messageType === "success"
                  ? "bg-green-50 border-green-300 text-green-900"
                  : "bg-red-50 border-red-300 text-red-900"
              }`}
            >
              {message}
            </div>
          )}
        </div>

        {/* LOWER SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

          {/* QUICK TIPS */}
          <div className="bg-white border border-gray-200 rounded-3xl p-10">
            <h2 className="text-sm uppercase tracking-[0.2em] text-gray-600 mb-8">
              Quick Tips
            </h2>

            <div className="space-y-6 text-lg leading-relaxed">
              {[
                [
                  "Find ID",
                  "Go to the orders page and copy any order ID",
                ],
                [
                  "Select status",
                  "Choose the new status from the dropdown",
                ],
                [
                  "Update",
                  "Click Update status to apply the change",
                ],
                [
                  "Verify",
                  "Return to orders page and confirm the update",
                ],
              ].map(([title, desc], i) => (
                <div
                  key={i}
                  className="flex gap-4"
                >
                  <div className="w-9 h-9 rounded-full border border-gray-400 flex items-center justify-center text-sm">
                    {i + 1}
                  </div>

                  <div>
                    <p className="font-semibold">
                      {title}
                    </p>

                    <p className="text-gray-600">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* STATUS GUIDE */}
          <div className="bg-white border border-gray-200 rounded-3xl p-10">
            <h2 className="text-sm uppercase tracking-[0.2em] text-gray-600 mb-8">
              Status Guide
            </h2>

            <div className="space-y-5">
              {statusOptions.map((opt) => (
                <div
                  key={opt.value}
                  className={`rounded-2xl border p-6 ${opt.color}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-4 h-4 rounded-full bg-current mt-2 opacity-70" />

                    <div>
                      <p className="text-2xl font-semibold">
                        {opt.label}
                      </p>

                      <p className="text-lg opacity-80 mt-1">
                        {opt.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}