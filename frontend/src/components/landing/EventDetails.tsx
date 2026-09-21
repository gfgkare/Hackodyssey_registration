import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  IndianRupee,
  CheckCircle,
  GraduationCap,
  Tag,
  Trophy,
  Wifi,
} from "lucide-react";
import { eventConfig } from "../../config/eventConfig";

const rows = [
  {
    icon: <Calendar size={18} />,
    label: "Date",
    value: eventConfig.eventDate,
  },
  {
    icon: <Clock size={18} />,
    label: "Duration",
    value: eventConfig.eventTime,
  },
  {
    icon: <MapPin size={18} />,
    label: "Venue",
    value: eventConfig.venue,
  },
  {
    icon: <MapPin size={18} />,
    label: "Location",
    value: eventConfig.venueDetail,
  },
  {
    icon: <Wifi size={18} />,
    label: "Mode",
    value: eventConfig.mode,
  },
  {
    icon: <GraduationCap size={18} />,
    label: "Eligibility",
    value: eventConfig.eligibility,
  },
  {
    icon: <Users size={18} />,
    label: "Team Size",
    value: eventConfig.teamSize,
  },
  {
    icon: <IndianRupee size={18} />,
    label: "Registration Fee",
    value: eventConfig.registrationFee,
  },
  {
    icon: <Trophy size={18} />,
    label: "Prize Pool",
    value: eventConfig.prizePool,
  },
  {
    icon: <Calendar size={18} />,
    label: "Registration Deadline",
    value: eventConfig.registrationDeadline,
  },
];

export default function EventDetails() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 80);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="details"
      ref={sectionRef}
      className="section"
      style={{
        background: "linear-gradient(180deg, #070e22 0%, #0a173d 50%, #070e22 100%)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
            alignItems: "start",
          }}
          className="details-grid"
        >
          {/* Left: Header + Tracks */}
          <div>
            <div className="reveal" style={{ marginBottom: "2.5rem" }}>
              <span
                className="section-label"
                style={{ color: "var(--color-accent)", letterSpacing: "0.14em" }}
              >
                Event Details
              </span>
              <h2
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(1.875rem, 4vw, 2.75rem)",
                  color: "#ffffff",
                  marginBottom: "1rem",
                  letterSpacing: "-0.02em",
                }}
              >
                Event Information
              </h2>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "1rem",
                  color: "rgba(226, 232, 240, 0.8)",
                  lineHeight: 1.7,
                }}
              >
                Everything you need to know about participating in Hack Odyssey 4.0 at
                Kalasalingam University.
              </p>
            </div>

            {/* Problem tracks */}
            <div className="reveal" style={{ marginBottom: "2rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "1rem",
                }}
              >
                <Tag size={18} style={{ color: "var(--color-accent)" }} />
                <span
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: "#ffffff",
                  }}
                >
                  SDG Problem Tracks
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.625rem",
                }}
              >
                {eventConfig.trackShort.map((track) => (
                  <span
                    key={track}
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.8125rem",
                      fontWeight: 600,
                      color: "#93c5fd",
                      background: "rgba(37, 99, 235, 0.14)",
                      border: "1px solid rgba(59, 130, 246, 0.35)",
                      padding: "0.4375rem 0.9375rem",
                      borderRadius: 999,
                    }}
                  >
                    {track}
                  </span>
                ))}
              </div>
            </div>

            {/* Checklist */}
            <div
              className="reveal"
              style={{
                background: "linear-gradient(135deg, rgba(14, 30, 72, 0.8) 0%, rgba(20, 45, 108, 0.55) 100%)",
                borderRadius: "var(--radius-xl)",
                padding: "1.5rem 1.75rem",
                marginTop: "2rem",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                boxShadow: "0 8px 24px rgba(4, 11, 30, 0.4)",
              }}
            >
              <p
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 700,
                  fontSize: "0.9375rem",
                  color: "#ffffff",
                  marginBottom: "0.875rem",
                }}
              >
                What to bring
              </p>
              {[
                "Laptop & chargers",
                "Valid College ID card",
                "Team registration confirmation",
                "Enthusiasm & innovative ideas!",
              ].map((item) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.625rem",
                    marginBottom: "0.625rem",
                  }}
                >
                  <CheckCircle
                    size={16}
                    style={{ color: "#4ade80", flexShrink: 0 }}
                  />
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.9rem",
                      color: "rgba(226, 232, 240, 0.85)",
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Register Team Button */}
            <div style={{ marginTop: "1.5rem" }} className="reveal">
              <button
                onClick={() => navigate("/register")}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  background: "var(--color-accent)",
                  color: "#ffffff",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  padding: "0.9375rem 1.5rem",
                  borderRadius: "var(--radius-lg)",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 4px 20px rgba(245, 158, 11, 0.4)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 8px 28px rgba(245, 158, 11, 0.55)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 4px 20px rgba(245, 158, 11, 0.4)";
                }}
              >
                Register Your Team →
              </button>
            </div>
          </div>

          {/* Right: Info table */}
          <div
            className="reveal"
            style={{
              padding: 0,
              overflow: "hidden",
              borderRadius: "var(--radius-xl)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              boxShadow: "0 8px 32px rgba(4, 11, 30, 0.45)",
            }}
          >
            {rows.map((row, i) => (
              <div
                key={row.label}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1rem",
                  padding: "1.125rem 1.5rem",
                  borderBottom:
                    i < rows.length - 1
                      ? "1px solid rgba(255, 255, 255, 0.08)"
                      : "none",
                  background:
                    i % 2 === 0
                      ? "linear-gradient(135deg, rgba(14, 30, 72, 0.85) 0%, rgba(18, 40, 96, 0.7) 100%)"
                      : "linear-gradient(135deg, rgba(10, 23, 58, 0.85) 0%, rgba(14, 32, 78, 0.7) 100%)",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background =
                    "linear-gradient(135deg, rgba(22, 48, 114, 0.9) 0%, rgba(28, 62, 144, 0.8) 100%)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background =
                    i % 2 === 0
                      ? "linear-gradient(135deg, rgba(14, 30, 72, 0.85) 0%, rgba(18, 40, 96, 0.7) 100%)"
                      : "linear-gradient(135deg, rgba(10, 23, 58, 0.85) 0%, rgba(14, 32, 78, 0.7) 100%)")
                }
              >
                <div
                  style={{
                    color: "var(--color-accent)",
                    marginTop: "0.125rem",
                    flexShrink: 0,
                  }}
                >
                  {row.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      letterSpacing: "0.07em",
                      textTransform: "uppercase",
                      color: "rgba(147, 197, 253, 0.75)",
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
                    }}
                  >
                    {row.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .details-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}
