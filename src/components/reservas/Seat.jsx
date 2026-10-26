import "./Seat.css";

const ETIQUETAS = {
  libre: "disponible",
  ocupado: "ocupado",
  bloqueado: "reservado por otra persona",
  seleccionado: "seleccionado",
};

/**
 * Un asiento del mapa. Es un <button> real: se puede llegar con Tab
 * y activar con Enter o barra espaciadora.
 * Sin `onToggle` se dibuja como indicador de solo lectura.
 *
 * @param {number} numero
 * @param {"libre"|"ocupado"|"bloqueado"|"seleccionado"} estado
 * @param {(numero:number)=>void} [onToggle]
 */
export default function Seat({ numero, estado, onToggle }) {
  if (!onToggle) {
    return (
      <span
        className={`seat seat--${estado} seat--lectura`}
        role="img"
        aria-label={`Asiento ${numero}, ${ETIQUETAS[estado]}`}
      >
        <span className="seat__back" aria-hidden="true" />
        <span className="seat__numero">{numero}</span>
      </span>
    );
  }

  const disponible = estado === "libre" || estado === "seleccionado";

  return (
    <button
      type="button"
      className={`seat seat--${estado}`}
      disabled={!disponible}
      aria-pressed={estado === "seleccionado"}
      aria-label={`Asiento ${numero}, ${ETIQUETAS[estado]}`}
      onClick={() => onToggle(numero)}
    >
      <span className="seat__back" aria-hidden="true" />
      <span className="seat__numero">{numero}</span>
    </button>
  );
}
