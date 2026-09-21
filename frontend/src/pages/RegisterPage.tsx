import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  IndianRupee,
  MapPin,
  Trophy,
  Calendar,
} from "lucide-react";
import RegistrationForm from "../components/registration/RegistrationForm";
import { eventConfig } from "../config/eventConfig";

export default function RegisterPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `
          linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
          linear-gradient(175deg, #070e22 0%, #0d1a45 50%, #070e22 100%)
        `,
        backgroundSize: `48px 48px, 48px 48px, 100% 100%`,
        backgroundPosition: `0 0, 0 0, 0 0`,
        color: "#ffffff",
      }}
    >
      {/* Top Bar */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(5, 13, 36, 0.94)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 4px 24px rgba(0, 0, 0, 0.4)",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 1.5rem",
            height: 68,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <button
            onClick={() => navigate("/")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              cursor: "pointer",
              fontFamily: "Inter, sans-serif",
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "rgba(226, 232, 240, 0.9)",
              padding: "0.5rem 1rem",
              borderRadius: "var(--radius-md)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#ffffff";
              (e.currentTarget as HTMLElement).style.borderColor = "var(--color-accent)";
              (e.currentTarget as HTMLElement).style.background = "rgba(245, 158, 11, 0.14)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "rgba(226, 232, 240, 0.9)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255, 255, 255, 0.15)";
              (e.currentTarget as HTMLElement).style.background = "rgba(255, 255, 255, 0.08)";
            }}
          >
            <ArrowLeft size={16} />
            Back to Home
          </button>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <div
              style={{
                background: "linear-gradient(135deg, #c5d7fc 0%, #dae6ff 100%)",
                padding: "3px 6px",
                borderRadius: "var(--radius-md)",
                display: "flex",
                alignItems: "center",
                boxShadow: "0 2px 10px rgba(59, 130, 246, 0.25)",
              }}
            >
              <img
                src="/kalasalingam.png"
                alt="Kalasalingam University"
                style={{
                  height: 38,
                  width: "auto",
                  objectFit: "contain",
                  borderRadius: "var(--radius-xs, 4px)",
                  flexShrink: 0,
                  display: "block",
                }}
              />
            </div>
            <div>
              <div
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 700,
                  fontSize: "0.9375rem",
                  color: "#ffffff",
                  lineHeight: 1.1,
                }}
              >
                {eventConfig.eventName}
              </div>
              <div
                style={{
                  fontSize: "0.6875rem",
                  color: "rgba(147, 197, 253, 0.8)",
                  fontWeight: 500,
                }}
              >
                Official Registration Portal
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "2.75rem 1.25rem 5rem",
        }}
      >
        {/* Page Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(245, 158, 11, 0.14)",
              border: "1px solid rgba(245, 158, 11, 0.35)",
              padding: "0.3125rem 0.875rem",
              borderRadius: 999,
              marginBottom: "0.875rem",
            }}
          >
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--color-accent)",
              }}
            >
              Official Registration
            </span>
          </div>

          <h1
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              color: "#ffffff",
              marginBottom: "0.75rem",
              letterSpacing: "-0.02em",
            }}
          >
            Register for {eventConfig.eventName}
          </h1>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "1rem",
              color: "rgba(226, 232, 240, 0.8)",
              maxWidth: 560,
              margin: "0 auto",
              lineHeight: 1.65,
            }}
          >
            Fill in your team details below. Each team must have 4 or 5 members.
            Registration fee is {eventConfig.registrationFee}. Open to all college
            students across India.
          </p>
        </div>

        {/* Info Pills */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "0.625rem",
            flexWrap: "wrap",
            marginBottom: "2.25rem",
          }}
        >
          {[
            {
              icon: <Users size={14} />,
              text: eventConfig.teamSize,
              color: "#93c5fd",
            },
            {
              icon: <IndianRupee size={14} />,
              text: eventConfig.registrationFee,
              color: "#4ade80",
            },
            {
              icon: <Calendar size={14} />,
              text: eventConfig.eventDate,
              color: "#fbbf24",
            },
            {
              icon: <MapPin size={14} />,
              text: eventConfig.venue,
              color: "#93c5fd",
            },
            {
              icon: <Trophy size={14} />,
              text: `Prize Pool: ${eventConfig.prizePool}`,
              color: "#f59e0b",
            },
          ].map((pill) => (
            <div
              key={pill.text}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4375rem",
                background: "linear-gradient(135deg, rgba(14, 30, 72, 0.75) 0%, rgba(20, 45, 108, 0.5) 100%)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: 999,
                padding: "0.45rem 1rem",
                fontFamily: "Inter, sans-serif",
                fontSize: "0.8125rem",
                fontWeight: 600,
                color: "#ffffff",
                boxShadow: "0 4px 14px rgba(4, 11, 30, 0.35)",
              }}
            >
              <span style={{ color: pill.color, display: "flex" }}>{pill.icon}</span>
              {pill.text}
            </div>
          ))}
        </div>

        {/* Main Form Card */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(10, 22, 54, 0.94) 0%, rgba(14, 30, 74, 0.86) 100%)",
            borderRadius: "var(--radius-2xl)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.55)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            overflow: "hidden",
          }}
        >
          {/* Card Header */}
          <div
            style={{
              background:
                "linear-gradient(135deg, #091c49 0%, #13337a 100%)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
              padding: "1.375rem 2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "0.75rem",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 700,
                  fontSize: "1.0625rem",
                  color: "#ffffff",
                }}
              >
                {eventConfig.eventName} — Team Registration Form
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.8125rem",
                  color: "rgba(147, 197, 253, 0.8)",
                  marginTop: "0.25rem",
                }}
              >
                Kalasalingam Academy of Research and Education · Krishnankoil, Tamil Nadu
              </div>
            </div>
            <span
              style={{
                background: "rgba(74, 222, 128, 0.18)",
                border: "1px solid rgba(74, 222, 128, 0.4)",
                color: "#4ade80",
                fontFamily: "Inter, sans-serif",
                fontSize: "0.6875rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "0.3125rem 0.875rem",
                borderRadius: 999,
                display: "flex",
                alignItems: "center",
                gap: "0.375rem",
                whiteSpace: "nowrap",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#4ade80",
                  display: "inline-block",
                }}
              />
              Registrations Open
            </span>
          </div>

          {/* Form Body with refined spacing */}
          <div
            style={{
              padding: "clamp(1.25rem, 3.5vw, 2.5rem)",
            }}
          >
            <RegistrationForm />
          </div>
        </div>
      </main>
    </div>
  );
}
