"use client";
import { useState, useEffect } from "react";

interface Store {
  name: string;
  store_id: string;
}

interface TokenPayload {
  username: string;
  role: string;
  stores: Store[];
  exp: number;
}

interface TopbarProps {
  onSearch?: (value: string) => void;
}

export default function Topbar({ onSearch }: TopbarProps) {
  const [user, setUser] = useState<TokenPayload | null>(null);
  const [selectedStore, setSelectedStore] = useState<string>("");

  const fetchUserFromToken = async () => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("access_token");
    if (!token) {
      console.error("ไม่มี token กรุณา login ก่อน");
      return;
    }

    try {
      const jwtModule = await import("jwt-decode");
      const jwt_decode: (token: string) => TokenPayload =
        (jwtModule as any).default || (jwtModule as any);

      const decoded = jwt_decode(token);
      setUser(decoded);

      // โหลดค่าจาก localStorage ก่อน ถ้าไม่มีให้ใช้สาขาแรก
const storedStore = localStorage.getItem("selectedStoreId");
if (storedStore) {
  setSelectedStore(storedStore);
} else if (decoded.stores.length > 0) {
  setSelectedStore(decoded.stores[0].store_id);
  localStorage.setItem("selectedStoreId", decoded.stores[0].store_id);
}


      console.log("Decoded JWT:", decoded);
    } catch (err) {
      console.error("JWT decode error:", err);
    }
  };

const handleStoreChange = (storeId: string) => {
  setSelectedStore(storeId);
  localStorage.setItem("selectedStoreId", storeId);

  // dispatch custom event ให้ component อื่นรู้
  window.dispatchEvent(new Event("storeChanged"));
};



  useEffect(() => {
    fetchUserFromToken();
  }, []);

  return (
    <div className="flex items-center justify-between p-4 bg-white border-b border-brand-100">
      <div className="flex items-center gap-3">
        <span className="font-semibold">สาขา:</span>
<select
  className="input"
  value={selectedStore}
  onChange={(e) => handleStoreChange(e.target.value)}
>
  {user?.stores.map((store) => (
    <option key={store.store_id} value={store.store_id}>
      {store.name}
    </option>
  ))}
</select>

        <span className="ml-6 badge badge-green">กะเช้า</span>
      </div>

      <div className="flex items-center gap-2">
        <input
          placeholder="ค้นหาเมนู / สแกนบาร์โค้ด"
          className="input w-[320px]"
          onChange={(e) => onSearch?.(e.target.value)}
        />
        <button className="btn btn-secondary">เปิดลิ้นชัก</button>
        <button className="btn">ช่วยเหลือ</button>
      </div>
    </div>
  );
}
