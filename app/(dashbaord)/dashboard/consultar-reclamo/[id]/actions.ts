
"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function obtenerDetalleReclamo(id: string) {
  try {
    const supabase = await createClient();

    // Verificar sesión
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        success: false as const,
        message: "No autorizado.",
      };
    }

    // Obtener perfil del usuario
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role, company_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (profileError || !profile) {
      return {
        success: false as const,
        message: "No se pudo verificar tu perfil.",
      };
    }

    if (profile.role !== "admin" && profile.role !== "cliente") {
      return {
        success: false as const,
        message: "No tienes permisos.",
      };
    }

    if (profile.role === "cliente" && !profile.company_id) {
      return {
        success: false as const,
        message: "Tu cuenta no tiene una empresa asignada.",
      };
    }

    const admin = createAdminClient();

    // Buscar reclamo
    let claimQuery = admin
      .from("claims")
      .select("*")
      .eq("id", id);

    // Restringir al cliente a los reclamos de su empresa
    if (profile.role === "cliente") {
      claimQuery = claimQuery.eq("company_id", profile.company_id);
    }

    const { data: claim, error: claimError } = await claimQuery.maybeSingle();

    if (claimError || !claim) {
      return {
        success: false as const,
        message: "No se encontró el reclamo.",
      };
    }

    // Obtener respuesta oficial
    const { data: response, error: responseError } = await admin
      .from("claim_responses")
      .select("*")
      .eq("claim_id", id)
      .maybeSingle();

    if (responseError) {
      console.error("Error al obtener respuesta:", responseError);
    }

    // Obtener apelación
    const { data: appeal, error: appealError } = await admin
      .from("claim_appeals")
      .select("*")
      .eq("claim_id", id)
      .maybeSingle();

    if (appealError) {
      console.error("Error al obtener apelación:", appealError);
    }

    return {
      success: true as const,
      claim,
      response: response ?? null,
      appeal: appeal ?? null,
      role: profile.role as "admin" | "cliente",
    };
  } catch (error) {
    console.error("Error al obtener detalle del reclamo:", error);

    return {
      success: false as const,
      message: "Ocurrió un error al cargar el reclamo.",
    };
  }
}

export async function responderReclamo(
  id: string,
  formData: FormData
) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        success: false,
        message: "No tienes autorización.",
      };
    }

    // Verificar que sea administrador
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("user_id", user.id)
      .maybeSingle();

    if (profileError || profile?.role !== "admin") {
      return {
        success: false,
        message: "No tienes permisos para responder reclamos.",
      };
    }

    const respuesta = String(formData.get("response") ?? "").trim();

    if (!respuesta || respuesta.length < 10) {
      return {
        success: false,
        message: "Escribe una respuesta de al menos 10 caracteres.",
      };
    }

    if (respuesta.length > 10000) {
      return {
        success: false,
        message: "La respuesta no puede superar los 10 000 caracteres.",
      };
    }

    const admin = createAdminClient();

    // Verificar que el reclamo exista y pueda responderse
    const { data: claim, error: claimError } = await admin
      .from("claims")
      .select("id, status")
      .eq("id", id)
      .maybeSingle();

    if (claimError || !claim) {
      return {
        success: false,
        message: "No se encontró el reclamo.",
      };
    }

    if (
      claim.status !== "Registrado" &&
      claim.status !== "En revisión"
    ) {
      return {
        success: false,
        message:
          "Este reclamo ya no se encuentra disponible para responder.",
      };
    }

    // Registrar respuesta oficial
    const { error: responseError } = await admin
      .from("claim_responses")
      .insert({
        claim_id: id,
        response: respuesta,
        responded_by: user.id,
      });

    if (responseError) {
      console.error("Error al guardar respuesta:", responseError);

      return {
        success: false,
        message: "No se pudo guardar la respuesta. Inténtalo nuevamente.",
      };
    }

    // Actualizar estado del reclamo
    const { error: updateError } = await admin
      .from("claims")
      .update({
        status: "Respondido",
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("status", claim.status);

    if (updateError) {
      console.error("Error al actualizar reclamo:", updateError);

      // Intentar eliminar la respuesta si no se pudo actualizar el estado
      await admin
        .from("claim_responses")
        .delete()
        .eq("claim_id", id);

      return {
        success: false,
        message: "No se pudo actualizar el estado del reclamo.",
      };
    }

    return {
      success: true,
      message: "La respuesta se registró correctamente.",
    };
  } catch (error) {
    console.error("Error inesperado:", error);

    return {
      success: false,
      message: "Ocurrió un error al registrar la respuesta.",
    };
  }
}



