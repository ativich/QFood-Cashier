"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import axios from "axios";
import { config } from "./config";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {   // ❌ ไม่มี type
    e.preventDefault();

    if (username.trim() === "" || password.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Username and password are required",
      });
      return;
    }

    setLoading(true);
    try {
      const payload = { username, password };
      const response = await axios.post(`${config.apiUrl}/v1/login`, payload);

      if (
        response.data &&
        response.data.data.access_token &&
        response.data.data.refresh_token
      ) {
        console.log("Access Token:", response.data.data.access_token);
        console.log("Refresh Token:", response.data.data.refresh_token);

        localStorage.setItem("access_token", response.data.data.access_token);
        localStorage.setItem("refresh_token", response.data.data.refresh_token);

        router.push("/pos");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Invalid username or password",
        });
      }
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || error.message
        : "An unexpected error occurred";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen grid place-items-center">
      <div className="card p-10 w-[520px] max-w-[92vw] text-center space-y-6 ">
        <h1 className="text-3xl font-bold">QFood POS Mock</h1>
        {/* <p>เค้าโครงหน้าขายสำหรับเดโม (ไม่มีการเชื่อมต่อ Backend)</p> */}
        <form onSubmit={handleSubmit}
          className="flex items-center justify-center flex-col"
        >
          <div className="mb-4 flex items-center">
            <label className="block text-gray-700 font-medium pr-2">ชื่อผู้ใช้</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="px-4 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {/* แสดงค่าชื่อผู้ใช้ */}
            {/* <p className="text-sm text-gray-500 mt-1">ค่าที่กรอก: {username}</p> */}
          </div>

          <div className="mb-6 flex items-center">
            <label className="block text-gray-700 font-medium pr-2">รหัสผ่าน</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {/* แสดงค่ารหัสผ่าน */}
            {/* <p className="text-sm text-gray-500 mt-1">ค่าที่กรอก: {password}</p> */}
          </div>
          <button type="submit" disabled={loading} className={`px-4 py-2 rounded-lg font-semibold  transition-all duration-300 cursor-pointer ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white '}`}
          >
            {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
          </button>
        </form>
      </div>
    </main>
  );
}
