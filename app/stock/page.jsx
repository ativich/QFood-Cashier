"use client";
import Shell from "../../components/Shell";

const items = [
  { sku: "ING-001", name: "ใบกะเพรา", qty: 12, unit: "กำ", min: 5 },
  { sku: "ING-002", name: "หมูสับ", qty: 6, unit: "กก.", min: 4 },
  { sku: "ING-003", name: "เส้นจันท์", qty: 2, unit: "กก.", min: 3 },
  { sku: "ING-004", name: "ข้าวสาร", qty: 18, unit: "กก.", min: 10 },
  { sku: "ING-005", name: "โค้กกระป๋อง", qty: 48, unit: "กระป๋อง", min: 24 },
];

export default function Stock() {
  return (
    <Shell>
      <div className="card p-4">
        <div className="flex items-center">
          <div className="font-semibold">สต็อกวัตถุดิบ</div>
          <a className="btn btn-success ml-auto" href="/stock/new">+ รับสต็อก</a>
        </div>
        <div className="overflow-auto mt-3">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="text-left">
                <th className="p-2">SKU</th>
                <th className="p-2">ชื่อ</th>
                <th className="p-2">คงเหลือ</th>
                <th className="p-2">ขั้นต่ำ</th>
                <th className="p-2">สถานะ</th>
                <th className="p-2 text-right">การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              {items.map(it => {
                const low = it.qty <= it.min;
                return (
                  <tr key={it.sku} className="border-t">
                    <td className="p-2">{it.sku}</td>
                    <td className="p-2">{it.name}</td>
                    <td className="p-2">{it.qty} {it.unit}</td>
                    <td className="p-2">{it.min} {it.unit}</td>
                    <td className="p-2">{low ? <span className="badge badge-yellow">ใกล้หมด</span> : <span className="badge badge-green">เพียงพอ</span>}</td>
                    <td className="p-2 text-right">
                      <button className="btn mr-2">ปรับสต็อก</button>
                      <button className="btn">ประวัติ</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Shell>
  );
}
