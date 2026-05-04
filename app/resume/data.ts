type Contact = {
  label: string;
  href: string;
  display: string;
};

type SkillGroup = {
  label: string;
  items: string[];
};

type Job = {
  company: string;
  location: string;
  role: string;
  dates: string;
  product: string;
  stack: string[];
  description: string;
};

type Resume = {
  name: string;
  title: string;
  summary: string;
  contacts: Contact[];
  skills: SkillGroup[];
  experience: Job[];
  education: { degree: string; school: string };
  languages: { language: string; level: string }[];
};

const resume: Resume = {
  name: "Pedro Afonso Pedrosa Filho",
  title: "Product Engineer · Full Stack",
  summary:
    "Product-minded Full Stack Engineer with 9+ years of experience owning end-to-end web platforms in cryptocurrency exchanges, DeFi apps, and high-performance trading systems. Operates as a Product Engineer, or as a Full-Stack Engineer — depending on how you name it — working from problem discovery and UX all the way down to backend services, data, and reliability. Strong background in payments, KYC, data-intensive systems, and shipping measurable improvements to revenue, performance, and user experience.",
  contacts: [
    {
      label: "Email",
      href: "mailto:pedro@filho.me",
      display: "pedro@filho.me",
    },
    {
      label: "Phone",
      href: "tel:+5521996781906",
      display: "+55 21 99678 1906",
    },
    {
      label: "Website",
      href: "https://pedroapfilho.com",
      display: "pedroapfilho.com",
    },
    {
      label: "Twitter",
      href: "https://twitter.com/pedroapfilho",
      display: "@pedroapfilho",
    },
    {
      label: "Github",
      href: "https://github.com/pedroapfilho",
      display: "github.com/pedroapfilho",
    },
    {
      label: "Linkedin",
      href: "https://www.linkedin.com/in/pedroapfilho/",
      display: "linkedin.com/in/pedroapfilho",
    },
  ],
  skills: [
    {
      label: "Languages & Frameworks",
      items: ["Go", "React", "TypeScript", "Rust", "Python"],
    },
    {
      label: "Backend & APIs",
      items: ["REST/GraphQL API design", "Microservices", "WebSockets"],
    },
    {
      label: "Blockchain & Web3",
      items: ["Smart contract integration", "DeFi protocols"],
    },
    {
      label: "Databases",
      items: ["PostgreSQL", "MongoDB", "MySQL"],
    },
    {
      label: "Cloud & DevOps",
      items: ["AWS", "Azure", "GCP", "CI/CD", "Monitoring & Alerting"],
    },
    {
      label: "Specializations",
      items: [
        "Product Engineering",
        "Trading Systems",
        "KYC",
        "Payment Systems",
        "Data Visualization",
        "Performance Optimization",
        "Security Best Practices",
      ],
    },
  ],
  experience: [
    {
      company: "[stealth launchpad]",
      location: "Remote",
      role: "Principal Product Engineer · Full Stack",
      dates: "07/2025 — present",
      product: "Token Launcher Platform",
      stack: [
        "Go",
        "Rust",
        "React",
        "Node.js",
        "Next.js",
        "Smart Contracts",
        "PostgreSQL",
        "AWS",
      ],
      description:
        "Partnered directly with founders on problem definition, product scope, and go-to-market for a new token launchpad. Designed and led the end-to-end architecture from ground zero to production, including backend services, database schema, API layer, and React/Next.js frontend, plus smart contract integrations with on-chain events. Set up CI/CD, observability, and security best practices, enabling a successful launch that secured investor funding on an accelerated timeline.",
    },
    {
      company: "pump.fun",
      location: "Remote",
      role: "Principal Product Engineer · Full Stack",
      dates: "08/2024 — 07/2025",
      product: "Token Launcher",
      stack: ["React", "Node.js", "NestJS", "Next.js", "PostgreSQL", "Redis"],
      description:
        "Owned core token creation and trading flows end-to-end, from product shaping and UX to backend services. Worked across the full stack to refine the coin creation experience, improve reliability, and support rapid experimentation. Refactored critical backend logic and improved error handling, observability, and data consistency, reducing sessions with errors from ~38% to ~5% and unlocking faster iteration on new features.",
    },
    {
      company: "Kraken",
      location: "Remote",
      role: "Senior Product Engineer · Trading Platform",
      dates: "06/2022 — 08/2024",
      product: "Centralized Exchange",
      stack: [
        "React",
        "Redux Toolkit",
        "Node.js",
        "WebSockets",
        "Data Visualization",
      ],
      description:
        "Acted as a product-minded engineer on the PRO trading application, owning surfaces from order forms to charts. Collaborated with PMs, designers, and backend teams to define requirements, refine UX for traders, and instrument key metrics. Worked across frontend and Node-based backend services on order entry, market data integrations, and charting, ensuring low-latency updates and high reliability. Reduced network-related errors and improved robustness of data pipelines, increasing revenue per session by more than 10%.",
    },
    {
      company: "Blockchain.com",
      location: "Remote · London, UK",
      role: "Senior Product Engineer · Full Stack",
      dates: "11/2020 — 06/2022",
      product: "Crypto Wallet & Payments",
      stack: [
        "React",
        "Redux",
        "Node.js",
        "TypeScript",
        "PostgreSQL",
        "Kafka",
      ],
      description:
        "Worked as a product engineer on wallet and payments, owning key KPIs around acceptance rate and reliability. Developed and maintained end-to-end web wallet and payment flows, from React UI to Node.js services and database integration. Led implementation of new payment systems, integrating with third-party providers and internal risk engines, increasing payment acceptance rate from 30% to 80% in just 2 weeks. Improved platform stability through robust monitoring, logging, and test coverage, collaborating with infra and product to prioritize high-impact improvements.",
    },
    {
      company: "Game Analytics",
      location: "Remote · London, UK",
      role: "Senior Product Engineer · Full Stack",
      dates: "08/2019 — 11/2020",
      product: "Analytics Platform for Mobile Games",
      stack: [
        "React",
        "Node.js",
        "AWS Lambda",
        "Kinesis",
        "S3",
        "Data Visualization",
      ],
      description:
        "Partnered with product and customers to build a new analytics platform focused on game studios' reporting needs. Led development from the ground up, contributing to both data-intensive frontend dashboards and backend services powering them. Architected application structure, implemented key APIs and aggregation logic, and enforced quality standards with automated testing and code reviews. Created all data visualizations for the dashboard, optimizing chart performance and data fetching to handle billions of datapoints efficiently and surface actionable insights.",
    },
    {
      company: "Intrasurance",
      location: "Remote · Lisbon, Portugal",
      role: "Product Engineer · Full Stack",
      dates: "11/2018 — 08/2019",
      product: "Insurance Platform",
      stack: ["React", "Redux", "Node.js", "Azure", "Microservices"],
      description:
        "Worked on an embeddable insurance platform, connecting business goals (conversion, quote quality) to product and engineering decisions. Implemented core flows for quoting and policy purchase across client-facing widgets and backend integration services, integrating with internal APIs and third-party providers. Ensured cross-platform compatibility and reliability of the widget while contributing to backend endpoints and deployment pipelines.",
    },
    {
      company: "Norio Matsubara",
      location: "Remote · Faro, Portugal",
      role: "Product Engineer & Technical Advisor · Full Stack",
      dates: "02/2016 — 11/2018",
      product: "Startup Portfolio Technical Advisor",
      stack: ["React", "PostgreSQL", "MongoDB", "Node.js", "Agile/Scrum"],
      description:
        "Advised portfolio companies on product strategy and technical architecture, with hands-on full stack implementation. Performed technical and product due diligence, reduced technical debt, and implemented agile processes aligned with business goals. Contributed to backend APIs, database design, and frontend features across multiple products, helping teams ship user-focused features more reliably.",
    },
  ],
  education: {
    degree: "Computer Science",
    school: "Universidade Federal de São João del Rei",
  },
  languages: [
    { language: "Portuguese", level: "Native" },
    { language: "English", level: "C2 (CEFR)" },
  ],
};

export { resume };
export type { Resume, Job, Contact, SkillGroup };
