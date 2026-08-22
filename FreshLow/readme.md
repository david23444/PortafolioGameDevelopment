# 🍹 Fresh Flow Arcade — Gestión de Bar

Un juego arcade de **gestión y tiempo real** (estilo *cooking/management game*) hecho en HTML5 + CSS + JavaScript puro, ambientado en un bar de jugos y bebidas sin alcohol. El jugador debe preparar pedidos combinando ingredientes en una licuadora, atender clientes antes de que se agote su paciencia, ganar dinero, pagar el alquiler y reinvertir en mejoras para hacer crecer su negocio.

## 🎮 Cómo se juega

- Cada día el bar abre a las **07:00 AM** y cierra a las **06:00 PM** (el tiempo avanza automáticamente, 1 hora del juego = 7 segundos reales).
- Van llegando **clientes** aleatorios, cada uno con un pedido específico (una receta) y una barra de **paciencia** que se agota con el tiempo.
- El jugador debe hacer clic en los **ingredientes** correctos para agregarlos a la licuadora (máximo 3 a la vez) y luego presionar **Entregar** sobre el cliente correspondiente.
- Si la combinación coincide con la receta pedida, se cobra el pedido y se suma al combo; si no coincide, se pierde el combo y la pantalla "tiembla" como penalización visual.
- Encadenar entregas correctas genera **combos**, que otorgan un bono de dinero extra cada 3 pedidos consecutivos.
- Si un cliente se queda sin paciencia, se va enojado y el combo se reinicia.
- Al cerrar el día se abre la **tienda**, donde se pueden comprar mejoras con el dinero ganado, y luego hay que pagar el **alquiler** para poder iniciar el día siguiente.

## 🧃 Recetas e ingredientes

| Receta | Ingredientes | Precio base | Requiere |
|---|---|---|---|
| Jugo Básico | Mango + Agua | $40 | — |
| Mix Frutal | Mango + Frutilla + Agua | $62 | — |
| Toque Menta | Frutilla + Menta + Agua | $88 | Menta (tienda) |
| Limonada | Limón + Agua | $58 | Limón (tienda) |
| Coco Tropical | Mango + Coco | $100 | Coco (tienda) |

Los ingredientes especiales (Menta, Limón, Coco) empiezan **bloqueados** y se desbloquean comprándolos en la tienda al final de cada día.

## 🛒 Tienda y mejoras

Al finalizar cada jornada se accede a una tienda con 7 mejoras posibles:

- **Decoraciones**: Cuadro Decorativo, Luces Festivas y Letrero de Neón — mejoran el aspecto visual del bar.
- **Licuadora Pro**: aumenta en $10 el valor de cada bebida servida.
- **Ingredientes especiales**: Menta Fresca, Limón Jugoso y Agua de Coco — desbloquean nuevas recetas.

Comprar **las 7 mejoras** desbloquea el final de victoria del juego.

## 💰 Economía y condición de derrota

- Cada día hay que pagar un **alquiler** para poder abrir al día siguiente.
- Existe una probabilidad de que ocurra un **evento nocturno aleatorio** (por ejemplo, una reparación técnica) que reste dinero al cierre del día.
- Si el dinero disponible no alcanza para pagar el alquiler, el jugador entra en **bancarrota** y el juego termina (Game Over).

## 🔊 Sonido y feedback

El juego genera sus propios efectos de sonido en tiempo real usando la **Web Audio API** (osciladores), sin necesidad de archivos de audio externos: tonos distintos para agregar ingredientes, entregar pedidos correctos, errores, compras y eventos de fin de juego.

## 🖥️ Tecnología

- HTML5 + CSS3 con estética **arcade retro** (fuentes *Press Start 2P* y *VT323*, efecto CRT de scanlines, animaciones de vibración de pantalla, toasts y textos flotantes).
- JavaScript vainilla, sin frameworks ni dependencias de build.
- Sonido generado dinámicamente con **Web Audio API** (sin archivos `.mp3`/`.wav`).
- Todo el juego —lógica, estilos y estructura— vive en un único archivo `.html` autocontenido.

## ▶️ Cómo ejecutarlo

No requiere instalación ni build. Simplemente abrí el archivo `.html` en cualquier navegador moderno (Chrome, Firefox, Edge).

```bash
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```

## 📌 Estado / próximas ideas

- [ ] Guardar el progreso entre sesiones (localStorage), incluyendo día actual, dinero y mejoras compradas.
- [ ] Agregar más recetas e ingredientes desbloqueables a medida que avanza el juego.
- [ ] Incorporar dificultad progresiva (más clientes simultáneos, paciencia más corta) según el día.
- [ ] Soporte para controles táctiles / diseño responsive para móvil.

---
*Proyecto de simulación/arcade sobre gestión de un pequeño negocio de bebidas.*