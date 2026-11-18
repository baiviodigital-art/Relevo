/**
 * BORRADORES de textos legales. Pendientes de revisión por un profesional.
 * Los datos identificativos aparecen como [PENDIENTE] porque la sociedad no está constituida:
 * no se inventan datos fiscales ni registrales.
 */
export interface LegalDoc {
  slug: string;
  title: string;
  sections: { h: string; p: string[] }[];
}

const P = "[PENDIENTE]";

export const legalDocs: LegalDoc[] = [
  {
    slug: "aviso-legal",
    title: "Aviso legal",
    sections: [
      {
        h: "1. Titular del sitio web",
        p: [
          `Denominación social: ${P}. NIF: ${P}. Domicilio: ${P}, Islas Canarias. Datos registrales: ${P}. Email de contacto: ${P}.`,
          "En cumplimiento de la Ley 34/2002, de servicios de la sociedad de la información y de comercio electrónico (LSSI-CE).",
        ],
      },
      {
        h: "2. Objeto",
        p: [
          "Relevo es una plataforma de contratación y coordinación de servicios para viviendas vacacionales en Canarias. Relevo no comercializa ni intermedia en el alquiler de alojamientos turísticos.",
        ],
      },
      { h: "3. Propiedad intelectual", p: ["Los contenidos, marca y diseño del sitio pertenecen a su titular o se usan con autorización. Queda prohibida su reproducción sin permiso."] },
      { h: "4. Responsabilidad", p: ["El titular no se responsabiliza del uso indebido del sitio ni de los contenidos de sitios de terceros enlazados."] },
      { h: "5. Legislación aplicable", p: ["Legislación española. Para cualquier controversia, los juzgados y tribunales que correspondan conforme a la normativa de consumidores."] },
    ],
  },
  {
    slug: "privacidad",
    title: "Política de privacidad",
    sections: [
      { h: "1. Responsable del tratamiento", p: [`${P} (ver Aviso legal). Contacto para protección de datos: ${P}.`] },
      {
        h: "2. Datos que tratamos y finalidad",
        p: [
          "Formulario de contacto: nombre, email, teléfono (opcional), tipo de cliente y mensaje, para responder a tu consulta.",
          "Formulario de profesionales: datos de contacto, especialidad, experiencia, zona y disponibilidad, para valorar una posible colaboración.",
          "Contratación (cuando esté disponible): datos de la vivienda y del servicio, para prestarlo y facturarlo.",
        ],
      },
      { h: "3. Base jurídica", p: ["Consentimiento (formularios), ejecución de contrato (servicios contratados) y obligaciones legales (facturación)."] },
      {
        h: "4. Destinatarios y encargados",
        p: [
          "Proveedores tecnológicos que actúan como encargados del tratamiento: alojamiento web (Vercel), envío de correo (Resend) y, cuando se active, base de datos (Supabase) y pagos (Stripe). Relevo no almacena datos de tarjetas.",
          "Algunos proveedores pueden tratar datos fuera del Espacio Económico Europeo con las garantías previstas en el RGPD. [PENDIENTE: detallar].",
        ],
      },
      { h: "5. Conservación", p: ["Mientras sea necesaria para la finalidad y, después, durante los plazos legales. [PENDIENTE: concretar plazos]."] },
      { h: "6. Derechos", p: ["Acceso, rectificación, supresión, oposición, limitación y portabilidad, escribiendo al contacto del responsable. Puedes reclamar ante la Agencia Española de Protección de Datos."] },
    ],
  },
  {
    slug: "cookies",
    title: "Política de cookies",
    sections: [
      {
        h: "1. Qué usamos hoy",
        p: [
          "El sitio no instala cookies de analítica ni de publicidad. Se usa almacenamiento local del navegador (localStorage) solo para recordar el contenido del carrito, una función técnica necesaria.",
        ],
      },
      { h: "2. Cambios", p: ["Si en el futuro se incorporan cookies no técnicas, se pedirá tu consentimiento previo mediante un panel de configuración."] },
    ],
  },
  {
    slug: "condiciones",
    title: "Condiciones de contratación",
    sections: [
      { h: "1. Prestador", p: [`${P} (ver Aviso legal).`] },
      {
        h: "2. Proceso",
        p: [
          "El cliente selecciona un servicio, configura los datos de la vivienda, elige fecha y franja (fecha solicitada) y paga. La fecha pasa a confirmada cuando un profesional disponible la acepta.",
          "Si no puede confirmarse la fecha, se ofrecerá una alternativa o el reembolso conforme a la política de cancelación.",
        ],
      },
      {
        h: "3. Precios e impuestos",
        p: [
          "Los precios se muestran en euros. En Canarias se aplica el IGIC (Impuesto General Indirecto Canario) en lugar del IVA cuando proceda; el tipo aplicable se indicará en cada servicio. [PENDIENTE: validar con asesoría fiscal].",
          "Los precios que aparecen actualmente en la web son de demostración y no constituyen oferta vinculante.",
        ],
      },
      { h: "4. Pago", p: ["Mediante pasarela segura (Stripe). Relevo no almacena datos de tarjeta."] },
      { h: "5. Derecho de desistimiento", p: ["[PENDIENTE: revisar aplicación del art. 103 TRLGDCU a servicios con fecha concreta]."] },
      { h: "6. Incidencias y reclamaciones", p: ["Las incidencias se registran desde el pedido. Hojas de reclamaciones disponibles a petición. [PENDIENTE: procedimiento]."] },
    ],
  },
  {
    slug: "cancelacion",
    title: "Política de cancelación y reembolsos",
    sections: [
      { h: "1. Cancelación por el cliente", p: ["[PENDIENTE: definir plazos de antelación y porcentaje de reembolso]."] },
      { h: "2. Cancelación por Relevo", p: ["Si no se puede confirmar o prestar un servicio, se reembolsará íntegramente el importe pagado por ese servicio."] },
      { h: "3. Servicios no conformes", p: ["Si el servicio no se ajusta a lo contratado, se registrará una incidencia y se ofrecerá repetición o reembolso parcial según el caso. [PENDIENTE: concretar]."] },
      { h: "4. Plazo de reembolso", p: ["Los reembolsos se tramitan por el mismo medio de pago. [PENDIENTE: plazo]."] },
    ],
  },
];

export const getLegal = (slug: string) => legalDocs.find((d) => d.slug === slug);
