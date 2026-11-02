
"use server";

import { randomBytes } from "node:crypto";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export type ClaimResult = {
  success: boolean;
  message: string;
  trackingCode?: string;
};

export async function registrarReclamo(
  formData: FormData
): Promise<ClaimResult> {
  try {
    // Cliente de sesión: identificar al usuario autenticado
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) {
      console.error("Error al verificar sesión:", authError);
    }

    let userId: string | null = null;
    let companyId: string | null = null;

    // Si hay sesión, comprobar el perfil y obtener la empresa
    if (user) {
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("user_id, role, company_id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (profileError) {
        console.error("Error al consultar perfil:", profileError);

        return {
          success: false,
          message: "No se pudo verificar tu cuenta. Inténtalo nuevamente.",
        };
      }

      // Vincular únicamente a clientes con empresa asignada
      if (profile?.role === "cliente") {
        if (!profile.company_id) {
          return {
            success: false,
            message:
              "Tu cuenta todavía no tiene una empresa asignada. Contacta con Aurum Logistics.",
          };
        }

        userId = user.id;
        companyId = profile.company_id;
      }
    }

    // Obtener y limpiar los datos del formulario
    const documentType = String(
      formData.get("document_type") ?? ""
    ).trim().toLowerCase();

    const documentNumber = String(
      formData.get("document_number") ?? ""
    ).trim();

    const fullName = String(
      formData.get("full_name") ?? ""
    ).trim();

    const address = String(formData.get("address") ?? "").trim();
    const department = String(formData.get("department") ?? "").trim();
    const province = String(formData.get("province") ?? "").trim();
    const district = String(formData.get("district") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();

    const email = String(formData.get("email") ?? "")
      .trim()
      .toLowerCase();

    const isMinor = formData.get("is_minor") === "true";

    const serviceContracted = String(
      formData.get("service_contracted") ?? ""
    ).trim();

    const amountValue = String(
      formData.get("claimed_amount") ?? ""
    ).trim();

    const requestType = String(
      formData.get("request_type") ?? ""
    ).trim().toLowerCase();

    const description = String(
      formData.get("description") ?? ""
    ).trim();

    const requestedSolution = String(
      formData.get("requested_solution") ?? ""
    ).trim();

    const informationIsTruthful =
      formData.get("information_is_truthful") === "true";

    const personalDataConsent =
      formData.get("personal_data_consent") === "true";

    // Validaciones
    if (
      !documentType ||
      !documentNumber ||
      !fullName ||
      !address ||
      !department ||
      !province ||
      !district ||
      !phone ||
      !email ||
      !serviceContracted ||
      !requestType ||
      !description ||
      !requestedSolution
    ) {
      return {
        success: false,
        message: "Completa todos los campos obligatorios.",
      };
    }

    if (!["dni", "ce", "pasaporte"].includes(documentType)) {
      return {
        success: false,
        message: "El tipo de documento no es válido.",
      };
    }

    if (!["reclamo", "queja"].includes(requestType)) {
      return {
        success: false,
        message: "El tipo de solicitud no es válido.",
      };
    }

    if (documentNumber.length > 20) {
      return {
        success: false,
        message: "El número de documento no es válido.",
      };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return {
        success: false,
        message: "Ingresa un correo electrónico válido.",
      };
    }

    if (!informationIsTruthful || !personalDataConsent) {
      return {
        success: false,
        message: "Debes aceptar las declaraciones para continuar.",
      };
    }

    const claimedAmount =
      amountValue === "" ? 0 : Number(amountValue);

    if (!Number.isFinite(claimedAmount) || claimedAmount < 0) {
      return {
        success: false,
        message: "El monto reclamado no es válido.",
      };
    }

    // Generar código de seguimiento
    const trackingCode = `AL-${randomBytes(4)
      .toString("hex")
      .toUpperCase()}`;

    // Registrar mediante el cliente administrativo del servidor
    const admin = createAdminClient();

    const { error } = await admin.from("claims").insert({
      tracking_code: trackingCode,

      // Vinculación obtenida desde la sesión y el perfil
      user_id: userId,
      company_id: companyId,

      document_type: documentType,
      document_number: documentNumber,
      full_name: fullName,
      address,
      department,
      province,
      district,
      phone,
      email,
      is_minor: isMinor,
      service_contracted: serviceContracted,
      claimed_amount: claimedAmount,
      currency: "PEN",
      request_type: requestType,
      description,
      requested_solution: requestedSolution,
      information_is_truthful: informationIsTruthful,
      personal_data_consent: personalDataConsent,
      status: "Registrado",
    });

    if (error) {
      console.error("Error al registrar reclamo:", error);

      return {
        success: false,
        message:
          "No se pudo registrar tu solicitud. Inténtalo nuevamente.",
      };
    }

    return {
      success: true,
      message: "Tu solicitud se registró correctamente.",
      trackingCode,
    };
  } catch (error) {
    console.error("Error inesperado al registrar reclamo:", error);

    return {
      success: false,
      message: "Ocurrió un error inesperado. Inténtalo nuevamente.",
    };
  }
}
