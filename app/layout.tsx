import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import Script from "next/script"; // 1. Imported the Next.js Script component

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.footballpulse.online"),
  title: {
    default: "Football Pulse | Live Football Scores, News & Stats",
    template: "%s | Football Pulse"
  },
  description: "The ultimate football platform for real-time live scores, breaking news, detailed match stats, and league tables from around the world.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Football Pulse | Live Football Scores, News & Stats",
    description: "The ultimate football platform for real-time live scores, breaking news, detailed match stats, and league tables from around the world.",
    url: "https://www.footballpulse.online",
    siteName: "Football Pulse",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Football Pulse | Live Football Scores, News & Stats",
    description: "The ultimate football platform for real-time live scores, breaking news, detailed match stats, and league tables from around the world.",
    creator: "@FootballPulse",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        {/* 2. Added your Google AdSense integration inside <head> */}
        <Script
          id="adsense-init"
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4539617495578445"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground pb-20 md:pb-0">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Football Pulse",
                "url": "https://www.footballpulse.online",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://www.footballpulse.online/search?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              })
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Football Pulse",
                "url": "https://www.footballpulse.online",
                "logo": "https://www.footballpulse.online/logo.png",
                "image": "https://www.footballpulse.online/logo.png"
              })
            }}
          />
          <Navbar />
          <main className="flex-1 flex flex-col w-full">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}