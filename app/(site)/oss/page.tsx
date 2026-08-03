import type { Metadata } from "next";

export const metadata: Metadata = {
  description: "Open-source projects created by Pedro Filho.",
  title: "OSS — Pedro Filho",
};

const ossProjects = [
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

const OssPage = () => (
  <div className="flex flex-1 flex-col gap-10 pt-14 pb-12 sm:pt-16">
    <header className="flex flex-col gap-3">
      <h1 className="text-3xl font-medium tracking-tight text-balance">OSS</h1>
      <p className="max-w-[64ch] text-base text-pretty sm:text-sm">
        Open-source libraries, themes, and package experiments I have created.
      </p>
    </header>

    <ul className="border-primary-foreground/10 border-t">
      {ossProjects.map((pkg) => (
        <li className="border-primary-foreground/10 border-b" key={pkg.name}>
          <a
            className="group flex items-start justify-between gap-4 py-4 no-underline focus-visible:outline-2 focus-visible:outline-offset-4"
            href={pkg.href}
            rel="noopener noreferrer"
            target="_blank"
          >
            <div className="flex min-w-0 flex-col gap-1">
              <div className="decoration-primary-foreground/30 group-hover:decoration-primary-foreground font-normal underline underline-offset-4">
                {pkg.name}
              </div>
              <p className="text-primary-foreground/70 text-base text-pretty sm:text-sm">
                {pkg.description}
              </p>
            </div>
            <span
              aria-hidden="true"
              className="text-primary-foreground/50 group-hover:text-primary-foreground shrink-0"
            >
              ↗
            </span>
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default OssPage;
