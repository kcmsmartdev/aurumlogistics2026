import ServiciosLista from "@/components/responssabilidad/ServiciosLista";
import ContactoLista from "@/components/ui/ContactoLista";
import FormularioContacto from "@/components/ui/FormularioContacto";
import Link from "next/link";
import { Metadata } from "next";
import { FaRegCircleCheck } from "react-icons/fa6";
import { IconType } from "react-icons";
import { LuNotepadText } from "react-icons/lu";
import { IoBoatSharp } from "react-icons/io5";
import { PiHeadsetBold } from "react-icons/pi";
import { RiAppsLine } from "react-icons/ri";
import Image from "next/image";

interface Beneficios{
    icon:IconType,
    title:string,
    description:string,
}


const cardBeneficos:Beneficios[]=[
    {icon:RiAppsLine, title:"Evaluación de cada operación", description:"Revisamos la información de tu envío para identificar las alternativas de transporte marítimo que se ajusten a sus características."},
    {icon:PiHeadsetBold, title:"Atención personalizada", description:"Coordinamos contigo los detalles de la operación para comprender tus requerimientos y orientarte durante el proceso."},
    {icon:IoBoatSharp, title:"Coordinación del transporte internacional", description:"Organizamos la coordinación logística de tu carga marítima de acuerdo con las condiciones de la operación."},
    {icon:LuNotepadText, title:"Seguimiento de la operación", description:"Consulta el estado de tus operaciones a través del acceso de seguimiento habilitado para nuestros clientes."},
]

interface Servicio {
    name:string,
    img:string,
    href:string,
}

const cardServicios:Servicio[]=[
    {name:"Transporte Aéreo", img:"/images/servicio-aereo.webp", href:"/servicios/transporte-aereo"},
    {name:"Transporte Terrestre", img:"/images/servicio-terrestre.webp", href:"/servicios/transporte-terrestre"},
]

export const metada:Metadata ={
    title:"Transporte Marítimo Internacional de Carga | Aurum Logistics",
    description:"Transporte marítimo internacional de carga para empresas que importan y exportan desde Perú. Coordina tu operación con Aurum Logistics y solicita una cotización.",
}


export default function TransporteMarítimo(){
    return(
        <main className="flex flex-col">
             <div className=" relative w-full h-auto py-28 flex flex-col items-center justify-center  bg-center bg-cover bg-no-repeat" style={{backgroundImage:"url('/images/img-bg-maritimo.webp')"}} >
                <div className="absolute inset-0 bg-linear-to-r from-black to-primary/60 z-0 opacity-95"></div>
                <div className="relative z-20 max-w-7xl mx-auto w-full px-3 py-2 flex flex-col gap-5">
                    
                    <h1 className="font-heading font-bold text-white text-4xl lg:text-6xl max-w-4xl uppercase mb-2">
                        Transporte marítimo internacional de carga
                    </h1>
                    <p className="font-body text-base md:text-lg text-muted-reverse max-w-4xl mb-4">
                        Coordinamos el transporte marítimo de mercancías para empresas que importan y exportan desde Perú. Te acompañamos en la planificación de tu operación, considerando el origen, el destino y las necesidades de tu carga.
                    </p>

                    <div className="flex flex-col gap-4 mb-5">
                        <div className="flex flex-row gap-2 items-center">
                            <FaRegCircleCheck className="size-4 text-secondary"/>
                            <p className="font-body text-sm text-muted-reverse">Coordinación de operaciones de importación y exportación</p>
                        </div>

                        <div className="flex flex-row gap-2 items-center">
                            <FaRegCircleCheck className="size-4 text-secondary"/>
                            <p className="font-body text-sm text-muted-reverse">Atención adaptada a los requerimientos de tu empresa</p>
                        </div>

                        <div className="flex flex-row gap-2 items-center">
                            <FaRegCircleCheck className="size-4 text-secondary"/>
                            <p className="font-body text-sm text-muted-reverse">Seguimiento de tus operaciones mediante nuestra plataforma</p>
                        </div>
                       
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
                                Conecta tu negocio con mercados internacionales
                            </h2>
                            <p className="font-body text-base md:text-lg text-muted mb-4">
                                El transporte marítimo internacional es una alternativa para las empresas que necesitan trasladar mercancías entre países y organizar sus operaciones de comercio exterior.
                            </p>

                            <p className="font-body text-base md:text-lg text-muted">
                                En <strong>Aurum Logistics</strong> coordinamos el transporte marítimo de carga de acuerdo con las características de cada operación. Consideramos la información del envío para ayudarte a evaluar las alternativas disponibles y avanzar con una propuesta acorde con las necesidades de tu negocio.
                            </p>
                        </div>

                        <div className=" flex flex-col items-center mt-20 px-5 py-8 bg-gray rounded-4xl mb-20">
                            <span className="font-heading text-xs font-semibold tracking-wide text-muted text-center">BENEFICIOS</span>
                            <h2 className="font-heading font-semibold text-2xl mt-4 text-center">
                                Una gestión logística alineada con tu operación
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
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