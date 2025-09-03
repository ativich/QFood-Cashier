"use client";
import { useSearchParams } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { useMemo } from "react";

export default function PrintQR() {
  const sp = useSearchParams();
  const table = sp.get("table") || "-";
  const url = useMemo(()=>{
    if (typeof window === "undefined") return "";
    return `${window.location.origin}/kiosk?table=${encodeURIComponent(table)}`;
  }, [table]);
  return (
    <main className="min-h-screen bg-white p-8 print:p-0">
      <div className="max-w-xl mx-auto border print:border-0 rounded-xl p-6 print:p-0">
        <div className="text-center">
          <div className="text-3xl font-extrabold mb-1">QFood</div>
          <div className="text-sm text-gray-600 mb-4">สแกนเพื่อสั่งอาหาร — โต๊ะ {table}</div>
        </div>
        <div className="grid place-items-center my-6">
          <QRCodeSVG value={url} size={280} includeMargin={true} />
        </div>
        <div className="text-center text-xs text-gray-500 break-all">{url}</div>
        <div className="mt-6 flex justify-center gap-2 no-print">
          <button className="btn btn-primary" onClick={()=>window.print()}>พิมพ์</button>
          <button className="btn" onClick={()=>window.history.back()}>กลับ</button>
        </div>
      </div>
      <style jsx global>{`
        @media print {
          .no-print { display: none !important; }
          body { background: #fff; }
        }
      `}</style>
    </main>
  );
}
