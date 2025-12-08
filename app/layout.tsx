import type { Metadata } from "next";
import "./globals.css";

const metadata: Metadata = {
  title: "Pedro Filho - Software Engineer",
  description: "Likes to write code sometimes",
  openGraph: {
    type: "website",
    title: "Pedro Filho - Software Engineer",
    description: "Likes to write code sometimes",
    siteName: "Pedro Filho - Software Engineer",
    url: "https://pedroapfilho.com",
    images: ["https://pedroapfilho.com/profile.jpg"],
  },
  twitter: {
    card: "summary",
    title: "Pedro Filho - Software Engineer",
    description: "Likes to write code sometimes",
    images: ["https://pedroapfilho.com/profile.jpg"],
    creator: "@pedroapfilho",
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body>{children}</body>
  </html>
);

export { metadata };

export default RootLayout;
