import KioskClient from "./KioskClient";

export default function Page({ searchParams }) {
  const t = Array.isArray(searchParams?.table) ? searchParams.table[0] : (searchParams?.table ?? "-");
  return <KioskClient table={t} />;
}
