// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC00mzYFZYUdzVr8CqXVZIykFGpNgT5XRw",
    authDomain: "kinmanga-v01.firebaseapp.com",
    projectId: "kinmanga-v01",
    storageBucket: "kinmanga-v01.firebasestorage.app",
    messagingSenderId: "144106017174",
    appId: "1:144106017174:web:675ed4a06cd9d9663dcdb7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


let db = getFirestore(app);
let contactosRef = collection(db, "contactos");

let enviarBtn = document.querySelector('input[name="enviar"]');

async function registrarContacto(event) {
    event.preventDefault();

    // Obtener valores del formulario
    let nombre = document.getElementById("nombre").value.trim();
    let email = document.getElementById("mail").value.trim();
    let asunto = document.getElementById("asunto").value;
    let comentario = document.getElementById("comentario").value.trim();

    // Validación de campos
    if (!nombre || !email || !asunto || !comentario) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    try {
        // Crear nuevo contacto
        let nuevoContacto = {
            nombre: nombre,
            email: email,
            asunto: asunto,
            comentario: comentario,
            fechaRegistro: new Date().toISOString()
        };

        let docRef = await addDoc(contactosRef, nuevoContacto);
        console.log(`Contacto registrado con el ID: ${docRef.id}`);
        alert("¡Gracias por contactarnos! Hemos recibido tu mensaje.");
        limpiarCampos();
    } catch (e) {
        console.error(`Error al registrar el contacto: ${e}`);
        alert("No fue posible enviar tu mensaje. Inténtalo de nuevo más tarde.");
    }
}

function limpiarCampos() {
    document.getElementById("nombre").value = "";
    document.getElementById("mail").value = "";
    document.getElementById("asunto").selectedIndex = 0;
    document.getElementById("comentario").value = "";
}

// Asociar evento al botón enviar
enviarBtn.addEventListener("click", registrarContacto);
