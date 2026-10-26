import { Link } from "react-router-dom";
import { empresa } from "../../data/site";
import "./BrandWordmark.css";

/**
 * Logotipo tipográfico: bajada en mayúsculas + nombre manuscrito.
 * Reemplazá el bloque por un <img> cuando tengas el isologo en SVG.
 *
 * @param {"sm"|"md"|"lg"} size
 * @param {boolean} onDark  Invierte los colores para fondos oscuros.
 */
export default function BrandWordmark({ size = "md", onDark = false, to = "/" }) {
  const content = (
    <>
      <span className="brand__tagline">{empresa.bajada}</span>
      <span className="script brand__name">{empresa.nombre}</span>
    </>
  );

  const className = `brand brand--${size} ${onDark ? "brand--on-dark" : ""}`.trim();

  if (!to) {
    return <span className={className}>{content}</span>;
  }

  return (
    <Link to={to} className={className} aria-label={empresa.nombreCompleto}>
      {content}
    </Link>
  );
}
