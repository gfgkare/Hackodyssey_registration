import { useEffect, useRef } from "react";
import RegistrationForm from "../registration/RegistrationForm";

export default function RegistrationSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 100);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="register"
      ref={sectionRef}
      className="section"
      style={{
        position: "relative",
        background: "linear-gradient(180deg, #070e22 0%, #0a163a 50%, #070e22 100%)",
        color: "#ffffff",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{ textAlign: "center", marginBottom: "2.75rem" }}
          className="reveal"
        >
          <span className="section-label">Join Us</span>
          <h2
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.875rem, 4vw, 2.75rem)",
              color: "#ffffff",
              marginBottom: "0.875rem",
              letterSpacing: "-0.02em",
            }}
          >
            Register for Hack Odyssey 2026
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "1.0625rem",
              color: "rgba(226, 232, 240, 0.8)",
              maxWidth: 540,
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Secure your spot and be part of this exciting collaborative hackathon
            at Kalasalingam Academy of Research and Education.
          </p>
        </div>

        {/* Info banner */}
        <div
          className="reveal"
          style={{
            background: "linear-gradient(135deg, rgba(37, 99, 235, 0.12) 0%, rgba(245, 158, 11, 0.1) 100%)",
            border: "1px solid rgba(59, 130, 246, 0.3)",
            borderRadius: "var(--radius-lg)",
            padding: "1rem 1.375rem",
            marginBottom: "2rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#3b82f6",
              flexShrink: 0,
            }}
          />
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "0.9rem",
              color: "rgba(224, 242, 254, 0.95)",
              lineHeight: 1.6,
            }}
          >
            <strong style={{ color: "#93c5fd" }}>KLU Students:</strong> Use your @klu.ac.in email and numeric
            registration number. &nbsp;
            <strong style={{ color: "var(--color-accent)" }}>External Participants:</strong> Use Euphoria ID
            format&nbsp;<code style={{ background: "rgba(6, 16, 42, 0.8)", border: "1px solid rgba(245, 158, 11, 0.4)", color: "#fbbf24", padding: "0.15rem 0.4rem", borderRadius: 4 }}>EUPH-26-XXXXXX</code>&nbsp;(find it on the{" "}
            <a
              href="https://euphoria.kalasalingam.ac.in/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#fbbf24", textDecoration: "underline", fontWeight: 600 }}
            >
              Euphoria Dashboard
            </a>
            ).
          </p>
        </div>

        {/* Form Card */}
        <div
          className="reveal"
          style={{
            background: "linear-gradient(135deg, rgba(10, 22, 54, 0.94) 0%, rgba(14, 30, 74, 0.86) 100%)",
            borderRadius: "var(--radius-2xl)",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.55)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            overflow: "hidden",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
        >
          {/* Card header bar */}
          <div
            style={{
              background: "linear-gradient(135deg, #091c49 0%, #13337a 100%)",
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
                Hack Odyssey 2026 — Team Registration
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.8125rem",
                  color: "rgba(147, 197, 253, 0.8)",
                  marginTop: "0.125rem",
                }}
              >
                Fill in details for all team members (2 – 5 members per team)
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

          {/* Form Body */}
          <div style={{ padding: "clamp(1.25rem, 3.5vw, 2.5rem)" }}>
            <RegistrationForm />
          </div>
        </div>
      </div>
    </section>
  );
}
