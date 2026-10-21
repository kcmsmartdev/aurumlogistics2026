"use client"

import { useState } from "react"
import { MdAdd } from "react-icons/md"

interface Paragraph {
    text: string
}

interface Card {
    title: string
    paragraphs: Paragraph[]
}

const cards: Card[] = [
    {
        title: "Sociedad y derechos humanos",
        paragraphs: [
            {
                text: "El respeto por los derechos humanos forma parte de nuestros criterios de colaboración. Contamos con directrices orientadas a evitar relaciones comerciales con empresas mineras que incurran en prácticas como el trabajo infantil o la explotación de mujeres y poblaciones vulnerables.",
            },
        ],
    },
    {
        title: "Medio ambiente",
        paragraphs: [
            {
                text: "Promovemos la colaboración con proveedores y operadores que trabajan bajo criterios de formalidad y trazabilidad del mineral aurífero. Asimismo, fomentamos la adopción de buenas prácticas ambientales y el uso de métodos y productos que contribuyan a reducir el impacto de las actividades de extracción.",
            },
        ],
    },
    {
        title: "Compromiso con el sector minero",
        paragraphs: [
            {
                text: "Acompañamos a nuestros clientes en el desarrollo de sus operaciones, promoviendo prácticas responsables y una mayor formalización de sus actividades. Buscamos contribuir a que sus procesos relacionados con la comercialización y exportación se desarrollen de manera organizada, responsable y conforme a los requisitos aplicables.",
            },
        ],
    },
]
export default function CardResponsabilidad(){
    const [openIndex, setOpenIndex] = useState<number | null>(null)
    return(
        <div className="w-full mt-10 flex flex-col items-start gap-4 ">
                            {cards.map(({title, paragraphs}, index) => {
                                const isOpen = openIndex === index
        
                                return (
                                    <div key={title} className={`w-full bg-gray p-2.5 ${isOpen ? "border-b-4 border-secondary" :""}`}>
                                        <button
                                            type="button"
                                            id={`card-btn-${index}`}
                                            aria-expanded={isOpen}
                                            aria-controls={`card-panel-${index}`}
                                            onClick={() => setOpenIndex(isOpen ? null : index)}
                                            className="flex w-full items-center gap-1.5 text-left">
                                            <MdAdd
                                                className={`size-5 shrink-0 transition-transform duration-300 ease-in-out ${
                                                    isOpen ? "rotate-45 text-primary " : ""
                                                }`}
                                            />
                                            <h3 className="font-body font-semibold tracking-wide text-lg text-black md:text-base">{title}</h3>
                                        </button>
        
                                        <div
                                            id={`card-panel-${index}`}
                                            role="region"
                                            aria-labelledby={`card-btn-${index}`}
                                            aria-hidden={!isOpen}
                                            className={`grid transition-all duration-300 ease-in-out ${
                                                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                            }`}>
                                            <div className="overflow-hidden">
                                                <div className="flex flex-col gap-3 pt-3 font-body text-base text-muted">
                                                   {paragraphs.map(({text }) => (
                                                    <p key={text}>
                                                        
                                                        {text}
                                                    </p>
                                                ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
        </div>
    )
}