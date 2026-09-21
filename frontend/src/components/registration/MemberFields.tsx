import type {
  RegistrationCategory,
  TeamMember,
} from "../../types/registration";
import { User, Mail, Phone, BookOpen, Home, Building, Crown } from "lucide-react";

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
  const isLeader = member.role === "LEADER";

  function handleMobileChange(value: string) {
    onChange(index, "mobile", value.replace(/\D/g, "").slice(0, 10));
  }

  function handleWardenContactChange(value: string) {
    onChange(index, "wardenContact", value.replace(/\D/g, "").slice(0, 10));
  }

  function handleRegNumChange(value: string) {
    onChange(index, "registrationNumber", isKLU ? value.replace(/\D/g, "") : value);
  }

  const accentColor = isLeader ? "var(--color-primary)" : "var(--color-primary-light)";

  return (
    <div
      style={{
        background: "linear-gradient(135deg, rgba(14, 30, 72, 0.8) 0%, rgba(18, 40, 96, 0.55) 100%)",
        border: isLeader
          ? "1.5px solid rgba(245, 158, 11, 0.6)"
          : "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "var(--radius-xl)",
        overflow: "hidden",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: isLeader
          ? "0 8px 28px rgba(245, 158, 11, 0.15)"
          : "0 4px 16px rgba(4, 11, 30, 0.35)",
      }}
    >
      {/* Member Header Banner */}
      <div
        style={{
          background: isLeader
            ? "linear-gradient(135deg, #0f2c6e 0%, #1e3a8a 100%)"
            : "linear-gradient(135deg, #09173d 0%, #112658 100%)",
          padding: "1rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.75rem",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: isLeader
                ? "var(--color-accent)"
                : "rgba(255, 255, 255, 0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 800,
                fontSize: "0.875rem",
                color: "#ffffff",
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <div>
            <div
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 700,
                fontSize: "0.9375rem",
                color: "#ffffff",
                lineHeight: 1.2,
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              {isLeader ? "Team Leader" : `Member ${index + 1}`}
              {isLeader && <Crown size={14} style={{ color: "#fbbf24" }} />}
            </div>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.75rem",
                color: "rgba(255, 255, 255, 0.7)",
                marginTop: "0.125rem",
              }}
            >
              {isLeader ? "Primary contact & team representative" : "Team member profile"}
            </div>
          </div>
        </div>
        <span
          style={{
            background: isLeader
              ? "rgba(245, 158, 11, 0.25)"
              : "rgba(255, 255, 255, 0.12)",
            border: `1px solid ${isLeader ? "rgba(245, 158, 11, 0.5)" : "rgba(255, 255, 255, 0.2)"}`,
            color: isLeader ? "#fbbf24" : "rgba(255, 255, 255, 0.8)",
            fontFamily: "Inter, sans-serif",
            fontSize: "0.6875rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "0.25rem 0.75rem",
            borderRadius: 999,
            whiteSpace: "nowrap",
          }}
        >
          {member.role}
        </span>
      </div>

      {/* Fields Body */}
      <div style={{ padding: "clamp(1.25rem, 3vw, 1.75rem)" }}>
        {/* ── Personal Information ── */}
        <FieldGroup label="Personal Information" accent={accentColor}>
          <div className="fields-2col">
            <FormField
              id={`name-${index}`}
              label="Full Name"
              required
              icon={<User size={14} />}
            >
              <input
                id={`name-${index}`}
                type="text"
                value={member.fullName}
                onChange={(e) => onChange(index, "fullName", e.target.value)}
                placeholder={isKLU ? "Full name as per KLU ID" : "Full name (official records)"}
                required
                style={inputStyle}
                onFocus={onFocusStyle}
                onBlur={onBlurStyle}
              />
            </FormField>

            <FormField
              id={`regnum-${index}`}
              label="Registration Number"
              required
              icon={<BookOpen size={14} />}
            >
              <input
                id={`regnum-${index}`}
                type="text"
                value={member.registrationNumber}
                onChange={(e) => handleRegNumChange(e.target.value)}
                placeholder={isKLU ? "e.g. 992XXXXXXXX" : "e.g. EUPH-26-XXXXXX / College ID"}
                required
                style={inputStyle}
                onFocus={onFocusStyle}
                onBlur={onBlurStyle}
              />
            </FormField>
          </div>

          {/* College name — only for External */}
          {category === "OTHER" && (
            <div style={{ marginTop: "1rem" }}>
              <FormField
                id={`college-${index}`}
                label="College / Institution Name"
                required
                icon={<Building size={14} />}
              >
                <input
                  id={`college-${index}`}
                  type="text"
                  value={member.collegeName}
                  onChange={(e) => onChange(index, "collegeName", e.target.value)}
                  placeholder="e.g. SRM Institute, VIT Chennai, PSG Tech"
                  required
                  style={inputStyle}
                  onFocus={onFocusStyle}
                  onBlur={onBlurStyle}
                />
              </FormField>
            </div>
          )}
        </FieldGroup>

        <div style={{ height: "1.375rem" }} />

        {/* ── Contact Information ── */}
        <FieldGroup label="Contact Information" accent={accentColor}>
          <div className="fields-2col">
            <FormField
              id={`email-${index}`}
              label="Email Address"
              required
              icon={<Mail size={14} />}
            >
              <input
                id={`email-${index}`}
                type="email"
                value={member.email}
                onChange={(e) => onChange(index, "email", e.target.value)}
                placeholder={isKLU ? "e.g. student@klu.ac.in" : "name@gmail.com"}
                required
                style={inputStyle}
                onFocus={onFocusStyle}
                onBlur={onBlurStyle}
              />
            </FormField>

            <FormField
              id={`mobile-${index}`}
              label="Mobile Number"
              required
              icon={<Phone size={14} />}
            >
              <input
                id={`mobile-${index}`}
                type="tel"
                value={member.mobile}
                onChange={(e) => handleMobileChange(e.target.value)}
                placeholder="10-digit mobile number"
                maxLength={10}
                required
                style={inputStyle}
                onFocus={onFocusStyle}
                onBlur={onBlurStyle}
              />
            </FormField>
          </div>
        </FieldGroup>

        <div style={{ height: "1.375rem" }} />

        {/* ── Academic Details ── */}
        <FieldGroup label="Academic Details" accent={accentColor}>
          <div className="fields-3col">
            <FormField id={`gender-${index}`} label="Gender" required>
              <select
                id={`gender-${index}`}
                value={member.gender}
                onChange={(e) => onChange(index, "gender", e.target.value)}
                required
                style={selectStyle}
                onFocus={onFocusStyle}
                onBlur={onBlurStyle}
              >
                <option value="">Select Gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>
            </FormField>

            <FormField id={`year-${index}`} label="Year of Study" required>
              <select
                id={`year-${index}`}
                value={member.academicYear}
                onChange={(e) => onChange(index, "academicYear", e.target.value)}
                required
                style={selectStyle}
                onFocus={onFocusStyle}
                onBlur={onBlurStyle}
              >
                <option value="">Select Year</option>
                <option value="FIRST_YEAR">1st Year</option>
                <option value="SECOND_YEAR">2nd Year</option>
                <option value="THIRD_YEAR">3rd Year</option>
                <option value="FOURTH_YEAR">4th Year</option>
              </select>
            </FormField>

            <FormField id={`dept-${index}`} label="Department" required>
              <input
                id={`dept-${index}`}
                type="text"
                value={member.department}
                onChange={(e) => onChange(index, "department", e.target.value)}
                placeholder="e.g. CSE, AI&DS, ECE"
                required
                style={inputStyle}
                onFocus={onFocusStyle}
                onBlur={onBlurStyle}
              />
            </FormField>
          </div>
        </FieldGroup>

        {/* ── KLU-only: Accommodation Details ── */}
        {category === "KLU" && (
          <>
            <div style={{ height: "1.375rem" }} />
            <FieldGroup label="Accommodation" accent={accentColor}>
              <FormField
                id={`accomm-${index}`}
                label="Accommodation Type"
                required
                icon={<Home size={14} />}
              >
                <select
                  id={`accomm-${index}`}
                  value={member.accommodationType}
                  onChange={(e) => onChange(index, "accommodationType", e.target.value)}
                  required
                  style={selectStyle}
                  onFocus={onFocusStyle}
                  onBlur={onBlurStyle}
                >
                  <option value="">Select Accommodation Type</option>
                  <option value="DAY_SCHOLAR">Day Scholar</option>
                  <option value="HOSTELLER">Hosteller</option>
                </select>
              </FormField>

              {/* Hosteller Sub-fields with warm tint */}
              {isHosteller && (
                <div
                  style={{
                    marginTop: "1.125rem",
                    padding: "1.25rem",
                    background: "#dbe8fa",
                    borderRadius: "var(--radius-lg)",
                    border: "1px solid #bfd3f2",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--color-primary)",
                      marginBottom: "1rem",
                    }}
                  >
                    KLU Hostel Residency Details
                  </p>
                  <div className="fields-2col" style={{ rowGap: "1rem" }}>
                    <FormField id={`hostel-${index}`} label="Hostel Name" required>
                      <input
                        id={`hostel-${index}`}
                        type="text"
                        value={member.hostelName}
                        onChange={(e) => onChange(index, "hostelName", e.target.value)}
                        placeholder="e.g. MH-1, LH-2"
                        required
                        style={inputStyle}
                        onFocus={onFocusStyle}
                        onBlur={onBlurStyle}
                      />
                    </FormField>
                    <FormField id={`room-${index}`} label="Room Number" required>
                      <input
                        id={`room-${index}`}
                        type="text"
                        value={member.roomNumber}
                        onChange={(e) => onChange(index, "roomNumber", e.target.value)}
                        placeholder="e.g. 305"
                        required
                        style={inputStyle}
                        onFocus={onFocusStyle}
                        onBlur={onBlurStyle}
                      />
                    </FormField>
                    <FormField id={`warden-${index}`} label="Warden Name" required>
                      <input
                        id={`warden-${index}`}
                        type="text"
                        value={member.wardenName}
                        onChange={(e) => onChange(index, "wardenName", e.target.value)}
                        placeholder="e.g. Dr. Ramesh Kumar"
                        required
                        style={inputStyle}
                        onFocus={onFocusStyle}
                        onBlur={onBlurStyle}
                      />
                    </FormField>
                    <FormField id={`wardenPhone-${index}`} label="Warden Contact" required>
                      <input
                        id={`wardenPhone-${index}`}
                        type="tel"
                        value={member.wardenContact}
                        onChange={(e) => handleWardenContactChange(e.target.value)}
                        placeholder="10-digit phone number"
                        maxLength={10}
                        required
                        style={inputStyle}
                        onFocus={onFocusStyle}
                        onBlur={onBlurStyle}
                      />
                    </FormField>
                  </div>
                </div>
              )}
            </FieldGroup>
          </>
        )}
      </div>
    </div>
  );
}

