export type RegistrationCategory = "KLU" | "OTHER";

export type MemberRole = "LEADER" | "MEMBER";

export type Gender = "MALE" | "FEMALE";

export type AcademicYear =
  | "FIRST_YEAR"
  | "SECOND_YEAR"
  | "THIRD_YEAR"
  | "FOURTH_YEAR";

export type AccommodationType = "HOSTELLER" | "DAY_SCHOLAR";

export interface TeamMember {
  fullName: string;
  registrationNumber: string;
  collegeName: string;
  email: string;
  mobile: string;
  gender: Gender | "";
  academicYear: AcademicYear | "";
  department: string;
  role: MemberRole;

  accommodationType: AccommodationType | "";
  hostelName: string;
  roomNumber: string;
  wardenName: string;
  wardenContact: string;
}

export interface RegistrationFormData {
  teamName: string;
  institution: string;
  category: RegistrationCategory;
  members: TeamMember[];
}