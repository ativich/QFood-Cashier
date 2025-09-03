import axios from "axios";
import Swal from "sweetalert2";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Interceptor สำหรับ response error
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // token หมดอายุ
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      Swal.fire({
        icon: "error",
        title: "Session Expired",
        text: "กรุณาเข้าสู่ระบบใหม่",
      }).then(() => {
        window.location.href = "/"; // เด้งกลับหน้า login
      });
    }
    return Promise.reject(error);
  }
);

export default api;
