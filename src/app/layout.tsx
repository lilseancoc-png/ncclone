import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ProgressProvider } from "@/hooks/useProgress";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Neetcode 150 - Practice Problems",
  description:
    "Master 150 curated LeetCode problems with explanations, time and space complexity analysis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <ProgressProvider>{children}</ProgressProvider>
      </body>
    </html>
  );
}
