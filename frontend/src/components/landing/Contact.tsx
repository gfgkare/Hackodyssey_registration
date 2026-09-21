import { useEffect, useRef } from "react";
import { Mail, Phone, MapPin, AtSign, Share2, Globe } from "lucide-react";
import { eventConfig } from "../../config/eventConfig";

export default function Contact() {
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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section"
      style={{
        background: "linear-gradient(180deg, #070e22 0%, #0a163a 50%, #070e22 100%)",
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
          className="reveal"
        >
          <span
            className="section-label"
            style={{ color: "var(--color-accent)", letterSpacing: "0.14em" }}
          >
            Contact
          </span>
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
            Have Questions?
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "1rem",
              color: "rgba(226, 232, 240, 0.8)",
              lineHeight: 1.7,
            }}
          >
            Reach out to our event team — we're happy to help.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2rem",
            alignItems: "start",
          }}
          className="contact-grid"
        >
          {/* Coordinators */}
          <div className="reveal">
            <h3
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 700,
                fontSize: "1.0625rem",
                color: "#ffffff",
                marginBottom: "1.25rem",
              }}
            >
              Faculty Coordinators
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {eventConfig.coordinators.map((coord) => (
                <div
                  key={coord.email}
                  style={{
                    padding: "1.375rem 1.5rem",
                    background: "linear-gradient(135deg, rgba(14, 30, 72, 0.8) 0%, rgba(20, 45, 108, 0.55) 100%)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "var(--radius-xl)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    boxShadow: "0 8px 24px rgba(4, 11, 30, 0.4)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.875rem",
                      marginBottom: "0.875rem",
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, var(--color-accent) 0%, #d97706 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#050d24",
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 800,
                        fontSize: "1.0625rem",
                        flexShrink: 0,
                        boxShadow: "0 2px 10px rgba(245, 158, 11, 0.3)",
                      }}
                    >
                      {coord.name[0]}
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 700,
                          fontSize: "0.9375rem",
                          color: "#ffffff",
                        }}
                      >
                        {coord.name}
                      </div>
                      <div
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "0.8125rem",
                          color: "rgba(147, 197, 253, 0.8)",
                        }}
                      >
                        {coord.role}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <a
                      href={`tel:${coord.phone}`}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.625rem",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.875rem",
                        color: "#60a5fa",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.color = "#ffffff")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.color = "#60a5fa")
                      }
                    >
                      <Phone size={14} style={{ flexShrink: 0, color: "var(--color-accent)" }} />
                      {coord.phone}
                    </a>
                    <a
                      href={`mailto:${coord.email}`}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.625rem",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.875rem",
                        color: "rgba(226, 232, 240, 0.85)",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.color = "#ffffff")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.color = "rgba(226, 232, 240, 0.85)")
                      }
                    >
                      <Mail size={14} style={{ flexShrink: 0, color: "#60a5fa" }} />
                      {coord.email}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Student Coordinators */}
            <div
              style={{
                padding: "1.375rem 1.5rem",
                marginTop: "1rem",
                background: "linear-gradient(135deg, rgba(14, 30, 72, 0.8) 0%, rgba(20, 45, 108, 0.55) 100%)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "var(--radius-xl)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                boxShadow: "0 8px 24px rgba(4, 11, 30, 0.4)",
              }}
            >
              <p
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  color: "var(--color-accent)",
                  marginBottom: "0.875rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <Phone size={14} style={{ color: "var(--color-accent)" }} />
                Student Coordinators
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {eventConfig.studentCoordinators.map((sc) => (
                  <div
                    key={sc.phone}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "0.75rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "#ffffff",
                      }}
                    >
                      {sc.name}
                    </span>
                    <a
                      href={`tel:${sc.phone}`}
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        color: "#60a5fa",
                        textDecoration: "none",
                      }}
                    >
                      {sc.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* General Info */}
          <div className="reveal">
            <h3
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 700,
                fontSize: "1.0625rem",
                color: "#ffffff",
                marginBottom: "1.25rem",
              }}
            >
              General Contact
            </h3>

            <div
              style={{
                padding: "1.75rem",
                marginBottom: "1.25rem",
                background: "linear-gradient(135deg, rgba(14, 30, 72, 0.8) 0%, rgba(20, 45, 108, 0.55) 100%)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "var(--radius-xl)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                boxShadow: "0 8px 24px rgba(4, 11, 30, 0.4)",
              }}
            >
              {[
                {
                  icon: <MapPin size={18} />,
                  label: "Address",
                  value: eventConfig.address,
                  href: undefined,
                },
                {
                  icon: <Mail size={18} />,
                  label: "Email",
                  value: eventConfig.contactEmail,
                  href: `mailto:${eventConfig.contactEmail}`,
                },
                {
                  icon: <Phone size={18} />,
                  label: "Phone",
                  value: eventConfig.contactPhone,
                  href: `tel:${eventConfig.contactPhone}`,
                },
              ].map((row) => (
                <div
                  key={row.label}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.875rem",
                    marginBottom: "1.125rem",
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "var(--radius-sm)",
                      background: "rgba(245, 158, 11, 0.14)",
                      border: "1px solid rgba(245, 158, 11, 0.35)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--color-accent)",
                      flexShrink: 0,
                    }}
                  >
                    {row.icon}
                  </div>
                  <div>
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
                    {row.href ? (
                      <a
                        href={row.href}
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "0.9rem",
                          fontWeight: 500,
                          color: "#60a5fa",
                          textDecoration: "none",
                        }}
                      >
                        {row.value}
                      </a>
                    ) : (
                      <div
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "0.9rem",
                          fontWeight: 500,
                          color: "rgba(226, 232, 240, 0.85)",
                        }}
                      >
                        {row.value}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                flexWrap: "wrap",
              }}
            >
              {[
                {
                  href: eventConfig.social.instagram,
                  icon: <AtSign size={18} />,
                  label: "Instagram",
                  bg: "rgba(162, 28, 175, 0.2)",
                  color: "#e879f9",
                  border: "rgba(162, 28, 175, 0.4)",
                },
                {
                  href: eventConfig.social.linkedin,
                  icon: <Share2 size={18} />,
                  label: "LinkedIn",
                  bg: "rgba(29, 78, 216, 0.2)",
                  color: "#60a5fa",
                  border: "rgba(29, 78, 216, 0.4)",
                },
                {
                  href: eventConfig.social.website,
                  icon: <Globe size={18} />,
                  label: "Website",
                  bg: "rgba(21, 128, 61, 0.2)",
                  color: "#4ade80",
                  border: "rgba(21, 128, 61, 0.4)",
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    background: s.bg,
                    color: s.color,
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    padding: "0.5625rem 1.125rem",
                    borderRadius: "var(--radius-md)",
                    textDecoration: "none",
                    border: `1px solid ${s.border}`,
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 16px ${s.color}35`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  {s.icon}
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
