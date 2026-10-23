import { tiemposServicio } from "@/data/tarifas";

const th = "px-4 py-3 text-sm font-semibold font-heading uppercase md:px-6 md:text-left";
const td ="flex justify-between gap-4 px-3 py-1.5 text-muted font-semibold font-body before:shrink-0 before:font-semibold before:content-[attr(data-label)] md:table-cell md:border md:border-primary md:py-3 md:text-left md:text-sm md:align-middle md:before:hidden  ";

export default function TablaTiemposServicio() {
  return (
    <div className="w-full mt-16">
      <h2 className="mb-6 font-heading text-3xl font-bold">
        Tiempo promedio de servicio
      </h2>

      <table className="block w-full md:table">
        <thead className="sr-only md:not-sr-only bg-secondary/50">
          <tr className="border-b border-border">
            <th scope="col" className={th}>Régimen</th>
            <th scope="col" className={th}>Denominación</th>
            <th scope="col" className={`${th} md:min-w-[18rem]`}>Plazo promedio</th>
            <th scope="col" className={`${th} md:whitespace-nowrap`}>Finalización</th>
          </tr>
        </thead>

        <tbody className="block md:table-row-group">
          {tiemposServicio.map((fila) => (
            <tr
              key={`${fila.regimen}-${fila.denominacion}`}
              className="block border-b border-border py-3 md:table-row md:py-0"
            >
              <td data-label="Régimen" className={`${td} font-medium text-primary`}>
                {fila.regimen}
              </td>

              <td data-label="Denominación" className={`${td} text-right md:text-left`}>
                {fila.denominacion}
              </td>

              <td data-label="Plazo promedio" className={`${td} text-right md:text-left`}>
                {fila.plazoPromedio ?? "—"}
              </td>

              <td data-label="Finalización" className={`${td} md:whitespace-nowrap`}>
                {typeof fila.finalizacion === "string" ? (
                  fila.finalizacion
                ) : (
                  <div className="flex flex-col gap-1 text-right md:text-left">
                    <span>
                      <span className="font-semibold">Aéreo:</span>{" "}
                      {fila.finalizacion.aereo}
                    </span>
                    <span>
                      <span className="font-semibold">Marítimo:</span>{" "}
                      {fila.finalizacion.maritimo}
                    </span>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}