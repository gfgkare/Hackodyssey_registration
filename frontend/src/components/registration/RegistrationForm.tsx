import { useState } from "react";
import { CheckCircle, AlertTriangle, Loader2, MessageCircle } from "lucide-react";

import TeamDetailsForm from "./TeamDetailsForm";
import MemberFields from "./MemberFields";

import {
  submitRegistration,
  type RegistrationResponse,
} from "../../services/registration.service";

import type {
  RegistrationFormData,
  TeamMember,
} from "../../types/registration";

function createMember(role: "LEADER" | "MEMBER"): TeamMember {
  return {
    fullName: "",
    registrationNumber: "",
    collegeName: "",
    email: "",
    mobile: "",
    gender: "",
    academicYear: "",
    department: "",
    role,
    accommodationType: "",
    hostelName: "",
    roomNumber: "",
    wardenName: "",
    wardenContact: "",
  };
}

function createInitialMembers(size: number): TeamMember[] {
  return [
    createMember("LEADER"),
    ...Array.from({ length: size - 1 }, () => createMember("MEMBER")),
  ];
}

function RegistrationForm() {
  const [teamSize, setTeamSize] = useState<4 | 5>(4);

  const [formData, setFormData] = useState<RegistrationFormData>({
    teamName: "",
    institution: "Kalasalingam Academy of Research and Education",
    category: "KLU",
    members: createInitialMembers(4),
  });

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [registrationResult, setRegistrationResult] =
    useState<NonNullable<RegistrationResponse["data"]> | null>(null);

  function handleTeamDetailsChange(
    field: "teamName" | "institution" | "category",
    value: string
  ) {
    setFormData((prev) => {
      const updated: RegistrationFormData = { ...prev, [field]: value };

      if (field === "category") {
        updated.members = updated.members.map((m) => ({
          ...m,
          accommodationType: "",
          hostelName: "",
          roomNumber: "",
          wardenName: "",
          wardenContact: "",
        }));
        updated.institution =
          value === "KLU"
            ? "Kalasalingam Academy of Research and Education"
            : "";
      }

      return updated;
    });
  }

  function handleTeamSizeChange(size: 4 | 5) {
    setTeamSize(size);
    setFormData((prev) => {
      let members = [...prev.members];
      if (size > members.length) {
        while (members.length < size) members.push(createMember("MEMBER"));
      } else {
        members = members.slice(0, size);
      }
      members = members.map((m, i) => ({
        ...m,
        role: i === 0 ? "LEADER" : "MEMBER",
      }));
      return { ...prev, members };
    });
  }

  function handleMemberChange(
    index: number,
    field: keyof TeamMember,
    value: string
  ) {
    setFormData((prev) => {
      const members = [...prev.members];
      members[index] = { ...members[index], [field]: value };
      if (field === "accommodationType" && value === "DAY_SCHOLAR") {
        members[index] = {
          ...members[index],
          hostelName: "",
          roomNumber: "",
          wardenName: "",
          wardenContact: "",
        };
      }
      return { ...prev, members };
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setIsSuccess(false);
    setRegistrationResult(null);

    if (!formData.teamName.trim()) {
      setMessage("Please enter a team name.");
      return;
    }
    if (formData.members.length !== 4 && formData.members.length !== 5) {
      setMessage("A team must contain exactly 4 or 5 members.");
      return;
    }
    if (!formData.category) {
      setMessage("Please select a college type.");
      return;
    }

    for (let i = 0; i < formData.members.length; i++) {
      const m = formData.members[i];
      const n = i + 1;

      if (
        !m.fullName.trim() ||
        !m.registrationNumber.trim() ||
        !m.department.trim() ||
        !m.gender ||
        !m.academicYear ||
        !m.email.trim() ||
        !m.mobile.trim()
      ) {
        setMessage(`Please complete all required fields for Member ${n}.`);
        return;
      }

      if (formData.category === "OTHER") {
        if (!m.collegeName.trim()) {
          setMessage(`Please enter the college name for Member ${n}.`);
          return;
        }
        if (!/^EUPH-26-[A-Za-z0-9]+$/i.test(m.registrationNumber.trim())) {
          setMessage(
            `Member ${n} registration number must follow the format EUPH-26-XXXXXX.`
          );
          return;
        }
      }

      if (!/^\d{10}$/.test(m.mobile.trim())) {
        setMessage(`Member ${n} must have a valid 10-digit phone number.`);
        return;
      }

      if (formData.category === "KLU") {
        if (!/^\d+$/.test(m.registrationNumber.trim())) {
          setMessage(
            `Member ${n} must have a valid numeric registration number.`
          );
          return;
        }
        if (!m.email.trim().toLowerCase().endsWith("@klu.ac.in")) {
          setMessage(
            `Member ${n} must use a valid @klu.ac.in email address.`
          );
          return;
        }
        if (!m.accommodationType) {
          setMessage(`Please select accommodation type for Member ${n}.`);
          return;
        }
        if (
          m.accommodationType === "HOSTELLER" &&
          (!m.hostelName.trim() ||
            !m.roomNumber.trim() ||
            !m.wardenName.trim() ||
            !/^\d{10}$/.test(m.wardenContact.trim()))
        ) {
          setMessage(`Please complete valid hostel details for Member ${n}.`);
          return;
        }
      }

      if (formData.category === "OTHER") {
        if (
          m.accommodationType ||
          m.hostelName.trim() ||
          m.roomNumber.trim() ||
          m.wardenName.trim() ||
          m.wardenContact.trim()
        ) {
          setMessage(
            `Accommodation details must be empty for Member ${n} of Other College.`
          );
          return;
        }
      }
    }

    const emails = formData.members.map((m) => m.email.trim().toLowerCase());
    if (new Set(emails).size !== emails.length) {
      setMessage("Each member must have a unique email address.");
      return;
    }
    const mobiles = formData.members.map((m) => m.mobile.trim());
    if (new Set(mobiles).size !== mobiles.length) {
      setMessage("Each member must have a unique mobile number.");
      return;
    }
    const regNums = formData.members.map((m) =>
      m.registrationNumber.trim().toLowerCase()
    );
    if (new Set(regNums).size !== regNums.length) {
      setMessage("Each member must have a unique registration number.");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await submitRegistration(formData);
      if (response.success && response.data) {
        setIsSuccess(true);
        setMessage(response.message);
        setRegistrationResult(response.data);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setIsSuccess(false);
        setMessage(response.message || "Registration could not be completed.");
      }
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "response" in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
        };
        setMessage(
          axiosError.response?.data?.message ||
            "Registration failed. Please try again."
        );
      } else {
        setMessage("Unable to connect to the server. Please try again.");
      }
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  // ── Success Screen ────────────────────────────────────────
  if (isSuccess && registrationResult) {
    return (
      <div style={{ textAlign: "center", padding: "1rem 0" }}>
        {/* Icon */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.5rem",
            boxShadow: "0 8px 28px rgba(16, 185, 129, 0.35)",
          }}
        >
          <CheckCircle size={40} color="#ffffff" />
        </div>

        <h2
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            color: "#4ade80",
            marginBottom: "0.625rem",
            textShadow: "0 0 20px rgba(74, 222, 128, 0.3)",
          }}
        >
          Registration Successful! 🎉
        </h2>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "1rem",
            color: "rgba(226, 232, 240, 0.85)",
            marginBottom: "2rem",
            lineHeight: 1.6,
          }}
        >
          {message || "Your team has been registered successfully for Hack Odyssey 2026."}
        </p>

        {/* Details card */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(14, 30, 72, 0.8) 0%, rgba(18, 40, 96, 0.55) 100%)",
            border: "1px solid rgba(74, 222, 128, 0.35)",
            borderRadius: "var(--radius-xl)",
            padding: "1.75rem",
            textAlign: "left",
            marginBottom: "2rem",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            boxShadow: "0 12px 36px rgba(0, 0, 0, 0.45)",
          }}
        >
          <p
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 700,
              fontSize: "0.9375rem",
              color: "#4ade80",
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <CheckCircle size={16} />
            Registration Details
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.875rem",
            }}
            className="success-grid"
          >
            {[
              { label: "Team ID", value: registrationResult.id },
              { label: "Team Name", value: registrationResult.teamName },
              { label: "Institution", value: registrationResult.institution },
              { label: "Category", value: registrationResult.category },
              { label: "Status", value: registrationResult.status },
              {
                label: "Members Registered",
                value: String(registrationResult.members.length),
              },
            ].map((row) => (
              <div
                key={row.label}
                style={{
                  background: "rgba(6, 16, 42, 0.85)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "var(--radius-md)",
                  padding: "0.875rem 1rem",
                }}
              >
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "rgba(148, 163, 184, 0.9)",
                    marginBottom: "0.25rem",
                  }}
                >
                  {row.label}
                </div>
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.9375rem",
                    fontWeight: 600,
                    color: "#ffffff",
                    wordBreak: "break-all",
                  }}
                >
                  {row.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WhatsApp Button */}
        <a
          href="https://chat.whatsapp.com/D2EVvQ3OThT5nx1wFsznx5"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.625rem",
            width: "100%",
            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            color: "#ffffff",
            fontFamily: "Inter, sans-serif",
            fontWeight: 700,
            fontSize: "1rem",
            padding: "0.9375rem",
            borderRadius: "var(--radius-lg)",
            textDecoration: "none",
            transition: "background 0.2s, transform 0.15s, box-shadow 0.2s",
            boxShadow: "0 6px 20px rgba(16, 185, 129, 0.4)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "linear-gradient(135deg, #059669 0%, #047857 100%)";
            (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(16, 185, 129, 0.55)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "linear-gradient(135deg, #10b981 0%, #059669 100%)";
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(16, 185, 129, 0.4)";
          }}
        >
          <MessageCircle size={20} />
          Join Official WhatsApp Group
        </a>

        <style>{`
          .success-grid { grid-template-columns: 1fr 1fr; }
          @media (max-width: 480px) {
            .success-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    );
  }

  // ── Main Form ─────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} noValidate>
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {/* Team Details */}
        <TeamDetailsForm
          teamName={formData.teamName}
          category={formData.category}
          onChange={handleTeamDetailsChange}
        />

        {/* Team Size */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(14, 30, 72, 0.75) 0%, rgba(18, 40, 96, 0.5) 100%)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "var(--radius-xl)",
            padding: "clamp(1.25rem, 3vw, 1.75rem)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            boxShadow: "0 8px 24px rgba(4, 11, 30, 0.4)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1.25rem",
              paddingBottom: "1rem",
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "var(--radius-sm)",
                background: "var(--color-accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                boxShadow: "0 2px 10px rgba(245, 158, 11, 0.3)",
              }}
            >
              <span
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 800,
                  fontSize: "0.8125rem",
                  color: "#050d24",
                }}
              >
                02
              </span>
            </div>
            <div>
              <h2
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 700,
                  fontSize: "1.0625rem",
                  color: "#ffffff",
                  lineHeight: 1.2,
                }}
              >
                Team Size
              </h2>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.8125rem",
                  color: "rgba(147, 197, 253, 0.8)",
                  marginTop: "0.125rem",
                }}
              >
                Choose 4 or 5 team members (as per hackathon rules)
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {([4, 5] as const).map((size) => {
              const isSelected = teamSize === size;
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => handleTeamSizeChange(size)}
                  style={{
                    flex: "1 1 140px",
                    padding: "0.9375rem 1rem",
                    borderRadius: "var(--radius-lg)",
                    border: `1.5px solid ${isSelected ? "var(--color-accent)" : "rgba(255, 255, 255, 0.15)"}`,
                    background: isSelected
                      ? "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
                      : "rgba(6, 16, 42, 0.85)",
                    color: isSelected ? "#050d24" : "#cbd5e1",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700,
                    fontSize: "1rem",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    textAlign: "center",
                    backdropFilter: "blur(8px)",
                    boxShadow: isSelected
                      ? "0 4px 18px rgba(245, 158, 11, 0.45)"
                      : "0 2px 8px rgba(0, 0, 0, 0.25)",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(245, 158, 11, 0.6)";
                      (e.currentTarget as HTMLElement).style.color = "#ffffff";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255, 255, 255, 0.15)";
                      (e.currentTarget as HTMLElement).style.color = "#cbd5e1";
                    }
                  }}
                >
                  {size} Members
                </button>
              );
            })}
          </div>
        </div>

        {/* Team Members */}
        <div>
          <div style={{ marginBottom: "1.25rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "var(--radius-sm)",
                  background: "var(--color-accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 10px rgba(245, 158, 11, 0.3)",
                }}
              >
                <span
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 800,
                    fontSize: "0.8125rem",
                    color: "#050d24",
                  }}
                >
                  03
                </span>
              </div>
              <div>
                <h2
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 700,
                    fontSize: "1.0625rem",
                    color: "#ffffff",
                    lineHeight: 1.2,
                  }}
                >
                  Team Members
                </h2>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.8125rem",
                    color: "rgba(147, 197, 253, 0.8)",
                    marginTop: "0.125rem",
                  }}
                >
                  Enter details for all {teamSize} members below
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {formData.members.map((member, i) => (
              <MemberFields
                key={i}
                member={member}
                index={i}
                category={formData.category}
                onChange={handleMemberChange}
              />
            ))}
          </div>
        </div>

        {/* Error message */}
        {message && (
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "0.75rem",
              background: "rgba(220, 38, 38, 0.15)",
              border: "1px solid rgba(239, 68, 68, 0.5)",
              borderRadius: "var(--radius-lg)",
              padding: "1rem 1.25rem",
              backdropFilter: "blur(8px)",
            }}
          >
            <AlertTriangle
              size={18}
              style={{ color: "#f87171", flexShrink: 0, marginTop: "0.125rem" }}
            />
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.9rem",
                fontWeight: 500,
                color: "#fca5a5",
                lineHeight: 1.6,
              }}
            >
              {message}
            </p>
          </div>
        )}

        {/* Critical Notice */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "1rem",
            background: "linear-gradient(135deg, rgba(28, 25, 23, 0.92) 0%, rgba(45, 15, 15, 0.85) 100%)",
            border: "1px solid rgba(239, 68, 68, 0.45)",
            borderRadius: "var(--radius-lg)",
            padding: "1.25rem 1.5rem",
            boxShadow: "0 8px 24px rgba(220, 38, 38, 0.15)",
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "var(--radius-sm)",
              background: "rgba(220,38,38,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              marginTop: "0.125rem",
              boxShadow: "0 0 10px rgba(220, 38, 38, 0.2)",
            }}
          >
            <AlertTriangle size={18} color="#f87171" />
          </div>
          <div>
            <p
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 700,
                fontSize: "0.875rem",
                color: "#f87171",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "0.375rem",
              }}
            >
              Critical Notice
            </p>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.875rem",
                color: "#fca5a5",
                lineHeight: 1.7,
              }}
            >
              Ensure all details are accurate before submission. Once registered,
              details cannot be modified and will be used for{" "}
              <strong style={{ color: "#ffffff", textDecoration: "underline" }}>
                CERTIFICATES &amp; CREDITS
              </strong>
              .
            </p>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.625rem",
            background: isSubmitting
              ? "rgba(100, 116, 139, 0.6)"
              : "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
            color: isSubmitting ? "#e2e8f0" : "#050d24",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 800,
            fontSize: "1.0625rem",
            padding: "1.05rem",
            borderRadius: "var(--radius-lg)",
            border: "none",
            cursor: isSubmitting ? "not-allowed" : "pointer",
            opacity: isSubmitting ? 0.75 : 1,
            transition: "all 0.2s ease",
            boxShadow: isSubmitting
              ? "none"
              : "0 6px 24px rgba(245, 158, 11, 0.4)",
            letterSpacing: "0.02em",
          }}
          onMouseEnter={(e) => {
            if (!isSubmitting) {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 8px 32px rgba(245, 158, 11, 0.6)";
            }
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLElement).style.boxShadow = isSubmitting
              ? "none"
              : "0 6px 24px rgba(245, 158, 11, 0.4)";
          }}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={20} className="animate-spin" style={{ animation: "spin 1s linear infinite" }} />
              Submitting Registration...
            </>
          ) : (
            "Submit Team Registration →"
          )}
        </button>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </form>
  );
}

export default RegistrationForm;