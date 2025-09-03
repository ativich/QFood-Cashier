"use client";
import { useSearchParams } from "next/navigation";

const mock = [
  { name: "กะเพราหมู", price: 60, qty: 2 },
  { name: "ผัดไทย", price: 65, qty: 1 },
  { name: "โค้ก", price: 25, qty: 2 },
];

export default function PrintOrder() {
  const sp = useSearchParams();
  const id = sp.get("id") || "MOCK-001";
  const subtotal = mock.reduce((s,i)=>s+i.price*i.qty,0);
  const service = Math.round(subtotal*0.1);
  const vat = Math.round((subtotal+service)*0.07);
  const total = subtotal+service+vat;

  return (
    <main className="min-h-screen bg-white p-6 print:p-0">
      <div className="max-w-sm mx-auto border print:border-0 rounded-xl p-4 print:p-0">
        <div className="text-center">
          <div className="text-xl font-extrabold">QFood</div>
          <div className="text-xs text-gray-600">ใบออเดอร์ #{id}</div>
          <div className="text-xs text-gray-500">สาขาหลัก</div>
        </div>
        <div className="mt-3 text-sm">
          {mock.map((i, idx)=>(
            <div key={idx} className="flex justify-between">
              <div>{i.name} x{i.qty}</div>
              <div>{(i.price*i.qty).toFixed(2)}</div>
            </div>
          ))}
        </div>
        <div className="mt-2 border-t pt-2 text-sm space-y-1">
          <div className="flex justify-between"><span>ยอดรวม</span><span>{subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>บริการ 10%</span><span>{service.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>VAT 7%</span><span>{vat.toFixed(2)}</span></div>
          <div className="flex justify-between font-semibold"><span>สุทธิ</span><span>{total.toFixed(2)}</span></div>
        </div>
        <div className="mt-4 text-center no-print">
          <button className="btn btn-primary" onClick={()=>window.print()}>พิมพ์</button>
        </div>
      </div>
      <style jsx global>{`
        @media print { .no-print { display:none!important } body{ background:#fff } }
      `}</style>
    </main>
  );
}
