"use client";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
interface ShellProps {
  children: React.ReactNode;
  onSearch?: (value: string) => void; // ใส่เครื่องหมาย ?
}

export default function Shell({ children, onSearch }: ShellProps) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen flex flex-col">
        <Topbar onSearch={onSearch} />
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
