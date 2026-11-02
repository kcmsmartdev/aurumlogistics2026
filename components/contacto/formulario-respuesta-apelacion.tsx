
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { responderApelacionReclamo } from "@/app/(dashbaord)/dashboard/consultar-reclamo/[id]/actions";
import { FiSend } from "react-icons/fi";

type Props = {
  reclamoId: string;
};

export default function FormularioRespuestaApelacion({
  reclamoId,
}: Props) {
  const router = useRouter();

  const [respuesta, setRespuesta] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [exito, setExito] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setMensaje("");
    setExito(false);

    const texto = String(formData.get("admin_response") ?? "").trim();

    if (texto.length < 10) {
      setMensaje("Escribe una respuesta de al menos 10 caracteres.");
      return;
    }

    if (texto.length > 10000) {
      setMensaje("La respuesta no puede superar los 10 000 caracteres.");
      return;
    }

    const confirmar = window.confirm(
      "¿Estás seguro de enviar esta respuesta? Esta acción cerrará definitivamente el reclamo y el cliente no podrá presentar otra apelación."
    );

    if (!confirmar) return;

    startTransition(async () => {
      try {
        const resultado = await responderApelacionReclamo(
          reclamoId,
          formData
        );

        setMensaje(resultado.message);
        setExito(resultado.success);

        if (resultado.success) {
          setRespuesta("");
          router.refresh();
        }
      } catch {
        setMensaje("Ocurrió un error al responder la apelación. Inténtalo nuevamente.");
        setExito(false);
      }
    });
  }

  return (
    <form action={handleSubmit} className="mt-6 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="admin_response"
          className="font-heading text-sm font-semibold text-black"
        >
          Respuesta a la apelación
        </label>

        <p className="text-sm leading-relaxed text-muted">
          Redacta la respuesta definitiva a la apelación presentada por el
          cliente.
        </p>

        <textarea
          id="admin_response"
          name="admin_response"
          value={respuesta}
          onChange={(event) => setRespuesta(event.target.value)}
          rows={7}
          maxLength={10000}
          required
          disabled={isPending}
          placeholder="Escribe la respuesta definitiva a la apelación del cliente..."
          className="w-full resize-y border border-border bg-white p-4 text-sm leading-relaxed text-black outline-none transition placeholder:text-muted focus:border-primary disabled:cursor-not-allowed disabled:opacity-50"
        />

        <div className="flex flex-wrap justify-between gap-2 text-xs text-muted">
          <span>Esta respuesta cerrará definitivamente el reclamo.</span>
          <span className="font-medium tabular-nums">
            {respuesta.length}/10000
          </span>
        </div>
      </div>

      {mensaje && (
        <p
          role="status"
          className={`border px-4 py-3 text-sm ${
            exito
              ? "border-positive/20 bg-positive/5 text-positive"
              : "border-error/20 bg-error/5 text-error"
          }`}
        >
          {mensaje}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending || respuesta.trim().length < 10}
        className="flex w-fit items-center gap-2 bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
      >
        <FiSend size={16} />

        {isPending
          ? "Enviando respuesta..."
          : "Responder apelación y cerrar reclamo"}
      </button>
    </form>
  );
}
