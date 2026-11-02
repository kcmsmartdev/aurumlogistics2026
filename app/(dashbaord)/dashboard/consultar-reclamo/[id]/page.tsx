
import Link from "next/link";
import { notFound } from "next/navigation";
import { obtenerDetalleReclamo } from "./actions";

import FormularioRespuestaReclamo from "@/components/contacto/formulario-respuesta-reclamo";
import FormularioRespuestaApelacion from "@/components/contacto/formulario-respuesta-apelacion";
import AccionesRespuestaReclamo from "@/components/contacto/acciones-respuesta-reclamo";

import { FiArrowLeft, FiFileText } from "react-icons/fi";

type Props = {
  params: Promise<{ id: string }>;
};

function Campo({
  titulo,
  valor,
}: {
  titulo: string;
  valor: string | number | null;
}) {
  return (
    <div className="flex flex-col gap-1 border-b border-border py-4">
      <p className="text-xs font-semibold uppercase text-muted">
        {titulo}
      </p>

      <p className="text-sm text-black">
        {valor || "No especificado"}
      </p>
    </div>
  );
}

function Seccion({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border border-border bg-white">
      <div className="border-b border-border px-5 py-4">
        <h2 className="font-heading font-bold text-black">
          {titulo}
        </h2>
      </div>

      <div className="px-5">{children}</div>
    </section>
  );
}

