import Link from "next/link";

import { ExternalLink } from "../external-link";

const NAV_LINK_CLASS =
  "hover:bg-primary-foreground hover:text-primary rounded-lg px-2 py-2 font-normal text-inherit no-underline focus-visible:outline-2 focus-visible:outline-offset-2";

type NavItem = {
  external: boolean;
  href: string;
  label: string;
};

// The bottom nav the whole site used before the (site) redesign, kept so the
// resume screen renders exactly as it did. Print-hidden, so the PDF never sees it.
const NAV_ITEMS: Array<NavItem> = [
  { external: true, href: "https://github.com/pedroapfilho", label: "Code" },
  { external: true, href: "https://x.com/pedroapfilho", label: "X" },
  { external: false, href: "/resume", label: "Resume" },
  { external: false, href: "/side", label: "Side" },
  { external: false, href: "/uses", label: "/uses" },
  { external: true, href: "https://youtube.com/c/ohmyfunction", label: "Youtube" },
];

const BottomNav = () => (
  <nav aria-label="Primary" className="bg-primary w-full py-4 print:hidden">
    <ul className="mx-auto flex w-full max-w-3xl flex-wrap justify-center gap-x-2 gap-y-1 px-6 text-base sm:px-12 sm:text-sm">
      {NAV_ITEMS.map((item) => (
        <li key={item.href}>
          {item.external ? (
            <ExternalLink className={NAV_LINK_CLASS} href={item.href}>
              {item.label}
            </ExternalLink>
          ) : (
            <Link className={NAV_LINK_CLASS} href={item.href}>
              {item.label}
            </Link>
          )}
        </li>
      ))}
    </ul>
  </nav>
);

export { BottomNav };
