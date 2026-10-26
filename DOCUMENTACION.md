# Ciudad de Pilar — Documentación del proyecto

Sitio institucional de **Empresa de Transporte Ciudad de Pilar** (Paraguay).
Frontend en React + Vite. Muestra la disponibilidad de asientos de cada viaje
leyendo la API de **SysVentas** (backend en CodeIgniter), sin vender ni cobrar.

- **Última actualización:** 21 de agosto de 2026
- **Directorio:** `C:\ciudaddepilar`
- **Estado:** frontend institucional funcional; contenido parcialmente
  provisorio (ver [Contenido provisorio](#5-contenido-provisorio))

> **Alcance vigente (21/08/2026):** por definición del profesor, la entrega es
> **solo el sitio institucional**. La conexión con SysVentas queda fuera por
> ahora.
>
> **Actualización (26/10/2026):** el profesor pidió que el cliente pueda **ver
> la disponibilidad de asientos de cada viaje**, sin comprar desde la web (la
> venta sigue en las agencias). Víctor está preparando la API. Se agregó
> `/disponibilidad` y se **eliminaron el login y el panel**: no hace falta
> ingresar al sistema de la empresa.
>
> Con eso, **la única ruta crítica es el contenido**: los 8 puntos marcados 🔴
> en la sección 6 pasan a ser lo que bloquea la entrega.

---

## Dónde quedamos

**Última sesión: 22 de agosto de 2026.** Punto de retomada, para no tener que
reconstruir el contexto.

### En una frase

El sitio institucional está funcionando de punta a punta y no tiene trabas
técnicas. Lo único que falta es **contenido del cliente**.

### Qué está listo

- Las cinco páginas públicas navegables, con la identidad de marca aplicada
  desde `tokens.css`.
- Horarios y Contactos con los datos reales de las tres agencias.
- Enlaces a WhatsApp funcionando en toda la web.
- Página de asientos disponibles (`/disponibilidad`), solo lectura, con datos
  de demostración hasta que esté la API.
- `npm run build` y `npm run lint` sin errores ni advertencias.

### Qué falta y de quién depende

| Qué | De quién depende |
|---|---|
| Los 28 datos de la sección 6, sobre todo los 8 marcados 🔴 | **Del cliente** |
| Foto del hero en alta y logo vectorial | **Del cliente** |
| Historia real para Quiénes somos | **Del cliente** |
| Integración con SysVentas | En espera, fuera de alcance |

No hay nada esperando de nuestro lado: mientras no lleguen esos datos, no hay
trabajo de programación pendiente para la entrega.

### Cómo retomar

```bash
cd C:\ciudaddepilar
npm install     # solo si es una máquina nueva
npm run dev     # http://localhost:5173
```

Rutas para revisar: `/`, `/quienes-somos`, `/servicios`, `/horarios`,
`/contactos` y `/disponibilidad` (en el menú como "Asientos").

### Hilos abiertos

1. **Esperando respuesta del cliente** a los 28 puntos. Documento para
   compartir:
   <https://claude.ai/code/artifact/dff7e2e8-8857-40e1-821f-2b8eef99a855>
2. **El profesor no definió nada más** después de acotar el alcance al sitio
   institucional el 21/08. Si vuelve a habilitar la integración, el pedido al
   backend ya está redactado en `docs/pedido-backend.md`.
3. **Sin decidir:** si se agrega formulario de contacto. Requiere backend o un
   servicio de terceros, más una política de privacidad.
4. **Sin decidir:** dónde se publica el sitio y con qué dominio.

### Otros documentos del proyecto

| Archivo | Qué tiene |
|---|---|
| `README.md` | Arranque rápido y estructura |
| `docs/consulta-profe.md` | Mensaje al profesor. **Ya resuelto**, archivado |
| `docs/pedido-backend.md` | Pedido a quien maneja SysVentas. **En espera**, sin enviar |

---

## 1. Stack y comandos

| | |
|---|---|
| Framework | React 19 + Vite 8 |
| Ruteo | react-router-dom 7 (`BrowserRouter`) |
| Estilos | CSS plano con custom properties (sin librerías) |
| Lint | oxlint |
| Fuentes | Google Fonts (Poppins + Caveat) vía `index.html` |

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # producción en dist/
npm run lint
```

No hay dependencias de UI ni de estado: todo el diseño se resuelve con los
tokens de `src/styles/tokens.css`.

---

## 2. Estructura

```
src/
├─ assets/
│  └─ colectivo-hero.png     PROVISORIO: captura de baja resolución
├─ components/
│  ├─ contactos/AgencyCard   Ficha de agencia (horarios + WhatsApp)
│  ├─ home/Hero              Hero de portada ("Descubrí / Nuestros horarios")
│  ├─ horarios/RouteCard     Trayecto con sus horarios de salida
│  ├─ layout/                Navbar, Footer, Layout, PageHeader, ScrollToTop
│  ├─ reservas/              Seat, SeatMap, SeatLegend (mapa de solo lectura)
│  └─ ui/                    Button, Card, PhonePill, Section,
│                            SectionHeading, BrandWordmark
├─ data/
│  ├─ site.js                Agencias, teléfonos, horarios, menú, servicios
│  └─ servicioDemo.js        DEMO: salidas y mapas de asientos
├─ pages/                    Home, QuienesSomos, Servicios, Horarios,
│                            Contactos, Disponibilidad, NotFound
├─ services/api.js           Cliente HTTP y `disponibilidadApi`
└─ styles/
   ├─ tokens.css             Fuente de verdad de color/tipografía/espaciado
   └─ global.css             Reset, base y utilidades
```

### Rutas

| Ruta | Página | Acceso |
|---|---|---|
| `/` | Home | Público |
| `/quienes-somos` | QuienesSomos | Público |
| `/servicios` | Servicios | Público |
| `/horarios` | Horarios | Público |
| `/contactos` | Contactos | Público |
| `/disponibilidad` | Disponibilidad | Público. Asientos libres por salida, **solo lectura** (no cobra) |
| `/reserva` | — | Redirige a `/disponibilidad`. El prototipo de compra se eliminó |
| `*` | NotFound | Público |

---

## 3. Sistema de diseño

Todo el color y la tipografía salen de `src/styles/tokens.css`. **No escribir
valores literales en los componentes**: agregar o ajustar el token y se
propaga a todo el sitio.

### Paleta

| Token | Valor | Uso |
|---|---|---|
| `--color-primary` | `#F5701C` | Naranja institucional, CTAs, acentos |
| `--color-primary-dark` | `#D95A0C` | Hover de botones |
| `--color-primary-light` | `#FFB347` | Fin del gradiente |
| `--color-primary-soft` | `#FDECE1` | Fondos suaves, íconos |
| `--color-dark` | `#1A1A1A` | Texto principal y fondos de contraste |
| `--color-muted` | `#6B6B6B` | Texto secundario |
| `--color-light` | `#F5F5F5` | Fondo general |
| `--color-surface` | `#FFFFFF` | Tarjetas |
| `--gradient-hero` | `linear-gradient(135deg, #F5701C, #FFB347)` | Marcos de foto, píldoras, headers de tarjeta |

### Tipografía

| Token | Familia | Uso |
|---|---|---|
| `--font-heading` | Poppins | Títulos bold en mayúsculas ("DESCUBRÍ", "HORARIOS") |
| `--font-body` | Poppins | Texto corrido |
| `--font-script` | Caveat | Nombre de marca y frases destacadas ("Nuestros horarios") |

Tamaños fluidos con `clamp()`: de `--fs-xs` a `--fs-3xl`. El `--fs-3xl` está
reservado para el titular manuscrito del hero.

### Patrón visual de marca

Replica las placas de Instagram de la empresa:

- Titular en dos tiempos: palabra en Poppins Black mayúsculas naranja +
  frase manuscrita en Caveat negra debajo, resuelto por `SectionHeading`.
- Fotos con marco naranja grueso (`--border-hero: 10px`) y esquinas
  redondeadas (`--radius-xl`).
- Teléfonos como píldora naranja con degradado e itálica, resuelto por
  `PhonePill`.
- Fondo claro con patrón geométrico sutil, clase `.pattern-bg`.

### Componentes reutilizables

| Componente | Props principales |
|---|---|
| `Button` | `to` (Link) o `href` (externo) o ninguno (`<button>`); `variant`: primary / dark / outline / ghost; `size`: sm / md / lg; `icon`, `fullWidth` |
| `SectionHeading` | `eyebrow`, `title` (bold mayúsculas), `script` (manuscrito), `align`, `level` |
| `Section` | `tone`: light / surface / dark / pattern; `narrow` |
| `Card` | `icon`, `title`, `accent` (barra naranja superior) |
| `PhonePill` | `numero` (formateado), `tel` (internacional); abre WhatsApp |
| `RouteCard` | `origen`, `destino`, `horarios[]` |
| `AgencyCard` | `agencia` (objeto de `agencias`), `servicio`: pasajes / encomiendas |
| `BrandWordmark` | `size`, `onDark`, `to` |

---

## 4. Datos del cliente cargados

**Fuente:** historias de Instagram de la empresa, capturadas en agosto de 2026.
Estos datos están verificados.

> La empresa opera en **Paraguay**: Pilar (Ñeembucú), Asunción y Ñemby.
> No confundir con Pilar de Buenos Aires.

### Salidas diarias

| Trayecto | Horarios |
|---|---|
| Asunción – Pilar | 14:00 · 18:00 · 20:50 |
| Pilar – Asunción | 08:00 · 13:00 · 01:15 |

### Agencias

| Ciudad | Pasajes | Encomiendas |
|---|---|---|
| Asunción | (0984) 508 587 — Lun a Vie 07:00–20:50, Sáb y Dom 09:00–20:50 | (0982) 365 684 — Lun a Vie 07:00–18:00, Sáb 07:00–12:00 |
| Ñemby | (0986) 898 730 — Lun a Sáb 07:00–20:50 | — |
| Pilar | (0975) 624 500 — Lun a Dom 06:00–01:15 | (0975) 624 500 — Lun a Sáb 07:00–12:00 y 15:00–19:00 |

**Ubicación de Ñemby:** Ruta PY01 – Acceso Sur esq. Tte. Peralta
(a pasos del Supermercado Gran Vía).

### WhatsApp

Todos los celulares tienen WhatsApp (confirmado por el cliente). Los enlaces
se arman con el helper de `src/data/site.js`:

```js
export const waLink = (tel) => `https://wa.me/${tel.replace(/\D/g, "")}`;
// "+595984508587" -> "https://wa.me/595984508587"
```

Los números se guardan una sola vez en formato internacional (campo `tel`) y
el enlace se deriva. No quedan enlaces `tel:` en el proyecto.

---

## 5. Contenido provisorio

Inventario de lo que **no** viene del cliente y hay que reemplazar.

| Dónde | Qué hay hoy | Estado |
|---|---|---|
| `src/assets/colectivo-hero.png` | Captura de pantalla de baja resolución | Placeholder |
| `BrandWordmark` | Nombre tipeado en Caveat | No existe el logo real |
| `pages/QuienesSomos.jsx` | Historia con texto de ejemplo | Redactado por nosotros |
| `pages/QuienesSomos.jsx` | Misión, visión y valores | Borrador nuestro, sin aprobar |
| `pages/Servicios.jsx` y `data/site.js` | Descripción de los 3 servicios | Deducido de las historias |
| `data/site.js`, Asunción `direccion` | "Terminal de Ómnibus de Asunción" | Inferencia del rótulo "Agencia Terminal" |
| `data/site.js`, Pilar `direccion` | "Terminal de Ómnibus de Pilar, Ñeembucú" | Misma inferencia |
| `data/site.js`, `empresa.instagram` | URL genérica | El usuario aparece cortado en las capturas |
| `data/site.js`, `empresa.email` | Vacío | No figura en ninguna publicación |
| `pages/Contactos.jsx` | Recuadro "Mapa próximamente" | Falta el embed de Google Maps |

Todos estos puntos están marcados con `TODO` en el código. Para listarlos:

```bash
grep -rn "TODO" src/
```

**Lo que se eliminó por no estar confirmado:** referencias a "más de 30 años de
trayectoria", "unidades de doble piso con butaca cama", "servicio a bordo",
"choferes con capacitación continua" y "viajes especiales para delegaciones".
Eran suposiciones. Las métricas del hero se reemplazaron por datos derivables
de las historias: 3 agencias, 6 salidas diarias, atención de lunes a domingo
en Pilar.

---

## 6. Datos pendientes del cliente

28 puntos, numerados para que el cliente pueda responder de a uno.
Versión web para compartir:
<https://claude.ai/code/artifact/dff7e2e8-8857-40e1-821f-2b8eef99a855>

**Prioridades:** 🔴 frena la publicación (8) · 🟠 importante (16) · ⚪ puede esperar (4)

### Material gráfico

| # | Qué pedir | Prioridad |
|---|---|---|
| 01 | Logo original en vectorial (.ai, .svg, .eps o .pdf) | 🔴 |
| 02 | Fotos de las unidades en alta (≥1600 px), exterior en ruta e interior con butacas | 🔴 |
| 03 | Fotos de las agencias: fachada y mostrador de las tres | 🟠 |
| 04 | Confirmación de que se pueden usar en la web las fotos de Instagram | 🟠 |
| 05 | Nombre de las tipografías del material gráfico, si las tienen identificadas | ⚪ |

### Quiénes somos

| # | Qué pedir | Prioridad |
|---|---|---|
| 06 | Año de fundación y quién fundó la empresa | 🔴 |
| 07 | Historia breve: cómo empezaron, cómo creció, cuándo abrieron Ñemby y Asunción | 🔴 |
| 08 | Cuántas unidades tiene la flota y de qué tipo (piso y medio, doble piso, asientos) | 🟠 |
| 09 | Misión, visión y valores, si ya los tienen escritos | 🟠 |
| 10 | Cuántas personas trabajan en la empresa | ⚪ |

### Servicios

| # | Qué pedir | Prioridad |
|---|---|---|
| 11 | Qué incluye el viaje: aire, baño, wifi, refrigerio, tipo de butaca, pantallas | 🔴 |
| 12 | Si hay más de una categoría de servicio y si se diferencian en precio | 🟠 |
| 13 | Precio del pasaje Asunción–Pilar y si quieren publicarlo | 🟠 |
| 14 | Encomiendas: qué se puede enviar, peso o tamaño máximo, tarifas, plazo de entrega | 🟠 |
| 15 | Si se necesita documento para despachar o retirar una encomienda | 🟠 |
| 16 | Si alquilan unidades para grupos, excursiones o empresas | ⚪ |

### Recorrido y horarios

| # | Qué pedir | Prioridad |
|---|---|---|
| 17 | Si hay paradas intermedias entre Asunción y Pilar y en qué localidades | 🟠 |
| 18 | Si los horarios cambian en feriados, Semana Santa o temporada alta | 🟠 |
| 19 | Si se puede reservar por WhatsApp o solo en agencia | 🔴 |
| 20 | Formas de pago aceptadas | ⚪ |

> El punto 19 define qué dice el botón principal de todo el sitio.
> El punto 11 es lo que más consulta un pasajero antes de comprar.

### Datos de contacto que faltan

| # | Qué pedir | Prioridad |
|---|---|---|
| 21 | Dirección exacta de la agencia de Asunción (boletería o local en la Terminal) | 🔴 |
| 22 | Dirección exacta de la agencia de Pilar | 🔴 |
| 23 | Email institucional | 🟠 |
| 24 | Usuario completo de Instagram, y si tienen Facebook o TikTok | 🟠 |
| 25 | Enlace de Google Maps de cada agencia | 🟠 |
| 26 | Si existe alguna agencia más además de Asunción, Ñemby y Pilar | 🟠 |

### Legales

| # | Qué pedir | Prioridad |
|---|---|---|
| 27 | Razón social y RUC para el pie de página | 🟠 |
| 28 | Si quieren formulario de contacto y a qué correo llegan los mensajes | 🟠 |

---

## 7. Integración con SysVentas

> **Fuera del alcance actual.** Esta sección y la siguiente quedan como
> referencia para cuando se retome la integración.

### Estado actual

La página `/disponibilidad` consulta la API a través de `disponibilidadApi`
(`src/services/api.js`). Mientras no haya `VITE_API_URL`, responde con datos
de demostración (`src/data/servicioDemo.js`) y la página lo avisa con un
cartel. No hay login: la consulta es pública y de solo lectura.

### Endpoints que usa la página

```
GET /servicios?origen=asuncion&destino=pilar&fecha=2026-10-26
-> [{ id, origen, destino, fecha, salida, llegada, unidad, libres }]

GET /servicios/:id/asientos
-> { pisos: [{ numero, nombre, categoria, layout }],
     estados: { "14": "ocupado", "27": "bloqueado" } }
```

`layout` es un arreglo de filas; cada posición es el número de asiento o
`null` para el pasillo. Un asiento ausente de `estados` está libre. El mapa se
vuelve a consultar cada 30 segundos para reflejar las ventas del mostrador.

### Pasos para conectar

1. Copiar `.env.example` a `.env` y poner la URL base de la API de Víctor.
2. Si sus rutas o nombres de campos son otros, adaptarlos dentro de
   `disponibilidadApi`; la página y los componentes no cambian.
3. La API tiene que permitir CORS desde el dominio del sitio.

## 8. Mapa de asientos (solo lectura)

La web **no vende ni cobra**: muestra qué asientos quedan libres y deriva la
compra a las agencias por WhatsApp. El prototipo de compra en tres pasos
(formulario de pasajeros, bloqueo con cuenta regresiva y confirmación) se
eliminó el 26/10/2026. Si algún día se retoma la venta online, el pedido
original al backend sigue en `docs/pedido-backend.md`.

### Componentes

| Archivo | Rol |
|---|---|
| `pages/Disponibilidad.jsx` | Filtros (trayecto y fecha), horarios con asientos libres, mapa y contacto de agencias |
| `components/reservas/SeatMap.jsx` | Mapa de un piso, dibuja el contorno de la unidad. Sin `onToggle` es de solo lectura |
| `components/reservas/Seat.jsx` | Un asiento. En solo lectura es un indicador con `aria-label`, no un botón |
| `components/reservas/SeatLegend.jsx` | Referencia de colores |

### Estados de un asiento

| Estado | Se ve |
|---|---|
| `libre` | Verde |
| `ocupado` | Gris oscuro con diagonal |
| `bloqueado` | Gris rayado (alguien lo está comprando en agencia) |

El estado no se comunica solo por color: `ocupado` lleva una diagonal y
`bloqueado` un rayado, para que se distingan en impresión o con daltonismo.

### Antes de conectar hace falta

1. El **layout real de cada unidad**: cuántos pisos, cuántos asientos por fila
   y cómo están numerados. Hoy el demo usa una distribución inventada de
   12 asientos cama abajo y 44 semi cama arriba. Lo ideal es que venga en la
   respuesta de la API (`layout`).
2. Si las unidades tienen **uno o dos pisos** (punto 08 del pedido al cliente).
3. Que la API lea las **mismas tablas que el mostrador**, para que un asiento
   vendido en agencia aparezca ocupado en la web.

---

## 9. Bitácora de decisiones

| Decisión | Motivo |
|---|---|
| **El sitio es de Paraguay, no de Argentina** | Las primeras capturas no lo aclaraban y se asumió Pilar de Buenos Aires. Las historias posteriores mostraron Asunción, Ñemby y celulares paraguayos. Corregido en todo el sitio, con prefijo `+595`. |
| Enlaces a WhatsApp en vez de `tel:` | Confirmado por el cliente. Se agregó isotipo de WhatsApp en `PhonePill` para que el clic no sorprenda al usuario. |
| Menú móvil se cierra por `onClick` y no por efecto de ruta | Evita `setState` dentro de `useEffect`, que dispara un render en cascada y lo marca oxlint. |
| CSS plano en vez de módulos o Tailwind | El pedido era centralizar la identidad en `tokens.css`; CSS plano con clases prefijadas mantiene el proyecto fácil de continuar. |
| Sin login ni panel; la web solo consulta asientos (26/10/2026) | Pedido del profesor: el cliente ve la disponibilidad y compra en la agencia, para no reemplazar a los vendedores. |
| Datos en `src/data/site.js` y no en los componentes | El cliente va a corregir textos y teléfonos varias veces; conviene un solo archivo. |

---

## 10. Próximos pasos

Ordenados según el alcance vigente: solo el sitio institucional.

**Para poder entregar**

1. Reunir con el cliente los 8 puntos marcados 🔴 en la sección 6. Es lo único
   que bloquea la entrega.
2. Reemplazar la foto del hero y sumar el logo vectorial.
3. Completar Quiénes somos y ampliar Servicios con la información real.
4. Embeber el mapa de Google en Contactos.

**Cuando se retome la integración**

5. Definir si se agrega formulario de contacto (requiere backend o servicio de
   terceros, más política de privacidad).
6. Reunión por Meet con Víctor: ajustar `disponibilidadApi` a su API y
   cargar `VITE_API_URL`.
