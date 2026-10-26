import PhonePill from "../ui/PhonePill";
import "./AgencyCard.css";

/**
 * Ficha de una agencia: ciudad, dirección, horarios y teléfono.
 *
 * @param {object} agencia   Elemento de `agencias` en src/data/site.js.
 * @param {"pasajes"|"encomiendas"} servicio  Qué bloque mostrar.
 */
export default function AgencyCard({ agencia, servicio = "pasajes" }) {
  const datos = agencia[servicio];

  if (!datos) return null;

  return (
    <article className="agency-card">
      <h3 className="agency-card__city">
        <span className="agency-card__pin" aria-hidden="true">
          📍
        </span>
        {agencia.ciudad}
      </h3>

      <dl className="agency-card__hours">
        {datos.horarios.map(({ dias, horas }) => (
          <div className="agency-card__row" key={`${dias}-${horas}`}>
            <dt>{dias}</dt>
            <dd>{horas}</dd>
          </div>
        ))}
      </dl>

      <PhonePill numero={datos.telefono} tel={datos.tel} />

      {agencia.direccion && (
        <address className="agency-card__address">{agencia.direccion}</address>
      )}
    </article>
  );
}
