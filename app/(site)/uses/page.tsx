import type { Metadata } from "next";

import { useGroups } from "./data";

const metadata: Metadata = {
  description: "Hardware and local development software used by Pedro Filho.",
  title: "/uses",
};

const UsesPage = () => (
  <div className="flex flex-1 flex-col gap-10 pt-14 pb-12 sm:pt-16">
    <header className="flex flex-col gap-3">
      <h1 className="text-3xl font-medium tracking-tight text-balance">/uses</h1>
      <p className="max-w-[64ch] text-base text-pretty sm:text-sm">
        Hardware connected to my computer and development software I use locally.
      </p>
    </header>

    <div className="flex flex-col gap-10">
      {useGroups.map((group) => (
        <section className="flex flex-col gap-4" key={group.title}>
          <h2 className="text-base font-medium">{group.title}</h2>
          <dl className="border-primary-foreground/10 border-t">
            {group.sections.map((section) => (
              <div
                className="border-primary-foreground/10 grid gap-2 border-b py-5 sm:grid-cols-[10rem_1fr] sm:gap-6"
                key={section.title}
              >
                <dt className="font-medium">{section.title}</dt>
                <dd>
                  <ul className="flex flex-col gap-1">
                    {section.items.map((item) => (
                      <li className="text-base sm:text-sm" key={item.href}>
                        <a
                          className="decoration-primary-foreground/30 hover:decoration-primary-foreground underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4"
                          href={item.href}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  </div>
);

export { metadata };

export default UsesPage;
