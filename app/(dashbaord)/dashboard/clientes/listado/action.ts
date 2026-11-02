
"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function eliminarEmpresa(companyId: string) {
  if (!companyId) {
    return { success: false, message: "Empresa no válida." };
  }

  const supabase = await createClient();

  // Verificar autenticación
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, message: "No tienes una sesión activa." };
  }

  // Verificar que sea administrador
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("user_id", user.id)
    .single();

  if (profileError || profile?.role !== "admin") {
    return {
      success: false,
      message: "No tienes permisos para eliminar empresas.",
    };
  }

  // Comprobar que la empresa exista
  const { data: company, error: companyError } = await supabase
    .from("companies")
    .select("id")
    .eq("id", companyId)
    .maybeSingle();

  if (companyError || !company) {
    return {
      success: false,
      message: "No se encontró la empresa.",
    };
  }

  // Comprobar operaciones asociadas
  const { data: operations, error: operationsError } = await supabase
    .from("operations")
    .select("id")
    .eq("company_id", companyId)
    .limit(1);

  if (operationsError) {
    return {
      success: false,
      message: "No se pudieron verificar las operaciones.",
    };
  }

  if (operations && operations.length > 0) {
    return {
      success: false,
      message: "No puedes eliminar esta empresa porque tiene operaciones registradas.",
    };
  }

  // Comprobar usuarios asociados
  const { data: profiles, error: profilesError } = await supabase
    .from("profiles")
    .select("user_id")
    .eq("company_id", companyId)
    .limit(1);

  if (profilesError) {
    return {
      success: false,
      message: "No se pudieron verificar los usuarios asociados.",
    };
  }

  if (profiles && profiles.length > 0) {
    return {
      success: false,
      message: "No puedes eliminar esta empresa porque tiene usuarios asociados.",
    };
  }

  // Eliminar empresa
  const { error: deleteError } = await supabase
    .from("companies")
    .delete()
    .eq("id", companyId);

  if (deleteError) {
    return {
      success: false,
      message: "No se pudo eliminar la empresa. Verifica sus registros relacionados.",
    };
  }

  revalidatePath("/dashboard/clientes/listado");

  return {
    success: true,
    message: "Empresa eliminada correctamente.",
  };
}
