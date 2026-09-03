import type { Metadata } from "next";

import { ExternalLink } from "../../external-link";

import { type SideEntry, sideSections } from "./data";

const metadata: Metadata = {
  description: "Products and open-source libraries created by Pedro Filho.",
  title: "Side",
};

const hostOf = (href: string) => new URL(href).hostname.replace(/^www\./v, "");

const LinkList = ({ items }: { items: Array<SideEntry> }) => (
  <ul className="flex flex-col gap-y-5 lg:gap-y-0">
    {items.map((item) => (
      <li key={item.name}>
        <ExternalLink
          className="group outline-ink grid grid-cols-1 text-sm leading-6 focus-visible:outline-2 focus-visible:outline-offset-4 lg:grid-cols-12 lg:gap-x-6 lg:py-1.5"
          href={item.href}
        >
          <span className="min-w-0 break-words lg:col-span-3">
            <span className="link-draw font-bold">{item.name}</span>
          </span>
          <span className="text-pretty lg:col-span-6">{item.description}</span>
          <span className="text-caption lg:col-span-3">
            {hostOf(item.href)}
            <span className="sr-only"> (opens in new tab)</span>
          </span>
        </ExternalLink>
      </li>
    ))}
  </ul>
);

const SidePage = () => (
  <>
    <h1 className="col-span-full mt-16 text-7xl leading-none tracking-tight sm:mt-24 sm:text-8xl lg:text-9xl">
      Side
    </h1>
    <p className="col-span-full mt-10 max-w-[48ch] text-sm leading-6 text-pretty lg:col-start-5 lg:col-end-9 lg:mt-16">
      Products I am building, and the open-source libraries and templates behind them.
    </p>

    {sideSections.map((section) => (
      <section className="col-span-full mt-16 sm:mt-20" key={section.title}>
        <h2 className="text-caption mb-4">{section.title}</h2>
        <LinkList items={section.entries} />
      </section>
    ))}
  </>
);

export const instant = true;
export { metadata };

export default SidePage;
