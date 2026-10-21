
import Link from "next/link"
export default function Cta(){
    return(
        <section className="w-full h-72 lg:min-h-48 bg-center bg-cover bg-no-repeat flex flex-col items-center justify-center" style={{backgroundImage:"url('/images/bg-cta.webp')"}} >
            <div className="w-full max-w-7xl mx-auto px-3 flex flex-col gap-5 md:flex-row justify-between items-center">
          
                <h2 className="font-body uppercase font-bold text-white text-3xl md:text-4xl text-center py-5 max-w-xl">
                    Contigo en cada operación
                </h2>
                
                <Link href={"/contacto"}
                className="font-heading text-white font-semibold border border-white px-12 py-5 hover:bg-primary hover:border-primary ">
                    CONTÁCTANOS
                </Link>

            </div>
        </section>
    )
}