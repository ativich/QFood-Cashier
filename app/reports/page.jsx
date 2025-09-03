"use client";
import Shell from "../../components/Shell";

function Stat({ title, value, sub }) {
  return (
    <div className="card p-4">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs text-gray-500 mt-1">{sub}</div>
    </div>
  );
}

export default function Reports() {
  return (
    <Shell>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <Stat title="ยอดขายวันนี้" value="12,450 ฿" sub="+8% จากเมื่อวาน" />
        <Stat title="จำนวนบิล" value="57 บิล" sub="+3 บิล" />
        <Stat title="ค่าเฉลี่ย/บิล" value="218 ฿" sub="+5 ฿" />
        <Stat title="เมนูขายดี" value="กะเพราหมู" sub="145 จาน เดือนนี้" />
      </div>

      <div className="card p-4">
        <div className="flex items-center mb-3">
          <div className="font-semibold">สรุปรายวัน</div>
          <div className="ml-auto flex gap-2">
            <button className="btn">7 วัน</button>
            <button className="btn btn-primary">30 วัน</button>
            <button className="btn">90 วัน</button>
          </div>
        </div>
        {/* Simple bar chart placeholder */}
        <div className="grid grid-cols-12 gap-2 h-40 items-end">
          {[12,14,9,16,20,18,22,19,17,23,25,21].map((h,i)=>(
            <div key={i} className="bg-brand-400 rounded-t" style={{height:`${h*6}px`}} title={`Day ${i+1}`}></div>
          ))}
        </div>
      </div>
    </Shell>
  );
}
