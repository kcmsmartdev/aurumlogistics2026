import type { Metadata } from "next";
import { DM_Sans, Momo_Trust_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

const heading = Momo_Trust_Sans({
  variable:"--font-heading",
  subsets:["latin"],
  weight:["700"],
  display:"swap"

})

const body = DM_Sans({
  variable: "--fon-body",
  subsets:["latin"],
  weight:"400",
  display:"swap"
})

export const metadata: Metadata = {
  title: "Agencia de Carga Internacional en Perú | Aurum Logistics",
  description: "Gestionamos y coordinamos transporte internacional de carga marítima, aérea y terrestre para empresas que importan y exportan desde Perú.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${heading.variable} ${body.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
