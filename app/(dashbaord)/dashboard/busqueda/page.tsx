
"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  FiSearch,
  FiPackage,
  FiMapPin,
  FiCalendar,
  FiTruck,
  FiFileText,
  FiBox,
  FiEdit2,
  FiUser,
  FiGlobe,
  FiHash,
  FiClock,
} from "react-icons/fi";
import { createClient } from "@/lib/supabase/client";

interface Operation {
  id: string;
  guide: string;
  client: string;
  category: string;
  transport: string;
  airline: string;
  origin: string;
  destination: string;
  warehouse: string;
  etd: string | null;
  eta: string | null;
  packages: number | null;
  weight: number | null;
  dam: string;
  consignee: string;
  channel: string;
  observations: string;
  status: string;
}

interface InfoItemProps {
  label: string;
  value?: string | number | null;
  icon?: React.ReactNode;
}

function InfoItem({ label, value, icon }: InfoItemProps) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-muted">{label}</p>

      <div className="flex items-center gap-2 text-sm font-semibold text-accent">
        {icon && <span className="text-primary">{icon}</span>}
        <span>{value || "No registrado"}</span>
      </div>
    </div>
  );
}

function SectionCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="border border-border bg-white">
      <div className="flex items-center gap-3 border-b border-border px-5 py-4">
        <span className="text-primary">{icon}</span>
        <h3 className="text-sm font-semibold text-accent">{title}</h3>
      </div>

      <div className="grid grid-cols-1 gap-6 p-5 sm:grid-cols-2 lg:grid-cols-3">
        {children}
      </div>
    </section>
  );
}

