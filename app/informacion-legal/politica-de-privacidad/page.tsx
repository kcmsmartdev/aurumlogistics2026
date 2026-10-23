
import Link from "next/link";

export default function PoliticaDePrivacidad() {
  return (
    <main className="w-full">
      <section className="mx-auto w-full max-w-4xl px-5 py-12 md:px-8 md:py-16 mt-20">
        <header className="mb-8">
          <p className="font-body text-sm text-muted mb-2">
            Última actualización: 23 de octubre de 2026
          </p>

          <h1 className="font-heading text-3xl md:text-4xl font-semibold text-muted mb-4">
            Política de Privacidad
          </h1>

          <p className="font-body text-base text-muted">
            En Aurum Logistics S.A.C. respetamos la privacidad de las
            personas y tratamos sus datos personales de manera responsable.
            En este documento explicamos qué información podemos recopilar,
            con qué finalidad la utilizamos, cómo la protegemos y qué
            derechos puedes ejercer sobre ella.
          </p>
        </header>

        <div className="space-y-7">
          <section>
            <h2 className="font-heading text-xl font-semibold text-muted mb-2">
              1. ¿Quién es responsable del tratamiento de tus datos?
            </h2>

            <p className="font-body text-base text-muted mb-2">
              El responsable del tratamiento de los datos personales
              recopilados a través de nuestro sitio web es:
            </p>

            <ul className="font-body text-base text-muted space-y-1.5 list-disc pl-6">
              <li>
                <strong>Razón social:</strong> Aurum Logistics S.A.C.
              </li>
              <li>
                <strong>Sitio web:</strong>{" "}
                <Link
                  href="/"
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
              2. ¿Qué datos personales recopilamos?
            </h2>

            <p className="font-body text-base text-muted mb-2">
              Dependiendo de la funcionalidad utilizada y de la relación
              que mantengas con nosotros, podemos recopilar las siguientes
              categorías de datos personales:
            </p>

            <ul className="font-body text-base text-muted space-y-2 list-disc pl-6">
              <li>
                <strong>Datos de identificación:</strong> nombres y
                apellidos, tipo y número de documento, cuando sean
                necesarios para una solicitud o trámite.
              </li>
              <li>
                <strong>Datos de contacto:</strong> correo electrónico,
                número de teléfono, domicilio y otros datos que decidas
                proporcionar.
              </li>
              <li>
                <strong>Datos empresariales y comerciales:</strong> nombre
                de la empresa, información relacionada con una solicitud
                de cotización y datos necesarios para coordinar una
                operación logística.
              </li>
              <li>
                <strong>Datos de operaciones:</strong> información sobre
                la carga, documentos, origen, destino y estado de una
                operación, cuando resulte necesario para prestar el
                servicio correspondiente.
              </li>
              <li>
                <strong>Datos de reclamos:</strong> información de
                identificación, contacto y detalles que proporciones
                al presentar un reclamo o una queja mediante los canales
                habilitados.
              </li>
              <li>
                <strong>Datos técnicos y de navegación:</strong> dirección
                IP, tipo de navegador, dispositivo, páginas visitadas e
                interacciones con el sitio, cuando las herramientas
                técnicas utilizadas los recopilen.
              </li>
            </ul>

            <p className="font-body text-base text-muted mt-2">
              Solicitaremos los datos que resulten pertinentes para
              la finalidad correspondiente. Te pedimos no enviar
              información personal innecesaria a través de los
              formularios del sitio web.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-muted mb-2">
              3. ¿Cómo recopilamos tus datos?
            </h2>

            <p className="font-body text-base text-muted mb-2">
              Podemos obtener información personal a través de los
              siguientes medios:
            </p>

            <ul className="font-body text-base text-muted space-y-2 list-disc pl-6">
              <li>
                Formularios de contacto y solicitudes de cotización.
              </li>
              <li>
                Formularios del Libro de Reclamaciones y otros canales
                de atención.
              </li>
              <li>
                Comunicaciones enviadas por correo electrónico o teléfono.
              </li>
              <li>
                Plataformas de seguimiento y sistemas de acceso para
                clientes, cuando corresponda.
              </li>
              <li>
                Herramientas de análisis y tecnologías similares
                utilizadas en el sitio web, de acuerdo con su
                configuración y las preferencias de consentimiento
                aplicables.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-muted mb-2">
              4. ¿Para qué utilizamos tus datos personales?
            </h2>

            <p className="font-body text-base text-muted mb-2">
              Utilizamos los datos personales para finalidades
              relacionadas con nuestras actividades y con la solicitud
              o servicio que corresponda, entre ellas:
            </p>

            <ul className="font-body text-base text-muted space-y-2 list-disc pl-6">
              <li>
                Atender consultas, solicitudes de información y
                cotizaciones.
              </li>
              <li>
                Comunicarnos contigo en relación con una solicitud
                o servicio.
              </li>
              <li>
                Evaluar, coordinar y dar seguimiento a operaciones
                logísticas de importación y exportación.
              </li>
              <li>
                Gestionar documentación e información necesaria para
                las operaciones contratadas.
              </li>
              <li>
                Recibir, registrar, atender y responder reclamos
                y quejas.
              </li>
              <li>
                Gestionar el acceso y funcionamiento de las plataformas
                o herramientas destinadas a clientes, cuando corresponda.
              </li>
              <li>
                Mantener la seguridad, prevenir usos no autorizados
                y resolver incidencias técnicas.
              </li>
              <li>
                Analizar el funcionamiento del sitio web y mejorar
                sus contenidos, cuando se utilicen herramientas de
                medición habilitadas para esa finalidad.
              </li>
              <li>
                Cumplir obligaciones legales y atender requerimientos
                de autoridades competentes, cuando corresponda.
              </li>
            </ul>

            <p className="font-body text-base text-muted mt-2">
              Cuando una finalidad requiera tu consentimiento, este
              será solicitado de acuerdo con la normativa aplicable.
              Si deseamos utilizar tus datos para una finalidad adicional
              que lo requiera, te informaremos y solicitaremos la
              autorización correspondiente.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-muted mb-2">
              5. Formularios de contacto y cotización
            </h2>

            <p className="font-body text-base text-muted mb-2">
              Si utilizas nuestros formularios, trataremos los datos
              que proporciones para responder a tu consulta, evaluar
              tus necesidades y, cuando corresponda, preparar o dar
              seguimiento a una cotización.
            </p>

            <p className="font-body text-base text-muted">
              Proporcionar información incompleta o incorrecta puede
              dificultar la atención de tu solicitud. Los datos no
              se utilizarán para enviarte comunicaciones comerciales
              ajenas a la solicitud sin contar con la base legal o
              el consentimiento que corresponda.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-muted mb-2">
              6. Libro de Reclamaciones
            </h2>

            <p className="font-body text-base text-muted mb-2">
              Cuando presentes un reclamo o una queja, trataremos
              los datos que proporciones para registrar la comunicación,
              evaluar los hechos, gestionar su atención y emitir
              la respuesta correspondiente.
            </p>

            <p className="font-body text-base text-muted mb-2">
              La información solicitada dependerá del formulario
              y de los requisitos aplicables. Puede incluir datos
              de identificación y contacto, información relacionada
              con el producto o servicio, descripción de los hechos
              y el pedido que formules.
            </p>

            <p className="font-body text-base text-muted">
              La información se conservará durante el periodo necesario
              para gestionar el reclamo y cumplir las obligaciones
              legales aplicables. El acceso estará limitado a las
              personas autorizadas y a los terceros que deban intervenir
              legítimamente en su atención.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-muted mb-2">
              7. Seguimiento de carga y acceso de clientes
            </h2>

            <p className="font-body text-base text-muted mb-2">
              Si utilizas nuestras herramientas de seguimiento o una
              plataforma de acceso para clientes, podremos tratar
              los datos necesarios para verificar tu acceso y mostrar
              información relacionada con las operaciones autorizadas.
            </p>

            <p className="font-body text-base text-muted">
              Cuando se utilicen credenciales, te recomendamos
              mantenerlas en privado y no compartirlas con personas
              no autorizadas. La información visible dependerá de
              los permisos y funcionalidades habilitados para tu cuenta.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-muted mb-2">
              8. Proveedores tecnológicos y destinatarios
            </h2>

            <p className="font-body text-base text-muted mb-2">
              Para operar el sitio web y prestar determinadas
              funcionalidades, podemos utilizar proveedores
              tecnológicos que procesen información por cuenta
              nuestra, de acuerdo con los servicios contratados
              y la configuración implementada.
            </p>

            <h3 className="font-heading text-lg font-semibold text-muted mb-1.5">
              8.1. Supabase
            </h3>

            <p className="font-body text-base text-muted mb-3">
              Utilizamos Supabase para almacenar y gestionar información
              de determinadas funcionalidades del sistema. Según la
              implementación, puede procesar datos enviados mediante
              formularios, información de operaciones o datos necesarios
              para la autenticación y administración de sesiones.
            </p>

            <h3 className="font-heading text-lg font-semibold text-muted mb-1.5">
              8.2. Resend
            </h3>

            <p className="font-body text-base text-muted mb-3">
              Utilizamos Resend para el envío de correos electrónicos
              relacionados con el funcionamiento del sitio web, como
              mensajes de formularios y comunicaciones de atención.
              Los datos procesados dependerán del contenido de cada
              comunicación y de la configuración del servicio.
            </p>

            <h3 className="font-heading text-lg font-semibold text-muted mb-1.5">
              8.3. Google Analytics
            </h3>

            <p className="font-body text-base text-muted mb-3">
              Podemos utilizar Google Analytics para analizar el uso
              del sitio web y evaluar el rendimiento de sus páginas.
              Según la configuración, esta herramienta puede procesar
              datos técnicos, identificadores en línea e información
              sobre las interacciones de los visitantes. Las funciones
              analíticas no necesarias se gestionarán de acuerdo con
              las preferencias de consentimiento aplicables.
            </p>

            <p className="font-body text-base text-muted mb-2">
              Asimismo, cuando sea necesario para una operación
              contratada, determinada información podrá comunicarse
              a transportistas, agentes de aduanas, operadores
              logísticos, proveedores de servicios u otras entidades
              que deban intervenir en la operación, según corresponda.
            </p>

            <p className="font-body text-base text-muted">
              También podremos comunicar información cuando exista
              una obligación legal o un requerimiento válido de una
              autoridad competente. No compartiremos datos personales
              de manera incompatible con las finalidades informadas
              o con la normativa aplicable.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-muted mb-2">
              9. Transferencias internacionales de datos
            </h2>

            <p className="font-body text-base text-muted mb-2">
              Algunos proveedores tecnológicos o participantes de
              una operación logística pueden procesar información
              desde países distintos del Perú. Esto dependerá de
              los servicios utilizados, su configuración y las
              necesidades de cada operación.
            </p>

            <p className="font-body text-base text-muted">
              Cuando se produzcan transferencias internacionales
              de datos personales, Aurum Logistics S.A.C. adoptará
              las medidas y cumplirá los requisitos que correspondan
              conforme a la legislación peruana aplicable.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-muted mb-2">
              10. Cookies y tecnologías similares
            </h2>

            <p className="font-body text-base text-muted mb-2">
              Nuestro sitio web puede utilizar cookies y tecnologías
              similares para permitir determinadas funciones técnicas,
              recordar preferencias y analizar el uso de la página.
              Las tecnologías efectivamente utilizadas dependerán
              de la implementación del sitio web.
            </p>

            <p className="font-body text-base text-muted">
              Para conocer más sobre las categorías de cookies,
              sus finalidades y las opciones de configuración,
              consulta nuestra{" "}
              <Link
                href="/politica-de-cookies"
                className="underline underline-offset-4"
              >
                Política de Cookies
              </Link>.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-muted mb-2">
              11. Conservación de los datos personales
            </h2>

            <p className="font-body text-base text-muted mb-2">
              Conservaremos los datos personales durante el tiempo
              necesario para cumplir las finalidades para las que
              fueron recopilados, gestionar las solicitudes,
              desarrollar las operaciones correspondientes y cumplir
              las obligaciones legales aplicables.
            </p>

            <p className="font-body text-base text-muted">
              El periodo de conservación dependerá del tipo de
              información, la naturaleza de la relación con el usuario,
              las obligaciones legales y la necesidad de atender
              posibles responsabilidades. Cuando los datos ya no
              sean necesarios y no exista una razón legítima para
              conservarlos, se procederá conforme a la normativa
              aplicable.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-muted mb-2">
              12. Seguridad de la información
            </h2>

            <p className="font-body text-base text-muted mb-2">
              Adoptamos medidas técnicas y organizativas razonables
              orientadas a proteger los datos personales contra
              accesos no autorizados, pérdida, alteración, divulgación
              o uso indebido.
            </p>

            <p className="font-body text-base text-muted">
              El acceso a la información se limitará según las
              necesidades de cada función y los permisos establecidos.
              Sin embargo, ningún sistema de transmisión o almacenamiento
              puede garantizar una seguridad absoluta. Cuando corresponda,
              gestionaremos los incidentes conforme a las obligaciones
              legales aplicables.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-muted mb-2">
              13. Tus derechos sobre los datos personales
            </h2>

            <p className="font-body text-base text-muted mb-2">
              Conforme a la normativa peruana de protección de datos
              personales, puedes ejercer los derechos que te
              correspondan sobre tu información personal, incluidos:
            </p>

            <ul className="font-body text-base text-muted space-y-2 list-disc pl-6">
              <li>
                <strong>Acceso:</strong> solicitar información sobre
                tus datos personales y su tratamiento.
              </li>
              <li>
                <strong>Rectificación:</strong> solicitar la corrección
                o actualización de datos inexactos, incompletos
                o desactualizados.
              </li>
              <li>
                <strong>Cancelación:</strong> solicitar la supresión
                de tus datos cuando corresponda legalmente.
              </li>
              <li>
                <strong>Oposición:</strong> oponerte a determinados
                tratamientos en los supuestos previstos por la ley.
              </li>
            </ul>

            <p className="font-body text-base text-muted mt-2">
              También podrás retirar un consentimiento cuando el
              tratamiento se base en él, sin que ello afecte la
              licitud del tratamiento realizado antes de su retirada.
              La solicitud estará sujeta a las condiciones, excepciones
              y procedimientos establecidos en la normativa aplicable.
            </p>

            <p className="font-body text-base text-muted mt-2">
              Para ejercer tus derechos, puedes escribir a{" "}
              <a
                href="mailto:gerencia@aurumlogistics.com"
                className="underline underline-offset-4"
              >
                gerencia@aurumlogistics.com
              </a>
              , indicando el derecho que deseas ejercer y proporcionando
              la información necesaria para verificar tu identidad
              de forma adecuada.
            </p>

            <p className="font-body text-base text-muted mt-2">
              Si consideras que tu solicitud no ha sido atendida
              conforme a la normativa, puedes acudir a la Autoridad
              Nacional de Protección de Datos Personales del Perú,
              de acuerdo con los procedimientos aplicables.
            </p>

            <p className="font-body text-base text-muted mt-2">
              Puedes consultar la información oficial sobre los{" "}
              <a
                href="https://www.gob.pe/9270-que-son-los-derechos-arco"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4"
              >
                derechos ARCO
              </a>{" "}
              y el procedimiento ante la{" "}
              <a
                href="https://www.gob.pe/9269-iniciar-procedimiento-para-el-ejercicio-de-derechos-de-acceso-rectificacion-cancelacion-y-oposicion"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4"
              >
                Autoridad Nacional de Protección de Datos Personales
              </a>.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-muted mb-2">
              14. Datos personales de terceros
            </h2>

            <p className="font-body text-base text-muted">
              Si proporcionas datos personales de otras personas,
              declaras que cuentas con la autorización o base legal
              necesaria para compartirlos, cuando corresponda.
              Te pedimos informar a esas personas sobre el tratamiento
              de sus datos cuando sea tu responsabilidad hacerlo.
              Aurum Logistics S.A.C. tratará dicha información para
              las finalidades legítimas relacionadas con la solicitud
              u operación correspondiente.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-muted mb-2">
              15. Enlaces a sitios de terceros
            </h2>

            <p className="font-body text-base text-muted">
              Nuestro sitio web puede incluir enlaces a plataformas
              externas. Cuando accedas a ellas, el tratamiento de
              tus datos estará sujeto a las políticas y condiciones
              de sus respectivos responsables. Te recomendamos
              consultarlas antes de proporcionar información personal.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-muted mb-2">
              16. Cambios en esta Política de Privacidad
            </h2>

            <p className="font-body text-base text-muted">
              Podemos actualizar esta política para reflejar cambios
              en nuestras operaciones, funcionalidades, proveedores
              tecnológicos o normativa aplicable. La versión vigente
              estará disponible en esta página e indicará su fecha
              de actualización. Cuando una modificación requiera
              información adicional o consentimiento, actuaremos
              conforme a la normativa correspondiente.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-muted mb-2">
              17. Contacto
            </h2>

            <p className="font-body text-base text-muted mb-2">
              Si tienes preguntas sobre esta Política de Privacidad
              o deseas ejercer tus derechos sobre tus datos personales,
              puedes comunicarte con nosotros a través de los siguientes
              medios:
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
    </main>
  );
}
