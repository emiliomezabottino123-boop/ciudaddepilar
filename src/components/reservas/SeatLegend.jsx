import "./Seat.css";
import "./SeatLegend.css";

const REFERENCIAS = [
  { estado: "libre", texto: "Disponible" },
  { estado: "seleccionado", texto: "Tu selección" },
  { estado: "ocupado", texto: "Vendido" },
  { estado: "bloqueado", texto: "En proceso de compra" },
];

/**
 * Referencia de colores del mapa de asientos.
 * @param {boolean} soloLectura  Oculta "Tu selección" cuando no se puede elegir.
 */
export default function SeatLegend({ soloLectura = false }) {
  const referencias = soloLectura
    ? REFERENCIAS.filter(({ estado }) => estado !== "seleccionado")
    : REFERENCIAS;

  return (
    <ul className="legend">
      {referencias.map(({ estado, texto }) => (
        <li className="legend__item" key={estado}>
          <span
            className={`legend__muestra seat seat--${estado} ${
              soloLectura ? "seat--lectura" : ""
            }`}
            aria-hidden="true"
          />
          {texto}
        </li>
      ))}
    </ul>
  );
}
