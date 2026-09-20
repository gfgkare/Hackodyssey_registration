import { motion, useAnimation, type Variants } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.22,
    },
  },
};

const headline: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeLine: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55 },
  },
};

const buttonVariant: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: 0.1 },
  },
};

export default function HeroSection() {
  const navigate = useNavigate();
  const controls = useAnimation();

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Grid overlay */}
      <div className="absolute inset-0 hero-grid-bg pointer-events-none" />

      {/* Radial glow blobs */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 20% 20%, rgba(37, 99, 235, 0.22) 0%, transparent 70%),
            radial-gradient(ellipse 50% 40% at 80% 15%, rgba(124, 58, 237, 0.18) 0%, transparent 65%)
          `,
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6 py-20"
        variants={container}
        initial="hidden"
        animate={controls}
      >
        {/* Eyebrow badge */}
        <motion.div variants={fadeLine} className="mb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-300 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
            Registration is LIVE
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          variants={headline}
          className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight hack-gradient-text leading-none mb-4"
        >
          Hack Odyssey 4.0
        </motion.h1>

        {/* Prize pool */}
        <motion.p
          variants={fadeLine}
          className="mt-4 text-2xl sm:text-3xl font-bold text-amber-400 drop-shadow"
        >
          Up to ₹1 Lakh Prize Pool
        </motion.p>

        {/* Date */}
        <motion.p
          variants={fadeLine}
          className="mt-3 text-lg sm:text-xl font-medium text-slate-300"
        >
          September 25 &amp; 26
        </motion.p>

        {/* CTA Button */}
        <motion.div variants={buttonVariant} className="mt-10">
          <button
            onClick={() => navigate("/register")}
            className="animate-pulse-glow relative inline-flex items-center gap-2 rounded-2xl px-10 py-4 text-lg font-bold text-white transition-transform hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            style={{
              background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
              border: "1px solid rgba(255,255,255,0.15)",
              backdropFilter: "blur(12px)",
            }}
          >
            Register Now
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </motion.div>

        {/* Scroll hint */}
        <motion.p
          variants={fadeLine}
          className="mt-16 text-xs text-slate-500 tracking-widest uppercase"
        >
          Scroll to explore ↓
        </motion.p>
      </motion.div>
    </section>
  );
}
