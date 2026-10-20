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

export default function Nosotros() {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    return (
        <section className="flex w-full flex-col lg:flex-row">
            <div className="h-125 w-full bg-black p-5 lg:w-1/2" />

            <div className="w-full bg-gray/50 px-3 py-20 md:px-8 lg:w-1/2 lg:p-16">
                <h2 className="mb-4 font-heading text-4xl font-bold uppercase">
                    Sobre <span className="font-normal">Nosotros</span>
                </h2>
                <p className="font-body text-xl text-muted lg:max-w-xl">
                    Somos una agencia de Carga Logística internacional con mas de 5 años de experiencia. Ofrecemos un
                    servicio de calidad en la distribución y entrega de tu mercancía de acuerdo con las necesidades de
                    tu empresa.
                </p>

                <div className="mt-10 flex flex-col items-start gap-4">
                    {cards.map(({title, paragraphs}, index) => {
                        const isOpen = openIndex === index

                        return (
                            <div key={title} className={`w-full bg-white p-2.5 ${isOpen ? "border-b-4 border-secondary" :""}`}>
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
            </div>
        </section>
    )
}