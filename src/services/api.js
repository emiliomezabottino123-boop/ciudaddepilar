/**
 * Cliente HTTP para el backend de SysVentas (CodeIgniter).
 *
 * Configurá la URL base en un archivo .env de Vite:
 *   VITE_API_URL=https://tu-servidor/sysventas/api
 */

const BASE_URL = import.meta.env.VITE_API_URL ?? "";

class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

async function request(path, { method = "GET", body, token, ...rest } = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...rest.headers,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
    ...rest,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiError(
      data?.message ?? "No pudimos completar la operación.",
      response.status,
      data,
    );
  }

  return data;
}

export const api = {
  get: (path, options) => request(path, { ...options, method: "GET" }),
  post: (path, body, options) => request(path, { ...options, method: "POST", body }),
  put: (path, body, options) => request(path, { ...options, method: "PUT", body }),
  del: (path, options) => request(path, { ...options, method: "DELETE" }),
};

/**
 * Consulta de asientos libres. Es solo lectura: la web no vende ni
 * bloquea asientos, la venta sigue en las agencias.
 *
 * Sin VITE_API_URL responde con datos de demostración
 * (src/data/servicioDemo.js) para poder ver la página.
 */
export const usandoDemo = !import.meta.env.VITE_API_URL;

const demora = (valor) =>
  new Promise((resolve) => setTimeout(() => resolve(valor), 350));

export const disponibilidadApi = {
  /** -> [{ id, origen, destino, fecha, salida, llegada, unidad, libres }] */
  servicios: async ({ origen, destino, fecha, horarios }) => {
    if (usandoDemo) {
      const { serviciosDemo } = await import("../data/servicioDemo");
      return demora(serviciosDemo({ origen, destino, fecha, horarios }));
    }
    const query = new URLSearchParams({ origen, destino, fecha });
    return api.get(`/servicios?${query}`);
  },

  /** -> { pisos: [{ numero, nombre, categoria, layout }], estados } */
  asientos: async (servicioId) => {
    if (usandoDemo) {
      const { asientosDemo } = await import("../data/servicioDemo");
      return demora(asientosDemo(servicioId));
    }
    return api.get(`/servicios/${encodeURIComponent(servicioId)}/asientos`);
  },
};

export { ApiError };
