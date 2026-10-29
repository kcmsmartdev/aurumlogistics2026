import Link from "next/link";
import Image from "next/image";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoMail } from "react-icons/io5";


interface FooterLink {
    title:string;
    href:string;
}

interface FooterSection {
    title:string;
    child: FooterLink[];
}

const Years = new Date().getFullYear()
const linksFooter:FooterSection[]=[
    {title:"Empresa", child:[
        {title:"Nosotros", href:"/nostros"},
        {title:"Responsabilidad", href:"/respondabilidad"},
        {title:"Tarifas", href:"/tarifas"},
        {title:"Contacto", href:"/contacto"},
    ]},

    {title:"Servicios", child:[
        {title:"Transporte Aéreo", href:"/servicios/transporte-aereo"},
        {title:"Transporte Marítimo", href:"/servicios/transporte-maritimo"},
        {title:"Transporte Terrestre", href:"/servicios/transporte-terrestre"},
        {title:"Servicio Valorado", href:"/servicios/servicio-valorado"},    
    ]},

    {title:"Atención al cliente", child:[
        {title:"Tracking", href:"/tracking"},
        {title:"Seguimiento de Reclamos", href:"/seguimiento-reclamo"},
        {title:"Consulta de una DAM", href:"https://ww3.sunat.gob.pe/aduanas/informao/HR10Poliza.htm"},
        {title:"Descargar Folleto", href:"#"},    
    ]},


    {title:"Información legal", child:[
        {title:"Política de T&C", href:"/informacion-legal/terminos-y-condiciones"},
        {title:"Política de Privacidad", href:"/informacion-legal/politica-de-privacidad"},
        {title:"Política de Cookies", href:"/informacion-legal/politica-de-cookies"},   
    ]},
]
export default function Footer(){
    return(
        <footer className="w-full bg-linear-to-b from-black to-primary">
            <div className="max-w-7xl mx-auto px-3 pt-12 flex flex-col">
                <div className="grid max-[390px]:grid-cols-1 grid-cols-2 gap-8 lg:flex lg:flex-wrap lg:justify-between py-10">
                    {
                        linksFooter.map((e)=>(
                            
                                <nav key={e.title} aria-label={e.title}>
                                    <h2 className="font-heading text-lg text-white font-semibold">
                                        {e.title}
                                    </h2>
                                    <ul className="py-1.5">
                                        {
                                            e.child.map((child)=>(
                                                <li key={child.href} className=" mb-1">
                                                    <Link href={child.href}
                                                    className="font-body text-muted-reverse text-base hover:text-white transition-colors duration-300 ease-in-out">
                                                        {child.title}
                                                    </Link>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </nav>
                        
                        ))
                    }
                </div>

                <div className="flex flex-col py-10 md:flex-row justify-between border-t border-b border-border">
                    <Link href={"/generar-reclamo"} className="mb-4 hover:opacity-80 transition-colors duration-300 ease-in-out">
                        <Image 
                        src={"/images/avisovirtual.webp"}
                        width={200}
                        height={200}
                        alt="Generar reclamo"
                        aria-label="Generar reclamo"
                        loading="lazy"
                        className="w-24 h-auto"/>
                    </Link>

                    

                    <Link href={"callto:51950306765"}
                    className="font-body text-sm md:text-lg text-white flex items-center gap-1.5 mb-2 hover:text-muted-reverse">
                        <BsFillTelephoneFill className="text-white size-3 sm:size-4" />
                        +51 950 306 765
                    </Link>

                    <Link 
                    href={"mailto:gerencia@aurumlogistics.com.pe"}
                    className="font-body text-sm md:text-lg text-white flex items-center gap-1.5 hover:text-muted-reverse">
                        <IoMail className="text-white size-3 sm:size-4" />
                        gerencia@aurumlogistics.com.pe
                    </Link>
            
                </div>

                <div className="flex flex-col gap-2 md:flex-row items-center justify-between py-10">
                    <Link target="_blank" 
                    className="font-body text-xs text-muted-reverse"
                    href={"https://maps.app.goo.gl/4zJWkgcAqsbexgos5"}>
                        Centro Aéreo Comercial, Callao
                    </Link>

                    <p className="font-body text-xs text-muted-reverse">
                        ©{Years}  Aurum Logistics S.A.C.
                    </p>
                </div>
            </div>
        </footer>
    )
}