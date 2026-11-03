
import type { Metadata } from "next";

import Hero from "@/components/inicio/Hero";
import Nosotros from "@/components/inicio/Nosotros";
import Servicios from "@/components/inicio/Servicios";
import Operaciones from "@/components/inicio/Operaciones";
import Cta from "@/components/shared/Cta";

export const metadata: Metadata = {
  title: "Agencia de Carga Internacional en Perú",
  description:
    "Somos Aurum Logistics, una agencia de carga internacional en Perú. Gestionamos y coordinamos transporte marítimo, aéreo y terrestre para empresas que importan y exportan.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    url: "/",
    title: "Agencia de Carga Internacional en Perú | Aurum Logistics",
    description:
      "Conectamos tu negocio con el mundo. Gestionamos y coordinamos operaciones de transporte internacional de carga para empresas que importan y exportan desde Perú.",
    siteName: "Aurum Logistics",
    locale: "es_PE",
  },

  twitter: {
    card: "summary_large_image",
    title: "Agencia de Carga Internacional en Perú | Aurum Logistics",
    description:
      "Gestionamos y coordinamos transporte internacional de carga marítima, aérea y terrestre para empresas que importan y exportan desde Perú.",
  },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Nosotros />
      <Servicios />
      <Operaciones />
      <Cta />
    </main>
  );
}
