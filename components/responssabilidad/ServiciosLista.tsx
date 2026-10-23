import Link from "next/link"
interface ListaType{
    name:string,
    href:string,
}
const serviciosList:ListaType[]=[
     { name: "Transporte aéreo", href: "/servicios/transporte-aereo" },
      { name: "Transporte terrestre", href: "/servicios/transporte-terrestre" },
      { name: "Transporte marítimo", href: "/servicios/transporte-maritimo" },
      { name: "Valorado", href: "/servicios/valorado" },
]
export default function ServiciosLista(){
    return(
        <ul className="flex flex-col mt-5">
            {serviciosList.map((e) => (
                <li key={e.name} className="group relative border-b border-border">
                <Link
                    href={e.href}
                    className="block py-5 font-heading text-base font-semibold  uppercase text-muted transition-colors duration-300 group-hover:text-primary focus-visible:outline-none motion-reduce:transition-none"
                >
                    {e.name}
                </Link>
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-0 left-0 h-1 w-5 bg-primary transition-[width] duration-300 ease-out group-hover:w-full group-focus-within:w-full motion-reduce:transition-none"
                />
                </li>
            ))}
        </ul>
    )
}