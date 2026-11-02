
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { responderReclamo } from "@/app/(dashbaord)/dashboard/consultar-reclamo/[id]/actions";
import { FiSend } from "react-icons/fi";

export default function FormularioRespuestaReclamo({
  reclamoId,
}: {
  reclamoId: string;
}) {
  const router = useRouter();

  const [respuesta, setRespuesta] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const texto = respuesta.trim();

    if (texto.length < 10) {
      setError("Escribe una respuesta de al menos 10 caracteres.");
      return;
    }

    const confirmar = window.confirm(
      "¿Estás seguro de que deseas registrar esta respuesta oficial?"
    );

    if (!confirmar) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("response", texto);

      const resultado = await responderReclamo(reclamoId, formData);

      if (!resultado.success) {
        setError(resultado.message);
        return;
      }

      setRespuesta("");
      router.refresh();
    } catch {
      setError("Ocurrió un error al registrar la respuesta. Inténtalo nuevamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="response"
          className="font-heading text-sm font-semibold text-black"
        >
          Respuesta oficial
        </label>

        <p className="text-sm leading-relaxed text-muted">
          Redacta la respuesta que recibirá el cliente para atender su reclamo.
        </p>

        <textarea
          id="response"
          name="response"
          rows={7}
          maxLength={10000}
          required
          disabled={loading}
          value={respuesta}
          onChange={(event) => setRespuesta(event.target.value)}
          placeholder="Redacta aquí la respuesta oficial al reclamo del cliente..."
          className="w-full resize-y border border-border bg-white p-4 text-sm leading-relaxed text-black outline-none transition placeholder:text-muted focus:border-primary disabled:cursor-not-allowed disabled:opacity-50"
        />

        <div className="flex flex-wrap justify-between gap-2 text-xs text-muted">
          <span>Esta respuesta podrá ser consultada por el cliente.</span>
          <span className="font-medium tabular-nums">
            {respuesta.length}/10000
          </span>
        </div>
      </div>

      {error && (
        <p
          role="alert"
          className="border border-error/20 bg-error/5 px-4 py-3 text-sm text-error"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading || respuesta.trim().length < 10}
        className="inline-flex w-fit items-center gap-2 bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
      >
        <FiSend size={16} />
        {loading ? "Registrando respuesta..." : "Registrar respuesta"}
      </button>
    </form>
  );
}
