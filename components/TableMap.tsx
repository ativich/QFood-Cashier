"use client";
import { useMemo, useState, useEffect } from 'react';
import api from "../app/services/api";

interface Table {
  id: number;
  table_no: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export default function TableMap({ selected, setSelected, statuses, filter = "all" }) {
  const [tables, setTables] = useState<Table[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);

  const fetchTables = async () => {
    const token = typeof window !== "undefined"
      ? localStorage.getItem("access_token")
      : null;
    if (!token) {
      console.error("ไม่มี token กรุณา login ก่อน");
      return;
    }
    try {
      const response = await api.get("/v1/tables");
      setTables(response.data.data.list || []);
      setTotalRecords(response.data.data.pagination.totalRecords || 0);
      console.log(response.data.data.pagination.totalRecords);
    } catch (err) {
      console.error("โหลดโต๊ะไม่สำเร็จ:", err);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  const sortedTables = useMemo(() => {
    return [...tables].sort((a, b) => {
      const parse = (t: string): [string, number] => {
        const match = t.match(/^([A-Z]+)(\d+)$/);
        if (!match) return [t, 0]; // fallback
        return [match[1], parseInt(match[2], 10)];
      };

      const [prefixA, numA] = parse(a.table_no);
      const [prefixB, numB] = parse(b.table_no);

      // เรียงตาม prefix ก่อน (A มาก่อน B)
      if (prefixA < prefixB) return -1;
      if (prefixA > prefixB) return 1;

      // ถ้า prefix เท่ากัน → เรียงตามเลข
      return numA - numB; // ✅ now TypeScript knows numA and numB are numbers
    });
  }, [tables]);



  return (
    <div className="card p-4">
      {/* ตารางจริงจาก API เรียงตามลำดับ */}
      <div className="flex items-center gap-2 mb-3">
        <span className="badge badge-gray">รวม: {totalRecords}</span>
        {/* <span className="badge badge-green">ว่าง: </span>
        <span className="badge badge-yellow">มีลูกค้า: </span> */}
        <span className="badge badge-green">
          ว่าง: {tables.filter(t => t.status === "vacant").length}
        </span>
        <span className="badge badge-yellow">
          มีลูกค้า: {tables.filter(t => t.status === "busy").length}
        </span>


      </div>

      {sortedTables.length === 0 ? (
        <div className="text-center">ไม่มีข้อมูลโต๊ะ</div>
      ) : (
        <div className="grid grid-cols-5 gap-3">
          {sortedTables.map((table) => {
            const st = table.status || "vacant";
            const isSel = selected === table.table_no;
            const color = st === "vacant" ? "border-gray-300" : (st === "busy" ? "border-amber-500" : "border-blue-500");
            const bg = isSel ? "ring-2 ring-blue-500" : "";
            return (
              <button
                key={table.id}
                onClick={() => setSelected?.(table.table_no)}
                className={`table-cell h-16 ${color} ${bg} bg-white hover:bg-gray-50`}
              >
                <div className="text-center">
                  <div className="font-semibold">{table.table_no}</div>
                  <div className="text-[11px] text-gray-500">{st}</div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
