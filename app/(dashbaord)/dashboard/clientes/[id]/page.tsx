
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  FiArrowLeft,
  FiBriefcase,
  FiMail,
  FiPhone,
  FiUser,
  FiUsers,
} from "react-icons/fi";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { EditCompanyForm } from "@/components/dashboard/edit-company-form";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function DetalleClientePage({ params }: PageProps) {
  const { id } = await params;

  // Verificar sesión
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) redirect("/login");

  // Verificar que sea administrador
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("user_id", user.id)
    .single();

  if (profileError || profile?.role !== "admin") {
    redirect("/dashboard");
  }

  // Obtener empresa
  const { data: company, error: companyError } = await supabase
    .from("companies")
    .select("id, razon_social, ruc, telefono, created_at")
    .eq("id", id)
    .single();

  if (companyError || !company) notFound();

  // Obtener usuarios asociados a la empresa
  const { data: profiles, error: usersError } = await supabase
    .from("profiles")
    .select("user_id, nombre_completo, role, created_at")
    .eq("company_id", company.id)
    .order("created_at", { ascending: false });

  if (usersError) {
    throw new Error("No se pudieron cargar los usuarios del cliente.");
  }

  // Consultar correos en Supabase Authentication
  const admin = createAdminClient();

  const contacts = await Promise.all(
    (profiles ?? []).map(async (profile) => {
      const { data, error } = await admin.auth.admin.getUserById(
        profile.user_id
      );

      return {
        ...profile,
        email: error ? null : data.user?.email ?? null,
      };
    })
  );

  return (
    <div className="space-y-8">
      {/* Encabezado */}
      <div className="border-b border-border pb-6">
        <Link
          href="/dashboard/clientes/listado"
          className="mb-5 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-primary"
        >
          <FiArrowLeft size={16} />
          Volver al listado
        </Link>

        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-primary">
          Administración / Clientes
        </p>

        <h1 className="font-heading text-2xl font-bold text-accent">
          Detalles del cliente
        </h1>

        <p className="mt-2 text-sm text-muted">
          Información de la empresa y sus usuarios registrados.
        </p>
      </div>

      {/* Información de empresa */}
      <section className="border border-border bg-white">
        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          <div className="flex size-10 items-center justify-center bg-gray text-primary">
            <FiBriefcase  size={20} />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-accent">
              Información de la empresa
            </h2>
            <p className="text-xs text-muted">Datos empresariales</p>
          </div>
        </div>

        <div className="grid gap-6 p-5 sm:grid-cols-2">
          <div>
            <p className="mb-1 text-xs text-muted">Razón social</p>
            <p className="text-sm font-semibold text-accent">
              {company.razon_social}
            </p>
          </div>

          <div>
            <p className="mb-1 text-xs text-muted">RUC</p>
            <p className="text-sm font-semibold text-accent">
              {company.ruc}
            </p>
          </div>

          <div>
            <p className="mb-1 text-xs text-muted">Teléfono</p>
            <p className="text-sm text-accent">
              {company.telefono || "No registrado"}
            </p>
          </div>

          <div>
            <p className="mb-1 text-xs text-muted">Fecha de registro</p>
            <p className="text-sm text-accent">
              {company.created_at.slice(0, 10)}
            </p>
          </div>
        </div>
      </section>
        {/* Editar empresa */}
        <section className="border border-border bg-white">
        <div className="border-b border-border px-5 py-4">
            <h2 className="text-sm font-semibold text-accent">
            Editar información de la empresa
            </h2>
            <p className="mt-1 text-xs text-muted">
            Actualiza los datos empresariales del cliente.
            </p>
        </div>

        <div className="p-5">
            <EditCompanyForm
            id={company.id}
            razonSocial={company.razon_social}
            ruc={company.ruc}
            telefono={company.telefono}
            />
        </div>
        </section>
      {/* Usuarios asociados */}
      <section className="space-y-4">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-heading text-lg font-bold text-accent">
              Usuarios asociados
            </h2>
            <p className="mt-1 text-sm text-muted">
              Cuentas que pertenecen a esta empresa.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted">
            <FiUsers size={17} className="text-primary" />
            {contacts.length} {contacts.length === 1 ? "usuario" : "usuarios"}
          </div>
        </div>

        <div className="space-y-3">
          {contacts.map((contact) => (
            <article
              key={contact.user_id}
              className="border border-border bg-white p-5"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center bg-gray text-primary">
                    <FiUser size={19} />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-accent">
                      {contact.nombre_completo}
                    </h3>

                    <div className="mt-2 flex items-center gap-2 text-xs text-muted">
                      <FiMail size={14} />
                      <span>{contact.email || "Correo no disponible"}</span>
                    </div>
                  </div>
                </div>

                <span className="w-fit bg-gray px-3 py-1 text-xs font-medium text-muted">
                  {contact.role === "cliente" ? "Cliente" : contact.role}
                </span>
              </div>
            </article>
          ))}

          {contacts.length === 0 && (
            <div className="border border-border bg-white px-5 py-12 text-center">
              <FiUsers size={26} className="mx-auto text-muted" />
              <p className="mt-3 text-sm font-medium text-accent">
                No hay usuarios asociados
              </p>
              <p className="mt-1 text-xs text-muted">
                Esta empresa todavía no tiene cuentas de acceso.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
