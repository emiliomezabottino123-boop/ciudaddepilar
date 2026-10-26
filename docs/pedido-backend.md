# Pedido a quien maneja SysVentas — venta de pasajes online

> **EN ESPERA desde el 21/08/2026.** El profesor definió que por ahora la
> entrega es solo el sitio institucional. Este mensaje **no se envió** y no
> hace falta enviarlo todavía. Queda escrito para cuando se retome la
> integración, así no hay que rearmarlo.
>
> El detalle técnico completo, con los contratos de API, está en la sección 8
> de [`../DOCUMENTACION.md`](../DOCUMENTACION.md).

---

Buenas. Estoy armando el sitio web de Empresa de Transporte Ciudad de Pilar y
la parte de venta de pasajes online depende de SysVentas. Te paso lo que
necesitaría del backend, para acordar el contrato antes de que cada uno avance
por su lado.

Del lado del sitio ya está el flujo completo: mapa de asientos con los dos
pisos, formulario con los datos de cada pasajero y pantalla de confirmación.
Hoy anda con datos simulados.

**1. Servicios disponibles**

```
GET /servicios?origen=asuncion&destino=pilar&fecha=2026-08-25
-> [{ id, origen, destino, salida, llegada, categoria, precio, libres }]
```

**2. Mapa de asientos de un servicio**

```
GET /servicios/:id/asientos
-> {
     pisos: [{ numero, nombre, categoria, precio, layout }],
     estados: { "14": "ocupado", "27": "bloqueado" }
   }
```

`layout` es un arreglo de filas, y cada posición es el número de asiento o
`null` para el pasillo. Con eso el sitio dibuja cualquier distribución sin
tocar código cuando cambie la unidad.

**3. Bloqueo temporal de asientos — lo más importante**

```
POST /reservas  { servicioId, asientos: [5, 6] }
-> { reservaId, vence: "2026-08-25T14:12:00Z" }
```

Sin esto se sobrevende: dos personas eligen el asiento 19 al mismo tiempo,
las dos completan el formulario y las dos pagan.

Dos detalles que importan:

- El bloqueo tiene que ser **una sola operación atómica** en la base: un
  `UPDATE ... WHERE estado = 'libre'` que falle si otro se adelantó. Si se
  resuelve en dos pasos (consultar si está libre y después guardar), entre una
  consulta y la otra se cuela el segundo comprador.
- Hace falta **liberar los bloqueos vencidos**, con una tarea programada o
  ignorándolos en la consulta de asientos libres. Si no, las compras
  abandonadas dejan asientos trabados para siempre.

Del lado del sitio muestro una cuenta regresiva, pero corre en el navegador:
sirve para avisarle al usuario, no bloquea nada. El vencimiento real tiene que
venir en el campo `vence`, y el servidor tiene que rechazar la confirmación si
ya expiró.

**4. Confirmación**

```
POST /reservas/:id/confirmar  { pasajeros: [...], pago: {...} }
-> { pasajes: [{ numero, codigo, qr }] }
```

**5. Una consulta de arquitectura**

¿La venta web puede escribir en las mismas tablas que el mostrador? Si son
sistemas separados, el pasaje vendido en la agencia de Asunción va a seguir
apareciendo libre en el sitio. Idealmente la web es un canal de venta más
dentro de SysVentas, no un sistema aparte.

**6. Autenticación**

Para el panel privado necesito la URL base de la API, el endpoint de login y
qué devuelve (token, nombre, rol), más los roles que existen hoy.

Avisame qué de esto es viable y en qué plazo, y ajusto de mi lado.

Gracias.
