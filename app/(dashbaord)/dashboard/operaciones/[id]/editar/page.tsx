
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { createClient } from "@/lib/supabase/server";
import { OperationForm } from "@/components/dashboard/operation-form";

interface EditarOperacionPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditarOperacionPage({
  params,
}: EditarOperacionPageProps) {
  const { id } = await params;

  const supabase = await createClient();

  // Verificar sesión
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login");
  }

  // Verificar permisos de administrador
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("user_id", user.id)
    .single();

  if (profile?.role !== "admin") {
    redirect("/dashboard");
  }

  // Obtener operación
  const { data: operation, error: operationError } = await supabase
    .from("operations")
    .select("*")
    .eq("id", id)
    .single();

  if (operationError || !operation) {
    notFound();
  }

  // Obtener empresas
  const { data: companies, error: companiesError } = await supabase
    .from("companies")
    .select("id, razon_social, ruc")
    .order("razon_social");

  if (companiesError) {
    throw new Error("No se pudieron cargar las empresas.");
  }

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="space-y-4">
        <Link
          href="/dashboard/busqueda"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-primary"
        >
          <FiArrowLeft size={16} />
          Volver a búsqueda
        </Link>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Administración de operaciones
          </p>

          <h1 className="mt-2 font-heading text-2xl font-bold text-accent">
            Editar operación
          </h1>

          <p className="mt-1 text-sm text-muted">
            Modifica la información de la operación{" "}
            <span className="font-semibold text-accent">
              {operation.awb}
            </span>
          </p>
        </div>
      </div>

      {/* Formulario */}
      <OperationForm
        companies={companies ?? []}
        operation={operation}
      />
    </div>
  );
}
