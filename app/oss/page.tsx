import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OSS — Pedro Filho",
  description: "Open-source projects created by Pedro Filho.",
};

const ossProjects = [
  {
    name: "usebutr",
    description:
      "Multi-chain wallet management for React across EVM, Solana, Sui, and Bitcoin.",
    href: "https://github.com/pedroapfilho/usebutr",
  },
  {
    name: "dashfoo",
    description:
      "Headless React docking layout primitives for tiled, resizable, tabbed regions.",
    href: "https://github.com/pedroapfilho/dashfoo",
  },
  {
    name: "astro-theme-awesomeness",
    description: "Theme made with Astro.",
    href: "https://github.com/pedroapfilho/astro-theme-awesomeness",
  },
  {
    name: "oxlint-config-awesomeness",
    description:
      "Opinionated Oxlint config for full-stack TypeScript monorepos.",
    href: "https://github.com/pedroapfilho/oxlint-config-awesomeness",
  },
  {
    name: "acme-monorepo",
    description:
      "Fork-ready monorepo template for apps, shared packages, tooling, and configuration.",
    href: "https://github.com/pedroapfilho/acme-monorepo",
  },
  {
    name: "acme-package",
    description:
      "Fork-ready monorepo template for published TypeScript libraries.",
    href: "https://github.com/pedroapfilho/acme-package",
  },
];

const OssPage = () => (
  <main className="isolate flex flex-1 flex-col">
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-10 px-6 pt-14 pb-12 sm:px-12 sm:pt-16">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-medium tracking-tight text-balance">
          OSS
        </h1>
        <p className="max-w-[64ch] text-base text-pretty sm:text-sm">
          Open-source libraries, themes, and package experiments I have created.
        </p>
      </header>

      <ul role="list" className="border-t border-primary-foreground/10">
        {ossProjects.map((pkg) => (
          <li
            key={pkg.name}
            className="border-b border-primary-foreground/10"
          >
            <a
              href={pkg.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start justify-between gap-4 py-4 no-underline focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              <div className="flex min-w-0 flex-col gap-1">
                <div className="font-normal underline decoration-primary-foreground/30 underline-offset-4 group-hover:decoration-primary-foreground">
                  {pkg.name}
                </div>
                <p className="text-base text-primary-foreground/70 text-pretty sm:text-sm">
                  {pkg.description}
                </p>
              </div>
              <span
                aria-hidden="true"
                className="shrink-0 text-primary-foreground/50 group-hover:text-primary-foreground"
              >
                ↗
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  </main>
);

export default OssPage;
