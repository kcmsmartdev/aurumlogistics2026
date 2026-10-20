import { Metadata } from "next";
import Hero from "@/components/inicio/Hero";
import Nosotros from "@/components/inicio/Nosotros";
import Servicios from "@/components/inicio/Servicios";
import Operaciones from "@/components/inicio/Operaciones";
import Cta from "@/components/ui/Cta"
export const metadata:Metadata ={
  title:"Inicio",
  description:"dsdsdsd"
}

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
