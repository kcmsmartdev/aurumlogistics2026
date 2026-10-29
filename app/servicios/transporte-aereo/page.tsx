import ServiciosLista from "@/components/responssabilidad/ServiciosLista";
import ContactoLista from "@/components/ui/ContactoLista";
import FormularioContacto from "@/components/ui/FormularioContacto";
import { Metadata } from "next";
import Link from "next/link";
import { IconType } from "react-icons";
import { RiTimeLine } from "react-icons/ri";
import { FaUserGroup } from "react-icons/fa6";
import { VscTypeHierarchy } from "react-icons/vsc";
import Image from "next/image";
import Cta from "@/components/ui/Cta";


export const metada:Metadata ={
    title:"Transporte Aéreo Internacional de Carga | Aurum Logistics",
    description:"Transporte aéreo internacional de carga para empresas que importan y exportan desde Perú. Coordina tu operación con Aurum Logistics y solicita una cotización.",
}

interface Beneficios{
    icon:IconType,
    title:string,
    description:string,
}


const cardBeneficos:Beneficios[]=[
    {icon:RiTimeLine, title:"Tiempos y presupuesto", description:"Evaluación según los requerimientos de tu envío"},
    {icon:FaUserGroup, title:"Atención personalizada", description:"Coordinación de acuerdo con tu operación."},
    {icon:VscTypeHierarchy, title:"Gestión logística", description:"Organización de las gestiones necesarias para el envío."},
]

interface Servicio {
    name:string,
    img:string,
    href:string,
}

const cardServicios:Servicio[]=[
    {name:"Transporte Marítimo", img:"/images/servicio-maritimo.webp", href:"/servicios/transporte-maritimo"},
    {name:"Transporte Terrestre", img:"/images/servicio-terrestre.webp", href:"/servicios/transporte-terrestre"},
]
export default function TransporteAereo(){
    return(
        <main className="flex flex-col">
             <div className=" relative w-full h-auto py-28 flex flex-col items-center justify-center  bg-center bg-cover bg-no-repeat" style={{backgroundImage:"url('/images/img-bg-aereo.webp')"}} >
                <div className="absolute inset-0 bg-linear-to-r from-black to-primary/60 z-0 opacity-95"></div>
                <div className="relative z-20 max-w-7xl mx-auto w-full px-3 py-2 flex flex-col gap-4">
                    
                    <h1 className="font-heading font-bold text-white text-4xl lg:text-6xl max-w-2xl uppercase mb-2">
                        Transporte aéreo internacional de carga
                    </h1>
                    <p className="font-body text-base md:text-lg text-muted-reverse max-w-2xl mb-4">
                        Gestionamos y coordinamos el transporte aéreo internacional para empresas que necesitan importar o exportar mercancías desde Perú.
                    </p>

                    <div className="hidden sm:flex flex-row gap-5 py-6 mt-3">
                        <span className="font-body text-muted-reverse font-medium tracking-wider text-xs px-3 py-2.5 bg-secondary/20 rounded-4xl">Importaciones</span>
                        <span className="font-body text-muted-reverse font-medium tracking-wider text-xs px-3 py-2.5 bg-secondary/20 rounded-4xl">Exportaciones</span>
                        <span className="font-body text-muted-reverse font-medium tracking-wider text-xs px-3 py-2.5 bg-secondary/20 rounded-4xl">Carga internacional</span>
                    </div>

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
                             Conecta tu negocio con nuevos mercados
                            </h2>
                            <p className="font-body text-base md:text-lg text-muted mb-4">
                                El transporte aéreo es una alternativa para las operaciones internacionales que requieren evaluar cuidadosamente los tiempos de envío y las características de la mercancía.
                            </p>

                            <p className="font-body text-base md:text-lg text-muted">
                                En <strong>Aurum Logistics</strong> coordinamos las necesidades de tu operación para ayudarte a evaluar las opciones disponibles para el traslado de tu carga, tanto en importaciones como en exportaciones. Objetivo de esta sección: explicar qué es el servicio, para quién está pensado y por qué puede ser una alternativa adecuada.
                            </p>
                        </div>

                        <div className=" flex flex-col items-center mt-20 px-5 py-8 bg-gray rounded-4xl">
                            <span className="font-heading text-xs font-semibold tracking-wide text-muted text-center">BENEFICIOS</span>
                            <h2 className="font-heading font-semibold text-2xl mt-4 text-center">
                                Una gestión logística alineada con tu operación
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-8">
                                {cardBeneficos.map((card)=>{
                                    const Icon = card.icon
                                    return(
                                        <article key={card.title}
                                        className="bg-secondary w-full rounded-4xl p-6 border-b-4 border-r-4 border-primary">
                                            <Icon className="size-6 text-black mb-3" />
                                            <h3 className="font-heading font-bold text-base mb-1.5">
                                                {card.title}
                                            </h3>
                                            <p className="font-body text-black text-sm">
                                                {card.description}
                                            </p>
                                        </article>
                                    )
                                })}
                            </div>

                        </div>

                        <div className="w-full mt-28 mx-auto flex flex-col items-center mb-20">
                            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl">
                                Encuentra la alternativa adecuada para tu carga
                            </h2>
                        
                            <ul className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {
                                        cardServicios.map((child)=>(
                                            <Link href={child.href}
                                                key={child.name}
                                                className="group relative mx-auto w-full max-w-96 overflow-hidden"
                                                >
                                                <Image
                                                    src={child.img}
                                                    alt={child.name}
                                                    width={750}
                                                    height={550}
                                                    className="h-auto w-full min-w-100"
                                                />

                                                <div className="pt-3 md:absolute md:inset-0 md:flex md:translate-y-full md:items-center md:justify-center md:bg-primary/60 md:p-4 md:pt-4 md:transition-transform md:duration-500 md:ease-out md:group-hover:translate-y-0 motion-reduce:md:transition-none">
                                                    <p className="text-center font-heading text-lg font-bold uppercase tracking-wide text-primary md:translate-y-3 md:text-xl md:text-white md:opacity-0 md:transition-[opacity,transform] md:delay-100 md:duration-500 md:ease-out md:group-hover:translate-y-0 md:group-hover:opacity-100 motion-reduce:md:transition-none">
                                                    {child.name}
                                                    </p>
                                                </div>
                                            </Link>
                                        )) 
                                    }
                            </ul>
                        </div>
                        <FormularioContacto />
                     </div>

                      <div className="relative">
                            <div className="flex flex-col px-5 lg:px-10 lg:border-l lg:border-border mt-16 lg:mt-0 md:sticky md:top-20 md:z-10">
                                    
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