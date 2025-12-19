import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Free Excel Formula Generator - AI-Powered & Instant",
  description:
    "Generate Excel and Google Sheets formulas instantly with AI. Get detailed explanations, examples, and alternatives. No signup required, 25 free requests daily.",
  keywords: [
    "excel formula generator",
    "google sheets formulas",
    "AI formula",
    "spreadsheet help",
    "VLOOKUP generator",
    "IF formula",
    "excel help free",
  ],
  openGraph: {
    title: "Free Excel Formula Generator",
    description:
      "AI-powered Excel & Google Sheets formula generator. No signup required!",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Excel Formula Generator",
    description: "Generate Excel formulas with AI in seconds",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
