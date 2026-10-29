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
            <div className="w-full h-52 flex flex-col items-center justify-center lg:h-80  py-28 bg-center bg-cover bg-no-repeat" style={{backgroundImage:"url('/images/bg-responsabilidad.webp')"}} >
                <p className="font-body font-bold text-white text-3xl lg:text-5xl">
                    RESPONSABILIDAD
                </p>
            </div>

            <div className="w-full max-w-7xl mx-auto px-3 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.5fr] gap-12 lg:gap-12">
                    <div className="flex flex-col">
                        <Image 
                        src={"/images/img-responsabilidad.webp"}
                        width={750}
                        height={490}
                        alt="imagen responsabilidad"
                        className="w-full h-auto"/>

                        <div className="mt-16">
                            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold uppercase mb-4">
                           Nuestro compromiso con una minería responsable
                            </h1>

                            <p className="font-body text-xl md:text-xl text-muted font-medium">
                            Creemos que el comercio internacional debe desarrollarse con responsabilidad y respeto por las personas y el medio ambiente. Por ello, promovemos prácticas responsables en las operaciones vinculadas al sector minero, priorizando la formalidad, la trazabilidad y el cumplimiento de nuestros criterios de trabajo.
                            </p>

                            <CardResponsabilidad />

                        </div>
                    </div>

                    <div className="relative">
                            <div className="px-5 lg:px-10 lg:border-l lg:border-border mt-16 lg:mt-0 sticky top-20 z-10">
        
                            <ServiciosLista />
                            <ContactoLista />
                        </div>
                    </div>
                </div>
            </div>

            <Cta />
        </main>
    )
}