import ServiciosLista from "@/components/responssabilidad/ServiciosLista";
import ContactoLista from "@/components/ui/ContactoLista";
import FormularioContacto from "@/components/ui/FormularioContacto";
import { Metadata } from "next";
import Link from "next/link";

import { IoIosLock } from "react-icons/io";
import { MdSecurity } from "react-icons/md";
import { RiMindMap } from "react-icons/ri";
import { IconType } from "react-icons";

export const metada:Metadata ={
    title:"Logística para Exportación de Minerales | Aurum Logistics",
    description:"Coordinamos la logística para la exportación de minerales desde Perú hacia mercados internacionales, con especial atención a la confidencialidad y los requerimientos de cada operación.",
}

interface Beneficios{
    icon:IconType,
    title:string,
    description:string,
}


const cardBeneficos:Beneficios[]=[
    {icon:RiMindMap, title:"Gestión y coordinación logística", description:"Articulamos las distintas etapas y a los participantes involucrados en la exportación, considerando las necesidades específicas de cada operación."},
    {icon:IoIosLock, title:"Confidencialidad en cada operación", description:"Entendemos la sensibilidad de este tipo de envíos. Por ello, damos especial importancia a la discreción y al manejo responsable de la información de nuestros clientes."},
    {icon:MdSecurity, title:"Atención a la seguridad y la formalidad", description:"Coordinamos las operaciones con especial cuidado y atención a los procedimientos aplicables, manteniendo nuestro compromiso con las buenas prácticas de la minería formal y artesanal."},

]
export default function ServicioValorado(){
    return(
        <main className="flex flex-col">
             <div className=" relative w-full h-auto py-28 flex flex-col items-center justify-center  bg-center bg-cover bg-no-repeat" style={{backgroundImage:"url('/images/img-bg-valorado.webp')"}} >
                <div className="absolute inset-0 bg-linear-to-r from-black to-primary/60 z-0 opacity-95"></div>
                <div className="relative z-20 max-w-7xl mx-auto w-full px-3 py-2 flex flex-col gap-5">
                    
                    <h1 className="font-heading font-bold text-white text-4xl lg:text-6xl max-w-4xl uppercase mb-2">
                        Coordinamos la exportación de minerales con experiencia y confidencialidad
                    </h1>
                    <p className="font-body text-base md:text-lg text-muted-reverse max-w-4xl mb-4">
                        Gestionamos y coordinamos las etapas logísticas de exportación de minerales desde Perú hacia mercados internacionales, como Europa y Asia. Nuestro conocimiento del proceso y la atención a los detalles nos permiten acompañar cada operación con discreción, responsabilidad y cuidado.
                    </p>

                   
                    <Link href="/contacto" 
                    className="w-fit font-body text-white bg-primary py-5 px-8 group "> 
                        <span className="inline-block font-bold uppercase transition-transform duration-300 ease-in-out group-hover:scale-105">
                            Solicitar una cotización
                        </span>
                    </Link>
                </div>
            </div>

             <div className="w-full max-w-7xl mx-auto px-3 py-16">
               <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.5fr] gap-12 lg:gap-12">
                     <div className="flex flex-col">
                        <div>
                            <h2 className="font-heading text-3xl lg:text-5xl font-bold mb-4 tracking-tight leading-tight">
                                Conocemos las exigencias de la exportación de minerales
                            </h2>
                            <p className="font-body text-base md:text-lg text-muted mb-4">
                                La exportación de minerales requiere una coordinación cuidadosa de los procesos logísticos, la documentación y los participantes que intervienen en cada operación. Comprender estas etapas es fundamental para atender los requerimientos de un sector que exige especial atención y discreción.
                            </p>

                            <p className="font-body text-base md:text-lg text-muted">
                                En <strong>Aurum Logistics</strong> trabajamos con empresas vinculadas a la minería, coordinando sus operaciones de exportación y los aspectos logísticos necesarios para su desarrollo. Nuestra experiencia en estos procesos nos permite acompañar a nuestros clientes desde una perspectiva especializada, considerando las particularidades de cada envío y su destino internacional.
                            </p>
                        </div>

                        <div className=" flex flex-col items-center mt-20 px-5 py-8 bg-gray rounded-4xl mb-20">
                            <span className="font-heading text-xs font-semibold tracking-wide text-muted text-center">BENEFICIOS</span>
                            <h2 className="font-heading font-semibold text-2xl mt-4 text-center">
                                Una gestión logística alineada con tu operación
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-8">
                                {cardBeneficos.map((card)=>{
                                    const Icon = card.icon
                                    return(
                                        <article key={card.title}
                                        className="bg-black w-full rounded-4xl p-6 border-b-4 border-r-4 border-secondary">
                                            <Icon className="size-6 text-secondary mb-3" />
                                            <h3 className="font-heading font-bold text-base text-white mb-1.5">
                                                {card.title}
                                            </h3>
                                            <p className="font-body text-muted-reverse text-sm">
                                                {card.description}
                                            </p>
                                        </article>
                                    )
                                })}
                            </div>

                        </div>

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