import Servicios from "@/components/inicio/Servicios"
import CardResponsabilidad from "@/components/ui/CardResponsabilidad"
import ServiciosLista from "@/components/responssabilidad/ServiciosLista"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import ContactoLista from "@/components/ui/ContactoLista"
import Cta from "@/components/ui/Cta"


export const metadata:Metadata={
    title:"Responsabilidad Social y Ambiental | Aurum Logistics",
    description:"Conoce el compromiso de Aurum con los derechos humanos, las buenas prácticas ambientales y la promoción de una actividad minera responsable.",
}
export default function Responsabilidad(){
    return(
        <main className="flex flex-col">
            <div className="mt-16 w-full h-48 flex flex-col items-center justify-center lg:h-72 bg-center bg-cover bg-no-repeat" style={{backgroundImage:"url('/images/bg-responsabilidad.webp')"}} >
                <p className="font-body font-bold text-white text-3xl">
                    RESPONSABILIDAD
                </p>
            </div>

            <div className="w-full max-w-7xl mx-auto px-3 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.5fr] gap-12 lg:gap-16">
                    <div className="flex flex-col">
                        <Image 
                        src={"/images/img-responsabilidad.webp"}
                        width={750}
                        height={490}
                        alt="imagen responsabilidad"
                        className="w-full h-auto"/>

                        <div className="mt-16">
                            <h1 className="font-heading text-4xl md:text-5xl lg:text-5xl font-bold uppercase tracking-wide leading-[1.05] text-balance mb-3">
                           Nuestro compromiso con una minería responsable
                            </h1>

                            <p className="font-body text-xl md:text-xl text-muted font-medium leading-snug text-pretty max-w-[60ch] [&_strong]:font-semibold">
                            Creemos que el comercio internacional debe desarrollarse con responsabilidad y respeto por las personas y el medio ambiente. Por ello, promovemos prácticas responsables en las operaciones vinculadas al sector minero, priorizando la formalidad, la trazabilidad y el cumplimiento de nuestros criterios de trabajo.
                            </p>

                            <CardResponsabilidad />

                        </div>
                    </div>

                    <div className="px-10 border-l border-border">
                        <h2 className="font-heading font-bold text-primary text-3xl uppercase tracking-wider">
                            SOLUCIONES PARA TU NEGOCIO
                        </h2>

                        <ServiciosLista />
                        <ContactoLista />
                    </div>
                </div>
            </div>

            <Cta />
        </main>
    )
}