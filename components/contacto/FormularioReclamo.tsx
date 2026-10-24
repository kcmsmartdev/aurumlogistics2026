"use client"
import { useState } from "react"
import { Departamento, departamentos } from "@/data/departamentos"
import { Metadata } from "next"
const inputClass= "p-4 border border-border text-black font-body focus:border-secondary focus:outline-none"
const labelClass="font-heading tracking-widest text-xs uppercase text-muted/80 font-semibold"

export const metadata:Metadata={
    title:"Libro de Reclamaciones | Aurum Logistics",
    description:"Registra tu reclamo o queja en Aurum Logistics. Queremos escucharte y conocer tu experiencia para continuar mejorando nuestros servicios."
}

export default function FormularioReclamo(){
    const [estado, setEstado] = useState<"idle" | "enviando" | "ok" | "error">("idle");
    return(
        <form action=""
        className="flex flex-col mt-8">
            <div className="flex flex-col gap-5">
                <h2 className="font-heading font-semibold text-muted text-xl mb-4">
                    1° Identificación de la persona que presenta el reclamo
                </h2>

                <div className="flex flex-col lg:flex-row gap-5">
                    <div className="w-full flex flex-col">
                        <label htmlFor="documento" className={labelClass}>Tipo de Documento *</label>
                        <select 
                        name="documento" 
                        id="documento"
                        required
                        defaultValue={""}
                        className="py-4 border border-border">
                            <option value="">Seleccione</option>
                            <option value="dni">DNI</option>
                            <option value="ce">C.E</option>
                            <option value="pasaporte">Pasaporte</option>
                        </select>

                    </div>

                    <div className="w-full flex flex-col">
                        <label htmlFor="numero" className={labelClass}>Número de Documento *</label>
                       <input type="text"
                       id="numero"
                       name="numero"
                       required
                       placeholder="Ingresa tu número de ID"
                       className={inputClass}/>

                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="w-full flex flex-col">
                       <label htmlFor="nombre" className={labelClass}>Nombres Completos *</label>
                       <input type="text"
                       name="nombre"
                       id="nombre"
                       required
                       placeholder="Ingresa tu Nombre y Apellido"
                       className={inputClass}/>

                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="w-full flex flex-col">
                        <label htmlFor="direccion" className={labelClass}>Domicilio *</label>
                       <input type="text"
                       id="direccion"
                       name="direccion"
                       required
                       placeholder="Ingresa tu dirección"
                       className={inputClass}/>

                    </div>
                </div>


                <div className="flex flex-col lg:flex-row gap-5">
                    <div className="w-full flex flex-col">
                        <label htmlFor="departamento" className={labelClass}>Departamento *</label>
                        <select 
                        name="departamento" 
                        defaultValue={""}
                        required
                        id="departamento"
                        className={inputClass}>
                            <option value="">Seleccione</option>
                            {
                                departamentos.map((e)=>(
                                    <option key={e.codigo} value={e.id}>{e.nombre}</option>
                                ))
                            }
                        </select>

                    </div>
                    <div className="w-full flex flex-col">
                        <label htmlFor="provincia" className={labelClass}>Provincia *</label>
                       <input type="text"
                       id="provincia"
                       name="provincia"
                       required
                       placeholder="Ingresar Provincia"
                       className={inputClass}/>

                    </div>      
                </div>


                <div className="flex flex-col lg:flex-row gap-5">
                    
                    <div className="w-full flex flex-col">
                        <label htmlFor="distrito" className={labelClass}>Distrito *</label>
                       <input type="text"
                       id="distrito"
                       name="distrito"
                       required
                       placeholder="Ingresar Distrito"
                       className={inputClass}/>

                    </div>

                    <div className="w-full flex flex-col">
                        <label htmlFor="telefono" className={labelClass}>Teléfono *</label>
                       <input type="text"
                       id="telefono"
                       name="telefono"
                       required
                       placeholder="Número de teléfono"
                       className={inputClass}/>

                    </div> 

                </div>


                <h2 className="font-heading font-semibold text-muted text-xl mb-4">
                    2° Identificación del bien contratado
                </h2>

                <div className="flex flex-col lg:flex-row gap-5">
                    <div className="w-full flex flex-col">
                        <label htmlFor="direccion" className={labelClass}>Servicio contratado</label>
                       <input type="text"
                       id="direccion"
                       name="direccion"
                       required
                       placeholder="¿Con qué servicio no esta conforme?"
                       className={inputClass}/>

                    </div>

                    <div className="w-full flex flex-col">
                        <label htmlFor="direccion" className={labelClass}>Monto reclamado *</label>
                       <input type="number"
                       id="direccion"
                       name="direccion"
                       required
                       placeholder="$00.00"
                       className={inputClass}/>

                    </div>
                </div>

                <h2 className="font-heading font-semibold text-muted text-xl mt-5">
                   3° Detalle de reclamación
                </h2>

                <div className="flex flex-col p-3 bg-gray/40">
                   <p className="font-body text-sm text-black">
                    <strong >Reclamo: </strong> Disconformidad relacionada a los productos o servicios.
                   </p>

                   <p className="font-body text-sm text-black">
                    <strong >Queja: </strong> Disconformidad no relacionada a los productos y servicios; o malestar o descontento a la atención al público.
                   </p>
                </div>

                <div className="flex flex-col gap-2.5">
                    <p className={labelClass}>Tipo de solicitud</p> 

                    <div className="flex flex-row gap-6">
                        <div className="flex flex-row items-center gap-2">
                        <input type="radio" name="tipo" id="tipo" value={"reclamo"} />
                        <label htmlFor="tipo" className="font-body text-base text-black font-bold">
                            Reclamo
                        </label> 
                        </div>  

                        <div className="flex flex-row items-center gap-2">
                            <input type="radio" name="tipo" id="queja" value={"queja"} />
                            <label htmlFor="tipo" className="font-body text-base text-black font-bold">
                                Queja
                            </label> 
                        </div>  
                    </div>    
                </div>

                 <div className="flex flex-col">
                    <div className="w-full flex flex-col">
                        <label htmlFor="detalle" className={labelClass}>Detalle *</label>
                        <textarea name="detalle" id="detalle"
                        required
                        rows={8}
                        placeholder="Explique detalladamente los hechos..."
                        className={inputClass}/>
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="w-full flex flex-col">
                        <label htmlFor="detalle" className={labelClass}>Pedido (Qué solicita) *</label>
                        <textarea name="detalle" id="detalle"
                        required
                        rows={8}
                        placeholder="Que solucción espera por parte de la empresa..."
                        className={inputClass}/>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <h2 className="font-heading font-semibold text-muted text-xl mt-5">
                        4° Conformidad
                    </h2>
                    
                    <div className="flex flex-row gap-2 items-center">
                        <input type="checkbox" name="declaracion" id="declaracion" required className={labelClass} />
                        <label htmlFor="declaracion" className="font-body text-sm">
                            Declaro que la información consignada es veraz.
                        </label>
                    </div>

                    <div className="flex flex-row gap-2 items-center">
                        <input type="checkbox" name="autorizacion" id="autorizacion" required className={labelClass} />
                        <label htmlFor="autorizacion" className="font-body text-sm">
                            Autorizo el tratamiento de mis datos personales para atender este reclamo.
                        </label>
                    </div>
                </div>

                <div>
                <button
                    type="submit"
                    disabled={estado === "enviando"}
                    className="w-full font-body font-semibold uppercase bg-primary px-5 py-6 text-white cursor-pointer">
                        {estado === "enviando" ? "Enviando..." : "Enviar reclamo"}
                </button>
                <p role="status" aria-live="polite" className="min-h-6 font-body text-sm">
                    {estado === "ok" && "Mensaje enviado. Te responderemos pronto."}
                    {estado === "error" && "No se pudo enviar. Inténtalo de nuevo."}
                </p>
           </div>
            </div>
        </form>
    )
}