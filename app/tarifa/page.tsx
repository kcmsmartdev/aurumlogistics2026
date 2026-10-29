
import ServiciosLista from "@/components/responssabilidad/ServiciosLista"
import TarifasAereas from "@/components/tarifas/TarifasAereas"
import TarifasMaritima from "@/components/tarifas/TarifasMaritima"
import TiempoServicio from "@/components/tarifas/TiempoServicio"
import ContactoLista from "@/components/ui/ContactoLista"
import Cta from "@/components/ui/Cta"
import { Metadata } from "next"

export const matedata:Metadata= {
    title:"Tarifas de Transporte Aéreo y Marítimo | Aurum Logistics",
    description:"Consulta las tarifas y los tiempos de atención para exportaciones aéreas y marítimas con Aurum Logistics. Conoce la información de cada servicio."
}
export default function Tarifa(){
    return(
        <main className="flex flex-col">
           <div className="w-full h-52 flex flex-col items-center justify-center lg:h-80  py-28 bg-black">
                <p className="font-body font-bold text-white text-3xl lg:text-5xl">
                    TARIFARIO AURUM
                </p>
            </div>

            <div className="w-full max-w-7xl mx-auto flex flex-col px-3 py-28">
            
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.5fr] gap-12 ">
                    <div className="flex flex-col">
                        <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold uppercase mb-3">
                        Tarifas y tiempos de atención para exportaciones.
                        </h1>
                        <p className="font-body text-lg text-muted font-medium">
                            Consulta los precios y tiempos de atención de nuestros servicios de exportación aérea y marítima para planificar tus operaciones logísticas con mayor claridad y anticipación.
                        </p>

                        <TarifasAereas />
                        <TarifasMaritima />
                        <TiempoServicio />
                    </div>

                    <div className="relative">
                        <div className="px-5 lg:px-10 lg:border-l lg:border-border mt-16 lg:mt-0 sticky top-20 z-10">
                            <ServiciosLista />
                            <ContactoLista />
                        </div>
                    </div>
                </div>


                <div className="mt-16 px-3">
                    <h3 className="font-heading text-base mb-4">
                        OBSERVACIONES
                    </h3>
                    <div className="flex flex-col gap-1.5 px-5">
                        <li className="font-body text-sm text-muted">
                            Los tiempos descritos son referenciales, dependerá muchos de los canales de control y los requerimientos que la autoridad competente(SUNAT) solicite durante la operación.
                        </li>
                        <li className="font-body text-sm text-muted">
                            Los importes descritos están sujetos a cambios de la operación real.
                        </li>
                        <li className="font-body text-sm text-muted">
                            No incluye gastos adicionales por servicios como previos, aforos, movilización, cuadrilla, servcios extraordinarios, etc.
                        </li>
                         <li className="font-body text-sm text-muted">
                            No incluye recargos como SINI, Inspección BOE u otros servicios adicionales solicitados por aduanas o el cliente.
                        </li>
                         <li className="font-body text-sm text-muted">
                           Las mercancías viajan por cuenta y riesgo del cliente y no aseguramos las mismas de no mediar orden expresa del cliente.
                        </li>

                         <li className="font-body text-sm text-muted">
                           La validez de la cotización es de 7 días
                        </li>
                    </div>
                </div>
            </div>

            <Cta />
        </main>
    )
}