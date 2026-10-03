import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terminos y Condiciones | VEHIQ',
  description: 'Terminos y condiciones de uso de la plataforma VEHIQ. Condiciones generales de contratacion de servicios.',
};

export default function TermsPage() {
  return (
    <>
      <section className="bg-brand-alt-bg py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-brand-navy leading-tight">
              Terminos y Condiciones
            </h1>
            <p className="mt-4 text-xl text-brand-muted leading-relaxed">
              Ultima actualizacion: 1 de septiembre de 2025
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose prose-brand">
          <h2 className="font-heading font-extrabold text-2xl text-brand-navy">1. Identificacion del prestador</h2>
          <p className="text-brand-body leading-relaxed">VEHIQ Technologies S.L., con CIF B-12345678, domicilio en Calle de Serrano 45, 28001 Madrid, Espana, e inscrita en el Registro Mercantil de Madrid. Email de contacto: legal@vehiq.es.</p>

          <h2 className="mt-10 font-heading font-extrabold text-2xl text-brand-navy">2. Objeto y ambito de aplicacion</h2>
          <p className="text-brand-body leading-relaxed">Los presentes Terminos y Condiciones regulan el acceso y uso de la plataforma VEHIQ, asi como la contratacion de los servicios ofrecidos a traves de la misma. El acceso y uso de la plataforma implica la aceptacion integra de estos terminos.</p>

          <h2 className="mt-10 font-heading font-extrabold text-2xl text-brand-navy">3. Registro y cuenta de usuario</h2>
          <p className="text-brand-body leading-relaxed">Para utilizar los servicios de VEHIQ es necesario crear una cuenta de usuario proporcionando datos veraces y actualizados. El usuario es responsable de la confidencialidad de sus credenciales de acceso y de toda la actividad realizada bajo su cuenta.</p>

          <h2 className="mt-10 font-heading font-extrabold text-2xl text-brand-navy">4. Servicios y funcionalidades</h2>
          <p className="text-brand-body leading-relaxed">VEHIQ ofrece servicios de gestion automotriz incluyendo, sin limitacion: gestion de inventario, publicacion en portales, valoraciones, tramites de importacion y exportacion, consultas DGT, mantenimiento y API de datos. Las funcionalidades disponibles dependen del plan contratado.</p>

          <h2 className="mt-10 font-heading font-extrabold text-2xl text-brand-navy">5. Precios y facturacion</h2>
          <p className="text-brand-body leading-relaxed">Los precios de los servicios se indican en la propuesta comercial o en la pagina de planes. Todos los precios se expresan en euros e incluyen el IVA cuando asi se indique. La facturacion se realiza con periodicidad mensual o anual segun el plan contratado.</p>

          <h2 className="mt-10 font-heading font-extrabold text-2xl text-brand-navy">6. Propiedad intelectual</h2>
          <p className="text-brand-body leading-relaxed">Todos los contenidos de la plataforma, incluyendo textos, graficos, logotipos, software y bases de datos, son propiedad de VEHIQ Technologies S.L. o de sus licenciantes. Queda prohibida su reproduccion, distribucion o transformacion sin autorizacion expresa.</p>

          <h2 className="mt-10 font-heading font-extrabold text-2xl text-brand-navy">7. Limitacion de responsabilidad</h2>
          <p className="text-brand-body leading-relaxed">VEHIQ no sera responsable de los danos derivados del uso incorrecto de la plataforma, interrupciones del servicio por causas ajenas a su control, ni de la exactitud absoluta de los datos de terceros integrados en la plataforma. VEHIQ se compromete a aplicar las medidas tecnicas razonables para garantizar la disponibilidad y seguridad del servicio.</p>

          <h2 className="mt-10 font-heading font-extrabold text-2xl text-brand-navy">8. Legislacion aplicable y jurisdiccion</h2>
          <p className="text-brand-body leading-relaxed">Estos terminos se rigen por la legislacion espanola. Para cualquier controversia, las partes se someten a los Juzgados y Tribunales de la ciudad de Madrid, salvo que la normativa aplicable disponga otra cosa.</p>
        </div>
      </section>
    </>
  );
}
