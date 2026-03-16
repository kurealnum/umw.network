import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "umw.network",
  description: "A webring for University of Mary Washington students",
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: "umw.network",
    description: "A webring for University of Mary Washington students",
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "umw.network",
    description: "A webring for University of Mary Washington students",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
