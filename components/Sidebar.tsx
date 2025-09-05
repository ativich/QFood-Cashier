"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // 👉 ต้อง import router
import Swal from "sweetalert2";

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
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    const button = await Swal.fire({
      title: "ออกจากระบบ?",
      text: "คุณต้องการออกจากระบบหรือไม่",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
    });

    if (button.isConfirmed) {
      // ✅ ลบ token ออกให้หมด
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      // ถ้ามีข้อมูลอื่น ๆ ก็ลบด้วย
      // localStorage.removeItem("bun_service_name");
      // localStorage.removeItem("bun_service_level");

      // ✅ redirect ไปหน้า login
      router.push("/");
    }
  };

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
              className={`relative sidebar-item ${
                active ? "sidebar-item-active" : ""
              }`}
            >
              <span className="mr-2">{it.icon}</span>
              {it.label}
              {active && (
                <span className="absolute left-0 top-0 h-full w-1 bg-brand-400 rounded-r-sm" />
              )}
            </Link>
          );
        })}
      </nav>
      <div
        onClick={handleLogout}
        className="px-4 py-3 bg-red-700 text-xs text-center text-gray-200 border-t border-white/10 cursor-pointer"
      >
        <div>ออกจากระบบ</div>
      </div>
      <div className="px-4 py-3 text-xs text-gray-400 border-t border-white/10">
        v0.3 mock
      </div>
    </aside>
  );
}
