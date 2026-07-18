"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { menuItems, categories } from "@/lib/menuData";

const PASSWORD = "amorfati2025";

type Customer = { id: string; name: string; phone: string; created_at: string };

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [tab, setTab] = useState<"inventory" | "visitors">("inventory");

  // Inventory state
  const [soldOutIds, setSoldOutIds] = useState<Set<string>>(new Set());
  const [loadingInventory, setLoadingInventory] = useState(true);
  const [toggling, setToggling] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // Visitors state
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loadingCustomers, setLoadingCustomers] = useState(false);
  const [customerSearch, setCustomerSearch] = useState("");

  useEffect(() => {
    if (!authed) return;

    // Sold-out sync
    const fetchSoldOut = () =>
      supabase.from("sold_out").select("item_id").then(({ data }) => {
        if (data) setSoldOutIds(new Set(data.map((r: { item_id: string }) => r.item_id)));
        setLoadingInventory(false);
      });
    fetchSoldOut();
    const channel = supabase
      .channel("admin_sold_out")
      .on("postgres_changes", { event: "*", schema: "public", table: "sold_out" }, fetchSoldOut)
      .subscribe();

    // Fetch customers
    setLoadingCustomers(true);
    supabase
      .from("customers")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) setCustomers(data as Customer[]);
        setLoadingCustomers(false);
      });

    // Real-time customer updates
    const custChannel = supabase
      .channel("admin_customers")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "customers" }, (payload) => {
        setCustomers((prev) => [payload.new as Customer, ...prev]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
      supabase.removeChannel(custChannel);
    };
  }, [authed]);

  const handleLogin = (e: React.SyntheticEvent) => {
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

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) +
      " · " + d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
  };

  // ── Login screen ────────────────────────────────────────────────────
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
                style={{ background: "#1A1A1A", border: pwError ? "1.5px solid #ef4444" : "1.5px solid #2a2a2a" }}
              />
              <button type="button" onClick={() => setShowPw((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300"
                aria-label={showPw ? "Hide password" : "Show password"}>
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
            <button type="submit" className="w-full py-3 rounded-xl text-white font-bold text-sm"
              style={{ background: "linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)" }}>
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  const realCategories = categories.filter(c => c.id !== "all" && c.id !== "just-dropped");

  const filteredCustomers = customers.filter((c) => {
    const q = customerSearch.trim().toLowerCase();
    return !q || c.name.toLowerCase().includes(q) || c.phone.includes(q);
  });

  // ── Authenticated dashboard ─────────────────────────────────────────
  return (
    <div className="min-h-screen px-4 py-6" style={{ background: "#0E0E0E" }}>
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.jpeg" alt="Amor Fati" className="w-10 h-10 rounded-xl object-cover" style={{ border: "2px solid #7C3AED" }} />
          <div>
            <h1 className="text-white font-bold text-base" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Amor Fati Admin
            </h1>
            <p className="text-stone-500 text-xs">Coffee & Eatery · Tirupati</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            {tab === "inventory" && soldOutIds.size > 0 && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: "#ef4444", color: "white" }}>
                {soldOutIds.size} sold out
              </span>
            )}
            {tab === "visitors" && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: "#7C3AED", color: "white" }}>
                {customers.length} visitors
              </span>
            )}
          </div>
        </div>

        {/* Tab bar */}
        <div className="flex gap-2 mb-6 p-1 rounded-xl" style={{ background: "#1A1A1A" }}>
          {[
            { id: "inventory", label: "Inventory", icon: "🍽️" },
            { id: "visitors", label: "Visitors", icon: "👥" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as "inventory" | "visitors")}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-semibold transition-all"
              style={{
                background: tab === t.id ? "#7C3AED" : "transparent",
                color: tab === t.id ? "white" : "#6b7280",
              }}
            >
              <span>{t.icon}</span> {t.label}
            </button>
          ))}
        </div>

        {/* ── Inventory tab ─────────────────────────────────────────── */}
        {tab === "inventory" && (
          <>
            <div className="relative mb-6">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500 pointer-events-none">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                </svg>
              </span>
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Search items…"
                className="w-full pl-9 pr-9 py-3 rounded-xl text-white text-sm outline-none"
                style={{ background: "#1A1A1A", border: "1.5px solid #2a2a2a" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#7C3AED")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#2a2a2a")}
              />
              {search && (
                <button onClick={() => setSearch("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-white text-xl leading-none">×</button>
              )}
            </div>

            {loadingInventory ? (
              <div className="text-stone-500 text-sm text-center py-20">Loading…</div>
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
                        <h2 className="text-white font-bold text-sm" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{cat.name}</h2>
                        <div className="flex-1 h-px" style={{ background: "#2a2a2a" }} />
                      </div>
                      <div className="space-y-2">
                        {items.map((item) => {
                          const isSoldOut = soldOutIds.has(item.id);
                          const isToggling = toggling === item.id;
                          return (
                            <div key={item.id} className="flex items-center gap-3 rounded-xl px-4 py-3"
                              style={{ background: isSoldOut ? "#1f0a0a" : "#1A1A1A", border: isSoldOut ? "1px solid #7f1d1d" : "1px solid #2a2a2a" }}>
                              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: item.veg ? "#16a34a" : "#dc2626" }} />
                              <div className="flex-1 min-w-0">
                                <p className="text-white text-sm font-semibold truncate">{item.name}</p>
                                <p className="text-stone-500 text-xs">₹{item.price}</p>
                              </div>
                              {isSoldOut && <span className="text-[10px] font-black uppercase tracking-widest text-red-400">Sold Out</span>}
                              <button onClick={() => toggle(item.id)} disabled={isToggling}
                                aria-label={isSoldOut ? "Mark available" : "Mark sold out"}
                                className="relative shrink-0 w-11 h-6 rounded-full transition-all"
                                style={{ background: isSoldOut ? "#ef4444" : "#2a2a2a", opacity: isToggling ? 0.5 : 1 }}>
                                <span className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all"
                                  style={{ left: isSoldOut ? "calc(100% - 1.375rem)" : "0.125rem" }} />
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
          </>
        )}

        {/* ── Visitors tab ──────────────────────────────────────────── */}
        {tab === "visitors" && (
          <>
            <div className="relative mb-4">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500 pointer-events-none">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                </svg>
              </span>
              <input type="text" value={customerSearch} onChange={(e) => setCustomerSearch(e.target.value)}
                placeholder="Search by name or number…"
                className="w-full pl-9 pr-9 py-3 rounded-xl text-white text-sm outline-none"
                style={{ background: "#1A1A1A", border: "1.5px solid #2a2a2a" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#7C3AED")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#2a2a2a")}
              />
              {customerSearch && (
                <button onClick={() => setCustomerSearch("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-white text-xl leading-none">×</button>
              )}
            </div>

            {loadingCustomers ? (
              <div className="text-stone-500 text-sm text-center py-20">Loading visitors…</div>
            ) : filteredCustomers.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-4xl mb-3">👥</p>
                <p className="text-stone-400 text-sm font-medium">
                  {customerSearch ? "No visitors match your search." : "No visitors yet. Share your QR code!"}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredCustomers.map((c) => (
                  <div key={c.id} className="flex items-center gap-3 rounded-xl px-4 py-3.5"
                    style={{ background: "#1A1A1A", border: "1px solid #2a2a2a" }}>
                    {/* Avatar */}
                    <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-bold text-sm"
                      style={{ background: "rgba(124,58,237,0.2)", color: "#A78BFA" }}>
                      {c.name.trim().charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-semibold truncate">{c.name}</p>
                      <p className="text-stone-500 text-xs mt-0.5">{c.phone}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-stone-600 text-[10px]">{formatDate(c.created_at)}</p>
                      <a href={`https://wa.me/91${c.phone}`} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: "rgba(37,211,102,0.15)", color: "#25D366" }}>
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.107 1.51 5.833L.057 23.215a.75.75 0 0 0 .916.916l5.382-1.453A11.953 11.953 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.943 0-3.77-.524-5.337-1.438l-.383-.226-3.966 1.07 1.07-3.966-.226-.383A9.953 9.953 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                        WhatsApp
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}
