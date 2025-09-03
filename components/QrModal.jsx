"use client";
import { useMemo } from "react";
import QRCode from "react-qr-code";

export default function QrModal({ open, table, onClose }) {
  const url = useMemo(()=>{
    if (!table) return "";
    if (typeof window === "undefined") return `/c/${encodeURIComponent(table)}`;
    return `${window.location.origin}/c/${encodeURIComponent(table)}`;
  }, [table]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 grid place-items-center z-50">
      <div className="card w-[560px] max-w-[94vw] p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-semibold">เปิดโต๊ะ & สแกนสั่งอาหาร</h3>
          <button className="btn" onClick={onClose}>ปิด</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 grid place-items-center bg-white rounded-md border">
            <QRCode value={url || " "} size={220} />
          </div>
          <div className="space-y-3">
            <div className="text-sm text-gray-600">โต๊ะ</div>
            <div className="text-2xl font-bold">{table || "-"}</div>
            <div className="text-sm text-gray-600">ลิงก์สำหรับลูกค้า</div>
            <div className="p-2 bg-gray-50 rounded border break-all">{url}</div>
            <div className="flex gap-2">
              <button className="btn btn-primary" onClick={()=>navigator.clipboard?.writeText(url)}>คัดลอกลิงก์</button>
              <a className="btn btn-primary" href={`/print/qr?table=${table}`} target="_blank" rel="noreferrer">พิมพ์ QR</a>
            </div>
            <div className="text-xs text-gray-500">ลูกค้าสแกน QR นี้เพื่อสั่งอาหารจากมือถือ</div>
          </div>
        </div>
      </div>
    </div>
  );
}
