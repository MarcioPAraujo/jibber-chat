import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Orkut",
  description:
    "A simple chat application built with Next.js and TypeScript. Inspired by the classic Orkut social network.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${poppins.className}`}
        style={{ height: "100dvh", width: "100dvw" }}
      >
        {children}
      </body>
    </html>
  );
}
