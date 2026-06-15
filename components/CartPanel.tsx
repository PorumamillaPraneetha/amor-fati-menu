"use client";

import { useState } from "react";

export default function CartPanel() {
  const [orderType, setOrderType] = useState<"dine" | "takeaway">("dine");

  return (
    <aside className="hidden lg:flex flex-col w-72 xl:w-80 bg-white border-l border-stone-100 h-full flex-shrink-0">

      {/* User / table header */}
      <div className="px-5 py-4 border-b border-stone-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center"
            style={{ background: "#EDE9FE" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-stone-800">Table 1</p>
            <p className="text-xs text-stone-400">cafe.amorfati</p>
          </div>
        </div>
        <button className="text-stone-400 hover:text-stone-600 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="5" r="1" fill="currentColor" />
            <circle cx="12" cy="12" r="1" fill="currentColor" />
            <circle cx="12" cy="19" r="1" fill="currentColor" />
          </svg>
        </button>
      </div>

      {/* Cart heading */}
      <div className="px-5 py-4 border-b border-stone-50 flex items-center justify-between">
        <h2
          className="font-bold text-stone-800 text-lg"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Cart
        </h2>
        <span className="text-xs text-stone-400 font-medium bg-stone-50 px-2.5 py-1 rounded-full">
          Order All
        </span>
      </div>

      {/* Order type toggle */}
      <div className="px-4 py-3 border-b border-stone-50">
        <div className="flex gap-1 bg-stone-50 rounded-xl p-1">
          {[
            { id: "dine" as const, label: "Dine In" },
            { id: "takeaway" as const, label: "Take Away" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setOrderType(t.id)}
              className={`order-tab ${orderType === t.id ? "active" : "inactive"}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Empty cart state */}
      <div className="flex-1 flex flex-col items-center justify-center py-12 text-center px-4">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3"
          style={{ background: "#EDE9FE" }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.8">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
        </div>
        <p className="text-stone-500 font-medium text-sm">Your cart is empty</p>
        <p className="text-stone-400 text-xs mt-1">Add items from the menu</p>
      </div>
    </aside>
  );
}
