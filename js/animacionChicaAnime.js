let animacion = document.getElementById("animacion");
let frame = 0;

function transicion() {
    let imagen = `tipping-toast-media-large-0${(frame % 4) + 1}.png`;
    animacion.style.backgroundImage = `url("../../img/animacion/${imagen}")`;
    frame++;
}

setInterval(transicion, 110);

// Inicializala
transicion();