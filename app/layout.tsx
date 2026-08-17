import "./globals.css";

import type { Metadata } from "next";
import { IBM_Plex_Mono as ibmPlexMonoFont } from "next/font/google";
import Link from "next/link";

import { ExternalLink } from "./external-link";

const ibmPlexMono = ibmPlexMonoFont({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600", "700"],
});

const SOCIAL_DESCRIPTION =
  "Usually I work on the crypto space, as a product engineer, but you can find me working on other projects as well, just because I really like to learn new things.";

const NAV_LINK_CLASS =
  "hover:bg-primary-foreground hover:text-primary rounded-lg px-2 py-2 font-normal text-inherit no-underline focus-visible:outline-2 focus-visible:outline-offset-2";

type NavItem = {
  external: boolean;
  href: string;
  label: string;
};

const NAV_ITEMS: Array<NavItem> = [
  { external: true, href: "https://github.com/pedroapfilho", label: "Code" },
  { external: true, href: "https://x.com/pedroapfilho", label: "X" },
  { external: false, href: "/resume", label: "Resume" },
  { external: false, href: "/side", label: "Side" },
  { external: false, href: "/uses", label: "/uses" },
  { external: true, href: "https://youtube.com/c/ohmyfunction", label: "Youtube" },
];

const metadata: Metadata = {
  description: "Likes to write code sometimes",
  openGraph: {
    description: SOCIAL_DESCRIPTION,
    images: ["https://pedroapfilho.com/profile.jpg"],
    siteName: "Pedro Filho - Product Engineer",
    title: "Pedro Filho - Product Engineer",
    type: "website",
    url: "https://pedroapfilho.com",
  },
  title: {
    default: "Pedro Filho - Product Engineer",
    template: "%s - Pedro Filho",
  },
  twitter: {
    card: "summary",
    creator: "@pedroapfilho",
    description: SOCIAL_DESCRIPTION,
    images: ["https://pedroapfilho.com/profile.jpg"],
    title: "Pedro Filho - Product Engineer",
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html className={ibmPlexMono.variable} lang="en" suppressHydrationWarning>
    <body className="box-border flex min-h-dvh flex-col overscroll-none antialiased">
      <main className="isolate flex flex-1 flex-col">{children}</main>
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
    </body>
  </html>
);

export { metadata };

export default RootLayout;
