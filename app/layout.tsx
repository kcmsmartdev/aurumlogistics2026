
import type { Metadata } from "next";
import { Teachers, DM_Sans } from "next/font/google";
import "./globals.css";

import CookieBanner from "@/components/shared/CookieBanner";
import GoogleAnalyticsConsent from "@/components/shared/GoogleAnalyticsConsent";

const heading = Teachers({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  display: "swap",
});

const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aurumlogistics.com.pe"),

  title: {
    default: "Agencia de Carga Internacional en Perú | Aurum Logistics",
    template: "%s | Aurum Logistics",
  },

  description:
    "Gestionamos y coordinamos transporte internacional de carga marítima, aérea y terrestre para empresas que importan y exportan desde Perú.",

  applicationName: "Aurum Logistics",

  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "https://aurumlogistics.com.pe",
    siteName: "Aurum Logistics",
    title: "Agencia de Carga Internacional en Perú | Aurum Logistics",
    description:
      "Gestionamos y coordinamos transporte internacional de carga marítima, aérea y terrestre para empresas que importan y exportan desde Perú.",
  },

  twitter: {
    card: "summary_large_image",
    title: "Agencia de Carga Internacional en Perú | Aurum Logistics",
    description:
      "Gestionamos y coordinamos transporte internacional de carga marítima, aérea y terrestre para empresas que importan y exportan desde Perú.",
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
    <html
      lang="es"
      className={`${heading.variable} ${body.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col">
        {children}

        <CookieBanner />
        <GoogleAnalyticsConsent />
      </body>
    </html>
  );
}
