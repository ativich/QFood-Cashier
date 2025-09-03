"use client";
import Shell from "../../components/Shell";

export default function Settings() {
  return (
    <Shell>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card p-4 space-y-3">
          <div className="font-semibold">ข้อมูลร้าน</div>
          <div className="grid grid-cols-2 gap-2">
            <input className="input" placeholder="ชื่อร้าน" defaultValue="QFood Bistro" />
            <input className="input" placeholder="สาขา" defaultValue="สาขาหลัก" />
            <input className="input col-span-2" placeholder="ที่อยู่" defaultValue="123/4 ถนนสายอาหาร กรุงเทพฯ" />
          </div>
          <div className="flex gap-2">
            <button className="btn btn-primary">บันทึก</button>
            <button className="btn">ยกเลิก</button>
          </div>
        </div>

        <div className="card p-4 space-y-3">
          <div className="font-semibold">ภาษีและค่าบริการ</div>
          <div className="grid grid-cols-2 gap-2">
            <label className="text-sm">VAT (%)</label>
            <input className="input" type="number" defaultValue={7} />
            <label className="text-sm">Service Charge (%)</label>
            <input className="input" type="number" defaultValue={10} />
          </div>
          <div className="flex gap-2">
            <button className="btn btn-primary">บันทึก</button>
          </div>
        </div>

        <div className="card p-4 space-y-3">
          <div className="font-semibold">วิธีชำระเงิน</div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> เงินสด</label>
            <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> โอน</label>
            <label className="flex items-center gap-2"><input type="checkbox" /> บัตรเครดิต</label>
            <label className="flex items-center gap-2"><input type="checkbox" /> PromptPay</label>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-primary">บันทึก</button>
          </div>
        </div>
      </div>
    </Shell>
  );
}
