import { useEffect, useRef, useState } from "react";
import { Calendar, MapPin, Users, Award, ChevronDown, ArrowRight } from "lucide-react";
import { eventConfig } from "../../config/eventConfig";

interface HeroProps {
  onRegisterClick?: () => void;
}

export default function Hero({ onRegisterClick }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(id);
  }, []);

  function scrollToRegister() {
    if (onRegisterClick) { onRegisterClick(); return; }
    const el = document.getElementById("register");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }

  function scrollToAbout() {
    const el = document.getElementById("about");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }

  const infoCards = [
    { icon: <Calendar size={18} />, label: "Date", value: eventConfig.eventDate },
    { icon: <MapPin size={18} />, label: "Venue", value: "Kalasalingam University" },
    { icon: <Users size={18} />, label: "Teams", value: eventConfig.teamSize },
    { icon: <Award size={18} />, label: "Registration Fee", value: "₹300 / Member" },
  ];

  return (
    <section
      id="home"
      ref={heroRef}
      style={{
        minHeight: "100vh",
        background: `
          linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
          linear-gradient(175deg, #070e22 0%, #0d1a45 50%, #070e22 100%)
        `,
        backgroundSize: `48px 48px, 48px 48px, 100% 100%`,
        backgroundPosition: `0 0, 0 0, 0 0`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "7.5rem 1.5rem 4.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Soft Depth */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "100%",
          background: "radial-gradient(ellipse at 50% 30%, rgba(30, 58, 138, 0.22) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 820,
          width: "100%",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      >
        {/* Euphoria 2026 Logo Badge — Tinted periwinkle gradient instead of stark white */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1.75rem",
            background: "linear-gradient(135deg, #c5d7fc 0%, #dae6ff 50%, #c2d6fb 100%)",
            padding: "0.625rem 1.75rem",
            borderRadius: "var(--radius-xl)",
            boxShadow: "0 10px 30px rgba(9, 23, 61, 0.45), 0 0 24px rgba(59, 130, 246, 0.3)",
            border: "1.5px solid rgba(59, 130, 246, 0.55)",
          }}
        >
          <img
            src="/euphoria.png"
            alt="Euphoria 2026"
            style={{
              height: 64,
              width: "auto",
              objectFit: "contain",
              display: "block",
            }}
          />
        </div>

        {/* Badges row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.625rem",
            marginBottom: "1.75rem",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              background: "rgba(34,197,94,0.18)",
              border: "1px solid rgba(34,197,94,0.35)",
              color: "#4ade80",
              fontFamily: "Inter, sans-serif",
              fontSize: "0.6875rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "0.3125rem 0.875rem",
              borderRadius: 999,
              display: "inline-flex",
              alignItems: "center",
              gap: "0.375rem",
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
              className="animate-pulse-soft"
            />
            Registrations Open
          </span>

          <span
            style={{
              background: "rgba(245,158,11,0.15)",
              border: "1px solid rgba(245,158,11,0.3)",
              color: "var(--color-accent)",
              fontFamily: "Inter, sans-serif",
              fontSize: "0.6875rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "0.3125rem 0.875rem",
              borderRadius: 999,
            }}
          >
            Open to External Participants
          </span>
        </div>

        {/* Event name */}
        <h1
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 900,
            fontSize: "clamp(2.75rem, 8vw, 5rem)",
            color: "#ffffff",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            marginBottom: "0.75rem",
          }}
        >
          {eventConfig.eventName}
        </h1>

        {/* Year accent */}
        <div
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
            fontWeight: 500,
            color: "var(--color-accent)",
            letterSpacing: "0.04em",
            marginBottom: "1.25rem",
          }}
        >
          {eventConfig.eventTagline} · {eventConfig.eventEdition}
        </div>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(1rem, 2vw, 1.125rem)",
            fontWeight: 400,
            color: "rgba(226, 232, 240, 0.85)",
            maxWidth: 580,
            margin: "0 auto 2.5rem",
            lineHeight: 1.7,
          }}
        >
          {eventConfig.eventSubtitle}
        </p>

        {/* CTA buttons */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            flexWrap: "wrap",
            marginBottom: "3rem",
          }}
        >
          <button
            onClick={scrollToRegister}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "var(--color-accent)",
              color: "#fff",
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: "1rem",
              padding: "0.875rem 2rem",
              borderRadius: "var(--radius-lg)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: "0 4px 20px rgba(245,158,11,0.4)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 8px 28px rgba(245,158,11,0.55)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 4px 20px rgba(245,158,11,0.4)";
            }}
          >
            Register Now
            <ArrowRight size={18} />
          </button>
          <button
            onClick={scrollToAbout}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(245, 158, 11, 0.12)",
              color: "var(--color-accent)",
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: "0.9375rem",
              padding: "0.8125rem 1.75rem",
              borderRadius: "var(--radius-lg)",
              border: "1.5px solid rgba(245, 158, 11, 0.7)",
              cursor: "pointer",
              transition: "all 0.2s ease",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(245, 158, 11, 0.22)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
              (e.currentTarget as HTMLElement).style.borderColor = "var(--color-accent)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(245, 158, 11, 0.12)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(245, 158, 11, 0.7)";
            }}
          >
            Explore Event
          </button>
        </div>

        {/* Info cards — No registration countdown time, rich cyber glassmorphism */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "0.875rem",
            maxWidth: 760,
            margin: "0 auto",
            width: "100%",
          }}
        >
          {infoCards.map((card) => (
            <div
              key={card.label}
              style={{
                background: "linear-gradient(135deg, rgba(14, 30, 72, 0.85) 0%, rgba(20, 45, 108, 0.7) 100%)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: "var(--radius-lg)",
                padding: "0.875rem 1.125rem",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                textAlign: "left",
                boxShadow: "0 8px 24px rgba(6, 17, 44, 0.35)",
                transition: "transform 0.2s ease, border-color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--color-accent)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255, 255, 255, 0.12)";
              }}
            >
              <div
                style={{
                  color: "var(--color-accent)",
                  flexShrink: 0,
                  background: "rgba(245, 158, 11, 0.15)",
                  padding: "0.5rem",
                  borderRadius: "var(--radius-md)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {card.icon}
              </div>
              <div>
                <div
                  style={{
                    fontSize: "0.6875rem",
                    fontWeight: 600,
                    letterSpacing: "0.07em",
                    textTransform: "uppercase",
                    color: "rgba(147, 197, 253, 0.75)",
                    marginBottom: "0.125rem",
                  }}
                >
                  {card.label}
                </div>
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "#ffffff",
                    lineHeight: 1.3,
                  }}
                >
                  {card.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToAbout}
        style={{
          position: "absolute",
          bottom: "1.75rem",
          left: "50%",
          transform: "translateX(-50%)",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "rgba(147, 197, 253, 0.6)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.25rem",
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLElement).style.color = "var(--color-accent)")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLElement).style.color = "rgba(147, 197, 253, 0.6)")
        }
        aria-label="Scroll down"
      >
        <span style={{ fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.12em" }}>
          SCROLL
        </span>
        <ChevronDown size={18} className="animate-float" style={{ animationDuration: "2s" }} />
      </button>
    </section>
  );
}
