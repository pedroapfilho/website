import type { Metadata } from "next";

import { libraries, projects, type SideEntry } from "./data";

const metadata: Metadata = {
  description: "Products and open-source libraries created by Pedro Filho.",
  title: "Side",
};

const LinkList = ({ items }: { items: Array<SideEntry> }) => (
  <ul className="border-primary-foreground/10 border-t">
    {items.map((item) => (
      <li className="border-primary-foreground/10 border-b" key={item.name}>
        <a
          className="group flex items-start justify-between gap-4 py-4 no-underline focus-visible:outline-2 focus-visible:outline-offset-4"
          href={item.href}
          rel="noopener noreferrer"
          target="_blank"
        >
          <div className="flex min-w-0 flex-col gap-1">
            <div className="decoration-primary-foreground/30 group-hover:decoration-primary-foreground font-normal underline underline-offset-4">
              {item.name}
            </div>
            <p className="text-primary-foreground/70 text-base text-pretty sm:text-sm">
              {item.description}
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
);

const SidePage = () => (
  <div className="flex flex-1 flex-col gap-10 pt-14 pb-12 sm:pt-16">
    <header className="flex flex-col gap-3">
      <h1 className="text-3xl font-medium tracking-tight text-balance">Side</h1>
      <p className="max-w-[64ch] text-base text-pretty sm:text-sm">
        Products I am building, and the open-source libraries and templates behind them.
      </p>
    </header>

    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-medium tracking-tight">Projects</h2>
      <LinkList items={projects} />
    </section>

    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-medium tracking-tight">Libraries</h2>
      <LinkList items={libraries} />
    </section>
  </div>
);

export { metadata };

export default SidePage;
