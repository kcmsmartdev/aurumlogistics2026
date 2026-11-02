
import Link from "next/link"
export default function Cta(){
    return(
        <section className="w-full h-72 lg:min-h-48 bg-center bg-cover bg-no-repeat flex flex-col items-center justify-center" style={{backgroundImage:"url('/images/bg-cta.webp')"}} >
            <div className="w-full max-w-7xl mx-auto px-3 flex flex-col gap-5 md:flex-row justify-between items-center">
                <div className="flex flex-col  items-start max-w-3xl">
                    <h2 className="font-body font-bold text-white text-start text-3xl md:text-4xl py-5 ">
                        Lleva tu operación más lejos con transporte marítimo internacional
                    </h2>
                    <p className="font-body text-muted-reverse text-base">
                        Cuéntanos qué necesitas transportar y coordinemos una alternativa logística acorde con los requerimientos de tu empresa.
                    </p>
                </div>
                
                
                <Link href={"/contacto"}
                className="font-heading text-white font-semibold border border-white px-12 py-5 hover:bg-primary hover:border-primary group">
                   <span className="inline-block group-hover:scale-105 duration-300 transition-transform ease-in-out">
                     CONTÁCTANOS
                   </span>
                </Link>

            </div>
        </section>
    )
}