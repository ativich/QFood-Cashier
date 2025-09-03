"use client";
import Image from "next/image";

const sample = [
  { id: 1, name: "กะเพราหมู", price: 60, img: "/menu/basil-pork.svg" },
  { id: 2, name: "คะน้าหมูกรอบ", price: 75, img: "/menu/fried-chicken.svg" },
  { id: 3, name: "ผัดไทย", price: 65, img: "/menu/pad-thai.svg" },
  { id: 4, name: "ข้าวผัด", price: 60, img: "/menu/fried-rice.svg" },
  { id: 5, name: "โค้ก", price: 25, img: "/menu/cola.svg" },
  { id: 6, name: "น้ำแข็ง", price: 5, img: "/menu/iced-tea.svg" },
  { id: 7, name: "เฟรนช์ฟรายส์", price: 55, img: "/menu/fried-chicken.svg" },
  { id: 8, name: "ไก่ทอด", price: 79, img: "/menu/fried-chicken.svg" },
  { id: 9, name: "ข้าวมันไก่", price: 55, img: "/menu/fried-rice.svg" },
  { id: 10, name: "ชาเย็น", price: 35, img: "/menu/iced-tea.svg" },
  { id: 11, name: "ลาเต้", price: 55, img: "/menu/latte.svg" },
  { id: 12, name: "เอสเปรสโซ", price: 50, img: "/menu/espresso.svg" },
];

export default function ProductPad({ onPick, disabled }) {
  const clickItem = (p)=>{
    if (disabled) { alert("กรุณาเลือกโต๊ะก่อน"); return; }
    onPick?.(p);
  };

  return (
    <div className="card p-3">
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
        {sample.map(p => (
          <button key={p.id} onClick={()=>clickItem(p)} className="card p-2 text-left hover:ring-2 hover:ring-blue-500">
            <div className="flex items-center gap-2">
              <div className="relative w-12 h-12 bg-gray-100 rounded-md overflow-hidden">
                <Image src={p.img} alt={p.name} fill style={{objectFit:"cover"}} />
              </div>
              <div>
                <div className="font-medium leading-tight line-clamp-2">{p.name}</div>
                <div className="text-xs text-gray-500 mt-0.5">{p.price.toFixed(2)} ฿</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
