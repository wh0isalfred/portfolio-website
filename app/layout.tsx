import type { Metadata } from "next";
import { bluuNext, sentient } from "./fonts";
import "./globals.css";
import Atmosphere from "./components/Atmosphere";

export const metadata: Metadata = {
  title: "Alfred Enyinna — Full Stack Engineer",
  description:
    "Alfred Enyinna — full-stack engineer and aspiring cybersecurity specialist. Selected work.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bluuNext.variable} ${sentient.variable}`}>
      <body>
        <Atmosphere />
        {children}
      </body>
    </html>
  );
}