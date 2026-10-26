import { useEffect, useState } from "react";
import PageHeader from "../components/layout/PageHeader";
import Section from "../components/ui/Section";
import PhonePill from "../components/ui/PhonePill";
import SeatMap from "../components/reservas/SeatMap";
import SeatLegend from "../components/reservas/SeatLegend";
import { agencias, salidas } from "../data/site";
import { disponibilidadApi, usandoDemo } from "../services/api";
import "./Disponibilidad.css";

/** Cada cuánto se vuelve a consultar el mapa, para ver ventas del mostrador. */
const REFRESCO_MS = 30_000;

/** "Asunción" -> "asuncion", para la consulta a la API. */
const slug = (texto) =>
  texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();

const hoy = () => new Date().toLocaleDateString("en-CA"); // AAAA-MM-DD

const horaActual = () =>
  new Date().toLocaleTimeString("es-PY", { hour: "2-digit", minute: "2-digit" });

const libresDelPiso = (piso, estados) =>
  piso.layout
    .flat()
    .filter(Boolean)
    .filter((n) => !estados[n]);

/**
 * Consulta de asientos libres por salida.
 *
 * Es SOLO LECTURA: la web no cobra ni bloquea asientos. La venta se
 * sigue haciendo en las agencias; acá el pasajero solo ve qué queda
 * libre antes de llamar o acercarse.
 *
 * Datos: `GET /servicios` y `GET /servicios/:id/asientos` de SysVentas
 * (ver `disponibilidadApi` en src/services/api.js).
 */
