import { motion } from "framer-motion";

const clubs = [
  { name: "GFG KARE", src: "/logos/gfg-kare.jpg", alt: "GeeksForGeeks KARE Chapter" },
  { name: "GDG KARE", src: "/logos/gdg-kare.jpg", alt: "Google Developer Group On Campus KARE" },
  { name: "KARE ACM", src: "/logos/kare-acm.jpg", alt: "KARE ACM Student Chapter" },
  { name: "KARE W-ACM", src: "/logos/kare-acmw.jpg", alt: "KARE ACM-W Chapter" },
];

// Doubled for seamless infinite loop
const marqueeItems = [...clubs, ...clubs];

export default function SponsorsSection() {
  return (
    <section className="py-20 px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="mb-3 inline-block rounded-full border border-slate-600/40 bg-slate-800/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-slate-400">
            Sponsors &amp; Partners
          </span>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            Backed by the Best
          </h2>
        </motion.div>

        {/* ── Title Sponsor: CodeChef ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55 }}
          className="mb-14 flex flex-col items-center"
        >
          <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-slate-500">
            Title Sponsor
          </p>

          <div
            className="hack-surface flex items-center gap-5 px-10 py-7 rounded-2xl"
            style={{ border: "1px solid rgba(251,146,60,0.25)" }}
          >
            {/* CodeChef logo mark — styled SVG */}
            <svg
              viewBox="0 0 48 48"
              className="h-14 w-14 flex-shrink-0"
              fill="none"
              aria-hidden="true"
            >
              <rect width="48" height="48" rx="10" fill="#f97316" />
              <text
                x="50%"
                y="55%"
                dominantBaseline="middle"
                textAnchor="middle"
                fill="white"
                fontSize="22"
                fontWeight="900"
                fontFamily="ui-sans-serif,system-ui,sans-serif"
              >
                CC
              </text>
            </svg>

            <div>
              <p className="text-2xl font-extrabold text-white tracking-tight">
                CodeChef
              </p>
              <p className="text-sm text-orange-400/80 font-medium">
                Empowering competitive programmers
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── Collaborating Clubs Marquee ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-slate-500">
            Collaborating Clubs
          </p>

          {/* Overflow clip + fade masks */}
          <div
            className="relative overflow-hidden rounded-2xl"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
            }}
          >
            <div className="flex animate-marquee gap-10 py-4" style={{ width: "max-content" }}>
              {marqueeItems.map((club, index) => (
                <div
                  key={`${club.name}-${index}`}
                  className="flex flex-shrink-0 flex-col items-center gap-3"
                >
                  <div className="hack-surface flex h-24 w-24 items-center justify-center rounded-2xl p-3 sm:h-28 sm:w-28">
                    <img
                      src={club.src}
                      alt={club.alt}
                      className="h-full w-full object-contain"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = "none";
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `<span class="text-xs font-bold text-slate-300 text-center leading-tight">${club.name}</span>`;
                        }
                      }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-slate-400">{club.name}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
