import Mision from "../ui/Mison";


export default function Nosotros() {
    

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

               <Mision />
            </div>
        </section>
    )
}