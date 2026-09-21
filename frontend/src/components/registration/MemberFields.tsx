import type {
  RegistrationCategory,
  TeamMember,
} from "../../types/registration";

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

export default function MemberFields({
  member,
  index,
  category,
  onChange,
}: MemberFieldsProps) {
  const isHosteller = member.accommodationType === "HOSTELLER";

  const isKLU = category === "KLU";

    const namePlaceholder = isKLU
    ? "FULL NAME"
    : "FULL NAME (as per college records)";

    const registrationPlaceholder = isKLU
    ? "e.g. 992XXXXXXXX"
    : "e.g. EUPH-26-XXXXXX";

    const emailPlaceholder = isKLU
    ? "e.g. student@klu.ac.in"
    : "e.g. student@gmail.com";

    const departmentPlaceholder = "e.g. CSE, ECE, IT...";

  function handleRegistrationNumberChange(value: string) {
    const updatedValue =
      category === "KLU" ? value.replace(/\D/g, "") : value;

    onChange(index, "registrationNumber", updatedValue);
  }

  function handleMobileChange(value: string) {
    const updatedValue = value.replace(/\D/g, "").slice(0, 10);

    onChange(index, "mobile", updatedValue);
  }

  function handleWardenContactChange(value: string) {
    const updatedValue = value.replace(/\D/g, "").slice(0, 10);

    onChange(index, "wardenContact", updatedValue);
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Member Header */}
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-800">
          {member.role === "LEADER" ? "Team Leader" : `Member ${index + 1}`}
        </h3>

        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
          {member.role}
        </span>
      </div>

      <div className="space-y-4">
        {/* 1. Name */}
        <InputField
          label="Name"
          value={member.fullName}
          onChange={(value) => onChange(index, "fullName", value)}
          placeholder={namePlaceholder}
          required
        />

        {/* 2. Registration Number */}
        <InputField
          label="Registration Number"
          value={member.registrationNumber}
          onChange={handleRegistrationNumberChange}
          placeholder={registrationPlaceholder}
          required
        />

        {/* 3. College Name - Only for Other Colleges */}
        {category === "OTHER" && (
          <InputField
            label="College Name"
            value={member.collegeName}
            onChange={(value) => onChange(index, "collegeName", value)}
            placeholder="e.g. VIT University"
            required
          />
        )}

        {/* 4. Email ID */}
        <InputField
          label="Email ID"
          type="email"
          value={member.email}
          onChange={(value) => onChange(index, "email", value)}
          placeholder={emailPlaceholder}
          required
        />

        {/* 5. Phone Number */}
        <InputField
          label="Phone Number"
          type="tel"
          value={member.mobile}
          onChange={handleMobileChange}
          placeholder="e.g. 9876543210"
          maxLength={10}
          required
        />

        {/* 6. Gender */}
        <SelectField
          label="Gender"
          value={member.gender}
          onChange={(value) => onChange(index, "gender", value)}
          options={[
            { label: "Select Gender", value: "" },
            { label: "Male", value: "MALE" },
            { label: "Female", value: "FEMALE" },
          ]}
          required
        />

        {/* 7. Academic Year */}
        <SelectField
          label="Year"
          value={member.academicYear}
          onChange={(value) => onChange(index, "academicYear", value)}
          options={[
            { label: "Select Year", value: "" },
            { label: "1st Year", value: "FIRST_YEAR" },
            { label: "2nd Year", value: "SECOND_YEAR" },
            { label: "3rd Year", value: "THIRD_YEAR" },
            { label: "4th Year", value: "FOURTH_YEAR" },
          ]}
          required
        />

        {/* 8. Department */}
        <InputField
          label="Department"
          value={member.department}
          onChange={(value) => onChange(index, "department", value)}
          placeholder={departmentPlaceholder}
          required
        />

        {/* 9. Accommodation - KLU Only */}
        {category === "KLU" && (
          <div className="space-y-4 border-t border-slate-200 pt-4">
            <SelectField
              label="Accommodation Type"
              value={member.accommodationType}
              onChange={(value) =>
                onChange(index, "accommodationType", value)
              }
              options={[
                {
                  label: "Select Accommodation Type",
                  value: "",
                },
                {
                  label: "Dayscholar",
                  value: "DAY_SCHOLAR",
                },
                {
                  label: "Hosteller",
                  value: "HOSTELLER",
                },
              ]}
              required
            />

            {/* Hosteller Details */}
            {isHosteller && (
              <div className="space-y-4 rounded-lg bg-slate-50 p-4">
                <InputField
                  label="Hostel Name"
                  value={member.hostelName}
                  onChange={(value) =>
                    onChange(index, "hostelName", value)
                  }
                  placeholder="e.g. MH-X or LH-X"
                  required
                />

                <InputField
                  label="Room Number"
                  value={member.roomNumber}
                  onChange={(value) =>
                    onChange(index, "roomNumber", value)
                  }
                  placeholder="e.g. 102"
                  required
                />

                <InputField
                  label="Warden Name"
                  value={member.wardenName}
                  onChange={(value) =>
                    onChange(index, "wardenName", value)
                  }
                  placeholder="e.g. Ramesh Kumar"
                  required
                />

                <InputField
                  label="Warden Contact Number"
                  type="tel"
                  value={member.wardenContact}
                  onChange={handleWardenContactChange}
                  placeholder="e.g. 9876543210"
                  maxLength={10}
                  required
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* Reusable Input Component */

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  maxLength?: number;
  required?: boolean;
}

function InputField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  maxLength,
  required = false,
}: InputFieldProps) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        required={required}
      />
    </div>
  );
}

/* Reusable Select Component */

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  required?: boolean;
}

function SelectField({
  label,
  value,
  onChange,
  options,
  required = false,
}: SelectFieldProps) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        required={required}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}