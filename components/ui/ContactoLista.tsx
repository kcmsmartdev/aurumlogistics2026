import { IoMailUnread } from "react-icons/io5";
import { SiGooglemaps } from "react-icons/si";
import { FaPhoneAlt } from "react-icons/fa";
import { IconType } from "react-icons";
import { IoMdDownload } from "react-icons/io";
import Link from "next/link";
interface Contacto{
    icon:IconType,
    name:string,
    href:string,
}

const listaContacto:Contacto[]= [
    {icon:FaPhoneAlt, name:"+51 950 306 765", href:"callto:51950306765" },
    {icon:SiGooglemaps, name:"Centro Aéreo Comercial, Callao", href:"https://maps.app.goo.gl/VBZmHw5W2v1U1N96A" },
    {icon:FaPhoneAlt, name:"gerencia@aurumlogistics.com.pe", href:"mailto:gerencia@aurumlogistics.com.pe" },
]
export default function ContactoLista(){
    return(
        <div className="w-full flex flex-col mt-16">
            <h2 className="font-heading font-bold text-primary text-2xl uppercase tracking-widest">
                Contactos
            </h2>

            <ul className="flex flex-col mt-4">
                {
                    listaContacto.map((e)=>{
                        const Icon = e.icon
                        return(
                        <li key={e.name} className="py-4">
                            <Link href={e.href} target="_blank"
                            className="flex flex-row gap-4 items-center font-body text-black text-lg hover:text-primary">
                                <Icon className="text-secondary size-4" />
                                {e.name}
                            </Link>
                        </li>)
                        
                    })
                }
            </ul>

             <div className="mt-16">
                <h2 className="font-heading font-bold text-primary text-2xl uppercase tracking-widest mb-4">
                    Folleto
                </h2>

                <Link 
                target="_blank" 
                href={"https://www.dropbox.com/scl/fi/h06tny5uz1hxtmh15scjb/Brochure_Aurum_Logistics.pdf?rlkey=xgx0fbbcsnxermqwsqjfb4wz9&st=6lajk2rb&dl=1"}
                className="font-heading text-xl text-white font-semibold bg-primary p-5 flex flex-row items-center justify-center gap-2  ">
                    <IoMdDownload className="size-5" />
                    DESCARGAR
                </Link>
             </div>
        </div>
    )
}