
import Link from "next/link";
import {
  FiPackage,
  FiTruck,
  FiClock,
  FiCheckCircle,
  FiSearch,
  FiFolder,
  FiFileText,
  FiArrowUpRight,
  FiArrowRight,
} from "react-icons/fi";

const stats = [
  {
    label: "Total de operaciones",
    value: 0,
    description: "Operaciones registradas",
    icon: FiPackage,
  },
  {
    label: "En tránsito",
    value: 0,
    description: "Operaciones en curso",
    icon: FiTruck,
  },
  {
    label: "Pendientes",
    value: 0,
    description: "Requieren seguimiento",
    icon: FiClock,
  },
  {
    label: "Finalizadas",
    value: 0,
    description: "Operaciones completadas",
    icon: FiCheckCircle,
  },
];

const quickAccess = [
  {
    title: "Buscar operación",
    description: "Consulta el estado de una guía aérea.",
    href: "/dashboard/busqueda",
    icon: FiSearch,
  },
  {
    title: "Tus documentos",
    description: "Revisa tus guías y documentos.",
    href: "/dashboard/documentos",
    icon: FiFolder,
  },
  {
    title: "Consultar reclamo",
    description: "Revisa el estado de tus reclamos.",
    href: "/dashboard/consultar-reclamo",
    icon: FiFileText,
  },
];

const recentOperations: {
  guide: string;
  description: string;
  origin: string;
  destination: string;
  date: string;
  status: string;
}[] = [];

export default function DashboardPage() {
  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-8">
      {/* Bienvenida */}
      <section>
        <p className="text-sm font-medium text-primary">
          PORTAL DE CLIENTES
        </p>

        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-accent md:text-3xl">
          Bienvenido a tu espacio de operaciones
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          Consulta tus operaciones, revisa tus documentos y mantente
          informado sobre el estado de tus envíos.
        </p>
      </section>

      {/* Indicadores */}
      <section>
        <div className="mb-4">
          <h3 className="text-base font-semibold text-accent">
            Resumen de operaciones
          </h3>
          <p className="mt-1 text-xs text-muted">
            Vista general de tus operaciones registradas.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <article
                key={stat.label}
                className="rounded-xl border border-border bg-white p-5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">
                    {stat.label}
                  </span>

                  <div className="rounded-lg bg-gray p-2.5 text-primary">
                    <Icon size={19} />
                  </div>
                </div>

                <p className="mt-5 text-3xl font-semibold tracking-tight text-accent">
                  {stat.value}
                </p>

                <p className="mt-1 text-xs text-muted">
                  {stat.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Accesos rápidos */}
      <section>
        <div className="mb-4">
          <h3 className="text-base font-semibold text-accent">
            Accesos rápidos
          </h3>
          <p className="mt-1 text-xs text-muted">
            Encuentra fácilmente las herramientas que necesitas.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {quickAccess.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                className="group flex items-start gap-4 rounded-xl border border-border bg-white p-5 transition-colors hover:border-secondary"
              >
                <div className="rounded-lg bg-gray p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <Icon size={21} />
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-semibold text-accent">
                    {item.title}
                  </h4>

                  <p className="mt-1 text-xs leading-5 text-muted">
                    {item.description}
                  </p>
                </div>

                <FiArrowUpRight
                  size={17}
                  className="shrink-0 text-muted transition-colors group-hover:text-primary"
                />
              </Link>
            );
          })}
        </div>
      </section>

      {/* Operaciones recientes */}
      <section className="overflow-hidden rounded-xl border border-border bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-5">
          <div>
            <h3 className="text-base font-semibold text-accent">
              Operaciones recientes
            </h3>
            <p className="mt-1 text-xs text-muted">
              Consulta tus últimos movimientos registrados.
            </p>
          </div>

          <Link
            href="/dashboard/documentos"
            className="flex items-center gap-2 text-xs font-semibold text-primary hover:underline"
          >
            Ver todas
            <FiArrowRight size={15} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left">
            <thead>
              <tr className="bg-gray/70">
                <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-muted">
                  Guía aérea
                </th>
                <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-muted">
                  Descripción
                </th>
                <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-muted">
                  Ruta
                </th>
                <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-muted">
                  Fecha
                </th>
                <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-muted">
                  Estado
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {recentOperations.length > 0 ? (
                recentOperations.map((operation) => (
                  <tr
                    key={operation.guide}
                    className="transition-colors hover:bg-gray/40"
                  >
                    <td className="px-5 py-4">
                      <Link
                        href={`/dashboard/busqueda?guia=${operation.guide}`}
                        className="text-xs font-semibold text-primary hover:underline"
                      >
                        {operation.guide}
                      </Link>
                    </td>

                    <td className="px-5 py-4 text-xs text-accent">
                      {operation.description}
                    </td>

                    <td className="px-5 py-4 text-xs text-muted">
                      {operation.origin} → {operation.destination}
                    </td>

                    <td className="px-5 py-4 text-xs text-muted">
                      {operation.date}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-medium ${
                          operation.status === "Finalizada"
                            ? "bg-green-50 text-positive"
                            : "bg-blue-50 text-primary"
                        }`}
                      >
                        {operation.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-sm text-muted">
                    Aún no hay operaciones registradas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
