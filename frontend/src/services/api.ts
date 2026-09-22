import axios from "axios";

function getBaseUrl(): string {
  let url =
    import.meta.env.VITE_API_BASE_URL?.trim() || "http://localhost:3001/api";

  // Prepend https:// if protocol is missing (e.g. hackodyssey-registration.vercel.app)
  if (!/^https?:\/\//i.test(url) && !url.startsWith("/")) {
    url = `https://${url}`;
  }

  // Remove trailing slashes
  url = url.replace(/\/+$/, "");

  // Ensure /api suffix is present for backend routing
  if (!url.endsWith("/api")) {
    url = `${url}/api`;
  }

  return url;
}

const timeout =
  Number(import.meta.env.VITE_API_TIMEOUT) || 15000;

const api = axios.create({
  baseURL: getBaseUrl(),
  timeout,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error?.response?.status === 401 &&
      (error?.config?.url?.includes("/admin") || error?.config?.url?.includes("/auth/logout"))
    ) {
      localStorage.removeItem("admin_token");
    }
    return Promise.reject(error);
  }
);

export default api;