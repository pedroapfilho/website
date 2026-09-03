import "./globals.css";

import type { Metadata } from "next";
import {
  Host_Grotesk as hostGroteskFont,
  IBM_Plex_Mono as ibmPlexMonoFont,
} from "next/font/google";

const hostGrotesk = hostGroteskFont({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-host",
});

const ibmPlexMono = ibmPlexMonoFont({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600", "700"],
});

const SOCIAL_DESCRIPTION =
  "Usually I work on the crypto space, as a product engineer, but you can find me working on other projects as well, just because I really like to learn new things.";

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
  <html
    className={`${hostGrotesk.variable} ${ibmPlexMono.variable}`}
    lang="en"
    suppressHydrationWarning
  >
    <body className="box-border flex min-h-dvh flex-col overscroll-none antialiased">
      <main className="isolate flex flex-1 flex-col">{children}</main>
    </body>
  </html>
);

export { metadata };

export default RootLayout;
