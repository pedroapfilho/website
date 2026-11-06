import type { Metadata } from "next";

import { ExternalLink } from "@/app/external-link";

import { HostCaption, PageIntro, PageSection, PageTitle } from "../poster";

import { useGroups } from "./data";

const metadata: Metadata = {
  description: "Hardware and local development software used by Pedro Filho.",
  title: "/uses",
};

const UsesPage = () => (
  <>
    <PageTitle>/uses</PageTitle>
    <PageIntro>
      <p>Hardware connected to my computer and development software I use locally.</p>
    </PageIntro>

    {useGroups.map((group) => (
      <PageSection key={group.title} title={group.title}>
        <dl className="flex flex-col gap-y-5 lg:gap-y-0">
          {group.sections.map((section) => (
            <div
              className="gap-x-gutter grid grid-cols-1 text-sm leading-6 lg:grid-cols-12 lg:py-1.5"
              key={section.title}
            >
              <dt className="font-bold lg:col-span-3">{section.title}</dt>
              <dd className="lg:col-span-9">
                <ul className="flex flex-col gap-y-2 lg:gap-y-0">
                  {section.items.map((item) => (
                    <li key={item.href}>
                      <ExternalLink
                        className="group gap-x-gutter grid grid-cols-1 lg:grid-cols-9"
                        href={item.href}
                      >
                        <span className="min-w-0 break-words lg:col-span-6">
                          <span className="link-draw">{item.name}</span>
                        </span>
                        <HostCaption href={item.href} />
                      </ExternalLink>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </PageSection>
    ))}
  </>
);

export const instant = true;

export { metadata };

export default UsesPage;
