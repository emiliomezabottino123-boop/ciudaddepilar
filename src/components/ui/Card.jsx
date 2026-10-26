import "./Card.css";

/**
 * Tarjeta con bordes redondeados y acento naranja opcional.
 *
 * @param {string} icon      Emoji o nodo decorativo del encabezado.
 * @param {string} title     Título de la tarjeta.
 * @param {boolean} accent   Muestra la barra naranja superior.
 */
export default function Card({
  icon,
  title,
  children,
  accent = false,
  className = "",
  ...rest
}) {
  return (
    <article
      className={`card ${accent ? "card--accent" : ""} ${className}`.trim()}
      {...rest}
    >
      {icon && (
        <span className="card__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      {title && <h3 className="card__title">{title}</h3>}
      <div className="card__body">{children}</div>
    </article>
  );
}
