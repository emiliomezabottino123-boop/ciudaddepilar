import Button from "../ui/Button";
import { destacados } from "../../data/site";
import colectivo from "../../assets/colectivo-hero.png";
import "./Hero.css";

/**
 * Hero principal, calcado de las piezas de Instagram:
 * "DESCUBRÍ" en bold naranja + "Nuestros horarios" manuscrito,
 * foto del colectivo con marco naranja y CTA en píldora.
 *
 * Reemplazá `colectivo-hero.png` por una foto en alta (1600px de ancho
 * o más) manteniendo el mismo nombre de archivo.
 */
export default function Hero() {
  return (
    <section className="hero pattern-bg">
      {/* Formas decorativas naranjas de los laterales */}
      <span className="hero__blob hero__blob--left" aria-hidden="true" />
      <span className="hero__blob hero__blob--right" aria-hidden="true" />

      <div className="container hero__inner">
        <h1 className="hero__title">
          <span className="hero__kicker">Descubrí</span>
          <span className="script hero__script">Nuestros horarios</span>
        </h1>

        <p className="hero__lead">
          Unimos Asunción y Pilar todos los días, con agencias en Asunción,
          Ñemby y Pilar para pasajes y encomiendas.
        </p>

        <figure className="hero__figure">
          <img
            className="hero__image"
            src={colectivo}
            alt="Unidad de doble piso de Empresa de Transporte Ciudad de Pilar en ruta"
            width="1200"
            height="700"
            fetchPriority="high"
          />
        </figure>

        <Button to="/horarios" size="lg" icon="→" className="hero__cta">
          <strong>Salidas diarias</strong> para tu mejor comodidad
        </Button>

        <dl className="hero__stats">
          {destacados.map(({ valor, etiqueta }) => (
            <div className="hero__stat" key={etiqueta}>
              <dt className="hero__stat-value">{valor}</dt>
              <dd className="hero__stat-label">{etiqueta}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
