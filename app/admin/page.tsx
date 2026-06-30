"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { menuItems, categories } from "@/lib/menuData";

const PASSWORD = "amorfati2025";

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [soldOutIds, setSoldOutIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!authed) return;
    const fetchSoldOut = () =>
      supabase.from("sold_out").select("item_id").then(({ data }) => {
        if (data) setSoldOutIds(new Set(data.map((r: { item_id: string }) => r.item_id)));
        setLoading(false);
      });
    fetchSoldOut();
    const channel = supabase
      .channel("admin_sold_out")
      .on("postgres_changes", { event: "*", schema: "public", table: "sold_out" }, fetchSoldOut)
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [authed]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === PASSWORD) { setAuthed(true); setPwError(false); }
    else { setPwError(true); setPw(""); }
  };

  const toggle = async (itemId: string) => {
    setToggling(itemId);
    if (soldOutIds.has(itemId)) {
      await supabase.from("sold_out").delete().eq("item_id", itemId);
      setSoldOutIds((prev) => { const next = new Set(prev); next.delete(itemId); return next; });
    } else {
      await supabase.from("sold_out").insert({ item_id: itemId });
      setSoldOutIds((prev) => new Set([...prev, itemId]));
    }
    setToggling(null);
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#0E0E0E" }}>
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.jpeg" alt="Amor Fati" className="w-14 h-14 rounded-xl object-cover mx-auto mb-4" style={{ border: "2px solid #7C3AED" }} />
            <h1 className="text-white font-bold text-xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Admin Panel
            </h1>
            <p className="text-stone-500 text-sm mt-1">Amor Fati Coffee & Eatery</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={pw}
                onChange={(e) => { setPw(e.target.value); setPwError(false); }}
                placeholder="Enter password"
                autoFocus
                className="w-full px-4 pr-11 py-3 rounded-xl text-white text-sm outline-none"
                style={{
                  background: "#1A1A1A",
                  border: pwError ? "1.5px solid #ef4444" : "1.5px solid #2a2a2a",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300"
                aria-label={showPw ? "Hide password" : "Show password"}
              >
                {showPw ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            {pwError && <p className="text-red-500 text-xs text-center">Wrong password. Try again.</p>}
            <button
              type="submit"
              className="w-full py-3 rounded-xl text-white font-bold text-sm"
              style={{ background: "linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)" }}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  const realCategories = categories.filter(c => c.id !== "all" && c.id !== "just-dropped");

  return (
    <div className="min-h-screen px-4 py-6" style={{ background: "#0E0E0E" }}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.jpeg" alt="Amor Fati" className="w-10 h-10 rounded-xl object-cover" style={{ border: "2px solid #7C3AED" }} />
          <div>
            <h1 className="text-white font-bold text-base" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Amor Fati Admin
            </h1>
            <p className="text-stone-500 text-xs">Toggle sold-out items below</p>
          </div>
          {soldOutIds.size > 0 && (
            <span className="ml-auto text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: "#ef4444", color: "white" }}>
              {soldOutIds.size} sold out
            </span>
          )}
        </div>

        {/* Search bar */}
        <div className="relative mb-6">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500 pointer-events-none">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search items…"
            className="w-full pl-9 pr-9 py-3 rounded-xl text-white text-sm outline-none"
            style={{ background: "#1A1A1A", border: "1.5px solid #2a2a2a" }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#7C3AED")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#2a2a2a")}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-white text-xl leading-none"
            >×</button>
          )}
        </div>

        {loading ? (
          <div className="text-stone-500 text-sm text-center py-20">Loading menu...</div>
        ) : (
          <div className="space-y-8">
            {realCategories.map((cat) => {
              const q = search.trim().toLowerCase();
              const items = menuItems.filter(
                (i) => i.category === cat.id && (!q || i.name.toLowerCase().includes(q))
              );
              if (!items.length) return null;
              return (
                <div key={cat.id}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">{cat.emoji}</span>
                    <h2 className="text-white font-bold text-sm" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                      {cat.name}
                    </h2>
                    <div className="flex-1 h-px" style={{ background: "#2a2a2a" }} />
                  </div>
                  <div className="space-y-2">
                    {items.map((item) => {
                      const isSoldOut = soldOutIds.has(item.id);
                      const isToggling = toggling === item.id;
                      return (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 rounded-xl px-4 py-3"
                          style={{
                            background: isSoldOut ? "#1f0a0a" : "#1A1A1A",
                            border: isSoldOut ? "1px solid #7f1d1d" : "1px solid #2a2a2a",
                          }}
                        >
                          {/* Veg dot */}
                          <span
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ background: item.veg ? "#16a34a" : "#dc2626" }}
                          />

                          <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-semibold truncate">{item.name}</p>
                            <p className="text-stone-500 text-xs">₹{item.price}</p>
                          </div>

                          {isSoldOut && (
                            <span className="text-[10px] font-black uppercase tracking-widest text-red-400">
                              Sold Out
                            </span>
                          )}

                          {/* Toggle */}
                          <button
                            onClick={() => toggle(item.id)}
                            disabled={isToggling}
                            aria-label={isSoldOut ? "Mark available" : "Mark sold out"}
                            className="relative shrink-0 w-11 h-6 rounded-full transition-all"
                            style={{
                              background: isSoldOut ? "#ef4444" : "#2a2a2a",
                              opacity: isToggling ? 0.5 : 1,
                            }}
                          >
                            <span
                              className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all"
                              style={{ left: isSoldOut ? "calc(100% - 1.375rem)" : "0.125rem" }}
                            />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
