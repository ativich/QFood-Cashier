"use client";
import Shell from "../../components/Shell";
import { useState } from "react";

const mock = [
  { id: "MOCK-001", table: "A1", items: 5, total: 420, status: "กำลังทำ" },
  { id: "MOCK-002", table: "A2", items: 3, total: 215, status: "รอชำระ" },
  { id: "MOCK-003", table: "B5", items: 7, total: 690, status: "เสิร์ฟแล้ว" },
];

export default function Orders() {
  const [filter, setFilter] = useState("all");
  const list = mock.filter(m => filter==="all" ? true : m.status===filter);

  return (
    <Shell>
      <div className="card p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-semibold">ออเดอร์</span>
          <div className="ml-auto flex gap-2">
            {["all","กำลังทำ","รอชำระ","เสิร์ฟแล้ว"].map(f => (
              <button key={f} className={`btn ${filter===f?"btn-primary":""}`} onClick={()=>setFilter(f)}>{f==="all"?"ทั้งหมด":f}</button>
            ))}
          </div>
        </div>
        <div className="overflow-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left bg-gray-50">
                <th className="p-2">เลขที่</th>
                <th className="p-2">โต๊ะ</th>
                <th className="p-2">จำนวน</th>
                <th className="p-2">ยอด</th>
                <th className="p-2">สถานะ</th>
                <th className="p-2 text-right">การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              {list.map(o => (
                <tr key={o.id} className="border-t">
                  <td className="p-2">{o.id}</td>
                  <td className="p-2">{o.table}</td>
                  <td className="p-2">{o.items} รายการ</td>
                  <td className="p-2">{o.total.toFixed(2)} ฿</td>
                  <td className="p-2">{o.status}</td>
                  <td className="p-2 text-right">
                    <a className="btn mr-2" href={`/orders/${o.id}`}>ดู</a>
                    <a className="btn" href={`/print/order?id=${o.id}`} target="_blank">พิมพ์</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Shell>
  );
}
