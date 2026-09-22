import api from "./api";

export interface AdminLoginPayload {
  username: string;
  password: string;
}

const ADMIN_TOKEN_KEY = "admin_token";

export function getAdminToken(): string | null {
  return localStorage.getItem(ADMIN_TOKEN_KEY);
}

export function setAdminToken(token: string): void {
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
}

export function clearAdminToken(): void {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
}

export interface AdminUser {
  id?: string;
  username?: string;
  adminId?: string;
  token?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

export async function loginAdmin(
  payload: AdminLoginPayload
): Promise<ApiResponse<AdminUser>> {
  const response = await api.post<ApiResponse<AdminUser>>(
    "/auth/login",
    payload
  );

  if (response.data?.data?.token) {
    setAdminToken(response.data.data.token);
  }

  return response.data;
}

export async function verifyAdminSession(): Promise<
  ApiResponse<AdminUser>
> {
  const response = await api.get<ApiResponse<AdminUser>>("/admin/me");

  return response.data;
}

export async function logoutAdmin(): Promise<ApiResponse> {
  try {
    const response = await api.post<ApiResponse>("/auth/logout");
    return response.data;
  } finally {
    clearAdminToken();
  }
}

export async function getAdminRegistrations() {
  const response = await api.get("/admin/registrations");
  return response.data;
}

export async function updateRegistrationStatus(
  teamId: string,
  status: "CONFIRMED" | "CANCELLED",
) {
  const response = await api.patch(
    `/admin/registrations/${teamId}/status`,
    { status },
  );

  return response.data;
}

export async function downloadAdminExport(
  fileName:
    | "registrations.csv"
    | "registrations.xlsx"
    | "teams.csv"
    | "teams.xlsx",
): Promise<Blob> {
  const response = await api.get(`/admin/exports/${fileName}`, {
    responseType: "blob",
  });

  return response.data;
}