import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geist = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "Vibe Inc.",
    template: "%s | Vibe Inc.",
  },
  description:
    "The Future of Building is Here. Vibe coding education from WVibe (Western University) and QVibe (Queen's University).",
  openGraph: {
    siteName: "Vibe Inc.",
    title: "Vibe Inc. — The Future of Building is Here",
    description:
      "Vibe coding education from WVibe and QVibe. Learn to build apps with AI — no CS degree required.",
    type: "website",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vibe Inc. — The Future of Building is Here",
    description:
      "Vibe coding education from WVibe and QVibe. Learn to build apps with AI — no CS degree required.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
