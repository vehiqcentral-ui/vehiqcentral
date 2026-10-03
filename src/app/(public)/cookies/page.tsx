import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politica de Cookies | VEHIQ',
  description: 'Politica de cookies de VEHIQ conforme a la normativa europea. Informacion sobre el uso de cookies y tecnologias similares.',
};

export default function CookiesPage() {
  return (
    <>
      <section className="bg-brand-alt-bg py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-brand-navy leading-tight">
              Politica de Cookies
            </h1>
            <p className="mt-4 text-xl text-brand-muted leading-relaxed">
              Ultima actualizacion: 1 de septiembre de 2025
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose prose-brand">
          <h2 className="font-heading font-extrabold text-2xl text-brand-navy">1. Que son las cookies</h2>
          <p className="text-brand-body leading-relaxed">Las cookies son pequenos archivos de texto que los sitios web almacenan en el dispositivo del usuario al visitarlos. Permiten recordar preferencias, mejorar la experiencia de navegacion y analizar el uso del sitio. Esta politica cumple con la Directiva 2002/58/CE (Directiva ePrivacy), el RGPD y la Ley 34/2002, de 11 de julio, de servicios de la sociedad de la informacion (LSSI-CE).</p>

          <h2 className="mt-10 font-heading font-extrabold text-2xl text-brand-navy">2. Cookies que utilizamos</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm text-brand-body border border-brand-border">
              <thead>
                <tr className="bg-brand-alt-bg">
                  <th className="text-left p-3 font-heading font-bold text-brand-navy border-b border-brand-border">Cookie</th>
                  <th className="text-left p-3 font-heading font-bold text-brand-navy border-b border-brand-border">Tipo</th>
                  <th className="text-left p-3 font-heading font-bold text-brand-navy border-b border-brand-border">Duracion</th>
                  <th className="text-left p-3 font-heading font-bold text-brand-navy border-b border-brand-border">Finalidad</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-brand-border">
                  <td className="p-3">vehiq_session</td>
                  <td className="p-3">Tecnica</td>
                  <td className="p-3">Sesion</td>
                  <td className="p-3">Mantener la sesion del usuario autenticado.</td>
                </tr>
                <tr className="border-b border-brand-border">
                  <td className="p-3">vehiq_preferences</td>
                  <td className="p-3">Funcional</td>
                  <td className="p-3">1 ano</td>
                  <td className="p-3">Recordar preferencias de idioma y configuracion.</td>
                </tr>
                <tr className="border-b border-brand-border">
                  <td className="p-3">_ga, _gid</td>
                  <td className="p-3">Analitica</td>
                  <td className="p-3">2 anos / 24h</td>
                  <td className="p-3">Google Analytics: analisis de trafico y uso del sitio.</td>
                </tr>
                <tr>
                  <td className="p-3">vehiq_consent</td>
                  <td className="p-3">Tecnica</td>
                  <td className="p-3">1 ano</td>
                  <td className="p-3">Registrar las preferencias de cookies del usuario.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="mt-10 font-heading font-extrabold text-2xl text-brand-navy">3. Base juridica</h2>
          <p className="text-brand-body leading-relaxed">Las cookies tecnicas y funcionales se instalan sobre la base del interes legitimo del prestador, ya que son necesarias para el funcionamiento del sitio. Las cookies analiticas y de marketing requieren el consentimiento previo del usuario, que se recoge a traves del banner de cookies.</p>

          <h2 className="mt-10 font-heading font-extrabold text-2xl text-brand-navy">4. Como gestionar las cookies</h2>
          <p className="text-brand-body leading-relaxed">Puedes configurar tus preferencias de cookies en cualquier momento a traves de nuestro panel de configuracion de cookies. Tambien puedes gestionar las cookies directamente desde la configuracion de tu navegador. Ten en cuenta que bloquear ciertas cookies puede afectar a la funcionalidad de la plataforma.</p>

          <h2 className="mt-10 font-heading font-extrabold text-2xl text-brand-navy">5. Actualizaciones</h2>
          <p className="text-brand-body leading-relaxed">Esta politica de cookies puede actualizarse periodicamente. Te notificaremos cualquier cambio relevante a traves de la plataforma o por email. La fecha de la ultima actualizacion se indica al inicio de este documento.</p>

          <h2 className="mt-10 font-heading font-extrabold text-2xl text-brand-navy">6. Contacto</h2>
          <p className="text-brand-body leading-relaxed">Para cualquier consulta sobre nuestra politica de cookies, puedes escribirnos a privacidad@vehiq.es o dirigirte a nuestro Delegado de Proteccion de Datos en Calle de Serrano 45, 28001 Madrid.</p>
        </div>
      </section>
    </>
  );
}
