document.addEventListener("DOMContentLoaded", () => {
    App.init()
})

const botonesVotacion = [
    document.getElementById("candidato1"),
    document.getElementById("candidato2"),
    document.getElementById("candidato3"),
    document.getElementById("candidato4"),
    document.getElementById("candidato5"),
    document.getElementById("candidato6")
  ];
  function votar(valor) {
    console.log(`Votando por el candidato ${valor}`);
  }
  botonesVotacion.forEach((boton, indice) => {
    boton.addEventListener("click", (e) => {
      e.preventDefault();
      const valor = boton.value;
      App.RealizarVoto(valor-1, true);
      votar(valor-1);
    });
  });

  function obtenerResultados() {
    App.renderResultados(false);
  }

  function obtenerResultadosSegundaVuelta(){
    App.renderResultados(true);
  }