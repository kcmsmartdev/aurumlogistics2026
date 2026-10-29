
import { BiWorld } from "react-icons/bi";
import Link from "next/link";
import Estadisticas from "../ui/Estadistica";
import { PiArrowUpRightBold } from "react-icons/pi";
import HeroVideo from "./HeroVideo";


export default function Hero(){
    return(
        <section className="relative  w-full  bg-gray-400 min-h-screen">
            <HeroVideo />

            <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10" />
            <div className="relative z-20  max-w-7xl mx-auto px-3 py-28">
                <div className="max-w-3xl mt-10">
                    
                    <div className="flex flex-row items-center gap-1.5 mb-3">
                        <BiWorld className="text-secondary" />
                        <span   className="font-heading font-light text-xs text-secondary">  LOGÍSTICA INTERNACIONAL · PERÚ</span>
                    </div>

                    <h1 className="font-heading text-white text-5xl md:text-6xl lg:text-7xl uppercase font-black mb-4">
                        Conectamos tu negocio con el mundo.
                    </h1>
                    <p className="max-w-2xl font-body text-muted-reverse text-lg mb-12">
                        Coordinamos operaciones de importación y exportación mediante transporte marítimo, aéreo y terrestre, con soluciones logísticas adaptadas a las necesidades de tu empresa.
                    </p>

                    <Link href="/contacto" className="w-fit bg-primary font-body text-sm text-white p-5 flex flex-row items-center gap-4 uppercase font-bold group">
                        Solicitar una cotización
                        <PiArrowUpRightBold className="size-5 group-hover:scale-125 transition-transform duration-300 ease-in-out" />
                    </Link>

                    <Estadisticas />
                </div>
            </div>
        </section>
    )
}