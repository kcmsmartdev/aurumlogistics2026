
import { BiWorld } from "react-icons/bi";
import Link from "next/link";
import Estadisticas from "../ui/Estadistica";


export default function Hero(){
    return(
        <section className="w-full bg-gray-400 min-h-screen">
            <div className="max-w-7xl mx-auto px-3 py-28">
                <div className="max-w-3xl mt-10">
                    
                    <div className="flex flex-row items-center gap-1.5 mb-3">
                        <BiWorld className="text-alert" />
                        <span className="font-heading font-light text-xs">  LOGÍSTICA INTERNACIONAL · PERÚ</span>
                    </div>

                    <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl uppercase font-black mb-4">
                        Conectamos tu negocio con el mundo.
                    </h1>
                    <p className="max-w-2xl font-body text-lg mb-12">
                        Coordinamos operaciones de importación y exportación mediante transporte marítimo, aéreo y terrestre, con soluciones logísticas adaptadas a las necesidades de tu empresa.
                    </p>

                    <Link href="/" className="bg-primary font-body text-sm text-white p-5">
                        Solicitar una cotización
                    </Link>

                    <Estadisticas />
                </div>
            </div>
        </section>
    )
}