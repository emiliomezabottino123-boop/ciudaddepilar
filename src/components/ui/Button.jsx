import { Link } from "react-router-dom";
import "./Button.css";

/**
 * Botón/CTA de marca.
 *
 * Renderiza <Link>, <a> o <button> según las props recibidas:
 *  - `to`   -> navegación interna (react-router)
 *  - `href` -> enlace externo
 *  - resto  -> <button>
 *
 * @param {"primary"|"dark"|"outline"|"ghost"} variant
 * @param {"sm"|"md"|"lg"} size
 */
export default function Button({
  children,
  to,
  href,
  variant = "primary",
  size = "md",
  icon = null,
  fullWidth = false,
  className = "",
  ...rest
}) {
  const classes = [
    "btn",
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth ? "btn--full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span className="btn__label">{children}</span>
      {icon && (
        <span className="btn__icon" aria-hidden="true">
          {icon}
        </span>
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button className={classes} {...rest}>
      {content}
    </button>
  );
}
