
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  consultarReclamo,
  gestionarRespuestaPublica,
} from "@/app/(website)/consultar-reclamo/actions";
import {
  FiSearch,
  FiCheckCircle,
  FiAlertCircle,
  FiClock,
  FiFileText,
  FiSend,
  FiClipboard,
} from "react-icons/fi";

type ResultadoConsulta = {
  success: boolean;
  message: string;
  claim?: {
    id: string;
    trackingCode: string;
    requestType: string;
    service: string;
    description: string;
    requestedSolution: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
  response?: {
    response: string;
    respondedAt: string;
  } | null;
  appeal?: {
    detail: string;
    requestedSolution: string;
    status: string;
    adminResponse: string | null;
    submittedAt: string;
    respondedAt: string | null;
  } | null;
};

const inputClass =
  "w-full border border-border bg-white p-4 font-body text-sm text-black outline-none placeholder:text-muted/70 focus:border-secondary disabled:cursor-not-allowed disabled:opacity-60";

const labelClass =
  "font-heading text-xs font-semibold uppercase tracking-widest text-muted";

function fecha(valor: string) {
  return new Date(valor).toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function Estado({ estado }: { estado: string }) {
  const estilos: Record<string, string> = {
    Registrado: "border border-border bg-gray text-accent",
    "En revisión": "border border-amber-200 bg-amber-50 text-amber-800",
    Respondido: "border border-blue-200 bg-blue-50 text-blue-800",
    Aceptado: "border border-green-200 bg-green-50 text-green-800",
    Apelado: "border border-orange-200 bg-orange-50 text-orange-800",
    Cerrado: "border border-border bg-accent text-white",
    Pendiente: "border border-amber-200 bg-amber-50 text-amber-800",
    Respondida: "border border-green-200 bg-green-50 text-green-800",
  };

  return (
    <span
      className={`inline-flex w-fit items-center px-4 py-2 font-body text-xs font-bold uppercase tracking-wider ${
        estilos[estado] ?? "border border-border bg-gray text-accent"
      }`}
    >
      {estado}
    </span>
  );
}

function SeccionTitulo({
  numero,
  children,
}: {
  numero?: string;
  children: React.ReactNode;
}) {
  return (
    <h2 className="border-b border-border pb-4 font-heading text-xl font-bold text-black md:text-2xl">
      {numero && (
        <span className="mr-2 text-primary">{numero}</span>
      )}
      {children}
    </h2>
  );
}

function Dato({
  etiqueta,
  valor,
}: {
  etiqueta: string;
  valor: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className={labelClass}>{etiqueta}</p>
      <p className="font-body text-base font-semibold text-black">
        {valor || "No especificado"}
      </p>
    </div>
  );
}

export default function FormularioConsultarReclamo() {
  const router = useRouter();

  const [codigo, setCodigo] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("dni");
  const [numeroDocumento, setNumeroDocumento] = useState("");

  const [resultado, setResultado] = useState<ResultadoConsulta | null>(null);
  const [mensaje, setMensaje] = useState("");
  const [detalleApelacion, setDetalleApelacion] = useState("");
  const [solucionSolicitada, setSolucionSolicitada] = useState("");
  const [mostrarApelacion, setMostrarApelacion] = useState(false);

  const [isPending, startTransition] = useTransition();

  const puedeResponder =
    resultado?.success &&
    resultado.claim?.status === "Respondido" &&
    resultado.response &&
    !resultado.appeal;

  async function actualizarConsulta() {
    const respuesta = await consultarReclamo(
      codigo,
      tipoDocumento,
      numeroDocumento
    );

    setResultado(respuesta);
    setMensaje(respuesta.message);
    setMostrarApelacion(false);
    setDetalleApelacion("");
    setSolucionSolicitada("");
  }

  function handleConsultar(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResultado(null);
    setMensaje("");

    startTransition(async () => {
      await actualizarConsulta();
    });
  }

  function handleAceptar() {
    const confirmar = window.confirm(
      "¿Estás seguro de aceptar la respuesta? Una vez aceptada, el reclamo quedará cerrado y no podrás presentar una apelación."
    );

    if (!confirmar) return;

    setMensaje("");

    startTransition(async () => {
      const respuesta = await gestionarRespuestaPublica(
        codigo,
        tipoDocumento,
        numeroDocumento,
        "aceptar"
      );

      setMensaje(respuesta.message);

      if (respuesta.success) {
        await actualizarConsulta();
        router.refresh();
      }
    });
  }

  function handleApelar(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const confirmar = window.confirm(
      "¿Deseas presentar esta apelación? Solo puedes presentar una apelación por reclamo."
    );

    if (!confirmar) return;

    setMensaje("");

    startTransition(async () => {
      const respuesta = await gestionarRespuestaPublica(
        codigo,
        tipoDocumento,
        numeroDocumento,
        "apelar",
        detalleApelacion,
        solucionSolicitada
      );

      setMensaje(respuesta.message);

      if (respuesta.success) {
        await actualizarConsulta();
        router.refresh();
      }
    });
  }

  return (
    <div className="flex flex-col gap-10">
      {/* FORMULARIO DE CONSULTA */}

      <form
        onSubmit={handleConsultar}
        className="flex flex-col gap-6 border border-border bg-white p-6 md:p-8"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="tracking_code" className={labelClass}>
            Código de seguimiento *
          </label>

          <input
            id="tracking_code"
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value.toUpperCase())}
            placeholder="Ejemplo: AL-16D088FF"
            required
            maxLength={11}
            disabled={isPending}
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="document_type" className={labelClass}>
              Tipo de documento *
            </label>

            <select
              id="document_type"
              value={tipoDocumento}
              onChange={(e) => setTipoDocumento(e.target.value)}
              disabled={isPending}
              className={inputClass}
            >
              <option value="dni">DNI</option>
              <option value="ce">Carné de extranjería</option>
              <option value="pasaporte">Pasaporte</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="document_number" className={labelClass}>
              Número de documento *
            </label>

            <input
              id="document_number"
              type="text"
              value={numeroDocumento}
              onChange={(e) => setNumeroDocumento(e.target.value)}
              placeholder="Ingresa tu documento"
              required
              maxLength={30}
              disabled={isPending}
              className={inputClass}
            />
          </div>
        </div>

        {mensaje && !resultado?.success && (
          <div
            role="alert"
            className="flex items-start gap-3 border border-error/30 bg-error/5 p-4"
          >
            <FiAlertCircle className="mt-0.5 shrink-0 text-error" size={19} />
            <p className="font-body text-sm leading-6 text-error">
              {mensaje}
            </p>
          </div>
        )}

        {mensaje && resultado?.success && (
          <div
            role="status"
            className="flex items-start gap-3 border border-positive/30 bg-positive/5 p-4"
          >
            <FiCheckCircle
              className="mt-0.5 shrink-0 text-positive"
              size={19}
            />
            <p className="font-body text-sm leading-6 text-positive">
              {mensaje}
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={isPending || !codigo.trim() || !numeroDocumento.trim()}
          className="group flex w-full cursor-pointer items-center justify-center gap-3 bg-primary px-6 py-5 font-body text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          <FiSearch size={18} />
          <span className="duration-300 group-hover:scale-105">
            {isPending ? "Consultando..." : "Consultar reclamo"}
          </span>
        </button>

        <p className="font-body text-sm leading-6 text-muted">
          Para consultar tu reclamo necesitas el código de seguimiento
          proporcionado al momento del registro y el documento de identidad
          utilizado en el formulario.
        </p>
      </form>

      {/* RESULTADO DE LA CONSULTA */}

      {resultado?.success && resultado.claim && (
        <div className="flex flex-col gap-10">
          {/* INFORMACIÓN DEL RECLAMO */}

          <section className="flex flex-col border border-border bg-white p-6 md:p-8">
            <div className="flex flex-col justify-between gap-5 border-b border-border pb-6 sm:flex-row sm:items-center">
              <div>
                <p className={labelClass}>Código de seguimiento</p>

                <h2 className="mt-2 font-heading text-3xl font-bold tracking-wider text-primary md:text-4xl">
                  {resultado.claim.trackingCode}
                </h2>
              </div>

              <div className="flex flex-col gap-2 sm:items-end">
                <p className={labelClass}>Estado de solicitud</p>
                <Estado estado={resultado.claim.status} />
              </div>
            </div>

            <div className="flex flex-col gap-6 py-7">
              <SeccionTitulo>Información del reclamo</SeccionTitulo>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Dato
                  etiqueta="Tipo de solicitud"
                  valor={resultado.claim.requestType}
                />

                <Dato
                  etiqueta="Fecha de registro"
                  valor={fecha(resultado.claim.createdAt)}
                />

                <div className="md:col-span-2">
                  <Dato
                    etiqueta="Servicio contratado"
                    valor={resultado.claim.service}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 border-t border-border py-7">
              <SeccionTitulo>Detalle de la solicitud</SeccionTitulo>

              <div className="border-l-4 border-primary bg-gray p-5 md:p-6">
                <p className={labelClass}>Descripción de los hechos</p>

                <p className="mt-3 whitespace-pre-wrap font-body text-base leading-7 text-black">
                  {resultado.claim.description}
                </p>
              </div>

              <div className="border-l-4 border-secondary bg-gray p-5 md:p-6">
                <p className={labelClass}>Solución solicitada inicialmente</p>

                <p className="mt-3 whitespace-pre-wrap font-body text-base leading-7 text-black">
                  {resultado.claim.requestedSolution}
                </p>
              </div>
            </div>
          </section>

          {/* RESPUESTA DE AURUM */}

          {resultado.response && (
            <section className="border border-border bg-white p-6 md:p-8">
              <div className="mb-6 flex flex-col justify-between gap-4 border-b border-border pb-5 sm:flex-row sm:items-center">
                <div className="flex items-center gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center bg-primary text-white">
                    <FiFileText size={22} />
                  </div>

                  <div>
                    <p className={labelClass}>Comunicación oficial</p>
                    <h3 className="mt-1 font-heading text-xl font-bold text-black md:text-2xl">
                      Respuesta de Aurum Logistics
                    </h3>
                  </div>
                </div>

                <div>
                  <p className={labelClass}>Fecha de respuesta</p>
                  <p className="mt-1 font-body text-sm font-semibold text-black">
                    {fecha(resultado.response.respondedAt)}
                  </p>
                </div>
              </div>

              <div className="border-l-4 border-primary bg-gray p-5 md:p-7">
                <p className="whitespace-pre-wrap font-body text-base leading-8 text-black">
                  {resultado.response.response}
                </p>
              </div>
            </section>
          )}

          {/* RECLAMO EN PROCESO */}

          {(resultado.claim.status === "Registrado" ||
            resultado.claim.status === "En revisión") && (
            <section className="border border-amber-200 bg-amber-50 p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center bg-amber-100 text-amber-800">
                  <FiClock size={22} />
                </div>

                <div>
                  <h3 className="font-heading text-lg font-bold text-amber-950">
                    Tu reclamo se encuentra en proceso
                  </h3>

                  <p className="mt-2 font-body text-sm leading-7 text-amber-900">
                    Estamos revisando tu solicitud. Cuando se registre una
                    respuesta, podrás consultarla desde esta misma página
                    utilizando tu código de seguimiento y documento de
                    identidad.
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* ACEPTAR RESPUESTA O PRESENTAR APELACIÓN */}

          {puedeResponder && (
            <section className="border border-border bg-white p-6 md:p-8">
              <div className="border-b border-border pb-6">
                <p className={labelClass}>Siguiente paso</p>

                <h3 className="mt-2 font-heading text-2xl font-bold text-black md:text-3xl">
                  ¿Estás conforme con la respuesta?
                </h3>

                <p className="mt-3 font-body text-base leading-7 text-muted">
                  Revisa la respuesta de Aurum Logistics. Puedes aceptarla si
                  estás conforme o presentar una apelación si consideras que
                  tu solicitud no ha sido atendida satisfactoriamente.
                </p>
              </div>

              {!mostrarApelacion ? (
                <div className="flex flex-col gap-4 pt-6">
                  <div className="flex flex-col gap-2">
                    <p className="font-heading text-sm font-bold text-black">
                      Ten en cuenta:
                    </p>

                    <p className="font-body text-sm leading-6 text-muted">
                      Solo puedes presentar una apelación por reclamo. Si
                      aceptas la respuesta, el proceso quedará cerrado.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={handleAceptar}
                      disabled={isPending}
                      className="group flex items-center justify-center gap-3 bg-primary px-6 py-5 font-body text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <FiCheckCircle size={18} />
                      Aceptar respuesta
                    </button>

                    <button
                      type="button"
                      onClick={() => setMostrarApelacion(true)}
                      disabled={isPending}
                      className="border border-primary px-6 py-5 font-body text-sm font-bold uppercase tracking-wider text-primary transition-colors hover:bg-primary hover:text-white disabled:opacity-50"
                    >
                      Presentar apelación
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleApelar}
                  className="mt-7 flex flex-col gap-6"
                >
                  <div>
                    <h4 className="font-heading text-xl font-bold text-black">
                      Presentar una apelación
                    </h4>

                    <p className="mt-2 font-body text-sm leading-6 text-muted">
                      Explica por qué no estás conforme con la respuesta
                      recibida y qué solución esperas de Aurum Logistics.
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="appeal_detail" className={labelClass}>
                      Motivo de la apelación *
                    </label>

                    <textarea
                      id="appeal_detail"
                      value={detalleApelacion}
                      onChange={(e) => setDetalleApelacion(e.target.value)}
                      rows={6}
                      minLength={10}
                      maxLength={5000}
                      required
                      disabled={isPending}
                      placeholder="Explica detalladamente por qué no estás conforme con la respuesta..."
                      className={`${inputClass} resize-y`}
                    />

                    <p className="text-right font-body text-xs text-muted">
                      {detalleApelacion.length}/5000 caracteres. Mínimo 10.
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="appeal_solution" className={labelClass}>
                      Solución que solicitas *
                    </label>

                    <textarea
                      id="appeal_solution"
                      value={solucionSolicitada}
                      onChange={(e) => setSolucionSolicitada(e.target.value)}
                      rows={5}
                      minLength={10}
                      maxLength={5000}
                      required
                      disabled={isPending}
                      placeholder="Indica qué solución esperas obtener..."
                      className={`${inputClass} resize-y`}
                    />

                    <p className="text-right font-body text-xs text-muted">
                      {solucionSolicitada.length}/5000 caracteres. Mínimo 10.
                    </p>
                  </div>

                  <div className="border border-amber-200 bg-amber-50 p-4">
                    <p className="font-body text-sm leading-6 text-amber-900">
                      Recuerda que solo puedes presentar una apelación por
                      reclamo. Revisa los datos antes de enviarla.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      type="submit"
                      disabled={
                        isPending ||
                        detalleApelacion.trim().length < 10 ||
                        solucionSolicitada.trim().length < 10
                      }
                      className="flex items-center justify-center gap-3 bg-primary px-6 py-5 font-body text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <FiSend size={18} />
                      {isPending ? "Enviando..." : "Enviar apelación"}
                    </button>

                    <button
                      type="button"
                      onClick={() => setMostrarApelacion(false)}
                      disabled={isPending}
                      className="border border-border px-6 py-5 font-body text-sm font-bold uppercase tracking-wider text-muted transition-colors hover:border-primary hover:text-primary disabled:opacity-50"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              )}
            </section>
          )}

          {/* INFORMACIÓN DE LA APELACIÓN */}

          {resultado.appeal && (
            <section className="border border-border bg-white p-6 md:p-8">
              <div className="flex flex-col justify-between gap-5 border-b border-border pb-6 sm:flex-row sm:items-center">
                <div className="flex items-center gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center bg-primary text-white">
                    <FiClipboard size={22} />
                  </div>

                  <div>
                    <p className={labelClass}>Seguimiento de solicitud</p>

                    <h3 className="mt-1 font-heading text-xl font-bold text-black md:text-2xl">
                      Apelación presentada
                    </h3>
                  </div>
                </div>

                <div>
                  <Estado estado={resultado.appeal.status} />
                </div>
              </div>

              <div className="flex flex-col gap-6 py-7">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <Dato
                    etiqueta="Fecha de presentación"
                    valor={fecha(resultado.appeal.submittedAt)}
                  />

                  <Dato
                    etiqueta="Estado de apelación"
                    valor={resultado.appeal.status}
                  />
                </div>

                <div className="border-l-4 border-primary bg-gray p-5 md:p-6">
                  <p className={labelClass}>Motivo de la apelación</p>

                  <p className="mt-3 whitespace-pre-wrap font-body text-base leading-7 text-black">
                    {resultado.appeal.detail}
                  </p>
                </div>

                <div className="border-l-4 border-secondary bg-gray p-5 md:p-6">
                  <p className={labelClass}>Solución solicitada</p>

                  <p className="mt-3 whitespace-pre-wrap font-body text-base leading-7 text-black">
                    {resultado.appeal.requestedSolution}
                  </p>
                </div>
              </div>

              {/* APELACIÓN PENDIENTE */}

              {(resultado.appeal.status === "Pendiente" ||
                resultado.appeal.status === "En revisión") && (
                <div className="border border-amber-200 bg-amber-50 p-5 md:p-6">
                  <div className="flex items-start gap-4">
                    <FiClock
                      className="mt-1 shrink-0 text-amber-800"
                      size={22}
                    />

                    <div>
                      <h4 className="font-heading text-lg font-bold text-amber-950">
                        Tu apelación está siendo revisada
                      </h4>

                      <p className="mt-2 font-body text-sm leading-7 text-amber-900">
                        Hemos recibido tu apelación. Nuestro equipo está
                        evaluando la información presentada. Cuando se
                        registre una respuesta, podrás consultarla desde esta
                        misma página.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* RESPUESTA FINAL DE AURUM */}

              {resultado.appeal.status === "Respondida" &&
                resultado.appeal.adminResponse && (
                  <div className="border-t border-border pt-7">
                    <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                      <div className="flex items-center gap-4">
                        <div className="flex size-12 shrink-0 items-center justify-center bg-positive/10 text-positive">
                          <FiCheckCircle size={23} />
                        </div>

                        <div>
                          <p className={labelClass}>Comunicación oficial</p>

                          <h4 className="mt-1 font-heading text-xl font-bold text-black md:text-2xl">
                            Respuesta a tu apelación
                          </h4>
                        </div>
                      </div>

                      {resultado.appeal.respondedAt && (
                        <div>
                          <p className={labelClass}>Fecha de respuesta</p>

                          <p className="mt-1 font-body text-sm font-semibold text-black">
                            {fecha(resultado.appeal.respondedAt)}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="border-l-4 border-positive bg-gray p-5 md:p-7">
                      <p className="whitespace-pre-wrap font-body text-base leading-8 text-black">
                        {resultado.appeal.adminResponse}
                      </p>
                    </div>

                    <div className="mt-6 flex items-start gap-3 border border-border p-5">
                      <FiCheckCircle
                        className="mt-0.5 shrink-0 text-positive"
                        size={20}
                      />

                      <p className="font-body text-sm leading-6 text-black">
                        El proceso de atención de este reclamo ha finalizado.
                        Puedes consultar nuevamente esta información
                        utilizando tus datos de seguimiento.
                      </p>
                    </div>
                  </div>
                )}
            </section>
          )}
        </div>
      )}
    </div>
  );
}
