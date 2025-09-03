"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/pos", label: "หน้าขาย", icon: "🧾" },
  { href: "/orders", label: "ออเดอร์", icon: "📋" },
  { href: "/menu", label: "เมนู", icon: "🍽️" },
  { href: "/stock", label: "สต็อก", icon: "📦" },
  { href: "/customers", label: "ลูกค้า", icon: "👥" },
  { href: "/staff", label: "พนักงาน", icon: "👤" },
  { href: "/reports", label: "รายงาน", icon: "📊" },
  { href: "/settings", label: "ตั้งค่า", icon: "⚙️" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="sidebar">
      <div className="sidebar-title">QFood</div>
      <nav className="flex-1 overflow-y-auto">
        {items.map((it) => {
          const active = pathname === it.href;
          return (
            <Link
              key={it.label}
              href={it.href}
              className={`relative sidebar-item ${active ? "sidebar-item-active" : ""}`}
            >
              <span className="mr-2">{it.icon}</span>{it.label}
              {active && <span className="absolute left-0 top-0 h-full w-1 bg-brand-400 rounded-r-sm" />}
            </Link>
          );
        })}
      </nav>
      <div className="px-4 py-3 text-xs text-gray-400 border-t border-white/10">v0.3 mock</div>
    </aside>
  );
}
