$(function(){ // creamos una función para autocompletar el cuadro de los aeropuertos
    $.getJSON("http://localhost:8080/nombreAeropuertos", function(respuesta) { // obtenemos los nombres de los aeropuertos
        $( "#Origen" ).autocomplete({ // recorremos los nombres de los aeropuertos para el origen
            source: respuesta
        });
        $( "#Destino" ).autocomplete({ // recorremos los nombres de los aeropuertos para el destino
            source: respuesta
        });
    });
});