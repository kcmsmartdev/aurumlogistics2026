
"use client";

import { useActionState } from "react";
import type { ReactNode } from "react";
import { FiSave, FiAlertCircle } from "react-icons/fi";
import {
  registerOperation,
  updateOperation,
  type OperationState,
} from "@/app/(dashbaord)/dashboard/operaciones/actions";

interface Company {
  id: string;
  razon_social: string;
  ruc: string;
}

interface Operation {
  id: string;
  company_id: string;
  awb: string;
  description: string | null;
  transport_type: string;
  service_type: string | null;
  airline: string | null;
  origin: string;
  destination: string;
  warehouse: string | null;
  status: string;
  etd: string | null;
  eta: string | null;
  quantity: number | null;
  weight: number | null;
  consignee: string | null;
  dam: string | null;
  channel: string | null;
  observations: string | null;
}

interface OperationFormProps {
  companies: Company[];
  operation?: Operation;
}

const initialState: OperationState = {
  success: false,
  message: "",
};

const inputClass =
  "h-11 w-full border border-border bg-white px-3 text-sm text-accent outline-none focus:border-primary";

const labelClass = "mb-2 block text-xs font-semibold text-accent";

function formatDate(value: string | null) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  const localDate = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  );

  return localDate.toISOString().slice(0, 16);
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="border border-border bg-white">
      <div className="border-b border-border px-5 py-4">
        <h2 className="font-heading text-base font-bold text-accent">
          {title}
        </h2>

        {description && (
          <p className="mt-1 text-xs text-muted">{description}</p>
        )}
      </div>

      {children}
    </section>
  );
}

