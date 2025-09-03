"use client";
import { useEffect, useMemo, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";

export default function QRCard({ table }) {
  const url = useMemo(()=>{
    if (typeof window === "undefined") return "";
    const origin = window.location.origin;
    return `${origin}/kiosk?table=${encodeURIComponent(table||"")}`;
  }, [table]);

  const dlRef = useRef(null);

  const downloadSVG = () => {
    const svg = document.querySelector(`#qr-${table}`);
    if (!svg) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);
    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `QR-${table}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500">QR โต๊ะ</div>
          <div className="text-xl font-semibold">{table || "-"}</div>
        </div>
        <div className="text-xs text-gray-500">ให้ลูกค้าสแกนเพื่อสั่งอาหาร</div>
      </div>
      <div className="grid place-items-center py-4">
        {table ? (
          <QRCodeSVG id={`qr-${table}`} value={url} size={180} includeMargin={true} />
        ) : (
          <div className="text-gray-500">ยังไม่ได้เลือกโต๊ะ</div>
        )}
      </div>
      <div className="flex justify-end gap-2">
        <button className="btn" onClick={()=>window.open(url, "_blank")}>เปิดหน้าลูกค้า (จำลอง)</button>
        <button className="btn" onClick={downloadSVG}>ดาวน์โหลด QR</button>
        <a className="btn btn-primary" href={`/print/qr?table=${table}`} target="_blank" rel="noreferrer">พิมพ์ QR</a>
      </div>
    </div>
  );
}
