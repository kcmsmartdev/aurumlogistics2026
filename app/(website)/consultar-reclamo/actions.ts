
"use server";

import { createAdminClient } from "@/lib/supabase/admin";

type AccionReclamo = "aceptar" | "apelar";

function normalizar(valor: string) {
  return valor.trim().replace(/\s+/g, "").toUpperCase();
}

export async function consultarReclamo(
  trackingCode: string,
  documentType: string,
  documentNumber: string
) {
  const codigo = normalizar(trackingCode);
  const tipo = documentType.trim().toLowerCase();
  const documento = normalizar(documentNumber);

  if (!/^AL-[A-F0-9]{8}$/.test(codigo)) {
    return {
      success: false,
      message: "Ingresa un código de seguimiento válido.",
    };
  }

  if (!["dni", "ce", "pasaporte"].includes(tipo) || !documento) {
    return {
      success: false,
      message: "Verifica tus datos.",
    };
  }

  try {
    const supabase = createAdminClient();

    // Buscar solamente por código.
    const { data: claim, error } = await supabase
      .from("claims")
      .select("*")
      .eq("tracking_code", codigo)
      .maybeSingle();

    if (error) {
      console.error("Error buscando reclamo:", error);
      return {
        success: false,
        message: "No se pudo consultar el reclamo.",
      };
    }

    if (!claim) {
      return {
        success: false,
        message: "No encontramos ese código de seguimiento.",
      };
    }

    // Verificar identidad después de encontrar el reclamo.
    if (
      claim.document_type.trim().toLowerCase() !== tipo ||
      normalizar(claim.document_number) !== documento
    ) {
      return {
        success: false,
        message: "El documento no coincide con el reclamo.",
      };
    }

    // Obtener respuesta administrativa.
    const { data: response, error: responseError } = await supabase
      .from("claim_responses")
      .select("response, created_at")
      .eq("claim_id", claim.id)
      .maybeSingle();

    if (responseError) {
      console.error("Error obteniendo respuesta:", responseError);
      return {
        success: false,
        message: "No se pudo obtener la respuesta del reclamo.",
      };
    }

    // Obtener apelación, si existe.
    const { data: appeal, error: appealError } = await supabase
      .from("claim_appeals")
      .select("*")
      .eq("claim_id", claim.id)
      .maybeSingle();

    if (appealError) {
      console.error("Error obteniendo apelación:", appealError);
      return {
        success: false,
        message: "No se pudo obtener la apelación.",
      };
    }

    return {
      success: true,
      message: "Reclamo encontrado.",
      claim: {
        id: claim.id,
        trackingCode: claim.tracking_code,
        requestType: claim.request_type,
        service: claim.service_contracted,
        description: claim.description,
        requestedSolution: claim.requested_solution,
        status: claim.status,
        createdAt: claim.created_at,
        updatedAt: claim.updated_at,
      },
      response: response
        ? {
            response: response.response,
            respondedAt: response.created_at,
          }
        : null,
      appeal: appeal
        ? {
            detail: appeal.appeal_detail,
            requestedSolution: appeal.requested_solution,
            status: appeal.status,
            adminResponse: appeal.admin_response,
            submittedAt: appeal.submitted_at,
            respondedAt: appeal.responded_at,
          }
        : null,
    };
  } catch (error) {
    console.error("Error inesperado:", error);

    return {
      success: false,
      message: "Ocurrió un error al consultar el reclamo.",
    };
  }
}

export async function gestionarRespuestaPublica(
  trackingCode: string,
  documentType: string,
  documentNumber: string,
  accion: AccionReclamo,
  detalleApelacion?: string,
  solucionSolicitada?: string
) {
  const codigo = normalizar(trackingCode);
  const tipo = documentType.trim().toLowerCase();
  const documento = normalizar(documentNumber);

  if (
    !/^AL-[A-F0-9]{8}$/.test(codigo) ||
    !["dni", "ce", "pasaporte"].includes(tipo) ||
    !documento
  ) {
    return {
      success: false,
      message: "Los datos ingresados no son válidos.",
    };
  }

  if (accion !== "aceptar" && accion !== "apelar") {
    return {
      success: false,
      message: "Acción no válida.",
    };
  }

  const detalle = detalleApelacion?.trim() ?? "";
  const solucion = solucionSolicitada?.trim() ?? "";

  if (
    accion === "apelar" &&
    (detalle.length < 10 ||
      detalle.length > 5000 ||
      solucion.length < 10 ||
      solucion.length > 5000)
  ) {
    return {
      success: false,
      message: "Completa correctamente los datos de la apelación.",
    };
  }

  try {
    const supabase = createAdminClient();

    // Verificar nuevamente la identidad en el servidor.
    const { data: claim, error: claimError } = await supabase
      .from("claims")
      .select("id, document_type, document_number")
      .eq("tracking_code", codigo)
      .maybeSingle();

    if (claimError || !claim) {
      return {
        success: false,
        message: "No encontramos el reclamo.",
      };
    }

    if (
      claim.document_type.trim().toLowerCase() !== tipo ||
      normalizar(claim.document_number) !== documento
    ) {
      return {
        success: false,
        message: "Los datos de identidad no coinciden.",
      };
    }

    const { error } = await supabase.rpc(
      "gestionar_respuesta_reclamo",
      {
        p_tracking_code: codigo,
        p_document_type: tipo,
        p_document_number: claim.document_number,
        p_action: accion,
        p_appeal_detail: accion === "apelar" ? detalle : null,
        p_requested_solution: accion === "apelar" ? solucion : null,
      }
    );

    if (error) {
      console.error("Error en la acción del reclamo:", error);

      return {
        success: false,
        message:
          "No se pudo procesar la solicitud. Comprueba el estado del reclamo.",
      };
    }

    return {
      success: true,
      message:
        accion === "aceptar"
          ? "Has aceptado la respuesta del reclamo."
          : "Tu apelación fue registrada correctamente.",
    };
  } catch (error) {
    console.error("Error inesperado:", error);

    return {
      success: false,
      message: "Ocurrió un error inesperado.",
    };
  }
}
