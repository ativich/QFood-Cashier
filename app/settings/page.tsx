"use client";
import Shell from "../../components/Shell";
import { useState, useEffect } from "react";
import api from "../services/api";

interface Store {
  store_id: string;
  name: string;
  address: string;
}

interface User {
  id: string;
  name: string;
  store_id: string;
  Store: Store;
}

export default function Settings() {
  const [store, setStore] = useState<User[]>([]);
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("access_token")
      : null;

  useEffect(() => {
    const loadData = () => {
      const selectedStoreId =
        typeof window !== "undefined"
          ? localStorage.getItem("selectedStoreId")
          : null;

      if (selectedStoreId) {
        fetchStaff(selectedStoreId);
      }
    };

    // โหลดครั้งแรก
    loadData();

    // ฟัง event
    window.addEventListener("storeChanged", loadData);

    return () => window.removeEventListener("storeChanged", loadData);
  }, []);


const fetchStaff = async (selectedStoreId: string) => {
  try {
    const response = await api.get("/v1/store/users");
    const list = response.data.data.list || [];

    const matchedStore = list.find(
      (item: any) => item.Store.store_id === selectedStoreId
    );

    if (matchedStore) {
      setStore([matchedStore]); 
    } else if (list.length > 0) {
      setStore([list[0]]);
    }

    console.log("พนักงานสาขาที่เลือก:", matchedStore || list[0]);
  } catch (err) {
    console.error("โหลดพนักงานไม่สำเร็จ:", err);
  }
};



  return (
    <Shell>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card p-4 space-y-3">
          <div className="font-semibold">ข้อมูลร้าน</div>
          <div className="grid grid-cols-2 gap-2">
            <input
              className="input"
              placeholder="ชื่อร้าน"
              defaultValue="QFood Bistro"
            />
            <input
              className="input"
              placeholder="สาขา"
              defaultValue={store[0]?.Store.name || ""}
            />
            <input
              className="input col-span-2"
              placeholder="ที่อยู่"
              defaultValue={store[0]?.Store.address || ""}
            />

          </div>
          <div className="flex gap-2">
            <button className="btn btn-primary">บันทึก</button>
            <button className="btn">ยกเลิก</button>
          </div>
        </div>

        <div className="card p-4 space-y-3">
          <div className="font-semibold">ภาษีและค่าบริการ</div>
          <div className="grid grid-cols-2 gap-2">
            <label className="text-sm">VAT (%)</label>
            <input className="input" type="number" defaultValue={7} />
            <label className="text-sm">Service Charge (%)</label>
            <input className="input" type="number" defaultValue={10} />
          </div>
          <div className="flex gap-2">
            <button className="btn btn-primary">บันทึก</button>
          </div>
        </div>

        <div className="card p-4 space-y-3">
          <div className="font-semibold">วิธีชำระเงิน</div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked /> เงินสด
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked /> โอน
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" /> บัตรเครดิต
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" /> PromptPay
            </label>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-primary">บันทึก</button>
          </div>
        </div>
      </div>
    </Shell>
  );
}
