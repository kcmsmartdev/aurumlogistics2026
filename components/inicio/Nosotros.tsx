import Mision from "../nosotros/Mison";
import Image from "next/image";
export default function Nosotros() {
  return (
    <section
      aria-labelledby="about-title"
      className="grid grid-cols-1 lg:grid-cols-2 gap-8"
    >
      <div aria-hidden="true" className="w-full bg-gray">
        <Image
          src={"/images/img-nosotros.webp"}
          alt="Imagen nosotros"
          width={900}
          height={500}
          loading="eager"
          className="w-full h-full"
        />
      </div>

      <div className="w-full px-5 py-24">
        <h2
          id="about-title"
          className="mb-4 font-heading text-4xl font-bold uppercase"
        >
          Sobre nosotros
        </h2>

        <p className="font-body text-xl text-muted lg:max-w-xl">
          Somos una agencia de carga logística internacional con más de 5 años
          de experiencia. Ofrecemos un servicio de calidad en la distribución y
          entrega de tu mercancía, de acuerdo con las necesidades de tu empresa.
        </p>

        <Mision />
      </div>
    </section>
  );
}
