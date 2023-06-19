//Variable que guarda la cantidad de leyendas a insertar en el gráfico
let cantidadLeyendas;
var arregloDatos = [];
var arregloDatosPorcentajes = [];
var tieneDatosValidos = false;
var primerCandidatoSegundaVuelta;
var segundoCandidatoSegundaVuelta

//Función que cargar el gràfico de Google
function cargarGrafico() {
    // Cargo el gráfico de Google
    google.charts.load('current', {
        'packages': ['corechart']
    });
    google.charts.setOnLoadCallback(drawChart);
}

// Dibujo el gráfico y coloco los valores
function drawChart() {
    arregloDatos = [];
    //Recupero los inputs que hay dentro del div datos
    var datos = document.getElementById("resultados").querySelectorAll(".serie, .valor");
    //El primer par [x,x] a insertar en arregloDatos debe ser info del grafico.
    //Esta info no es visible, por lo tanto es indistinto el valor que le asignemos
    console.log(datos);
    //Controlo que todos los input tengan un valor cargado
    for (i = 0; i < datos.length; i++) {
        if (datos[i].value === "") {
            alert("Cargue todos los campos");
            return;
        }
    }
    var totalVotos=0;
    for (let i = 0; i < datos.length; i= i +2) {
        const elemento = parseInt(datos[i + 1].textContent);
        totalVotos=totalVotos+elemento;
    }
    console.log(totalVotos);

    var t = ['Gráfico', ''];
    arregloDatos.push(t);
    //arregloDatosPorcentajes.push(t);

    for (i = 0; i < datos.length; i = i + 2) {
        //voy agregando los pares al arreglo arreglo arregloDatos.
        t = [datos[i].textContent, parseInt(datos[i + 1].textContent)];
        arregloDatos.push(t);
        tieneDatosValidos = true;
    }
    for (i = 0; i < datos.length; i = i + 2) {
        const elemento = parseInt(datos[i + 1].textContent);
        const porcentaje = (elemento/totalVotos)*100;
        t = [datos[i].textContent, porcentaje];
        arregloDatosPorcentajes.push(t);
    }
    console.log(arregloDatosPorcentajes);

    //Genero la tabla que contiene los datos con el arreglo arregloDatos
    var data = google.visualization.arrayToDataTable(arregloDatos);

    // Opcional; Agrego el título del gráfico
    var options = {
        'title': document.getElementById("titulo").value,
        'width': 700,
        'height': 500,
    };

    // Muestro el gráfico dentro del elemento <div>  con id="piechart"
    //dependiendo del tipo de grafico
    if (document.getElementById("tipo").value == "circular") {
        var chart = new google.visualization.PieChart(document.getElementById('piechart'));
        chart.draw(data, options);
    } else {
        if (!tieneDatosValidos) {
            var piechartElement = document.getElementById('piechart');
            piechartElement.innerHTML = 'No data';
            piechartElement.style.display = 'flex';
            piechartElement.style.alignItems = 'center';
            piechartElement.style.justifyContent = 'center';
            piechartElement.style.width = '700px';
            piechartElement.style.height = '500px';
            piechartElement.style.fontSize = '13px';
            return;
        }
        var chart = new google.visualization.ColumnChart(document.getElementById('piechart'));
        chart.draw(data, options);
    }


    /*
    será proclamada a la Presidencia y Vicepresidencia la candidatura que haya reunido el 50% más uno de los votos válidos; o que haya obtenido un mínimo del 40% de los votos válidos con una diferencia de al menos 10% en relación con la segunda candidatura.
    */ 
    var resultadosOrdenados = arregloDatosPorcentajes.sort((a, b) => b[1] - a[1]);
    var primerCandidatoRes = resultadosOrdenados[0][1];
    var segundoCandidatoRes = resultadosOrdenados[1][1];
    var diferenciaPorcentaje = primerCandidatoRes - segundoCandidatoRes;
    var cumpleCondicionSegundaVuelta = (primerCandidatoRes >= 40 && diferenciaPorcentaje >= 10);
    if (cumpleCondicionSegundaVuelta) {
        primerCandidatoSegundaVuelta = resultadosOrdenados[0][0];
        segundoCandidatoSegundaVuelta = resultadosOrdenados[1][0];
        console.log("No habra segunda vuelta");
        alert('El nuevo presidente es: '+ resultadosOrdenados[0][0])
    } else {
        primerCandidatoSegundaVuelta = resultadosOrdenados[0][0];
        segundoCandidatoSegundaVuelta = resultadosOrdenados[1][0];
        console.log("Habra segunda vuelta y los candidatos son: " + primerCandidatoSegundaVuelta + " y "+ segundoCandidatoSegundaVuelta);

    }
}
