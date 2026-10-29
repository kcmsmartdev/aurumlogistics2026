import Image from "next/image"
import Link from "next/link"

interface Servicio {
    name:string,
    img:string,
    href:string,
}

const cardServicios:Servicio[]=[
    {name:"Transporte Aéreo", img:"/images/servicio-aereo.webp", href:"/servicios/transporte-aereo"},
    {name:"Transporte Marítimo", img:"/images/servicio-maritimo.webp", href:"/servicios/transporte-maritimo"},
    {name:"Transporte Terrestre", img:"/images/servicio-terrestre.webp", href:"/servicios/transporte-terrestre"},
    {name:"Servicio Valorado", img:"/images/servicio-valorado.webp", href:"/servicios/valorado"},
]
export default function CardServicios(){
    return(
       <div className="w-full mt-28 mx-auto flex flex-col items-center">
            <h2 className="font-heading font-bold text-2xl lg:text-3xl">
                SOLUCIONES LOGÍSTICA PARA TUS OPERACIONES DE IMPORTACIÓN Y EXPORTACIÓN.
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
    )
}