/**
 * DATOS DE DEMOSTRACIÓN del mapa de asientos.
 *
 * Esta es la forma que tendría que devolver SysVentas en
 * `GET /servicios/:id/asientos`. Reemplazar por la respuesta real
 * no debería requerir cambios en los componentes.
 *
 * `layout` describe cada fila de la unidad. Cada posición es:
 *   - un número  -> asiento con ese número
 *   - null       -> pasillo o espacio vacío
 *
 * `estados` marca solo los asientos que NO están libres. Cualquier
 * asiento ausente de este objeto se considera disponible.
 *   ocupado    -> ya vendido
 *   bloqueado  -> otra persona lo está comprando en este momento
 *   inhabilitado -> existe físicamente pero no se vende (rueda, baño)
 */

export const servicioDemo = {
  id: "asu-pil-2026-08-25-1400",
  origen: "Asunción",
  destino: "Pilar",
  fecha: "2026-08-25",
  salida: "14:00",
  llegada: "18:30",
  unidad: "Marcopolo 7112",
  moneda: "Gs.",

  pisos: [
    {
      numero: 1,
      nombre: "Piso inferior",
      categoria: "Cama",
      precio: 145000,
      // Configuración 1 + 2: pasillo en el medio
      layout: [
        [1, null, 2, 3],
        [4, null, 5, 6],
        [7, null, 8, 9],
        [10, null, 11, 12],
      ],
    },
    {
      numero: 2,
      nombre: "Piso superior",
      categoria: "Semi cama",
      precio: 120000,
      // Configuración 2 + 2
      layout: [
        [13, 14, null, 15, 16],
        [17, 18, null, 19, 20],
        [21, 22, null, 23, 24],
        [25, 26, null, 27, 28],
        [29, 30, null, 31, 32],
        [33, 34, null, 35, 36],
        [37, 38, null, 39, 40],
        [41, 42, null, 43, 44],
        [45, 46, null, 47, 48],
        [49, 50, null, 51, 52],
        [53, 54, null, 55, 56],
      ],
    },
  ],

  estados: {
    2: "ocupado",
    3: "ocupado",
    7: "ocupado",
    11: "bloqueado",
    14: "ocupado",
    15: "ocupado",
    16: "ocupado",
    22: "ocupado",
    27: "bloqueado",
    31: "ocupado",
    32: "ocupado",
    38: "ocupado",
    43: "ocupado",
    44: "ocupado",
    49: "ocupado",
    50: "ocupado",
    54: "ocupado",
  },
};

/* ------------------------------------------------------------------ */
/* Respuestas simuladas de la API de disponibilidad.                   */
/* Se usan solo mientras no haya VITE_API_URL (ver services/api.js).   */
/* ------------------------------------------------------------------ */

/** Duración del viaje en el demo, para calcular la llegada. */
const DURACION_MINUTOS = 4 * 60 + 30;

function sumarMinutos(hora, minutos) {
  const [h, m] = hora.split(":").map(Number);
  const total = (h * 60 + m + minutos) % (24 * 60);
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

/** Número pseudoaleatorio estable a partir de un texto (mismo id, mismos asientos). */
function semilla(texto) {
  let hash = 2166136261;
  for (const letra of texto) {
    hash = Math.imul(hash ^ letra.charCodeAt(0), 16777619);
  }
  return () => {
    hash = Math.imul(hash ^ (hash >>> 15), 2246822507);
    hash = Math.imul(hash ^ (hash >>> 13), 3266489909);
    return ((hash ^= hash >>> 16) >>> 0) / 4294967296;
  };
}

function estadosDemo(id) {
  const azar = semilla(id);
  const ocupacion = 0.25 + azar() * 0.5;
  const estados = {};
  servicioDemo.pisos
    .flatMap((p) => p.layout.flat().filter(Boolean))
    .forEach((numero) => {
      const r = azar();
      if (r < ocupacion) estados[numero] = "ocupado";
      else if (r < ocupacion + 0.04) estados[numero] = "bloqueado";
    });
  return estados;
}

function libresDe(estados) {
  return servicioDemo.pisos
    .flatMap((p) => p.layout.flat().filter(Boolean))
    .filter((n) => !estados[n]).length;
}

/** Simula `GET /servicios?origen=&destino=&fecha=`. */
export function serviciosDemo({ origen, destino, fecha, horarios }) {
  return horarios.map((salida) => {
    const id = `${origen}-${destino}-${fecha}-${salida.replace(":", "")}`;
    return {
      id,
      origen,
      destino,
      fecha,
      salida,
      llegada: sumarMinutos(salida, DURACION_MINUTOS),
      unidad: servicioDemo.unidad,
      libres: libresDe(estadosDemo(id)),
    };
  });
}

/** Simula `GET /servicios/:id/asientos`. */
export function asientosDemo(id) {
  return { pisos: servicioDemo.pisos, estados: estadosDemo(id) };
}
