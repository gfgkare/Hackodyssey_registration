import api from "./api";
import type { RegistrationFormData } from "../types/registration";

export interface RegistrationResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    teamName: string;
    institution: string;
    category: string;
    status: string;
    members: unknown[];
  };
  errors?: {
    formErrors?: string[];
    fieldErrors?: Record<string, string[]>;
  };
}
export async function submitRegistration(
  registrationData: RegistrationFormData
): Promise<RegistrationResponse> {
  const response = await api.post<RegistrationResponse>(
    "/registrations",
    registrationData
  );

  return response.data;
}