import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, collection, addDoc, query, where, getDocs, getDoc, setDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

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
const db = getFirestore(app);
const auth = getAuth(app);

let cierreSesion = false;

export class ManageAccount {

  ValidarInicioSesion(){
    auth.onAuthStateChanged(function(user) {
      if (user == null && window.location.href != "http://localhost:3001/index.html" && cierreSesion == false){
        Swal.fire({
          title: "Sistema de Votación",
          text: "No ha iniciado Sesión",
          icon: 'error',
          confirmButtonText: "Aceptar",
        })
        .then(resultado => {
          if (resultado.value) {
            window.location.href = "index.html";
          } 
          else {
            window.location.href = "index.html";
          }
        });
      } 
      if(user != null && user.uid != "uVknx3Cu7DbSWslczHEveMkZY603" && window.location.href != "http://localhost:3001/votacion.html" && cierreSesion == false){
        Swal.fire({
          title: "Sistema de Votación",
          text: "Se requieren permisos de administrador",
          icon: 'warning',
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
      if( user != null && user.uid == "uVknx3Cu7DbSWslczHEveMkZY603" && window.location.href == "http://localhost:3001/votacion.html" && cierreSesion == false){
        Swal.fire({
          title: "Sistema de Votación",
          text: "Acceso denegado para Administrador",
          icon: 'warning',
          confirmButtonText: "Aceptar",
        })
        .then(resultado => {
          if (resultado.value) {
            window.location.href = "reporte.html";
          } 
          else {
            window.location.href = "reporte.html";
          }
        });
      }
    });
  }

  registerAccount(fname, lname, ci, phone, addres, uid, birthdate, voto) {
    return new Promise((resolve, reject) => {
      addDoc(collection (db, "Usuarios"), {
        fname: fname,
        lname: lname,
        ci: ci,
        phone: phone,
        addres: addres,
        uid: uid,
        birthdate: birthdate,
        voto: voto
      })
        .then(async(docRef) => {
          const doc = await getDoc(docRef);
          resolve(doc.data().fname);
        })
        .catch((error) => {
          reject(error);
          alert("Error al registrar: " + error.message);
        });
    });
  }

  register(email, password) {
    return new Promise((resolve, reject) => {
      cierreSesion = true;
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
      .then( async (userCredential) => {
        const uid = userCredential.user.uid;
        if(uid != "uVknx3Cu7DbSWslczHEveMkZY603"){
          const nombre =  await this.encontrarInfo(uid, "fname");
          const voto = await this.encontrarInfo(uid, "voto");
          if(voto == false) {
            const idUser = await this.encontrarInfo(uid, "id");
            const docu = doc(db, "Usuarios", idUser);
            await updateDoc(docu, {
              voto: true
            });
            Swal.fire({
              title: "Sistema de Votación",
              text: "Esta ingresando como " + nombre,
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
          else {
            Swal.fire({
              title: 'Sistema de Votación',
              text: nombre + ' ya realizo su voto.',
              icon: 'question',
              confirmButtonText: 'Aceptar'
            });
          }
        }
        else if(uid == "uVknx3Cu7DbSWslczHEveMkZY603"){
          Swal.fire({
              title: "Sistema de Votación",
              text: "Esta ingresando como administrador",
              icon: 'success',
              confirmButtonText: "Aceptar",
          })
          .then(resultado => {
            if (resultado.value) {
              window.location.href = "reporte.html";
            } 
            else {
              window.location.href = "reporte.html";
            }
          });
        }
      })
      .catch((error) => {
        console.error(error.message);
          alert("Error al iniciar sesión: " + error.message);
      });
  }

  async encontrarInfo(comparacion, campo) {
    const q = query(collection(db, "Usuarios"), where('uid', "==", comparacion));
    let result = "";
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {

      if(campo == "fname"){
        result = doc.data().fname;
      }
      if(campo == "lname"){
        result = doc.data().lname;
      }
      if(campo == "ci"){
        result = doc.data().ci;
      }
      if(campo == "voto"){
        result = doc.data().voto;
      }
      if(campo == "id"){
        result = doc.id;
      }
    });

    return result;
  }

  signOut() {
    cierreSesion = true;
    signOut(auth)
      .then((_) => {
        Swal.fire({
          title: "Sistema de Votación",
          text: "Cerrando Sesión",
          icon: 'info',
          confirmButtonText: "Aceptar",
        })
        .then(resultado => {
          if (resultado.value) {
            window.location.href = "index.html";
          } 
          else {
            window.location.href = "index.html";
          }
        });
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  async reinicioSegundaVulelta(){
    const querySnapshot = await getDocs(collection(db, "Usuarios"));
    querySnapshot.forEach( async (doc) => {
      await this.cambiarVoto(doc);
    })
    console.log("Todos los documentos fueron actualizados");
  }

  async cambiarVoto(docRef){
    console.log(docRef.id);
    const docOfi = doc(db, "Usuarios", docRef.id);
    await updateDoc(docOfi, {
      voto: false
    });
    
    /*await setDoc(doc(db, "Usuarios", docRef.id), {
      ci: "13347079"
    });  */
  }
}