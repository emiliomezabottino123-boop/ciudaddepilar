import "./RouteCard.css";

/**
 * Tarjeta de un trayecto con sus horarios de salida.
 * Replica el bloque "ASUNCIÓN - PILAR / 14:00h | 18:00h | 20:50h".
 */
export default function RouteCard({ origen, destino, horarios }) {
  return (
    <article className="route-card">
      <h3 className="route-card__title">
        {origen} <span aria-hidden="true">–</span> {destino}
        <span className="sr-only">
          , salidas desde {origen} hacia {destino}
        </span>
      </h3>

      <ul className="route-card__times">
        {horarios.map((hora) => (
          <li className="route-card__time" key={hora}>
            {hora}
            <span className="route-card__suffix">h</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
