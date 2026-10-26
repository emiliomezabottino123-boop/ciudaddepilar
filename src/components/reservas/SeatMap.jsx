import Seat from "./Seat";
import "./SeatMap.css";

/**
 * Mapa de asientos de un piso de la unidad.
 * Dibuja el contorno del colectivo y ubica cada asiento según `layout`.
 *
 * @param {object} piso            Elemento de `servicio.pisos`.
 * @param {Record<number,string>} estados  Estados que vienen del backend.
 * @param {number[]} seleccionados Números elegidos por el usuario.
 * @param {(numero:number)=>void} [onToggle]  Sin él, el mapa es de solo lectura.
 */
export default function SeatMap({
  piso,
  estados,
  seleccionados = [],
  onToggle,
}) {
  const columnas = Math.max(...piso.layout.map((fila) => fila.length));

  const estadoDe = (numero) => {
    if (seleccionados.includes(numero)) return "seleccionado";
    return estados[numero] ?? "libre";
  };

  return (
    <div className="seatmap">
      <div className="seatmap__cabina">
        {piso.numero === 1 ? (
          <>
            <span className="seatmap__volante" aria-hidden="true" />
            <span className="seatmap__rotulo">Conductor</span>
          </>
        ) : (
          <span className="seatmap__rotulo">Frente de la unidad</span>
        )}
      </div>

      <div
        className="seatmap__grilla"
        style={{ "--columnas": columnas }}
        role="group"
        aria-label={`Asientos del ${piso.nombre.toLowerCase()}`}
      >
        {piso.layout.map((fila, indexFila) =>
          fila.map((numero, indexCol) =>
            numero === null ? (
              <span
                className="seatmap__pasillo"
                key={`p-${indexFila}-${indexCol}`}
                aria-hidden="true"
              />
            ) : (
              <Seat
                key={numero}
                numero={numero}
                estado={estadoDe(numero)}
                onToggle={onToggle}
              />
            ),
          ),
        )}
      </div>

      <div className="seatmap__fondo">
        <span className="seatmap__rotulo">Fondo</span>
      </div>
    </div>
  );
}
