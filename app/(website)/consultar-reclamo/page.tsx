
import Link from "next/link";
import { Metadata } from "next";

import FormularioConsultarReclamo from "@/components/contacto/formulario-consultar-reclamo";

import { IoMail } from "react-icons/io5";
import { BsFillTelephoneFill } from "react-icons/bs";
import { TbGpsFilled } from "react-icons/tb";

export const metadata: Metadata = {
  title: "Consultar reclamo | Aurum Logistics",
  description:
    "Consulta el estado de tu reclamo y revisa las respuestas registradas por Aurum Logistics.",
};

export default function ConsultarReclamoPage() {
  return (
    <main className="flex flex-col">
      {/* Encabezado */}
      <div className="flex h-48 w-full flex-col items-center justify-center bg-black lg:h-72">
        <p className="font-body text-3xl font-bold text-white lg:text-5xl">
          CONSULTA DE RECLAMOS
        </p>
      </div>

      {/* Contenido */}
      <div className="mx-auto flex w-full max-w-7xl flex-col px-3 py-20 lg:py-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_0.5fr]">
          {/* Formulario */}
          <div>
            <h1 className="mb-4 font-heading text-3xl font-bold uppercase md:text-5xl">
              Consulta tu reclamo
            </h1>

            <p className="font-body text-lg text-muted">
              Ingresa tu código de seguimiento y los datos de tu documento de
              identidad para consultar el estado de tu reclamo y conocer las
              respuestas registradas.
            </p>

            <div className="py-8">
              <FormularioConsultarReclamo />
            </div>
          </div>

          {/* Información lateral */}
          <div className="relative">
            <div className="mt-8 flex flex-col px-5 lg:sticky lg:top-20 lg:mt-0 lg:border-l lg:border-border lg:px-10">
              <div className="flex flex-col divide-y divide-border">
                <h2 className="pb-8 font-heading text-2xl font-bold uppercase tracking-wider text-primary lg:text-3xl">
                  Información importante
                </h2>

                <div className="py-8">
                  <h3 className="font-heading text-xs font-semibold uppercase tracking-widest text-muted/80">
                    Código de seguimiento
                  </h3>

                  <p className="mt-4 font-body text-base text-black">
                    Utiliza el código que recibiste al registrar tu reclamo o
                    queja.
                  </p>
                </div>

                <div className="py-8">
                  <h3 className="font-heading text-xs font-semibold uppercase tracking-widest text-muted/80">
                    Documento de identidad
                  </h3>

                  <p className="mt-4 font-body text-base text-black">
                    Ingresa el mismo tipo y número de documento que
                    proporcionaste al registrar tu solicitud.
                  </p>
                </div>

                <div className="py-8">
                  <h3 className="font-heading text-xs font-semibold uppercase tracking-widest text-muted/80">
                    ¿Necesitas ayuda?
                  </h3>

                  <ul className="mt-4 flex flex-col gap-5">
                    <li>
                      <Link
                        href="callto:51950306765"
                        className="flex items-center gap-4 font-body text-black hover:text-primary"
                      >
                        <BsFillTelephoneFill className="size-4 shrink-0 text-primary" />
                        +51 950 306 765
                      </Link>
                    </li>

                    <li>
                      <Link
                        href="mailto:gerencia@aurumlogistics.com.pe"
                        className="flex items-center gap-4 font-body text-black hover:text-primary"
                      >
                        <IoMail className="size-4 shrink-0 text-primary" />
                        gerencia@aurumlogistics.com.pe
                      </Link>
                    </li>

                    <li>
                      <Link
                        href="https://maps.app.goo.gl/adbBF9PXGHN6MRWBA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 font-body text-black hover:text-primary"
                      >
                        <TbGpsFilled className="size-4 shrink-0 text-primary" />
                        Centro Aéreo Comercial, Callao
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
