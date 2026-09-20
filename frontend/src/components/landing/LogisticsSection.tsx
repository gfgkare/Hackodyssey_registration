import { motion, type Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function LogisticsSection() {
  return (
    <section className="py-20 px-6">
      <div className="mx-auto max-w-5xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="mb-10 text-center text-3xl font-bold hack-gradient-text">
            Team Rules
          </h2>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Hero bento card — team size */}
          <div className="hack-surface col-span-full lg:col-span-2 flex flex-col justify-between gap-6 p-8">
            <div>
              <span className="mb-3 inline-block rounded-lg bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue-400">
                Team Composition
              </span>
              <h3 className="text-2xl font-extrabold text-white sm:text-3xl">
                Teams of{" "}
                <span className="hack-gradient-text">4 to 5 Members</span>
              </h3>
              <p className="mt-3 text-slate-400 leading-relaxed">
                Every team must have a minimum of <strong className="text-white">4</strong> and
                a maximum of <strong className="text-white">5</strong> members. Assemble your
                squad — diverse skills win hackathons.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="flex items-center gap-2 rounded-full border border-green-500/25 bg-green-500/10 px-4 py-2 text-sm font-medium text-green-300">
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                </svg>
                Minimum 4 Members
              </span>
              <span className="flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-300">
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                  <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm0-2a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm-.75-9.25a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-1.5 0v-3.5Zm.75 6.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                </svg>
                Maximum 5 Members
              </span>
            </div>
          </div>

          {/* Stat card — dates */}
          <div className="hack-surface flex flex-col items-center justify-center gap-3 p-8 text-center">
            <span className="text-4xl">📅</span>
            <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">
              Event Dates
            </p>
            <p className="text-2xl font-bold text-white">Sept 25 &amp; 26</p>
          </div>

          {/* Stat card — prize */}
          <div className="hack-surface flex flex-col items-center justify-center gap-3 p-8 text-center">
            <span className="text-4xl">🏆</span>
            <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">
              Prize Pool
            </p>
            <p className="text-2xl font-bold text-amber-400">Up to ₹1 Lakh</p>
          </div>

          {/* Stat card — tracks */}
          <div className="hack-surface flex flex-col items-center justify-center gap-3 p-8 text-center">
            <span className="text-4xl">🌍</span>
            <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">
              SDG Tracks
            </p>
            <p className="text-2xl font-bold text-white">6 Global Tracks</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
