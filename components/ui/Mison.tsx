"use client"

import { useState } from "react"
import { MdAdd } from "react-icons/md"

interface Paragraph {
    label?: string
    text: string
}

interface Card {
    title: string
    paragraphs: Paragraph[]
}

const cards: Card[] = [
    {
        title: "Nuestra Misión",
        paragraphs: [
            {
                text: "Coordinar soluciones logísticas para operaciones de importación y exportación, brindando un servicio eficiente y responsable que acompañe a nuestros clientes en su comercio internacional.",
            },
        ],
    },
    {
        title: "Nuestra Visión",
        paragraphs: [
            {
                text: "Consolidarnos como un aliado estratégico en logística internacional, reconocido por la confianza, la calidad del servicio y el compromiso con nuestros clientes.",
            },
        ],
    },
    {
        title: "Nuestros valores",
        paragraphs: [
            {
                label: "Confidencialidad:",
                text: "Protegemos la información de nuestros clientes y limitamos su acceso al personal autorizado.",
            },
            {
                label: "Confianza:",
                text: "Construimos relaciones transparentes y responsables, respetando los compromisos asumidos con nuestros clientes y colaboradores.",
            },
        ],
    },
]
export default function Mision(){
    const [openIndex, setOpenIndex] = useState<number | null>(null)
    return(
        <div className="mt-10 flex flex-col items-start gap-4 lg:max-w-xl">
                    {cards.map(({title, paragraphs}, index) => {
                        const isOpen = openIndex === index

                        return (
                            <div key={title} className={`w-full bg-white p-2.5 border-b border-border ${isOpen ? "border-b-4 border-secondary" :""}`}>
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
                                           {paragraphs.map(({ label, text }) => (
                                            <p key={text}>
                                                {label && <strong className="font-semibold text-black">{label} </strong>}
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