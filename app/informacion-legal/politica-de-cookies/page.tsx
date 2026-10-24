
import Cta from "@/components/ui/Cta";
import Link from "next/link";

export default function PoliticaDeCookies() {
  return (
    <main className="w-full">
      <section className="mx-auto w-full max-w-4xl px-5 py-12 md:px-8 md:py-16 mt-20">
        <header className="mb-8">
          <p className="font-body text-sm text-muted mb-2">
            Última actualización: 23 de octubre de 2026
          </p>

          <h1 className="font-heading text-3xl md:text-4xl font-semibold text-muted mb-4">
            Política de Cookies
          </h1>

          <p className="font-body text-base text-muted">
            En esta política te explicamos cómo Aurum Logistics S.A.C.
            utiliza cookies y tecnologías similares en su sitio web,
            así como las opciones disponibles para gestionar tus
            preferencias.
          </p>
        </header>

        <div className="space-y-7">
          <section>
            <h2 className="font-heading text-xl font-semibold text-muted mb-2">
              1. ¿Qué son las cookies?
            </h2>

            <p className="font-body text-base text-muted mb-2">
              Las cookies son pequeños archivos de texto que se
              almacenan en el navegador o dispositivo cuando visitas
              un sitio web. Permiten recordar determinadas preferencias,
              facilitar el funcionamiento de la página y recopilar
              información sobre la navegación.
            </p>

            <p className="font-body text-base text-muted">
              En esta política, explicamos cómo{" "}
              <strong>
                <Link href="/" className="underline underline-offset-4">
                  Aurum Logistics S.A.C.
                </Link>
              </strong>{" "}
              utiliza cookies y tecnologías similares en su sitio web.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-muted mb-2">
              2. ¿Quién es responsable del uso de cookies?
            </h2>

            <p className="font-body text-base text-muted mb-2">
              El responsable del sitio web es Aurum Logistics S.A.C.,
              empresa de logística internacional ubicada en el Callao,
              Perú.
            </p>

            <ul className="font-body text-base text-muted space-y-1.5 list-disc pl-6">
              <li>
                <strong>Empresa:</strong> Aurum Logistics S.A.C.
              </li>
              <li>
                <strong>Sitio web:</strong>{" "}
                <Link
                  href="https://aurumlogistics.com.pe/"
                  className="underline underline-offset-4"
                >
                  aurumlogistics.com.pe
                </Link>
              </li>
              <li>
                <strong>Correo electrónico:</strong>{" "}
                <a
                  href="mailto:gerencia@aurumlogistics.com"
                  className="underline underline-offset-4"
                >
                  gerencia@aurumlogistics.com
                </a>
              </li>
              <li>
                <strong>Teléfono:</strong>{" "}
                <a
                  href="tel:+51950306765"
                  className="underline underline-offset-4"
                >
                  +51 950 306 765
                </a>
              </li>
              <li>
                <strong>Ubicación:</strong> Callao, Perú.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-muted mb-2">
              3. ¿Qué tipos de cookies utilizamos?
            </h2>

            <p className="font-body text-base text-muted mb-3">
              Nuestro sitio web puede utilizar las siguientes categorías
              de cookies y tecnologías similares, según las funciones
              habilitadas y la configuración implementada.
            </p>

            <h3 className="font-heading text-lg font-semibold text-muted mb-1.5">
              3.1. Cookies necesarias
            </h3>

            <p className="font-body text-base text-muted mb-3">
              Son aquellas que pueden ser indispensables para el
              funcionamiento, la seguridad y la prestación de determinadas
              funciones del sitio web. Por ejemplo, pueden permitir
              recordar tus preferencias de consentimiento o mantener
              determinadas funciones técnicas.
            </p>

            <h3 className="font-heading text-lg font-semibold text-muted mb-1.5">
              3.2. Cookies analíticas
            </h3>

            <p className="font-body text-base text-muted mb-3">
              Permiten conocer cómo interactúan los visitantes con el
              sitio web, qué páginas consultan y cómo se utilizan sus
              contenidos. Para este propósito, podemos utilizar Google
              Analytics, sujeto a la configuración del servicio y a las
              preferencias de consentimiento aplicables.
            </p>

            <h3 className="font-heading text-lg font-semibold text-muted mb-1.5">
              3.3. Cookies y tecnologías de terceros
            </h3>

            <p className="font-body text-base text-muted">
              Algunas funciones pueden depender de servicios externos.
              Estos servicios podrían utilizar cookies u otras tecnologías
              de almacenamiento, según su implementación. La presencia
              de un proveedor externo no significa necesariamente que
              instale cookies en todos los casos.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-muted mb-2">
              4. Uso de Google Analytics
            </h2>

            <p className="font-body text-base text-muted mb-2">
              Podemos utilizar Google Analytics, un servicio de análisis
              web proporcionado por Google, para comprender cómo los
              visitantes utilizan nuestro sitio web, evaluar el rendimiento
              de las páginas y mejorar sus contenidos y experiencia de
              navegación.
            </p>

            <p className="font-body text-base text-muted mb-2">
              Según la configuración implementada, el servicio puede
              recopilar información como las páginas visitadas, la duración
              de las visitas, el tipo de dispositivo, el navegador, la
              procedencia del tráfico y las interacciones realizadas.
              También puede utilizar cookies como <code>_ga</code> y
              otros identificadores de medición.
            </p>

            <p className="font-body text-base text-muted mb-2">
              Las cookies analíticas no necesarias deberán habilitarse
              conforme a las preferencias de consentimiento aplicables.
              El tratamiento de información por parte de Google se rige
              también por sus propias condiciones y políticas.
            </p>

            <p className="font-body text-base text-muted">
              Puedes obtener más información en la{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4"
              >
                Política de Privacidad de Google
              </a>{" "}
              y en la{" "}
              <a
                href="https://support.google.com/analytics/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4"
              >
                documentación oficial de Google Analytics
              </a>.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-muted mb-2">
              5. Uso de Resend
            </h2>

            <p className="font-body text-base text-muted mb-2">
              Utilizamos Resend como proveedor tecnológico para el envío
              de correos electrónicos asociados al funcionamiento del sitio
              web, por ejemplo, mensajes generados mediante formularios
              de contacto o solicitudes de información.
            </p>

            <p className="font-body text-base text-muted mb-2">
              Los datos que proporciones a través de un formulario pueden
              ser procesados para gestionar tu solicitud y enviar las
              comunicaciones correspondientes. El uso de Resend no implica
              necesariamente que se instalen cookies en tu navegador.
            </p>

            <p className="font-body text-base text-muted">
              Puedes consultar la{" "}
              <a
                href="https://resend.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4"
              >
                Política de Privacidad de Resend
              </a>{" "}
              y su{" "}
              <a
                href="https://resend.com/legal/dpa"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4"
              >
                Anexo de Tratamiento de Datos
              </a>.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-muted mb-2">
              6. Uso de Supabase
            </h2>

            <p className="font-body text-base text-muted mb-2">
              Utilizamos Supabase como proveedor tecnológico para
              gestionar y almacenar información necesaria para determinadas
              funcionalidades del sitio web y de nuestros sistemas
              asociados.
            </p>

            <p className="font-body text-base text-muted mb-2">
              Según las funciones implementadas, Supabase puede intervenir
              en el almacenamiento de datos enviados mediante formularios,
              la gestión de información y, cuando corresponda, la
              autenticación y administración de sesiones de usuarios.
            </p>

            <p className="font-body text-base text-muted mb-2">
              Las funciones de autenticación pueden utilizar cookies,
              almacenamiento local u otros mecanismos para gestionar
              sesiones, dependiendo de la configuración técnica. Supabase
              no implica necesariamente el uso de cookies en todos los
              casos.
            </p>

            <p className="font-body text-base text-muted mb-2">
              La información gestionada mediante este proveedor será
              tratada conforme a las finalidades correspondientes, las
              medidas de seguridad aplicables y la normativa de protección
              de datos personales.
            </p>

            <p className="font-body text-base text-muted">
              Para más información, consulta la{" "}
              <a
                href="https://supabase.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4"
              >
                Política de Privacidad de Supabase
              </a>{" "}
              y su{" "}
              <a
                href="https://supabase.com/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4"
              >
                documentación oficial
              </a>.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-muted mb-2">
              7. ¿Cómo puedes gestionar tus preferencias?
            </h2>

            <p className="font-body text-base text-muted mb-2">
              Puedes aceptar, rechazar o configurar las cookies no
              necesarias mediante el panel de preferencias del sitio web,
              cuando esté disponible.
            </p>

            <p className="font-body text-base text-muted mb-2">
              También puedes configurar tu navegador para bloquear o
              eliminar cookies. Ten presente que bloquear determinadas
              cookies puede afectar al funcionamiento de algunas funciones
              de la página.
            </p>

            <p className="font-body text-base text-muted">
              Si deseas retirar un consentimiento otorgado anteriormente,
              podrás modificar tus preferencias desde el mecanismo de
              configuración de cookies del sitio web, siempre que esté
              implementado. Eliminar cookies desde el navegador no siempre
              comunica tu decisión al sitio web.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-muted mb-2">
              8. Conservación de la información
            </h2>

            <p className="font-body text-base text-muted mb-2">
              Las cookies pueden tener diferentes periodos de duración
              según su finalidad, proveedor y configuración. Algunas
              desaparecen al cerrar el navegador, mientras que otras
              permanecen durante un periodo determinado.
            </p>

            <p className="font-body text-base text-muted">
              Los plazos concretos deben verificarse según las cookies y
              tecnologías efectivamente activas en el sitio web. Los datos
              enviados mediante formularios pueden conservarse durante el
              tiempo necesario para atender las solicitudes y cumplir las
              obligaciones legales aplicables, conforme a nuestra Política
              de Privacidad.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-muted mb-2">
              9. Protección de datos personales
            </h2>

            <p className="font-body text-base text-muted mb-2">
              El uso de cookies y tecnologías similares puede implicar
              el tratamiento de datos personales, dependiendo de la
              información recopilada y de la configuración utilizada.
            </p>

            <p className="font-body text-base text-muted">
              Aurum Logistics S.A.C. tratará la información conforme a la
              normativa peruana de protección de datos personales y a su
              Política de Privacidad. Cuando corresponda, se solicitará
              consentimiento antes de habilitar tecnologías no necesarias.
              Puedes consultar nuestra{" "}
              <Link
                href="/politica-de-privacidad"
                className="underline underline-offset-4"
              >
                Política de Privacidad
              </Link>.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-muted mb-2">
              10. Cambios en esta política
            </h2>

            <p className="font-body text-base text-muted">
              Podemos actualizar esta Política de Cookies para reflejar
              cambios en el sitio web, los servicios utilizados o la
              normativa aplicable. La versión vigente estará disponible
              en esta página e indicará su fecha de actualización.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-muted mb-2">
              11. Contacto
            </h2>

            <p className="font-body text-base text-muted mb-2">
              Si tienes preguntas sobre esta Política de Cookies o deseas
              realizar una consulta relacionada con el tratamiento de tus
              datos personales, puedes comunicarte con nosotros:
            </p>

            <ul className="font-body text-base text-muted space-y-1.5 list-disc pl-6">
              <li>
                <strong>Correo electrónico:</strong>{" "}
                <a
                  href="mailto:gerencia@aurumlogistics.com"
                  className="underline underline-offset-4"
                >
                  gerencia@aurumlogistics.com
                </a>
              </li>
              <li>
                <strong>Teléfono:</strong>{" "}
                <a
                  href="tel:+51950306765"
                  className="underline underline-offset-4"
                >
                  +51 950 306 765
                </a>
              </li>
            </ul>

            <p className="font-body text-base text-muted mt-3">
              <strong>Aurum Logistics S.A.C.</strong>
              <br />
              Callao, Perú.
            </p>
          </section>
        </div>
      </section>

      <Cta />
    </main>
  );
}
