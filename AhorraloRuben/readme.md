# 💧 ¡Ahorra el Agua! – Edición Arcade

Un mini-juego arcade estilo *plataformas* (inspirado en Donkey Kong) hecho en **HTML5 Canvas + JavaScript puro**, con el objetivo de concientizar sobre el ahorro de agua. El jugador debe recorrer un edificio de varios pisos, subir escaleras y arreglar ventanas/canillas que desperdician agua antes de que se acabe el tiempo.

## 🎮 Cómo se juega

- Movete por el edificio, subí y bajá escaleras, y saltá entre pisos.
- Acercate a una ventana con problema de desperdicio y presioná **E** para repararla.
- Cada nivel ("mundo") tiene una **cuota de reparaciones** que cumplir antes de que se acabe el tiempo.
- Encadená reparaciones rápido para generar **combos** y multiplicar tu puntaje.
- Recolectá **potenciadores** que aparecen aleatoriamente por el mapa.
- Al perder, si tu puntaje entra en el top 10, podés ingresar tus iniciales a la **tabla de honor**.

## ⌨️ Controles

| Tecla | Acción |
|---|---|
| ← → | Moverse |
| ↑ ↓ | Subir / bajar escaleras |
| Espacio | Saltar |
| E | Arreglar ventana |
| P | Pausar / reanudar |

En la pantalla de ingreso de iniciales: **↑↓** cambia la letra, **← →** mueve el cursor, **Enter** confirma.

## ⚡ Potenciadores

- ⏱️ **Tiempo Extra** – suma segundos al reloj del nivel.
- ⚡ **Súper Velocidad** – aumenta la velocidad de movimiento temporalmente.
- ❄️ **Congelar Tiempo** – detiene el reloj y la aparición de nuevas ventanas.
- 🔧 **Reparación Total** – arregla instantáneamente todas las ventanas activas.

## 🌍 Progresión de niveles

Cada mundo aumenta la dificultad: menos tiempo disponible, ventanas que aparecen con mayor frecuencia y una cuota más alta. Los fondos (día, atardecer, noche, alienígena) rotan cíclicamente cada 4 niveles, dando variedad visual a medida que se avanza.

## 🖥️ Tecnología

- HTML5 `<canvas>` para el renderizado del juego (fondo pre-renderizado en un canvas offscreen para optimizar performance).
- JavaScript vainilla, sin librerías ni dependencias externas (salvo la tipografía *Press Start 2P* de Google Fonts).
- CSS con efecto **CRT retro** (scanlines, viñeta y barrido) para reforzar la estética arcade.
- Todo el juego vive en un único archivo `.html` autocontenido.

## ▶️ Cómo ejecutarlo

No requiere instalación ni build. Simplemente abrí el archivo `.html` en cualquier navegador moderno (Chrome, Firefox, Edge).

```bash
# Opción rápida: abrir directo
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```

## 📌 Estado / próximas ideas

- [ ] Guardar el leaderboard en `localStorage` o backend para que persista entre sesiones.
- [ ] Agregar efectos de sonido y música.
- [ ] Soporte para controles táctiles / móvil.
- [ ] Nuevos tipos de desperdicio de agua y mundos adicionales.

---
*Proyecto educativo/lúdico sobre el uso responsable del agua.*