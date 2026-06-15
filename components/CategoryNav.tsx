"use client";

import { useRef, useEffect } from "react";
import { categories } from "@/lib/menuData";

interface CategoryNavProps {
  active: string;
  onChange: (id: string) => void;
}

export default function CategoryNav({ active, onChange }: CategoryNavProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const btn = activeRef.current;
    const container = scrollRef.current;
    if (!btn || !container) return;

    const btnLeft = btn.offsetLeft;
    const btnWidth = btn.offsetWidth;
    const containerWidth = container.offsetWidth;
    const scrollLeft = Math.max(0, btnLeft - containerWidth / 2 + btnWidth / 2);

    container.scrollTo({ left: scrollLeft, behavior: "auto" });
  }, [active]);

  return (
    <div
      ref={scrollRef}
      className="no-scroll-bar flex gap-2 pl-4 pr-4 py-2.5 overflow-x-auto"
    >
      {categories.map((cat) => {
        const isActive = cat.id === active;
        return (
          <button
            key={cat.id}
            ref={isActive ? activeRef : null}
            onClick={() => onChange(cat.id)}
            className={`cat-pill press ${isActive ? "active" : "inactive"}`}
          >
            <span>{cat.emoji}</span>
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}
