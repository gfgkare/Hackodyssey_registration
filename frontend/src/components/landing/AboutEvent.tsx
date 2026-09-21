import { useEffect, useRef } from "react";
import { BookOpen, Link2, Zap } from "lucide-react";

const pillars = [
  {
    icon: <BookOpen size={24} />,
    title: "Learn",
    description:
      "Gain real-world problem-solving experience across 6 UN SDG tracks guided by experienced mentors and industry veterans.",
    accent: "#60a5fa",
    iconBg: "rgba(96, 165, 250, 0.18)",
  },
  {
    icon: <Link2 size={24} />,
    title: "Connect",
    description:
      "Collaborate with over 5 premier student communities and connect with ambitious student developers from colleges across India.",
    accent: "#fbbf24",
    iconBg: "rgba(251, 191, 36, 0.18)",
  },
  {
    icon: <Zap size={24} />,
    title: "Compete",
    description:
      "Push your limits in an intense 24-hour hackathon, present to expert judges, and compete for a prize pool of up to ₹1,00,000.",
    accent: "#4ade80",
    iconBg: "rgba(74, 222, 128, 0.18)",
  },
];

export default function AboutEvent() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 120);
            });
          }
        });
      },
      { threshold: 0.12 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
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
            About the Event
          </span>
          <h2
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.875rem, 4vw, 2.75rem)",
              color: "#ffffff",
              marginBottom: "1.25rem",
              letterSpacing: "-0.02em",
            }}
          >
            About Hack Odyssey 4.0
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "1.0625rem",
              color: "rgba(255, 255, 255, 0.78)",
              maxWidth: 720,
              margin: "0 auto",
              lineHeight: 1.8,
            }}
          >
            Kalasalingam University proudly presents{" "}
            <strong style={{ color: "#ffffff", fontWeight: 700 }}>
              Hack Odyssey 4.0
            </strong>
            , an offline 24-hour hackathon jointly organized by five vibrant student
            bodies — KARE ACM, KARE ACM-W, Google Developer Groups, KARE IEEE, and
            Campus Body KARE. Compete on UN SDG-focused problem statements with a prize
            pool of up to{" "}
            <strong style={{ color: "#fbbf24", fontWeight: 700 }}>
              ₹1,00,000
            </strong>
            .
          </p>
        </div>

        {/* Stats Strip */}
        <div
          className="reveal"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "1.25rem",
            background: "rgba(255, 255, 255, 0.06)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderRadius: "var(--radius-2xl)",
            padding: "2rem 2.5rem",
            marginBottom: "3.5rem",
            boxShadow: "0 12px 36px rgba(0, 0, 0, 0.25)",
          }}
        >
          {[
            { value: "5", label: "Student Clubs", color: "#60a5fa" },
            { value: "24h", label: "Offline Duration", color: "#fbbf24" },
            { value: "6", label: "UN SDG Tracks", color: "#34d399" },
            { value: "₹1 Lakh", label: "Prize Pool", color: "#f87171" },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 800,
                  fontSize: "2.25rem",
                  color: stat.color,
                  lineHeight: 1.1,
                  marginBottom: "0.35rem",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "rgba(255, 255, 255, 0.75)",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Pillars */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {pillars.map((p, i) => (
            <div
              key={p.title}
              className="reveal"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(8px)",
                  borderRadius: "var(--radius-xl)",
                  padding: "2rem",
                  height: "100%",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
                  transition: "all 0.25s ease",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(255, 255, 255, 0.09)";
                  (e.currentTarget as HTMLElement).style.borderColor = p.accent;
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 12px 32px rgba(0, 0, 0, 0.3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(255, 255, 255, 0.05)";
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(255, 255, 255, 0.1)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 8px 24px rgba(0, 0, 0, 0.15)";
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "var(--radius-md)",
                    background: p.iconBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: p.accent,
                    marginBottom: "1.25rem",
                  }}
                >
                  {p.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 700,
                    fontSize: "1.25rem",
                    color: "#ffffff",
                    marginBottom: "0.625rem",
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.9375rem",
                    color: "rgba(255, 255, 255, 0.72)",
                    lineHeight: 1.7,
                  }}
                >
                  {p.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
