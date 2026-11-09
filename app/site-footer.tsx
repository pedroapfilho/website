"use client";

import { usePathname } from "next/navigation";

import { ExternalLink } from "@/app/external-link";
import { EMAIL, GITHUB_URL, X_URL } from "@/lib/contact";

const ELSEWHERE = [
  { href: GITHUB_URL, label: "GitHub" },
  { href: X_URL, label: "X" },
  { href: "https://youtube.com/c/ohmyfunction", label: "YouTube" },
];

const SiteFooter = () => {
  const isHome = usePathname() === "/";

  return (
    <footer className="gap-x-gutter mt-16 grid grid-cols-6 items-end gap-y-6 lg:grid-cols-12">
      <a
        className={
          isHome
            ? "link-draw col-span-full w-fit text-3xl leading-none tracking-tight lg:col-end-9 lg:text-5xl"
            : "link-draw col-span-full w-fit text-xs leading-6 tracking-widest lg:col-span-4"
        }
        href={`mailto:${EMAIL}`}
      >
        {EMAIL}
      </a>
      <div className="col-span-full flex flex-col text-xs leading-6 tracking-widest uppercase lg:col-start-9 lg:col-end-13 lg:items-end">
        <span>usually on chain</span>
        <ul className="flex gap-5">
          {ELSEWHERE.map((item) => (
            <li key={item.href}>
              <ExternalLink className="link-draw inline-block" href={item.href}>
                {item.label}
              </ExternalLink>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export { SiteFooter };
