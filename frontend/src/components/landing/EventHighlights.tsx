import { useEffect, useRef } from "react";
import {
  Code2,
  Presentation,
  Trophy,
  Users,
  Lightbulb,
  Star,
} from "lucide-react";
import { eventConfig } from "../../config/eventConfig";

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 size={26} />,
  Presentation: <Presentation size={26} />,
  Trophy: <Trophy size={26} />,
  Users: <Users size={26} />,
  Lightbulb: <Lightbulb size={26} />,
  Star: <Star size={26} />,
};

const cardAccents = [
  { iconColor: "#60a5fa", bg: "rgba(96, 165, 250, 0.15)" },
  { iconColor: "#fbbf24", bg: "rgba(251, 191, 36, 0.15)" },
  { iconColor: "#34d399", bg: "rgba(52, 211, 153, 0.15)" },
  { iconColor: "#f59e0b", bg: "rgba(245, 158, 11, 0.15)" },
  { iconColor: "#f87171", bg: "rgba(248, 113, 113, 0.15)" },
  { iconColor: "#3b82f6", bg: "rgba(59, 130, 246, 0.15)" },
];

export default function EventHighlights() {
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
      ref={sectionRef}
      className="section"
      style={{
        background: "linear-gradient(180deg, #070e22 0%, #0a163a 50%, #070e22 100%)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        position: "relative",
        overflow: "hidden",
      }}
    >

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Header */}
        <div
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
          className="reveal"
        >
          <span
            className="section-label"
            style={{ color: "#fbbf24", letterSpacing: "0.14em" }}
          >
            Highlights
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
            What to Expect
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "1.0625rem",
              color: "rgba(255, 255, 255, 0.75)",
              maxWidth: 540,
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            24 intense hours packed with innovation, mentoring, peer learning, and
            unforgettable experiences at Kalasalingam University.
          </p>
        </div>

        {/* Highlight Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {eventConfig.highlights.map((item, i) => {
            const accent = cardAccents[i % cardAccents.length];
            return (
              <div
                key={item.title}
                className="reveal"
                style={{ animationDelay: `${i * 90}ms` }}
              >
                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    borderRadius: "var(--radius-xl)",
                    padding: "1.75rem",
                    height: "100%",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "1.125rem",
                    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
                    transition: "all 0.25s ease",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(255, 255, 255, 0.09)";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      accent.iconColor;
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateY(-3px)";
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 12px 30px rgba(0, 0, 0, 0.35)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(255, 255, 255, 0.05)";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(255, 255, 255, 0.1)";
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 6px 20px rgba(0, 0, 0, 0.2)";
                  }}
                >
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: "var(--radius-md)",
                      background: accent.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: accent.iconColor,
                      flexShrink: 0,
                    }}
                  >
                    {iconMap[item.icon] ?? <Star size={26} />}
                  </div>
                  <div>
                    <h3
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 700,
                        fontSize: "1.0625rem",
                        color: "#ffffff",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.9rem",
                        color: "rgba(255, 255, 255, 0.7)",
                        lineHeight: 1.65,
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
