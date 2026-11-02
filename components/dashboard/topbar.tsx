
"use client";

import { usePathname } from "next/navigation";
import { FiBell, FiChevronDown, FiUser } from "react-icons/fi";

const pageTitles: Record<string, string> = {
  "/dashboard": "Panel principal",
  "/dashboard/busqueda": "Búsqueda de operaciones",
  "/dashboard/documentos": "Tus documentos",
  "/dashboard/consultar-reclamo": "Consultar reclamo",
};

export function Topbar() {
  const pathname = usePathname();

  const title = pageTitles[pathname] ?? "Panel de cliente";

  return (
    <header className="flex h-20 shrink-0 items-center justify-between border-b border-border bg-white px-5 md:px-8">

      {/* Título */}
      <div>
        <h1 className="font-heading text-base font-bold text-accent md:text-lg">
          {title}
        </h1>

        <p className="mt-0.5 text-xs text-muted">
          Portal de clientes
        </p>
      </div>

      {/* Acciones de usuario */}
      <div className="flex items-center gap-3">

        {/* Notificaciones */}
        <button
          type="button"
          aria-label="Notificaciones"
          className="relative flex size-10 items-center justify-center text-muted transition-colors hover:bg-gray hover:text-primary"
        >
          <FiBell size={19} strokeWidth={1.8} />
        </button>

        <div className="h-8 w-px bg-border" />

        {/* Cuenta */}
        <button
          type="button"
          className="flex items-center gap-3 px-2 py-2 transition-colors hover:bg-gray"
        >
          <div className="flex size-9 items-center justify-center bg-gray text-primary">
            <FiUser size={18} />
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-xs font-semibold text-accent">
              Mi cuenta
            </p>

            <p className="text-[11px] text-muted">
              Cliente
            </p>
          </div>

          <FiChevronDown
            size={15}
            className="hidden text-muted sm:block"
          />
        </button>

      </div>
    </header>
  );
}
