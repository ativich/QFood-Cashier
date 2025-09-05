// "use client";
// import Image from "next/image";
// import Swal from "sweetalert2";
// import { useState } from "react";

// const sample = [
//   { id: 1, name: "กะเพราหมู", price: 60, img: "/menu/basil-pork.svg", type: "อาหาร" },
//   { id: 2, name: "คะน้าหมูกรอบ", price: 75, img: "/menu/fried-chicken.svg", type: "อาหาร" },
//   { id: 3, name: "ผัดไทย", price: 65, img: "/menu/pad-thai.svg", type: "อาหาร" },
//   { id: 4, name: "ข้าวผัด", price: 60, img: "/menu/fried-rice.svg", type: "อาหาร" },
//   { id: 5, name: "โค้ก", price: 25, img: "/menu/cola.svg", type: "เครื่องดื่ม" },
//   { id: 6, name: "เอสเปรสโซ", price: 50, img: "/menu/espresso.svg", type: "เครื่องดื่ม" },
//   { id: 7, name: "เฟรนช์ฟรายส์", price: 55, img: "/menu/fried-chicken.svg", type: "กินเล่น" },
//   { id: 8, name: "ไก่ทอด", price: 79, img: "/menu/fried-chicken.svg", type: "อาหาร" },
//   { id: 9, name: "ข้าวมันไก่", price: 55, img: "/menu/fried-rice.svg", type: "อาหาร" },
//   { id: 10, name: "ชาเย็น", price: 35, img: "/menu/iced-tea.svg", type: "เครื่องดื่ม" },
//   { id: 11, name: "ลาเต้", price: 55, img: "/menu/latte.svg", type: "เครื่องดื่ม" },
//   { id: 12, name: "น้ำแข็ง", price: 5, img: "/menu/iced-tea.svg", type: "อื่นๆ" },
// ];

// export default function ProductPad({ onPick, disabled }) {
//   const [selectedType, setSelectedType] = useState("ทั้งหมด");

//   const types = ["ทั้งหมด", ...Array.from(new Set(sample.map((p) => p.type)))];

//   const filteredProducts =
//     selectedType === "ทั้งหมด"
//       ? sample
//       : sample.filter((p) => p.type === selectedType);

//   const clickItem = (p) => {
//     if (disabled) {
//       Swal.fire({
//         icon: "warning",
//         title: "ยังไม่ได้เลือกโต๊ะ",
//         text: "กรุณาเลือกโต๊ะก่อน",
//         confirmButtonText: "ตกลง",
//       });
//       return;
//     }
//     onPick?.(p);
//   };

//   return (
//     <div className="card p-3 space-y-3">
//       {/* ปุ่มเลือกประเภท */}
//       <div className="flex flex-wrap gap-2">
//         {types.map((t) => (
//           <button
//             key={t}
//             onClick={() => setSelectedType(t)}
//             className={`px-3 py-1 rounded-full border ${selectedType === t
//                 ? "bg-blue-500 text-white border-blue-500"
//                 : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
//               }`}
//           >
//             {t}
//           </button>
//         ))}
//       </div>

//       {/* รายการสินค้า */}
//       <div className="overflow-x-auto pb-2">
//         <div className="grid grid-rows-2 auto-cols-max grid-flow-col gap-2 p-1">
//           {filteredProducts.map((p) => (
//             <button
//               key={p.id}
//               onClick={() => clickItem(p)}
//               className="card p-2 w-40 text-left hover:ring-2 hover:ring-blue-500"
//             >
//               <div className="flex items-center gap-2">
//                 <div className="relative w-12 h-12 bg-gray-100 rounded-md overflow-hidden">
//                   <Image
//                     src={p.img}
//                     alt={p.name}
//                     fill
//                     style={{ objectFit: "cover" }}
//                   />
//                 </div>
//                 <div>
//                   <div className="font-medium leading-tight line-clamp-2">
//                     {p.name}
//                   </div>
//                   <div className="text-xs text-gray-500 mt-0.5">
//                     {p.price.toFixed(2)} ฿
//                   </div>
//                   <div className="text-[10px] text-blue-500 font-medium">
//                     {p.type}
//                   </div>
//                 </div>
//               </div>
//             </button>
//           ))}
//         </div>
//       </div>