export default function Disponibilidad() {
  const [trayectoId, setTrayectoId] = useState(salidas[0].id);
  const [fecha, setFecha] = useState(hoy);
  const [elegidoId, setElegidoId] = useState(null);
  // Cada respuesta guarda la consulta a la que pertenece (`clave`/`id`):
  // si no coincide con la actual, todavía se está cargando.
  const [respServicios, setRespServicios] = useState({});
  const [respAsientos, setRespAsientos] = useState({});
  const [pisoActivo, setPisoActivo] = useState(1);
  const [recargas, setRecargas] = useState(0);

  const trayecto = salidas.find((s) => s.id === trayectoId);
  const claveServicios = `${trayectoId}|${fecha}`;
  const servicios =
    respServicios.clave === claveServicios ? respServicios : { cargando: true };
  const servicio =
    servicios.datos?.find((s) => s.id === elegidoId) ?? servicios.datos?.[0];
  const servicioId = servicio?.id ?? null;
  const asientos =
    respAsientos.id === servicioId ? respAsientos : { cargando: true };

  /* Salidas del trayecto y la fecha elegidos */
  useEffect(() => {
    let vigente = true;
    const clave = `${trayecto.id}|${fecha}`;

    disponibilidadApi
      .servicios({
        origen: slug(trayecto.origen),
        destino: slug(trayecto.destino),
        fecha,
        horarios: trayecto.horarios,
      })
      .then((datos) => vigente && setRespServicios({ clave, datos }))
      .catch((error) => vigente && setRespServicios({ clave, error }));

    return () => {
      vigente = false;
    };
  }, [trayecto, fecha]);

  /* Mapa de la salida elegida, refrescado cada REFRESCO_MS */
  useEffect(() => {
    if (!servicioId) return undefined;
    let vigente = true;

    const consultar = () =>
      disponibilidadApi
        .asientos(servicioId)
        .then(
          (datos) =>
            vigente &&
            setRespAsientos({ id: servicioId, datos, hora: horaActual() }),
        )
        .catch((error) => vigente && setRespAsientos({ id: servicioId, error }));

    consultar();
    const intervalo = setInterval(consultar, REFRESCO_MS);

    return () => {
      vigente = false;
      clearInterval(intervalo);
    };
  }, [servicioId, recargas]);

  const mapa = asientos.datos;
  const piso = mapa?.pisos.find((p) => p.numero === pisoActivo) ?? mapa?.pisos[0];
  const totalLibres = mapa
    ? mapa.pisos.reduce((suma, p) => suma + libresDelPiso(p, mapa.estados).length, 0)
    : 0;
  const agenciasPasajes = agencias.filter((a) => a.pasajes);

  return (
    <>
      <PageHeader kicker="Asientos" script="disponibles">
        Mirá qué lugares quedan libres en cada salida. La compra se hace en
        nuestras agencias o por WhatsApp.
      </PageHeader>

      <Section tone="light">
        {usandoDemo && (
          <p className="dispo__demo" role="note">
            Mostrando datos de demostración: todavía no hay conexión con
            SysVentas.
          </p>
        )}

        {/* ---------- Filtros ---------- */}
        <form className="dispo__filtros" onSubmit={(e) => e.preventDefault()}>
          <label className="dispo__campo">
            <span>Trayecto</span>
            <select
              value={trayectoId}
              onChange={(e) => setTrayectoId(e.target.value)}
            >
              {salidas.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.origen} → {s.destino}
                </option>
              ))}
            </select>
          </label>

          <label className="dispo__campo">
            <span>Fecha</span>
            <input
              type="date"
              value={fecha}
              min={hoy()}
              required
              onChange={(e) => e.target.value && setFecha(e.target.value)}
            />
          </label>
        </form>

        {/* ---------- Salidas ---------- */}
        {servicios.cargando && <p className="dispo__estado">Buscando salidas…</p>}

        {servicios.error && (
          <p className="dispo__estado dispo__estado--error" role="alert">
            No pudimos consultar las salidas. Probá de nuevo en unos minutos o
            llamá a la agencia.
          </p>
        )}

        {servicios.datos?.length === 0 && (
          <p className="dispo__estado">No hay salidas cargadas para esa fecha.</p>
        )}

        {servicios.datos?.length > 0 && (
          <div
            className="dispo__salidas"
            role="radiogroup"
            aria-label="Horario de salida"
          >
            {servicios.datos.map((s) => (
              <button
                key={s.id}
                type="button"
                role="radio"
                aria-checked={s.id === servicioId}
                className={`dispo__salida ${s.id === servicioId ? "is-active" : ""}`}
                onClick={() => setElegidoId(s.id)}
              >
                <strong>{s.salida} h</strong>
                <small>
                  {s.libres === 0
                    ? "Completo"
                    : `${s.libres} ${s.libres === 1 ? "libre" : "libres"}`}
                </small>
              </button>
            ))}
          </div>
        )}

        {/* ---------- Mapa ---------- */}
        {servicio && (
          <div className="dispo__layout">
            <div className="dispo__mapa">
              {asientos.cargando && (
                <p className="dispo__estado">Cargando asientos…</p>
              )}

              {asientos.error && (
                <p className="dispo__estado dispo__estado--error" role="alert">
                  No pudimos cargar los asientos de esta salida.{" "}
                  <button
                    type="button"
                    className="dispo__reintentar"
                    onClick={() => {
                      setRespAsientos({});
                      setRecargas((n) => n + 1);
                    }}
                  >
                    Reintentar
                  </button>
                </p>
              )}

              {mapa && piso && (
                <>
                  <div
                    className="dispo__pisos"
                    role="tablist"
                    aria-label="Pisos de la unidad"
                  >
                    {mapa.pisos.map((p) => (
                      <button
                        key={p.numero}
                        type="button"
                        role="tab"
                        aria-selected={p.numero === piso.numero}
                        className={`dispo__piso ${
                          p.numero === piso.numero ? "is-active" : ""
                        }`}
                        onClick={() => setPisoActivo(p.numero)}
                      >
                        <strong>{p.nombre}</strong>
                        <small>
                          {p.categoria} · {libresDelPiso(p, mapa.estados).length}{" "}
                          libres
                        </small>
                      </button>
                    ))}
                  </div>

                  <SeatMap piso={piso} estados={mapa.estados} />
                  <SeatLegend soloLectura />
                </>
              )}
            </div>

            <aside className="dispo__lateral" aria-label="Resumen de la salida">
              <header className="dispo__resumen">
                <p className="eyebrow">Salida elegida</p>
                <h2 className="dispo__ruta">
                  {trayecto.origen} <span aria-hidden="true">→</span>{" "}
                  {trayecto.destino}
                </h2>
                <p className="dispo__meta">
                  {servicio.fecha} · Sale {servicio.salida} h · Llega{" "}
                  {servicio.llegada} h
                </p>
                {mapa && (
                  <p className="dispo__total" aria-live="polite">
                    <strong>{totalLibres}</strong>{" "}
                    {totalLibres === 1 ? "asiento libre" : "asientos libres"}
                    {asientos.hora && <small>Actualizado {asientos.hora} h</small>}
                  </p>
                )}
              </header>

              <div className="dispo__comprar">
                <h3>¿Querés viajar?</h3>
                <p>
                  Los pasajes se venden en nuestras agencias. Escribinos por
                  WhatsApp con la salida y el número de asiento, y te lo
                  reservan.
                </p>
                <ul className="dispo__agencias">
                  {agenciasPasajes.map(({ id, ciudad, pasajes }) => (
                    <li key={id}>
                      <span>{ciudad}</span>
                      <PhonePill numero={pasajes.telefono} tel={pasajes.tel} />
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        )}
      </Section>
    </>
  );
}
