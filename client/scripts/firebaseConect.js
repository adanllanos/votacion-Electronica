import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

/*ULTIMA CORRECION PARA ENVIAR DEBES DE VER SI ES USUARIO ADMINI O NOMRLA PARA REDIRIGIRLO EN LA FUNCION authenticate(email, password) LINEA 61 Y MEJORAR LA FUNCION DA VALIDAR INICIO DE SESION 
FINALMENTE HACER LO DE CHAT GPT PARA PODER SALIR SIN NCESIDAD DE ACTIVAR LA FUNCION DE LA LINEA 24 !SUERTE¡*/ 

const firebaseConfig = {
    apiKey: "AIzaSyCgToktNcdp_5ka89ktA7ycPe7D_mm-KiU",
    authDomain: "votacion-electronica-cac5e.firebaseapp.com",
    databaseURL: "https://votacion-electronica-cac5e-default-rtdb.firebaseio.com",
    projectId: "votacion-electronica-cac5e",
    storageBucket: "votacion-electronica-cac5e.appspot.com",
    messagingSenderId: "1080865301431",
    appId: "1:1080865301431:web:2c4039a308bbb2abb1fe32"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth();

export class ManageAccount {

  ValidarInicioSesion(){
    auth.onAuthStateChanged(function(user) {
      if (user == null && window.location.href != "http://localhost:3001/index.html"){
        alert("No se inicio Sesión");
        window.location.href = "index.html";
      } 
      if(user != null && user.uid != "uVknx3Cu7DbSWslczHEveMkZY603" && window.location.href != "http://localhost:3001/votacion.html"){
        alert("Se necesitan permisos de administrador");
        window.location.href = "votacion.html"
      }
      if( user != null && user.uid == "uVknx3Cu7DbSWslczHEveMkZY603" && window.location.href == "http://localhost:3001/votacion.html" ){
        alert("Acceso denegado para el administrador");
        window.location.href = "reporte.html";
      }
    });
  }

  registerAccount(fname, lname, ci, phone, addres, uid) {
    const docRef = addDoc(collection(db, "Usuarios"), {
      fname, lname, ci, phone, addres, uid
    });
    alert("Usuario creado correctamente");
  }

  register(email, password) {
    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const uid = userCredential.user.uid;
          resolve(uid);
        })
        .catch((error) => {
          reject(error);
          alert("Error al registrar: " + error.message);
        });
    });
  }

  authenticate(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const uid = userCredential.user.uid;
        if(uid != "uVknx3Cu7DbSWslczHEveMkZY603"){
          alert("Bienvenido al sistema de votación");
          window.location.href = "votacion.html"
        }
        else if(uid == "uVknx3Cu7DbSWslczHEveMkZY603"){
          alert("Bienvenido administrador");
          window.location.href = "reporte.html";
        }
      })
      .catch((error) => {
        console.error(error.message);
          // Mostrar alerta de error de inicio de sesión
          alert("Error al iniciar sesión: " + error.message);
      });
  }

  signOut() {
    signOut(auth)
      .then((_) => {
        alert("Sesion cerrada");
        window.location.href = "index.html";
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}