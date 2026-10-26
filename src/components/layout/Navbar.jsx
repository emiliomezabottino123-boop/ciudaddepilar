import { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import BrandWordmark from "../ui/BrandWordmark";
import Button from "../ui/Button";
import { navLinks } from "../../data/site";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(() => window.scrollY > 12);

  const cerrarMenu = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="container navbar__inner">
        <BrandWordmark size="md" />

        <button
          type="button"
          className="navbar__toggle"
          aria-expanded={open}
          aria-controls="navbar-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Abrir menú</span>
          <span className={`navbar__burger ${open ? "is-open" : ""}`} />
        </button>

        <nav
          id="navbar-menu"
          className={`navbar__menu ${open ? "is-open" : ""}`}
          aria-label="Navegación principal"
        >
          <ul className="navbar__links">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === "/"}
                  onClick={cerrarMenu}
                  className={({ isActive }) =>
                    `navbar__link ${isActive ? "is-active" : ""}`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          <Button
            to="/disponibilidad"
            variant="primary"
            size="sm"
            onClick={cerrarMenu}
          >
            Ver asientos
          </Button>
        </nav>
      </div>
    </header>
  );
}