export function OperationForm({
  companies,
  operation,
}: OperationFormProps) {
  const isEditing = Boolean(operation);

  const action = isEditing ? updateOperation : registerOperation;

  const [state, formAction, pending] = useActionState(
    action,
    initialState
  );

  return (
    <form action={formAction} className="space-y-6">
      {isEditing && operation && (
        <input type="hidden" name="id" value={operation.id} />
      )}

      {!companies.length && (
        <div className="flex items-start gap-3 border border-alert/30 bg-alert/5 p-4">
          <FiAlertCircle className="mt-0.5 shrink-0 text-alert" size={18} />

          <div>
            <p className="text-sm font-semibold text-alert">
              No hay empresas registradas
            </p>
            <p className="mt-1 text-xs leading-relaxed text-muted">
              Primero debes registrar una empresa desde el módulo de clientes
              para poder asociarla a una operación.
            </p>
          </div>
        </div>
      )}

      {/* Empresa y guía aérea */}
      <Section
        title="Empresa y guía aérea"
        description="Selecciona el cliente y registra el número de guía."
      >
        <div className="grid gap-5 p-5 md:grid-cols-2">
          <div>
            <label htmlFor="company_id" className={labelClass}>
              Empresa <span className="text-error">*</span>
            </label>

            <select
              id="company_id"
              name="company_id"
              required
              defaultValue={operation?.company_id ?? ""}
              disabled={!companies.length}
              className={inputClass}
            >
              <option value="" disabled>
                Seleccionar empresa
              </option>

              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.razon_social} - {company.ruc}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="awb" className={labelClass}>
              Número de AWB <span className="text-error">*</span>
            </label>

            <input
              id="awb"
              name="awb"
              type="text"
              placeholder="Ej. 057-53353204"
              required
              maxLength={20}
              defaultValue={operation?.awb ?? ""}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="description" className={labelClass}>
              Descripción de mercancía
            </label>

            <input
              id="description"
              name="description"
              type="text"
              placeholder="Ej. BARRAS DE ORO"
              defaultValue={operation?.description ?? ""}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="service_type" className={labelClass}>
              Tipo de servicio
            </label>

            <input
              id="service_type"
              name="service_type"
              type="text"
              placeholder="Ej. VALORADO"
              defaultValue={operation?.service_type ?? ""}
              className={inputClass}
            />
          </div>
        </div>
      </Section>

      {/* Información del transporte */}
      <Section
        title="Información del transporte"
        description="Datos de transporte, origen y destino."
      >
        <div className="grid gap-5 p-5 md:grid-cols-2">
          <div>
            <label htmlFor="transport_type" className={labelClass}>
              Vía de transporte <span className="text-error">*</span>
            </label>

            <select
              id="transport_type"
              name="transport_type"
              required
              defaultValue={operation?.transport_type ?? "AEREA"}
              className={inputClass}
            >
              <option value="AEREA">Aérea</option>
              <option value="MARITIMA">Marítima</option>
              <option value="TERRESTRE">Terrestre</option>
            </select>
          </div>

          <div>
            <label htmlFor="airline" className={labelClass}>
              Aerolínea / Transportista
            </label>

            <input
              id="airline"
              name="airline"
              type="text"
              placeholder="Ej. KLM"
              defaultValue={operation?.airline ?? ""}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="origin" className={labelClass}>
              Origen <span className="text-error">*</span>
            </label>

            <input
              id="origin"
              name="origin"
              type="text"
              placeholder="Ej. LIMA"
              required
              defaultValue={operation?.origin ?? ""}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="destination" className={labelClass}>
              Destino <span className="text-error">*</span>
            </label>

            <input
              id="destination"
              name="destination"
              type="text"
              placeholder="Ej. DUBAI"
              required
              defaultValue={operation?.destination ?? ""}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="warehouse" className={labelClass}>
              Almacén
            </label>

            <input
              id="warehouse"
              name="warehouse"
              type="text"
              placeholder="Ej. SAASA"
              defaultValue={operation?.warehouse ?? ""}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="status" className={labelClass}>
              Estado de operación
            </label>

            <select
              id="status"
              name="status"
              defaultValue={operation?.status ?? "Pendiente"}
              className={inputClass}
            >
              <option value="Pendiente">Pendiente</option>
              <option value="En proceso">En proceso</option>
              <option value="En tránsito">En tránsito</option>
              <option value="Finalizado">Finalizado</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>
        </div>
      </Section>

      {/* Fechas y datos de la carga */}
      <Section
        title="Fechas y datos de la carga"
        description="Información estimada de salida, llegada y mercancía."
      >
        <div className="grid gap-5 p-5 md:grid-cols-2">
          <div>
            <label htmlFor="etd" className={labelClass}>
              ETD · Salida estimada
            </label>

            <input
              id="etd"
              name="etd"
              type="datetime-local"
              defaultValue={formatDate(operation?.etd ?? null)}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="eta" className={labelClass}>
              ETA · Llegada estimada
            </label>

            <input
              id="eta"
              name="eta"
              type="datetime-local"
              defaultValue={formatDate(operation?.eta ?? null)}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="quantity" className={labelClass}>
              Cantidad de bultos
            </label>

            <input
              id="quantity"
              name="quantity"
              type="number"
              min="0"
              step="1"
              placeholder="Ej. 1"
              defaultValue={operation?.quantity ?? ""}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="weight" className={labelClass}>
              Peso (kg)
            </label>

            <input
              id="weight"
              name="weight"
              type="number"
              min="0"
              step="0.01"
              placeholder="Ej. 6"
              defaultValue={operation?.weight ?? ""}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="consignee" className={labelClass}>
              Consignatario
            </label>

            <input
              id="consignee"
              name="consignee"
              type="text"
              placeholder="Nombre del consignatario"
              defaultValue={operation?.consignee ?? ""}
              className={inputClass}
            />
          </div>
        </div>
      </Section>

      {/* Información aduanera */}
      <Section title="Información aduanera y observaciones">
        <div className="space-y-5 p-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="dam" className={labelClass}>
                Número de DAM
              </label>

              <input
                id="dam"
                name="dam"
                type="text"
                placeholder="Ej. 235-2025-40-16546"
                defaultValue={operation?.dam ?? ""}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="channel" className={labelClass}>
                Canal aduanero
              </label>

              <select
                id="channel"
                name="channel"
                defaultValue={operation?.channel ?? ""}
                className={inputClass}
              >
                <option value="">Seleccionar canal</option>
                <option value="Verde">Verde</option>
                <option value="Naranja">Naranja</option>
                <option value="Rojo">Rojo</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="observations" className={labelClass}>
              Observaciones
            </label>

            <textarea
              id="observations"
              name="observations"
              rows={4}
              placeholder="Escribe información adicional de la operación..."
              defaultValue={operation?.observations ?? ""}
              className="w-full resize-y border border-border bg-white px-3 py-3 text-sm text-accent outline-none focus:border-primary"
            />
          </div>
        </div>
      </Section>

      {/* Mensaje del servidor */}
      {state.message && (
        <div
          className={`border p-4 text-sm ${
            state.success
              ? "border-positive/30 bg-positive/5 text-positive"
              : "border-error/30 bg-error/5 text-error"
          }`}
          role="status"
        >
          {state.message}
        </div>
      )}

      {/* Botón de envío */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={pending || companies.length === 0}
          className="flex h-12 items-center justify-center gap-2 bg-primary px-7 text-sm font-semibold text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
        >
          <FiSave size={17} />

          {pending
            ? isEditing
              ? "Guardando cambios..."
              : "Registrando..."
            : isEditing
              ? "Guardar cambios"
              : "Registrar operación"}
        </button>
      </div>
    </form>
  );
}
