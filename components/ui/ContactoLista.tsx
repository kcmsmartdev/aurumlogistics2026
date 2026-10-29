
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoMail } from "react-icons/io5";
import { TbGpsFilled } from "react-icons/tb";
import { IconType } from "react-icons";
import { IoMdDownload } from "react-icons/io";
import Link from "next/link";
interface Contacto{
    icon:IconType,
    name:string,
    href:string,
}

const listaContacto:Contacto[]= [
    {icon:BsFillTelephoneFill, name:"+51 950 306 765", href:"callto:51950306765" },
    {icon:TbGpsFilled, name:"Centro Aéreo Comercial, Callao", href:"https://maps.app.goo.gl/VBZmHw5W2v1U1N96A" },
    {icon:IoMail, name:"gerencia@aurumlogistics.com.pe", href:"mailto:gerencia@aurumlogistics.com.pe" },
]
export default function ContactoLista(){
    return(
        <div className="w-full flex flex-col mt-16">
            <h2 className="font-heading text-primary text-xl font-bold uppercase tracking-tight ">
                Contactos
            </h2>

            <ul className="flex flex-col mt-4">
                {
                    listaContacto.map((e)=>{
                        const Icon = e.icon
                        return(
                        <li key={e.name} className="py-2">
                            <Link href={e.href} target="_blank"
                            className="flex flex-row gap-4 items-center font-body text-black text-sm hover:text-primary font-bold">
                                <Icon className="text-primary size-4" />
                                {e.name}
                            </Link>
                        </li>)
                        
                    })
                }
            </ul>

             <div className="mt-12">
                <h2 className="font-heading text-primary text-xl font-bold uppercase tracking-tight mb-2">
                    Folleto
                </h2>

                <Link 
                target="_blank" 
                href={"https://www.dropbox.com/scl/fi/h06tny5uz1hxtmh15scjb/Brochure_Aurum_Logistics.pdf?rlkey=xgx0fbbcsnxermqwsqjfb4wz9&st=6lajk2rb&dl=1"}
                className="font-heading text-xl text-muted font-semibold bg-gray p-5 flex flex-row items-center justify-center gap-2 hover:bg-sec group border border-transparent hover:text-black hover:border-black transition-transform duration-300 ease-in-out">
                    <IoMdDownload className="size-5  group-hover:text-primary group-hover:scale-150 transition-transform duration-300 ease-in-out" />
                    DESCARGAR
                </Link>
             </div>
        </div>
    )
}