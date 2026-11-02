
"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export type Reclamo = {
  id: string;
  tracking_code: string;
  document_type: string;
  document_number: string;
  full_name: string;
  email: string;
  phone: string;
  request_type: string;
  service_contracted: string;
  claimed_amount: number | null;
  status: string;
  created_at: string;
  user_id: string | null;
  company_id: string | null;
};

export async function obtenerReclamos(): Promise<{
  success: boolean;
  reclamos: Reclamo[];
  message?: string;
}> {
  try {
    // Verificar sesión
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        success: false,
        reclamos: [],
        message: "No tienes autorización para realizar esta acción.",
      };
    }

    // Obtener perfil y rol
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role, company_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (profileError || !profile) {
      return {
        success: false,
        reclamos: [],
        message: "No se pudo verificar tu perfil.",
      };
    }

    if (profile.role !== "admin" && profile.role !== "cliente") {
      return {
        success: false,
        reclamos: [],
        message: "No tienes permisos para acceder a esta sección.",
      };
    }

    // Los clientes necesitan tener una empresa asignada
    if (profile.role === "cliente" && !profile.company_id) {
      return {
        success: false,
        reclamos: [],
        message: "Tu cuenta no tiene una empresa asignada.",
      };
    }

    // Consulta administrativa desde el servidor
    const admin = createAdminClient();

    let query = admin
      .from("claims")
      .select(`
        id,
        tracking_code,
        document_type,
        document_number,
        full_name,
        email,
        phone,
        request_type,
        service_contracted,
        claimed_amount,
        status,
        created_at,
        user_id,
        company_id
      `)
      .order("created_at", { ascending: false });

    // El administrador puede consultar todos los reclamos.
    // El cliente solamente los de su empresa.
    if (profile.role === "cliente") {
      query = query.eq("company_id", profile.company_id);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error al obtener reclamos:", error);

      return {
        success: false,
        reclamos: [],
        message: "No se pudieron cargar los reclamos.",
      };
    }

    return {
      success: true,
      reclamos: (data ?? []) as Reclamo[],
    };
  } catch (error) {
    console.error("Error inesperado:", error);

    return {
      success: false,
      reclamos: [],
      message: "Ocurrió un error al cargar los reclamos.",
    };
  }
}
