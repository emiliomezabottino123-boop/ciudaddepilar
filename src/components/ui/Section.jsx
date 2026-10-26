import "./Section.css";

/**
 * Bloque de sección con padding vertical y contenedor consistentes.
 *
 * @param {"light"|"surface"|"dark"|"pattern"} tone Fondo de la sección.
 * @param {boolean} narrow Usa el contenedor angosto (textos largos).
 */
export default function Section({
  children,
  tone = "light",
  narrow = false,
  id,
  className = "",
  ...rest
}) {
  return (
    <section
      id={id}
      className={`section section--${tone} ${className}`.trim()}
      {...rest}
    >
      <div className={`container ${narrow ? "container--narrow" : ""}`.trim()}>
        {children}
      </div>
    </section>
  );
}
