import { useEffect, useRef } from "react";
import { Globe, Handshake, Trophy, GraduationCap } from "lucide-react";

const features = [
  {
    icon: <Globe size={22} />,
    title: "Open to External Participants",
    description:
      "Students from any recognized college or institution across India can register and participate.",
    badgeColor: "#0f2557",
  },
  {
    icon: <Handshake size={22} />,
    title: "Networking Opportunities",
    description:
      "Connect with passionate developers, mentors, industry experts, and peers from across the country.",
    badgeColor: "#1a3a8f",
  },
  {
    icon: <Trophy size={22} />,
    title: "SDG-Aligned Challenges",
    description:
      "Compete across 6 United Nations SDG themes with a total prize pool of up to ₹1,00,000.",
    badgeColor: "#d97706",
  },
  {
    icon: <GraduationCap size={22} />,
    title: "Premier University Experience",
    description:
      "24 hours of non-stop hacking at Central Library, Kalasalingam University.",
    badgeColor: "#16a34a",
  },
];

export default function OpenToAll() {
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
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "linear-gradient(180deg, #070e22 0%, #0a163a 50%, #070e22 100%)",
        padding: "5rem 1.5rem",
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
            Who Can Join?
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
            Open to All College Students Across India
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "1.0625rem",
              color: "rgba(226, 232, 240, 0.8)",
              maxWidth: 580,
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Hack Odyssey 4.0 warmly invites external student innovators to collaborate,
            compete, and build impactful solutions at Kalasalingam University.
          </p>
        </div>

        {/* Feature Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {features.map((feat, i) => (
            <div
              key={feat.title}
              className="reveal"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div
                style={{
                  background: "linear-gradient(135deg, rgba(14, 30, 72, 0.75) 0%, rgba(20, 45, 108, 0.5) 100%)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "var(--radius-xl)",
                  padding: "1.75rem",
                  height: "100%",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  boxShadow: "0 8px 24px rgba(4, 11, 30, 0.4)",
                  transition: "all 0.25s ease",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "linear-gradient(135deg, rgba(18, 38, 92, 0.85) 0%, rgba(26, 58, 140, 0.65) 100%)";
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--color-accent)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 12px 32px rgba(0, 0, 0, 0.35)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "linear-gradient(135deg, rgba(14, 30, 72, 0.75) 0%, rgba(20, 45, 108, 0.5) 100%)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255, 255, 255, 0.1)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(4, 11, 30, 0.4)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "var(--radius-md)",
                    background: "rgba(245, 158, 11, 0.14)",
                    border: "1px solid rgba(245, 158, 11, 0.35)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--color-accent)",
                    marginBottom: "1.125rem",
                  }}
                >
                  {feat.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 700,
                    fontSize: "1.0625rem",
                    color: "#ffffff",
                    marginBottom: "0.5rem",
                  }}
                >
                  {feat.title}
                </h3>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.9rem",
                    color: "rgba(203, 213, 225, 0.8)",
                    lineHeight: 1.65,
                  }}
                >
                  {feat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
