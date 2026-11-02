
    "use server";

    import { createClient } from "@/lib/supabase/server";
    import { createAdminClient } from "@/lib/supabase/admin";

    interface RegisterClientResult {
    success: boolean;
    message: string;
    }

    export async function registerClient(
    formData: FormData
    ): Promise<RegisterClientResult> {
    // 1. Validar la sesión del administrador
    const supabase = await createClient();

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

    // 2. Comprobar que el usuario tenga rol admin
    const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("user_id", user.id)
        .single();

    if (profileError || profile?.role !== "admin") {
        return {
        success: false,
        message: "No tienes permisos para registrar clientes.",
        };
    }

    // 3. Obtener y validar los datos del formulario
    const razonSocial = String(formData.get("razon_social") ?? "").trim();
    const ruc = String(formData.get("ruc") ?? "").trim();
    const nombreCompleto = String(
        formData.get("nombre_completo") ?? ""
    ).trim();
    const email = String(formData.get("email") ?? "")
        .trim()
        .toLowerCase();
    const telefono = String(formData.get("telefono") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (
        !razonSocial ||
        !nombreCompleto ||
        !email ||
        !password ||
        !/^\d{11}$/.test(ruc)
    ) {
        return {
        success: false,
        message: "Completa los campos obligatorios y verifica el RUC.",
        };
    }

    if (password.length < 8) {
        return {
        success: false,
        message: "La contraseña debe tener al menos 8 caracteres.",
        };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return {
        success: false,
        message: "Ingresa un correo electrónico válido.",
        };
    }

    // 4. Crear el cliente administrativo
    const admin = createAdminClient();

    // 5. Registrar la empresa
    const { data: company, error: companyError } = await admin
        .from("companies")
        .insert({
        razon_social: razonSocial,
        ruc,
        telefono: telefono || null,
        })
        .select("id")
        .single();

    if (companyError || !company) {
        return {
        success: false,
        message:
            companyError?.code === "23505"
            ? "Ya existe una empresa registrada con ese RUC."
            : "No se pudo registrar la empresa.",
        };
    }

    // 6. Crear la cuenta en Supabase Auth
    const { data: authData, error: createUserError } =
        await admin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        });

    if (createUserError || !authData.user) {
        await admin.from("companies").delete().eq("id", company.id);

        return {
        success: false,
        message:
            "No se pudo crear la cuenta. Comprueba que el correo no esté registrado.",
        };
    }

    // 7. Crear el perfil del cliente
    const { error: insertProfileError } = await admin
        .from("profiles")
        .insert({
        user_id: authData.user.id,
        company_id: company.id,
        nombre_completo: nombreCompleto,
        role: "cliente",
        });

    if (insertProfileError) {
        // Revertir los registros si falla la creación del perfil
        await admin.auth.admin.deleteUser(authData.user.id);
        await admin.from("companies").delete().eq("id", company.id);

        return {
        success: false,
        message: "No se pudo completar el registro del cliente.",
        };
    }

    return {
        success: true,
        message: "El cliente se registró correctamente.",
    };
    }
