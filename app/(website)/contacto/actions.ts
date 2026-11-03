
"use server";

import "server-only";
import { Resend } from "resend";

const EMAIL_GERENCIA = "gerencia@aurumlogistics.com.pe";
const EMAIL_REMITENTE = process.env.RESEND_FROM_EMAIL;

type DatosContacto = {
  name: string;
  email: string;
  servicio: string;
  phone: string;
  mensaje: string;
};

function escaparHTML(valor: string) {
  return valor
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const nombresServicios: Record<string, string> = {
  aereo: "Transporte aéreo",
  maritimo: "Transporte marítimo",
  terrestre: "Transporte terrestre",
  valorado: "Servicio valorado",
};

export async function enviarContacto(formData: FormData) {
  try {
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const servicio = String(formData.get("servicio") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const mensaje = String(formData.get("mensaje") ?? "").trim();
    const privacidad = formData.get("privacidad");

    if (!name || !email || !servicio || !phone || privacidad !== "on") {
      return { ok: false, message: "Completa los campos obligatorios." };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { ok: false, message: "Ingresa un correo electrónico válido." };
    }

    if (!nombresServicios[servicio]) {
      return { ok: false, message: "Selecciona un servicio válido." };
    }

    if (name.length > 150 || email.length > 254 || phone.length > 30 || mensaje.length > 5000) {
      return { ok: false, message: "Uno de los campos supera la longitud permitida." };
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey || !EMAIL_REMITENTE) {
      console.error("Faltan las variables de entorno de Resend.");
      return { ok: false, message: "No se pudo procesar tu solicitud." };
    }

    const resend = new Resend(apiKey);

    const nombreSeguro = escaparHTML(name);
    const emailSeguro = escaparHTML(email);
    const telefonoSeguro = escaparHTML(phone);
    const servicioSeguro = escaparHTML(nombresServicios[servicio]);
    const mensajeSeguro = escaparHTML(mensaje || "No se incluyó un mensaje adicional.").replace(/\n/g, "<br />");

    const estilo = `
      font-family: Arial, Helvetica, sans-serif;
      color: #333333;
      line-height: 1.6;
    `;

    const correoGerencia = `
      <div style="max-width:600px;margin:0 auto;background:#ffffff;padding:32px;${estilo}">
        <img
          src="https://aurumlogistics.com.pe/logo.png"
          alt="Aurum Logistics"
          width="180"
          style="display:block;width:180px;height:auto;margin:0 0 24px;"
        />
        <h2 style="color:#015089;margin-top:0;">Nueva solicitud de contacto</h2>
        <p>Has recibido una nueva solicitud a través del formulario de contacto de Aurum Logistics.</p>

        <div style="background:#f5f7f9;padding:20px;margin:24px 0;">
          <p><strong>Nombre:</strong> ${nombreSeguro}</p>
          <p><strong>Correo electrónico:</strong> ${emailSeguro}</p>
          <p><strong>Teléfono:</strong> ${telefonoSeguro}</p>
          <p><strong>Servicio solicitado:</strong> ${servicioSeguro}</p>
          <p><strong>Mensaje:</strong><br />${mensajeSeguro}</p>
        </div>

        <p style="font-size:13px;color:#777777;">
          Este mensaje fue generado desde el formulario de contacto del sitio web.
        </p>
      </div>
    `;

    const correoCliente = `
      <div style="max-width:600px;margin:0 auto;background:#ffffff;padding:32px;${estilo}">
        <h2 style="color:#015089;margin-top:0;font-size:24px;font-weight:700;">
        Aurum Logistics
        </h2>

        <h2 style="color:#015089;margin-top:0;">Hemos recibido tu solicitud</h2>

        <p>Hola ${nombreSeguro},</p>

        <p>
          Gracias por contactar con Aurum Logistics. Hemos recibido correctamente
          tu solicitud y nuestro equipo revisará la información para comunicarse contigo.
        </p>

        <div style="background:#f5f7f9;padding:20px;margin:24px 0;">
          <p style="margin-top:0;"><strong>Servicio solicitado</strong></p>
          <p>${servicioSeguro}</p>
        </div>

        <p>
          Si necesitamos información adicional, nos pondremos en contacto contigo
          a través de los datos que nos proporcionaste.
        </p>

        <p style="font-size:13px;color:#777777;margin-top:32px;">
          Este es un mensaje automático de Aurum Logistics S.A.C.
          Puedes responder a este correo si deseas comunicarte con nuestro equipo.
        </p>
      </div>
    `;

    const [resultadoGerencia, resultadoCliente] = await Promise.all([
      resend.emails.send({
        from: EMAIL_REMITENTE,
        to: [EMAIL_GERENCIA],
        replyTo: email,
        subject: `Nueva solicitud de contacto - ${name}`,
        html: correoGerencia,
      }),
      resend.emails.send({
        from: EMAIL_REMITENTE,
        to: [email],
        replyTo: EMAIL_GERENCIA,
        subject: "Hemos recibido tu solicitud | Aurum Logistics",
        html: correoCliente,
      }),
    ]);

    if (resultadoGerencia.error) {
      console.error("Error enviando notificación a gerencia:", resultadoGerencia.error);
      return { ok: false, message: "No se pudo enviar tu solicitud. Inténtalo nuevamente." };
    }

    if (resultadoCliente.error) {
      console.error("Error enviando confirmación al cliente:", resultadoCliente.error);
    }

    return {
      ok: true,
      message: "Tu solicitud fue enviada correctamente.",
    };
  } catch (error) {
    console.error("Error en el formulario de contacto:", error);

    return {
      ok: false,
      message: "Ocurrió un error al enviar tu solicitud. Inténtalo nuevamente.",
    };
  }
}
