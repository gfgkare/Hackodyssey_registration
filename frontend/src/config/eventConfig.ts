// ============================================================
// HACK ODYSSEY 4.0 — Central Event Configuration
// ============================================================
// Edit values in this file to customize the entire landing page.
// UI components import from here; no component code needs changing.
// ============================================================

export const eventConfig = {
  // ── Basic Event Info ──────────────────────────────────────
  eventName: "Hack Odyssey 4.0",
  eventTagline: "24-Hour Hackathon — SDG Themed",
  eventSubtitle:
    "Join us for a 24-hour hackathon at Kalasalingam Academy of Research and Education with problem statements aligned with the United Nations Sustainable Development Goals.",
  eventEdition: "2026",

  // ── Dates & Timing ───────────────────────────────────────
  eventDate: "September 25 & 26, 2026",
  eventTime: "24-Hour Hackathon (Offline)",
  registrationDeadline: "September 20, 2026",
  registrationDeadlineISO: "2026-09-20T23:59:59+05:30",

  // ── Venue ─────────────────────────────────────────────────
  venue: "Central Library, KARE",
  venueDetail: "Kalasalingam Academy of Research and Education, Krishnankoil, Tamil Nadu",

  // ── Eligibility & Fees ───────────────────────────────────
  eligibility: "Open to all college students across India",
  teamSize: "2 – 5 Members per Team",
  registrationFee: "₹300 per Member",
  prizePool: "Up to ₹1,00,000",
  participation: "Team (Offline)",
  mode: "Offline",

  // ── Sponsor ───────────────────────────────────────────────
  sponsor: "CodeChef",

  // ── Contact ──────────────────────────────────────────────
  contactEmail: "gfgkarestudentchapter@klu.ac.in",
  contactPhone: "+91 91005 50609",
  address: "Kalasalingam Academy of Research and Education, Krishnankoil, Tamil Nadu",

  // ── Student Coordinators ──────────────────────────────────
  studentCoordinators: [
    { name: "Shaik Thaha", phone: "78933 40788" },
    { name: "L Harsha Vardhan", phone: "91005 50609" },
    { name: "C Yasasvi Reddy", phone: "93901 98225" },
    { name: "Meesala Jahnavi Sree", phone: "80746 43008" },
  ],

  // ── Social Links ─────────────────────────────────────────
  social: {
    instagram: "https://www.instagram.com/gfg_campus_body_kare/",
    linkedin: "https://www.linkedin.com/company/gfg-kare-student-chapter",
    website: "https://euphoria.kalasalingam.ac.in/",
  },

  // ── WhatsApp (post-registration) ─────────────────────────
  whatsappGroup: "https://chat.whatsapp.com/D2EVvQ3OThT5nx1wFsznx5",

  // ── University Logo ───────────────────────────────────────
  universityLogo: "/kalasalingam.png",

  // ── Five Collaborating Clubs ─────────────────────────────
  clubs: [
    {
      id: "acm",
      name: "KARE ACM Student Chapter",
      shortName: "ACM",
      logo: "/acm.png",
      description:
        "KARE ACM Student Chapter (ID: 170084, SBC344451H) — advancing computing as a science, profession, and public interest.",
      initials: "ACM",
      color: "#0085ca",
    },
    {
      id: "gfg",
      name: "GFG Campus Body KARE",
      shortName: "GFG",
      logo: "/gfg.png",
      description:
        "GFG Campus Body KARE — organizing Euphoria 2026, a Techno Management Meet focused on Sustainability.",
      initials: "KARE",
      color: "#18b825ff",
    },
    {
      id: "acm-w",
      name: "KARE ACM-W Student Chapter",
      shortName: "ACM-W",
      logo: "/acm-w.jpeg",
      description:
        "KARE ACM-W Student Chapter (Chapter ID: 180857) — supporting, celebrating and advocating for women in computing.",
      initials: "ACM-W",
      color: "#e91e8c",
    },
    {
      id: "gdg",
      name: "Google Developer Groups",
      shortName: "GDG",
      logo: "/gdg.jpeg",
      description:
        "Google Developer Groups On Campus — Kalasalingam Academy of Research and Education, fostering developer culture.",
      initials: "GDG",
      color: "#4285f4",
    },
    {
      id: "ieee",
      name: "KARE IEEE Education Society",
      shortName: "IEEE",
      logo: "/ieee.png",
      description:
        "KARE IEEE Education Society — bridging technology and innovation through research, education, and events.",
      initials: "IEEE",
      color: "#00629b",
    }
  ],

  // ── Faculty Coordinators ──────────────────────────────────
  coordinators: [
    {
      name: "Dr. P. Chinnasamy",
      role: "ACM/IEE EDU SBC Counsellor, KARE (ASP/CSE)",
      phone: "96002 81664",
      email: "p.chinnasamy@klu.ac.in",
    },
    {
      name: "Dr. R. Raja Sekar",
      role: "Faculty Coordinator, ASP/CSE",
      phone: "83442 04371",
      email: "r.rajasekar@klu.ac.in",
    },
  ],

  // ── SDG Tracks / Themes ───────────────────────────────────
  tracks: [
    "Zero Hunger & Sustainable Agriculture (SDG 2)",
    "Good Health & Well-Being Innovation (SDG 3)",
    "Quality Education & Lifelong Learning (SDG 4)",
    "Clean Water & Sanitation (SDG 6)",
    "Sustainable Cities & Communities (SDG 11)",
    "Climate Action & Environmental Monitoring (SDG 13)",
  ],

  // ── Short track names (for pills/tags) ───────────────────
  trackShort: [
    "SDG 2 — Zero Hunger",
    "SDG 3 — Good Health",
    "SDG 4 — Quality Education",
    "SDG 6 — Clean Water",
    "SDG 11 — Sustainable Cities",
    "SDG 13 — Climate Action",
  ],

  // ── FAQ ───────────────────────────────────────────────────
  faq: [
    {
      question: "Who can participate in Hack Odyssey 4.0?",
      answer:
        "Hack Odyssey 4.0 is open to all college students across India, including students from institutions outside KARE. External participants are warmly welcome to register and participate.",
    },
    {
      question: "Is registration mandatory?",
      answer:
        "Yes. All participants must complete the online registration before the deadline. Walk-in registrations will not be accepted at the venue.",
    },
    {
      question: "What is the team size?",
      answer:
        "Each team must have 2 to 5 members. Solo registrations are not allowed.",
    },
    {
      question: "Can teams have members from different colleges?",
      answer:
        "Yes! Cross-college teams are allowed. Members can be from different institutions.",
    },
    {
      question: "What is the registration fee?",
      answer:
        "The registration fee is ₹300 per member (e.g., ₹600 for 2 members, ₹900 for 3, ₹1200 for 4, and ₹1500 for 5 members).",
    },
    {
      question: "What is the prize pool?",
      answer:
        "The prize pool is up to ₹1,00,000 (One Lakh Rupees). Prizes will be distributed across winning teams and categories.",
    },
    {
      question: "What are the hackathon themes?",
      answer:
        "Problem statements are aligned with UN SDGs: Zero Hunger (SDG 2), Good Health (SDG 3), Quality Education (SDG 4), Clean Water (SDG 6), Sustainable Cities (SDG 11), and Climate Action (SDG 13).",
    },
    {
      question: "Where will the event take place?",
      answer:
        "Hack Odyssey 4.0 will be held at Central Library, KARE (Kalasalingam Academy of Research and Education), Krishnankoil, Tamil Nadu — offline.",
    },
    {
      question: "Will I receive a confirmation after registration?",
      answer:
        "Yes. A registration confirmation will be displayed immediately after submitting the form. Please note your Team ID for future reference.",
    },
    {
      question: "What should I bring to the hackathon?",
      answer:
        "Bring your laptop, chargers, valid college ID card, and your innovative ideas! The hackathon runs for 24 hours — September 25 & 26, 2026.",
    },
  ],

  // ── Event Highlights ─────────────────────────────────────
  highlights: [
    {
      icon: "Code2",
      title: "24-Hour Hackathon",
      description:
        "An intensive 24-hour coding sprint with SDG-aligned problem statements designed to challenge and inspire real-world solutions.",
    },
    {
      icon: "Trophy",
      title: "Prize Pool — ₹1 Lakh",
      description:
        "Compete for a prize pool of up to ₹1,00,000. Winners receive cash prizes, trophies, and certificates of excellence.",
    },
    {
      icon: "Lightbulb",
      title: "SDG-Aligned Themes",
      description:
        "Solve real global problems: Zero Hunger, Good Health, Quality Education, Clean Water, Sustainable Cities, and Climate Action.",
    },
    {
      icon: "Users",
      title: "Networking",
      description:
        "Connect with students, mentors, and faculty coordinators from across India in a collaborative hackathon environment.",
    },
    {
      icon: "Presentation",
      title: "Mentorship & Guidance",
      description:
        "Get guidance from experienced faculty coordinators and domain experts throughout the 24-hour event.",
    },
    {
      icon: "Star",
      title: "Certificates for All",
      description:
        "All registered and participating teams receive certificates. Winners receive special recognition and trophies.",
    },
  ],
} as const;

export type EventConfig = typeof eventConfig;
