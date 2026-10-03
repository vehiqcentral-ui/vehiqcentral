import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politica de Privacidad | VEHIQ',
  description: 'Politica de privacidad de VEHIQ conforme al RGPD y la LOPDGDD. Informacion sobre el tratamiento de datos personales.',
};

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-brand-alt-bg py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-brand-navy leading-tight">
              Politica de Privacidad
            </h1>
            <p className="mt-4 text-xl text-brand-muted leading-relaxed">
              Ultima actualizacion: 1 de septiembre de 2025
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose prose-brand">
          <h2 className="font-heading font-extrabold text-2xl text-brand-navy">1. Responsable del tratamiento</h2>
          <p className="text-brand-body leading-relaxed">VEHIQ Technologies S.L., con CIF B-12345678 y domicilio social en Calle de Serrano 45, 28001 Madrid, Espana, es el responsable del tratamiento de los datos personales recogidos a traves de esta plataforma, conforme al Reglamento General de Proteccion de Datos (RGPD) y la Ley Organica 3/2018 de Proteccion de Datos Personales y garantia de los derechos digitales (LOPDGDD).</p>

          <h2 className="mt-10 font-heading font-extrabold text-2xl text-brand-navy">2. Datos que recopilamos</h2>
          <p className="text-brand-body leading-relaxed">Recopilamos los datos personales que nos proporcionas al registrarte, utilizar nuestros servicios o ponerte en contacto con nosotros: nombre, apellidos, direccion de correo electronico, telefono, datos de empresa, cargo profesional y datos de uso de la plataforma.</p>

          <h2 className="mt-10 font-heading font-extrabold text-2xl text-brand-navy">3. Finalidad del tratamiento</h2>
          <p className="text-brand-body leading-relaxed">Tratamos tus datos con las siguientes finalidades: prestacion de los servicios contratados, gestion de la relacion comercial, envio de comunicaciones comerciales (con tu consentimiento), mejora de nuestros productos y cumplimiento de obligaciones legales.</p>

          <h2 className="mt-10 font-heading font-extrabold text-2xl text-brand-navy">4. Base juridica</h2>
          <p className="text-brand-body leading-relaxed">El tratamiento se basa en la ejecucion del contrato de servicios, el consentimiento del interesado para comunicaciones comerciales, el interes legitimo del responsable para la mejora del servicio y el cumplimiento de obligaciones legales aplicables.</p>

          <h2 className="mt-10 font-heading font-extrabold text-2xl text-brand-navy">5. Destinatarios de los datos</h2>
          <p className="text-brand-body leading-relaxed">No cedemos tus datos a terceros salvo obligacion legal. Utilizamos proveedores de servicios (hosting, email, analitica) que actuan como encargados del tratamiento con contratos de proteccion de datos. Todos los datos se almacenan en servidores dentro de la Union Europea.</p>

          <h2 className="mt-10 font-heading font-extrabold text-2xl text-brand-navy">6. Derechos del interesado</h2>
          <p className="text-brand-body leading-relaxed">Puedes ejercer tus derechos de acceso, rectificacion, supresion, oposicion, limitacion del tratamiento y portabilidad escribiendo a privacidad@vehiq.es, adjuntando copia de tu DNI. Tambien puedes presentar una reclamacion ante la Agencia Espanola de Proteccion de Datos (AEPD).</p>

          <h2 className="mt-10 font-heading font-extrabold text-2xl text-brand-navy">7. Conservacion de datos</h2>
          <p className="text-brand-body leading-relaxed">Conservamos tus datos durante la vigencia de la relacion contractual y, una vez finalizada, durante los plazos legalmente establecidos para atender posibles responsabilidades. Los datos de prospeccion comercial se conservan hasta que solicites su supresion.</p>

          <h2 className="mt-10 font-heading font-extrabold text-2xl text-brand-navy">8. Contacto</h2>
          <p className="text-brand-body leading-relaxed">Para cualquier consulta relacionada con la privacidad, puedes escribirnos a privacidad@vehiq.es o dirigirte a nuestro Delegado de Proteccion de Datos en la direccion postal indicada.</p>
        </div>
      </section>
    </>
  );
}
