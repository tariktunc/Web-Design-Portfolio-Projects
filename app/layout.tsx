import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import Providers from "./Providers";
import MouseGradient from "./Components/MouseGradient/MouseGradient";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tariktunc.vercel.app"),
  title: {
    default: "Tarik Tunç — Full Stack Developer",
    template: "%s | Tarik Tunç",
  },
  description:
    "Full Stack Developer portfolio showcasing web development projects, blog posts, and technical skills. Built with Next.js, React, and TypeScript.",
  keywords: [
    "Full Stack Developer",
    "Web Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Tarik Tunç",
    "Portfolio",
  ],
  authors: [{ name: "Tarik Tunç", url: "https://tariktunc.vercel.app" }],
  creator: "Tarik Tunç",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tariktunc.vercel.app",
    siteName: "Tarik Tunç",
    title: "Tarik Tunç — Full Stack Developer",
    description:
      "Full Stack Developer portfolio showcasing web development projects, blog posts, and technical skills.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tarik Tunç — Full Stack Developer",
    description:
      "Full Stack Developer portfolio showcasing web development projects, blog posts, and technical skills.",
    creator: "@tarkktunc",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`} suppressHydrationWarning>
        <Providers>
          <a href="#main-content" className="skip-to-content">
            Skip to content
          </a>
          <MouseGradient />
          {children}
        </Providers>
      </body>
    </html>
  );
}
