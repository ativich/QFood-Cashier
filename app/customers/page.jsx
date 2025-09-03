"use client";
import Shell from "../../components/Shell";
import { useState } from "react";

const sessions = [
  { id: "A1-20250809-1", table: "A1", orders: 2, total: 635, openedAt: "14:10", status: "กำลังทาน" },
  { id: "A2-20250809-1", table: "A2", orders: 1, total: 215, openedAt: "13:50", status: "รอชำระ" },
  { id: "B5-20250808-2", table: "B5", orders: 3, total: 890, openedAt: "เมื่อวาน", status: "ปิดบิล" },
];

export default function Customers() {
  const [tab, setTab] = useState("qr");
  const [moving, setMoving] = useState(null);
  const [target, setTarget] = useState("");
  const tables = Array.from({length:10}, (_,i)=>`A${i+1}`).concat(Array.from({length:10}, (_,i)=>`B${i+1}`));

  const doMove = ()=>{
    // mock action
    setMoving(null);
    alert(`ย้ายโต๊ะเรียบร้อย: ไปยัง ${target}`);
  };

  return (
    <Shell>
      <div className="card p-4">
        <div className="flex items-center gap-2">
          <div className="font-semibold">ลูกค้า</div>
          <div className="ml-4 bg-gray-100 rounded-md p-1">
            <button className={`btn ${tab==='qr'?'btn-primary':''}`} onClick={()=>setTab('qr')}>นิรนาม (QR)</button>
            <button className={`btn ml-1 ${tab==='member'?'btn-primary':''}`} onClick={()=>setTab('member')}>สมาชิก</button>
          </div>
          <div className="ml-auto text-sm text-gray-500">คำอธิบาย: โหมดนิรนาม ลูกค้าสแกน QR จากโต๊ะเพื่อสั่ง ไม่บันทึกชื่อ</div>
        </div>

        {tab==='qr' ? (
          <div className="overflow-auto mt-3">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr className="text-left">
                  <th className="p-2">Session</th>
                  <th className="p-2">โต๊ะ</th>
                  <th className="p-2">จำนวนออเดอร์</th>
                  <th className="p-2">ยอดรวม</th>
                  <th className="p-2">เปิดเมื่อ</th>
                  <th className="p-2">สถานะ</th>
                  <th className="p-2 text-right">การจัดการ</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map(s => (
                  <tr key={s.id} className="border-t">
                    <td className="p-2">{s.id}</td>
                    <td className="p-2">{s.table}</td>
                    <td className="p-2">{s.orders}</td>
                    <td className="p-2">{s.total.toFixed(2)} ฿</td>
                    <td className="p-2">{s.openedAt}</td>
                    <td className="p-2">{s.status}</td>
                    <td className="p-2 text-right">
                      <button className="btn mr-2">รายละเอียด</button>
                      <button className="btn mr-2" onClick={()=>setMoving(s)}>ย้ายโต๊ะ</button><button className="btn">ปิดบิล</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="mt-4 text-gray-500">โหมดสมาชิก (ยังไม่เปิดใช้งานในเดโมนี้)</div>
        )}
      </div>
    {moving && (
        <div className="fixed inset-0 bg-black/40 grid place-items-center z-50">
          <div className="card p-4 w-[520px] max-w-[94vw]">
            <div className="text-lg font-semibold">ย้ายโต๊ะ</div>
            <div className="text-sm text-gray-500">จากโต๊ะ {moving.table} / Session {moving.id}</div>
            <div className="mt-3">
              <label className="text-sm">ย้ายไปโต๊ะ</label>
              <select className="input w-full mt-1" value={target} onChange={e=>setTarget(e.target.value)}>
                <option value="">เลือกโต๊ะปลายทาง</option>
                {tables.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button className="btn" onClick={()=>setMoving(null)}>ยกเลิก</button>
              <button className="btn btn-primary" onClick={doMove} disabled={!target}>ยืนยัน</button>
            </div>
          </div>
        </div>
      )}
    </Shell>
  );
}
