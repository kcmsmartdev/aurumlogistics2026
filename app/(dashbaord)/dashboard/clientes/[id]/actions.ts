
"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface UpdateCompanyState {
  success: boolean;
  message: string;
}

export async function updateCompany(
  id: string,
  _prevState: UpdateCompanyState,
  formData: FormData
): Promise<UpdateCompanyState> {
  const supabase = await createClient();

  // Verificar sesión
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return {
      success: false,
      message: "Debes iniciar sesión para realizar esta acción.",
    };
  }

  // Verificar rol
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("user_id", user.id)
    .single();

  if (profileError || profile?.role !== "admin") {
    return {
      success: false,
      message: "No tienes permisos para editar empresas.",
    };
  }

  // Obtener y validar datos
  const razonSocial = String(formData.get("razon_social") ?? "").trim();
  const ruc = String(formData.get("ruc") ?? "").trim();
  const telefono = String(formData.get("telefono") ?? "").trim();

  if (!razonSocial || !/^\d{11}$/.test(ruc)) {
    return {
      success: false,
      message: "Ingresa una razón social y un RUC válido de 11 dígitos.",
    };
  }

  // Actualizar empresa
  const { error } = await supabase
    .from("companies")
    .update({
      razon_social: razonSocial,
      ruc,
      telefono: telefono || null,
    })
    .eq("id", id);

  if (error) {
    if (error.code === "23505") {
      return {
        success: false,
        message: "Ya existe otra empresa registrada con ese RUC.",
      };
    }

    return {
      success: false,
      message: "No se pudo actualizar la información de la empresa.",
    };
  }

  revalidatePath("/dashboard/clientes/listado");
  revalidatePath(`/dashboard/clientes/${id}`);

  return {
    success: true,
    message: "Los datos de la empresa se actualizaron correctamente.",
  };
}
