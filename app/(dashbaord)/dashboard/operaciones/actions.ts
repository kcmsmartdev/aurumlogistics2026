
"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface OperationState {
  success: boolean;
  message: string;
}

export async function registerOperation(
  _prevState: OperationState,
  formData: FormData
): Promise<OperationState> {
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

  // Verificar rol de administrador
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("user_id", user.id)
    .single();

  if (profileError || profile?.role !== "admin") {
    return {
      success: false,
      message: "No tienes permisos para registrar operaciones.",
    };
  }

  // Obtener datos del formulario
  const companyId = String(formData.get("company_id") ?? "").trim();
  const awb = String(formData.get("awb") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const transportType = String(formData.get("transport_type") ?? "").trim();
  const serviceType = String(formData.get("service_type") ?? "").trim();
  const airline = String(formData.get("airline") ?? "").trim();
  const origin = String(formData.get("origin") ?? "").trim();
  const destination = String(formData.get("destination") ?? "").trim();
  const warehouse = String(formData.get("warehouse") ?? "").trim();
  const consignee = String(formData.get("consignee") ?? "").trim();
  const dam = String(formData.get("dam") ?? "").trim();
  const channel = String(formData.get("channel") ?? "").trim();
  const observations = String(formData.get("observations") ?? "").trim();
  const status = String(formData.get("status") ?? "Pendiente").trim();

  const etdValue = String(formData.get("etd") ?? "").trim();
  const etaValue = String(formData.get("eta") ?? "").trim();
  const quantityValue = String(formData.get("quantity") ?? "").trim();
  const weightValue = String(formData.get("weight") ?? "").trim();

  // Validaciones
  if (!companyId || !awb || !transportType || !origin || !destination) {
    return {
      success: false,
      message: "Completa los campos obligatorios.",
    };
  }

  if (!["AEREA", "MARITIMA", "TERRESTRE"].includes(transportType)) {
    return {
      success: false,
      message: "El tipo de transporte no es válido.",
    };
  }

  if (quantityValue && (!Number.isInteger(Number(quantityValue)) || Number(quantityValue) < 0)) {
    return {
      success: false,
      message: "La cantidad debe ser un número entero igual o mayor que cero.",
    };
  }

  if (weightValue && (!Number.isFinite(Number(weightValue)) || Number(weightValue) < 0)) {
    return {
      success: false,
      message: "El peso debe ser un número igual o mayor que cero.",
    };
  }

  const validDate = (value: string) =>
    !value || !Number.isNaN(Date.parse(value));

  if (!validDate(etdValue) || !validDate(etaValue)) {
    return {
      success: false,
      message: "Ingresa fechas de salida y llegada válidas.",
    };
  }

  // Verificar que la empresa exista
  const { data: company, error: companyError } = await supabase
    .from("companies")
    .select("id")
    .eq("id", companyId)
    .single();

  if (companyError || !company) {
    return {
      success: false,
      message: "La empresa seleccionada no existe.",
    };
  }

  // Registrar operación
  const { error: insertError } = await supabase
    .from("operations")
    .insert({
      company_id: companyId,
      awb,
      description: description || null,
      transport_type: transportType,
      service_type: serviceType || null,
      airline: airline || null,
      origin,
      destination,
      warehouse: warehouse || null,
      etd: etdValue ? new Date(etdValue).toISOString() : null,
      eta: etaValue ? new Date(etaValue).toISOString() : null,
      quantity: quantityValue ? Number(quantityValue) : null,
      weight: weightValue ? Number(weightValue) : null,
      consignee: consignee || null,
      dam: dam || null,
      channel: channel || null,
      observations: observations || null,
      status: status || "Pendiente",
    });

  if (insertError) {
    if (insertError.code === "23505") {
      return {
        success: false,
        message: "Este número de AWB ya está registrado.",
      };
    }

    console.error("Error al registrar operación:", insertError);

    return {
      success: false,
      message: "No se pudo registrar la operación. Inténtalo nuevamente.",
    };
  }

  revalidatePath("/dashboard/busqueda");
  revalidatePath("/dashboard/operaciones");

  return {
    success: true,
    message: "La operación se registró correctamente.",
  };
}

export async function updateOperation(
  _prevState: OperationState,
  formData: FormData
): Promise<OperationState> {
  const supabase = await createClient();

  // 1. Verificar sesión
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

  // 2. Verificar que sea administrador
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("user_id", user.id)
    .single();

  if (profileError || profile?.role !== "admin") {
    return {
      success: false,
      message: "No tienes permisos para actualizar operaciones.",
    };
  }

  // 3. Obtener los datos del formulario
  const id = String(formData.get("id") ?? "").trim();
  const companyId = String(formData.get("company_id") ?? "").trim();
  const awb = String(formData.get("awb") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const transportType = String(formData.get("transport_type") ?? "").trim();
  const serviceType = String(formData.get("service_type") ?? "").trim();
  const airline = String(formData.get("airline") ?? "").trim();
  const origin = String(formData.get("origin") ?? "").trim();
  const destination = String(formData.get("destination") ?? "").trim();
  const warehouse = String(formData.get("warehouse") ?? "").trim();
  const consignee = String(formData.get("consignee") ?? "").trim();
  const dam = String(formData.get("dam") ?? "").trim();
  const channel = String(formData.get("channel") ?? "").trim();
  const observations = String(formData.get("observations") ?? "").trim();
  const status = String(formData.get("status") ?? "").trim();

  const etdValue = String(formData.get("etd") ?? "").trim();
  const etaValue = String(formData.get("eta") ?? "").trim();
  const quantityValue = String(formData.get("quantity") ?? "").trim();
  const weightValue = String(formData.get("weight") ?? "").trim();

  // 4. Validaciones básicas
  if (!id || !companyId || !awb || !transportType || !origin || !destination) {
    return {
      success: false,
      message: "Completa los campos obligatorios.",
    };
  }

  if (!["AEREA", "MARITIMA", "TERRESTRE"].includes(transportType)) {
    return {
      success: false,
      message: "El tipo de transporte no es válido.",
    };
  }

  const allowedStatuses = [
    "Pendiente",
    "En proceso",
    "En tránsito",
    "Finalizado",
    "Cancelado",
  ];

  if (!allowedStatuses.includes(status)) {
    return {
      success: false,
      message: "El estado seleccionado no es válido.",
    };
  }

  const quantity = quantityValue === "" ? null : Number(quantityValue);
  const weight = weightValue === "" ? null : Number(weightValue);

  if (
    quantity !== null &&
    (!Number.isInteger(quantity) || quantity < 0)
  ) {
    return {
      success: false,
      message: "La cantidad debe ser un número entero igual o mayor a cero.",
    };
  }

  if (weight !== null && (!Number.isFinite(weight) || weight < 0)) {
    return {
      success: false,
      message: "El peso debe ser un número igual o mayor a cero.",
    };
  }

  const parseDate = (value: string) => {
    if (!value) return null;

    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
  };

  const etd = parseDate(etdValue);
  const eta = parseDate(etaValue);

  if (etd === undefined || eta === undefined) {
    return {
      success: false,
      message: "Verifica que las fechas ingresadas sean válidas.",
    };
  }

  // 5. Verificar que la empresa exista
  const { data: company, error: companyError } = await supabase
    .from("companies")
    .select("id")
    .eq("id", companyId)
    .single();

  if (companyError || !company) {
    return {
      success: false,
      message: "La empresa seleccionada no existe.",
    };
  }

  // 6. Actualizar la operación
  const { error: updateError } = await supabase
    .from("operations")
    .update({
      company_id: companyId,
      awb,
      description: description || null,
      transport_type: transportType,
      service_type: serviceType || null,
      airline: airline || null,
      origin,
      destination,
      warehouse: warehouse || null,
      consignee: consignee || null,
      dam: dam || null,
      channel: channel || null,
      observations: observations || null,
      status,
      etd,
      eta,
      quantity,
      weight,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (updateError) {
    if (updateError.code === "23505") {
      return {
        success: false,
        message: "Ya existe una operación con ese número AWB.",
      };
    }

    console.error("Error al actualizar operación:", updateError);

    return {
      success: false,
      message: "No se pudo actualizar la operación.",
    };
  }

  // 7. Actualizar las páginas relacionadas
  revalidatePath("/dashboard/busqueda");
  revalidatePath("/dashboard/operaciones");
  revalidatePath(`/dashboard/operaciones/${id}/editar`);

  return {
    success: true,
    message: "La operación se actualizó correctamente.",
  };
}