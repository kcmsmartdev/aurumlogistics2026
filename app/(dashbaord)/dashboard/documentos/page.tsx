
"use client";

import { useMemo, useState } from "react";
import {
  FiSearch,
  FiFileText,
  FiPackage,
  FiMapPin,
  FiCalendar,
  FiEye,
  FiX,
} from "react-icons/fi";

const documents = [
  {
    guide: "057-53353204",
    client: "CHLOPEZ EIRL",
    description: "BARRAS DE ORO",
    transport: "AÉREA",
    origin: "LIMA",
    destination: "DUBAI",
    weight: "6 kg",
    etd: "04/03/2025",
    eta: "06/03/2025",
    warehouse: "SAASA",
    category: "VALORADO",
    dam: "235-2025-40-16546",
    packages: "1 bulto",
    consignee: "JSK JEWELLERY LLC",
    observations:
      "BULTOS: 1 · ALMACÉN: SAASA · CONSIGNATARIO: JSK JEWELLERY LLC",
  },
];

type Document = (typeof documents)[number];

export default function DocumentosPage() {
  const [search, setSearch] = useState("");
  const [selectedDocument, setSelectedDocument] =
    useState<Document | null>(null);

  const filteredDocuments = useMemo(() => {
    return documents.filter((document) =>
      document.guide.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-7">
      {/* Encabezado */}
      <div>
        <span className="text-xs font-bold uppercase tracking-[0.15em] text-primary">
          Operaciones
        </span>

        <h1 className="mt-2 font-heading text-2xl font-bold text-accent md:text-3xl">
          Tus documentos
        </h1>

        <p className="mt-2 text-sm leading-6 text-muted">
          Consulta las guías aéreas y la información de tus operaciones.
        </p>
      </div>

      {/* Resumen y buscador */}
      <div className="flex flex-col gap-5 border border-border bg-white p-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center bg-gray text-primary">
            <FiFileText size={22} />
          </div>

          <div>
            <p className="text-xs text-muted">Documentos registrados</p>
            <p className="font-heading text-2xl font-bold text-accent">
              {filteredDocuments.length.toString().padStart(2, "0")}
            </p>
          </div>
        </div>

        <div className="relative w-full md:max-w-sm">
          <FiSearch
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
          />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar número de guía..."
            className="h-12 w-full border border-border bg-white pl-11 pr-4 text-sm text-accent outline-none transition-colors placeholder:text-muted/60 focus:border-primary"
          />
        </div>
      </div>

      {/* Tabla escritorio */}
      <section className="hidden border border-border bg-white lg:block">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <h2 className="font-heading text-base font-bold text-accent">
              Listado de operaciones
            </h2>
            <p className="mt-1 text-xs text-muted">
              Guías aéreas asociadas a tu cuenta.
            </p>
          </div>

          <span className="text-xs text-muted">
            {filteredDocuments.length} resultado(s)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px] text-left">
            <thead>
              <tr className="border-b border-border bg-gray/50">
                {[
                  "Guía",
                  "Vía",
                  "Origen",
                  "Destino",
                  "Peso",
                  "ETD",
                  "ETA",
                  "Observaciones",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="px-4 py-4 text-xs font-bold uppercase tracking-wide text-muted"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredDocuments.map((document) => (
                <tr
                  key={document.guide}
                  className="border-b border-border last:border-0 transition-colors hover:bg-gray/30"
                >
                  <td className="px-4 py-5">
                    <button
                      onClick={() => setSelectedDocument(document)}
                      className="text-sm font-bold text-primary hover:underline"
                    >
                      {document.guide}
                    </button>
                  </td>

                  <td className="px-4 py-5 text-sm text-accent">
                    {document.transport}
                  </td>

                  <td className="px-4 py-5 text-sm text-accent">
                    {document.origin}
                  </td>

                  <td className="px-4 py-5 text-sm text-accent">
                    {document.destination}
                  </td>

                  <td className="px-4 py-5 text-sm text-accent">
                    {document.weight}
                  </td>

                  <td className="px-4 py-5 text-sm text-accent">
                    {document.etd}
                  </td>

                  <td className="px-4 py-5 text-sm text-accent">
                    {document.eta}
                  </td>

                  <td className="max-w-56 px-4 py-5 text-xs leading-5 text-muted">
                    {document.observations}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredDocuments.length === 0 && (
            <EmptyState />
          )}
        </div>
      </section>

      {/* Tarjetas móvil */}
      <section className="flex flex-col gap-3 lg:hidden">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-base font-bold text-accent">
            Listado de operaciones
          </h2>

          <span className="text-xs text-muted">
            {filteredDocuments.length} resultado(s)
          </span>
        </div>

        {filteredDocuments.map((document) => (
          <article
            key={document.guide}
            className="border border-border bg-white p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs text-muted">Número de guía</p>

                <button
                  onClick={() => setSelectedDocument(document)}
                  className="mt-1 text-sm font-bold text-primary hover:underline"
                >
                  {document.guide}
                </button>
              </div>

              <span className="border border-primary/20 bg-primary/5 px-2 py-1 text-xs font-bold text-primary">
                {document.transport}
              </span>
            </div>

            <div className="my-4 grid grid-cols-2 gap-4 border-y border-border py-4">
              <div>
                <p className="text-xs text-muted">Origen</p>
                <p className="mt-1 text-sm font-semibold text-accent">
                  {document.origin}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted">Destino</p>
                <p className="mt-1 text-sm font-semibold text-accent">
                  {document.destination}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted">Peso</p>
                <p className="mt-1 text-sm font-semibold text-accent">
                  {document.weight}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted">ETD / ETA</p>
                <p className="mt-1 text-sm font-semibold text-accent">
                  {document.etd} / {document.eta}
                </p>
              </div>
            </div>

            <p className="text-xs leading-5 text-muted">
              {document.observations}
            </p>

            <button
              onClick={() => setSelectedDocument(document)}
              className="mt-4 flex w-full items-center justify-center gap-2 border border-border py-3 text-sm font-semibold text-primary transition-colors hover:bg-gray"
            >
              <FiEye size={16} />
              Ver operación
            </button>
          </article>
        ))}

        {filteredDocuments.length === 0 && <EmptyState />}
      </section>

      {/* Detalle de documento */}
      {selectedDocument && (
        <div className="border border-border bg-white">
          <div className="flex items-center justify-between gap-3 border-b border-border p-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wide text-primary">
                Detalle de operación
              </span>

              <h2 className="mt-1 font-heading text-lg font-bold text-accent">
                {selectedDocument.guide}
              </h2>
            </div>

            <button
              onClick={() => setSelectedDocument(null)}
              aria-label="Cerrar detalle"
              className="flex size-10 items-center justify-center border border-border text-muted transition-colors hover:bg-gray hover:text-primary"
            >
              <FiX size={19} />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 p-5 md:grid-cols-2 lg:grid-cols-3">
            <DetailItem label="Cliente" value={selectedDocument.client} />
            <DetailItem label="Descripción" value={selectedDocument.description} />
            <DetailItem label="Categoría" value={selectedDocument.category} />
            <DetailItem label="Vía" value={selectedDocument.transport} />
            <DetailItem label="Origen" value={selectedDocument.origin} />
            <DetailItem label="Destino" value={selectedDocument.destination} />
            <DetailItem label="Almacén" value={selectedDocument.warehouse} />
            <DetailItem label="ETD" value={selectedDocument.etd} />
            <DetailItem label="ETA" value={selectedDocument.eta} />
            <DetailItem label="Cantidad" value={selectedDocument.packages} />
            <DetailItem label="Peso" value={selectedDocument.weight} />
            <DetailItem label="Consignatario" value={selectedDocument.consignee} />
            <DetailItem label="Número de DAM" value={selectedDocument.dam} />
          </div>

          <div className="border-t border-border bg-gray/30 p-5">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted">
              Observaciones
            </p>
            <p className="text-sm leading-6 text-accent">
              {selectedDocument.observations}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border-b border-border pb-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold text-accent">
        {value || "No registrado"}
      </p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="px-5 py-12 text-center">
      <FiFileText className="mx-auto text-muted" size={28} />
      <h3 className="mt-3 font-heading font-bold text-accent">
        No se encontraron documentos
      </h3>
      <p className="mt-1 text-sm text-muted">
        Intenta buscar con otro número de guía.
      </p>
    </div>
  );
}
