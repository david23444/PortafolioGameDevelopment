/* =========================
   ECORUSH - JUEGO SIMPLE
========================= */

let nivelActual = 1;
let puntos = 0;
let vidas = 3;
let tiempo = 60;

let basuraSeleccionada = null;
let basuraRecogida = 0;
let errores = 0;

let intervalo;


/* =========================
   CONFIGURACIÓN DE NIVELES
========================= */

const niveles = {

    1: {
        cantidad: 10,
        tiempo: 60
    },

    2: {
        cantidad: 15,
        tiempo: 50
    },

    3: {
        cantidad: 20,
        tiempo: 40
    }

};


/* =========================
   TIPOS DE BASURA
========================= */

const tiposBasura = {

    papel: [
        "Periódico",
        "Caja de cartón",
        "Hoja de papel",
        "Revista",
        "Cuaderno"
    ],

    plastico: [
        "Botella de plástico",
        "Bolsa plástica",
        "Envase de yogur",
        "Botella de agua",
        "Vaso plástico"
    ],

    vidrio: [
        "Jarra de vidrio",
        "Frasco de vidrio",
        "Botella de vidrio",
        "Copa de vidrio"
    ],

    organico: [
        "Cáscara de plátano",
        "Cáscara de huevo",
        "Manzana",
        "Restos de comida",
        "Cáscara de naranja"
    ]

};


/* =========================
   PANTALLAS
========================= */

function mostrarPantalla(id) {

    document.querySelectorAll(".pantalla")
        .forEach(p => p.classList.remove("activa"));

    document.getElementById(id)
        .classList.add("activa");
}


function volverMenu() {

    clearInterval(intervalo);

    mostrarPantalla("menu");
}


function mostrarComoJugar() {

    mostrarPantalla("instrucciones");
}


/* =========================
   INICIAR JUEGO
========================= */

function iniciarJuego() {

    nivelActual = 1;
    puntos = 0;

    comenzarNivel();
}


/* =========================
   COMENZAR NIVEL
========================= */

function comenzarNivel() {

    mostrarPantalla("juego");

    const nivel = niveles[nivelActual];

    tiempo = nivel.tiempo;

    vidas = 3;

    basuraRecogida = 0;

    errores = 0;

    basuraSeleccionada = null;

    actualizarInterfaz();

    crearBasura();

    iniciarTemporizador();
}


/* =========================
   CREAR BASURA
========================= */

function crearBasura() {

    const zona = document.getElementById("basura");

    zona.innerHTML = "";

    const cantidad =
        niveles[nivelActual].cantidad;

    const tipos = [
        "papel",
        "plastico",
        "vidrio",
        "organico"
    ];


    for (let i = 0; i < cantidad; i++) {

        const tipo =
            tipos[
                Math.floor(Math.random() * tipos.length)
            ];

        const opciones =
            tiposBasura[tipo];

        const simbolo =
            opciones[
                Math.floor(Math.random() * opciones.length)
            ];


        const objeto =
            document.createElement("div");

        objeto.className = "basura";

        objeto.textContent = simbolo;

        objeto.dataset.tipo = tipo;


        /*
            Posiciones aleatorias.
            Evitamos la parte inferior
            donde están los contenedores.
        */

        objeto.style.left =
            (5 + Math.random() * 88) + "%";

        objeto.style.top =
            (18 + Math.random() * 48) + "%";


        objeto.onclick = function() {

            seleccionarBasura(this);

        };


        zona.appendChild(objeto);
    }
}


/* =========================
   SELECCIONAR BASURA
========================= */

function seleccionarBasura(objeto) {

    document.querySelectorAll(".basura")
        .forEach(b => {
            b.classList.remove("seleccionada");
        });

    basuraSeleccionada = objeto;

    objeto.classList.add("seleccionada");

    mostrarMensaje(
        "Ahora elige el contenedor correcto"
    );
}


/* =========================
   CLASIFICAR
========================= */

