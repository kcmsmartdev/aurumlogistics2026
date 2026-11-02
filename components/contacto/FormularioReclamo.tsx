
"use client";

import { useState, type FormEvent } from "react";
import { departamentos } from "@/data/departamentos";
import { registrarReclamo } from "@/app/(website)/generar-reclamo/actions";

const inputClass =
  "w-full p-4 border border-border text-black font-body focus:border-secondary focus:outline-none";

const labelClass =
  "font-heading tracking-widest text-xs uppercase text-muted/80 font-semibold";

export default function FormularioReclamo() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [trackingCode, setTrackingCode] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const result = await registrarReclamo(formData);

      if (!result.success) {
        setError(result.message);
        return;
      }

      setTrackingCode(result.trackingCode ?? "");
      form.reset();
    } catch {
      setError("Ocurrió un error inesperado. Inténtalo nuevamente.");
    } finally {
      setLoading(false);
    }
  }

  if (trackingCode) {
    return (
      <div className="mt-8 border border-border p-6 md:p-10">
        <div className="mb-5 flex h-12 w-12 items-center justify-center bg-positive/10 text-positive">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>

        <h2 className="font-heading text-2xl font-semibold text-black">
          ¡Tu reclamo fue registrado!
        </h2>

        <p className="mt-3 font-body text-sm leading-6 text-muted">
          Hemos recibido tu solicitud correctamente. Guarda el siguiente
          código para consultar el estado de tu reclamo.
        </p>

        <div className="mt-6 border border-border bg-gray p-5">
          <p className="font-body text-xs font-semibold uppercase tracking-widest text-muted">
            Código de seguimiento
          </p>

          <p className="mt-2 font-heading text-3xl font-bold tracking-wider text-primary">
            {trackingCode}
          </p>

          <button
            type="button"
            onClick={() => navigator.clipboard.writeText(trackingCode)}
            className="mt-4 border border-primary px-4 py-2 font-body text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
          >
            Copiar código
          </button>
        </div>

        <p className="mt-5 font-body text-sm leading-6 text-muted">
          Utiliza este código junto con tu documento de identidad para
          consultar el estado de tu solicitud.
        </p>

        <button
          type="button"
          onClick={() => setTrackingCode("")}
          className="mt-6 bg-primary px-6 py-4 font-body text-sm font-semibold uppercase text-white transition-colors hover:bg-black"
        >
          Registrar otro reclamo
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex flex-col">
      <div className="flex flex-col gap-5">
        {/* 1. IDENTIFICACIÓN DEL RECLAMANTE */}

        <h2 className="mb-4 font-heading text-xl font-semibold text-muted">
          1° Identificación de la persona que presenta el reclamo
        </h2>

        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="document_type" className={labelClass}>
              Tipo de documento *
            </label>

            <select
              name="document_type"
              id="document_type"
              required
              defaultValue=""
              className={inputClass}
              disabled={loading}
            >
              <option value="" disabled>
                Seleccione
              </option>
              <option value="dni">DNI</option>
              <option value="ce">C.E.</option>
              <option value="pasaporte">Pasaporte</option>
            </select>
          </div>

          <div className="flex w-full flex-col gap-2">
            <label htmlFor="document_number" className={labelClass}>
              Número de documento *
            </label>

            <input
              type="text"
              id="document_number"
              name="document_number"
              required
              maxLength={20}
              placeholder="Ingresa tu número de documento"
              className={inputClass}
              disabled={loading}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="full_name" className={labelClass}>
            Nombres completos *
          </label>

          <input
            type="text"
            name="full_name"
            id="full_name"
            required
            maxLength={150}
            placeholder="Ingresa tus nombres y apellidos"
            className={inputClass}
            disabled={loading}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="address" className={labelClass}>
            Domicilio *
          </label>

          <input
            type="text"
            id="address"
            name="address"
            required
            maxLength={250}
            placeholder="Ingresa tu dirección"
            className={inputClass}
            disabled={loading}
          />
        </div>

        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="department" className={labelClass}>
              Departamento *
            </label>

            <select
              name="department"
              id="department"
              defaultValue=""
              required
              className={inputClass}
              disabled={loading}
            >
              <option value="" disabled>
                Seleccione
              </option>

              {departamentos.map((e) => (
                <option key={e.codigo} value={e.nombre}>
                  {e.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="flex w-full flex-col gap-2">
            <label htmlFor="province" className={labelClass}>
              Provincia *
            </label>

            <input
              type="text"
              id="province"
              name="province"
              required
              maxLength={100}
              placeholder="Ingresa tu provincia"
              className={inputClass}
              disabled={loading}
            />
          </div>
        </div>

        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="district" className={labelClass}>
              Distrito *
            </label>

            <input
              type="text"
              id="district"
              name="district"
              required
              maxLength={100}
              placeholder="Ingresa tu distrito"
              className={inputClass}
              disabled={loading}
            />
          </div>

          <div className="flex w-full flex-col gap-2">
            <label htmlFor="phone" className={labelClass}>
              Teléfono *
            </label>

            <input
              type="tel"
              id="phone"
              name="phone"
              required
              maxLength={20}
              placeholder="Número de teléfono"
              className={inputClass}
              disabled={loading}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={labelClass}>
            Correo electrónico *
          </label>

          <input
            type="email"
            id="email"
            name="email"
            required
            maxLength={254}
            placeholder="correo@ejemplo.com"
            className={inputClass}
            disabled={loading}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className={labelClass}>
            ¿El reclamante es menor de edad? *
          </label>

          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 font-body text-sm text-black">
              <input
                type="radio"
                name="is_minor"
                value="false"
                defaultChecked
                required
                disabled={loading}
              />
              No
            </label>

            <label className="flex items-center gap-2 font-body text-sm text-black">
              <input
                type="radio"
                name="is_minor"
                value="true"
                required
                disabled={loading}
              />
              Sí
            </label>
          </div>
        </div>

        {/* 2. IDENTIFICACIÓN DEL BIEN CONTRATADO */}

        <h2 className="mb-4 mt-5 font-heading text-xl font-semibold text-muted">
          2° Identificación del bien contratado
        </h2>

        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="service_contracted" className={labelClass}>
              Servicio contratado *
            </label>

            <input
              type="text"
              id="service_contracted"
              name="service_contracted"
              required
              maxLength={200}
              placeholder="¿Con qué servicio no estás conforme?"
              className={inputClass}
              disabled={loading}
            />
          </div>

          <div className="flex w-full flex-col gap-2">
            <label htmlFor="claimed_amount" className={labelClass}>
              Monto reclamado (S/) *
            </label>

            <input
              type="number"
              id="claimed_amount"
              name="claimed_amount"
              required
              min="0"
              step="0.01"
              placeholder="0.00"
              className={inputClass}
              disabled={loading}
            />
          </div>
        </div>

        {/* 3. DETALLE DE LA RECLAMACIÓN */}

        <h2 className="mt-5 font-heading text-xl font-semibold text-muted">
          3° Detalle de reclamación
        </h2>

        <div className="flex flex-col gap-2 bg-gray/40 p-3">
          <p className="font-body text-sm text-black">
            <strong>Reclamo:</strong> Disconformidad relacionada con los
            productos o servicios.
          </p>

          <p className="font-body text-sm text-black">
            <strong>Queja:</strong> Disconformidad no relacionada con los
            productos o servicios; o malestar o descontento respecto a la
            atención al público.
          </p>
        </div>

        <div className="flex flex-col gap-2.5">
          <p className={labelClass}>Tipo de solicitud *</p>

          <div className="flex flex-row gap-6">
            <label
              htmlFor="request_claim"
              className="flex cursor-pointer items-center gap-2 font-body text-base font-bold text-black"
            >
              <input
                type="radio"
                name="request_type"
                id="request_claim"
                value="reclamo"
                required
                disabled={loading}
              />
              Reclamo
            </label>

            <label
              htmlFor="request_complaint"
              className="flex cursor-pointer items-center gap-2 font-body text-base font-bold text-black"
            >
              <input
                type="radio"
                name="request_type"
                id="request_complaint"
                value="queja"
                required
                disabled={loading}
              />
              Queja
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="description" className={labelClass}>
            Detalle *
          </label>

          <textarea
            name="description"
            id="description"
            required
            minLength={10}
            maxLength={2000}
            rows={8}
            placeholder="Explique detalladamente los hechos..."
            className={inputClass}
            disabled={loading}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="requested_solution" className={labelClass}>
            Pedido (¿Qué solicita?) *
          </label>

          <textarea
            name="requested_solution"
            id="requested_solution"
            required
            minLength={5}
            maxLength={1000}
            rows={6}
            placeholder="¿Qué solución espera por parte de la empresa?"
            className={inputClass}
            disabled={loading}
          />
        </div>

        {/* 4. CONFORMIDAD */}

        <div className="flex flex-col gap-3">
          <h2 className="mt-5 font-heading text-xl font-semibold text-muted">
            4° Conformidad
          </h2>

          <label className="flex items-start gap-2 font-body text-sm text-black">
            <input
              type="checkbox"
              name="information_is_truthful"
              value="true"
              required
              className="mt-1"
              disabled={loading}
            />
            <span>Declaro que la información consignada es veraz.</span>
          </label>

          <label className="flex items-start gap-2 font-body text-sm text-black">
            <input
              type="checkbox"
              name="personal_data_consent"
              value="true"
              required
              className="mt-1"
              disabled={loading}
            />
            <span>
              Autorizo el tratamiento de mis datos personales para atender
              este reclamo.
            </span>
          </label>
        </div>

        {/* MENSAJE DE ERROR */}

        {error && (
          <div
            role="alert"
            className="border border-error/30 bg-error/5 p-4 font-body text-sm text-error"
          >
            {error}
          </div>
        )}

        {/* ENVÍO */}

        <div className="mt-3">
          <button
            type="submit"
            disabled={loading}
            className="group w-full cursor-pointer bg-primary px-5 py-6 font-body font-semibold uppercase text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="inline-block duration-300 ease-in-out group-hover:scale-105">
              {loading ? "Enviando reclamo..." : "Enviar reclamo"}
            </span>
          </button>
        </div>
      </div>
    </form>
  );
}