function formatDate(date: string | null) {
  if (!date) return "No registrado";

  return new Intl.DateTimeFormat("es-PE", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

function getStatusStyle(status: string) {
  switch (status) {
    case "Finalizado":
      return "bg-positive/10 text-positive";

    case "En proceso":
    case "En tránsito":
      return "bg-primary/10 text-primary";

    case "Cancelado":
      return "bg-error/10 text-error";

    default:
      return "bg-alert/10 text-alert";
  }
}

export default function BusquedaPage() {
  const [awb, setAwb] = useState("");
  const [operation, setOperation] = useState<Operation | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function checkRole() {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("user_id", user.id)
        .maybeSingle();

      setIsAdmin(profile?.role === "admin");
    }

    checkRole();
  }, []);

  async function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const searchValue = awb.trim();

    if (!searchValue) {
      setError("Ingresa un número de guía aérea (AWB).");
      setOperation(null);
      setSearched(false);
      return;
    }

    setLoading(true);
    setError("");
    setOperation(null);
    setSearched(false);

    const supabase = createClient();

    const { data, error: searchError } = await supabase
      .from("operations")
      .select(`
        id,
        awb,
        description,
        transport_type,
        service_type,
        airline,
        origin,
        destination,
        warehouse,
        etd,
        eta,
        quantity,
        weight,
        consignee,
        dam,
        channel,
        observations,
        status,
        companies (
          razon_social
        )
      `)
      .eq("awb", searchValue)
      .maybeSingle();

    if (searchError) {
      setError("Ocurrió un error al consultar la operación. Inténtalo nuevamente.");
      setLoading(false);
      setSearched(true);
      return;
    }

    if (!data) {
      setError("No encontramos ninguna operación con ese número de guía.");
      setLoading(false);
      setSearched(true);
      return;
    }

    const row = data as unknown as {
      id: string;
      awb: string;
      description: string | null;
      transport_type: string;
      service_type: string | null;
      airline: string | null;
      origin: string | null;
      destination: string | null;
      warehouse: string | null;
      etd: string | null;
      eta: string | null;
      quantity: number | null;
      weight: number | null;
      consignee: string | null;
      dam: string | null;
      channel: string | null;
      observations: string | null;
      status: string;
      companies: { razon_social: string } | null;
    };

    setOperation({
      id: row.id,
      guide: row.awb,
      client: row.companies?.razon_social || "No registrado",
      category: row.description || "No registrado",
      transport: row.transport_type || "No registrado",
      airline: row.airline || "No registrado",
      origin: row.origin || "No registrado",
      destination: row.destination || "No registrado",
      warehouse: row.warehouse || "No registrado",
      etd: row.etd,
      eta: row.eta,
      packages: row.quantity,
      weight: row.weight,
      dam: row.dam || "No registrado",
      consignee: row.consignee || "No registrado",
      channel: row.channel || "No registrado",
      observations: row.observations || "Sin observaciones.",
      status: row.status || "Pendiente",
    });

    setSearched(true);
    setLoading(false);
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">
          Operaciones
        </span>

        <h1 className="font-heading text-2xl font-bold text-accent sm:text-3xl">
          Búsqueda de operaciones
        </h1>

        <p className="max-w-2xl text-sm leading-relaxed text-muted">
          Consulta el estado y los detalles de tus operaciones ingresando el
          número de guía aérea (AWB).
        </p>
      </div>

      <section className="border border-border bg-white p-5 sm:p-6">
        <form onSubmit={handleSearch} className="space-y-4">
          <label
            htmlFor="awb"
            className="block text-sm font-semibold text-accent"
          >
            Número de guía aérea (AWB)
          </label>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <FiSearch
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
              />

              <input
                id="awb"
                type="text"
                value={awb}
                onChange={(event) => setAwb(event.target.value)}
                placeholder="Ej. 057-53353204"
                className="h-12 w-full border border-border bg-white pl-11 pr-4 text-sm text-accent outline-none transition-colors placeholder:text-muted/70 focus:border-primary"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex h-12 items-center justify-center gap-2 bg-primary px-7 text-sm font-semibold text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FiSearch size={17} />
              {loading ? "Buscando..." : "Buscar operación"}
            </button>
          </div>

          <p className="text-xs text-muted">
            Ingresa el número AWB completo para consultar tu operación.
          </p>
        </form>
      </section>

      {error && searched && (
        <div className="flex items-start gap-3 border border-error/20 bg-error/5 p-4">
          <FiFileText className="mt-0.5 shrink-0 text-error" size={18} />

          <div>
            <p className="text-sm font-semibold text-error">
              No se pudo completar la búsqueda
            </p>
            <p className="mt-1 text-sm text-muted">{error}</p>
          </div>
        </div>
      )}

      {operation && (
        <div className="space-y-6">
          <section className="border border-border bg-white">
            <div className="flex flex-col gap-5 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                  Resultado de búsqueda
                </p>

                <h2 className="font-heading text-xl font-bold text-accent">
                  AWB: {operation.guide}
                </h2>

                <p className="text-sm text-muted">{operation.client}</p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`inline-flex items-center px-4 py-2 text-xs font-semibold ${getStatusStyle(operation.status)}`}
                >
                  {operation.status}
                </span>

                {isAdmin && (
                  <Link
                    href={`/dashboard/operaciones/${operation.id}/editar`}
                    className="flex items-center justify-center gap-2 bg-primary px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-black"
                  >
                    <FiEdit2 size={15} />
                    Editar operación
                  </Link>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-3">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center bg-gray text-primary">
                  <FiPackage size={20} />
                </div>

                <div>
                  <p className="text-xs text-muted">Tipo de servicio</p>
                  <p className="text-sm font-semibold text-accent">
                    {operation.category}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center bg-gray text-primary">
                  <FiTruck size={20} />
                </div>

                <div>
                  <p className="text-xs text-muted">Transporte</p>
                  <p className="text-sm font-semibold text-accent">
                    {operation.transport}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center bg-gray text-primary">
                  <FiGlobe size={20} />
                </div>

                <div>
                  <p className="text-xs text-muted">Aerolínea / Naviera</p>
                  <p className="text-sm font-semibold text-accent">
                    {operation.airline}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <SectionCard title="Información de transporte" icon={<FiMapPin size={18} />}>
            <InfoItem
              label="Origen"
              value={operation.origin}
              icon={<FiMapPin size={15} />}
            />

            <InfoItem
              label="Destino"
              value={operation.destination}
              icon={<FiMapPin size={15} />}
            />

            <InfoItem
              label="Almacén"
              value={operation.warehouse}
              icon={<FiBox size={15} />}
            />

            <InfoItem
              label="ETD - Fecha de salida"
              value={formatDate(operation.etd)}
              icon={<FiCalendar size={15} />}
            />

            <InfoItem
              label="ETA - Fecha de llegada"
              value={formatDate(operation.eta)}
              icon={<FiClock size={15} />}
            />

            <InfoItem
              label="Tipo de transporte"
              value={operation.transport}
              icon={<FiTruck size={15} />}
            />
          </SectionCard>

          <SectionCard title="Detalles de la carga" icon={<FiPackage size={18} />}>
            <InfoItem
              label="Cantidad de bultos"
              value={operation.packages}
              icon={<FiBox size={15} />}
            />

            <InfoItem
              label="Peso (kg)"
              value={
                operation.weight !== null
                  ? `${operation.weight} kg`
                  : "No registrado"
              }
            />

            <InfoItem
              label="Consignatario"
              value={operation.consignee}
              icon={<FiUser size={15} />}
            />

            <InfoItem
              label="DAM"
              value={operation.dam}
              icon={<FiFileText size={15} />}
            />

            <InfoItem
              label="Canal"
              value={operation.channel}
              icon={<FiHash size={15} />}
            />

            <InfoItem
              label="Aerolínea / Naviera"
              value={operation.airline}
              icon={<FiTruck size={15} />}
            />
          </SectionCard>

          <section className="border border-border bg-white">
            <div className="flex items-center gap-3 border-b border-border px-5 py-4">
              <FiFileText className="text-primary" size={18} />
              <h3 className="text-sm font-semibold text-accent">
                Observaciones
              </h3>
            </div>

            <p className="whitespace-pre-line p-5 text-sm leading-relaxed text-muted">
              {operation.observations}
            </p>
          </section>
        </div>
      )}
    </div>
  );
}
