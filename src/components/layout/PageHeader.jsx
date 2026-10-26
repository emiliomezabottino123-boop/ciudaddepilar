import "./PageHeader.css";

/**
 * Cabecera reutilizable para las páginas internas
 * (Quiénes somos, Servicios, Horarios, Contactos).
 */
export default function PageHeader({ kicker, script, children }) {
  return (
    <header className="page-header pattern-bg">
      <div className="container page-header__inner">
        <h1 className="page-header__title">
          {kicker && <span className="page-header__kicker">{kicker}</span>}
          {script && <span className="script page-header__script">{script}</span>}
        </h1>
        {children && <p className="page-header__lead">{children}</p>}
      </div>
    </header>
  );
}