//     </div>
//   );
// }




"use client";
import Image from "next/image";
import Swal from "sweetalert2";
import { useState } from "react";

const sample = [
  { id: 1, name: "กะเพราหมู", price: 60, img: "/menu/basil-pork.svg", type: "อาหาร" },
  { id: 2, name: "คะน้าหมูกรอบ", price: 75, img: "/menu/fried-chicken.svg", type: "อาหาร" },
  { id: 3, name: "ผัดไทย", price: 65, img: "/menu/pad-thai.svg", type: "อาหาร" },
  { id: 4, name: "ข้าวผัด", price: 60, img: "/menu/fried-rice.svg", type: "อาหาร" },
  { id: 5, name: "โค้ก", price: 25, img: "/menu/cola.svg", type: "เครื่องดื่ม" },
  { id: 6, name: "เอสเปรสโซ", price: 50, img: "/menu/espresso.svg", type: "เครื่องดื่ม" },
  { id: 7, name: "เฟรนช์ฟรายส์", price: 55, img: "/menu/fried-chicken.svg", type: "กินเล่น" },
  { id: 8, name: "ไก่ทอด", price: 79, img: "/menu/fried-chicken.svg", type: "อาหาร" },
  { id: 9, name: "ข้าวมันไก่", price: 55, img: "/menu/fried-rice.svg", type: "อาหาร" },
  { id: 10, name: "ชาเย็น", price: 35, img: "/menu/iced-tea.svg", type: "เครื่องดื่ม" },
  { id: 11, name: "ลาเต้", price: 55, img: "/menu/latte.svg", type: "เครื่องดื่ม" },
  { id: 12, name: "น้ำแข็ง", price: 5, img: "/menu/iced-tea.svg", type: "อื่นๆ" },
];

export default function ProductPad({ onPick, disabled }) {
  const [selectedType, setSelectedType] = useState("ทั้งหมด");

  const types = ["ทั้งหมด", ...Array.from(new Set(sample.map((p) => p.type)))];

  const filteredProducts = selectedType === "ทั้งหมด" ? sample : sample.filter((p) => p.type === selectedType);

  const clickItem = (p) => {
    if (disabled) {
      Swal.fire({
        icon: "warning",
        title: "ยังไม่ได้เลือกโต๊ะ",
        text: "กรุณาเลือกโต๊ะก่อน",
        confirmButtonText: "ตกลง",
      });
      return;
    }
    onPick?.(p);
  };

  return (
    <div className="card p-3 space-y-3">
      {/* ปุ่มเลือกประเภท */}
      <div className="flex flex-wrap gap-2">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setSelectedType(t)}
            className={`px-3 py-1 rounded-full border ${
              selectedType === t
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* รายการสินค้า */}
      <div className="overflow-x-auto pb-2">
        <div className="grid grid-rows-2 auto-cols-max grid-flow-col gap-2 p-1">
          {filteredProducts.map((p) => (
            <button
              key={p.id}
              onClick={() => clickItem(p)}
              className="card p-2 w-40 text-left hover:ring-2 hover:ring-blue-500"
            >
              <div className="flex items-center gap-2">
                <div className="relative w-12 h-12 bg-gray-100 rounded-md overflow-hidden">
                  <Image src={p.img} alt={p.name} fill style={{ objectFit: "cover" }} />
                </div>
                <div>
                  <div className="font-medium leading-tight line-clamp-2">{p.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{p.price.toFixed(2)} ฿</div>
                  <div className="text-[10px] text-blue-500 font-medium">{p.type}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
