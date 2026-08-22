# 🥦 NutriHero: Misión Saludable

Un **juego educativo arcade tipo "runner de carriles"** (similar a Subway Surfers/Crossy Road en su lógica de 3 carriles) hecho en HTML5 Canvas, CSS y JavaScript puro. El objetivo es enseñar hábitos de alimentación saludable mientras el jugador viaja desde la Tierra hasta la Luna atrapando alimentos buenos y evitando la comida chatarra.

## 📖 Concepto

El jugador controla a un/a estudiante que se mueve entre **3 carriles**, atrapando alimentos que caen desde arriba. Debe elegir bien: los alimentos saludables suman puntos y energía, mientras que la comida chatarra resta energía, oscurece la pantalla y hace perder vidas. La misión se completa al superar los 3 niveles (Tierra → Cielo → Espacio) y llegar a la Luna.

## 🎮 Cómo se juega

- Movete entre los **3 carriles** con las flechas `←` `→` (o `A`/`D`), o con los botones táctiles en pantalla.
- Atrapá **alimentos saludables** (🍎🍌🥦💧🥛) para sumar puntos y energía.
- Evitá la **comida chatarra** (🍔🍟🥤🍬) y especialmente el **virus** (☠️), que hacen perder energía, restan una vida y oscurecen la pantalla.
- Las **estrellas energéticas** (⭐) son un power-up poco frecuente que otorga muchos puntos y energía.
- Encadená alimentos saludables para subir tu **multiplicador de combo** (hasta x5).
- Cada 7 aciertos consecutivos aparece una **pregunta nutricional de bonus**: responder bien da puntos y energía extra.
- Tenés **3 vidas** (❤️❤️❤️): cada alimento dañino resta una. Si tu energía llega a 0 o perdés las 3 vidas, la misión falla.
- Para avanzar de nivel hay que alcanzar el puntaje objetivo antes de que se acabe el tiempo del nivel.

## 🌍 Niveles

| Nivel | Escenario | Velocidad | Tiempo | Meta de puntos |
|---|---|---|---|---|
| 1 | 🌎 Tierra | 2.7 | 30s | 150 |
| 2 | ☁️ Cielo | 3.8 | 30s | 350 |
| 3 | 🌌 Espacio | 5.0 | 35s | 500 |

Cada nivel tiene su propio fondo animado en canvas (escuela y sol en Tierra, nubes en el Cielo, estrellas y planetas en el Espacio) y aumenta la velocidad y frecuencia de aparición de los alimentos.

## ⏸️ Pantallas del juego

- **Menú principal**: comenzar misión, tutorial y ranking.
- **Tutorial**: explica qué representa cada tipo de objeto (alimento saludable, chatarra, estrella, virus).
- **Pausa**: accesible con `Esc` o `P`, o el botón de pausa en el HUD.
- **Pregunta nutricional**: interrupción tipo trivia cada 7 combos.
- **Game Over**: se muestra al perder todas las vidas o quedarse sin energía.
- **Victoria**: se muestra al llegar a la Luna, con resumen de puntaje, mejor combo y energía restante, y opción de guardar el resultado en el ranking.
- **Ranking**: top 10 de puntajes guardados localmente en el navegador.

## 🏆 Ranking

Los puntajes se guardan en `localStorage` (clave `nutriheroRanking`), por lo que el ranking **persiste entre sesiones** en el mismo navegador/computadora, mostrando los 10 mejores puntajes con nombre de jugador.

## 🔊 Sonido

Todos los efectos de sonido (aciertos, errores, estrellas, cambio de nivel, preguntas, victoria) se generan en tiempo real con la **Web Audio API**, sin archivos de audio externos.

## 🖥️ Tecnología

- **HTML5 Canvas** para el área de juego (fondos, jugador, objetos, partículas y textos flotantes), con manejo de `devicePixelRatio` para pantallas de alta densidad.
- **CSS3** para toda la interfaz (menús, HUD, barra de energía, overlays), con diseño **responsive** (adapta el HUD y el aspect ratio del canvas para móviles).
- **JavaScript vainilla**, sin frameworks ni dependencias externas.
- Sonido generado dinámicamente con **Web Audio API**.
- Persistencia de ranking con **localStorage**.

## 📂 Estructura del proyecto

```
├── index.html   → estructura de pantallas (menú, tutorial, juego, pausa, preguntas, game over, victoria, ranking)
├── style.css    → estilos, tema visual y diseño responsive
└── script.js    → lógica del juego, canvas, física de objetos, combos, preguntas, ranking y audio
```

## ▶️ Cómo ejecutarlo

No requiere instalación ni build. Basta con abrir `index.html` en cualquier navegador moderno (Chrome, Firefox, Edge), asegurándose de que `style.css` y `script.js` estén en la misma carpeta.

```bash
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```

> 💡 Si algún navegador bloquea la carga de `script.js`/`style.css` por política de archivos locales (CORS), se recomienda servir la carpeta con un servidor local simple, por ejemplo `npx serve` o `python -m http.server`.

## 📌 Estado / próximas ideas

- [ ] Ampliar el banco de preguntas nutricionales.
- [ ] Agregar más niveles y temáticas de fondo.
- [ ] Sincronizar el ranking con un backend para competencia entre distintos dispositivos.
- [ ] Agregar dificultad adaptativa según el desempeño del jugador.

---
*Proyecto educativo sobre nutrición y hábitos alimenticios saludables, pensado para público infantil/juvenil.*