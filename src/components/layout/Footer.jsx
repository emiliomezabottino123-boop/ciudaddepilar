import { Link } from "react-router-dom";
import BrandWordmark from "../ui/BrandWordmark";
import { agencias, empresa, navLinks, waLink } from "../../data/site";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <BrandWordmark size="lg" onDark />
          <p className="footer__slogan">{empresa.eslogan}</p>
        </div>

        <nav className="footer__nav" aria-label="Navegación del pie">
          <h2 className="footer__title">Navegación</h2>
          <ul>
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className="footer__link">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__contact">
          <h2 className="footer__title">Canales de atención</h2>
          <ul className="footer__agencias">
            {agencias.map(({ id, ciudad, pasajes }) => (
              <li key={id}>
                <span className="footer__ciudad">{ciudad}</span>
                <a
                  className="footer__link"
                  href={waLink(pasajes.tel)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {pasajes.telefono}
                </a>
              </li>
            ))}
          </ul>
          <address className="footer__muted">
            {agencias.find((a) => a.id === "nemby").direccion}
          </address>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>
          © {year} {empresa.nombreCompleto}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
