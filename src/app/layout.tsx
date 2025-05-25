import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import BrochureModalWrapper from "./components/BrochureModalWrapper";
import CookiesConsent from "./components/CookiesConsent";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ScrollToTopButton from "./components/ScrollToTopButton";
import { ModalProvider } from './contexts/ModalContext';

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
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-H7QZLBVJ9Q"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-H7QZLBVJ9Q');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ModalProvider>
          <Header />
          {children}
          <Footer />
          <ScrollToTopButton />
          <CookiesConsent />

          <Script src="https://static.elfsight.com/platform/platform.js" strategy="afterInteractive" />
          <div className="elfsight-app-2830778b-7002-437a-9a38-62689e615b39" data-elfsight-app-lazy></div>
          <BrochureModalWrapper />
        </ModalProvider>
      </body>
    </html>
  );
}