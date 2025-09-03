import { Suspense } from "react";
import KioskClient from "./KioskClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading kiosk…</div>}>
      <KioskClient />
    </Suspense>
  );
}
