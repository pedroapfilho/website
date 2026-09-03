import type { Metadata } from "next";

import { ExternalLink } from "../../external-link";

import { useGroups } from "./data";

const metadata: Metadata = {
  description: "Hardware and local development software used by Pedro Filho.",
  title: "/uses",
};

const hostOf = (href: string) => new URL(href).hostname.replace(/^www\./v, "");

const UsesPage = () => (
  <>
    <h1 className="col-span-full mt-16 text-[clamp(4.5rem,10.2vw,9.375rem)] leading-[0.92] tracking-[-0.035em] sm:mt-24">
      /uses
    </h1>
    <p className="col-span-full mt-10 max-w-[48ch] text-sm leading-6 text-pretty lg:col-start-5 lg:col-end-9 lg:mt-16">
      Hardware connected to my computer and development software I use locally.
    </p>

    {useGroups.map((group) => (
      <section className="col-span-full mt-16 sm:mt-20" key={group.title}>
        <h2 className="text-caption mb-4">{group.title}</h2>
        <dl className="flex flex-col gap-y-5 lg:gap-y-0">
          {group.sections.map((section) => (
            <div
              className="grid grid-cols-1 text-sm leading-6 lg:grid-cols-12 lg:gap-x-6 lg:py-1.5"
              key={section.title}
            >
              <dt className="font-bold lg:col-span-3">{section.title}</dt>
              <dd className="lg:col-span-9">
                <ul className="flex flex-col gap-y-2 lg:gap-y-0">
                  {section.items.map((item) => (
                    <li key={item.href}>
                      <ExternalLink
                        className="group outline-ink grid grid-cols-1 focus-visible:outline-2 focus-visible:outline-offset-4 lg:grid-cols-9 lg:gap-x-6"
                        href={item.href}
                      >
                        <span className="min-w-0 break-words lg:col-span-6">
                          <span className="link-draw">{item.name}</span>
                        </span>
                        <span className="text-caption lg:col-span-3">
                          {hostOf(item.href)}
                          <span className="sr-only"> (opens in new tab)</span>
                        </span>
                      </ExternalLink>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </section>
    ))}
  </>
);

export const instant = true;
export { metadata };

export default UsesPage;
