import "server-only";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_GERENCIA = "gerencia@aurumlogistics.com.pe";
const EMAIL_REMITENTE = process.env.RESEND_FROM_EMAIL;
const URL_CONSULTA = "https://aurumlogistics.com.pe/consultar-reclamo";

type EventoReclamo =
  | "nuevo_reclamo"
  | "respuesta_reclamo"
  | "nueva_apelacion"
  | "respuesta_apelacion";

type DatosReclamo = {
  trackingCode: string;
  fullName: string;
  email: string;
};

type NotificacionReclamo = {
  evento: EventoReclamo;
  reclamo: DatosReclamo;
  detalle?: string;
  solucionSolicitada?: string;
};

function escaparHTML(valor: string) {
  return valor
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function notificarReclamo({
  evento,
  reclamo,
  detalle,
  solucionSolicitada,
}: NotificacionReclamo) {
  try {
    if (!process.env.RESEND_API_KEY || !EMAIL_REMITENTE) {
      console.error("Faltan las variables de entorno de Resend.");
      return;
    }

    const contenidos = {
      nuevo_reclamo: {
        asunto: "Hemos recibido tu reclamo",
        titulo: "Tu reclamo fue registrado",
        mensaje:
          "Hemos recibido correctamente tu solicitud. Nuestro equipo revisará la información y te comunicará la respuesta correspondiente.",
      },
      respuesta_reclamo: {
        asunto: "Hay una respuesta a tu reclamo",
        titulo: "Tu reclamo tiene una respuesta",
        mensaje:
          "Aurum Logistics ha registrado una respuesta a tu reclamo. Ingresa al portal de consulta para revisar la información y registrar tu decisión.",
      },
      nueva_apelacion: {
        asunto: "Se ha registrado una apelación",
        titulo: "Tu apelación fue registrada",
        mensaje:
          "Hemos recibido tu apelación. Nuestro equipo revisará los argumentos y la solución solicitada.",
      },
      respuesta_apelacion: {
        asunto: "Tu apelación ha sido respondida",
        titulo: "Se ha respondido tu apelación",
        mensaje:
          "Aurum Logistics ha registrado la respuesta final a tu apelación. Puedes consultar los detalles mediante tu código de seguimiento.",
      },
    };

    const contenido = contenidos[evento];

    const seccionDetalle = detalle
      ? `
        <div style="margin-top:24px;padding:20px;background:#f2f2f2;">
          <strong>Detalle:</strong>
          <p style="white-space:pre-wrap;line-height:1.6;">${escaparHTML(detalle)}</p>
        </div>
      `
      : "";

    const seccionSolucion = solucionSolicitada
      ? `
        <div style="margin-top:16px;padding:20px;background:#f2f2f2;">
          <strong>Solución solicitada:</strong>
          <p style="white-space:pre-wrap;line-height:1.6;">${escaparHTML(solucionSolicitada)}</p>
        </div>
      `
      : "";

    const html = `
      <div style="background:#f7f7f7;padding:32px 16px;font-family:Arial,sans-serif;color:#333;">
        <div style="max-width:600px;margin:0 auto;background:#ffffff;padding:32px;">
          <h2 style="color:#015089;margin-top:0;">Aurum Logistics SAC</h2>

          <h1 style="font-size:24px;color:#222;">
            ${contenido.titulo}
          </h1>

          <p>Hola ${escaparHTML(reclamo.fullName)},</p>

          <p style="line-height:1.7;">
            ${contenido.mensaje}
          </p>

          <div style="margin:24px 0;padding:20px;background:#f2f2f2;">
            <p style="margin:0 0 8px;color:#555;">Código de seguimiento</p>
            <strong style="font-size:24px;color:#015089;">
              ${escaparHTML(reclamo.trackingCode)}
            </strong>
          </div>

          ${seccionDetalle}
          ${seccionSolucion}

          <p style="margin-top:28px;">
            <a href="${URL_CONSULTA}"
              style="display:inline-block;padding:14px 22px;background:#015089;color:#ffffff;text-decoration:none;">
              Consultar reclamo
            </a>
          </p>

          <p style="font-size:13px;color:#777;line-height:1.6;margin-top:32px;">
            Este es un mensaje automático de Aurum Logistics S.A.C.
            Por favor, no respondas directamente a este correo.
          </p>
        </div>
      </div>
    `;

    const destinatarios = [
      EMAIL_GERENCIA,
      reclamo.email,
    ];

    const resultados = await Promise.allSettled(
      destinatarios.map((email) =>
        resend.emails.send({
          from: EMAIL_REMITENTE,
          to: email,
          subject: contenido.asunto,
          html,
        })
      )
    );

    resultados.forEach((resultado, index) => {
      if (resultado.status === "rejected") {
        console.error(
          `Error enviando correo a ${destinatarios[index]}:`,
          resultado.reason
        );
      } else if (resultado.value.error) {
        console.error(
          `Resend no pudo enviar el correo a ${destinatarios[index]}:`,
          resultado.value.error
        );
      }
    });
  } catch (error) {
    console.error("Error al enviar notificaciones:", error);
  }
}