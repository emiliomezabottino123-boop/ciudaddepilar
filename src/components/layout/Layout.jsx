import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

/**
 * Cascarón institucional: header + contenido de la ruta + footer.
 * Se usa como ruta padre en App.jsx.
 */
export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main id="contenido">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
