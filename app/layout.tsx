import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import Providers from "./Providers";
import MouseGradient from "./Components/MouseGradient/MouseGradient";
import AnimatedBackground from "./Components/Background/AnimatedBackground";
import CookieConsent from "./Components/CookieConsent/CookieConsent";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tariktunc.vercel.app"),
  title: {
    default: "Tarık Tunç — Full Stack Geliştirici",
    template: "%s | Tarık Tunç",
  },
  description:
    "Tarik Tunç — React, Next.js ve TypeScript ile modern web uygulamaları geliştiren Full Stack Developer. 9+ müşteri projesi, açık kaynak çalışmaları ve teknik blog yazıları.",
  keywords: [
    "Full Stack Developer",
    "Web Developer",
    "Yazılım Geliştirici",
    "Web Geliştirme",
    "Frontend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Tarik Tunç",
    "Portfolio",
  ],
  authors: [{ name: "Tarik Tunç", url: "https://tariktunc.vercel.app" }],
  creator: "Tarik Tunç",
  alternates: {
    canonical: "https://tariktunc.vercel.app",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    alternateLocale: ["en_US"],
    url: "https://tariktunc.vercel.app",
    siteName: "Tarık Tunç — Full Stack Geliştirici",
    title: "Tarık Tunç — Full Stack Geliştirici Portfolyo",
    description:
      "React, Next.js ve TypeScript ile modern web uygulamaları geliştiren Full Stack Developer. Projeler, blog yazıları ve teknik beceriler.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Tarık Tunç — Full Stack Geliştirici",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tarık Tunç — Full Stack Geliştirici",
    description:
      "React, Next.js ve TypeScript ile modern web uygulamaları geliştiren Full Stack Geliştirici.",
    creator: "@tarkktunc",
    images: ["/opengraph-image"],
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
    <html lang="tr" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans`} suppressHydrationWarning>
        <Providers>
          <a href="#main-content" className="skip-to-content">
            İçeriğe geç
          </a>
          <MouseGradient />
          <AnimatedBackground />
          <div className="site-container">
            {children}
          </div>
          <CookieConsent />
        </Providers>
      </body>
    </html>
  );
}
