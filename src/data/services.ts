/**
 * Catálogo de Relevo.
 *
 * IMPORTANTE
 * - Los precios son de DEMOSTRACIÓN. No son tarifas comerciales y se muestran siempre etiquetados.
 * - `enabled` permite activar o desactivar servicios según la capacidad operativa real.
 * - `availability` describe el estado comercial; no existe todavía cobertura confirmada en ninguna zona.
 * En la fase 3 estos datos se moverán a Supabase (tabla `services`) y el precio se validará en servidor.
 */

export type Scene =
  | "villa"
  | "apartment"
  | "tools"
  | "keys"
  | "linen"
  | "supplies"
  | "pool"
  | "pack";

export type CategorySlug =
  | "limpieza"
  | "mantenimiento"
  | "check-in-check-out"
  | "lavanderia"
  | "reposicion"
  | "piscina-jardineria"
  | "packs";

export type Availability = "piloto" | "en-estudio";

export interface Category {
  slug: CategorySlug;
  number: string;
  name: string;
  short: string;
  description: string;
  scene: Scene;
}

export interface Service {
  slug: string;
  category: CategorySlug;
  name: string;
  summary: string;
  includes: string[];
  excludes: string[];
  /** Precio orientativo de demostración, IGIC no incluido. */
  demoFrom: number;
  unit: "servicio" | "hora" | "visita" | "kit";
  availability: Availability;
  enabled: boolean;
}

export const categories: Category[] = [
  {
    slug: "limpieza",
    number: "01",
    name: "Limpieza",
    short: "Entre reservas, profunda y exteriores.",
    description:
      "La vivienda lista para la siguiente llegada: limpieza entre reservas, limpiezas a fondo y zonas exteriores, con fotos al terminar.",
    scene: "apartment",
  },
  {
    slug: "mantenimiento",
    number: "02",
    name: "Mantenimiento",
    short: "Fontanería, electricidad y reparaciones.",
    description:
      "Pequeñas averías y revisiones preventivas antes de que se conviertan en una mala reseña.",
    scene: "tools",
  },
  {
    slug: "check-in-check-out",
    number: "03",
    name: "Check-in y check-out",
    short: "Recepción, llaves y revisión de salida.",
    description:
      "Alguien que reciba a tus huéspedes, entregue las llaves y revise la vivienda a la salida cuando tú no puedes estar.",
    scene: "keys",
  },
  {
    slug: "lavanderia",
    number: "04",
    name: "Lavandería",
    short: "Ropa de cama, toallas y textiles.",
    description: "Lavado y cambio de textiles coordinado con cada limpieza.",
    scene: "linen",
  },
  {
    slug: "reposicion",
    number: "05",
    name: "Reposición",
    short: "Kits de bienvenida y consumibles.",
    description: "Higiene, consumibles y kits de bienvenida repuestos antes de cada estancia.",
    scene: "supplies",
  },
  {
    slug: "piscina-jardineria",
    number: "06",
    name: "Piscina y jardinería",
    short: "Piscinas, jardines y terrazas.",
    description: "Para villas y casas con zonas exteriores que necesitan más de un oficio.",
    scene: "pool",
  },
  {
    slug: "packs",
    number: "07",
    name: "Packs combinados",
    short: "Varios servicios, una sola reserva.",
    description: "Combinaciones pensadas para el cambio de huésped y la preparación completa.",
    scene: "pack",
  },
];

const s = (
  slug: string,
  category: CategorySlug,
  name: string,
  summary: string,
  demoFrom: number,
  unit: Service["unit"],
  includes: string[],
  excludes: string[],
  availability: Availability = "en-estudio",
): Service => ({ slug, category, name, summary, demoFrom, unit, includes, excludes, availability, enabled: true });

