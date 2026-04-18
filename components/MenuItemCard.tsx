"use client";

import Image from "next/image";
import { useState } from "react";
import type { MenuItem } from "@/lib/menuData";

interface MenuItemCardProps {
  item: MenuItem;
  index?: number;
}

export default function MenuItemCard({ item, index = 0 }: MenuItemCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="menu-card fade-in-up bg-white rounded-2xl overflow-hidden flex flex-col"
      style={{
        animationDelay: `${index * 40}ms`,
        border: "1px solid rgba(124,58,237,0.07)",
        boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
      }}
    >
      {/* Image */}
      <div className="relative h-40 sm:h-44 bg-gray-100 flex-shrink-0 overflow-hidden">
        {!imgError ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, 33vw"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-4xl"
            style={{ background: "linear-gradient(135deg, #F3F0FF, #EDE8DF)" }}
          >
            🍽️
          </div>
        )}

        {/* Must Try badge */}
        {item.mustTry && (
          <div
            className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full text-white text-xs font-bold must-try-pulse"
            style={{ background: "var(--purple)", fontSize: "0.65rem" }}
          >
            ⭐ Must Try
          </div>
        )}

        {/* Veg/Non-veg indicator */}
        <div className="absolute top-2 right-2">
          {item.veg !== undefined && (
            <div
              className="w-5 h-5 rounded-sm flex items-center justify-center border-2"
              style={{
                borderColor: item.veg ? "#16a34a" : "#dc2626",
                background: "white",
              }}
            >
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  background: item.veg ? "#16a34a" : "#dc2626",
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-3.5 flex flex-col flex-1">
        <h3
          className="font-bold text-sm leading-snug mb-1"
          style={{ color: "var(--charcoal)" }}
        >
          {item.name}
        </h3>
        <p
          className="text-xs leading-relaxed flex-1 mb-3"
          style={{ color: "var(--gray)", lineHeight: "1.5" }}
        >
          {item.description}
        </p>

        {/* Addons */}
        {item.addons && item.addons.length > 0 && (
          <div className="mb-2.5 flex flex-wrap gap-1">
            {item.addons.map((addon) => (
              <span
                key={addon.label}
                className="text-xs px-2 py-0.5 rounded-full"
                style={{
                  background: "#F3F0FF",
                  color: "var(--purple)",
                  border: "1px solid #DDD6FE",
                }}
              >
                +{addon.label} ₹{addon.price}
              </span>
            ))}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between mt-auto">
          <span
            className="text-base font-black"
            style={{ color: "var(--purple)" }}
          >
            ₹{item.price}
          </span>
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{
              background: "#F3F0FF",
              color: "#7C3AED",
              fontWeight: 500,
            }}
          >
            {item.veg ? "Veg" : item.veg === false ? "Non-veg" : ""}
          </span>
        </div>
      </div>
    </div>
  );
}
