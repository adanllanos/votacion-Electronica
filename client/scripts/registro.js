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
    const birthdate = document.getElementById("birthdate").value;
    const voto = false;

    async function createUserAndObtainUID() {
      try {
        const uid = await account.register(email, password);
        const name = await account.registerAccount(fname, lname, ci, phone, address, uid, birthdate, voto);
        document.getElementById("formulario-crear").reset();
        console.log(name);
        Swal.fire({
          title: "Sistema de Votación",
          html: 'Usuario creado correctamenete! </br>' + 
                'Ahora sera redirigido a la cuenta de: ' + name,
          icon: 'success',
          confirmButtonText: "Aceptar",
        })
        .then(resultado => {
          if (resultado.value) {
            window.location.href = "votacion.html";
          } 
          else {
            window.location.href = "votacion.html";
          }
        });
      } 
      catch (error) {
        console.error("Ocurrió un error:", error);
      }
    }

    createUserAndObtainUID();
});