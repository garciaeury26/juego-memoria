// inicializicasion de variables
let targetasDestapda = 0;
let targeta1 = null;
let targeta2 = null;
let primerResultado = 0;
let segundoResultado = 0;
let movimientos = 0;
let aciertos = 0;
let temporisador = false;
let timerInicial = 30;
let timer = timerInicial;
let tiempoRegresivoID = null;

//documentos html
let mostrarMovimiento = document.getElementById("movimientos");
let mostrarAciertos = document.getElementById("aciertos");
let mostrarTiempo = document.getElementById("t-restante")
let clickAudio = document.getElementById("click-audio");
let dobleteAudio = document.getElementById("doblete-audio");
let loseAudio = document.getElementById("lose-audio");

let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

// desordenar numeros
numeros = numeros.sort(() => {
    return Math.random() - 0.5;
})

//funciones
const contarTiempo = () => {
    tiempoRegresivoID = setInterval(() => {
        timer--;
        mostrarTiempo.innerHTML = `Tiempo restante ${timer}`
        if (timer == 0) {
            clearInterval(tiempoRegresivo);
            bloquearTargeta();
        }
    }, 1000);
};


const bloquearTargeta = () => {
    for (let i = 0; i < 1; i++) {
        let targeBloqueada = document.getElementById(i)
        targeBloqueada.innerHTML = numeros[i]
        targeBloqueada.disable = true;
    }
}

//funcion principa;
const destapar = (id) => {

    if (temporisador === false) {
        contarTiempo();
        temporisador = true;
    }

    targetasDestapda++;

    if (targetasDestapda === 1) {

        // mostrar el primer numero
        targeta1 = document.getElementById(id);
        primerResultado = numeros[id]
        //targeta1.innerHTML = primerResultado
        targeta1.innerHTML = `<img src="assets/images/${primerResultado}.png" alt="">`
        clickAudio.play()

        //desabilitar primer botn
        targeta1.disable = true;
    }

    if (targetasDestapda === 2) {
        //mostrar segundo numero
        targeta2 = document.getElementById(id);
        segundoResultado = numeros[id]
        // targeta2.innerHTML = segundoResultado;
        targeta2.innerHTML = `<img src="assets/images/${segundoResultado}.png" alt="">`
        clickAudio.play()

        //desabilar boton 2
        targeta2.disable = true;
        movimientos++;
        mostrarMovimiento.innerHTML = `Movimineto:${movimientos}`;

        if (primerResultado === segundoResultado) {
            dobleteAudio.play()

            //encerra contrador de targetas destapadas
            targetasDestapda = 0;

            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos:${aciertos}`

            if (aciertos === 8) {
                clearInterval(tiempoRegresivoID);
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} &#128512;`
                mostrarTiempo.innerHTML = `Fantastico Tardaste: ${timerInicial - timer} segundos`
                mostrarMovimiento.innerHTML = `movimiento &#128073 ${movimientos}`
            }
        } else {
            loseAudio.play()

            // mostrar momentaneamente valores y vover a cargar
            setTimeout(() => {
                targeta1.innerHTML = " "
                targeta2.innerHTML = " "
                targeta1.disable = false;
                targeta2.disable = false;
                targetasDestapda = 0;
            }, 800);
        }

    }



};