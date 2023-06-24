import { ManageAccount } from './firebaseConect.js';

const account = new ManageAccount();
account.ValidarInicioSesion();

document.getElementById("formulario-crear").addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const ci = document.getElementById("ci").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    async function createUserAndObtainUID() {
        try {
          const uid = await account.register(email, password);
          account.registerAccount(fname, lname, ci, phone, address, uid);
          document.getElementById("formulario-crear").reset();
        } 
        catch (error) {
          console.error("Ocurrió un error:", error);
        }
      }
    createUserAndObtainUID();
    
});

console.log('Formulario de Registro');