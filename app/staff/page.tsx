"use client";
import { useState, useEffect } from "react";
import api from "../services/api";
import Shell from "../../components/Shell";
import Swal from "sweetalert2";

interface Staff {
  store_id?: string;
  uuid?: string;
  username: string;
  role: "manager" | "chef" | "cashier" | "employee";
  status?: string;
  password: string; // ทำให้ required
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}


export default function StaffPage() {
  const [showModal, setShowModal] = useState(false);       // modal แก้ไข
  const [showModalAdd, setShowModalAdd] = useState(false); // modal เพิ่ม
  const [staffList, setStaffList] = useState<Staff[]>([]);
  // const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  // const [showModalAdd, setShowModalAdd] = useState(false);
  // const [selectedStaff, setSelectedStaff] = useState<{
  //   username: string;
  //   password: string;
  //   role: "manager" | "chef" | "cashier" | "employee" | "member";
  // } | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [savingAdd, setSavingAdd] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("access_token")
      : null;

  useEffect(() => {
    console.log(token)
    if (!token) {
      console.error("ไม่มี token กรุณา login ก่อน");
      return;
    }
    fetchStaff();
  }, []);

  // โหลดพนักงานทั้งหมด
  const fetchStaff = async () => {
    try {
      const response = await api.get("/v1/users");
      setStaffList(response.data.data.list || []);
    } catch (err) {
      console.error("โหลดพนักงานไม่สำเร็จ:", err);
    }
  };

  const handleOpenAdd = () => {
    setSelectedStaff({
      username: "",
      password: "",
      role: "employee",
    });
    setShowModalAdd(true);
  };


  // ปิด modal เพิ่ม
  const handleCloseAdd = () => {
    setShowModalAdd(false);
    setSelectedStaff(null);
  };

  // บันทึกการเพิ่มพนักงาน
  const handleSaveAdd = async () => {
    if (!selectedStaff) return;
    const { username, password, role } = selectedStaff;
    if (!username.trim() || !password.trim()) {
      Swal.fire("กรอกไม่ครบ", "กรุณากรอก Username และ Password", "warning");
      return;
    }
    try {
      setSavingAdd(true);
      const response = await api.post("/v1/user", { username, password, role });
      console.log("✅ เพิ่มพนักงานสำเร็จ:", response.data);
      Swal.fire("สำเร็จ", "เพิ่มพนักงานเรียบร้อยแล้ว", "success").then(() => {
        fetchStaff();
        handleCloseAdd();
      });
    } catch (err: any) {
      console.error("❌ บันทึกข้อมูลไม่สำเร็จ:", err);
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "ไม่สามารถเพิ่มพนักงานได้";
      Swal.fire("ผิดพลาด", msg, "error");
    } finally {
      setSavingAdd(false);
    }
  };

  // เปิด modal แก้ไขพนักงาน
  const handleOpen = async (staff: Staff) => {
    setSelectedStaff(staff);
    setShowModal(true);

    try {
      const response = await api.get(`/v1/user/${staff.uuid}`);
      if (response.data.data.uuid === staff.uuid) {
        setSelectedStaff(response.data.data);
      }
    } catch (err) {
      console.error("❌ โหลดข้อมูลพนักงานไม่สำเร็จ:", err);
    }
  };

  // ปิด modal แก้ไข
  const handleClose = () => {
    setShowModal(false);
    setSelectedStaff(null);
  };

  // บันทึกการแก้ไข
  const handleSave = async () => {
    if (!selectedStaff) return;
    try {
      const payload = {
        role: selectedStaff.role,
        status: selectedStaff.status,
      };
      await api.put(`/v1/user/${selectedStaff.uuid}`, payload);
      Swal.fire({
        icon: "success",
        title: "บันทึกสำเร็จ",
        confirmButtonText: "ตกลง",
      }).then(() => {
        fetchStaff();
        handleClose();
      });
    } catch (err) {
      console.error("❌ บันทึกไม่สำเร็จ:", err);
      Swal.fire("ผิดพลาด", "ไม่สามารถบันทึกข้อมูลได้", "error");
    }
  };

  // ลบพนักงาน
  const handleDelete = async () => {
    if (!selectedStaff) return;
    try {
      const button = await Swal.fire({
        icon: "warning",
        title: "ยืนยันการลบ",
        text: "คุณต้องการลบข้อมูลนี้หรือไม่",
        showCancelButton: true,
      });
      if (button.isConfirmed) {
        await api.delete(`/v1/user/${selectedStaff.uuid}`);
        Swal.fire({
          icon: "success",
          title: "ลบข้อมูลสำเร็จ",
          confirmButtonText: "ตกลง",
        }).then(() => {
          fetchStaff();
          handleClose();
        });
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  // อัปเดตค่าใน selectedStaff
  const handleChange = (field: keyof Staff, value: string) => {
    if (!selectedStaff) return;
    setSelectedStaff({ ...selectedStaff, [field]: value });
  };

  // label role ภาษาไทย
  const roleLabels: Record<string, string> = {
    manager: "ผู้จัดการ",
    chef: "เชฟ",
    cashier: "พนักงานเก็บเงิน",
    employee: "พนักงาน",
    // member: "สมาชิก",
  };


  const handleSearch = async (value: string) => {
    setSearchTerm(value);
    if (!value.trim()) {
      fetchStaff(); // ถ้า search ว่าง โหลดข้อมูลทั้งหมด
      return;
    }
    try {
      const response = await api.get(`/v1/users/search?search=${value}`);
      setStaffList(response.data.data.list || []);
    } catch (err) {
      console.error("ค้นหาไม่สำเร็จ:", err);
    }
  };


  return (
    <Shell>
      {/* <div className="card p-4">
        <div className="flex items-center">
          <div className="font-semibold">พนักงาน</div>
          <div>
            <input type="text" />
          </div>
          <button onClick={handleOpenAdd} className="btn btn-success ml-auto">
            + เพิ่มพนักงาน
          </button>
        </div>

        <div className="overflow-auto mt-3">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="text-left">
                <th className="p-2">รหัส</th>
                <th className="p-2">ชื่อผู้ใช้</th>
                <th className="p-2">ตำแหน่ง</th>
                <th className="p-2">สถานะ</th>
                <th className="p-2 text-right">การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              {staffList.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center">
                    ไม่มีข้อมูลพนักงาน
                  </td>
                </tr>
              ) : (
                staffList.map((staff: Staff) => (
                  <tr key={staff.uuid}>
                    <td>{staff.uuid}</td>
                    <td>{staff.username}</td>
                    <td>{roleLabels[staff.role] || staff.role}</td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded-full text-white ${staff.status === "active"
                          ? "bg-green-500"
                          : "bg-red-500"
                          }`}
                      >
                        {staff.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="text-right">
                      <button
                        onClick={() => handleOpen(staff)}
                        className="btn btn-sm btn-warning"
                      >
                        แก้ไข
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div> */}

      <div className="card p-4">
        <div className="flex items-center gap-3">
          <div className="font-semibold">พนักงาน</div>
          {/* ✅ ช่องค้นหา */}
          <input
            type="text"
            className="input border rounded px-2 py-1"
            placeholder="ค้นหาพนักงาน..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button onClick={handleOpenAdd} className="btn btn-success ml-auto">
            + เพิ่มพนักงาน
          </button>
        </div>

        <div className="overflow-auto mt-3">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="text-left">
                <th className="p-2">รหัส</th>
                <th className="p-2">ชื่อผู้ใช้</th>
                <th className="p-2">ตำแหน่ง</th>
                <th className="p-2">สถานะ</th>
                <th className="p-2 text-right">การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              {staffList.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center">
                    ไม่มีข้อมูลพนักงาน
                  </td>
                </tr>
              ) : (
                staffList.map((staff: Staff) => (
                  <tr key={staff.uuid}>
                    <td>
                      {/* {staff.uuid} */}
                      </td>
                    <td>{staff.username}</td>
                    <td>{roleLabels[staff.role] || staff.role}</td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded-full text-white ${staff.status === "active" ? "bg-green-500" : "bg-red-500"
                          }`}
                      >
                        {staff.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="text-right">
                      {/* <button
                        onClick={() => console.log("TODO: handleOpen(staff)")}
                        className="btn btn-sm btn-warning"
                      >
                        แก้ไข
                      </button> */}
                      <button
                        onClick={() => handleOpen(staff)}
                        className="btn btn-sm btn-warning"
                      >
                        แก้ไข
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add */}
      {showModalAdd && selectedStaff && (
        <div className="fixed inset-0 bg-black/40 grid place-items-center z-50">
          <div className="card w-[520px] max-w-[94vw] p-6 relative">
            <button
              onClick={handleCloseAdd}
              className="absolute top-3 right-5 text-gray-400 hover:text-red-500 transition"
            >
              ✕
            </button>
            <h3 className="text-xl font-semibold mb-4 text-center">เพิ่มพนักงาน</h3>
            <div className="flex flex-col gap-2 mb-3">
              <div>
                <input
                  type="text"
                  className="form-control w-full p-2 rounded-md bg-slate-100"
                  placeholder="Username"
                  value={selectedStaff.username}
                  onChange={(e) =>
                    setSelectedStaff({ ...selectedStaff, username: e.target.value })
                  }
                />
              </div>
              <div className="flex items-center">
                <input
                  type="text"
                  className="form-control w-full p-2 rounded-md bg-slate-100"
                  placeholder="Password"
                  value={selectedStaff.password}
                  onChange={(e) =>
                    setSelectedStaff({ ...selectedStaff, password: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="mb-3 flex items-center">
              <span className="font-semibold">ตำแหน่ง:</span>
              <select
                className="input ml-2 w-full"
                value={selectedStaff.role}
                onChange={(e) =>
                  setSelectedStaff({
                    ...selectedStaff,
                    role: e.target.value as typeof selectedStaff.role,
                  })
                }
              >
                <option value="manager">ผู้จัดการ</option>
                <option value="chef">เชฟ</option>
                <option value="cashier">พนักงานเก็บเงิน</option>
                <option value="employee">พนักงาน</option>
                {/* <option value="member">สมาชิก</option> */}
              </select>
            </div>

            <div className="mt-3 flex justify-center gap-2">
              <button
                onClick={handleSaveAdd}
                className="btn btn-success w-[120px]"
                disabled={savingAdd}
              >
                {savingAdd ? "กำลังเพิ่ม..." : "เพิ่ม"}
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Modal Edit */}
      {showModal && selectedStaff && (
        <div className="fixed inset-0 bg-black/40 grid place-items-center z-50">
          <div className="card w-[520px] max-w-[94vw] p-6 relative">
            <button
              onClick={handleClose}
              className="absolute top-3 right-5 text-gray-400 hover:text-red-500 transition"
            >
              ✕
            </button>
            <h3 className="text-xl font-semibold mb-4 text-center">
              แก้ไขพนักงาน
            </h3>
            <div className="flex items-center mb-2">
              <div>
                <i className="far fa-user text-[40px] p-3 bg-slate-200 rounded-xl mr-3"></i>
              </div>
              <div>
                <div>
                  <span className="font-semibold">ชื่อผู้ใช้:</span>{" "}
                  {selectedStaff.username}
                </div>
                <div>
                  <span className="font-semibold">รหัส:</span>{" "}
                  {selectedStaff.uuid}
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="mr-2 flex items-center">
                <div className="font-semibold mr-1">สถานะ: </div>
                <div> {selectedStaff.status}</div>
              </div>
              <div>
                <span className="font-semibold">ตำแหน่ง:</span>
                <select
                  className="input ml-2"
                  value={selectedStaff.role}
                  onChange={(e) => handleChange("role", e.target.value)}
                >
                  <option value="manager">ผู้จัดการ</option>
                  <option value="chef">เชฟ</option>
                  <option value="cashier">พนักงานเก็บเงิน</option>
                  <option value="employee">พนักงาน</option>
                  {/* <option value="member">สมาชิก</option> */}
                </select>
              </div>
            </div>
            <div className="mt-3 flex justify-end gap-2">
              <button onClick={handleSave} className="btn btn-success">
                บันทึก
              </button>
              <button className="btn btn-danger" onClick={handleDelete}>
                ลบ
              </button>
            </div>
          </div>
        </div>
      )}
    </Shell>
  );
}
