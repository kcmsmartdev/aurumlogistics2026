import { Metadata } from "next";
import Hero from "@/components/inicio/Hero";
import Nosotros from "@/components/inicio/Nosotros";
export const metadata:Metadata ={
  title:"Inicio",
  description:"dsdsdsd"
}

export default function Home() {
  return (
   <main>
      <Hero />
      <Nosotros />
   </main>
  );
}
