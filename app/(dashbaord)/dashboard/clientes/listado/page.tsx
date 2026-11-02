
import { redirect } from "next/navigation";
import Link from "next/link";
import { FiUserPlus } from "react-icons/fi";

import { createClient } from "@/lib/supabase/server";
import { ClientesList, type ClientCompany } from "@/components/dashboard/clientes-list";

export default async function ListadoClientesPage() {
  const supabase = await createClient();

  // Verificar usuario autenticado
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) redirect("/login");

  // Verificar rol de administrador
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("user_id", user.id)
    .single();

  if (profileError || profile?.role !== "admin") {
    redirect("/dashboard");
  }

  // Obtener empresas
  const { data: companies, error: companiesError } = await supabase
    .from("companies")
    .select("id, razon_social, ruc, telefono, created_at")
    .order("created_at", { ascending: false });

  if (companiesError) {
    throw new Error("No se pudieron cargar los clientes.");
  }

  // Obtener contactos asociados a las empresas
  const { data: profiles, error: profilesError } = await supabase
    .from("profiles")
    .select("company_id, nombre_completo")
    .eq("role", "cliente");

  if (profilesError) {
    throw new Error("No se pudieron cargar los contactos.");
  }

  const clients: ClientCompany[] = (companies ?? []).map((company) => ({
    ...company,
    contactos: (profiles ?? [])
      .filter((profile) => profile.company_id === company.id)
      .map((profile) => profile.nombre_completo),
  }));

  return (
    <div className="space-y-8">
      {/* Encabezado de página */}
      <div className="flex flex-col justify-between gap-4 border-b border-border pb-6 sm:flex-row sm:items-center">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-primary">
            Administración
          </p>
          <h1 className="font-heading text-2xl font-bold text-accent">
            Gestión de clientes
          </h1>
          <p className="mt-2 text-sm text-muted">
            Administra y consulta las empresas registradas en Aurum Logistics.
          </p>
        </div>

        <Link
          href="/dashboard/clientes"
          className="inline-flex h-11 items-center justify-center gap-2 bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-accent"
        >
          <FiUserPlus size={17} />
          Registrar cliente
        </Link>
      </div>

      <ClientesList clients={clients} />
    </div>
  );
}
