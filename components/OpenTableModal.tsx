"use client";
import { useState, useMemo } from "react";
import { QRCodeSVG } from "qrcode.react";

export default function OpenTableModal({ open, table, onClose, onConfirm }) {
  const [confirmed, setConfirmed] = useState(false);
  const url = useMemo(()=>{
    if (typeof window === "undefined") return "";
    return `${window.location.origin}/kiosk?table=${encodeURIComponent(table||"")}`;
  }, [table]);

  if (!open) return null;

  const handleConfirm = () => {
    if (!table) return;
    onConfirm?.();
    setConfirmed(true);
  };

  return (
    <div className="fixed inset-0 bg-black/40 grid place-items-center z-50">
      <div className="bg-white p-4 rounded shadow w-[400px]">
        {!confirmed ? (
          <>
            <h2 className="text-lg font-bold mb-2">ยืนยันเปิดโต๊ะ</h2>
            <p>โต๊ะ {table}</p>
            <div className="flex justify-end gap-2 mt-4">
              <button className="btn" onClick={onClose}>ยกเลิก</button>
              <button className="btn btn-primary" onClick={handleConfirm}>ยืนยันเปิดโต๊ะ</button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-lg font-bold mb-2">เปิดโต๊ะสำเร็จ</h2>
            <p>โต๊ะ {table}</p>
            <div className="flex justify-center my-4">
              <QRCodeSVG value={url} size={200} includeMargin={true} />
            </div>
            <div className="flex justify-end gap-2">
              <a className="btn btn-primary" href={`/print/qr?table=${table}`} target="_blank">พิมพ์ QR</a>
              <button className="btn" onClick={onClose}>ปิด</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
