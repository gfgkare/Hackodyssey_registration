import { useEffect, useRef } from "react";
import { eventConfig } from "../../config/eventConfig";

export default function CollaboratingClubs() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 110);
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
      id="clubs"
      ref={sectionRef}
      className="section"
      style={{
        background: "linear-gradient(180deg, #070e22 0%, #0a163a 50%, #070e22 100%)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
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
            Organizers
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
            Powered by Five Clubs
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
            A collaborative initiative by the student communities of
            Kalasalingam University.
          </p>
        </div>

        {/* Club Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {eventConfig.clubs.map((club, i) => (
            <div
              key={club.id}
              className="reveal"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div
                style={{
                  background: "linear-gradient(135deg, rgba(14, 30, 72, 0.8) 0%, rgba(20, 45, 108, 0.55) 100%)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "var(--radius-xl)",
                  padding: "1.75rem 1.5rem",
                  textAlign: "center",
                  height: "100%",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  boxShadow: "0 8px 24px rgba(4, 11, 30, 0.4)",
                  transition: "all 0.25s ease",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "linear-gradient(135deg, rgba(18, 38, 92, 0.9) 0%, rgba(26, 58, 140, 0.7) 100%)";
                  (e.currentTarget as HTMLElement).style.borderColor = club.color;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 32px ${club.color}35`;
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "linear-gradient(135deg, rgba(14, 30, 72, 0.8) 0%, rgba(20, 45, 108, 0.55) 100%)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255, 255, 255, 0.1)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(4, 11, 30, 0.4)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                {/* Club Logo / Fallback Initials Badge */}
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: "var(--radius-xl)",
                    background: "linear-gradient(135deg, #cde0ff 0%, #dfe9ff 50%, #c4d7fc 100%)",
                    border: `2px solid ${club.color}80`,
                    boxShadow: `0 4px 16px rgba(0, 0, 0, 0.3), 0 0 12px ${club.color}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.25rem",
                    padding: "0.5rem",
                    overflow: "hidden",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                >
                  {"logo" in club && club.logo ? (
                    <img
                      src={club.logo}
                      alt={`${club.name} logo`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        borderRadius: "calc(var(--radius-xl) - 4px)",
                      }}
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = "none";
                        const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <span
                    style={{
                      display: ("logo" in club && club.logo) ? "none" : "flex",
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 800,
                      fontSize:
                        club.initials.length > 3 ? "0.75rem" : "1.0625rem",
                      color: club.color,
                      letterSpacing: "-0.02em",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    {club.initials}
                  </span>
                </div>

                {/* Club name */}
                <h3
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 700,
                    fontSize: "0.9375rem",
                    color: "#ffffff",
                    marginBottom: "0.5rem",
                    lineHeight: 1.3,
                  }}
                >
                  {club.name}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.8125rem",
                    color: "rgba(203, 213, 225, 0.75)",
                    lineHeight: 1.65,
                  }}
                >
                  {club.description}
                </p>

                {/* Colored bottom accent */}
                <div
                  style={{
                    height: 3,
                    borderRadius: 999,
                    background: club.color,
                    marginTop: "1.25rem",
                    opacity: 0.8,
                    boxShadow: `0 0 8px ${club.color}`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Powered-by label */}
        <p
          className="reveal"
          style={{
            textAlign: "center",
            marginTop: "2.5rem",
            fontFamily: "Inter, sans-serif",
            fontSize: "0.875rem",
            color: "rgba(147, 197, 253, 0.75)",
          }}
        >
          Equal collaboration · Unified vision · Five distinct strengths
        </p>
      </div>
    </section>
  );
}
