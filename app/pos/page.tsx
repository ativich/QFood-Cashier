// "use client";
// import { useMemo, useState, useEffect } from "react";
// import Shell from "../../components/Shell";
// import TableMap from "../../components/TableMap";
// // import OrderPanel from "../../components/OrderPanel";
// import OrderPanel from "../../components/OrderPanel";
// import ProductPad from "../../components/ProductPad";
// import PaymentModal from "../../components/PaymentModal";
// import OpenTableModal from "../../components/OpenTableModal";
// import Swal from "sweetalert2";
// import MessageBox from "../../components/MessageBox";
// import QrModal from "../../components/QrModal";

// export default function POS() {
//   const [selected, setSelected] = useState<string | null>(null);
//   const [filter, setFilter] = useState("all");
//   const [statuses, setStatuses] = useState<Record<string, string>>({
//     A1: "busy",
//     A2: "bill",
//     B3: "busy",
//   });
//   // const [items, setItems] = useState<any[]>([]);
//   const [orders, setOrders] = useState<Record<string, any[]>>({});
//   const [items, setItems] = useState<any[]>([]);
//   const [showPayment, setShowPayment] = useState(false);
//   const [showOpenModal, setShowOpenModal] = useState(false);

//   useEffect(() => {
//   if (selected) {
//     setItems(orders[selected] || []); // โหลดรายการเก่า ถ้ามี
//   }
// }, [selected, orders]);

//   // Listen for kiosk orders via BroadcastChannel
//   if (typeof window !== "undefined") {
//     if (!(window as any).__orders_listener) {
//       try {
//         const ch = new BroadcastChannel("orders");
//         ch.onmessage = (ev) => {
//           const { table: t, items: its } = ev.data || {};
//           if (!t || !Array.isArray(its)) return;
//           setSelected(t);
//           setStatuses((s) => ({ ...s, [t]: "busy" }));
//           setItems((cur) => {
//             const map = new Map(cur.map((i) => [i.id, i]));
//             its.forEach((n) => {
//               const ex = map.get(n.id);
//               if (ex) {
//                 map.set(n.id, { ...ex, qty: ex.qty + (n.qty || 1) });
//               } else {
//                 map.set(n.id, {
//                   id: n.id,
//                   name: n.name,
//                   price: n.price,
//                   qty: n.qty || 1,
//                 });
//               }
//             });
//             return Array.from(map.values());
//           });
//           alert(`รับออเดอร์ใหม่จากโต๊ะ ${t}`);
//         };
//         (window as any).__orders_listener = ch;
//       } catch (e) {
//         // no-op
//       }
//     }
//   }

//   const [showQR, setShowQR] = useState(false);
//   const total = useMemo(
//     () => items.reduce((s, i) => s + i.price * i.qty, 0) * 1.17,
//     [items]
//   );

//   // const handlePick = (p: any) => {
//   //   const found = items.find((i) => i.id === p.id);
//   //   if (found) {
//   //     setItems(
//   //       items.map((i) =>
//   //         i.id === p.id ? { ...i, qty: i.qty + 1 } : i
//   //       )
//   //     );
//   //   } else {
//   //     setItems([...items, { ...p, qty: 1 }]);
//   //   }
//   // };
//   const handlePick = (p: any) => {
//   let next: any[];
//   const found = items.find((i) => i.id === p.id);
//   if (found) {
//     next = items.map((i) =>
//       i.id === p.id ? { ...i, qty: i.qty + 1 } : i
//     );
//   } else {
//     next = [...items, { ...p, qty: 1 }];
//   }
//   setItems(next);
//   if (selected) {
//     setOrders({ ...orders, [selected]: next });
//   }
// };


//   const confirmPay = () => {
//     setShowPayment(false);
//     if (selected) setStatuses({ ...statuses, [selected]: "vacant" });
//     setItems([]);
//     alert("ชำระเงินเรียบร้อย (เดโม)");
//   };

//   const [msg, setMsg] = useState({ open: false, type: "info", message: "" });

//   const showMessage = (type: string, message: string) => {
//     setMsg({ open: true, type, message });
//   };

