import ServiciosLista from "@/components/responssabilidad/ServiciosLista";
import ContactoLista from "@/components/ui/ContactoLista";
import FormularioContacto from "@/components/ui/FormularioContacto";
import { Metadata } from "next";

export const metada:Metadata ={
    title:"Servicio Especial de Valorado | Aurum Logistics",
    description:"Conoce el servicio especial de valorado de Aurum Logistics y consulta cómo podemos ayudarte con los requerimientos logísticos de tu operación.",
}
export default function ServicioValorado(){
    return(
        <main className="flex flex-col">
             <div className="mt-16 w-full h-48 flex flex-col items-center justify-center lg:h-72 bg-center bg-cover bg-no-repeat" style={{backgroundImage:"url('/images/img-bg-aereo.webp')"}} >
                <p className="font-body font-bold text-white text-3xl lg:text-5xl">
                    VALORADO
                </p>
            </div>

             <div className="w-full max-w-7xl mx-auto px-3 py-16">
               <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.5fr] gap-12 lg:gap-12">
                     <div className="flex flex-col">
                        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold uppercase mb-4">
                            Hablemos de tu próxima operación logística.
                        </h2>
                        <FormularioContacto />
                     </div>

                      <div className="relative">
                            <div className="flex flex-col px-5 lg:px-10 lg:border-l lg:border-border mt-16 lg:mt-0 md:sticky md:top-20 md:z-10">
                                    <h2 className="font-heading font-bold text-primary text-3xl uppercase tracking-wider">
                                        +5 de Años de Experiencia
                                    </h2>
                                     <ServiciosLista />
                                    <ContactoLista />
                                </div>
                      </div>
                </div>
            </div>
        </main>
    )
}