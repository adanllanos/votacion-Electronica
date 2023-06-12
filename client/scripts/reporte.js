//Variable que guarda la cantidad de leyendas a insertar en el gráfico
let cantidadLeyendas;
var arregloDatos = [];
var tieneDatosValidos = false;

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
    var t = ['Gráfico', ''];
    arregloDatos.push(t);

    for (i = 0; i < datos.length; i = i + 2) {
        //voy agregando los pares al arreglo arreglo arregloDatos.
        t = [datos[i].textContent, parseInt(datos[i + 1].textContent)];
        arregloDatos.push(t);
        tieneDatosValidos = true;
    }

    //Genero la tabla que contiene los datos con el arreglo arregloDatos
    var data = google.visualization.arrayToDataTable(arregloDatos);

    // Opcional; Agrego el título del gráfico
    var options = {
        'title': document.getElementById("titulo").value,
        'width': 700,
        'height': 500
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

}
