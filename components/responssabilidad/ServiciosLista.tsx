import Link from "next/link"
import { IconType } from "react-icons"

import { BiSolidPlaneAlt } from "react-icons/bi";
import { FaTruckMoving } from "react-icons/fa";
import { FaShip } from "react-icons/fa6";
import { AiFillGold } from "react-icons/ai";
interface ListaType{
    icon:IconType,
    name:string,
    href:string,
}
const serviciosList:ListaType[]=[
     { icon:BiSolidPlaneAlt, name:"Transporte aéreo", href: "/servicios/transporte-aereo" },
      { icon:FaTruckMoving, name: "Transporte terrestre", href: "/servicios/transporte-terrestre" },
      { icon:FaShip, name: "Transporte marítimo", href: "/servicios/transporte-maritimo" },
      { icon:AiFillGold, name: "Valorado", href: "/servicios/valorado" },
]
export default function ServiciosLista(){
    return(
        <div className="hidden md:flex flex-col">
            <h2 className="font-heading font-bold text-primary text-3xl uppercase tracking-wider leading-tight">
                +5 de Años de Experiencia
            </h2>
            <ul className="flex flex-col gap-4 mt-5">
                {serviciosList.map((e) =>{
                    const Icon = e.icon;
                    return(
                        <li key={e.name} className="group relative border-b border-border">
                        <span className="flex flex-row gap-2 items-center ">
                            <Icon  className="size-5 text-primary"/>
                            <Link
                            href={e.href}
                            className="block py-5 font-heading text-lg font-semibold  uppercase text-muted transition-colors duration-300 group-hover:text-primary focus-visible:outline-none motion-reduce:transition-none">
                            {e.name}
                        </Link>
                        </span>
                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute bottom-0 left-0 h-1 w-5 bg-primary transition-[width] duration-300 ease-out group-hover:w-full group-focus-within:w-full motion-reduce:transition-none"
                        />
                    </li>
                    )
                })}
            </ul>
        </div>
    )
}