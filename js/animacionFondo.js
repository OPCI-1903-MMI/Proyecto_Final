class Selector {
    constructor(imagenes) {
        // Arreglo de rutas de imágenes.
        this.imagenes = imagenes;
        // Índice actual, inicia en -1 para que comience desde el primer elemento al iterar.
        this.indice = -1;
    }

    // Avanza cíclicamente.
    siguienteImagen() {
        // Incrementa el índice y usa módulo para reiniciar al llegar al final del arreglo.
        this.indice = (this.indice + 1) % this.imagenes.length;
        // Retorna la imagen correspondiente al índice actualizado.
        return this.imagenes[this.indice];
    }
}

class Fondo extends Selector {
    constructor(imagenes) {
        super(imagenes);
    }

    aplicarFondo(elemento) {
        let siguienteImagen = this.siguienteImagen();
        if (siguienteImagen) {
            elemento.style.backgroundImage = `url("${siguienteImagen}")`;
            elemento.style.backgroundSize = "cover";
            elemento.style.backgroundRepeat = "no-repeat";
        } else {
            elemento.style.backgroundColor = "gray";
        }
    }

    resetearFondo(elemento) {
        elemento.style.backgroundImage = `url("img/fondos/default.png")`;
        elemento.style.backgroundSize = "cover";
    }
}

document.addEventListener("DOMContentLoaded", () => {

    let cuerpo = document.getElementById("nosotros-img"); // Elemento que cambiará de fondo.
    let disparador = document.getElementById("animacionFondo");   // Evento que dispara el cambio de fondo.

    let imagenes = ["img/fondos/libreria.png", "img/fondos/Anime_City.jpg", "img/fondos/Anime_Room_Day.jpg", "img/fondos/Anime_Room_Night.jpg", "img/fondos/Bunker_Studio.jpg"];
    let fondo = new Fondo(imagenes);

    let contador = 0;

    disparador.addEventListener("mouseover", () => {
        contador++;
        if (contador <= 5) {
            fondo.aplicarFondo(cuerpo);
        } else {
            fondo.resetearFondo(cuerpo);
            contador = 0;
        }
    });
});
