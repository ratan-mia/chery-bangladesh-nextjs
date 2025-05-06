import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import CookiesConsent from "./components/CookiesConsent"; // We'll create this
import Footer from "./components/Footer";
import Header from "./components/Header";
import ScrollToTopButton from "./components/ScrollToTopButton";

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
  title: "Chery Bangladesh",
  description: "Official website of Chery Automobiles in Bangladesh",
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
      >
        <Header />
        {children}
        <Footer />
        <ScrollToTopButton />
        {/* <ClientLoadingWrapper /> */}
        <CookiesConsent />

        <script src="https://static.elfsight.com/platform/platform.js" async></script>
        <div className="elfsight-app-2830778b-7002-437a-9a38-62689e615b39" data-elfsight-app-lazy></div>

      </body>
    </html>
  );
}