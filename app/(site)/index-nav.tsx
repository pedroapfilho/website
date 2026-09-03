"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type IndexItem = {
  href: string;
  label: string;
};

const INDEX_ITEMS: Array<IndexItem> = [
  { href: "/", label: "Pedro" },
  { href: "/side", label: "Side" },
  { href: "/uses", label: "/uses" },
  { href: "/resume", label: "Resume" },
];

const IndexNav = () => {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary">
      <ol className="text-sm leading-6">
        {INDEX_ITEMS.map((item, index) => {
          const current = pathname === item.href;

          return (
            <li className={`flex gap-2 ${current ? "font-bold" : "font-normal"}`} key={item.href}>
              <span aria-hidden="true" className="w-3 tabular-nums">
                {index + 1}
              </span>
              <Link
                aria-current={current ? "page" : undefined}
                className="link-draw outline-ink focus-visible:outline-2 focus-visible:outline-offset-4"
                href={item.href}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export { IndexNav };
