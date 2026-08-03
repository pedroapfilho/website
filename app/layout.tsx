import "./globals.css";

import type { Metadata } from "next";
import { IBM_Plex_Mono as ibmPlexMonoFont } from "next/font/google";
import Link from "next/link";

const ibmPlexMono = ibmPlexMonoFont({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600", "700"],
});

const metadata: Metadata = {
  description: "Likes to write code sometimes",
  openGraph: {
    description:
      "Usually I work on the crypto space, as a product engineer, but you can find me working on other projects as well, just because I really like to learn new things.",
    images: ["https://pedroapfilho.com/profile.jpg"],
    siteName: "Pedro Filho - Product Engineer",
    title: "Pedro Filho - Product Engineer",
    type: "website",
    url: "https://pedroapfilho.com",
  },
  title: "Pedro Filho - Product Engineer",
  twitter: {
    card: "summary",
    creator: "@pedroapfilho",
    description:
      "Usually I work on the crypto space, as a product engineer, but you can find me working on other projects as well, just because I really like to learn new things.",
    images: ["https://pedroapfilho.com/profile.jpg"],
    title: "Pedro Filho - Product Engineer",
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html className={ibmPlexMono.variable} lang="en" suppressHydrationWarning>
    <body className="bg-primary text-primary-foreground box-border flex min-h-dvh flex-col overscroll-none font-mono antialiased">
      {children}
      <nav aria-label="Primary" className="bg-primary w-full py-4 print:hidden">
        <ul className="mx-auto flex w-full max-w-2xl flex-wrap justify-center gap-x-2 gap-y-1 px-6 text-base sm:px-12 sm:text-sm">
          <li>
            <a
              className="hover:bg-primary-foreground hover:text-primary rounded-lg px-2 py-2 font-normal text-inherit no-underline focus-visible:outline-2 focus-visible:outline-offset-2"
              href="https://github.com/pedroapfilho"
              rel="noopener noreferrer"
              target="_blank"
            >
              Code
            </a>
          </li>
          <li>
            <a
              className="hover:bg-primary-foreground hover:text-primary rounded-lg px-2 py-2 font-normal text-inherit no-underline focus-visible:outline-2 focus-visible:outline-offset-2"
              href="https://x.com/pedroapfilho"
              rel="noopener noreferrer"
              target="_blank"
            >
              X
            </a>
          </li>
          <li>
            <Link
              className="hover:bg-primary-foreground hover:text-primary rounded-lg px-2 py-2 font-normal text-inherit no-underline focus-visible:outline-2 focus-visible:outline-offset-2"
              href="/resume"
            >
              Resume
            </Link>
          </li>
          <li>
            <Link
              className="hover:bg-primary-foreground hover:text-primary rounded-lg px-2 py-2 font-normal text-inherit no-underline focus-visible:outline-2 focus-visible:outline-offset-2"
              href="/oss"
            >
              OSS
            </Link>
          </li>
          <li>
            <Link
              className="hover:bg-primary-foreground hover:text-primary rounded-lg px-2 py-2 font-normal text-inherit no-underline focus-visible:outline-2 focus-visible:outline-offset-2"
              href="/uses"
            >
              /uses
            </Link>
          </li>
          <li>
            <a
              className="hover:bg-primary-foreground hover:text-primary rounded-lg px-2 py-2 font-normal text-inherit no-underline focus-visible:outline-2 focus-visible:outline-offset-2"
              href="https://youtube.com/c/ohmyfunction"
              rel="noopener noreferrer"
              target="_blank"
            >
              Youtube
            </a>
          </li>
        </ul>
      </nav>
    </body>
  </html>
);

export { metadata };

export default RootLayout;
