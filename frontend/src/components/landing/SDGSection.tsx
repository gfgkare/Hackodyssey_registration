import { motion, type Variants } from "framer-motion";

interface SDGTrack {
  id: number;
  sdgNumber: number;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  emoji: string;
}

const tracks: SDGTrack[] = [
  {
    id: 1,
    sdgNumber: 2,
    title: "Zero Hunger &",
    subtitle: "Sustainable Agriculture",
    description:
      "Build solutions that fight food insecurity, reduce waste, and empower farmers with technology.",
    color: "#DDA63A",
    emoji: "🌾",
  },
  {
    id: 2,
    sdgNumber: 3,
    title: "Good Health &",
    subtitle: "Well-Being Innovation",
    description:
      "Create healthtech tools that improve access to care, mental wellness, and medical diagnostics.",
    color: "#4C9F38",
    emoji: "🏥",
  },
  {
    id: 3,
    sdgNumber: 4,
    title: "Quality Education &",
    subtitle: "Lifelong Learning",
    description:
      "Design edtech platforms that make learning inclusive, personalised, and accessible for all.",
    color: "#C5192D",
    emoji: "📚",
  },
  {
    id: 4,
    sdgNumber: 6,
    title: "Clean Water &",
    subtitle: "Sanitation",
    description:
      "Develop systems to monitor water quality, reduce contamination, and improve sanitation infrastructure.",
    color: "#26BDE2",
    emoji: "💧",
  },
  {
    id: 5,
    sdgNumber: 11,
    title: "Sustainable Cities &",
    subtitle: "Communities",
    description:
      "Innovate for smarter urban mobility, inclusive housing, and resilient local infrastructure.",
    color: "#FD9D24",
    emoji: "🏙️",
  },
  {
    id: 6,
    sdgNumber: 13,
    title: "Climate Action &",
    subtitle: "Environmental Monitoring",
    description:
      "Build tools for carbon tracking, climate prediction, and environmental data visualisation.",
    color: "#3F7E44",
    emoji: "🌱",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function SDGSection() {
  return (
    <section className="py-20 px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="mb-3 inline-block rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-violet-300">
            Six Global Tracks
          </span>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            Sustainable Development Goals
          </h2>
          <p className="mt-3 text-slate-400 max-w-xl mx-auto">
            Pick a track that matches your passion. Each challenge is rooted in a
            United Nations Sustainable Development Goal.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {tracks.map((track) => (
            <motion.div
              key={track.id}
              variants={cardVariant}
              whileHover={{
                scale: 1.03,
                boxShadow: `0 0 32px ${track.color}33`,
                transition: { duration: 0.2 },
              }}
              className="hack-surface relative flex flex-col gap-4 p-6 cursor-default"
              style={{ borderLeft: `4px solid ${track.color}` }}
            >
              {/* SDG badge */}
              <div className="flex items-center justify-between">
                <span
                  className="rounded-md px-2.5 py-1 text-xs font-bold"
                  style={{
                    color: track.color,
                    background: `${track.color}1a`,
                    border: `1px solid ${track.color}40`,
                  }}
                >
                  SDG {track.sdgNumber}
                </span>
                <span className="text-3xl">{track.emoji}</span>
              </div>

              {/* Title */}
              <div>
                <h3 className="text-lg font-bold text-white leading-snug">
                  {track.title}
                  <br />
                  <span style={{ color: track.color }}>{track.subtitle}</span>
                </h3>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-400 leading-relaxed flex-1">
                {track.description}
              </p>

              {/* Track number indicator */}
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <span
                  className="h-1.5 w-8 rounded-full"
                  style={{ background: track.color }}
                />
                Track {track.id}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
