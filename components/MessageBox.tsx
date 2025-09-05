"use client";
import { useEffect } from "react";

interface MessageBoxProps {
  open: boolean;
  type?: "success" | "warning" | "error" | "info";
  message: string;
  onClose: () => void;
}

export default function MessageBox({ open, type = "info", message, onClose }: MessageBoxProps) {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => onClose(), 3000); // ปิดอัตโนมัติ 3 วิ
      return () => clearTimeout(timer);
    }
  }, [open]);

  if (!open) return null;

  const bgColor =
    type === "success"
      ? "bg-green-500"
      : type === "warning"
      ? "bg-yellow-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-blue-500";

  const icon =
    type === "success"
      ? "✅"
      : type === "warning"
      ? "⚠️"
      : type === "error"
      ? "❌"
      : "ℹ️";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div
        className={`flex items-center gap-3 ${bgColor} text-white rounded-2xl shadow-2xl px-6 py-4 max-w-sm w-full animate-fadeInDown`}
      >
        <span className="text-2xl">{icon}</span>
        <span className="text-lg font-semibold">{message}</span>
      </div>

      <style jsx>{`
        @keyframes fadeInDown {
          0% {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fadeInDown {
          animation: fadeInDown 0.25s ease-out;
        }
      `}</style>
    </div>
  );
}
