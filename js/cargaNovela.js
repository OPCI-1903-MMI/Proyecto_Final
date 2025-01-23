document.addEventListener("DOMContentLoaded", () => {
    cargarNovela();
});
/*Descubri que los navegadores bloquean el uso de fetch con "file://" (cargando desde el explorador de archivos) por seguridad,
impidiendo cargar archivos JSON directamente; mientras que WebStorm lo permite porque usa un servidor web (http://)
Lo menciono por si no le es posible ver mi proyecto correctamente, de antemano me disculpo si esta información ya la tenia presente.*/

let novela = {
    linkOriginal: [{nombreLink: "", link: ""}]
};

function cargarNovela() {

    //Se vuelve dinamico y reutilizable
    const currentPage = window.location.pathname.split("/").pop().split(".")[0];
    const jsonPath = `../../js/json_Novela/${currentPage}.json`;

    fetch(jsonPath) /*Nota para mi el archivo se carga desde donde se encuentre el html que lo invoca, no desde la root.*/
        .then(response => response.json())
        .then(function (datos) {
            novela.titulo = datos.titulo ?? "";
            novela.estado = datos.estado ?? "";
            novela.tipo = datos.tipo ?? "";
            novela.generos = datos.generos ?? "";
            novela.traductor = datos.traductor ?? "";
            novela.linkOriginal = datos.linkOriginal ?? [{nombreLink: "", link: ""}];
            novela.sinopsis = datos.sinopsis ?? "";

            document.getElementById("titulo").textContent = novela.titulo || "Nombre no disponible";
            document.getElementById("estado").textContent = novela.estado || "Estado no disponible";
            document.getElementById("tipo").textContent = novela.tipo || "Tipo no disponible";
            document.getElementById("generos").textContent = novela.generos || "Géneros no disponibles";
            document.getElementById("traductor").textContent = novela.traductor || "Traductor no disponible";


            const linkElement = document.getElementById("linkOriginal");
            if (novela.linkOriginal.length > 0) {
                linkElement.textContent = novela.linkOriginal[0].nombreLink || "Nombre no disponible";
                linkElement.parentElement.href = novela.linkOriginal[0].link || "";
            } else {
                linkElement.textContent = "Nombre no disponible";
                linkElement.parentElement.href = "";
            }

            document.getElementById("sinopsis").textContent = novela.sinopsis || "Sinopsis no disponible";
        })
        .catch(error => console.log(`Error al cargar el recurso: ${error}`));
}

