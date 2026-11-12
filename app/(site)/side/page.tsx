import type { Metadata } from "next";

import { ExternalLink } from "@/app/external-link";

import { HostCaption, PageIntro, PageSection, PageTitle } from "../poster";

import { sideSections } from "./data";

const metadata: Metadata = {
  description: "Products and open-source libraries created by Pedro Filho.",
  title: "Side",
};

const SidePage = () => (
  <>
    <PageTitle>Side</PageTitle>
    <PageIntro>
      <p>Products I am building, and the open-source libraries and templates behind them.</p>
    </PageIntro>

    {sideSections.map((section) => (
      <PageSection key={section.title} title={section.title}>
        <ul className="flex flex-col gap-y-5 lg:gap-y-0">
          {section.entries.map((entry) => (
            <li key={entry.name}>
              <ExternalLink
                className="group gap-x-gutter grid grid-cols-1 text-sm leading-6 lg:grid-cols-12 lg:py-1.5"
                href={entry.href}
              >
                <span className="min-w-0 wrap-break-word lg:col-span-3">
                  <span className="link-draw font-bold">{entry.name}</span>
                </span>
                <span className="text-pretty lg:col-span-6">{entry.description}</span>
                <HostCaption href={entry.href} />
              </ExternalLink>
            </li>
          ))}
        </ul>
      </PageSection>
    ))}
  </>
);

export const instant = true;

export { metadata };

export default SidePage;
