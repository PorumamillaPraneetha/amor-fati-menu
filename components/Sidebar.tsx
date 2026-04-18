"use client";

type NavId = "menu" | "orders" | "history";

interface SidebarProps {
  active: NavId;
  onNav: (id: NavId) => void;
}

const navItems = [
  {
    id: "menu" as NavId,
    label: "Menu",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    id: "orders" as NavId,
    label: "My Orders",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 12h6M9 16h4" />
      </svg>
    ),
  },
  {
    id: "history" as NavId,
    label: "History",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
];

export default function Sidebar({ active, onNav }: SidebarProps) {
  return (
    <aside className="hidden lg:flex flex-col w-56 bg-white border-r border-stone-100 h-full flex-shrink-0">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-stone-50">
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm"
            style={{ background: "linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)" }}
          >
            <span
              className="text-white font-bold text-base"
              style={{ fontFamily: "Georgia, serif" }}
            >
              A
            </span>
          </div>
          <div>
            <div
              className="font-bold text-stone-800 text-sm leading-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Amor Fati
            </div>
            <div className="text-[10px] text-stone-400 tracking-widest uppercase font-medium">
              Coffee &amp; Eatery
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNav(item.id)}
            className={`nav-item ${active === item.id ? "active" : ""}`}
          >
            <span style={{ color: active === item.id ? "#7C3AED" : "#9CA3AF" }}>
              {item.icon}
            </span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Bottom info */}
      <div className="px-3 py-4 border-t border-stone-100 space-y-1">
        <a
          href="https://www.instagram.com/cafe.amorfati/"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-item"
        >
          <span className="text-stone-400">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          </span>
          <span>@cafe.amorfati</span>
        </a>
        <div className="px-4 pb-1">
          <p className="text-[11px] text-stone-600 leading-relaxed font-semibold">
            📍 VV Mahal Rd, Tirupati · 10AM–10PM
          </p>
        </div>
      </div>
    </aside>
  );
}
