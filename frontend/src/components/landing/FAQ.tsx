import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { eventConfig } from "../../config/eventConfig";

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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

  function toggle(i: number) {
    setOpenIndex((prev) => (prev === i ? null : i));
  }

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="section"
      style={{
        background: "linear-gradient(180deg, #070e22 0%, #0a163a 50%, #070e22 100%)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        position: "relative",
        overflow: "hidden",
      }}
    >

      <div
        style={{
          maxWidth: 780,
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Header */}
        <div
          style={{ textAlign: "center", marginBottom: "3rem" }}
          className="reveal"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "0.875rem",
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "var(--radius-md)",
                background: "rgba(255, 255, 255, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fbbf24",
              }}
            >
              <HelpCircle size={26} />
            </div>
          </div>
          <span
            className="section-label"
            style={{ color: "#fbbf24", letterSpacing: "0.14em" }}
          >
            FAQ
          </span>
          <h2
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.875rem, 4vw, 2.5rem)",
              color: "#ffffff",
              marginBottom: "0.875rem",
              letterSpacing: "-0.02em",
            }}
          >
            Frequently Asked Questions
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "1rem",
              color: "rgba(255, 255, 255, 0.75)",
              lineHeight: 1.7,
            }}
          >
            Got questions about registration, eligibility, or rules? Find your answers below.
          </p>
        </div>

        {/* Accordion */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}
        >
          {eventConfig.faq.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="reveal"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div
                  style={{
                    background: isOpen
                      ? "rgba(255, 255, 255, 0.09)"
                      : "rgba(255, 255, 255, 0.05)",
                    border: `1.5px solid ${isOpen ? "rgba(251, 191, 36, 0.5)" : "rgba(255, 255, 255, 0.1)"}`,
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    borderRadius: "var(--radius-lg)",
                    overflow: "hidden",
                    transition: "all 0.25s ease",
                    boxShadow: isOpen
                      ? "0 6px 20px rgba(0, 0, 0, 0.25)"
                      : "none",
                  }}
                >
                  {/* Question */}
                  <button
                    onClick={() => toggle(i)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "1rem",
                      padding: "1.125rem 1.5rem",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                    aria-expanded={isOpen}
                  >
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 600,
                        fontSize: "0.9375rem",
                        color: isOpen ? "#fbbf24" : "#ffffff",
                        lineHeight: 1.5,
                        transition: "color 0.2s",
                      }}
                    >
                      {item.question}
                    </span>
                    <span
                      style={{
                        color: isOpen ? "#fbbf24" : "rgba(255, 255, 255, 0.6)",
                        flexShrink: 0,
                        transition: "color 0.2s",
                      }}
                    >
                      {isOpen ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}
                    </span>
                  </button>

                  {/* Answer */}
                  {isOpen && (
                    <div
                      className="animate-slide-down"
                      style={{
                        padding: "0 1.5rem 1.25rem",
                        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                        paddingTop: "1rem",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "0.9375rem",
                          color: "rgba(255, 255, 255, 0.78)",
                          lineHeight: 1.75,
                        }}
                      >
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
