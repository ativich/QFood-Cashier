"use client";
import Shell from "../../../components/Shell";
import { useParams } from "next/navigation";

const mockItems = [
  { name: "กะเพราหมู", price: 60, qty: 2 },
  { name: "ผัดไทย", price: 65, qty: 1 },
  { name: "โค้ก", price: 25, qty: 2 },
];

export default function OrderDetail() {
  const { id } = useParams();
  const subtotal = mockItems.reduce((s,i)=>s+i.price*i.qty,0);
  const service = Math.round(subtotal*0.1);
  const vat = Math.round((subtotal+service)*0.07);
  const total = subtotal+service+vat;

  return (
    <Shell>
      <div className="card p-4">
        <div className="flex items-center">
          <div className="font-semibold">รายละเอียดออเดอร์</div>
          <div className="ml-2 text-gray-500 text-sm">{id}</div>
          <div className="ml-auto flex gap-2">
            <a className="btn" href={`/print/order?id=${id}`} target="_blank">พิมพ์ออเดอร์</a>
          </div>
        </div>
        <div className="mt-3">
          {mockItems.map((i, idx) => (
            <div key={idx} className="flex items-center justify-between border-t py-2">
              <div>{i.name} <span className="text-xs text-gray-500">x{i.qty}</span></div>
              <div>{(i.price*i.qty).toFixed(2)} ฿</div>
            </div>
          ))}
          <div className="mt-3 border-t pt-2 space-y-1 text-sm">
            <div className="flex justify-between"><span>ยอดรวม</span><span>{subtotal.toFixed(2)} ฿</span></div>
            <div className="flex justify-between"><span>บริการ 10%</span><span>{service.toFixed(2)} ฿</span></div>
            <div className="flex justify-between"><span>VAT 7%</span><span>{vat.toFixed(2)} ฿</span></div>
            <div className="flex justify-between text-lg font-semibold"><span>สุทธิ</span><span>{total.toFixed(2)} ฿</span></div>
          </div>
        </div>
      </div>
    </Shell>
  );
}
