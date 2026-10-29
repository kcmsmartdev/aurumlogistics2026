import Mision from "../ui/Mison";


export default function Nosotros() {
    

    return (
        <section
        aria-labelledby="about-title"
        className="flex w-full flex-col lg:flex-row">
   
             <div aria-hidden="true" className="min-h-48 w-full bg-black p-5 lg:min-h-0 lg:w-1/2" />


            <div className="w-full bg-gray px-3 py-28 md:px-8 lg:w-1/2 lg:p-16">
                <h2
                    id="about-title"
                    className="mb-4 font-heading text-4xl font-bold uppercase"
                >
                    Sobre <span className="font-normal">nosotros</span>
                </h2>

                <p className="font-body text-xl text-muted lg:max-w-xl">
                    Somos una agencia de carga logística internacional con más de 5 años
                    de experiencia. Ofrecemos un servicio de calidad en la distribución
                    y entrega de tu mercancía, de acuerdo con las necesidades de tu
                    empresa.
                </p>

                <Mision />
            </div>
        </section>
    )
}