import { useState, useEffect } from "react";
import { Menu, X, ExternalLink } from "lucide-react";
import { eventConfig } from "../../config/eventConfig";

interface NavbarProps {
  onRegisterClick?: () => void;
}

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Clubs", href: "#clubs" },
  { label: "Event Details", href: "#details" },
  { label: "Register", href: "#register" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ onRegisterClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 20);

      // Active section detection
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(id);
            break;
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleNavClick(href: string) {
    setIsOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      const offset = 72;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: isScrolled
            ? "rgba(5, 13, 36, 0.94)"
            : "rgba(5, 13, 36, 0.82)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          transition: "all 0.3s ease",
          boxShadow: isScrolled
            ? "0 4px 24px rgba(0, 0, 0, 0.45)"
            : "none",
        }}
      >
        <div
          style={{
            maxWidth: 1240,
            margin: "0 auto",
            padding: "0 1.5rem",
            height: 76,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <button
            onClick={() => handleNavClick("#home")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.875rem",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px 0",
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
                alt="Kalasalingam Academy of Research and Education"
                className="navbar-kare-logo"
                style={{
                  height: 48,
                  width: "auto",
                  objectFit: "contain",
                  borderRadius: "var(--radius-xs, 4px)",
                  flexShrink: 0,
                  display: "block",
                }}
              />
            </div>
            <div style={{ textAlign: "left" }} className="navbar-title-block">
              <div
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 700,
                  fontSize: "1.05rem",
                  color: "#ffffff",
                  lineHeight: 1.15,
                  letterSpacing: "-0.01em",
                }}
              >
                {eventConfig.eventName}
              </div>
              <div
                style={{
                  fontSize: "0.725rem",
                  fontWeight: 600,
                  color: "rgba(147, 197, 253, 0.8)",
                  letterSpacing: "0.03em",
                }}
              >
                Kalasalingam University
              </div>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
            }}
            className="hidden-mobile"
          >
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                style={{
                  background:
                    activeSection === link.href.replace("#", "")
                      ? "rgba(245, 158, 11, 0.14)"
                      : "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color:
                    activeSection === link.href.replace("#", "")
                      ? "var(--color-accent)"
                      : "rgba(203, 213, 225, 0.85)",
                  padding: "0.4375rem 0.8125rem",
                  borderRadius: "var(--radius-md)",
                  transition: "all 0.2s ease",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== link.href.replace("#", "")) {
                    (e.target as HTMLElement).style.color = "#ffffff";
                    (e.target as HTMLElement).style.background = "rgba(255, 255, 255, 0.08)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== link.href.replace("#", "")) {
                    (e.target as HTMLElement).style.color = "rgba(203, 213, 225, 0.85)";
                    (e.target as HTMLElement).style.background = "transparent";
                  }
                }}
              >
                {link.label}
              </button>
            ))}

            <button
              onClick={onRegisterClick ?? (() => handleNavClick("#register"))}
              className="btn-accent"
              style={{
                marginLeft: "0.75rem",
                padding: "0.5625rem 1.25rem",
                boxShadow: "0 4px 16px rgba(245, 158, 11, 0.35)",
              }}
            >
              Register Now
              <ExternalLink size={14} />
            </button>
          </nav>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen((o) => !o)}
            style={{
              display: "none",
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              cursor: "pointer",
              padding: "0.5rem",
              color: "#ffffff",
              borderRadius: "var(--radius-md)",
            }}
            aria-label="Toggle menu"
            className="show-mobile"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {isOpen && (
          <div
            className="animate-slide-down"
            style={{
              background: "rgba(5, 13, 36, 0.98)",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              padding: "1rem 1.5rem 1.5rem",
            }}
          >
            <nav style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  style={{
                    background:
                      activeSection === link.href.replace("#", "")
                        ? "rgba(245, 158, 11, 0.15)"
                        : "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.9375rem",
                    fontWeight: 500,
                    color:
                      activeSection === link.href.replace("#", "")
                        ? "var(--color-accent)"
                        : "rgba(226, 232, 240, 0.85)",
                    padding: "0.75rem 1rem",
                    borderRadius: "var(--radius-md)",
                    textAlign: "left",
                    width: "100%",
                  }}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={onRegisterClick ?? (() => handleNavClick("#register"))}
                className="btn-accent"
                style={{ marginTop: "0.75rem", justifyContent: "center", width: "100%" }}
              >
                Register Now
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
          .navbar-kare-logo { height: 44px !important; }
        }
        @media (max-width: 520px) {
          .navbar-kare-logo { height: 40px !important; }
          .navbar-title-block { display: none !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
          .hidden-mobile { display: flex !important; }
        }
      `}</style>
    </>
  );
}
