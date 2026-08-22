/* =========================================================
   NUTRIHERO: MISIÓN SALUDABLE
   Juego educativo HTML5 Canvas
========================================================= */


/* =========================================================
   CANVAS
========================================================= */

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");


/* =========================================================
   ELEMENTOS HTML
========================================================= */

const screens = {
    start: document.getElementById("startScreen"),
    tutorial: document.getElementById("tutorialScreen"),
    ranking: document.getElementById("rankingScreen"),
    game: document.getElementById("gameScreen"),
    pause: document.getElementById("pauseScreen"),
    question: document.getElementById("questionScreen"),
    gameOver: document.getElementById("gameOverScreen"),
    victory: document.getElementById("victoryScreen")
};

const scoreElement = document.getElementById("score");
const comboElement = document.getElementById("combo");
const livesElement = document.getElementById("lives");
const timerElement = document.getElementById("timer");
const energyFill = document.getElementById("energyFill");
const energyText = document.getElementById("energyText");
const levelName = document.getElementById("levelName");
const levelProgress = document.getElementById("levelProgress");

const darkOverlay = document.getElementById("darkOverlay");
const levelMessage = document.getElementById("levelMessage");


/* =========================================================
   AUDIO
========================================================= */

let audioContext = null;

function initAudio() {

    if (!audioContext) {
        audioContext =
            new (window.AudioContext ||
                window.webkitAudioContext)();
    }

    if (audioContext.state === "suspended") {
        audioContext.resume();
    }
}


