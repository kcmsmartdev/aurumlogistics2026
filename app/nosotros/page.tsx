
import Link from "next/link"
import Image from "next/image"
import { Metadata } from "next"
import Cta from "@/components/ui/Cta"
import Mision from "@/components/ui/Mison"
import AurumGrupo from "@/components/ui/AurumGrupo"
import ServiciosLista from "@/components/responssabilidad/ServiciosLista"
import ContactoLista from "@/components/ui/ContactoLista"
import Contador from "@/components/ui/Contador"
import AnimEstadisticas from "@/components/ui/AnimEstadisticas"
import CardServicios from "@/components/nosotros/CardServicios"


export const metadata:Metadata={
    title:"Sobre Aurum Logistics | Logística Internacional en Perú",
    description:"Conoce Aurum Logistics S.A.C., empresa de logística internacional ubicada en el Callao, Perú, con más de cinco años de experiencia."
}
export default function Nosotros(){

    return(
        <main className="flex flex-col">
            <div className="w-full h-52 flex flex-col items-center justify-center lg:h-80  py-28 bg-center bg-cover bg-no-repeat" style={{backgroundImage:"url('/images/bg-services.webp')"}} >
                <p className="font-body font-bold text-white text-3xl lg:text-5xl">
                    SOBRE NOSOTROS
                </p>
            </div>
            <div className="w-full max-w-7xl mx-auto px-3 py-16">
               <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.5fr] gap-12 lg:gap-12">
                
                <div className="flex flex-col">
                     <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold uppercase mb-8">
                        Somos parte de tu cadena logística.
                    </h1>
                    <p className="font-body text-xl md:text-xl text-muted font-medium mb-4">
                        <strong><i>Aurum Logistics S.A.C.</i></strong> Nace como una iniciativa vinculada a <strong><i>Aurum Metals S.R.L.</i></strong> , empresa con experiencia en el sector de la pequeña minería y la minería artesanal, brindando soporte a proyectos de formalización y procesos orientados a la exportación.
                    </p>

                    <p className="font-body text-xl md:text-xl text-muted font-medium mb-4">
                        Con el propósito de ampliar las <strong>
                            <Link href={"/servicios"}>soluciones</Link></strong> relacionadas con el comercio internacional, surge <i>Aurum Logistics</i>, enfocada en la coordinación de operaciones de transporte internacional de mercancías para empresas importadoras y exportadoras, por vía <strong><Link href={"/servicios/transporte-aereo"}>aérea</Link></strong>, <strong><Link href={"/servicios/transporte-maritimo"}>marítima</Link></strong> y <strong><Link href={"/servicios/transporte-terrestre"}>terrestre</Link></strong>.
                    </p>

                    <p className="font-body text-xl md:text-xl text-muted font-medium mb-4">
                        Junto con Aurum Customs, especializada en agenciamiento aduanero, estas empresas participan en distintas etapas de las operaciones de comercio internacional, de acuerdo con las necesidades de cada cliente.
                    </p>

                    <p className="font-body text-xl md:text-xl text-muted font-medium ">
                        Desde el Callao, Perú, buscamos contribuir al desarrollo de las operaciones de nuestros clientes mediante una coordinación logística responsable, una comunicación clara y soluciones adaptadas a sus requerimientos.
                    </p> 

                    <CardServicios />
                    
                </div>


                <div className="relative">
                    <div className="flex flex-col px-5 lg:px-10 lg:border-l lg:border-border mt-16 lg:mt-0 md:sticky md:top-20 md:z-10">
                        <h2 className="font-heading font-bold text-primary text-3xl uppercase tracking-wider">
                            +5 de Años de Experiencia
                        </h2>
                        <Mision />
                        <ContactoLista />
                    </div>
                </div>
               </div>

               
            </div>

            <div className="w-full mt-16">
                    <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3902.289659118594!2d-77.10731122517514!3d-12.023568688211427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105cb00205b27b9%3A0x67af4beaf4dd362!2sCENTRO%20A%C3%89REO%20COMERCIAL!5e0!3m2!1ses-419!2spe!4v1792607722493!5m2!1ses-419!2spe"
                    className="w-full h-100 md:h-150"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    title="Ubicación en Google Maps"
                />
                </div>
            <Cta />
        </main>
    )
}