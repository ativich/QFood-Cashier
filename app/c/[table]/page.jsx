"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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

export default function CustomerPage({ params }) {
  const table = decodeURIComponent(params.table || "-");
  const [cart, setCart] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(()=>{
    // restore cart per table (mock)
    const key = `cart:${table}`;
    const saved = localStorage.getItem(key);
    if (saved) setCart(JSON.parse(saved));
  }, [table]);

  useEffect(()=>{
    const key = `cart:${table}`;
    localStorage.setItem(key, JSON.stringify(cart));
  }, [cart, table]);

  const add = (it)=>{
    const f = cart.find(c=>c.id===it.id);
    if (f) setCart(cart.map(c=> c.id===it.id? {...c, qty:c.qty+1}:c));
    else setCart([...cart, {...it, qty:1}]);
  };
  const inc = (id)=> setCart(cart.map(c=> c.id===id? {...c, qty:c.qty+1}:c));
  const dec = (id)=> setCart(cart.map(c=> c.id===id? {...c, qty: Math.max(1, c.qty-1)}:c));
  const remove = (id)=> setCart(cart.filter(c=> c.id!==id));

  const total = useMemo(()=> cart.reduce((s,c)=> s+c.price*c.qty, 0), [cart]);

  const submit = ()=>{
    // mock submit
    setSubmitted(true);
    setTimeout(()=>{
      setCart([]);
    }, 1500);
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto p-4">
          <div className="card p-8 text-center space-y-3">
            <div className="text-2xl font-bold">สั่งสำเร็จ 🎉</div>
            <div className="text-gray-600">โต๊ะ {table} กรุณารอพนักงานยืนยันออเดอร์</div>
            <Link href={`/c/${encodeURIComponent(table)}`} className="btn btn-primary inline-block">กลับไปหน้าเมนู</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="text-xl font-semibold">สแกนสั่งอาหาร</div>
          <div className="badge badge-blue">โต๊ะ {table}</div>
          <Link href="/pos" className="btn ml-auto">ไปหน้าแคชเชียร์</Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {items.map(m => (
            <div key={m.id} className="card overflow-hidden">
              <div className="relative w-full h-36 bg-gray-100">
                <Image src={m.img} alt={m.name} fill style={{objectFit:"cover"}} />
              </div>
              <div className="p-3">
                <div className="font-medium">{m.name}</div>
                <div className="text-xs text-gray-500">{m.cat}</div>
                <div className="mt-1 text-sm">{m.price.toFixed(2)} ฿</div>
                <button className="btn btn-primary mt-2 w-full" onClick={()=>add(m)}>เพิ่มลงตะกร้า</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Cart */}
      <div className="fixed left-0 right-0 bottom-0 bg-white border-t">
        <div className="max-w-5xl mx-auto p-3">
          {cart.length===0 ? (
            <div className="text-center text-gray-500">ยังไม่มีรายการในตะกร้า</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="md:col-span-2 space-y-2 max-h-48 overflow-auto">
                {cart.map(c => (
                  <div key={c.id} className="flex items-center justify-between bg-gray-50 rounded p-2">
                    <div>
                      <div className="font-medium">{c.name}</div>
                      <div className="text-xs text-gray-500">{c.price.toFixed(2)} ฿</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="btn" onClick={()=>dec(c.id)}>-</button>
                      <div className="w-8 text-center">{c.qty}</div>
                      <button className="btn" onClick={()=>inc(c.id)}>+</button>
                      <div className="w-20 text-right">{(c.price*c.qty).toFixed(2)}</div>
                      <button className="btn btn-danger" onClick={()=>remove(c.id)}>ลบ</button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="card p-3 space-y-2">
                <div className="flex justify-between"><span>ยอดรวม</span><span>{total.toFixed(2)} ฿</span></div>
                <button className="btn btn-success w-full" onClick={submit}>สั่งเลย</button>
                <div className="text-[11px] text-gray-500 text-center">เป็นเดโม ยังไม่เชื่อมต่อหลังบ้าน</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