function clasificar(tipoContenedor) {

    if (!basuraSeleccionada) {

        mostrarMensaje(
            "Primero selecciona un residuo"
        );

        return;
    }


    const tipoCorrecto =
        basuraSeleccionada.dataset.tipo;


    if (tipoCorrecto === tipoContenedor) {

        /* CORRECTO */

        puntos += 100;

        basuraRecogida++;

        mostrarMensaje(
            "¡Correcto! +100 puntos"
        );

        basuraSeleccionada.remove();

        basuraSeleccionada = null;


        if (
            basuraRecogida >=
            niveles[nivelActual].cantidad
        ) {

            setTimeout(
                nivelCompletado,
                600
            );
        }

    } else {

        /* INCORRECTO */

        vidas--;

        errores++;

        puntos =
            Math.max(0, puntos - 50);

        mostrarMensaje(
            "¡Incorrecto! -1 vida"
        );

        basuraSeleccionada
            .classList.remove("seleccionada");

        basuraSeleccionada = null;


        if (vidas <= 0) {

            setTimeout(
                perderJuego,
                700
            );
        }
    }


    actualizarInterfaz();
}


/* =========================
   MENSAJE
========================= */

function mostrarMensaje(texto) {

    const mensaje =
        document.getElementById("mensaje");

    mensaje.textContent = texto;

    mensaje.classList.add("mostrar");


    setTimeout(() => {

        mensaje.classList.remove("mostrar");

    }, 1200);
}


/* =========================
   INTERFAZ
========================= */

function actualizarInterfaz() {

    document.getElementById("nivel")
        .textContent = nivelActual;

    document.getElementById("puntos")
        .textContent = puntos;

    document.getElementById("tiempo")
        .textContent = tiempo;

    document.getElementById("vidas")
        .textContent = vidas;


    document.getElementById("contador")
        .textContent =
        basuraRecogida +
        " / " +
        niveles[nivelActual].cantidad;


    const porcentaje =
        (
            basuraRecogida /
            niveles[nivelActual].cantidad
        ) * 100;


    document.getElementById("barraProgreso")
        .style.width =
        porcentaje + "%";
}


/* =========================
   TEMPORIZADOR
========================= */

function iniciarTemporizador() {

    clearInterval(intervalo);


    intervalo = setInterval(() => {

        tiempo--;

        actualizarInterfaz();


        if (tiempo <= 0) {

            clearInterval(intervalo);

            perderJuego();
        }

    }, 1000);
}


/* =========================
   NIVEL COMPLETADO
========================= */

function nivelCompletado() {

    clearInterval(intervalo);

    document.getElementById("iconoResultado")
        .textContent = "+";


    document.getElementById("tituloResultado")
        .textContent =
        "¡Nivel completado!";


    document.getElementById("textoResultado")
        .textContent =
        "La ciudad está más limpia gracias a ti.";


    document.getElementById("puntosFinal")
        .textContent = puntos;


    const boton =
        document.getElementById("botonResultado");


    if (nivelActual < 3) {

        boton.textContent =
            "SIGUIENTE NIVEL";

        boton.onclick =
            siguienteNivel;

    } else {

        boton.textContent =
            "¡TERMINAR!";

        boton.onclick =
            victoriaFinal;
    }


    mostrarPantalla("resultado");
}


/* =========================
   SIGUIENTE NIVEL
========================= */

function siguienteNivel() {

    nivelActual++;

    comenzarNivel();
}


/* =========================
   VICTORIA FINAL
========================= */

function victoriaFinal() {

    clearInterval(intervalo);

    document.getElementById("iconoResultado")
        .textContent = "★";


    document.getElementById("tituloResultado")
        .textContent =
        "¡Eres un héroe del reciclaje!";


    document.getElementById("textoResultado")
        .textContent =
        "Completaste todos los niveles de EcoRush.";


    document.getElementById("puntosFinal")
        .textContent = puntos;


    document.getElementById("botonResultado")
        .textContent =
        "JUGAR DE NUEVO";


    document.getElementById("botonResultado")
        .onclick =
        iniciarJuego;
}


/* =========================
   DERROTA
========================= */

function perderJuego() {

    clearInterval(intervalo);

    document.getElementById("iconoResultado")
        .textContent = "!";


    document.getElementById("tituloResultado")
        .textContent =
        "¡Casi lo logras!";


    if (vidas <= 0) {

        document.getElementById("textoResultado")
            .textContent =
            "Te quedaste sin vidas. ¡Inténtalo otra vez!";

    } else {

        document.getElementById("textoResultado")
            .textContent =
            "Se terminó el tiempo. ¡Inténtalo otra vez!";
    }


    document.getElementById("puntosFinal")
        .textContent = puntos;


    document.getElementById("botonResultado")
        .textContent =
        "REINTENTAR";


    document.getElementById("botonResultado")
        .onclick =
        comenzarNivel;


    mostrarPantalla("resultado");
}