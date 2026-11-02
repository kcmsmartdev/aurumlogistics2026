import Link from "next/link";
import { connection } from "next/server";
import { obtenerReclamos } from "./actions";
import {
  FiAlertCircle,
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiFileText,
} from "react-icons/fi";
import FormularioRespuestaReclamo from "@/components/contacto/formulario-respuesta-reclamo";
export const metadata = {
  title: "Consultar Reclamos | Aurum Logistics",
};

function formatearFecha(fecha: string) {
  return new Intl.DateTimeFormat("es-PE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(fecha));
}

function EstadoReclamo({ estado }: { estado: string }) {
  const estilos: Record<string, string> = {
    Registrado: "bg-gray text-muted",
    "En revisión": "bg-orange-50 text-alert",
    Respondido: "bg-blue-50 text-primary",
    Aceptado: "bg-green-50 text-positive",
    Apelado: "bg-purple-50 text-purple-700",
    Cerrado: "bg-gray text-muted",
  };

  return (
    <span
      className={`inline-flex px-3 py-1 text-xs font-semibold ${
        estilos[estado] ?? "bg-gray text-muted"
      }`}
    >
      {estado}
    </span>
  );
}

export default async function ConsultarReclamosPage() {
  await connection();

  const resultado = await obtenerReclamos();
  const reclamos = resultado.reclamos;

  const registrados = reclamos.filter(
    (reclamo) => reclamo.status === "Registrado"
  ).length;

  const enRevision = reclamos.filter(
    (reclamo) => reclamo.status === "En revisión"
  ).length;

  const respondidos = reclamos.filter(
    (reclamo) => reclamo.status === "Respondido"
  ).length;

  return (
    <main className="flex flex-col gap-8">
      {/* Encabezado */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-heading text-2xl font-bold text-black">
            Reclamos
          </h1>

          <p className="mt-1 text-sm text-muted">
            Administra y consulta los reclamos registrados por los clientes.
          </p>
        </div>

        <Link
          href="https://aurumlogistics.com.pe/tracking/libro-de-reclamaciones/"
          target="_blank"
          className="inline-flex items-center justify-center gap-2 bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent"
        >
          <FiFileText size={16} />
          Libro de reclamaciones
        </Link>
      </div>

      {/* Resumen */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="border border-border bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted">Total de reclamos</p>
            <FiFileText className="text-primary" size={20} />
          </div>

          <p className="mt-3 text-3xl font-bold text-black">
            {reclamos.length}
          </p>
        </div>

        <div className="border border-border bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted">Registrados</p>
            <FiAlertCircle className="text-alert" size={20} />
          </div>

          <p className="mt-3 text-3xl font-bold text-black">
            {registrados}
          </p>
        </div>

        <div className="border border-border bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted">En revisión</p>
            <FiClock className="text-alert" size={20} />
          </div>

          <p className="mt-3 text-3xl font-bold text-black">
            {enRevision}
          </p>
        </div>

        <div className="border border-border bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted">Respondidos</p>
            <FiCheckCircle className="text-positive" size={20} />
          </div>

          <p className="mt-3 text-3xl font-bold text-black">
            {respondidos}
          </p>
        </div>
      </div>

      {/* Tabla */}
      <section className="border border-border bg-white">
        <div className="flex flex-col gap-1 border-b border-border p-5">
          <h2 className="font-heading text-lg font-bold text-black">
            Reclamos registrados
          </h2>

          <p className="text-sm text-muted">
            Listado de los reclamos recibidos por Aurum Logistics.
          </p>
        </div>

        {!resultado.success ? (
          <div className="p-8 text-center">
            <p className="text-sm text-error">
              {resultado.message}
            </p>
          </div>
        ) : reclamos.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
            <FiFileText size={35} className="text-muted-reverse" />

            <h3 className="mt-4 font-semibold text-black">
              No hay reclamos registrados
            </h3>

            <p className="mt-1 text-sm text-muted">
              Cuando un cliente registre un reclamo, aparecerá en esta sección.
            </p>
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="bg-gray text-xs uppercase text-muted">
                <tr>
                  <th className="px-5 py-4 font-semibold">Código</th>
                  <th className="px-5 py-4 font-semibold">Cliente</th>
                  <th className="px-5 py-4 font-semibold">Tipo</th>
                  <th className="px-5 py-4 font-semibold">Fecha</th>
                  <th className="px-5 py-4 font-semibold">Estado</th>
                  <th className="px-5 py-4 text-right font-semibold">
                    Acción
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {reclamos.map((reclamo) => (
                  <tr
                    key={reclamo.id}
                    className="transition hover:bg-gray/50"
                  >
                    <td className="px-5 py-4">
                      <span className="font-semibold text-primary">
                        {reclamo.tracking_code}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <p className="font-semibold text-black">
                        {reclamo.full_name}
                      </p>

                      <p className="mt-1 text-xs text-muted">
                        {reclamo.email}
                      </p>
                    </td>

                    <td className="px-5 py-4 capitalize text-muted">
                      {reclamo.request_type}
                    </td>

                    <td className="px-5 py-4 text-muted">
                      {formatearFecha(reclamo.created_at)}
                    </td>

                    <td className="px-5 py-4">
                      <EstadoReclamo estado={reclamo.status} />
                    </td>

                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/dashboard/consultar-reclamo/${reclamo.id}`}
                        className="inline-flex items-center gap-2 font-semibold text-primary hover:text-accent"
                      >
                        Ver detalle
                        <FiArrowRight size={16} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {resultado.success && reclamos.length > 0 && (
          <div className="border-t border-border px-5 py-4">
            <p className="text-xs text-muted">
              {reclamos.length}{" "}
              {reclamos.length === 1
                ? "reclamo registrado"
                : "reclamos registrados"}
            </p>
          </div>
        )}
      </section>
    </main>
  );
}