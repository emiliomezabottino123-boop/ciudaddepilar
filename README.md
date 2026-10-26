# Empresa de Transporte Ciudad de Pilar — Sitio institucional

React + Vite. Frontend institucional con acceso preparado para conectarse
más adelante al sistema de ventas **SysVentas** (backend en CodeIgniter).

> **Documentación completa en [`DOCUMENTACION.md`](./DOCUMENTACION.md)**:
> datos del cliente, contenido provisorio, los 28 puntos pendientes de pedir,
> integración con SysVentas y bitácora de decisiones.

## Cómo correrlo

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build de producción en dist/
```

## Estructura

```
src/
├─ assets/                 Imágenes (colectivo-hero.png = placeholder)
├─ components/
│  ├─ contactos/AgencyCard  Ficha de agencia (horarios + teléfono)
│  ├─ home/Hero           Hero de la portada ("Descubrí / Nuestros horarios")
│  ├─ horarios/RouteCard  Trayecto con sus horarios de salida
│  ├─ layout/             Navbar, Footer, Layout, PageHeader, ScrollToTop
│  └─ ui/                 Button, Card, PhonePill, Section, SectionHeading,
│                         BrandWordmark
├─ data/site.js           Agencias, teléfonos, horarios, menú y servicios
├─ pages/                 Home, QuienesSomos, Servicios, Horarios,
│                         Contactos, Disponibilidad, NotFound
├─ services/api.js        Cliente HTTP y consulta de asientos (SysVentas)
└─ styles/
   ├─ tokens.css          Colores, tipografía, espaciado (fuente de verdad)
   └─ global.css          Reset, base y utilidades
```

## Identidad visual

Todo el diseño consume las custom properties de `src/styles/tokens.css`.
No escribas colores ni tamaños "a mano" en los componentes: agregá o ajustá
el token y se propaga a todo el sitio.

| Token | Valor | Uso |
|---|---|---|
| `--color-primary` | `#F5701C` | Naranja institucional, CTAs, acentos |
| `--color-dark` | `#1A1A1A` | Textos y fondos de contraste |
| `--color-light` | `#F5F5F5` | Fondo general |
| `--gradient-hero` | `linear-gradient(135deg, #F5701C, #FFB347)` | Marcos y franjas |
| `--font-heading` | Poppins | Títulos en bold/mayúsculas |
| `--font-script` | Caveat | "Ciudad de Pilar" y frases destacadas |

Las fuentes se cargan desde Google Fonts en `index.html`.

## Datos cargados y pendientes

Las tablas de horarios, agencias y teléfonos, el inventario de contenido
provisorio y la lista de datos que faltan pedirle al cliente están en
[`DOCUMENTACION.md`](./DOCUMENTACION.md) (secciones 4, 5 y 6).

Para ver los puntos abiertos en el código:

```bash
grep -rn "TODO" src/
```
