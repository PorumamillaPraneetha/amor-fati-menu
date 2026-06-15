"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import CategoryNav from "@/components/CategoryNav";
import MenuCard from "@/components/MenuCard";
import { menuItems, categories, comboOffers } from "@/lib/menuData";

/* ── Skeleton card ──────────────────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-stone-100"
      style={{ boxShadow: "0 2px 10px rgba(28,25,23,0.05)" }}>
      <div className="skeleton w-full" style={{ paddingBottom: "65%" }} />
      <div className="p-2.5 space-y-2">
        <div className="skeleton h-3.5 w-3/4 rounded" />
        <div className="skeleton h-2.5 w-full rounded" />
        <div className="skeleton h-2.5 w-2/3 rounded" />
        <div className="flex justify-between items-center mt-2">
          <div className="skeleton h-4 w-10 rounded-full" />
          <div className="skeleton h-4 w-8 rounded" />
        </div>
      </div>
    </div>
  );
}

/* ── Search icon ────────────────────────────────────────────────────── */
function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

/* ── Main page ──────────────────────────────────────────────────────── */
export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [ready, setReady] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const headerRef = useRef<HTMLElement | null>(null);

  /* Simulate a brief loading state for skeleton */
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 600);
    return () => clearTimeout(t);
  }, []);

  /* ── Filtering ──────────────────────────────────────────────────── */
  const filtered = useMemo(() => {
    let list = menuItems;
    if (activeCategory !== "all") list = list.filter((i) => i.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          (i.sub && i.sub.toLowerCase().includes(q))
      );
    }
    return list;
  }, [activeCategory, search]);

  /* ── Grouped view (All Items) ───────────────────────────────────── */
  const grouped = useMemo(() => {
    if (activeCategory !== "all" || search.trim()) return null;
    return categories.slice(1).reduce<
      { id: string; name: string; emoji: string; items: typeof menuItems }[]
    >((acc, cat) => {
      const items = menuItems.filter((i) => i.category === cat.id);
      if (items.length) acc.push({ ...cat, items });
      return acc;
    }, []);
  }, [activeCategory, search]);

  const activeCatLabel =
    activeCategory === "all"
      ? "All Items"
      : categories.find((c) => c.id === activeCategory)?.name ?? "Menu";

  /* ── Category click ─────────────────────────────────────────────── */
  const handleCatChange = useCallback((id: string) => {
    setSearch("");
    setActiveCategory(id);
    if (id !== "all") {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  }, []);

  /* ── Skeleton grid ──────────────────────────────────────────────── */
  const SkeletonGrid = ({ count = 6 }: { count?: number }) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {Array.from({ length: count }).map((_, i) => <SkeletonCard key={i} />)}
    </div>
  );

  return (
    <div className="min-h-screen" style={{ background: "#FAF7F0" }}>

      {/* ── Sticky header ─────────────────────────────────────────── */}
      <header
        ref={headerRef}
        className="sticky top-0 z-40 bg-white/96 backdrop-blur-md border-b border-stone-100"
        style={{ boxShadow: "0 2px 12px rgba(28,25,23,0.07)" }}
      >
        {/* Logo + status */}
        <div className="max-w-3xl mx-auto px-4 pt-3.5 pb-2.5">
          <div className="flex items-center gap-3 mb-3">
            {/* Logo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.jpeg"
              alt="Amor Fati logo"
              className="flex-shrink-0 rounded-xl object-cover"
              style={{ width: 44, height: 44, objectPosition: "center top", border: "1px solid #7C3AED" }}
            />

            <div className="flex-1 min-w-0">
              <h1
                className="font-bold text-stone-800 text-base leading-tight truncate"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Amor Fati
              </h1>
              <p className="text-stone-600 text-[12px] font-semibold leading-tight">Coffee &amp; Eatery</p>
              <p className="text-stone-400 text-[11px] font-medium">VV Mahal Rd, Tirupati</p>
            </div>

            {/* Open badge */}
            <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-1 flex-shrink-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[11px] font-semibold text-emerald-700">Open</span>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none">
              <SearchIcon />
            </span>
            <input
              type="text"
              autoComplete="off"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setActiveCategory("all"); }}
              placeholder="Search dishes, drinks…"
              className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-9 py-2.5 text-sm text-stone-700 placeholder:text-stone-400 outline-none transition-colors"
              onFocus={(e) => (e.currentTarget.style.borderColor = "#7C3AED")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#e7e5e4")}
            />
            {search && (
              <button
                onClick={() => { setSearch(""); setActiveCategory("all"); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xl leading-none"
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Category nav */}
        <div className="border-t border-stone-100 max-w-3xl mx-auto">
          <CategoryNav active={activeCategory} onChange={handleCatChange} />
        </div>
      </header>

      {/* ── Main content ──────────────────────────────────────────── */}
      <main className="max-w-3xl mx-auto px-4 pt-5 pb-4">

        {/* Search results label */}
        {search.trim() && (
          <p className="text-xs text-stone-500 mb-3 fade-up">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""} for{" "}
            <span className="font-semibold text-stone-700">&quot;{search}&quot;</span>
          </p>
        )}

        {/* Section heading for filtered categories */}
        {!search.trim() && activeCategory !== "all" && (
          <div className="flex items-center justify-between mb-4 fade-up">
            <h2
              className="font-bold text-stone-800 text-lg"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {activeCatLabel}
            </h2>
            <span className="text-xs text-stone-400 bg-stone-100 px-2.5 py-1 rounded-full font-medium">
              {filtered.length} items
            </span>
          </div>
        )}

        {/* ── Loading skeletons ──────────────────────────────────── */}
        {!ready && (
          <div className="space-y-8">
            <SkeletonGrid count={4} />
            <SkeletonGrid count={6} />
          </div>
        )}

        {/* ── Grouped view (All + no search) ────────────────────── */}
        {ready && grouped && (
          <div className="space-y-8">

            {/* ── Combo offer banners — shown first ─────────────── */}
            <div className="space-y-3">
              {comboOffers.map((combo, i) => (
                <div
                  key={i}
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)",
                    boxShadow: "0 8px 32px rgba(124,58,237,0.25)",
                  }}
                >
                  <div className="p-5">
                    <p className="text-purple-200 text-[10px] font-bold uppercase tracking-widest mb-1">
                      {i === 0 ? "✦ Special Deal" : "⭐ Best Value"}
                    </p>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3
                          className="text-white font-bold text-xl mb-1.5 leading-snug"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {combo.name}
                        </h3>
                        <p className="text-purple-200 text-xs leading-relaxed">
                          {combo.items}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-purple-300 text-[10px] font-medium">Only at</p>
                        <p
                          className="text-white font-bold text-3xl leading-none"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          ₹{combo.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {grouped.map((group) => (
              <section
                key={group.id}
                id={`cat-${group.id}`}
                ref={(el) => { sectionRefs.current[group.id] = el; }}
              >
                {/* Section heading */}
                <div className="flex items-center gap-2 mb-3 scroll-mt-32">
                  <span className="text-xl">{group.emoji}</span>
                  <h3
                    className="font-bold text-stone-800 text-base"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {group.name}
                  </h3>
                  <div className="flex-1 h-px bg-stone-200 ml-1" />
                  <span className="text-xs text-stone-400 tabular-nums">{group.items.length}</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {group.items.map((item) => (
                    <MenuCard key={item.id} item={item} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        {/* ── Filtered category or search results ───────────────── */}
        {ready && !grouped && filtered.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {filtered.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        )}

        {/* ── Empty state ───────────────────────────────────────── */}
        {ready && !grouped && filtered.length === 0 && (
          <div className="flex flex-col items-center py-24 text-center fade-up">
            <div className="text-5xl mb-4 select-none">🔍</div>
            <p className="text-stone-600 font-semibold text-base">Nothing found</p>
            <p className="text-stone-400 text-sm mt-1">Try a different keyword or category</p>
            <button
              onClick={() => { setSearch(""); setActiveCategory("all"); }}
              className="press mt-5 text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-md"
              style={{ background: "#7C3AED" }}
            >
              Back to full menu
            </button>
          </div>
        )}
      </main>

      {/* ── Footer ────────────────────────────────────────────────── */}
      <footer className="px-4 pb-10 pt-8 text-center">
        {/* Card */}
        <div
          className="max-w-xs mx-auto rounded-2xl px-6 py-6"
          style={{ background: "white", boxShadow: "0 4px 24px rgba(124,58,237,0.08)", border: "1px solid #ede9fe" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.jpeg"
            alt="Amor Fati logo"
            className="rounded-xl object-cover mx-auto mb-4"
            style={{ width: 64, height: 64, objectPosition: "center top", border: "1px solid #7C3AED" }}
          />

          <p
            className="font-bold text-stone-800 text-base"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Amor Fati
          </p>
          <p className="text-stone-500 font-semibold text-sm mt-0.5">Coffee &amp; Eatery</p>

          <div className="my-4 h-px bg-stone-100" />

          <div className="space-y-1.5">
            <p className="text-stone-700 font-semibold text-sm">📍 VV Mahal Rd, Tirupati</p>
            <p className="text-stone-700 font-semibold text-sm">🕙 Open 10AM – 10PM</p>
            <p className="text-stone-500 text-sm font-medium">@cafe.amorfati</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