export const services: Service[] = [
  // Limpieza
  s("limpieza-entre-reservas", "limpieza", "Limpieza entre reservas", "Limpieza completa de la vivienda entre la salida y la llegada de huéspedes.", 45, "servicio",
    ["Limpieza de estancias, cocina y baños", "Retirada de basura", "Revisión visual de desperfectos", "Fotos al terminar"],
    ["Lavado de textiles (ver Lavandería)", "Limpieza de cristales exteriores en altura"], "piloto"),
  s("limpieza-profunda", "limpieza", "Limpieza profunda", "Limpieza a fondo periódica: electrodomésticos, juntas, armarios y rincones.", 90, "servicio",
    ["Interior de electrodomésticos", "Armarios y cajones", "Desincrustado de baños", "Fotos antes y después"],
    ["Tratamientos de tapicería", "Pulido de suelos"]),
  s("limpieza-exteriores", "limpieza", "Limpieza de zonas exteriores", "Terrazas, balcones y mobiliario exterior.", 35, "servicio",
    ["Barrido y fregado de terrazas", "Limpieza de mobiliario exterior", "Retirada de restos"],
    ["Mantenimiento de piscina", "Poda"]),
  // Mantenimiento
  s("fontaneria", "mantenimiento", "Fontanería", "Fugas, grifos, cisternas y desatascos sencillos.", 40, "hora",
    ["Diagnóstico", "Reparación de averías menores", "Informe con fotos"], ["Materiales (se presupuestan aparte)", "Obras"]),
  s("electricidad", "mantenimiento", "Electricidad", "Enchufes, iluminación y pequeñas averías eléctricas.", 40, "hora",
    ["Diagnóstico", "Sustitución de mecanismos y luminarias", "Informe con fotos"], ["Materiales", "Boletines e instalaciones nuevas"]),
  s("pequenas-reparaciones", "mantenimiento", "Pequeñas reparaciones", "Persianas, puertas, muebles y ajustes varios.", 35, "hora",
    ["Ajustes y sustituciones menores", "Montaje sencillo"], ["Carpintería a medida", "Obras"]),
  s("mantenimiento-preventivo", "mantenimiento", "Mantenimiento preventivo", "Revisión periódica con checklist para anticipar averías.", 60, "visita",
    ["Checklist de instalaciones", "Prueba de electrodomésticos", "Informe con prioridades"], ["Reparaciones detectadas (se presupuestan)"]),
  // Check-in
  s("recepcion-huespedes", "check-in-check-out", "Recepción de huéspedes", "Bienvenida presencial y explicación básica de la vivienda.", 25, "servicio",
    ["Recepción en la vivienda", "Entrega de llaves", "Explicación de normas"], ["Registro de viajeros ante las autoridades"]),
  s("entrega-llaves", "check-in-check-out", "Entrega de llaves", "Entrega o recogida de llaves en franja acordada.", 15, "servicio",
    ["Entrega o recogida en la vivienda"], ["Esperas fuera de la franja contratada"]),
  s("revision-salida", "check-in-check-out", "Revisión de salida", "Inspección tras la salida con registro fotográfico.", 20, "servicio",
    ["Checklist de inventario", "Fotos de estado", "Aviso de incidencias"], ["Reclamaciones ante plataformas de reserva"]),
  // Lavandería
  s("lavado-ropa-cama", "lavanderia", "Lavado de ropa de cama", "Lavado, secado y planchado de juegos de cama.", 12, "kit",
    ["Recogida y entrega", "Lavado y planchado"], ["Reposición de textiles dañados"]),
  s("lavado-toallas", "lavanderia", "Lavado de toallas", "Lavado y secado de toallas de baño y piscina.", 8, "kit",
    ["Recogida y entrega", "Lavado y secado"], ["Textiles del propietario no identificados"]),
  s("cambio-textiles", "lavanderia", "Cambio de textiles", "Cambio de ropa de cama y toallas en la vivienda.", 15, "servicio",
    ["Retirada de textiles usados", "Colocación de textiles limpios"], ["Lavado (ver servicios de lavado)"]),
  // Reposición
  s("kit-bienvenida", "reposicion", "Kit de bienvenida", "Detalle de llegada para huéspedes.", 18, "kit",
    ["Productos de bienvenida", "Colocación en la vivienda"], ["Productos personalizados de marca"]),
  s("productos-higiene", "reposicion", "Productos de higiene", "Gel, champú, papel y básicos de baño.", 10, "kit",
    ["Reposición de básicos de baño"], ["Productos cosméticos premium"]),
  s("consumibles", "reposicion", "Consumibles", "Café, bolsas, detergente y básicos de cocina.", 12, "kit",
    ["Reposición de básicos de cocina y limpieza"], ["Compra de alimentos"]),
  // Piscina y jardinería
  s("mantenimiento-piscina", "piscina-jardineria", "Mantenimiento de piscinas", "Limpieza y control del agua.", 50, "visita",
    ["Limpieza de vaso y skimmer", "Control de pH y cloro"], ["Reparación de depuradora", "Productos químicos (aparte)"]),
  s("jardineria", "piscina-jardineria", "Jardinería", "Riego, poda ligera y limpieza de jardín.", 35, "hora",
    ["Poda ligera", "Retirada de restos", "Revisión de riego"], ["Talas", "Diseño de jardines"]),
  s("mantenimiento-terrazas", "piscina-jardineria", "Mantenimiento de terrazas", "Revisión de mobiliario, toldos y cerramientos exteriores.", 40, "visita",
    ["Revisión de mobiliario y toldos", "Limpieza", "Informe"], ["Sustitución de toldos"]),
  // Packs
  s("pack-cambio-huesped", "packs", "Pack cambio de huésped", "Limpieza, cambio de ropa de cama, reposición, revisión y fotos en una sola reserva.", 75, "servicio",
    ["Limpieza entre reservas", "Cambio de ropa de cama", "Reposición de básicos", "Revisión general", "Evidencias fotográficas"],
    ["Reparaciones", "Lavado externo de textiles (opcional)"], "piloto"),
  s("pack-preparacion-integral", "packs", "Pack preparación integral", "Puesta a punto completa antes de temporada o de la primera reserva.", 180, "servicio",
    ["Limpieza profunda", "Mantenimiento preventivo", "Reposición completa", "Informe fotográfico"], ["Reparaciones mayores"]),
  s("pack-mantenimiento-preventivo", "packs", "Pack mantenimiento preventivo", "Visitas periódicas de revisión con informe.", 110, "visita",
    ["Revisión de instalaciones", "Exteriores y terrazas", "Informe con prioridades"], ["Reparaciones detectadas"]),
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getService = (slug: string) => services.find((x) => x.slug === slug && x.enabled);
export const servicesByCategory = (slug: CategorySlug) => services.filter((x) => x.category === slug && x.enabled);

export const availabilityLabel: Record<Availability, string> = {
  piloto: "Previsto para el piloto",
  "en-estudio": "En estudio",
};

export const formatEUR = (n: number) =>
  new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
