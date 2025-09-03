"use client";
export default function PaymentModal({ open, onClose, onConfirm, total }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 grid place-items-center z-50">
      <div className="card w-[520px] max-w-[94vw] p-5">
        <h3 className="text-xl font-semibold mb-4">ชำระเงิน</h3>
        <div className="grid grid-cols-3 gap-3">
          <button className="btn">เงินสด</button>
          <button className="btn">โอน</button>
          <button className="btn">บัตรเครดิต</button>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <div className="text-gray-600">ยอดสุทธิ</div>
          <div className="text-2xl font-bold">{total.toFixed(2)} ฿</div>
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <button className="btn" onClick={onClose}>ยกเลิก</button>
          <button className="btn btn-success" onClick={onConfirm}>บันทึกการชำระ</button>
        </div>
      </div>
    </div>
  );
}
