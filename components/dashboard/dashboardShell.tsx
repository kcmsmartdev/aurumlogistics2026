
"use client";

import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

type DashboardRole = "admin" | "cliente";

interface DashboardShellProps {
  children: React.ReactNode;
  role: DashboardRole;
}

export function DashboardShell({
  children,
  role,
}: DashboardShellProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex h-dvh overflow-hidden bg-gray">
      {/* Sidebar escritorio */}
      <aside className="hidden h-full shrink-0 lg:block">
        <Sidebar role={role} />
      </aside>

      {/* Sidebar móvil */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={() => setIsMenuOpen(false)}
            className="absolute inset-0 bg-black/40"
          />

          <div className="relative h-full w-64 max-w-[85vw]">
            <button
              type="button"
              aria-label="Cerrar menú"
              onClick={() => setIsMenuOpen(false)}
              className="absolute right-3 top-4 z-20 flex h-9 w-9 items-center justify-center border border-border bg-white text-muted transition-colors hover:bg-gray hover:text-primary"
            >
              <FiX size={19} />
            </button>

            <Sidebar role={role} />
          </div>
        </div>
      )}

      {/* Contenido principal */}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        {/* Topbar móvil */}
        <div className="flex shrink-0 items-center border-b border-border bg-white lg:hidden">
          <button
            type="button"
            aria-label="Abrir menú"
            onClick={() => setIsMenuOpen(true)}
            className="ml-4 p-2 text-primary hover:bg-gray"
          >
            <FiMenu size={21} />
          </button>

          <div className="min-w-0 flex-1">
            <Topbar />
          </div>
        </div>

        {/* Topbar escritorio */}
        <div className="hidden shrink-0 lg:block">
          <Topbar />
        </div>

        {/* Única zona con scroll */}
        <main className="min-h-0 flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
