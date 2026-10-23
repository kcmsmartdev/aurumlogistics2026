import { tarifasExportacionMaritima } from "@/data/tarifas";

const th = "px-4 py-3 text-sm font-semibold uppercase md:px-6 md:text-left";
const td ="flex justify-between gap-4 px-3 py-1.5 text-muted font-semibold font-body before:shrink-0 before:font-semibold before:content-[attr(data-label)] md:table-cell md:border md:border-primary md:py-3 md:text-left md:text-sm md:align-middle md:before:hidden";

export default function TablaTarifas() {
  const { titulo, tarifas, nota } = tarifasExportacionMaritima;

  return (
    <div className="w-full mt-16">
      <h2 className="mb-6 font-heading text-3xl font-bold">{titulo}</h2>

      <table className="block w-full md:table">
        <thead className="sr-only md:not-sr-only bg-secondary/50">
          <tr className="border-b border-border">
            <th scope="col" className={th}>Concepto</th>
            <th scope="col" className={`${th} md:whitespace-nowrap`}>Moneda</th>
            <th scope="col" className={`${th} md:whitespace-nowrap`}>Precio</th>
            <th scope="col" className={`${th} md:whitespace-nowrap`}>Vigente desde</th>
            <th scope="col" className={th}>Tiempo de atención</th>
          </tr>
        </thead>

        <tbody className="block md:table-row-group">
          {tarifas.map((t) => (
            <tr key={t.concepto} className="block border-b border-border py-3 md:table-row md:py-0">
              <td data-label="Concepto" className={`${td} font-medium text-primary`}>
                {t.concepto}
              </td>
              <td data-label="Moneda" className={`${td} md:whitespace-nowrap`}>{t.moneda}</td>
              <td data-label="Precio" className={`${td} tabular-nums md:whitespace-nowrap`}>
                {t.precio.toFixed(2)}{t.unidad ? ` / ${t.unidad}` : ""}
              </td>
              <td data-label="Vigente desde" className={`${td} tabular-nums md:whitespace-nowrap`}>
                {new Date(`${t.vigenteDesde}T00:00:00`).toLocaleDateString("es-PE")}
              </td>
              <td data-label="Tiempo de atención" className={td}>
                {t.tiempoAtencion ?? "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-4 text-sm text-muted">*{nota}</p>
    </div>
  );
}