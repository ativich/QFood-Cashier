"use client";
import Shell from "../../components/Shell";
import Image from "next/image";
import { useState } from "react";

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

export default function Menu() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("ทั้งหมด");
  const filtered = items.filter(i => 
    (cat==="ทั้งหมด" || i.cat===cat) && i.name.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <Shell onSearch={setQ}>
      <div className="card p-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="font-semibold">เมนู</div>
          <div className="ml-auto flex gap-2">
            {["ทั้งหมด","อาหาร","เครื่องดื่ม","กาแฟ"].map(c => (
              <button key={c} className={`btn ${cat===c?"btn-primary":""}`} onClick={()=>setCat(c)}>{c}</button>
            ))}
            <a className="btn btn-success" href="/menu/new">+ เพิ่มเมนู</a>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map(m => (
            <div key={m.id} className="card overflow-hidden">
              <div className="relative w-full h-36 bg-gray-100">
                <Image src={m.img} alt={m.name} fill style={{objectFit:"cover"}} />
              </div>
              <div className="p-3">
                <div className="font-medium">{m.name}</div>
                <div className="text-xs text-gray-500">{m.cat}</div>
                <div className="mt-1 text-sm">{m.price.toFixed(2)} ฿</div>
                <div className="mt-2 flex gap-2">
                  <button className="btn">แก้ไข</button>
                  <button className="btn btn-danger">ลบ</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  );
}
