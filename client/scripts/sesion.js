import { ManageAccount } from './firebaseConect.js';

const account = new ManageAccount();
account.ValidarInicioSesion();

//Funcion para cerra sesion Firebase
document.getElementById("salir").addEventListener("click", () => {
    signOutWithoutAuthState();
});


document.getElementById("segunda-vuelta").addEventListener("click", () => {
    account.reinicioSegundaVulelta();
});


  /*auth.onAuthStateChanged(function(user) {});*/

async function signOutWithoutAuthState() {
    try {
      await account.signOut();
    } 
    catch (error) {
      console.log("Error al desconectar al usuario:", error);
    }
  }