export async function gestionarRespuestaCliente(
  id: string,
  accion: "aceptar" | "apelar",
  detalleApelacion?: string,
  solucionSolicitada?: string
) {
  try {
    const supabase = await createClient();

    // Verificar sesión
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        success: false,
        message: "Debes iniciar sesión para continuar.",
      };
    }

    // Verificar que sea cliente
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role, company_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (
      profileError ||
      profile?.role !== "cliente" ||
      !profile.company_id
    ) {
      return {
        success: false,
        message: "No tienes permisos para realizar esta acción.",
      };
    }

    if (accion !== "aceptar" && accion !== "apelar") {
      return {
        success: false,
        message: "La acción solicitada no es válida.",
      };
    }

    // Validar los datos de apelación
    if (accion === "apelar") {
      detalleApelacion = String(detalleApelacion ?? "").trim();
      solucionSolicitada = String(solucionSolicitada ?? "").trim();

      if (
        detalleApelacion.length < 10 ||
        detalleApelacion.length > 5000
      ) {
        return {
          success: false,
          message:
            "El motivo de apelación debe tener entre 10 y 5000 caracteres.",
        };
      }

      if (
        solucionSolicitada.length < 10 ||
        solucionSolicitada.length > 5000
      ) {
        return {
          success: false,
          message:
            "La solución solicitada debe tener entre 10 y 5000 caracteres.",
        };
      }
    }

    const admin = createAdminClient();

    // Comprobar que el reclamo pertenezca a la empresa del cliente
    const { data: claim, error: claimError } = await admin
      .from("claims")
      .select(
        "id, tracking_code, document_type, document_number, company_id, status"
      )
      .eq("id", id)
      .eq("company_id", profile.company_id)
      .maybeSingle();

    if (claimError || !claim) {
      return {
        success: false,
        message: "No se encontró el reclamo o no tienes acceso.",
      };
    }

    if (claim.status !== "Respondido") {
      return {
        success: false,
        message:
          "Este reclamo ya no está disponible para aceptar o apelar.",
      };
    }

    // Verificar que exista una respuesta oficial
    const { data: response, error: responseError } = await admin
      .from("claim_responses")
      .select("id")
      .eq("claim_id", id)
      .maybeSingle();

    if (responseError || !response) {
      return {
        success: false,
        message: "El reclamo todavía no tiene una respuesta oficial.",
      };
    }

    // Ejecutar la función RPC protegida en Supabase
    const { error: rpcError } = await admin.rpc(
      "gestionar_respuesta_reclamo",
      {
        p_tracking_code: claim.tracking_code,
        p_document_type: claim.document_type,
        p_document_number: claim.document_number,
        p_action: accion,
        p_appeal_detail:
          accion === "apelar" ? detalleApelacion : null,
        p_requested_solution:
          accion === "apelar" ? solucionSolicitada : null,
      }
    );

    if (rpcError) {
      console.error("Error al gestionar respuesta:", rpcError);

      return {
        success: false,
        message:
          "No se pudo procesar tu solicitud. Verifica el estado del reclamo e inténtalo nuevamente.",
      };
    }

    return {
      success: true,
      message:
        accion === "aceptar"
          ? "Has aceptado la respuesta del reclamo."
          : "Tu apelación se registró correctamente.",
    };
  } catch (error) {
    console.error("Error inesperado:", error);

    return {
      success: false,
      message: "Ocurrió un error al procesar tu solicitud.",
    };
  }
}


export async function responderApelacionReclamo(
  id: string,
  formData: FormData
) {
  try {
    const supabase = await createClient();

    // Verificar sesión
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        success: false,
        message: "No tienes autorización.",
      };
    }

    // Verificar que sea administrador
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("user_id", user.id)
      .maybeSingle();

    if (profileError || profile?.role !== "admin") {
      return {
        success: false,
        message: "No tienes permisos para responder apelaciones.",
      };
    }

    // Obtener respuesta del formulario
    const respuesta = String(
      formData.get("admin_response") ?? ""
    ).trim();

    if (respuesta.length < 10) {
      return {
        success: false,
        message: "La respuesta debe tener al menos 10 caracteres.",
      };
    }

    if (respuesta.length > 10000) {
      return {
        success: false,
        message: "La respuesta no puede superar los 10 000 caracteres.",
      };
    }

    const admin = createAdminClient();

    // Verificar que el reclamo exista y esté apelado
    const { data: claim, error: claimError } = await admin
      .from("claims")
      .select("id, status")
      .eq("id", id)
      .maybeSingle();

    if (claimError || !claim) {
      return {
        success: false,
        message: "No se encontró el reclamo.",
      };
    }

    if (claim.status !== "Apelado") {
      return {
        success: false,
        message: "Este reclamo no se encuentra en estado Apelado.",
      };
    }

    // Verificar que exista una apelación pendiente
    const { data: appeal, error: appealError } = await admin
      .from("claim_appeals")
      .select("id, status")
      .eq("claim_id", id)
      .maybeSingle();

    if (appealError || !appeal) {
      return {
        success: false,
        message: "No se encontró la apelación.",
      };
    }

    if (
      appeal.status !== "Pendiente" &&
      appeal.status !== "En revisión"
    ) {
      return {
        success: false,
        message: "Esta apelación ya fue respondida o cerrada.",
      };
    }

    // Ejecutar la operación atómica en Supabase
    const { error: rpcError } = await admin.rpc(
      "responder_apelacion_reclamo",
      {
        p_claim_id: id,
        p_admin_response: respuesta,
        p_responded_by: user.id,
      }
    );

    if (rpcError) {
      console.error("Error al responder apelación:", rpcError);

      return {
        success: false,
        message:
          "No se pudo registrar la respuesta de la apelación. Inténtalo nuevamente.",
      };
    }

    return {
      success: true,
      message:
        "La apelación fue respondida y el reclamo se cerró correctamente.",
    };
  } catch (error) {
    console.error("Error inesperado al responder apelación:", error);

    return {
      success: false,
      message: "Ocurrió un error al responder la apelación.",
    };
  }
}