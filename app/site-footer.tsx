"use client";

import { usePathname } from "next/navigation";

import { ExternalLink } from "@/app/external-link";
import { cn } from "@/lib/utils";

const EMAIL = "pedro@filho.me";

const ELSEWHERE = [
  { href: "https://github.com/pedroapfilho", label: "GitHub" },
  { href: "https://x.com/pedroapfilho", label: "X" },
  { href: "https://youtube.com/c/ohmyfunction", label: "YouTube" },
];

const SiteFooter = () => {
  const isHome = usePathname() === "/";

  return (
    <footer className="mt-16 grid grid-cols-6 items-end gap-x-4 gap-y-6 lg:grid-cols-12 lg:gap-x-6">
      <a
        className={cn(
          "link-draw outline-ring col-span-full w-fit focus-visible:outline-2 focus-visible:outline-offset-4",
          isHome
            ? "text-3xl leading-none tracking-tight lg:col-end-9"
            : "text-xs leading-6 tracking-widest lg:col-span-4",
          isHome && "lg:text-5xl",
        )}
        href={`mailto:${EMAIL}`}
      >
        {EMAIL}
      </a>
      <div className="col-span-full flex flex-col text-xs leading-6 tracking-widest uppercase lg:col-start-9 lg:col-end-13 lg:items-end">
        <span>usually on chain</span>
        <ul className="flex gap-5">
          {ELSEWHERE.map((item) => (
            <li key={item.href}>
              <ExternalLink
                className="link-draw outline-ring inline-block focus-visible:outline-2 focus-visible:outline-offset-4"
                href={item.href}
              >
                {item.label}
                <span className="sr-only"> (opens in new tab)</span>
              </ExternalLink>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export { SiteFooter };
