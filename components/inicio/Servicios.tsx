import Image from "next/image"
import Link from "next/link"

interface Servicio {
    imagen:string,
    title:string,
    href:string,
}

const cardServicios: Servicio[]=[
    {imagen:"/images/servicio-aereo.webp", title:"Transporte Aéreo", href:"/servicio/transporte-aereo"},
    {imagen:"/images/servicio-maritimo.webp", title:"Transporte Marítimo", href:"/servicio/transporte-maritimo"},
    {imagen:"/images/servicio-terrestre.webp", title:"Transporte Terrestre", href:"/servicio/transporte-terrestre"},
    {imagen:"/images/servicio-valorado.webp", title:"Servicio Valorado", href:"/servicio/servicio-valorado"},
]
export default function Servicios(){
    return(
        <section className="w-full">
            <div className="max-w-7xl mx-auto px-3 py-28 mt-16 flex flex-col items-center">
                <h2 className="mb-4 font-heading text-4xl font-bold uppercase">
                    Nuestros <span className="font-normal">Servicios</span>
                </h2>

                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {
                        cardServicios.map((e)=>(
                            <article key={e.title} className="relative z-10 flex flex-col items-center p-4 group">
                                <div className="w-full overflow-hidden">
                                    <Image 
                                        src={e.imagen} 
                                        alt={e.title} 
                                        width={750} 
                                        height={550}
                                        loading="lazy"
                                        className="max-w-160  transition-transform duration-300 ease-in-out hover:scale-125"/>
                                </div>
                                <Link href={e.href} className="absolute z-10 bottom-4 left-1/2 -translate-x-1/2 translate-y-7 whitespace-nowrap bg-primary px-16 lg:px-20 py-3 font-heading text-2xl uppercase text-white transition-transform duration-300 ease-in-out group-hover:translate-y-14 group-focus-within:translate-y-10">
                                    {e.title}
                                </Link>
                            </article>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}