export default async function DetalleReclamoPage({ params }: Props) {
  const { id } = await params;

  const resultado = await obtenerDetalleReclamo(id);

  // Si no existe o el usuario no tiene acceso, ocultar el detalle
  if (!resultado.success) {
    notFound();
  }

  const { claim, response, appeal, role } = resultado;

  const esAdmin = role === "admin";
  const esCliente = role === "cliente";

  const fecha = new Intl.DateTimeFormat("es-PE", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(claim.created_at));

  const fechaRespuesta = response?.created_at
    ? new Intl.DateTimeFormat("es-PE", {
        dateStyle: "long",
        timeStyle: "short",
      }).format(new Date(response.created_at))
    : null;

  const apelacionPendiente =
    appeal &&
    (appeal.status === "Pendiente" ||
      appeal.status === "En revisión");

  const apelacionRespondida =
    appeal && appeal.status === "Respondida";

  const fechaRespuestaApelacion =
    appeal?.responded_at
      ? new Intl.DateTimeFormat("es-PE", {
          dateStyle: "long",
          timeStyle: "short",
        }).format(new Date(appeal.responded_at))
      : null;

  return (
    <main className="flex flex-col gap-6">
      {/* Encabezado */}
      <div>
        <Link
          href="/dashboard/consultar-reclamo"
          className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent"
        >
          <FiArrowLeft />
          Volver a reclamos
        </Link>

        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h1 className="font-heading text-2xl font-bold text-black">
              Detalle del reclamo
            </h1>

            <p className="mt-1 text-sm text-muted">
              Código: {claim.tracking_code}
            </p>
          </div>

          <span className="w-fit bg-gray px-3 py-2 text-sm font-semibold text-muted">
            {claim.status}
          </span>
        </div>
      </div>

      {/* Información del reclamante */}
      <Seccion titulo="Información del reclamante">
        <div className="grid grid-cols-1 gap-x-8 md:grid-cols-2">
          <Campo titulo="Nombre completo" valor={claim.full_name} />
          <Campo titulo="Tipo de documento" valor={claim.document_type} />
          <Campo titulo="Número de documento" valor={claim.document_number} />
          <Campo titulo="Correo electrónico" valor={claim.email} />
          <Campo titulo="Teléfono" valor={claim.phone} />
          <Campo titulo="Domicilio" valor={claim.address} />
          <Campo titulo="Departamento" valor={claim.department} />
          <Campo titulo="Provincia" valor={claim.province} />
          <Campo titulo="Distrito" valor={claim.district} />

          <Campo
            titulo="¿Es menor de edad?"
            valor={claim.is_minor ? "Sí" : "No"}
          />
        </div>
      </Seccion>

      {/* Información del reclamo */}
      <Seccion titulo="Información del reclamo">
        <div className="grid grid-cols-1 gap-x-8 md:grid-cols-2">
          <Campo titulo="Tipo de solicitud" valor={claim.request_type} />

          <Campo
            titulo="Servicio contratado"
            valor={claim.service_contracted}
          />

          <Campo
            titulo="Monto reclamado"
            valor={
              claim.claimed_amount !== null
                ? `S/ ${Number(claim.claimed_amount).toFixed(2)}`
                : "No especificado"
            }
          />

          <Campo titulo="Fecha de registro" valor={fecha} />
        </div>

        <div className="border-b border-border py-4">
          <p className="mb-2 text-xs font-semibold uppercase text-muted">
            Descripción
          </p>

          <p className="whitespace-pre-wrap text-sm leading-6 text-black">
            {claim.description}
          </p>
        </div>

        <div className="py-4">
          <p className="mb-2 text-xs font-semibold uppercase text-muted">
            Pedido del cliente
          </p>

          <p className="whitespace-pre-wrap text-sm leading-6 text-black">
            {claim.requested_solution}
          </p>
        </div>
      </Seccion>

      {/* Respuesta oficial del reclamo */}
      {response && (
        <Seccion titulo="Respuesta oficial">
          <div className="py-4">
            <p className="whitespace-pre-wrap text-sm leading-6 text-black">
              {response.response}
            </p>

            {fechaRespuesta && (
              <p className="mt-4 text-xs text-muted">
                Respondido el: {fechaRespuesta}
              </p>
            )}
          </div>
        </Seccion>
      )}

      {/* Acciones del cliente después de recibir la respuesta */}
      {esCliente &&
        response &&
        claim.status === "Respondido" && (
          <AccionesRespuestaReclamo reclamoId={claim.id} />
        )}

      {/* Confirmación de aceptación */}
      {esCliente && claim.status === "Aceptado" && (
        <div className="border border-positive bg-white p-5">
          <p className="font-semibold text-positive">
            Has aceptado la respuesta de Aurum Logistics.
          </p>

          <p className="mt-1 text-sm text-muted">
            El reclamo se encuentra cerrado.
          </p>
        </div>
      )}

      {/* Apelación del cliente */}
      {appeal && (
        <Seccion titulo="Apelación del cliente">
          <div className="py-4">
            <p className="text-xs font-semibold uppercase text-muted">
              Motivo de apelación
            </p>

            <p className="mt-2 whitespace-pre-wrap text-sm text-black">
              {appeal.appeal_detail}
            </p>

            <p className="mt-5 text-xs font-semibold uppercase text-muted">
              Solución solicitada
            </p>

            <p className="mt-2 whitespace-pre-wrap text-sm text-black">
              {appeal.requested_solution}
            </p>

            <p className="mt-5 text-xs font-semibold uppercase text-muted">
              Estado de la apelación
            </p>

            <p className="mt-2 text-sm font-semibold text-black">
              {appeal.status}
            </p>
          </div>

          {/* Respuesta final del administrador a la apelación */}
          {apelacionRespondida && appeal.admin_response && (
            <div className="border-t border-border py-5">
              <p className="text-xs font-semibold uppercase text-muted">
                Respuesta final de Aurum Logistics
              </p>

              <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-black">
                {appeal.admin_response}
              </p>

              {fechaRespuestaApelacion && (
                <p className="mt-4 text-xs text-muted">
                  Respondido el: {fechaRespuestaApelacion}
                </p>
              )}
            </div>
          )}
        </Seccion>
      )}

      {/* Formulario para responder la apelación: solo administrador */}
      {esAdmin && apelacionPendiente && (
        <section className="border border-border bg-white p-5">
          <div className="flex items-center gap-2">
            <FiFileText className="text-primary" size={20} />

            <h2 className="font-heading font-bold text-black">
              Responder apelación
            </h2>
          </div>

          <p className="mt-2 text-sm leading-6 text-muted">
            Revisa el motivo de la apelación y redacta la respuesta
            definitiva para el cliente. Al enviarla, el reclamo
            quedará cerrado y no se podrá presentar otra apelación.
          </p>

          <FormularioRespuestaApelacion reclamoId={claim.id} />
        </section>
      )}

      {/* Formulario para responder el reclamo original: solo administrador */}
      {esAdmin && !response && !appeal && (
        <section className="border border-border bg-white p-5">
          <div className="flex items-center gap-2">
            <FiFileText className="text-primary" size={20} />

            <h2 className="font-heading font-bold text-black">
              Responder reclamo
            </h2>
          </div>

          <p className="mt-2 text-sm text-muted">
            Redacta la respuesta oficial que recibirá el cliente
            al consultar su reclamo.
          </p>

          {claim.status === "Registrado" ||
          claim.status === "En revisión" ? (
            <FormularioRespuestaReclamo reclamoId={claim.id} />
          ) : (
            <p className="mt-4 text-sm text-muted">
              Este reclamo ya no se encuentra disponible para responder.
            </p>
          )}
        </section>
      )}

      {/* Confirmación de cierre después de responder la apelación */}
      {esCliente && claim.status === "Cerrado" && apelacionRespondida && (
        <div className="border border-positive bg-white p-5">
          <p className="font-semibold text-positive">
            Tu apelación ha sido respondida.
          </p>

          <p className="mt-1 text-sm text-muted">
            El procedimiento de atención de este reclamo ha finalizado.
            Puedes consultar la respuesta final en esta página.
          </p>
        </div>
      )}
    </main>
  );
}
