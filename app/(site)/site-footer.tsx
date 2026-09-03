"use client";

import { usePathname } from "next/navigation";

import { ExternalLink } from "../external-link";

const EMAIL = "pedro@filho.me";

const ELSEWHERE = [
  { href: "https://github.com/pedroapfilho", label: "GitHub" },
  { href: "https://x.com/pedroapfilho", label: "X" },
  { href: "https://youtube.com/c/ohmyfunction", label: "YouTube" },
];

const FOCUS_CLASS = "outline-ring focus-visible:outline-2 focus-visible:outline-offset-4";

const SiteFooter = () => {
  const isHome = usePathname() === "/";

  return (
    <footer className="mt-16 grid grid-cols-6 items-end gap-x-4 gap-y-6 lg:grid-cols-12 lg:gap-x-6">
      <a
        className={`link-draw w-fit ${FOCUS_CLASS} ${
          isHome
            ? "col-span-full text-3xl leading-none tracking-tight lg:col-end-9 lg:text-5xl"
            : "col-span-full text-xs leading-6 tracking-widest lg:col-span-4"
        }`}
        href={`mailto:${EMAIL}`}
      >
        {EMAIL}
      </a>
      <div className="col-span-full flex flex-col text-xs leading-6 tracking-widest uppercase lg:col-start-9 lg:col-end-13 lg:items-end">
        <span>usually on chain</span>
        <ul className="flex gap-5">
          {ELSEWHERE.map((item) => (
            <li key={item.href}>
              <ExternalLink className={`link-draw inline-block ${FOCUS_CLASS}`} href={item.href}>
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
