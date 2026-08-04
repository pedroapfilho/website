type SideEntry = {
  description: string;
  href: string;
  name: string;
};

const projects: Array<SideEntry> = [
  {
    description: "Redacts personal data from text, PDFs, and images entirely on your own machine.",
    href: "https://www.localveil.com",
    name: "localveil",
  },
  {
    description: "Real-time timezone visualizer for distributed teams.",
    href: "https://www.collabtime.io",
    name: "collabtime",
  },
  {
    description: "Audio creation and AI-powered music platform.",
    href: "https://frow.so",
    name: "frow",
  },
  {
    description: "Multi-chain portfolio tracker across EVM, Solana, Sui, and Bitcoin.",
    href: "https://ohmycrypto.com",
    name: "ohmycrypto",
  },
];

const libraries: Array<SideEntry> = [
  {
    description: "Multi-chain wallet management for React across EVM, Solana, Sui, and Bitcoin.",
    href: "https://github.com/pedroapfilho/usebutr",
    name: "usebutr",
  },
  {
    description: "Headless React docking layout primitives for tiled, resizable, tabbed regions.",
    href: "https://github.com/pedroapfilho/dashfoo",
    name: "dashfoo",
  },
  {
    description:
      "Playwright wallet automation for MetaMask, Phantom, and Slush across EVM, Solana, and Sui.",
    href: "https://github.com/pedroapfilho/walletwright",
    name: "walletwright",
  },
  {
    description: "Theme made with Astro.",
    href: "https://github.com/pedroapfilho/astro-theme-awesomeness",
    name: "astro-theme-awesomeness",
  },
  {
    description: "Opinionated Oxlint config for full-stack TypeScript monorepos.",
    href: "https://github.com/pedroapfilho/oxlint-config-awesomeness",
    name: "oxlint-config-awesomeness",
  },
  {
    description:
      "Fork-ready monorepo template for apps, shared packages, tooling, and configuration.",
    href: "https://github.com/pedroapfilho/acme-monorepo",
    name: "acme-monorepo",
  },
  {
    description: "Fork-ready monorepo template for published TypeScript libraries.",
    href: "https://github.com/pedroapfilho/acme-package",
    name: "acme-package",
  },
];

export { libraries, projects };
export type { SideEntry };
