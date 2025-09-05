import axios from "axios";
import { config } from "../config";
import Swal from "sweetalert2";

const api = axios.create({
  baseURL: config.apiUrl,
});

// ✅ Interceptor ดัก request → แนบ access_token ทุกครั้ง
api.interceptors.request.use((requestConfig) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    requestConfig.headers.Authorization = `Bearer ${token}`;
  }
  requestConfig.headers["X-Store-ID"] = "d71c1905-763e-11f0-aa31-5209418bec27";
  return requestConfig;
});

// ✅ Interceptor ดัก response error
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // ถ้าเจอ 401 และยังไม่เคย retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refresh_token = localStorage.getItem("refresh_token");
      if (refresh_token) {
        try {
          // 🔄 เรียก refresh token
          const { data } = await axios.post(
            `${config.apiUrl}/v1/refresh-token`,
            { refresh_token },
            { headers: { "Content-Type": "application/json" } }
          );
          console.log("รีรหัสใหม่:", data);
          const newAccessToken = data.data.access_token;
          // อัปเดต token ใน localStorage
          localStorage.setItem("access_token", newAccessToken);
          // อัปเดต header แล้ว retry request เดิม
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest); // ✅ retry ด้วย instance api
        } catch (refreshError) {
        }
      } else {
        // ❌ ไม่มี refresh_token → logout
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        Swal.fire({
          title: "เซสชันหมดอายุ",
          text: "กรุณาเข้าสู่ระบบใหม่",
          icon: "warning",
          confirmButtonText: "ตกลง",
        }).then(() => {
          window.location.href = "/";
        });
      }
    }
    return Promise.reject(error);
  }
);

export default api;