//   return (
//     <Shell>
//       <div className="grid grid-cols-12 gap-4">
//         <div className="col-span-12 lg:col-span-7 space-y-4">
//           <div className="card p-3 flex items-center gap-2">
//             <div className="text-sm">โต๊ะ:</div>
//             <div className="flex gap-1">
//               {["all", "vacant", "busy", "bill"].map((f) => (
//                 <button
//                   key={f}
//                   onClick={() => setFilter(f)}
//                   className={`btn ${filter === f ? "btn-primary" : ""}`}
//                 >
//                   {f === "all"
//                     ? "ทั้งหมด"
//                     : f === "vacant"
//                       ? "ว่าง"
//                       : f === "busy"
//                         ? "กำลังใช้งาน"
//                         : "กำลังชำระ"}
//                 </button>
//               ))}
//             </div>
//             <button
//               className="btn btn-primary ml-auto"
//               disabled={!selected}
//               onClick={() => {
//                 if (!selected) return;
//                 setStatuses({ ...statuses, [selected]: "busy" });
//                 setShowQR(true);
//               }}
//             >
//               เปิดโต๊ะ / QR
//             </button>
//           </div>

//           <TableMap
//             selected={selected}
//             setSelected={setSelected}
//             statuses={statuses}
//             filter={filter}
//           />

//           <ProductPad
//             disabled={!selected}
//             onPick={(p) => {
//               if (!selected) {
//                 Swal.fire({
//                   icon: "warning",
//                   title: "ยังไม่ได้เลือกโต๊ะ",
//                   text: "กรุณาเลือกโต๊ะก่อน",
//                   confirmButtonText: "ตกลง",
//                 });
//                 return;
//               }
//               handlePick(p);
//               setStatuses({ ...statuses, [selected]: "busy" });
//             }}
//           />
//         </div>

//         <div className="col-span-12 lg:col-span-5">
//           <OrderPanel
//             table={selected}
//             items={items}
//             setItems={setItems}
//             setShowPayment={setShowPayment}
//           />
//         </div>
//       </div>

//       <PaymentModal
//         open={showPayment}
//         total={total}
//         onClose={() => setShowPayment(false)}
//         onConfirm={confirmPay}
//       />

//       <QrModal
//         open={showQR}
//         table={selected}
//         onClose={() => setShowQR(false)}
//       />

//       <OpenTableModal
//         open={showOpenModal}
//         table={selected}
//         onClose={() => setShowOpenModal(false)}
//         onConfirm={() => {
//           if (selected) {
//             setStatuses({ ...statuses, [selected]: "busy" });
//           }
//           setShowOpenModal(false);
//         }}
//       />

//     </Shell>
//   );
// }

"use client";
import { useMemo, useState, useEffect } from "react";
import Shell from "../../components/Shell";
import TableMap from "../../components/TableMap";
import OrderPanel from "../../components/OrderPanel";
import ProductPad from "../../components/ProductPad";
import PaymentModal from "../../components/PaymentModal";
import OpenTableModal from "../../components/OpenTableModal";
import QrModal from "../../components/QrModal";
import Swal from "sweetalert2";

