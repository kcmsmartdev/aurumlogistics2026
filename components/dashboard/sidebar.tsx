
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clientNavigation } from "@/config/navigation";
import { CurrentYear } from "@/components/dashboard/current-year";
import { logout } from "@/app/(dashbaord)/dashboard/actions";
import { FiLogOut } from "react-icons/fi";

type DashboardRole = "admin" | "cliente";

interface SidebarProps {
  role: DashboardRole;
}

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();

  // El grupo de administración solo se muestra al administrador.
  const navigation = clientNavigation.filter(
    (group) => role === "admin" || group.title !== "ADMINISTRACIÓN"
  );

  return (
    <aside className="flex h-full w-65 flex-col border-r border-border bg-white">
      {/* Logo */}
      <div className="flex h-20 shrink-0 items-center border-b border-border px-6">
        <Link href="/dashboard" className="flex flex-col">
          <span className="text-lg font-bold tracking-[0.12em] text-primary">
            AURUM
          </span>
          <span className="text-[9px] font-medium tracking-[0.25em] text-muted">
            LOGISTICS
          </span>
        </Link>
      </div>

      {/* Navegación */}
      <nav className="flex-1 space-y-8 overflow-y-auto px-4 py-7">
        {navigation.map((group) => (
          <div key={group.title}>
            <h2 className="mb-3 px-3 text-[10px] font-semibold tracking-[0.12em] text-muted">
              {group.title}
            </h2>

            <div className="space-y-1">
              {group.items.map((item) => {
                // Detectar únicamente la ruta correspondiente.
                const isActive = item.external
                  ? false
                  : pathname === item.href ||
                    (item.href !== "/dashboard/clientes" &&
                      item.href !== "/dashboard" &&
                      pathname.startsWith(`${item.href}/`));

                const Icon = item.icon;

                const className = `
                  group flex items-center gap-3 px-3 py-3
                  text-[13px] transition-colors duration-200
                  ${
                    isActive
                      ? "bg-primary font-semibold text-white"
                      : "text-muted hover:bg-gray hover:text-primary"
                  }
                `;

                const content = (
                  <>
                    <Icon size={18} strokeWidth={1.8} />
                    <span>{item.label}</span>
                  </>
                );

                return item.external ? (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                  >
                    {content}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={className}
                  >
                    {content}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="shrink-0 border-t border-border px-6 py-5">
        <p className="text-[11px] font-semibold text-accent">
          Aurum Logistics S.A.C.
        </p>

        <form action={logout}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 px-4 py-3 text-muted transition-colors hover:bg-gray hover:text-primary"
          >
            <FiLogOut size={18} />
            <span className="text-sm font-medium">Cerrar sesión</span>
          </button>
        </form>

        <p className="mt-1 text-[10px] text-muted">
          © <CurrentYear /> Todos los derechos reservados.
        </p>
      </div>
    </aside>
  );
}
