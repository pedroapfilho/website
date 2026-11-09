import "./globals.css";

import type { Metadata } from "next";
import { Host_Grotesk as hostGroteskFont } from "next/font/google";

import { X_USERNAME } from "@/lib/contact";
import { SITE_ORIGIN } from "@/lib/site";

const hostGrotesk = hostGroteskFont({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-host",
});

const SITE_TITLE = "Pedro Filho - Product Engineer";

const SOCIAL_DESCRIPTION =
  "Usually I work on the crypto space, as a product engineer, but you can find me working on other projects as well, just because I really like to learn new things.";

const metadata: Metadata = {
  description: "Likes to write code sometimes",
  metadataBase: new URL(SITE_ORIGIN),
  openGraph: {
    description: SOCIAL_DESCRIPTION,
    siteName: SITE_TITLE,
    title: SITE_TITLE,
    type: "website",
    url: SITE_ORIGIN,
  },
  title: {
    default: SITE_TITLE,
    template: "%s · Pedro Filho",
  },
  twitter: {
    card: "summary",
    creator: `@${X_USERNAME}`,
    description: SOCIAL_DESCRIPTION,
    title: SITE_TITLE,
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html className={hostGrotesk.variable} lang="en" suppressHydrationWarning>
    <body className="flex min-h-dvh flex-col overscroll-none antialiased">{children}</body>
  </html>
);

export { metadata };

export default RootLayout;
