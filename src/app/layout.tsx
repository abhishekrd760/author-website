import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CosmicBackground from "@/components/CosmicBackground";
import CosmicCursor from "@/components/CosmicCursor";
import LoadingScreen from "@/components/LoadingScreen";
import PageTransition from "@/components/PageTransition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Kazutoshi Yoshida - Author",
  description: "Official website of bestselling author Kazutoshi Yoshida. Discover his latest books, read reviews, and connect with the author.",
  keywords: "Kazutoshi Yoshida, author, books, fiction, romance, fantasy, bestselling",
  openGraph: {
    title: "Kazutoshi Yoshida - Author",
    description: "Official website of bestselling author Kazutoshi Yoshida",
    type: "website",
    locale: "en_US",
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
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansJP.variable} antialiased min-h-screen flex flex-col`}
      >
        <LoadingScreen />
        <CosmicBackground />
        <CosmicCursor />
        <Navbar />
        <main className="flex-grow relative z-10">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