// ── Shared Style Objects ──────────────────────────────────────

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(6, 16, 42, 0.85)",
  border: "1.5px solid rgba(255, 255, 255, 0.15)",
  borderRadius: "0.625rem",
  padding: "0.75rem 1rem",
  fontFamily: "Inter, sans-serif",
  fontSize: "0.9375rem",
  color: "#ffffff",
  outline: "none",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease",
  boxSizing: "border-box",
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  appearance: "auto",
  cursor: "pointer",
};

function onFocusStyle(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = "var(--color-accent)";
  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(245, 158, 11, 0.25)";
  e.currentTarget.style.background = "rgba(10, 25, 65, 0.95)";
}

function onBlurStyle(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
  e.currentTarget.style.boxShadow = "none";
  e.currentTarget.style.background = "rgba(6, 16, 42, 0.85)";
}

// ── Sub-components ────────────────────────────────────────────

function FieldGroup({
  label,
  accent,
  children,
}: {
  label: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "0.875rem",
        }}
      >
        <div
          style={{
            height: 14,
            width: 3,
            borderRadius: 999,
            background: accent,
            flexShrink: 0,
            boxShadow: `0 0 8px ${accent}`,
          }}
        />
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "rgba(147, 197, 253, 0.85)",
          }}
        >
          {label}
        </span>
      </div>
      {children}
      <style>{`
        .fields-2col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.125rem;
        }
        .fields-3col {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 1.125rem;
        }
        @media (max-width: 640px) {
          .fields-2col { grid-template-columns: 1fr !important; }
          .fields-3col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function FormField({
  id,
  label,
  required,
  icon,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.375rem",
          fontFamily: "Inter, sans-serif",
          fontSize: "0.8125rem",
          fontWeight: 600,
          color: "rgba(226, 232, 240, 0.9)",
          marginBottom: "0.4375rem",
          letterSpacing: "0.01em",
        }}
      >
        {icon && <span style={{ color: "var(--color-accent)", display: "flex" }}>{icon}</span>}
        {label}
        {required && <span style={{ color: "#f87171" }}>*</span>}
      </label>
      {children}
    </div>
  );
}