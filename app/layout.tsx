import type { Metadata } from "next";
import Link from "next/link";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

const metadata: Metadata = {
  title: "Pedro Filho - Product Engineer",
  description: "Likes to write code sometimes",
  openGraph: {
    type: "website",
    title: "Pedro Filho - Product Engineer",
    description:
      "Usually I work on the crypto space, as a product engineer, but you can find me working on other projects as well, just because I really like to learn new things.",
    siteName: "Pedro Filho - Product Engineer",
    url: "https://pedroapfilho.com",
    images: ["https://pedroapfilho.com/profile.jpg"],
  },
  twitter: {
    card: "summary",
    title: "Pedro Filho - Product Engineer",
    description:
      "Usually I work on the crypto space, as a product engineer, but you can find me working on other projects as well, just because I really like to learn new things.",
    images: ["https://pedroapfilho.com/profile.jpg"],
    creator: "@pedroapfilho",
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en" suppressHydrationWarning className={ibmPlexMono.variable}>
    <body className="flex min-h-dvh flex-col box-border bg-primary font-mono text-primary-foreground antialiased overscroll-none">
      {children}
      <nav aria-label="Primary" className="w-full bg-primary px-4 py-4">
        <ul
          role="list"
          className="mx-auto flex max-w-2xl flex-wrap justify-center gap-x-2 gap-y-1 text-base sm:text-sm"
        >
          <li>
            <a
              href="https://github.com/pedroapfilho"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg px-2 py-2 font-normal no-underline text-inherit hover:bg-primary-foreground hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Code
            </a>
          </li>
          <li>
            <a
              href="https://x.com/pedroapfilho"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg px-2 py-2 font-normal no-underline text-inherit hover:bg-primary-foreground hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              X
            </a>
          </li>
          <li>
            <Link
              href="/resume"
              className="rounded-lg px-2 py-2 font-normal no-underline text-inherit hover:bg-primary-foreground hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Resume
            </Link>
          </li>
          <li>
            <Link
              href="/oss"
              className="rounded-lg px-2 py-2 font-normal no-underline text-inherit hover:bg-primary-foreground hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              OSS
            </Link>
          </li>
          <li>
            <Link
              href="/uses"
              className="rounded-lg px-2 py-2 font-normal no-underline text-inherit hover:bg-primary-foreground hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              /uses
            </Link>
          </li>
          <li>
            <a
              href="https://youtube.com/c/ohmyfunction"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg px-2 py-2 font-normal no-underline text-inherit hover:bg-primary-foreground hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2"
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
