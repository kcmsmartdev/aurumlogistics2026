
import { redirect } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { OperationForm } from "@/components/dashboard/operation-form";

export default async function NuevaOperacionPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("user_id", user.id)
    .single();

  if (profile?.role !== "admin") redirect("/dashboard");

  const { data: companies, error } = await supabase
    .from("companies")
    .select("id, razon_social, ruc")
    .order("razon_social");

  if (error) {
    throw new Error("No se pudieron cargar las empresas.");
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-7">
      <div>
        <Link
          href="/dashboard"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-primary"
        >
          <FiArrowLeft size={16} />
          Volver al panel
        </Link>

        <span className="block text-xs font-bold uppercase tracking-[0.15em] text-primary">
          Administración
        </span>

        <h1 className="mt-2 font-heading text-2xl font-bold text-accent md:text-3xl">
          Registrar operación
        </h1>

        <p className="mt-2 text-sm leading-6 text-muted">
          Registra una nueva operación y asígnala a una empresa.
        </p>
      </div>

      {companies && companies.length > 0 ? (
        <OperationForm companies={companies} />
      ) : (
        <div className="border border-border bg-white p-6 text-sm text-muted">
          No hay empresas registradas. Primero debes registrar un cliente.
        </div>
      )}
    </div>
  );
}
