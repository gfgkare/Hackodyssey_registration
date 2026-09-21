import { eventConfig } from "../../config/eventConfig";

const footerLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Clubs", href: "#clubs" },
  { label: "Event Details", href: "#details" },
  { label: "Register", href: "#register" },
  { label: "Contact", href: "#contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms & Conditions", href: "#" },
];

function handleNavClick(href: string) {
  if (href === "#") return;
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export default function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(180deg, #070e22 0%, #030816 100%)",
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
        color: "rgba(226, 232, 240, 0.75)",
        padding: "3.5rem 1.5rem 2rem",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Top row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "3rem",
            marginBottom: "3rem",
            flexWrap: "wrap",
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  background: "rgba(255,255,255,0.12)",
                  borderRadius: "var(--radius-md)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 800,
                  fontSize: "1rem",
                  color: "#ffffff",
                }}
              >
                HO
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: "#fff",
                  }}
                >
                  {eventConfig.eventName}
                </div>
                <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.45)" }}>
                  Kalasalingam University
                </div>
              </div>
            </div>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.875rem",
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.55)",
              }}
            >
              Powered by the collaborative efforts of five student clubs at
              Kalasalingam University.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 700,
                fontSize: "0.875rem",
                color: "#fff",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: "1.125rem",
              }}
            >
              Quick Links
            </h4>
            <nav style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {footerLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.875rem",
                    color: "rgba(255,255,255,0.55)",
                    padding: 0,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.9)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.55)")
                  }
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact summary */}
          <div>
            <h4
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 700,
                fontSize: "0.875rem",
                color: "#fff",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: "1.125rem",
              }}
            >
              Contact
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {[
                { label: eventConfig.address },
                { label: eventConfig.contactEmail, href: `mailto:${eventConfig.contactEmail}` },
                { label: eventConfig.contactPhone, href: `tel:${eventConfig.contactPhone}` },
              ].map((item, i) =>
                item.href ? (
                  <a
                    key={i}
                    href={item.href}
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.875rem",
                      color: "rgba(255,255,255,0.55)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.color =
                        "rgba(255,255,255,0.9)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.color =
                        "rgba(255,255,255,0.55)")
                    }
                  >
                    {item.label}
                  </a>
                ) : (
                  <span
                    key={i}
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.875rem",
                      color: "rgba(255,255,255,0.55)",
                      lineHeight: 1.55,
                    }}
                  >
                    {item.label}
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: "rgba(255,255,255,0.1)",
            marginBottom: "1.5rem",
          }}
        />

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.75rem",
          }}
        >
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "0.8125rem",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            © {new Date().getFullYear()} Kalasalingam University. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.8125rem",
                  color: "rgba(255,255,255,0.4)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    "rgba(255,255,255,0.8)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    "rgba(255,255,255,0.4)")
                }
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </footer>
  );
}
