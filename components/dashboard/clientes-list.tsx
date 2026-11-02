
"use client";

import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  FiSearch,
  FiUsers,
  FiPhone,
  FiCalendar,
  FiTrash2,
} from "react-icons/fi";

import { eliminarEmpresa } from "@/app/(dashbaord)/dashboard/clientes/listado/action";

export interface ClientCompany {
  id: string;
  razon_social: string;
  ruc: string;
  telefono: string | null;
  created_at: string;
  contactos: string[];
}

interface ClientesListProps {
  clients: ClientCompany[];
}

export function ClientesList({ clients }: ClientesListProps) {
  const [search, setSearch] = useState("");
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const router = useRouter();

  const filteredClients = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return clients;

    return clients.filter(
      (client) =>
        client.razon_social.toLowerCase().includes(term) ||
        client.ruc.includes(term) ||
        client.contactos.some((contact) =>
          contact.toLowerCase().includes(term)
        )
    );
  }, [clients, search]);

  function handleDelete(client: ClientCompany) {
    const confirmed = window.confirm(
      `¿Estás seguro de eliminar la empresa "${client.razon_social}"?\n\nSolo se eliminará si no tiene operaciones ni usuarios asociados.`
    );

    if (!confirmed) return;

    setMessage("");
    setDeletingId(client.id);

    startTransition(async () => {
      try {
        const result = await eliminarEmpresa(client.id);

        setMessage(result.message);

        if (result.success) {
          router.refresh();
        }
      } catch {
        setMessage("Ocurrió un error al intentar eliminar la empresa.");
      } finally {
        setDeletingId(null);
      }
    });
  }

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="font-heading text-xl font-bold text-accent">
            Clientes registrados
          </h2>
          <p className="mt-1 text-sm text-muted">
            Consulta las empresas y sus datos de contacto.
          </p>
        </div>

        <div className="flex items-center gap-2 border border-border bg-white px-4 py-2">
          <FiUsers className="text-primary" size={19} />
          <span className="text-sm font-semibold text-accent">
            {clients.length}
          </span>
          <span className="text-sm text-muted">
            {clients.length === 1 ? "empresa" : "empresas"}
          </span>
        </div>
      </div>

      {/* Mensaje de resultado */}
      {message && (
        <div
          role="status"
          className="border border-border bg-gray p-4 text-sm text-accent"
        >
          {message}
        </div>
      )}

      {/* Búsqueda */}
      <div className="relative max-w-md">
        <FiSearch
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
        />
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar por empresa, RUC o contacto..."
          className="h-12 w-full border border-border bg-white pl-11 pr-4 text-sm text-accent outline-none transition-colors placeholder:text-muted focus:border-primary"
        />
      </div>

      {/* Tabla escritorio */}
      <div className="hidden overflow-hidden border border-border bg-white md:block">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-border bg-gray">
              <tr>
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-muted">
                  Empresa
                </th>
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-muted">
                  RUC
                </th>
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-muted">
                  Contacto
                </th>
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-muted">
                  Teléfono
                </th>
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-muted">
                  Registro
                </th>
                <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-muted">
                  Acción
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {filteredClients.map((client) => (
                <tr
                  key={client.id}
                  className="transition-colors hover:bg-gray/50"
                >
                  <td className="px-5 py-4">
                    <Link
                      href={`/dashboard/clientes/${client.id}`}
                      className="text-sm font-semibold text-primary hover:underline"
                    >
                      {client.razon_social}
                    </Link>
                  </td>

                  <td className="px-5 py-4 text-sm text-muted">
                    {client.ruc}
                  </td>

                  <td className="px-5 py-4 text-sm text-accent">
                    {client.contactos.length > 0
                      ? client.contactos.join(", ")
                      : "Sin contacto"}
                  </td>

                  <td className="px-5 py-4 text-sm text-muted">
                    {client.telefono || "No registrado"}
                  </td>

                  <td className="px-5 py-4 text-sm text-muted">
                    {client.created_at.slice(0, 10)}
                  </td>

                  <td className="px-5 py-4 text-center">
                    <button
                      type="button"
                      onClick={() => handleDelete(client)}
                      disabled={isPending}
                      title="Eliminar empresa"
                      className="inline-flex items-center justify-center gap-2 border border-error px-3 py-2 text-xs font-semibold text-error transition-colors hover:bg-error hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <FiTrash2 size={15} />
                      {deletingId === client.id ? "Eliminando..." : "Eliminar"}
                    </button>
                  </td>
                </tr>
              ))}

              {filteredClients.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-12 text-center text-sm text-muted"
                  >
                    {search
                      ? "No se encontraron clientes con esa búsqueda."
                      : "Todavía no hay clientes registrados."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tarjetas móvil */}
      <div className="space-y-3 md:hidden">
        {filteredClients.map((client) => (
          <article
            key={client.id}
            className="border border-border bg-white p-4"
          >
            <Link
              href={`/dashboard/clientes/${client.id}`}
              className="text-sm font-semibold text-primary hover:underline"
            >
              {client.razon_social}
            </Link>

            <p className="mt-1 text-xs text-muted">RUC: {client.ruc}</p>

            <div className="mt-4 space-y-3 border-t border-border pt-3">
              <div className="flex items-start gap-2 text-sm text-muted">
                <FiUsers size={16} className="mt-0.5 shrink-0 text-primary" />
                <span>
                  {client.contactos.length > 0
                    ? client.contactos.join(", ")
                    : "Sin contacto registrado"}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted">
                <FiPhone size={16} className="shrink-0 text-primary" />
                <span>{client.telefono || "No registrado"}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted">
                <FiCalendar size={16} className="shrink-0 text-primary" />
                <span>{client.created_at.slice(0, 10)}</span>
              </div>

              <button
                type="button"
                onClick={() => handleDelete(client)}
                disabled={isPending}
                className="inline-flex w-full items-center justify-center gap-2 border border-error px-4 py-3 text-sm font-semibold text-error transition-colors hover:bg-error hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FiTrash2 size={16} />
                {deletingId === client.id ? "Eliminando..." : "Eliminar empresa"}
              </button>
            </div>
          </article>
        ))}

        {filteredClients.length === 0 && (
          <div className="border border-border bg-white px-4 py-10 text-center text-sm text-muted">
            {search
              ? "No se encontraron clientes con esa búsqueda."
              : "Todavía no hay clientes registrados."}
          </div>
        )}
      </div>

      <p className="text-xs text-muted">
        Mostrando {filteredClients.length} de {clients.length} empresas.
      </p>
    </div>
  );
}
