
"use client";

import { useState, useTransition } from "react";
import { registerClient } from "./actions";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiBriefcase,
  FiHash,
  FiEye,
  FiEyeOff,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

export default function ClientesPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{
    success: boolean;
    text: string;
  } | null>(null);

  function handleSubmit(formData: FormData) {
    setMessage(null);

    startTransition(async () => {
      const result = await registerClient(formData);

      setMessage({
        success: result.success,
        text: result.message,
      });

      if (result.success) {
        const form = document.getElementById(
          "register-client-form"
        ) as HTMLFormElement | null;

        form?.reset();
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8">
      <div>
        <span className="font-body text-xs font-bold uppercase tracking-wider text-secondary">
          Administración
        </span>

        <h1 className="mt-2 font-heading text-3xl font-bold text-primary">
          Registrar cliente
        </h1>

        <p className="mt-2 max-w-2xl font-body text-sm leading-6 text-muted">
          Registra una nueva empresa y crea sus credenciales de acceso al
          portal de seguimiento de Aurum Logistics.
        </p>
      </div>

      <form
        id="register-client-form"
        action={handleSubmit}
        className="border border-border bg-white"
      >
        <div className="border-b border-border px-6 py-5 md:px-8">
          <h2 className="font-body text-base font-bold text-primary">
            Información de la empresa
          </h2>
          <p className="mt-1 font-body text-sm text-muted">
            Datos generales de identificación y contacto.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2 md:p-8">
          <div className="md:col-span-2">
            <label
              htmlFor="razon_social"
              className="mb-2 block font-body text-sm font-semibold text-accent"
            >
              Razón social <span className="text-error">*</span>
            </label>

            <div className="flex border border-border focus-within:border-primary">
              <span className="flex items-center border-r border-border bg-gray px-3 text-muted">
                <FiBriefcase size={17} />
              </span>
              <input
                id="razon_social"
                name="razon_social"
                type="text"
                required
                placeholder="Nombre de la empresa"
                className="min-w-0 flex-1 bg-white px-4 py-3 font-body text-sm text-accent outline-none"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="ruc"
              className="mb-2 block font-body text-sm font-semibold text-accent"
            >
              RUC <span className="text-error">*</span>
            </label>

            <div className="flex border border-border focus-within:border-primary">
              <span className="flex items-center border-r border-border bg-gray px-3 text-muted">
                <FiHash size={17} />
              </span>
              <input
                id="ruc"
                name="ruc"
                type="text"
                inputMode="numeric"
                pattern="[0-9]{11}"
                maxLength={11}
                required
                placeholder="20123456789"
                className="min-w-0 flex-1 bg-white px-4 py-3 font-body text-sm text-accent outline-none"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="telefono"
              className="mb-2 block font-body text-sm font-semibold text-accent"
            >
              Teléfono
            </label>

            <div className="flex border border-border focus-within:border-primary">
              <span className="flex items-center border-r border-border bg-gray px-3 text-muted">
                <FiPhone size={17} />
              </span>
              <input
                id="telefono"
                name="telefono"
                type="tel"
                placeholder="+51 999 999 999"
                className="min-w-0 flex-1 bg-white px-4 py-3 font-body text-sm text-accent outline-none"
              />
            </div>
          </div>
        </div>

        <div className="border-y border-border px-6 py-5 md:px-8">
          <h2 className="font-body text-base font-bold text-primary">
            Información del usuario
          </h2>
          <p className="mt-1 font-body text-sm text-muted">
            Credenciales de acceso para el representante de la empresa.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2 md:p-8">
          <div className="md:col-span-2">
            <label
              htmlFor="nombre_completo"
              className="mb-2 block font-body text-sm font-semibold text-accent"
            >
              Nombre completo <span className="text-error">*</span>
            </label>

            <div className="flex border border-border focus-within:border-primary">
              <span className="flex items-center border-r border-border bg-gray px-3 text-muted">
                <FiUser size={17} />
              </span>
              <input
                id="nombre_completo"
                name="nombre_completo"
                type="text"
                required
                placeholder="Nombre del contacto"
                className="min-w-0 flex-1 bg-white px-4 py-3 font-body text-sm text-accent outline-none"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="email"
              className="mb-2 block font-body text-sm font-semibold text-accent"
            >
              Correo electrónico <span className="text-error">*</span>
            </label>

            <div className="flex border border-border focus-within:border-primary">
              <span className="flex items-center border-r border-border bg-gray px-3 text-muted">
                <FiMail size={17} />
              </span>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="contacto@empresa.com"
                className="min-w-0 flex-1 bg-white px-4 py-3 font-body text-sm text-accent outline-none"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="password"
              className="mb-2 block font-body text-sm font-semibold text-accent"
            >
              Contraseña <span className="text-error">*</span>
            </label>

            <div className="flex border border-border focus-within:border-primary">
              <span className="flex items-center border-r border-border bg-gray px-3 text-muted">
                <FiLock size={17} />
              </span>

              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                minLength={8}
                required
                placeholder="Mínimo 8 caracteres"
                className="min-w-0 flex-1 bg-white px-4 py-3 font-body text-sm text-accent outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={
                  showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                }
                className="border-l border-border px-4 text-muted hover:bg-gray hover:text-primary"
              >
                {showPassword ? (
                  <FiEyeOff size={17} />
                ) : (
                  <FiEye size={17} />
                )}
              </button>
            </div>

            <p className="mt-2 font-body text-xs text-muted">
              La contraseña será asignada al cliente y no podrá modificarse
              desde el portal en esta versión.
            </p>
          </div>
        </div>

        {message && (
          <div
            role="status"
            className={`mx-6 mb-6 flex items-start gap-3 border p-4 md:mx-8 ${
              message.success
                ? "border-positive/30 bg-positive/5 text-positive"
                : "border-error/30 bg-error/5 text-error"
            }`}
          >
            {message.success ? (
              <FiCheckCircle className="mt-0.5 shrink-0" />
            ) : (
              <FiAlertCircle className="mt-0.5 shrink-0" />
            )}

            <p className="font-body text-sm">{message.text}</p>
          </div>
        )}

        <div className="flex flex-col justify-between gap-4 border-t border-border bg-gray/50 px-6 py-5 sm:flex-row sm:items-center md:px-8">
          <p className="font-body text-xs text-muted">
            Los campos marcados con * son obligatorios.
          </p>

          <button
            type="submit"
            disabled={isPending}
            className="bg-primary px-7 py-3 font-body text-sm font-bold text-white transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Registrando..." : "Registrar cliente"}
          </button>
        </div>
      </form>
    </div>
  );
}
