"use client";
import Shell from "../../../components/Shell";
import { useState } from "react";

export default function MenuNew() {
  const [ok, setOk] = useState(false);
  const submit = (e)=>{
    e.preventDefault();
    setOk(true);
  };
  return (
    <Shell>
      <div className="card p-4 max-w-2xl">
        <div className="font-semibold mb-3">เพิ่มเมนูใหม่</div>
        <form onSubmit={submit} className="grid grid-cols-2 gap-3">
          <input className="input col-span-2" placeholder="ชื่อเมนู" required />
          <input className="input" type="number" placeholder="ราคา" required />
          <select className="input">
            <option>อาหาร</option>
            <option>เครื่องดื่ม</option>
            <option>กาแฟ</option>
          </select>
          <input className="input col-span-2" type="file" accept="image/*" />
          <textarea className="input col-span-2" placeholder="รายละเอียด (ถ้ามี)" rows={3}></textarea>
          <div className="col-span-2 flex gap-2">
            <button className="btn btn-primary" type="submit">บันทึก</button>
            <a className="btn" href="/menu">ยกเลิก</a>
          </div>
          {ok && <div className="col-span-2 text-emerald-600 text-sm">บันทึกสำเร็จ (เดโม)</div>}
        </form>
      </div>
    </Shell>
  );
}
