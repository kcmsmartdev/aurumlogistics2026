import Link from "next/link";

import Cta from "@/components/ui/Cta";

import { BsFillTelephoneFill } from "react-icons/bs";
import { IoMail } from "react-icons/io5";
import { TbGpsFilled } from "react-icons/tb";
import FormularioReclamo from "@/components/contacto/FormularioReclamo";

export default function GenerarReclamo(){
    return(
        <main className="flex flex-col">
            <div className="w-full h-48 flex flex-col items-center justify-center lg:h-72 bg-black">
                <p className="font-body font-bold text-white text-3xl lg:text-5xl">
                    RECLAMOS
                </p>
            </div>  

            <div className="w-full max-w-7xl mx-auto flex flex-col px-3 py-28">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.5fr] gap-12">
                    <div>
                        <h1 className="font-heading text-3xl md:text-5xl font-bold uppercase mb-4">
                            Libro de Reclamaciones Virtual
                        </h1>
                        <p className="font-body text-lg text-muted">
                           Conforme al Código de Protección y Defensa del Consumidor, puedes registrar aquí tu reclamo o queja. Los campos marcados con * son obligatorios.
                        </p>

                        <div className="py-5">
                            <p className="font-body text-black">Empresa: Aurum Logistics S.A.C.</p>
                            <p className="font-body text-black">RUC: 20609704951</p>   
                            <p className="font-body text-black">Email: gerencia@aurumlogistics.com.pe</p>   
                        </div>

                        <FormularioReclamo />
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
            <Cta />
        </main>
    )
}