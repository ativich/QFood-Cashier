"use client";
import Shell from "../../../components/Shell";
import { useState } from "react";

export default function StockNew() {
  const [ok, setOk] = useState(false);
  const submit = (e)=>{
    e.preventDefault();
    setOk(true);
  };
  return (
    <Shell>
      <div className="card p-4 max-w-2xl">
        <div className="font-semibold mb-3">รับสต็อกเข้าคลัง</div>
        <form onSubmit={submit} className="grid grid-cols-2 gap-3">
          <input className="input col-span-2" placeholder="SKU / รหัสวัตถุดิบ" required />
          <input className="input" placeholder="ชื่อวัตถุดิบ" required />
          <input className="input" placeholder="หน่วย (เช่น กก., กล่อง, กระป๋อง)" required />
          <input className="input" type="number" placeholder="จำนวนที่รับเข้า" required />
          <input className="input" type="number" placeholder="ขั้นต่ำที่ควรมี" />
          <textarea className="input col-span-2" placeholder="หมายเหตุ" rows={3}></textarea>
          <div className="col-span-2 flex gap-2">
            <button className="btn btn-primary" type="submit">บันทึก</button>
            <a className="btn" href="/stock">ยกเลิก</a>
          </div>
          {ok && <div className="col-span-2 text-emerald-600 text-sm">บันทึกสำเร็จ (เดโม)</div>}
        </form>
      </div>
    </Shell>
  );
}
