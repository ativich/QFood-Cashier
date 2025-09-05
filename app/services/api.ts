import axios from "axios";
import { config } from "../config";
import Swal from "sweetalert2";

const api = axios.create({
  baseURL: config.apiUrl,
});

let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

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

    // ถ้าเจอ 401
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // ถ้ามี refresh อยู่แล้ว → รอให้เสร็จก่อน
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refresh_token = localStorage.getItem("refresh_token");
      if (!refresh_token) {
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
        return Promise.reject(error);
      }

      try {
        const { data } = await axios.post(
          `${config.apiUrl}/v1/refresh-token`,
          { refresh_token },
          { headers: { "Content-Type": "application/json" } }
        );

        const newAccessToken = data.data.access_token;
        localStorage.setItem("access_token", newAccessToken);

        api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        processQueue(null, newAccessToken);

        // retry request เดิม
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

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

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
