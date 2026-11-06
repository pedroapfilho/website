"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { PAGES } from "@/lib/site";

const IndexNav = () => {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary">
      <ol className="flex flex-col gap-2 text-sm leading-6">
        {PAGES.map((page, index) => {
          const current = pathname === page.href;

          return (
            <li className={current ? "flex gap-2 font-bold" : "flex gap-2"} key={page.href}>
              <span aria-hidden="true" className="w-3 tabular-nums">
                {index + 1}
              </span>
              <Link
                aria-current={current ? "page" : undefined}
                className="link-draw"
                href={page.href}
              >
                {page.label}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export { IndexNav };
