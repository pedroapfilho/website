import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

const metadata: Metadata = {
  title: "Pedro Filho - Software Engineer",
  description: "Likes to write code sometimes",
  openGraph: {
    type: "website",
    title: "Pedro Filho - Software Engineer",
    description:
      "Usually I work on the crypto space, as a full-stack software engineer, but you can find me working on other projects as well, just because I really like to learn new things.",
    siteName: "Pedro Filho - Software Engineer",
    url: "https://pedroapfilho.com",
    images: ["https://pedroapfilho.com/profile.jpg"],
  },
  twitter: {
    card: "summary",
    title: "Pedro Filho - Software Engineer",
    description:
      "Usually I work on the crypto space, as a full-stack software engineer, but you can find me working on other projects as well, just because I really like to learn new things.",
    images: ["https://pedroapfilho.com/profile.jpg"],
    creator: "@pedroapfilho",
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en" suppressHydrationWarning className={ibmPlexMono.variable}>
    <body className="antialiased overscroll-none h-dvh box-border p-8 text-primary-foreground bg-primary font-mono">
      {children}
    </body>
  </html>
);

export { metadata };

export default RootLayout;
