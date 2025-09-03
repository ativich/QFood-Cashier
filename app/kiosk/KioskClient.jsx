"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

const items = [
  { id: 1, name: "กะเพราหมู", price: 60, img: "/menu/basil-pork.svg", cat: "อาหาร" },
  { id: 2, name: "คะน้าหมูกรอบ", price: 75, img: "/menu/fried-chicken.svg", cat: "อาหาร" },
  { id: 3, name: "ผัดไทย", price: 65, img: "/menu/pad-thai.svg", cat: "อาหาร" },
  { id: 4, name: "ข้าวผัด", price: 60, img: "/menu/fried-rice.svg", cat: "อาหาร" },
  { id: 5, name: "โค้ก", price: 25, img: "/menu/cola.svg", cat: "เครื่องดื่ม" },
  { id: 6, name: "ชาเย็น", price: 35, img: "/menu/iced-tea.svg", cat: "เครื่องดื่ม" },
  { id: 7, name: "ลาเต้", price: 55, img: "/menu/latte.svg", cat: "กาแฟ" },
  { id: 8, name: "เอสเปรสโซ", price: 50, img: "/menu/espresso.svg", cat: "กาแฟ" },
];

export default function Kiosk() {
  const sp = useSearchParams();
  const table = sp.get("table") || "-";
  const [cart, setCart] = useState([]);
  const [sent, setSent] = useState(false);

  const add = (m)=>{
    const f = cart.find(x=>x.id===m.id);
    if (f) setCart(cart.map(x=> x.id===m.id? {...x, qty:x.qty+1}:x));
    else setCart([...cart, {...m, qty:1}]);
  };
  const inc = (id)=> setCart(cart.map(i=> i.id===id? {...i, qty:i.qty+1}:i));
  const dec = (id)=> setCart(cart.map(i=> i.id===id? {...i, qty:Math.max(1,i.qty-1)}:i));
  const remove = (id)=> setCart(cart.filter(i=>i.id!==id));

  const total = cart.reduce((s,i)=>s+i.price*i.qty,0);

  const sendOrder = ()=>{
    try {
      // BroadcastChannel to POS page (for demo on same device)
      const ch = new BroadcastChannel("orders");
      ch.postMessage({ table, items: cart, at: Date.now() });
      ch.close();
    } catch (e) {
      // fallback: write to localStorage (POS can poll if needed)
      const key = `orders:${table}:${Date.now()}`;
      localStorage.setItem(key, JSON.stringify(cart));
    }
    setSent(true);
    setCart([]);
  };

  if (sent) {
    return (
      <main className="min-h-screen grid place-items-center bg-white">
        <div className="card p-8 text-center">
          <div className="text-2xl font-bold">ส่งออเดอร์สำเร็จ</div>
          <div className="text-sm text-gray-500 mt-2">โต๊ะ {table} กรุณารอสักครู่</div>
          <button className="btn btn-primary mt-4" onClick={()=>setSent(false)}>สั่งต่อ</button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto p-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold">สั่งอาหารด้วยตัวเอง</div>
          <div className="badge badge-blue">โต๊ะ {table}</div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-4">
          {items.map(m => (
            <div key={m.id} className="card overflow-hidden">
              <div className="relative w-full h-36 bg-gray-100">
                <Image src={m.img} alt={m.name} fill style={{objectFit:"cover"}} />
              </div>
              <div className="p-3">
                <div className="font-medium">{m.name}</div>
                <div className="text-xs text-gray-500">{m.cat}</div>
                <div className="mt-1 text-sm">{m.price.toFixed(2)} ฿</div>
                <div className="mt-2">
                  <button className="btn btn-primary w-full" onClick={()=>add(m)}>+ เพิ่ม</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="card p-4 mt-4">
          <div className="font-semibold">ตะกร้าของฉัน</div>
          {cart.length===0 ? (
            <div className="text-gray-500 text-sm mt-2">ยังไม่มีรายการ</div>
          ) : (
            <div className="space-y-2 mt-2">
              {cart.map(i=> (
                <div key={i.id} className="flex items-center justify-between bg-gray-50 rounded-md p-2">
                  <div>
                    <div className="font-medium">{i.name}</div>
                    <div className="text-xs text-gray-500">{i.price.toFixed(2)} ฿</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="btn" onClick={()=>dec(i.id)}>-</button>
                    <div className="w-8 text-center">{i.qty}</div>
                    <button className="btn" onClick={()=>inc(i.id)}>+</button>
                    <div className="w-20 text-right">{(i.price*i.qty).toFixed(2)}</div>
                    <button className="btn btn-danger" onClick={()=>remove(i.id)}>ลบ</button>
                  </div>
                </div>
              ))}
              <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                <span>รวม</span><span>{total.toFixed(2)} ฿</span>
              </div>
              <div className="text-right">
                <button className="btn btn-success" onClick={sendOrder}>ส่งออเดอร์</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
