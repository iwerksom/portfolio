import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jonas Schoustrup-Thomsen — AI Engineer & Frontend Developer",
  description:
    "24 years building for the web. Focused on AI solutions, platforms and the React ecosystem.",
  openGraph: {
    title: "Jonas Schoustrup-Thomsen",
    description: "AI solutions & platforms · Frontend Engineer · Copenhagen",
    url: "https://www.schoustrup-thomsen.dk",
    siteName: "Jonas Schoustrup-Thomsen",
    locale: "en_DK",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
