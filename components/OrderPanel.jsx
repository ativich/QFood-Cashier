"use client";
import { useMemo } from "react";

export default function OrderPanel({ table, items, setItems, setShowPayment }) {
  const subtotal = useMemo(()=>items.reduce((s,i)=>s+i.price*i.qty,0),[items]);
  const service = useMemo(()=> Math.round(subtotal * 0.1), [subtotal]); // 10% mock
  const vat = useMemo(()=> Math.round((subtotal+service) * 0.07), [subtotal, service]); // 7% mock
  const total = subtotal + service + vat;

  const inc = (id)=> setItems(items.map(i=> i.id===id? {...i, qty:i.qty+1}:i));
  const dec = (id)=> setItems(items.map(i=> i.id===id? {...i, qty:Math.max(1,i.qty-1)}:i));
  const remove = (id)=> setItems(items.filter(i=>i.id!==id));

  return (
    <div className="card p-4 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500">โต๊ะ</div>
          <div className="font-semibold text-lg">{table || "-"}</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500">บิลเลขที่</div>
          <div className="font-semibold">MOCK-001</div>
        </div>
      </div>

      <div className="mt-3 border-t pt-3 flex-1 overflow-auto">
        {items.length===0 ? (
          <div className="text-center text-gray-500 py-10">ยังไม่มีรายการ ให้เลือกเมนูทางซ้าย</div>
        ) : (
          <div className="space-y-2">
            {items.map(i=> (
              <div key={i.id} className="flex items-center justify-between bg-gray-50 rounded-md p-2">
                <div>
                  <div className="font-medium">{i.name}</div>
                  <div className="text-xs text-gray-500">{i.price.toFixed(2)} ฿</div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="btn" onClick={()=>dec(i.id)}>-</button>
                  <div className="w-8 text-center">{i.qty}</div>
                  <button className="btn" onClick={()=>inc(i.id)}>+</button>
                  <div className="w-20 text-right">{(i.price*i.qty).toFixed(2)}</div>
                  <button className="btn btn-danger" onClick={()=>remove(i.id)}>ลบ</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-3 border-t pt-3 space-y-1 text-sm">
        <div className="flex justify-between"><span>ยอดรวม</span><span>{subtotal.toFixed(2)} ฿</span></div>
        <div className="flex justify-between"><span>บริการ 10%</span><span>{service.toFixed(2)} ฿</span></div>
        <div className="flex justify-between"><span>VAT 7%</span><span>{vat.toFixed(2)} ฿</span></div>
        <div className="flex justify-between text-lg font-semibold"><span>สุทธิ</span><span>{total.toFixed(2)} ฿</span></div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <button className="btn">พักบิล</button>
        <button className="btn">พิมพ์ครัว</button>
        <button className="btn btn-danger">ล้างบิล</button>
        <button className="btn btn-primary" onClick={()=>setShowPayment(true)}>เก็บเงิน</button>
      </div>
    </div>
  );
}
