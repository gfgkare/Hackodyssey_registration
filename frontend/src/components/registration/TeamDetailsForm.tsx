import type { RegistrationCategory } from "../../types/registration";

interface TeamDetailsFormProps {
  teamName: string;
  category: RegistrationCategory;
  onChange: (
    field: "teamName" | "institution" | "category",
    value: string
  ) => void;
}

export default function TeamDetailsForm({
  teamName,
  category,
  onChange,
}: TeamDetailsFormProps) {
  return (
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
      {/* Section heading */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          marginBottom: "1.5rem",
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
            01
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
            Team Details
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "0.8125rem",
              color: "rgba(147, 197, 253, 0.8)",
              marginTop: "0.125rem",
            }}
          >
            Choose your team category and enter an official team name
          </p>
        </div>
      </div>

      {/* Fields Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.25rem",
        }}
        className="team-details-grid"
      >
        {/* Team Name */}
        <div>
          <label
            htmlFor="teamName"
            style={{
              display: "block",
              fontFamily: "Inter, sans-serif",
              fontSize: "0.8125rem",
              fontWeight: 600,
              color: "rgba(226, 232, 240, 0.9)",
              marginBottom: "0.5rem",
              letterSpacing: "0.01em",
            }}
          >
            Team Name <span style={{ color: "#f87171" }}>*</span>
          </label>
          <input
            id="teamName"
            type="text"
            value={teamName}
            onChange={(e) => onChange("teamName", e.target.value)}
            placeholder="e.g. Binary Beasts, Innovators 4.0"
            required
            style={{
              width: "100%",
              background: "rgba(6, 16, 42, 0.85)",
              border: "1.5px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "var(--radius-md)",
              padding: "0.75rem 1rem",
              fontFamily: "Inter, sans-serif",
              fontSize: "0.9375rem",
              color: "#ffffff",
              outline: "none",
              transition: "border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease",
              boxSizing: "border-box",
            }}
            onFocus={(e) => {
              (e.target as HTMLInputElement).style.borderColor = "var(--color-accent)";
              (e.target as HTMLInputElement).style.boxShadow = "0 0 0 3px rgba(245, 158, 11, 0.25)";
              (e.target as HTMLInputElement).style.background = "rgba(10, 25, 65, 0.95)";
            }}
            onBlur={(e) => {
              (e.target as HTMLInputElement).style.borderColor = "rgba(255, 255, 255, 0.15)";
              (e.target as HTMLInputElement).style.boxShadow = "none";
              (e.target as HTMLInputElement).style.background = "rgba(6, 16, 42, 0.85)";
            }}
          />
        </div>

        {/* Participant Category */}
        <div>
          <label
            htmlFor="category"
            style={{
              display: "block",
              fontFamily: "Inter, sans-serif",
              fontSize: "0.8125rem",
              fontWeight: 600,
              color: "rgba(226, 232, 240, 0.9)",
              marginBottom: "0.5rem",
              letterSpacing: "0.01em",
            }}
          >
            Participant Category <span style={{ color: "#f87171" }}>*</span>
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => onChange("category", e.target.value)}
            style={{
              width: "100%",
              background: "rgba(6, 16, 42, 0.85)",
              border: "1.5px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "var(--radius-md)",
              padding: "0.75rem 1rem",
              fontFamily: "Inter, sans-serif",
              fontSize: "0.9375rem",
              color: "#ffffff",
              outline: "none",
              appearance: "auto",
              cursor: "pointer",
              transition: "border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease",
              boxSizing: "border-box",
            }}
            onFocus={(e) => {
              (e.target as HTMLSelectElement).style.borderColor = "var(--color-accent)";
              (e.target as HTMLSelectElement).style.boxShadow = "0 0 0 3px rgba(245, 158, 11, 0.25)";
              (e.target as HTMLSelectElement).style.background = "rgba(10, 25, 65, 0.95)";
            }}
            onBlur={(e) => {
              (e.target as HTMLSelectElement).style.borderColor = "rgba(255, 255, 255, 0.15)";
              (e.target as HTMLSelectElement).style.boxShadow = "none";
              (e.target as HTMLSelectElement).style.background = "rgba(6, 16, 42, 0.85)";
            }}
          >
            <option value="KLU" style={{ background: "#06102a", color: "#ffffff" }}>KLU Student (Internal)</option>
            <option value="OTHER" style={{ background: "#06102a", color: "#ffffff" }}>External College Student (Other University / College)</option>
          </select>
        </div>
      </div>

      {/* Category hint alert */}
      <div
        style={{
          marginTop: "1.25rem",
          padding: "0.875rem 1.125rem",
          background: category === "KLU" ? "rgba(37, 99, 235, 0.12)" : "rgba(245, 158, 11, 0.12)",
          borderRadius: "var(--radius-md)",
          borderLeft: `4px solid ${category === "KLU" ? "#3b82f6" : "var(--color-accent)"}`,
          border: `1px solid ${category === "KLU" ? "rgba(59, 130, 246, 0.3)" : "rgba(245, 158, 11, 0.3)"}`,
        }}
      >
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "0.8125rem",
            color: category === "KLU" ? "#bfdbfe" : "#fde68a",
            lineHeight: 1.6,
          }}
        >
          {category === "KLU" ? (
            <>
              <strong>KLU Students:</strong> Use your numeric student ID (e.g. 992XXXXXXXX) and official @klu.ac.in email address.
            </>
          ) : (
            <>
              <strong>External Participants:</strong> Welcome! Enter your college name and Euphoria format ID (e.g. EUPH-26-XXXXXX) or home college roll number.
            </>
          )}
        </p>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .team-details-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}