import type {
  RegistrationCategory,
  TeamMember,
} from "../../types/registration";

import GlassCard from "../ui/GlassCard";

interface MemberFieldsProps {
  member: TeamMember;
  index: number;
  category: RegistrationCategory;
  onChange: (
    index: number,
    field: keyof TeamMember,
    value: string
  ) => void;
}

interface InputFieldProps {
  label: string;
  value: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  onChange: (value: string) => void;
}

function InputField({
  label,
  value,
  placeholder,
  type = "text",
  required = false,
  onChange,
}: InputFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">
        {label}
        {required && <span className="ml-1 text-blue-400">*</span>}
      </label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
      />
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  value: string;
  required?: boolean;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
}

function SelectField({
  label,
  value,
  required = false,
  options,
  onChange,
}: SelectFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">
        {label}
        {required && <span className="ml-1 text-blue-400">*</span>}
      </label>

      <select
        value={value}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
      >
        <option value="">Select {label.toLowerCase()}</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function MemberFields({
  member,
  index,
  category,
  onChange,
}: MemberFieldsProps) {
  const isKLU = category === "KLU";
  const isHosteller = member.accommodationType === "HOSTELLER";

  const updateField = (field: keyof TeamMember, value: string) => {
    onChange(index, field, value);
  };

  const handleRegistrationNumberChange = (value: string) => {
    if (isKLU) {
      updateField("registrationNumber", value.replace(/\D/g, ""));
    } else {
      updateField("registrationNumber", value);
    }
  };

  const handleMobileChange = (value: string) => {
    updateField("mobile", value.replace(/\D/g, "").slice(0, 10));
  };

  const handleWardenContactChange = (value: string) => {
    updateField("wardenContact", value.replace(/\D/g, "").slice(0, 10));
  };

  const handleAccommodationChange = (value: string) => {
    updateField("accommodationType", value);

    if (value === "DAY_SCHOLAR") {
      updateField("hostelName", "");
      updateField("roomNumber", "");
      updateField("wardenName", "");
      updateField("wardenContact", "");
    }
  };

  return (
    <GlassCard className="p-5 sm:p-6">
      {/* Member Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          

          <h3 className="mt-1 text-xl font-bold text-white">
            Member {index + 1}
          </h3>
        </div>

        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold ${
            member.role === "LEADER"
              ? "border-blue-400/30 bg-blue-400/10 text-blue-300"
              : "border-white/10 bg-white/5 text-slate-300"
          }`}
        >
          {member.role === "LEADER" ? "Team Leader" : "Team Member"}
        </span>
      </div>

      {/* Basic Member Details */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <InputField
          label="Full Name"
          value={member.fullName}
          placeholder="Enter full name"
          required
          onChange={(value) => updateField("fullName", value)}
        />

        <InputField
          label="Registration Number"
          value={member.registrationNumber}
          placeholder={
            isKLU ? "Enter numeric registration number" : "EUPH-26-XXXX"
          }
          required
          onChange={handleRegistrationNumberChange}
        />

        {!isKLU && (
          <div className="md:col-span-2">
            <InputField
              label="College Name"
              value={member.collegeName ?? ""}
              placeholder="Enter your college name"
              required
              onChange={(value) => updateField("collegeName", value)}
            />
          </div>
        )}

        <InputField
          label="Email Address"
          value={member.email}
          placeholder={isKLU ? "example@klu.ac.in" : "example@gmail.com"}
          type="email"
          required
          onChange={(value) => updateField("email", value)}
        />

        <InputField
          label="Mobile Number"
          value={member.mobile}
          placeholder="Enter 10-digit mobile number"
          type="tel"
          required
          onChange={handleMobileChange}
        />

        <SelectField
          label="Gender"
          value={member.gender}
          required
          options={[
            { label: "Male", value: "MALE" },
            { label: "Female", value: "FEMALE" },
          ]}
          onChange={(value) => updateField("gender", value)}
        />

        <SelectField
          label="Academic Year"
          value={member.academicYear}
          required
          options={[
            { label: "First Year", value: "FIRST_YEAR" },
            { label: "Second Year", value: "SECOND_YEAR" },
            { label: "Third Year", value: "THIRD_YEAR" },
            { label: "Fourth Year", value: "FOURTH_YEAR" },
          ]}
          onChange={(value) => updateField("academicYear", value)}
        />

        {/* Department */}
        <InputField
          label="Department"
          value={member.department}
          placeholder="Enter your department"
          required
          onChange={(value) => updateField("department", value)}
        />

        {/* Accommodation */}
        {isKLU && (
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Accommodation Type{" "}
              <span className="ml-1 text-blue-400">*</span>
            </label>

            <div className="flex min-h-[48px] flex-wrap items-center gap-6 py-3">
              {/* Day Scholar */}
              <label className="group flex cursor-pointer items-center gap-3">
                <input
                  type="radio"
                  name={`accommodation-${index}`}
                  value="DAY_SCHOLAR"
                  checked={member.accommodationType === "DAY_SCHOLAR"}
                  onChange={(event) =>
                    handleAccommodationChange(event.target.value)
                  }
                  className="h-5 w-5 cursor-pointer accent-blue-500 focus:ring-2 focus:ring-blue-500/30"
                />

                <span className="text-sm font-medium text-slate-300 transition-colors group-hover:text-white">
                  Day Scholar
                </span>
              </label>

              {/* Hostler */}
              <label className="group flex cursor-pointer items-center gap-3">
                <input
                  type="radio"
                  name={`accommodation-${index}`}
                  value="HOSTELLER"
                  checked={member.accommodationType === "HOSTELLER"}
                  onChange={(event) =>
                    handleAccommodationChange(event.target.value)
                  }
                  className="h-5 w-5 cursor-pointer accent-blue-500 focus:ring-2 focus:ring-blue-500/30"
                />

                <span className="text-sm font-medium text-slate-300 transition-colors group-hover:text-white">
                  Hostler
                </span>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Hosteller Details */}
      {isKLU && isHosteller && (
        <div className="mt-7 border-t border-white/10 pt-6">
          <h4 className="mb-4 text-lg font-semibold text-white">
            Hosteller Details
          </h4>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <InputField
              label="Hostel Name"
              value={member.hostelName ?? ""}
              placeholder="Enter hostel name"
              required
              onChange={(value) => updateField("hostelName", value)}
            />

            <InputField
              label="Room Number"
              value={member.roomNumber ?? ""}
              placeholder="Enter room number"
              required
              onChange={(value) => updateField("roomNumber", value)}
            />

            <InputField
              label="Warden Name"
              value={member.wardenName ?? ""}
              placeholder="Enter warden name"
              required
              onChange={(value) => updateField("wardenName", value)}
            />

            <InputField
              label="Warden Contact"
              value={member.wardenContact ?? ""}
              placeholder="Enter 10-digit contact number"
              type="tel"
              required
              onChange={handleWardenContactChange}
            />
          </div>
        </div>
      )}
    </GlassCard>
  );
}