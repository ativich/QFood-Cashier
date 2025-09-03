"use client";
export default function Topbar({ onSearch }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white border-b border-brand-100">
      <div className="flex items-center gap-3">
        <span className="font-semibold">สาขา:</span>
        <select className="input">
          <option>สาขาหลัก</option>
          <option>สาขา 2</option>
        </select>
        <span className="ml-6 badge badge-green">กะเช้า</span>
      </div>
      <div className="flex items-center gap-2">
        <input placeholder="ค้นหาเมนู / สแกนบาร์โค้ด" className="input w-[320px]" onChange={(e)=>onSearch?.(e.target.value)} />
        <button className="btn btn-secondary">เปิดลิ้นชัก</button>
        <button className="btn">ช่วยเหลือ</button>
      </div>
    </div>
  );
}