export default function POS() {
  const [selected, setSelected] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");
  const [statuses, setStatuses] = useState<Record<string, string>>({
    A1: "vacant",
    A2: "vacant",
    B3: "vacant",
  });

  // orders per table
  const [orders, setOrders] = useState<Record<string, any[]>>({});
  const [items, setItems] = useState<any[]>([]);
  const [ordersSent, setOrdersSent] = useState<Record<string, boolean>>({});

  const [showPayment, setShowPayment] = useState(false);
  const [showOpenModal, setShowOpenModal] = useState(false);
  const [showQR, setShowQR] = useState(false);

  // โหลดบิลเมื่อเปลี่ยนโต๊ะ
  useEffect(() => {
    if (selected) {
      const saved = sessionStorage.getItem(`bill_${selected}`);
      if (saved) {
        setItems(JSON.parse(saved));
      } else {
        setItems(orders[selected] || []);
      }
    }
  }, [selected]);

  // sync items -> sessionStorage
  useEffect(() => {
    if (selected) {
      sessionStorage.setItem(`bill_${selected}`, JSON.stringify(items));
    }
  }, [items, selected]);

  const handlePick = (p: any) => {
    if (!selected) {
      Swal.fire({
        icon: "warning",
        title: "ยังไม่ได้เลือกโต๊ะ",
        text: "กรุณาเลือกโต๊ะก่อน",
        confirmButtonText: "ตกลง",
      });
      return;
    }

    // ถ้าโต๊ะส่งครัวแล้ว ห้ามแก้ไข
    if (ordersSent[selected]) return;

    let next: any[];
    const found = items.find((i) => i.id === p.id);
    if (found) {
      next = items.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i));
    } else {
      next = [...items, { ...p, qty: 1 }];
    }
    setItems(next);
    setOrders({ ...orders, [selected]: next });
    setStatuses({ ...statuses, [selected]: "busy" });
  };

  // รวมยอด
  const subtotal = useMemo(() => items.reduce((s, i) => s + i.price * i.qty, 0), [items]);
  const service = useMemo(() => Math.round(subtotal * 0.1), [subtotal]);
  const vat = useMemo(() => Math.round((subtotal + service) * 0.07), [subtotal, service]);
  const total = subtotal + service + vat;

  // ชำระเงิน
  const confirmPay = () => {
    setShowPayment(false);
    if (selected) {
      setStatuses({ ...statuses, [selected]: "vacant" });
      setOrders({ ...orders, [selected]: [] });
      setOrdersSent({ ...ordersSent, [selected]: false });
      sessionStorage.removeItem(`bill_${selected}`);
      sessionStorage.removeItem(`orders_${selected}`);
    }
    setItems([]);
    alert("ชำระเงินเรียบร้อย (เดโม)");
  };

  // ส่งครัว
  const sendToKitchen = () => {
    if (!selected || items.length === 0) return;

    sessionStorage.setItem(`orders_${selected}`, JSON.stringify(items));
    setStatuses({ ...statuses, [selected]: "busy" });
    setOrdersSent({ ...ordersSent, [selected]: true });
    alert(`ส่งครัวเรียบร้อย (โต๊ะ ${selected})`);
  };

  return (
    <Shell>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-7 space-y-4">
          <div className="card p-3 flex items-center gap-2">
            <div className="text-sm">โต๊ะ:</div>
            <div className="flex gap-1">
              {["all", "vacant", "busy", "bill"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`btn ${filter === f ? "btn-primary" : ""}`}
                >
                  {f === "all"
                    ? "ทั้งหมด"
                    : f === "vacant"
                    ? "ว่าง"
                    : f === "busy"
                    ? "กำลังใช้งาน"
                    : "กำลังชำระ"}
                </button>
              ))}
            </div>
            <button
              className="btn btn-primary ml-auto"
              disabled={!selected}
              onClick={() => {
                if (!selected) return;
                setStatuses({ ...statuses, [selected]: "busy" });
                setShowQR(true);
              }}
            >
              เปิดโต๊ะ / QR
            </button>
          </div>

          <TableMap selected={selected} setSelected={setSelected} statuses={statuses} filter={filter} />

          <ProductPad disabled={!selected} onPick={handlePick} />
        </div>

        <div className="col-span-12 lg:col-span-5">
          <OrderPanel
            table={selected}
            items={items}
            setItems={(next) => {
              if (!selected) return;
              setItems(next);
              setOrders({ ...orders, [selected]: next });
            }}
            setShowPayment={setShowPayment}
            setStatuses={setStatuses}
            readonly={ordersSent[selected]}
            sendToKitchen={sendToKitchen}
          />
        </div>
      </div>

      <PaymentModal open={showPayment} total={total} onClose={() => setShowPayment(false)} onConfirm={confirmPay} />

      <QrModal open={showQR} table={selected} onClose={() => setShowQR(false)} />

      <OpenTableModal
        open={showOpenModal}
        table={selected}
        onClose={() => setShowOpenModal(false)}
        onConfirm={() => {
          if (selected) setStatuses({ ...statuses, [selected]: "busy" });
          setShowOpenModal(false);
        }}
      />
    </Shell>
  );
}
