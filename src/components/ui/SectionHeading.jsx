import "./SectionHeading.css";

/**
 * Titular de marca en dos tiempos, igual que las piezas de Instagram:
 * una palabra en sans-serif bold y mayúsculas ("DESCUBRÍ") y debajo
 * una frase manuscrita ("Nuestros horarios").
 *
 * @param {string} eyebrow    Antetítulo opcional en mayúsculas.
 * @param {string} title      Texto bold en mayúsculas.
 * @param {string} script     Texto manuscrito destacado.
 * @param {"left"|"center"} align
 * @param {2|3} level         Nivel semántico del encabezado.
 */
export default function SectionHeading({
  eyebrow,
  title,
  script,
  align = "center",
  level = 2,
  children,
}) {
  const Tag = `h${level}`;

  return (
    <header className={`heading heading--${align}`}>
      {eyebrow && <p className="eyebrow heading__eyebrow">{eyebrow}</p>}
      <Tag className="heading__title">
        {title && <span className="heading__bold">{title}</span>}
        {script && <span className="script heading__script">{script}</span>}
      </Tag>
      {children && <p className="heading__text">{children}</p>}
    </header>
  );
}
