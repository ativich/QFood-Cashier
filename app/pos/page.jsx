"use client";
import { useMemo, useState } from "react";
import Shell from "../../components/Shell";
import TableMap from "../../components/TableMap";
import OrderPanel from "../../components/OrderPanel";
import ProductPad from "../../components/ProductPad";
import PaymentModal from "../../components/PaymentModal";
import OpenTableModal from "../../components/OpenTableModal";

import QrModal from "../../components/QrModal";

export default function POS() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("all");
  const [statuses, setStatuses] = useState({ A1: "busy", A2: "bill", B3: "busy" });
  const [items, setItems] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [showOpenModal, setShowOpenModal] = useState(false);
  // Listen for kiosk orders via BroadcastChannel
  if (typeof window !== 'undefined') {
    if (!window.__orders_listener) {
      try {
        const ch = new BroadcastChannel('orders');
        ch.onmessage = (ev)=>{
          const { table: t, items: its } = ev.data || {};
          if (!t || !Array.isArray(its)) return;
          // Select table and merge items
          setSelected(t);
          setStatuses(s=>({ ...s, [t]: 'busy' }));
          setItems(cur=>{
            const map = new Map(cur.map(i=>[i.id,i]));
            its.forEach(n=>{
              const ex = map.get(n.id);
              if (ex) map.set(n.id, { ...ex, qty: ex.qty + (n.qty||1) });
              else map.set(n.id, { id:n.id, name:n.name, price:n.price, qty:n.qty||1 });
            });
            return Array.from(map.values());
          });
          alert(`รับออเดอร์ใหม่จากโต๊ะ ${t}`);
        };
        window.__orders_listener = ch;
      } catch (e) {
        // no-op
      }
    }
  }

  const [showQR, setShowQR] = useState(false);
  const total = useMemo(()=> items.reduce((s,i)=>s+i.price*i.qty,0) * 1.17, [items]); // approx

  const handlePick = (p)=>{
    const found = items.find(i=>i.id===p.id);
    if (found) setItems(items.map(i=> i.id===p.id? {...i, qty:i.qty+1} : i));
    else setItems([...items, {...p, qty:1}]);
  }

  const confirmPay = ()=>{
    setShowPayment(false);
    if (selected) setStatuses({...statuses, [selected]:"vacant"});
    setItems([]);
    alert("ชำระเงินเรียบร้อย (เดโม)");
  }

  return (
    <Shell>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-7 space-y-4">
          <div className="card p-3 flex items-center gap-2">
            <div className="text-sm">โต๊ะ:</div>
            <div className="flex gap-1">
              {["all","vacant","busy","bill"].map(f=>(
                <button key={f} onClick={()=>setFilter(f)} className={`btn ${filter===f ? "btn-primary" : ""}`}>
                  {f==="all"?"ทั้งหมด":f==="vacant"?"ว่าง":f==="busy"?"เปิดบิล":"กำลังชำระ"}
                </button>
              ))}
            </div>
            <button className="btn btn-primary ml-auto" disabled={!selected} onClick={()=>{ if(!selected) return; setStatuses({...statuses, [selected]:"busy"}); setShowQR(true); }}>เปิดโต๊ะ / QR</button>
          </div>

          <TableMap selected={selected} setSelected={setSelected} statuses={statuses} filter={filter} />

          <ProductPad disabled={!selected} onPick={(p)=>{
            if(!selected) { alert("กรุณาเลือกโต๊ะก่อน"); return; }
            handlePick(p);
            setStatuses({...statuses, [selected]:"busy"});
          }} />
        </div>

        <div className="col-span-12 lg:col-span-5">
          <OrderPanel table={selected} items={items} setItems={setItems} setShowPayment={setShowPayment} />
        </div>
      </div>
      <PaymentModal open={showPayment} total={total} onClose={()=>setShowPayment(false)} onConfirm={confirmPay} />
          <QrModal open={showQR} table={selected} onClose={()=>setShowQR(false)} />
          <OpenTableModal open={showOpenModal} table={selected} onClose={()=>setShowOpenModal(false)} />
    </Shell>
  );
}
