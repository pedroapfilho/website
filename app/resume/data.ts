type Contact = {
  display: string;
  href: string;
  label: string;
};

type SkillGroup = {
  items: Array<string>;
  label: string;
};

const PRESENT = "present";

type Job = {
  company: string;
  description: string;
  /** ISO `YYYY-MM`, or `PRESENT` for a role with no end date yet. */
  end: string;
  location: string;
  metrics: Array<string>;
  product: string;
  role: string;
  stack: Array<string>;
  /** ISO `YYYY-MM`. */
  start: string;
};

type Resume = {
  contacts: Array<Contact>;
  education: { degree: string; school: string };
  experience: Array<Job>;
  languages: Array<{ language: string; level: string }>;
  name: string;
  skills: Array<SkillGroup>;
  summary: string;
  title: string;
};

const resume: Resume = {
  contacts: [
    {
      display: "pedro@filho.me",
      href: "mailto:pedro@filho.me",
      label: "Email",
    },
    {
      display: "+55 21 99678 1906",
      href: "tel:+5521996781906",
      label: "Phone",
    },
    {
      display: "pedroapfilho.com",
      href: "https://pedroapfilho.com",
      label: "Website",
    },
    {
      display: "@pedroapfilho",
      href: "https://twitter.com/pedroapfilho",
      label: "Twitter",
    },
    {
      display: "github.com/pedroapfilho",
      href: "https://github.com/pedroapfilho",
      label: "Github",
    },
    {
      display: "linkedin.com/in/pedroapfilho",
      href: "https://www.linkedin.com/in/pedroapfilho/",
      label: "Linkedin",
    },
  ],
  education: {
    degree: "Computer Science",
    school: "Universidade Federal de São João del Rei",
  },
  experience: [
    {
      company: "[stealth launchpad]",
      description:
        "Partnered directly with founders on problem definition, product scope, and go-to-market for a new token launchpad. Designed and led the end-to-end architecture from ground zero to production, including backend services, database schema, API layer, and React/Next.js frontend, plus smart contract integrations with on-chain events. Set up CI/CD, observability, and security best practices.",
      end: PRESENT,
      location: "Remote",
      metrics: [
        "Took platform from zero to production launch on an accelerated timeline",
        "Launch secured investor funding round",
        "Owned full architecture across backend, frontend, smart contracts, CI/CD, and observability",
      ],
      product: "Token Launcher Platform",
      role: "Principal Product Engineer · Full Stack",
      stack: ["Go", "Rust", "React", "Node.js", "Next.js", "Smart Contracts", "PostgreSQL", "AWS"],
      start: "2025-07",
    },
    {
      company: "pump.fun",
      description:
        "Owned core token creation and trading flows end-to-end, from product shaping and UX to backend services. Worked across the full stack to refine the coin creation experience, improve reliability, and support rapid experimentation. Refactored critical backend logic and improved error handling, observability, and data consistency, unlocking faster iteration on new features.",
      end: "2025-07",
      location: "Remote",
      metrics: [
        "Reduced sessions with errors from ~38% to ~5% (~87% relative reduction)",
        "Refactored core token creation and trading flows used by millions of users",
        "Improved observability, error handling, and data consistency across critical backend paths",
      ],
      product: "Token Launcher",
      role: "Principal Product Engineer · Full Stack",
      stack: ["React", "Node.js", "NestJS", "Next.js", "PostgreSQL", "Redis"],
      start: "2024-08",
    },
    {
      company: "Kraken",
      description:
        "Acted as a product-minded engineer on the Pro trading application, owning surfaces from order forms to charts. Collaborated with PMs, designers, and backend teams to define requirements, refine UX for traders, and instrument key metrics. Worked across frontend and Node-based backend services on order entry, market data integrations, and charting, ensuring low-latency updates and high reliability.",
      end: "2024-08",
      location: "Remote",
      metrics: [
        "Increased revenue per session by 10%+",
        "Reduced network-related errors on order entry and market data flows",
        "Improved data pipeline robustness across trading surfaces",
      ],
      product: "Centralized Exchange",
      role: "Senior Product Engineer · Trading Platform",
      stack: ["React", "Redux Toolkit", "Node.js", "WebSockets", "Data Visualization"],
      start: "2022-06",
    },
    {
      company: "Blockchain.com",
      description:
        "Worked as a product engineer on wallet and payments, owning key KPIs around acceptance rate and reliability. Developed and maintained end-to-end web wallet and payment flows, from React UI to Node.js services and database integration. Collaborated with infra and product to prioritize high-impact improvements.",
      end: "2022-06",
      location: "Remote · London, UK",
      metrics: [
        "Increased payment acceptance rate from 30% to 80% in 2 weeks",
        "Led integration of new payment systems with third-party providers and internal risk engines",
        "Improved platform stability via monitoring, logging, and expanded test coverage",
      ],
      product: "Crypto Wallet & Payments",
      role: "Senior Product Engineer · Full Stack",
      stack: ["React", "Redux", "Node.js", "TypeScript", "PostgreSQL", "Kafka"],
      start: "2020-11",
    },
    {
      company: "Game Analytics",
      description:
        "Partnered with product and customers to build a new analytics platform focused on game studios' reporting needs. Led development from the ground up, contributing to both data-intensive frontend dashboards and backend services powering them. Implemented key APIs and aggregation logic, and enforced quality standards with automated testing and code reviews.",
      end: "2020-11",
      location: "Remote · London, UK",
      metrics: [
        "Built dashboards handling billions of data points with optimized chart performance",
        "Architected analytics platform from the ground up alongside product and customers",
        "Established quality bar via automated testing and code review",
      ],
      product: "Analytics Platform for Mobile Games",
      role: "Senior Product Engineer · Full Stack",
      stack: ["React", "Node.js", "AWS Lambda", "Kinesis", "S3", "Data Visualization"],
      start: "2019-08",
    },
    {
      company: "Intrasurance",
      description:
        "Worked on an embeddable insurance platform, implementing core flows for quoting and policy purchase across client-facing widgets and backend integration services, integrating with internal APIs and third-party providers. Contributed to backend endpoints and deployment pipelines.",
      end: "2019-08",
      location: "Remote · Lisbon, Portugal",
      metrics: [
        "Shipped quoting and policy-purchase flows across embeddable widget and backend services",
        "Connected business KPIs (conversion, quote quality) to product and engineering decisions",
        "Ensured cross-platform widget compatibility and reliability",
      ],
      product: "Insurance Platform",
      role: "Product Engineer · Full Stack",
      stack: ["React", "Redux", "Node.js", "Azure", "Microservices"],
      start: "2018-11",
    },
    {
      company: "Norio Matsubara",
      description:
        "Advised portfolio companies on product strategy and technical architecture, with hands-on full stack implementation. Contributed to backend APIs, database design, and frontend features across multiple products, helping teams ship user-focused features more reliably.",
      end: "2018-11",
      location: "Remote · Faro, Portugal",
      metrics: [
        "Advised multiple portfolio companies on product strategy and architecture",
        "Performed technical and product due diligence; reduced technical debt across products",
        "Introduced agile processes aligned with business goals",
      ],
      product: "Startup Portfolio Technical Advisor",
      role: "Product Engineer & Technical Advisor · Full Stack",
      stack: ["React", "PostgreSQL", "MongoDB", "Node.js", "Agile/Scrum"],
      start: "2016-02",
    },
  ],
  languages: [
    { language: "Portuguese", level: "Native" },
    { language: "English", level: "C2 (CEFR)" },
  ],
  name: "Pedro Afonso Pedrosa Filho",
  skills: [
    {
      items: ["Go", "React", "TypeScript", "Rust", "Python"],
      label: "Languages & Frameworks",
    },
    {
      items: ["REST/GraphQL API design", "Microservices", "WebSockets"],
      label: "Backend & APIs",
    },
    {
      items: ["Smart contract integration", "DeFi protocols"],
      label: "Blockchain & Web3",
    },
    {
      items: ["PostgreSQL", "MongoDB", "MySQL"],
      label: "Databases",
    },
    {
      items: ["AWS", "Azure", "GCP", "CI/CD", "Monitoring & Alerting"],
      label: "Cloud & DevOps",
    },
    {
      items: ["Trading Systems", "Performance Optimization", "Security"],
      label: "Specializations",
    },
  ],
  summary:
    "Product-minded Full Stack Engineer with 9+ years of experience owning end-to-end web platforms in cryptocurrency exchanges, DeFi apps, and high-performance trading systems. Operates as a Product Engineer, or as a Full Stack Engineer, depending on how you name it. Working from problem discovery and UX all the way down to backend services, data, and reliability. Strong background in payments, KYC, data-intensive systems, and shipping measurable improvements to revenue, performance, and user experience.",
  title: "Product Engineer · Full Stack",
};

export { PRESENT, resume };
export type { Resume, Job, Contact, SkillGroup };
