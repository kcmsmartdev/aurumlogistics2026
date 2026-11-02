
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  gestionarRespuestaCliente,
} from "@/app/(dashbaord)/dashboard/consultar-reclamo/[id]/actions";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";

type Props = {
  reclamoId: string;
};

export default function AccionesRespuestaReclamo({
  reclamoId,
}: Props) {
  const router = useRouter();

  const [mostrarApelacion, setMostrarApelacion] = useState(false);
  const [detalle, setDetalle] = useState("");
  const [solucion, setSolucion] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState(false);
  const [isPending, startTransition] = useTransition();

  function aceptarRespuesta() {
    const confirmar = window.confirm(
      "¿Estás seguro de que deseas aceptar la respuesta? Esta acción cerrará el reclamo."
    );

    if (!confirmar) return;

    setMensaje("");
    setError(false);

    startTransition(async () => {
      const resultado = await gestionarRespuestaCliente(
        reclamoId,
        "aceptar"
      );

      setMensaje(resultado.message);
      setError(!resultado.success);

      if (resultado.success) {
        router.refresh();
      }
    });
  }

  function enviarApelacion() {
    if (detalle.trim().length < 10) {
      setMensaje("Describe el motivo de tu apelación (mínimo 10 caracteres).");
      setError(true);
      return;
    }

    if (solucion.trim().length < 10) {
      setMensaje("Indica la solución que solicitas (mínimo 10 caracteres).");
      setError(true);
      return;
    }

    const confirmar = window.confirm(
      "¿Deseas presentar esta apelación? Recuerda que solo puedes apelar una vez."
    );

    if (!confirmar) return;

    setMensaje("");
    setError(false);

    startTransition(async () => {
      const resultado = await gestionarRespuestaCliente(
        reclamoId,
        "apelar",
        detalle,
        solucion
      );

      setMensaje(resultado.message);
      setError(!resultado.success);

      if (resultado.success) {
        router.refresh();
      }
    });
  }

  return (
    <section className="border border-border bg-white p-5">
      <h2 className="font-heading text-lg font-bold text-black">
        ¿Estás conforme con la respuesta?
      </h2>

      <p className="mt-2 text-sm leading-6 text-muted">
        Revisa la respuesta oficial de Aurum Logistics. Puedes aceptarla
        o presentar una apelación si no estás conforme.
      </p>

      {!mostrarApelacion && (
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={aceptarRespuesta}
            disabled={isPending}
            className="inline-flex items-center justify-center gap-2 bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FiCheckCircle size={17} />
            {isPending ? "Procesando..." : "Aceptar respuesta"}
          </button>

          <button
            type="button"
            onClick={() => {
              setMostrarApelacion(true);
              setMensaje("");
            }}
            disabled={isPending}
            className="inline-flex items-center justify-center gap-2 border border-border px-5 py-3 text-sm font-semibold text-black transition hover:bg-gray disabled:opacity-50"
          >
            <FiAlertCircle size={17} />
            No estoy conforme
          </button>
        </div>
      )}

      {mostrarApelacion && (
        <div className="mt-6 flex flex-col gap-5">
          <div>
            <label
              htmlFor="detalle-apelacion"
              className="mb-2 block text-sm font-semibold text-black"
            >
              Motivo de la apelación
            </label>

            <textarea
              id="detalle-apelacion"
              value={detalle}
              onChange={(e) => setDetalle(e.target.value)}
              rows={5}
              maxLength={5000}
              disabled={isPending}
              placeholder="Explica por qué no estás conforme con la respuesta recibida..."
              className="w-full border border-border p-3 text-sm text-black outline-none focus:border-primary disabled:bg-gray"
            />

            <p className="mt-1 text-right text-xs text-muted">
              {detalle.length}/5000 caracteres
            </p>
          </div>

          <div>
            <label
              htmlFor="solucion-apelacion"
              className="mb-2 block text-sm font-semibold text-black"
            >
              Solución que solicitas
            </label>

            <textarea
              id="solucion-apelacion"
              value={solucion}
              onChange={(e) => setSolucion(e.target.value)}
              rows={4}
              maxLength={5000}
              disabled={isPending}
              placeholder="Indica qué solución esperas recibir..."
              className="w-full border border-border p-3 text-sm text-black outline-none focus:border-primary disabled:bg-gray"
            />

            <p className="mt-1 text-right text-xs text-muted">
              {solucion.length}/5000 caracteres
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={enviarApelacion}
              disabled={isPending}
              className="bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? "Enviando..." : "Presentar apelación"}
            </button>

            <button
              type="button"
              onClick={() => setMostrarApelacion(false)}
              disabled={isPending}
              className="border border-border px-5 py-3 text-sm font-semibold text-black hover:bg-gray disabled:opacity-50"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {mensaje && (
        <p
          role="status"
          className={`mt-4 border p-3 text-sm ${
            error
              ? "border-error bg-white text-error"
              : "border-positive bg-white text-positive"
          }`}
        >
          {mensaje}
        </p>
      )}
    </section>
  );
}
