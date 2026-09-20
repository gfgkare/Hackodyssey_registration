import { motion, type Variants } from "framer-motion";

interface FacultyCoordinator {
  name: string;
  initials: string;
  designation: string;
}

interface StudentCoordinator {
  name: string;
  initials: string;
  phone: string;
  phoneFormatted: string;
}

const facultyCoordinators: FacultyCoordinator[] = [
  {
    name: "Dr. R. Raja Sekar",
    initials: "RRS",
    designation: "Faculty Coordinator",
  },
  {
    name: "Dr. P. Chinnasamy",
    initials: "PC",
    designation: "Faculty Coordinator",
  },
];

const studentCoordinators: StudentCoordinator[] = [
  {
    name: "L. Harsha Vardhan",
    initials: "LH",
    phone: "+919100550609",
    phoneFormatted: "+91 91005 50609",
  },
  {
    name: "P. Harshika Suryanjali",
    initials: "PH",
    phone: "+919502795304",
    phoneFormatted: "+91 95027 95304",
  },
  {
    name: "S. Thaha",
    initials: "ST",
    phone: "+917893340788",
    phoneFormatted: "+91 78933 40788",
  },
  {
    name: "G. Umesh Chandra",
    initials: "GU",
    phone: "+919573861418",
    phoneFormatted: "+91 95738 61418",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function AvatarPlaceholder({
  initials,
  gradient,
}: {
  initials: string;
  gradient: string;
}) {
  return (
    <div
      className="flex h-20 w-20 items-center justify-center rounded-full text-xl font-extrabold text-white shadow-lg ring-2 ring-white/10"
      style={{ background: gradient }}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

export default function CoordinatorsSection() {
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
            Contact
          </span>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            Coordinators
          </h2>
          <p className="mt-3 text-slate-400">
            Reach out to our coordinators for any queries.
          </p>
        </motion.div>

        {/* ── Faculty Coordinators ── */}
        <div className="mb-10">
          <p className="mb-5 text-center text-xs font-semibold uppercase tracking-widest text-blue-400">
            Faculty Coordinators
          </p>
          <motion.div
            className="flex flex-wrap justify-center gap-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {facultyCoordinators.map((coord) => (
              <motion.div
                key={coord.name}
                variants={cardVariant}
                className="hack-surface flex flex-col items-center gap-4 p-7 text-center w-52"
              >
                <AvatarPlaceholder
                  initials={coord.initials}
                  gradient="linear-gradient(135deg, #1e40af 0%, #4f46e5 100%)"
                />
                <div>
                  <p className="font-bold text-white leading-snug">{coord.name}</p>
                  <p className="mt-1 text-xs font-medium text-blue-400 uppercase tracking-wide">
                    {coord.designation}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── Student Coordinators ── */}
        <div>
          <p className="mb-5 text-center text-xs font-semibold uppercase tracking-widest text-violet-400">
            Student Coordinators
          </p>
          <motion.div
            className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {studentCoordinators.map((coord) => (
              <motion.div
                key={coord.name}
                variants={cardVariant}
                className="hack-surface flex flex-col items-center gap-4 p-6 text-center"
              >
                <AvatarPlaceholder
                  initials={coord.initials}
                  gradient="linear-gradient(135deg, #5b21b6 0%, #7c3aed 100%)"
                />
                <div className="flex-1">
                  <p className="font-bold text-white leading-snug">{coord.name}</p>
                  <p className="mt-1 text-xs font-medium text-violet-400 uppercase tracking-wide">
                    Student Coordinator
                  </p>
                </div>
                <a
                  href={`tel:${coord.phone}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-violet-500/30 bg-violet-500/10 px-4 py-2.5 text-sm font-semibold text-violet-300 transition hover:bg-violet-500/20 hover:text-white active:scale-95 w-full justify-center"
                  aria-label={`Call ${coord.name} at ${coord.phoneFormatted}`}
                >
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-4 w-4 flex-shrink-0"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 15.352V16.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {coord.phoneFormatted}
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
