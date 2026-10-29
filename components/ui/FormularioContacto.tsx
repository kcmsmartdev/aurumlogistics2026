"use client"
import Link from "next/link";
import { useState } from "react";
const inputClass= "p-4 border border-border text-black focus:border-secondary focus:outline-none"
const labelClass="font-heading tracking-widest text-xs uppercase text-muted/80 font-semibold"
export default function FormularioContacto(){

    const [estado, setEstado] = useState<"idle" | "enviando" | "ok" | "error">("idle");
    async function enviar(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
         try{

            } catch{
                
            }
    }
    return(

        <div className="flex flex-col gap-5">
            <div>
                <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold  mb-4">
                    Hablemos de tu próxima operación logística.
                </h1>
                <p className="font-body text-xl md:text-lg text-muted font-medium">
                    Completa el formulario con los detalles de tu operación y nuestro equipo podrá evaluar tu solicitud.
                </p>
            </div>

            <form onSubmit={enviar} className="w-full flex flex-col gap-12 mt-8 bg-gray/30 p-5">
            
                <div className="flex flex-col md:flex-row gap-4">

                        <div className="w-full flex flex-col gap-3">
                            <label htmlFor="name" className={labelClass}>Nombre</label>
                            <input type="text"
                            id="name"
                            name="name"
                            required
                            placeholder="Ingresa tu nombre"
                            className={inputClass}/>
                        </div>

                        <div className="w-full flex flex-col gap-3">
                            <label htmlFor="email" className={labelClass}>Email</label>
                            <input type="email"
                            id="email"
                            name="email"
                            required
                            placeholder="Ingresa tu email"
                            className={inputClass}/>
                        </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full flex flex-col gap-3">
                            <label htmlFor="servicio" className={labelClass}>Servicio</label>
                            <select
                            id="servicio"
                            name="servicio"
                            defaultValue={""}
                            required
                            className={inputClass}>
                                <option value="">Selecciona un servicio</option>
                                <option value="aereo">Transporte aéreo</option>
                                <option value="maritimo">Transporte marítimo</option>
                                <option value="terrestre">Transporte terrestre</option>
                                <option value="valorado">Valorado</option>
                            </select>
                            
                        </div>
                        <div className="w-full flex flex-col gap-3">
                            <label htmlFor="phone" className={labelClass}>Teléfono/Whatsapp</label>
                            <input type="number"
                            id="phone"
                            name="phone"
                            required
                            placeholder="Ingresa tu número de teléfono"
                            className={inputClass}/>
                        </div>
                </div>
                    
                <div className="flex flex-col">
                    <label htmlFor="mensaje" className={labelClass}>Mensaje</label>
                    <textarea name="mensaje" id="mensaje" placeholder="Detalles adicionales..." rows={6}
                    className={`${inputClass}  text-start mt-4`}/>
                    

                </div>
                <div className="flex flex-row gap-3 items-center">
                    <input type="checkbox"
                    required
                    className="size-4 text-black" />
                    <p className="font-body text-xs">
                        Acepto la <Link className="text-primary font-semibold" href={"/informacion-legal/politica-de-privacidad"} target="_blank">Política de Privacidad</Link> y autorizo el tratamiento de mis datos personales para gestionar mi solicitud de cotización.
                    </p>
                </div>
                <div>
                        <button
                            type="submit"
                            disabled={estado === "enviando"}
                            className="w-full font-body font-semibold uppercase bg-primary px-5 py-6 text-white cursor-pointer hover:bg-black group">
                                <span className="inline-block group-hover:scale-105 duration-300 ease-in-out">
                                    {estado === "enviando" ? "Enviando..." : "Enviar solicitud de cotización"}
                                </span>
                        </button>
                        <p role="status" aria-live="polite" className="min-h-6 font-body text-sm">
                            {estado === "ok" && "Mensaje enviado. Te responderemos pronto."}
                            {estado === "error" && "No se pudo enviar. Inténtalo de nuevo."}
                        </p>
                </div>

            </form>
        </div>
        
    )
}