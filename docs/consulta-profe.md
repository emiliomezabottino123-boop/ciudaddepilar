# Consulta al profesor — reservas online

> **RESUELTO el 21/08/2026.** El profesor definió que por ahora la entrega es
> solo el sitio institucional, sin conectar con SysVentas. Este mensaje no hace
> falta enviarlo; queda archivado por si se retoma la integración más adelante.

---


El backend (SysVentas) lo maneja otra persona. Este mensaje es para el
profesor: valida el planteo técnico y define cómo seguir, no implementa nada.

Para el pedido a quien maneja el backend hay una base en la sección 8 de
`DOCUMENTACION.md`, con los contratos de API ya escritos.

---

Buenas, profe. Le comparto en qué está el proyecto del sitio de Empresa de
Transporte Ciudad de Pilar y le hago dos consultas, porque llegué a un punto
que depende de otra persona.

**Lo que ya está hecho**

El sitio institucional está terminado en React: inicio, quiénes somos,
servicios, horarios y contactos, con los horarios de salida y los teléfonos
reales de las agencias de Asunción, Ñemby y Pilar. El login y el panel privado
están armados y preparados para conectarse a SysVentas.

Sumé también un prototipo de compra de pasajes en tres pasos: mapa de asientos
con los dos pisos de la unidad, formulario con los datos de cada pasajero y
pantalla de confirmación. Anda de punta a punta, pero con datos simulados.

**Dónde me trabé**

Para que la venta online funcione de verdad, el backend tiene que resolver
tres cosas que no puedo hacer desde el frontend:

1. **Bloquear los asientos** mientras la persona completa la compra, con un
   vencimiento. Sin eso, dos personas eligen el mismo asiento al mismo tiempo
   y las dos pagan. Puse un contador en pantalla, pero corre en el navegador:
   avisa al usuario, no bloquea nada.
2. **Liberar los bloqueos vencidos**, para que las compras abandonadas no
   dejen asientos trabados.
3. **Que la web escriba en las mismas tablas que el mostrador**, porque si no
   el pasaje vendido en la agencia sigue apareciendo libre en el sitio.

Dejé documentados los endpoints que haría falta que exponga, con el formato de
las respuestas, así se acuerda el contrato antes de que cada parte avance por
su lado.

**Mis consultas**

1. ¿Le parece correcto el planteo antes de que se lo pase a quien maneja
   SysVentas? Si ve que falta algo o que lo estoy encarando mal, prefiero
   corregirlo ahora y no después de acordar el contrato.
2. ¿Prefiere que se lo pida directamente o que la coordinación pase por
   usted?
3. Si del otro lado no llegan a estar los endpoints en el plazo del trabajo,
   ¿es válido que entregue el prototipo con datos simulados y el contrato de
   integración documentado, o el trabajo tiene que quedar funcionando contra
   el sistema real?
4. ¿El alcance incluye pasarela de pago (Bancard, billeteras) o alcanza con
   que la persona reserve online y pague en la agencia? La segunda opción
   evita integrar la pasarela y ya resuelve la mayor parte del problema.

Cuando quiera le muestro el prototipo andando para que vea el flujo completo.

Saludos.
