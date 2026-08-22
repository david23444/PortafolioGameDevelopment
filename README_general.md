# 🎮 Colección de Juegos Web Educativos

Repositorio con una serie de **mini-juegos web** desarrollados en **HTML5, CSS3 y JavaScript vainilla** (sin frameworks ni build tools), enfocados en concientización y educación: agua, alimentación saludable, reciclaje y narrativa social. Cada proyecto es autocontenido y corre directamente en el navegador.

## 📚 Proyectos incluidos

| Proyecto | Género | Descripción breve |
|---|---|---|
| 💧 [¡Salva el Agua! — Edición Arcade](#-salva-el-agua--edición-arcade) | Plataformas / Arcade | Repará ventanas con fugas de agua en un edificio de varios pisos antes de que se acabe el tiempo. |
| 🕯️ [Ecos del Silencio](#️-ecos-del-silencio) | Novela visual | Historia interactiva sobre el duelo y el bullying, con decisiones que determinan el final. |
| 🍹 [Fresh Flow Arcade](#-fresh-flow-arcade) | Gestión / Time management | Administrá un bar de jugos: atendé clientes, combiná ingredientes y hacé crecer el negocio. |
| 🥦 [NutriDash: Misión Saludable](#-nutridash-misión-saludable) | Runner de carriles | Viajá de la Tierra a la Luna atrapando alimentos saludables y evitando comida chatarra. |
| ♻️ [EcoRush](#️-ecorush) | Clasificación / Contrarreloj | Clasificá residuos en las categorías correctas de reciclaje antes de que se acabe el tiempo. |

Todos comparten el mismo espíritu: **jugar para aprender**, con mecánicas simples, feedback inmediato (sonido, partículas, combos) y progresión por niveles.

---

## 💧 ¡Salva el Agua! — Edición Arcade

Juego de plataformas estilo *Donkey Kong* donde el jugador recorre un edificio subiendo escaleras y saltando entre pisos para reparar ventanas y canillas que desperdician agua, antes de que se acabe el tiempo de cada "mundo".

- **Mecánicas clave:** cuota de reparaciones por nivel, combos por reparaciones encadenadas, potenciadores (tiempo extra, velocidad, congelar tiempo, reparación total), tabla de puntajes con ingreso de iniciales estilo arcade.
- **Progresión:** dificultad creciente (menos tiempo, más frecuencia de fugas) y fondos temáticos que rotan cada 4 niveles.
- **Tecnología:** HTML5 Canvas + JS vainilla, efecto visual CRT retro.

## 🕯️ Ecos del Silencio

Novela visual interactiva sobre un adolescente que, tras la muerte de su padre por acoso laboral, debe decidir si repite o rompe el ciclo de silencio y complicidad frente al bullying en su entorno escolar.

- **Mecánicas clave:** 9 decisiones binarias, sistema de "Conciencia" (karma) que determina uno de dos finales, opciones mostradas en orden aleatorio.
- **Detalle técnico distintivo:** las imágenes de fondo de cada escena se generan dinámicamente (LoremFlickr con *fallback* a Picsum Photos) usando un seed único por partida.
- **Tecnología:** HTML/CSS con estética *glassmorphism* y JS vainilla, sin dependencia de imágenes fijas.

## 🍹 Fresh Flow Arcade

Juego de gestión de un bar de jugos y bebidas sin alcohol. Hay que combinar ingredientes en una licuadora para cumplir los pedidos de clientes con paciencia limitada, ganar dinero, pagar el alquiler y reinvertir en mejoras.

- **Mecánicas clave:** recetas con ingredientes desbloqueables, barra de paciencia por cliente, combos con bonificación de dinero, tienda de mejoras (decoración y upgrades), eventos aleatorios nocturnos y condición de bancarrota.
- **Tecnología:** HTML/CSS con estética arcade retro (fuentes *Press Start 2P*/*VT323*, scanlines CRT), sonido generado en tiempo real con **Web Audio API**.

## 🥦 NutriDash: Misión Saludable

Runner de 3 carriles en el que el jugador atrapa alimentos saludables y esquiva comida chatarra en un viaje de la Tierra a la Luna, dividido en 3 niveles con dificultad creciente.

- **Mecánicas clave:** combos y multiplicador de puntos, sistema de vidas y energía, preguntas nutricionales de bonus cada 7 aciertos, power-up de estrella energética.
- **Persistencia:** ranking top 10 guardado en `localStorage`, disponible entre sesiones.
- **Tecnología:** HTML5 Canvas responsive (controles táctiles incluidos), CSS3 y JS vainilla, sonido vía Web Audio API.

## ♻️ EcoRush

Juego contrarreloj de clasificación de residuos: el jugador debe asignar cada objeto a su categoría correcta de reciclaje (papel, plástico, vidrio u orgánico) antes de que se acabe el tiempo.

- **Mecánicas clave:** 3 niveles de dificultad creciente (más residuos, menos tiempo), sistema de vidas y puntuación (+100 por acierto, -1 vida/-50 puntos por error o vencimiento del tiempo).
- **Tecnología:** HTML5 + CSS3 (variables, gradientes, animaciones, tipografía *Baloo 2*) + JS vainilla, diseño responsive para escritorio y móvil.

---

## 🛠️ Stack común

Todos los proyectos de esta colección comparten el mismo enfoque técnico:

- **HTML5** semántico para la estructura de pantallas (menú, tutorial, juego, pausa, resultados).
- **CSS3** puro para estilos, animaciones y diseño responsive — sin librerías de UI.
- **JavaScript vainilla (ES6+)**, sin frameworks ni herramientas de build.
- Efectos de sonido generados en tiempo real con **Web Audio API** cuando aplica (sin archivos de audio externos).
- Persistencia liviana con **`localStorage`** para rankings, cuando corresponde.

No requieren instalación, `npm install` ni servidor: cada juego es uno o varios archivos estáticos (`.html` / `.css` / `.js`) que se abren directamente en el navegador.

## ▶️ Cómo ejecutar cualquiera de los juegos

```bash
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```

> 💡 Si un proyecto separa `index.html`, `style.css` y `script.js` en archivos distintos, mantenelos en la misma carpeta. Si el navegador bloquea la carga por políticas de archivos locales, serví la carpeta con un servidor simple (`npx serve`, `python -m http.server`, etc.).

## 📌 Próximos pasos generales

- [ ] Unificar todos los proyectos bajo una página índice (portfolio) con acceso directo a cada juego.
- [ ] Agregar rankings compartidos (backend) en los juegos que hoy usan `localStorage`.
- [ ] Sumar soporte de audio ambiental/música de fondo en los que aún no lo tienen.
- [ ] Traducir la colección a otros idiomas.

---
*Colección de proyectos lúdico-educativos sobre sostenibilidad, salud y convivencia, pensados para concientizar mientras se juega.*
