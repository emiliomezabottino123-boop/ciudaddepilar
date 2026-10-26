/**
 * Contenido institucional centralizado.
 * Datos tomados de las historias de Instagram de la empresa (agosto 2026).
 * Editá este archivo para actualizar textos, contactos u horarios
 * sin tocar los componentes.
 */

export const empresa = {
  nombre: "Ciudad de Pilar",
  nombreCompleto: "Empresa de Transporte Ciudad de Pilar",
  bajada: "Empresa de Transporte",
  eslogan: "Salidas diarias para tu mejor comodidad",
  pais: "Paraguay",
  // TODO: completar con el usuario exacto de Instagram (aparece cortado
  // como "ciudaddepilar_…" en las historias) y el email institucional.
  instagram: "https://www.instagram.com/",
  email: "",
};

/** Ítems del menú principal. */
export const navLinks = [
  { to: "/", label: "Inicio" },
  { to: "/quienes-somos", label: "Quiénes somos" },
  { to: "/servicios", label: "Servicios" },
  { to: "/horarios", label: "Horarios" },
  { to: "/disponibilidad", label: "Asientos" },
  { to: "/contactos", label: "Contactos" },
];

/**
 * Salidas diarias por trayecto.
 * Fuente: historia "Horarios de salidas".
 */
export const salidas = [
  {
    id: "asuncion-pilar",
    origen: "Asunción",
    destino: "Pilar",
    horarios: ["14:00", "18:00", "20:50"],
  },
  {
    id: "pilar-asuncion",
    origen: "Pilar",
    destino: "Asunción",
    horarios: ["08:00", "13:00", "01:15"],
  },
];

/**
 * Agencias, teléfonos y horarios de atención.
 * `pasajes` y `encomiendas` son opcionales: si una agencia no ofrece
 * el servicio, se omite la propiedad.
 * Todos los celulares tienen WhatsApp: `tel` se usa para armar el
 * enlace wa.me con el helper `waLink()`.
 */
export const agencias = [
  {
    id: "asuncion",
    ciudad: "Asunción",
    // TODO: confirmar el número de local dentro de la terminal.
    direccion: "Terminal de Ómnibus de Asunción",
    pasajes: {
      telefono: "(0984) 508 587",
      tel: "+595984508587",
      horarios: [
        { dias: "Lunes a viernes", horas: "07:00 a 20:50 h" },
        { dias: "Sábados y domingos", horas: "09:00 a 20:50 h" },
      ],
    },
    encomiendas: {
      telefono: "(0982) 365 684",
      tel: "+595982365684",
      horarios: [
        { dias: "Lunes a viernes", horas: "07:00 a 18:00 h" },
        { dias: "Sábados", horas: "07:00 a 12:00 h" },
      ],
    },
  },
  {
    id: "nemby",
    ciudad: "Ñemby",
    direccion:
      "Ruta PY01 – Acceso Sur esq. Tte. Peralta (a pasos del Supermercado Gran Vía)",
    pasajes: {
      telefono: "(0986) 898 730",
      tel: "+595986898730",
      horarios: [{ dias: "Lunes a sábados", horas: "07:00 a 20:50 h" }],
    },
  },
  {
    id: "pilar",
    ciudad: "Pilar",
    // TODO: confirmar la dirección exacta de la agencia de Pilar.
    direccion: "Terminal de Ómnibus de Pilar, Ñeembucú",
    pasajes: {
      telefono: "(0975) 624 500",
      tel: "+595975624500",
      horarios: [{ dias: "Lunes a domingos", horas: "06:00 a 01:15 h" }],
    },
    encomiendas: {
      telefono: "(0975) 624 500",
      tel: "+595975624500",
      horarios: [
        { dias: "Lunes a sábados", horas: "07:00 a 12:00 h" },
        { dias: "Lunes a sábados", horas: "15:00 a 19:00 h" },
      ],
    },
  },
];

/**
 * Arma el enlace de WhatsApp a partir de un número internacional.
 * "+595984508587" -> "https://wa.me/595984508587"
 */
export const waLink = (tel) => `https://wa.me/${tel.replace(/\D/g, "")}`;

/** Teléfono de referencia para los CTA rápidos del sitio. */
export const telefonoPrincipal = agencias.find((a) => a.id === "pilar").pasajes;

/** Métricas del hero / franja de confianza. */
export const destacados = [
  { valor: "3", etiqueta: "Agencias: Asunción, Ñemby y Pilar" },
  { valor: "6", etiqueta: "Salidas diarias" },
  { valor: "Lun a Dom", etiqueta: "Atención en Pilar" },
];

/** Servicios resumidos para la home (la página completa los amplía). */
export const servicios = [
  {
    id: "pasajes",
    titulo: "Pasajes",
    descripcion:
      "Venta de pasajes en nuestras agencias de Asunción, Ñemby y Pilar, con salidas diarias en ambos sentidos.",
    icono: "🎟️",
  },
  {
    id: "encomiendas",
    titulo: "Encomiendas",
    descripcion:
      "Envío de encomiendas entre Asunción y Pilar, con agencias dedicadas y horarios extendidos.",
    icono: "📦",
  },
  {
    id: "larga-distancia",
    titulo: "Viajes de larga distancia",
    descripcion:
      "Unidades cómodas para el trayecto Asunción – Pilar, cubriendo el recorrido todos los días del año.",
    icono: "🚌",
  },
];
