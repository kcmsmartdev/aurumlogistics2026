import Link from "next/link"
import Map from "../ui/Map"
import AnimEstadisticas from "../ui/AnimEstadisticas"
export default function Operaciones(){
    return(
        <section className="w-full bg-accent">
            <div className="max-w-7xl mx-auto px-3 grid grid-cols-1 lg:grid-cols-2">
                <div className="grid grid-cols-[1fr_0.56fr]">
                    <div className="flex flex-col gap-16 py-28 px-5">
                        <h2 className="font-heading text-white text-4xl font-bold uppercase">
                            Estadística de <span className="font-normal">Operaciones</span>
                        </h2>
                        <p className="font-body text-white text-lg">
                            Las cifras reflejan el camino recorrido junto a nuestros clientes y nuestra experiencia coordinando operaciones de comercio internacional.
                        </p>

                        <Link href={"/contacto"} className="font-heading text-lg p-4 text-center uppercase font-semibold text-white border border-white hover:bg-primary hover:border-primary">
                            Contáctanos
                        </Link>

                    </div>
 
                  
                    <AnimEstadisticas />
                    
                </div>

                <Map />
            </div>
        </section>
    )
}