function playSound(type) {

    if (!audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    let frequency = 440;
    let duration = .12;

    if (type === "good") {
        frequency = 650;
    }

    if (type === "bad") {
        frequency = 130;
        duration = .25;
    }

    if (type === "star") {
        frequency = 900;
        duration = .2;
    }

    if (type === "level") {
        frequency = 750;
        duration = .35;
    }

    if (type === "question") {
        frequency = 550;
    }

    if (type === "victory") {
        frequency = 1000;
        duration = .5;
    }

    oscillator.frequency.value = frequency;
    oscillator.type = "sine";

    gain.gain.setValueAtTime(.12, audioContext.currentTime);

    gain.gain.exponentialRampToValueAtTime(
        .001,
        audioContext.currentTime + duration
    );

    oscillator.start();

    oscillator.stop(
        audioContext.currentTime + duration
    );
}


/* =========================================================
   CONFIGURACIÓN DEL JUEGO
========================================================= */

const LEVELS = [

    {
        name: "🌎 NIVEL 1 — TIERRA",
        theme: "earth",
        speed: 2.7,
        spawnRate: 850,
        time: 30,
        goal: 150
    },

    {
        name: "☁️ NIVEL 2 — CIELO",
        theme: "sky",
        speed: 3.8,
        spawnRate: 700,
        time: 30,
        goal: 350
    },

    {
        name: "🌌 NIVEL 3 — ESPACIO",
        theme: "space",
        speed: 5,
        spawnRate: 580,
        time: 35,
        goal: 500
    }

];


/* =========================================================
   OBJETOS DEL JUEGO
========================================================= */

const healthyFoods = [
    {
        emoji: "🍎",
        name: "Manzana",
        points: 25,
        energy: 8
    },

    {
        emoji: "🍌",
        name: "Banana",
        points: 25,
        energy: 8
    },

    {
        emoji: "🥦",
        name: "Brócoli",
        points: 35,
        energy: 10
    },

    {
        emoji: "💧",
        name: "Agua",
        points: 30,
        energy: 12
    },

    {
        emoji: "🥛",
        name: "Leche",
        points: 30,
        energy: 10
    }
];


const junkFoods = [
    {
        emoji: "🍔",
        name: "Hamburguesa",
        points: -20,
        energy: -15
    },

    {
        emoji: "🍟",
        name: "Papas fritas",
        points: -20,
        energy: -15
    },

    {
        emoji: "🥤",
        name: "Gaseosa",
        points: -25,
        energy: -18
    },

    {
        emoji: "🍬",
        name: "Dulces",
        points: -15,
        energy: -12
    },

    {
        emoji: "☠️",
        name: "Virus",
        points: -35,
        energy: -25
    }
];


/* =========================================================
   ESTADO DEL JUEGO
========================================================= */

let game = {

    running: false,

    paused: false,

    level: 0,

    score: 0,

    energy: 100,

    lives: 3,

    combo: 0,

    bestCombo: 0,

    multiplier: 1,

    time: 30,

    objects: [],

    particles: [],

    lastSpawn: 0,

    lastTime: 0,

    questionAvailable: true,

    darkLevel: 0

};


/* =========================================================
   JUGADOR
========================================================= */

const player = {

    lane: 1,

    x: 0,

    y: 0,

    width: 60,

    height: 60,

    emoji: "🧑‍🎓",

    targetX: 0
};


/* =========================================================
   CONFIGURAR CANVAS
========================================================= */

function resizeCanvas() {

    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * devicePixelRatio;
    canvas.height = rect.height * devicePixelRatio;

    ctx.setTransform(
        devicePixelRatio,
        0,
        0,
        devicePixelRatio,
        0,
        0
    );

    player.y =
        rect.height - 85;

    updatePlayerPosition();
}


function getCanvasWidth() {

    return canvas.clientWidth;
}


function getCanvasHeight() {

    return canvas.clientHeight;
}


function getLaneX(lane) {

    const width = getCanvasWidth();

    const laneWidth = width / 3;

    return laneWidth * lane + laneWidth / 2;
}


function updatePlayerPosition() {

    player.targetX = getLaneX(player.lane);

    if (!player.x) {
        player.x = player.targetX;
    }
}


/* =========================================================
   PANTALLAS
========================================================= */

function showScreen(screen) {

    Object.values(screens).forEach(s => {

        s.classList.remove("active");

    });

    screen.classList.add("active");
}


/* =========================================================
   INICIAR JUEGO
========================================================= */

function startGame() {

    initAudio();

    game.running = true;
    game.paused = false;

    game.level = 0;

    game.score = 0;

    game.energy = 100;

    game.lives = 3;

    game.combo = 0;

    game.bestCombo = 0;

    game.multiplier = 1;

    game.objects = [];

    game.particles = [];

    game.darkLevel = 0;

    game.questionAvailable = true;

    player.lane = 1;

    player.x = 0;

    setLevel(0);

    showScreen(screens.game);

    resizeCanvas();

    game.lastTime = performance.now();

    requestAnimationFrame(gameLoop);
}


/* =========================================================
   NIVEL
========================================================= */

function setLevel(index) {

    game.level = index;

    const level = LEVELS[index];

    game.time = level.time;

    levelName.textContent = level.name;

    levelProgress.textContent =
        `NIVEL ${index + 1} / 3`;

    showLevelMessage(level.name);

    playSound("level");

}


function showLevelMessage(text) {

    levelMessage.textContent = text;

    levelMessage.style.opacity = "1";

    setTimeout(() => {

        levelMessage.style.opacity = "0";

    }, 1600);
}


/* =========================================================
   MOVIMIENTO
========================================================= */

function moveLeft() {

    if (!game.running || game.paused) return;

    if (player.lane > 0) {

        player.lane--;

        updatePlayerPosition();

    }
}


function moveRight() {

    if (!game.running || game.paused) return;

    if (player.lane < 2) {

        player.lane++;

        updatePlayerPosition();

    }
}


document.addEventListener("keydown", event => {

    if (event.key === "ArrowLeft" ||
        event.key.toLowerCase() === "a") {

        moveLeft();

    }

    if (event.key === "ArrowRight" ||
        event.key.toLowerCase() === "d") {

        moveRight();

    }

    if (event.key === "Escape" ||
        event.key.toLowerCase() === "p") {

        togglePause();

    }

});


/* =========================================================
   CONTROLES TÁCTILES
========================================================= */

document.getElementById("leftBtn")
    .addEventListener("pointerdown", moveLeft);

document.getElementById("rightBtn")
    .addEventListener("pointerdown", moveRight);


/* =========================================================
   CREAR OBJETOS
========================================================= */

function spawnObject() {

    const level = LEVELS[game.level];

    const lane =
        Math.floor(Math.random() * 3);

    const isHealthy =
        Math.random() < .68;

    let data;

    if (isHealthy) {

        data =
            healthyFoods[
            Math.floor(
                Math.random() *
                healthyFoods.length
            )
            ];

    } else {

        data =
            junkFoods[
            Math.floor(
                Math.random() *
                junkFoods.length
            )
            ];

    }

    const isStar =
        Math.random() < .06;

    if (isStar) {

        data = {
            emoji: "⭐",
            name: "Estrella energética",
            points: 60,
            energy: 20,
            star: true
        };

    }

    game.objects.push({

        lane,

        x: getLaneX(lane),

        y: -60,

        size: 48,

        speed:
            level.speed *
            (0.9 + Math.random() * .35),

        ...data

    });

}


/* =========================================================
   ACTUALIZAR OBJETOS
========================================================= */

function updateObjects(delta) {

    const level = LEVELS[game.level];

    game.objects.forEach(object => {

        object.y +=
            object.speed *
            delta *
            0.06;

    });


    /* Colisiones */

    game.objects.forEach((object, index) => {

        const distanceY =
            Math.abs(
                object.y - player.y
            );

        const sameLane =
            object.lane === player.lane;

        if (
            sameLane &&
            distanceY < 55
        ) {

            collectObject(object);

            game.objects.splice(index, 1);

        }

    });


    /* Eliminar objetos */

    game.objects =
        game.objects.filter(
            object =>
                object.y <
                getCanvasHeight() + 80
        );


    /* Spawn */

    const now = performance.now();

    if (
        now - game.lastSpawn >
        level.spawnRate
    ) {

        spawnObject();

        game.lastSpawn = now;

    }

}


/* =========================================================
   RECOGER OBJETO
========================================================= */

function collectObject(object) {

    createParticles(
        object.x,
        object.y,
        object.star
            ? "#ffe34f"
            : object.energy > 0
                ? "#45e884"
                : "#ff5267"
    );


    /* ALIMENTO SALUDABLE */

    if (object.energy > 0) {

        game.combo++;

        if (game.combo > game.bestCombo) {
            game.bestCombo =
                game.combo;
        }

        game.multiplier =
            Math.min(
                5,
                1 +
                Math.floor(
                    game.combo / 3
                )
            );

        const gainedPoints =
            object.points *
            game.multiplier;

        game.score += gainedPoints;

        game.energy =
            Math.min(
                100,
                game.energy +
                object.energy
            );

        if (object.star) {

            playSound("star");

            showFloatingText(
                `⭐ +${gainedPoints}`,
                object.x,
                object.y
            );

        } else {

            playSound("good");

            showFloatingText(
                `+${gainedPoints}`,
                object.x,
                object.y
            );

        }


        /* Pregunta nutricional */

        if (
            game.combo > 0 &&
            game.combo % 7 === 0 &&
            game.questionAvailable
        ) {

            openQuestion();

        }

    }


    /* ALIMENTO DAÑINO */

    else {

        game.combo = 0;

        game.multiplier = 1;

        game.energy =
            Math.max(
                0,
                game.energy +
                object.energy
            );

        game.darkLevel =
            Math.min(
                0.82,
                game.darkLevel + 0.18
            );

        updateDarkness();

        playSound("bad");

        showFloatingText(
            `${object.emoji} ${object.energy}`,
            object.x,
            object.y
        );

        loseLife();

    }


    updateHUD();

}


/* =========================================================
   VIDAS
========================================================= */

function loseLife() {

    game.lives--;

    if (game.lives < 0) {
        game.lives = 0;
    }

    if (game.lives <= 0) {

        endGame();

    }

}


/* =========================================================
   OSCURECIMIENTO
========================================================= */

function updateDarkness() {

    darkOverlay.style.background =
        `rgba(0, 0, 0, ${game.darkLevel})`;

    if (game.darkLevel >= .35) {

        darkOverlay.classList.add("danger");

    } else {

        darkOverlay.classList.remove("danger");

    }

}


/* =========================================================
   PARTÍCULAS
========================================================= */

function createParticles(x, y, color) {

    for (let i = 0; i < 12; i++) {

        game.particles.push({

            x,
            y,

            vx:
                (Math.random() - .5) *
                5,

            vy:
                (Math.random() - .5) *
                5,

            life: 1,

            color

        });

    }

}


function updateParticles(delta) {

    game.particles.forEach(p => {

        p.x += p.vx;

        p.y += p.vy;

        p.vy += .08;

        p.life -=
            delta * .002;

    });

    game.particles =
        game.particles.filter(
            p => p.life > 0
        );

}


function drawParticles() {

    game.particles.forEach(p => {

        ctx.globalAlpha = p.life;

        ctx.fillStyle = p.color;

        ctx.beginPath();

        ctx.arc(
            p.x,
            p.y,
            4,
            0,
            Math.PI * 2
        );

        ctx.fill();

    });

    ctx.globalAlpha = 1;

}


/* =========================================================
   TEXTO FLOTANTE
========================================================= */

let floatingTexts = [];


function showFloatingText(text, x, y) {

    floatingTexts.push({

        text,

        x,

        y,

        life: 1

    });

}


function updateFloatingTexts(delta) {

    floatingTexts.forEach(t => {

        t.y -= .7;

        t.life -=
            delta * .001;

    });

    floatingTexts =
        floatingTexts.filter(
            t => t.life > 0
        );

}


function drawFloatingTexts() {

    floatingTexts.forEach(t => {

        ctx.globalAlpha = t.life;

        ctx.fillStyle = "white";

        ctx.font = "bold 20px Arial";

        ctx.textAlign = "center";

        ctx.fillText(
            t.text,
            t.x,
            t.y
        );

    });

    ctx.globalAlpha = 1;

}


/* =========================================================
   FONDOS
========================================================= */

function drawBackground() {

    const width = getCanvasWidth();
    const height = getCanvasHeight();

    const theme =
        LEVELS[game.level].theme;


    /* TIERRA */

    if (theme === "earth") {

        const gradient =
            ctx.createLinearGradient(
                0,
                0,
                0,
                height
            );

        gradient.addColorStop(
            0,
            "#64c9ff"
        );

        gradient.addColorStop(
            1,
            "#b8f28b"
        );

        ctx.fillStyle = gradient;

        ctx.fillRect(
            0,
            0,
            width,
            height
        );


        /* Sol */

        ctx.fillStyle = "#ffe66d";

        ctx.beginPath();

        ctx.arc(
            width - 70,
            70,
            40,
            0,
            Math.PI * 2
        );

        ctx.fill();


        /* Escuela */

        ctx.fillStyle = "#ffca7a";

        ctx.fillRect(
            width / 2 - 100,
            80,
            200,
            100
        );

        ctx.fillStyle = "#c84d4d";

        ctx.beginPath();

        ctx.moveTo(
            width / 2 - 125,
            80
        );

        ctx.lineTo(
            width / 2,
            20
        );

        ctx.lineTo(
            width / 2 + 125,
            80
        );

        ctx.closePath();

        ctx.fill();


        /* Césped */

        ctx.fillStyle = "#52bd64";

        ctx.fillRect(
            0,
            height - 100,
            width,
            100
        );

    }


    /* CIELO */

    if (theme === "sky") {

        const gradient =
            ctx.createLinearGradient(
                0,
                0,
                0,
                height
            );

        gradient.addColorStop(
            0,
            "#4aa7ff"
        );

        gradient.addColorStop(
            1,
            "#d8f4ff"
        );

        ctx.fillStyle = gradient;

        ctx.fillRect(
            0,
            0,
            width,
            height
        );


        drawCloud(
            130,
            100,
            1
        );

        drawCloud(
            width - 180,
            180,
            1.2
        );

        drawCloud(
            width / 2,
            50,
            .8
        );

    }


    /* ESPACIO */

    if (theme === "space") {

        ctx.fillStyle = "#050719";

        ctx.fillRect(
            0,
            0,
            width,
            height
        );


        /* Estrellas */

        for (
            let i = 0;
            i < 60;
            i++
        ) {

            const x =
                (i * 97) % width;

            const y =
                (i * 53) % height;

            const size =
                (i % 3) + 1;

            ctx.fillStyle =
                i % 5 === 0
                    ? "#ffe56b"
                    : "#ffffff";

            ctx.fillRect(
                x,
                y,
                size,
                size
            );

        }


        /* Tierra */

        ctx.font = "90px Arial";

        ctx.textAlign = "center";

        ctx.fillText(
            "🌎",
            width / 2,
            110
        );


        /* Luna */

        ctx.font = "80px Arial";

        ctx.fillText(
            "🌙",
            width - 90,
            90
        );

    }


    /* Carriles */

    drawLanes();

}


function drawCloud(x, y, scale) {

    ctx.fillStyle =
        "rgba(255,255,255,.8)";

    ctx.beginPath();

    ctx.arc(
        x,
        y,
        30 * scale,
        0,
        Math.PI * 2
    );

    ctx.arc(
        x + 35 * scale,
        y - 10 * scale,
        40 * scale,
        0,
        Math.PI * 2
    );

    ctx.arc(
        x + 75 * scale,
        y,
        30 * scale,
        0,
        Math.PI * 2
    );

    ctx.fill();

}


function drawLanes() {

    const width = getCanvasWidth();
    const height = getCanvasHeight();

    const laneWidth =
        width / 3;


    for (let i = 0; i < 3; i++) {

        ctx.fillStyle =
            "rgba(20,25,45,.13)";

        ctx.fillRect(
            i * laneWidth,
            0,
            laneWidth,
            height
        );

        if (i > 0) {

            ctx.strokeStyle =
                "rgba(255,255,255,.12)";

            ctx.lineWidth = 2;

            ctx.setLineDash([
                10,
                15
            ]);

            ctx.beginPath();

            ctx.moveTo(
                i * laneWidth,
                0
            );

            ctx.lineTo(
                i * laneWidth,
                height
            );

            ctx.stroke();

            ctx.setLineDash([]);

        }

    }

}


/* =========================================================
   DIBUJAR JUGADOR
========================================================= */

function drawPlayer() {

    player.x +=
        (player.targetX -
            player.x) *
        .18;

    ctx.font = "55px Arial";

    ctx.textAlign = "center";

    ctx.textBaseline = "middle";

    ctx.fillText(
        player.emoji,
        player.x,
        player.y
    );

}


/* =========================================================
   DIBUJAR OBJETOS
========================================================= */

function drawObjects() {

    game.objects.forEach(object => {

        ctx.font =
            `${object.size}px Arial`;

        ctx.textAlign = "center";

        ctx.textBaseline = "middle";

        ctx.fillText(
            object.emoji,
            object.x,
            object.y
        );

    });

}


/* =========================================================
   ACTUALIZAR HUD
========================================================= */

function updateHUD() {

    scoreElement.textContent =
        game.score;

    comboElement.textContent =
        `x${game.multiplier}`;

    livesElement.textContent =
        "❤️".repeat(game.lives) +
        "🖤".repeat(3 - game.lives);

    timerElement.textContent =
        Math.ceil(game.time);

    energyText.textContent =
        `${Math.ceil(game.energy)}%`;

    energyFill.style.width =
        `${game.energy}%`;

}


/* =========================================================
   TIMER
========================================================= */

function updateTimer(delta) {

    game.time -=
        delta / 1000;

    if (game.time <= 0) {

        game.time = 0;

        if (
            game.score >=
            LEVELS[game.level].goal
        ) {

            nextLevel();

        } else {

            endGame();

        }

    }

}


/* =========================================================
   CAMBIAR NIVEL
========================================================= */

function nextLevel() {

    if (game.level >= 2) {

        victory();

        return;

    }

    setLevel(
        game.level + 1
    );

    game.objects = [];

}


/* =========================================================
   GAME LOOP
========================================================= */

function gameLoop(timestamp) {

    if (!game.running) return;

    if (game.paused) return;

    const delta =
        timestamp -
        game.lastTime;

    game.lastTime = timestamp;


    updateTimer(delta);

    updateObjects(delta);

    updateParticles(delta);

    updateFloatingTexts(delta);


    ctx.clearRect(
        0,
        0,
        getCanvasWidth(),
        getCanvasHeight()
    );


    drawBackground();

    drawObjects();

    drawPlayer();

    drawParticles();

    drawFloatingTexts();


    updateHUD();


    requestAnimationFrame(
        gameLoop
    );

}


/* =========================================================
   PAUSA
========================================================= */

function togglePause() {

    if (!game.running) return;

    game.paused =
        !game.paused;

    if (game.paused) {

        screens.pause.classList.add(
            "active"
        );

    } else {

        screens.pause.classList.remove(
            "active"
        );

        game.lastTime =
            performance.now();

        requestAnimationFrame(
            gameLoop
        );

    }

}


function resumeGame() {

    game.paused = false;

    screens.pause.classList.remove(
        "active"
    );

    game.lastTime =
        performance.now();

    requestAnimationFrame(
        gameLoop
    );

}


/* =========================================================
   PREGUNTAS NUTRICIONALES
========================================================= */

const questions = [

    {
        question:
            "¿Cuál de estos es una bebida saludable para hidratarse?",

        answers: [
            "Gaseosa",
            "Agua",
            "Bebida energética"
        ],

        correct: 1
    },

    {
        question:
            "¿Cuál alimento aporta vitaminas y fibra?",

        answers: [
            "Frutas",
            "Caramelos",
            "Papas fritas"
        ],

        correct: 0
    },

    {
        question:
            "¿Cuál deberíamos consumir con mayor frecuencia?",

        answers: [
            "Verduras",
            "Golosinas",
            "Gaseosas"
        ],

        correct: 0
    },

    {
        question:
            "¿Qué ayuda a mantener una alimentación equilibrada?",

        answers: [
            "Comer únicamente dulces",
            "Variar los alimentos saludables",
            "No beber agua"
        ],

        correct: 1
    }

];


function openQuestion() {

    game.paused = true;

    game.questionAvailable = false;

    screens.question.classList.add(
        "active"
    );

    playSound("question");


    const question =
        questions[
        Math.floor(
            Math.random() *
            questions.length
        )
        ];

    document.getElementById(
        "questionText"
    ).textContent =
        question.question;


    const answers =
        document.getElementById(
            "answers"
        );

    answers.innerHTML = "";


    document.getElementById(
        "questionResult"
    ).textContent = "";


    question.answers.forEach(
        (answer, index) => {

            const button =
                document.createElement(
                    "button"
                );

            button.className =
                "answer-button";

            button.textContent =
                answer;

            button.addEventListener(
                "click",
                () => {

                    checkAnswer(
                        button,
                        index,
                        question.correct
                    );

                }
            );

            answers.appendChild(
                button
            );

        }
    );

}


function checkAnswer(
    button,
    selected,
    correct
) {

    const buttons =
        document.querySelectorAll(
            ".answer-button"
        );

    buttons.forEach(
        b => b.disabled = true
    );


    const result =
        document.getElementById(
            "questionResult"
        );


    if (selected === correct) {

        button.classList.add(
            "correct"
        );

        result.textContent =
            "🎉 ¡Correcto! +50 puntos y +15 energía.";

        game.score += 50;

        game.energy =
            Math.min(
                100,
                game.energy + 15
            );

        playSound("good");

    } else {

        button.classList.add(
            "wrong"
        );

        result.textContent =
            "💡 Casi. Recuerda elegir alimentos variados y saludables.";

        playSound("bad");

    }


    updateHUD();


    setTimeout(() => {

        screens.question.classList.remove(
            "active"
        );

        game.paused = false;

        game.questionAvailable = true;

        game.lastTime =
            performance.now();

        requestAnimationFrame(
            gameLoop
        );

    }, 1500);

}


/* =========================================================
   GAME OVER
========================================================= */

function endGame() {

    if (!game.running) return;

    game.running = false;

    screens.pause.classList.remove(
        "active"
    );

    screens.question.classList.remove(
        "active"
    );

    document.getElementById(
        "finalScore"
    ).textContent =
        game.score;

    showScreen(
        screens.gameOver
    );

}


/* =========================================================
   VICTORIA
========================================================= */

function victory() {

    game.running = false;

    playSound("victory");


    document.getElementById(
        "victoryScore"
    ).textContent =
        game.score;

    document.getElementById(
        "victoryCombo"
    ).textContent =
        `x${game.bestCombo}`;

    document.getElementById(
        "victoryEnergy"
    ).textContent =
        `${Math.ceil(game.energy)}%`;


    showScreen(
        screens.victory
    );

}


/* =========================================================
   RANKING
========================================================= */

function getRanking() {

    return JSON.parse(
        localStorage.getItem(
            "nutriheroRanking"
        )
    ) || [];

}


function saveRanking() {

    const name =
        document.getElementById(
            "playerName"
        ).value.trim() ||
        "NutriHéroe";

    const ranking =
        getRanking();

    ranking.push({

        name,

        score: game.score

    });


    ranking.sort(
        (a, b) =>
            b.score - a.score
    );


    localStorage.setItem(
        "nutriheroRanking",
        JSON.stringify(
            ranking.slice(0, 10)
        )
    );


    renderRanking();

    showScreen(
        screens.ranking
    );

}


function renderRanking() {

    const container =
        document.getElementById(
            "rankingList"
        );

    const ranking =
        getRanking();

    if (ranking.length === 0) {

        container.innerHTML =
            "<p>No hay jugadores todavía. ¡Sé el primero!</p>";

        return;

    }


    container.innerHTML =
        ranking.map(
            (item, index) => {

                let medal = "";

                if (index === 0)
                    medal = "🥇";

                else if (index === 1)
                    medal = "🥈";

                else if (index === 2)
                    medal = "🥉";

                else
                    medal = `${index + 1}.`;


                return `

                    <div class="rank-row">

                        <div class="rank-position">
                            ${medal}
                        </div>

                        <div class="rank-name">
                            ${escapeHTML(item.name)}
                        </div>

                        <div class="rank-points">
                            ${item.score}
                        </div>

                    </div>

                `;

            }
        ).join("");

}


function escapeHTML(text) {

    const div =
        document.createElement(
            "div"
        );

    div.textContent = text;

    return div.innerHTML;

}


/* =========================================================
   REINICIAR
========================================================= */

function restartGame() {

    startGame();

}


/* =========================================================
   EVENTOS DE BOTONES
========================================================= */

document.getElementById(
    "startBtn"
).addEventListener(
    "click",
    startGame
);


document.getElementById(
    "tutorialBtn"
).addEventListener(
    "click",
    () => {

        showScreen(
            screens.tutorial
        );

    }
);


document.getElementById(
    "rankingBtn"
).addEventListener(
    "click",
    () => {

        renderRanking();

        showScreen(
            screens.ranking
        );

    }
);


document.getElementById(
    "backFromTutorial"
).addEventListener(
    "click",
    () => {

        showScreen(
            screens.start
        );

    }
);


document.getElementById(
    "backFromRanking"
).addEventListener(
    "click",
    () => {

        showScreen(
            screens.start
        );

    }
);


document.getElementById(
    "pauseBtn"
).addEventListener(
    "click",
    togglePause
);


document.getElementById(
    "resumeBtn"
).addEventListener(
    "click",
    resumeGame
);


document.getElementById(
    "restartFromPause"
).addEventListener(
    "click",
    restartGame
);


document.getElementById(
    "restartBtn"
).addEventListener(
    "click",
    restartGame
);


document.getElementById(
    "gameOverRanking"
).addEventListener(
    "click",
    () => {

        renderRanking();

        showScreen(
            screens.ranking
        );

    }
);


document.getElementById(
    "saveScoreBtn"
).addEventListener(
    "click",
    saveRanking
);


document.getElementById(
    "victoryRestart"
).addEventListener(
    "click",
    restartGame
);


/* =========================================================
   REDIMENSIONAMIENTO
========================================================= */

window.addEventListener(
    "resize",
    resizeCanvas
);


/* =========================================================
   INICIALIZACIÓN
========================================================= */

resizeCanvas();

renderRanking();