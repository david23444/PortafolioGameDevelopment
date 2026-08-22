# 🕯️ Ecos del Silencio — Novela Visual

Una **novela visual interactiva** en HTML5 + CSS + JavaScript puro, sobre el duelo, la presión social y las consecuencias de mirar hacia otro lado ante el acoso escolar (*bullying*). El jugador toma decisiones a lo largo de 9 escenas que determinan uno de dos finales posibles.

## 📖 Sinopsis

Tras la muerte de su padre —consecuencia del acoso laboral que sufrió durante años—, el protagonista debe atravesar el duelo mientras enfrenta la presión de su grupo de amigos, liderado por Marcos. A medida que avanza la historia, deberá decidir si repite los mismos patrones de silencio y complicidad que tanto le costaron a su padre, o si rompe el ciclo.

## 🎮 Mecánicas

- **Narrativa por decisiones**: cada escena presenta una disyuntiva con dos opciones, mostradas en orden aleatorio para evitar sesgos de lectura.
- **Sistema de "Conciencia"**: cada elección suma o no un punto de conciencia (karma). Al final de las 9 decisiones, el puntaje acumulado determina el desenlace:
  - **5 o más puntos → Final "Redención"**: el protagonista rompe el ciclo de silencio.
  - **Menos de 5 puntos → Final "La Caída"**: el protagonista repite el patrón que intentaba dejar atrás.
- **Barra de progreso visual** que refleja el nivel de conciencia acumulado, cambiando de color según el rumbo de la historia.
- **Reinicio dinámico**: al jugar de nuevo se genera un nuevo ID de partida, lo que varía las imágenes de fondo mostradas en cada escena.

## 🖼️ Generación de imágenes de escena

Las imágenes de fondo **no son estáticas**: se generan dinámicamente en cada escena combinando palabras clave temáticas con un *seed* único (basado en el ID de partida + escena + un número aleatorio), usando:

1. **LoremFlickr** como fuente principal.
2. **Picsum Photos** (con seed) como *fallback* si la imagen principal falla.
3. Un degradado radial de emergencia si ambas fuentes fallan, para que la pantalla nunca quede completamente negra.

Esto requiere **conexión a internet** para cargar las imágenes; el juego sigue siendo jugable sin conexión, pero mostrará el fondo de respaldo.

## ⌨️ Controles

Todo se maneja con el mouse/touch: se hace clic en la opción de diálogo deseada para avanzar la historia. No requiere teclado.

## 🖥️ Tecnología

- HTML5 + CSS3 (glassmorphism, `backdrop-filter`, transiciones y animaciones) para la interfaz tipo *visual novel*.
- JavaScript vainilla, sin frameworks ni dependencias de build.
- Diseño **responsive**, con un layout adaptado para pantallas móviles (`@media max-width: 800px`).
- Todo el juego —historia, lógica y estilos— vive en un único archivo `.html` autocontenido.

## ▶️ Cómo ejecutarlo

No requiere instalación ni build. Basta con abrir el archivo `.html` en cualquier navegador moderno (Chrome, Firefox, Edge) con conexión a internet para la carga de imágenes.

```bash
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```

## 📂 Estructura de la historia

La historia está definida como un objeto de JavaScript (`historia`), donde cada escena (`acto1` a `acto9`, más `finalBueno` y `finalMalo`) incluye:

- `personaje`: quién habla.
- `texto`: el diálogo/narración.
- `imagenKeywords`: palabras clave para generar la imagen de fondo.
- `opciones`: array de decisiones, cada una con su texto, valor de `karma` y la escena `siguiente`.

Esto facilita agregar nuevas ramas o escenas sin tocar la lógica del motor.

## 📌 Estado / próximas ideas

- [ ] Guardar el progreso o las estadísticas de finales obtenidos (localStorage).
- [ ] Agregar música ambiental y efectos de sonido.
- [ ] Sumar más ramas narrativas y finales intermedios (no solo binario bueno/malo).
- [ ] Reemplazar las imágenes generadas por arte original o ilustraciones fijas por escena.

---
*Proyecto narrativo con enfoque en concientización sobre el duelo, el bullying y la responsabilidad individual dentro de dinámicas grupales.*