import { IconType } from "react-icons";
import { MdOutlineSupportAgent } from "react-icons/md";
import { TfiMedallAlt } from "react-icons/tfi";
import { LuHandshake } from "react-icons/lu";

interface Contenido {
    icon: IconType,
    titulo: string,
    description: string,
}

const bene: Contenido[]=[
    {icon:MdOutlineSupportAgent , titulo:"Atención", description:"24/7"},
    {icon:TfiMedallAlt , titulo:"Compromiso", description:"con el Cliente"},
    {icon:LuHandshake , titulo:"+5 de Años", description:"de Experiencia"},

]

export default function Estadisticas(){
    return(
        <div className="max-w-2xl flex flex-row justify-between items-center mt-20">
            {
                bene.map((e)=>{
                    const Icon = e.icon
                    return (

                        <div key={e.titulo} className="flex flex-row gap-1.5">
                            <Icon className="size-10" /> 
                            <div className="flex flex-col">
                                <p className="font-body text-sm">
                                    {e.titulo}
                                </p>
                                <span className="font-body text-muted text-xs">
                                    {e.description}
                                </span>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}