import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";

import Home from "./pages/Home";
import QuienesSomos from "./pages/QuienesSomos";
import Servicios from "./pages/Servicios";
import Horarios from "./pages/Horarios";
import Contactos from "./pages/Contactos";
import Disponibilidad from "./pages/Disponibilidad";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="quienes-somos" element={<QuienesSomos />} />
          <Route path="servicios" element={<Servicios />} />
          <Route path="horarios" element={<Horarios />} />
          <Route path="contactos" element={<Contactos />} />

          {/* Consulta de asientos libres, solo lectura. La venta sigue
              en las agencias; /reserva era el viejo prototipo de compra. */}
          <Route path="disponibilidad" element={<Disponibilidad />} />
          <Route
            path="reserva"
            element={<Navigate to="/disponibilidad" replace />}
          />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
