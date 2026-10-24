import Contador from "@/components/ui/Contador";

const estadisticas = [
  { fin: 16, sufijo: "", etiqueta: "Clientes" },
  { fin: 234, sufijo: "", etiqueta: "Operaciones" },
  { fin: 100, sufijo: "%", etiqueta: "Satisfacción" },
];

export default function Estadisticas() {


  return (
    <section className="w-full flex flex-row sm:flex-col items-center justify-center sm:border-l border-border divide-x divide-border sm:divide-x-0 sm:divide-y text-center">
  {estadisticas.map((item) => (
    <div key={item.etiqueta} className="w-full py-5 sm:py-12">
      <p className="font-heading text-2xl md:text-5xl font-bold text-white">
        <Contador fin={item.fin} sufijo={item.sufijo} />
      </p>
      <p className="text-muted-reverse mt-2 font-body font-semibold text-xs sm:text-sm">
        {item.etiqueta}
      </p>
    </div>
  ))}
</section>
  );
}