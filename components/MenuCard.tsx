"use client";

import { useState } from "react";
import type { MenuItem } from "@/lib/menuData";

const CATEGORY_FALLBACKS: Record<string, string> = {
  'french-toasts': "🍞",
  coffee:  "☕",
  matcha:  "🍵",
  fried:   "🍟",
  pizza:   "🍕",
  burgers: "🍔",
  smash:   "🔥",
  wraps:   "🌯",
  bowls:   "🥣",
  shakes:  "🥤",
  brownie: "🍫",
  coolers: "🧊",
};

const CATEGORY_GRADIENT: Record<string, string> = {
  'french-toasts': "from-yellow-50 to-amber-100",
  coffee:  "from-amber-50 to-orange-100",
  matcha:  "from-green-50 to-emerald-100",
  fried:   "from-yellow-50 to-amber-100",
  pizza:   "from-red-50 to-orange-100",
  burgers: "from-orange-50 to-amber-100",
  smash:   "from-red-50 to-rose-100",
  wraps:   "from-lime-50 to-green-100",
  bowls:   "from-teal-50 to-cyan-100",
  shakes:  "from-purple-50 to-pink-100",
  brownie: "from-amber-50 to-stone-200",
  coolers: "from-cyan-50 to-blue-100",
};

export default function MenuCard({ item }: { item: MenuItem }) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const fallbackEmoji = CATEGORY_FALLBACKS[item.category] ?? "🍽️";
  const fallbackGradient = CATEGORY_GRADIENT[item.category] ?? "from-stone-50 to-stone-100";

  return (
    <div className="menu-card bg-white rounded-2xl overflow-hidden border border-stone-100 flex flex-col"
      style={{ boxShadow: "0 2px 10px rgba(28,25,23,0.07)" }}
    >
      {/* ── Image ─────────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden" style={{ paddingBottom: (item.category === 'coolers' || item.category === 'choco-dips') ? "110%" : "65%" }}>
        <div className="absolute inset-0">

          {/* Skeleton shown until image loads */}
          {!loaded && !errored && (
            <div className="absolute inset-0 skeleton" />
          )}

          {/* Fallback when image fails */}
          {errored && (
            <div className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${fallbackGradient}`}>
              <span className="text-4xl opacity-60">{fallbackEmoji}</span>
            </div>
          )}

          {/* Actual image */}
          {!errored && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.image}
              alt={item.name}
              className="absolute inset-0 w-full h-full object-cover img-reveal"
              style={{
                opacity: loaded ? 1 : 0,
                objectFit: (item.category === 'coolers' || item.category === 'choco-dips') ? 'contain' : 'cover',
                objectPosition: item.category === 'shakes' ? 'top' : 'center',
                background: (item.category === 'coolers' || item.category === 'choco-dips') ? '#EDE8E0' : 'transparent',
              }}
              loading="lazy"
              decoding="async"
              onLoad={() => setLoaded(true)}
              onError={() => { setLoaded(true); setErrored(true); }}
            />
          )}
        </div>

        {/* Veg / Non-veg indicator */}
        <div className="absolute top-2 left-2 z-10">
          <div
            className="veg-box bg-white shadow-sm"
            style={{ borderColor: item.veg ? "#16a34a" : "#dc2626" }}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: item.veg ? "#16a34a" : "#dc2626" }}
            />
          </div>
        </div>

        {/* Must Try badge */}
        {item.mustTry && (
          <div className="absolute top-2 right-2 z-10 flex items-center gap-0.5 bg-amber-400 text-white text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full shadow-md">
            ★ Must Try
          </div>
        )}

        {/* Sub tag gradient overlay */}
        {item.sub && !item.sub.includes("·") && (
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent px-2.5 py-2 z-10">
            <span className="text-white text-[10px] font-semibold uppercase tracking-wider drop-shadow">
              {item.sub}
            </span>
          </div>
        )}
      </div>

      {/* ── Details ──────────────────────────────────────── */}
      <div className="p-2.5 flex flex-col flex-1 gap-1">

        {/* Name */}
        <h3 className="font-semibold text-stone-800 text-[13px] leading-snug line-clamp-2">
          {item.name}
        </h3>

        {/* Description */}
        <p className="text-stone-400 text-[11px] leading-relaxed line-clamp-2 flex-1">
          {item.description}
        </p>

        {/* Toppings */}
        {item.sub && item.sub.includes("·") && (
          <p className="text-[10px] text-purple-400 truncate">{item.sub}</p>
        )}

        {/* Price row */}
        <div className="flex items-center justify-between mt-1.5">
          <span
            className="text-[10px] font-medium px-1.5 py-0.5 rounded-full"
            style={{
              background: item.veg ? "#dcfce7" : "#fee2e2",
              color: item.veg ? "#15803d" : "#b91c1c",
            }}
          >
            {item.veg ? "Veg" : "Non-veg"}
          </span>
          <span className="font-bold text-sm" style={{ color: "#7C3AED" }}>
            ₹{item.price}
          </span>
        </div>
      </div>
    </div>
  );
}
