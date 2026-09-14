import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NurApps — программы, которые можно прочитать",
  description:
    "Небольшая мастерская открытого кода: мессенджер, читалка, бот с релизами. Исходники на GitHub, без трекеров.",
  metadataBase: new URL("https://nurapps.dev"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "NurApps — программы, которые можно прочитать",
    description: "Открытый код без мелкого шрифта. 4 проекта, исходники на GitHub.",
    type: "website",
    locale: "ru_RU",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      </head>
      <body
        className={`${display.variable} ${body.variable} ${mono.variable} bg-paper text-ink antialiased`}
      >
        <a href="#main" className="skip-link">
          Перейти к содержимому
        </a>
        {children}
      </body>
    </html>
  );
}
