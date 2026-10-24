import FormularioContacto from "@/components/ui/FormularioContacto";
import { Metadata } from "next"
import Link from "next/link"

import { BsFillTelephoneFill } from "react-icons/bs";
import { IoMail } from "react-icons/io5";
import { TbGpsFilled } from "react-icons/tb";

export const metadata:Metadata={
    title:"Contacto y Cotizaciones de Carga Internacional | Aurum Logistics",
    description:"Solicita una cotización para tus operaciones de importación o exportación. Contacta con Aurum Logistics en el Callao, Perú."
}
export default function Contacto(){
    return(
        <main className="flex flex-col relative">
             <div className="mt-16 w-full h-48 flex flex-col items-center justify-center lg:h-72 bg-center bg-cover bg-no-repeat" style={{backgroundImage:"url('/images/bg-services.webp')"}} >
                <p className="font-body font-bold text-white text-3xl lg:text-5xl">
                    CONTACTO
                </p>
            </div>

             <div className="w-full max-w-7xl mx-auto px-3 py-16">
               <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.5fr] gap-12 lg:gap-16">
                
                <div className="flex flex-col">
                     <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold uppercase mb-4">
                        Hablemos de tu próxima operación logística.
                    </h1>
                    <p className="font-body text-xl md:text-lg text-muted font-medium">
                       Completa el formulario con los detalles de tu operación y nuestro equipo podrá evaluar tu solicitud.
                    </p>

                    <FormularioContacto />
                    

                </div>

                <div className="relative">
                    <div className="flex flex-col px-5 lg:px-10 lg:border-l lg:border-border mt-16 lg:mt-0 sticky top-20 z-10">
                        
                        <div className="flex flex-col gap-5 divide-y divide-border sticky">
                            <h2 className="font-heading font-bold text-primary text-3xl uppercase tracking-wider pb-8">
                                Medios de contacto
                            </h2>
                            <div className="py-8">
                                <h3 className="font-heading tracking-widest text-xs uppercase text-muted/80 font-semibold">
                                    TELÉFONO
                                </h3>
                                <ul className="mt-4">
                                    <li>
                                        <Link href={"callto:51950306765"} 
                                        className="flex flex-row items-center gap-5 font-body text-black  hover:text-primary"> 
                                                                        
                                            <BsFillTelephoneFill className="size-4 text-primary" />
                                            +51 950 306 765
                                        </Link>
                                    </li>
                                </ul>
                                <ul className="mt-4">
                                    <li>
                                        <Link href={"callto:51933352145"} 
                                        className="flex flex-row items-center gap-5 font-body text-black  hover:text-primary"> 
                                                                        
                                            <BsFillTelephoneFill className="size-4 text-primary" />
                                            +51 933 352 145
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            <div className="py-8">
                                <h3 className="font-heading tracking-widest text-xs uppercase text-muted/80 font-semibold">
                                    E-mail
                                </h3>
                                <ul className="mt-4">
                                    <li>
                                        <Link href={"mailto:gerencia@aurumlogistics.com.pe"} 
                                        className="flex flex-row items-center gap-5 font-body text-black  hover:text-primary"> 
                                                                        
                                            <IoMail className="size-4 text-primary" />
                                            gerencia@aurumlogistics.com.pe
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="py-8">
                                <h3 className="font-heading text-xs tracking-widest uppercase text-muted/80 font-semibold">
                                    Dirección
                                </h3>
                                <ul className="mt-4">
                                    <li>
                                        <Link href={"https://maps.app.goo.gl/adbBF9PXGHN6MRWBA"} target="_blank"
                                        className="flex flex-row items-center gap-5 font-body text-black  hover:text-primary"> 
                                                                        
                                            <TbGpsFilled className="size-4 text-primary" />
                                            Centro Aéreo Comercial, Callao
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    
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
        </main>
    )
}