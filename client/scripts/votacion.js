import { ManageAccount } from './firebaseConect.js';

const account = new ManageAccount();
account.ValidarInicioSesion();

//Funcion para cerra sesion Firebase
document.getElementById("salir").addEventListener("click", () => {
    account.signOut();
});