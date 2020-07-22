//Declaración de variables locales (let)

let origen = $("#Origen");      //almacena el contenido origen introducido por el input del html
let destino = $("#Destino");    //almacena el contenido destino introducido por el input del html
let salida = $("#Salida");      //almacena el contenido de la fecha de salida introducido por el input del html
let regreso = $("#Regreso");    //almacena el contenido de la fecha de vuelta introducido por el input del html

let precioMaximo = $("#PrecioMax");

let soloEcologico = $("#soloEcologico");

let vueltaBool = false;               //variable booleana que nos sirve para detectar si hay fecha de vuelta

let getVuelos = "http://localhost:8080/getVuelos/"; //get de los vuelos solo de ida
let getVuelosIdaYVuelta ="http://localhost:8080/getVuelosIdaYVuelta/"; //get de los vuelos de ida y vuelta

//Funciones con llamada automatica (JQuery)

$(function(){
    //funcion para hacer un fade in del menu principal
    $("body").hide().fadeIn(900);
    // funcion para cuando se realiza el formulario y se pulsa el boton
    $("#form").submit(function(event) {
        event.preventDefault();
    });
});

$("#error1").hide(); //funcion para esconder el mensaje de error de vuelos de ida no encontrados

$("#error2").hide(); //funcion para esconder el mensaje de error de vuelos de ida y vuelta no encontrados

//Declaración de funciones

function conVuelta(){ //metodo que sirve para ver si la entrada de la fecha de regreso es vacia o no
    if ($('#Regreso').val().length === 0){ //en caso de ser vacia devolverá false y si no devolverá true
        return false;
    }
    else{
        return true;
    }
};

function seleccion(){ //este metodo llama al metodo que comprueba si se ha introducido una fecha de regreso
    vueltaBool = conVuelta(); //si hay una fecha de regreso se ejecutará la llamada al método con la vuelta y si no solo al de ida
    if(vueltaBool){
        gVuelosIdaYVuelta(); //llamada al metodo con ida y vuelta
    }else{
        gVuelosIda(); //llamada al metodo con solo ida
    }
}

function gVuelosIda(){

    let aux = getVuelos+origen.val()+"/"+destino.val()+"/"+salida.val(); //crea el string con los valores de las variables y el get

    $.getJSON(aux, function(vuelosIda) { //llamada a JSON

        let tabla = $("#tabla"); //creamos la variable tabla

        if(vuelosIda.length > 0){ //comprueba si hay vuelos disponibles
            $(".row").hide();
            $("#titulo").hide();

            $(".titulovuelo").append('<div class="titulovuelo">'+'<h2>Lista de vuelos disponibles: '+'</div></h2>'); //string del titulo
            let str = "<thead><tr><th>Código de vuelo</th><th>Aeropuerto origen</th><th>Aeropuerto destino</th><th>Compañia</th>" + //string del indice de la tabla
                "<th>Fecha</th><th>Hora</th><th>Duración</th><th>Precio</th><th>Ecologico</th></tr></thead>";

            for (let i in vuelosIda){ //iteramos para crear una linea (un string) de la tabla con cada vuelo
                if(soloEcologico.is(':checked')){
                    if(vuelosIda[i].ecologico){
                        if(vuelosIda[i].precio <= precioMaximo.val() || precioMaximo.val() === ''){

                            let eco;
                            if(vuelosIda[i].ecologico){
                                eco = "Si";
                            }
                            else{
                                eco = "No";
                            }

                            str = str + "<tr><td id='pinchaComp' onclick='infoCompania(\"" + vuelosIda[i].compania + "\")'>" + vuelosIda[i].codigo + "</td>" +
                                "<td>" + vuelosIda[i].origen + "</td><td>" + vuelosIda[i].destino + "</td>" +
                                "<td id='pinchaComp' onclick='infoCompania(\"" + vuelosIda[i].compania + "\")'>" + vuelosIda[i].compania +
                                "</td><td id='vIFecha'>" + vuelosIda[i].fecha + "</td><td id='vIHora'>" + vuelosIda[i].horaSalida + "</td><td id='vIDuracion'>" +
                                +vuelosIda[i].duracion + " min" + "</td><td>" + vuelosIda[i].precio + "€" + "</td><td>" + eco + "</td></tr>";
                        }
                    }
                }
                else{
                    if(vuelosIda[i].precio <= precioMaximo.val() || precioMaximo.val() === ''){

                        let eco;
                        if(vuelosIda[i].ecologico){
                            eco = "Si";
                        }
                        else{
                            eco = "No";
                        }

                        str = str + "<tr><td id='pinchaComp' onclick='infoCompania(\"" + vuelosIda[i].compania + "\")'>" + vuelosIda[i].codigo + "</td>" +
                            "<td>" + vuelosIda[i].origen + "</td><td>" + vuelosIda[i].destino + "</td>" +
                            "<td id='pinchaComp' onclick='infoCompania(\"" + vuelosIda[i].compania + "\")'>" + vuelosIda[i].compania +
                            "</td><td id='vIFecha'>" + vuelosIda[i].fecha + "</td><td id='vIHora'>" + vuelosIda[i].horaSalida + "</td><td id='vIDuracion'>" +
                            +vuelosIda[i].duracion + " min" + "</td><td>" + vuelosIda[i].precio + "€" + "</td><td>" + eco + "</td></tr>";
                    }
                }
            }
            tabla.append(str); //aqui añadimos el string anterior a la tabla
        }
        else{
            //muestra el dialog en caso de que no haya ningun vuelo con las caracteristicas seleccionadas
            $("#error1").dialog({
                buttons : [ {
                    text : "Close",
                    click : function() { //boton para cerrar
                        $(this).dialog("close");
                    }
                }]
            });
        }
    })
}

function gVuelosIdaYVuelta(){

    let aux = getVuelosIdaYVuelta+origen.val()+"/"+destino.val()+"/"+salida.val()+"/"+regreso.val(); //crea el string con los valores de las variables y el get

    $.getJSON(aux,function(vuelosIdaYVuelta){ //llamada a JSON

        let tabla = $("#tabla"); //creamos la variable tabla

        if(vuelosIdaYVuelta.length > 0 && vuelosIdaYVuelta[0].origen === origen.val() && vuelosIdaYVuelta[vuelosIdaYVuelta.length-1].origen === destino.val()){
            //comprueba si hay vuelos disponibles (comprueba que la lista no se vacia, haya vuelos de ida y que también los haya de vuelta
            $(".row").hide();
            $("#titulo").hide();

            $(".titulovuelo").append('<div class="titulovuelo">'+'<h2>Lista de vuelos de ida y vuelta disponibles: '+'</div>' +
                '<div id="descuento">20% de descuento en vuelos de ida y vuelta con la misma compañia</div></h2>'); //string del titulo
            let str = "<thead><tr><th>Código de vuelo</th><th>Aeropuerto origen</th><th>Aeropuerto destino</th><th>Compañia</th>" +
                "<th>Fecha</th><th>Hora</th><th>Duración</th><th>Precio</th><th>Ecologico</th><th colspan='2'>Precio Total</th></tr></thead>"; //string del indice de la tabla

            for (let i in vuelosIdaYVuelta){ //iteramos para crear una linea (un string) de la tabla con cada vuelo de ida
                if(vuelosIdaYVuelta[i].origen === origen.val()){ //solo cogemos los del origen seleccionado
                    for (let j in vuelosIdaYVuelta){ //iteramos para crear una linea (un string) de la tabla con cada vuelo de vuelta
                        if(vuelosIdaYVuelta[j].origen === destino.val()){ //solo cogemos los del destino seleccionado
                            if(fechaValida(vuelosIdaYVuelta[i].fecha, vuelosIdaYVuelta[j].fecha)){ //comprobamos que las fechas de ambos vuelos sean compatibles
                                //comprobamos que las horas de ambos vuelos sean compatibles (en caso de que sean el mismo dia)
                                if(horaValida(vuelosIdaYVuelta[i].horaSalida, vuelosIdaYVuelta[j].horaSalida,vuelosIdaYVuelta[i].fecha, vuelosIdaYVuelta[j].fecha)) {
                                    if(soloEcologico.is(':checked')) {
                                        if (vuelosIdaYVuelta[i].ecologico && vuelosIdaYVuelta[j].ecologico) {
                                            let total = vuelosIdaYVuelta[i].precio + vuelosIdaYVuelta[j].precio; //variable de total de precios

                                            if (vuelosIdaYVuelta[i].compania === vuelosIdaYVuelta[j].compania) { //comprobamos si ambas compañias coinciden
                                                total = total - total * 0.2; //descontamos un 20% del precio total
                                            }
                                            if(total <= precioMaximo.val() || precioMaximo.val() === '') {

                                                let eco;
                                                if(vuelosIdaYVuelta[i].ecologico){
                                                    eco = "Si";
                                                }
                                                else{
                                                    eco = "No";
                                                }

                                                //creamos el string del vuelo de ida (que se convertira en codigo html, una tabla con sus correspondientes celdas)
                                                str = str + "<div class='Vuelta'><tr><td id='pinchaComp' onclick='infoCompania(\"" + vuelosIdaYVuelta[i].compania + "\")'>" +
                                                    vuelosIdaYVuelta[i].codigo + "</td><td>" + vuelosIdaYVuelta[i].origen + "</td>" +
                                                    "<td>" + vuelosIdaYVuelta[i].destino + "</td><td id='pinchaComp' onclick='infoCompania(\"" + vuelosIdaYVuelta[i].compania + "\")'>" +
                                                    vuelosIdaYVuelta[i].compania +
                                                    "</td><td  id='vIVFecha'>" + vuelosIdaYVuelta[i].fecha + "</td>" +
                                                    "<td  id='vIVHora'>" + vuelosIdaYVuelta[i].horaSalida + "</td><td id='vIVDuracion'>" + vuelosIdaYVuelta[i].duracion + " min" + "</td><td>" +
                                                    vuelosIdaYVuelta[i].precio + "€" + "</td><td>" + eco + "</td><th rowspan='2'>" + total + "€" + "</th></tr></div>";

                                                if(vuelosIdaYVuelta[j].ecologico){
                                                    eco = "Si";
                                                }
                                                else{
                                                    eco = "No";
                                                }

                                                //creamos el string del vuelo de vuelta (que se convertira en codigo html, una tabla con sus correspondientes celdas)
                                                str = str + "<tr class='Vuelta' ><td id='pinchaComp' onclick='infoCompania(\"" + vuelosIdaYVuelta[j].compania + "\")'>" +
                                                    vuelosIdaYVuelta[j].codigo + "</td><td>" + vuelosIdaYVuelta[j].origen + "</td>" +
                                                    "<td>" + vuelosIdaYVuelta[j].destino + "</td><td id='pinchaComp' onclick='infoCompania(\"" + vuelosIdaYVuelta[j].compania + "\")'>" +
                                                    vuelosIdaYVuelta[j].compania +
                                                    "</td><td  id='vVIFecha'>" + vuelosIdaYVuelta[j].fecha + "</td>" +
                                                    "<td id='vVIHora'>" + vuelosIdaYVuelta[j].horaSalida + "</td><td id='vVIDuracion'>" + vuelosIdaYVuelta[j].duracion + " min" + "</td><td>" + vuelosIdaYVuelta[j].precio +
                                                    "€" + "</td><td>" + eco + "</td></tr>";
                                            }
                                        }
                                    }
                                    else{
                                        let total = vuelosIdaYVuelta[i].precio + vuelosIdaYVuelta[j].precio; //variable de total de precios

                                        if (vuelosIdaYVuelta[i].compania === vuelosIdaYVuelta[j].compania) { //comprobamos si ambas compañias coinciden
                                            total = total - total * 0.2; //descontamos un 20% del precio total
                                        }
                                        if(total <= precioMaximo.val() || precioMaximo.val() === '') {

                                            let eco;
                                            if(vuelosIdaYVuelta[i].ecologico){
                                                eco = "Si";
                                            }
                                            else{
                                                eco = "No";
                                            }

                                            //creamos el string del vuelo de ida (que se convertira en codigo html, una tabla con sus correspondientes celdas)
                                            str = str + "<div class='Vuelta'><tr><td id='pinchaComp' onclick='infoCompania(\"" + vuelosIdaYVuelta[i].compania + "\")'>" +
                                                vuelosIdaYVuelta[i].codigo + "</td><td>" + vuelosIdaYVuelta[i].origen + "</td>" +
                                                "<td>" + vuelosIdaYVuelta[i].destino + "</td><td id='pinchaComp' onclick='infoCompania(\"" + vuelosIdaYVuelta[i].compania + "\")'>" +
                                                vuelosIdaYVuelta[i].compania +
                                                "</td><td  id='vIVFecha'>" + vuelosIdaYVuelta[i].fecha + "</td>" +
                                                "<td  id='vIVHora'>" + vuelosIdaYVuelta[i].horaSalida + "</td><td id='vIVDuracion'>" + vuelosIdaYVuelta[i].duracion + " min" + "</td><td>" +
                                                vuelosIdaYVuelta[i].precio + "€" + "</td><td>" + eco + "</td><th rowspan='2'>" + total + "€" + "</th></tr></div>";

                                            if(vuelosIdaYVuelta[j].ecologico){
                                                eco = "Si";
                                            }
                                            else{
                                                eco = "No";
                                            }

                                            //creamos el string del vuelo de vuelta (que se convertira en codigo html, una tabla con sus correspondientes celdas)
                                            str = str + "<tr class='Vuelta' ><td id='pinchaComp' onclick='infoCompania(\"" + vuelosIdaYVuelta[j].compania + "\")'>" +
                                                vuelosIdaYVuelta[j].codigo + "</td><td>" + vuelosIdaYVuelta[j].origen + "</td>" +
                                                "<td>" + vuelosIdaYVuelta[j].destino + "</td><td id='pinchaComp' onclick='infoCompania(\"" + vuelosIdaYVuelta[j].compania + "\")'>" +
                                                vuelosIdaYVuelta[j].compania +
                                                "</td><td  id='vVIFecha'>" + vuelosIdaYVuelta[j].fecha + "</td>" +
                                                "<td id='vVIHora'>" + vuelosIdaYVuelta[j].horaSalida + "</td><td id='vVIDuracion'>" + vuelosIdaYVuelta[j].duracion + " min" + "</td><td>" + vuelosIdaYVuelta[j].precio +
                                                "€" + "</td><td>" + eco + "</td></tr>";
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            tabla.append(str); //aqui añadimos el string anterior a la tabla
        }
        else{
            //muestra el dialog en caso de que no haya ningun vuelo con las caracteristicas seleccionadas
            $("#error2").dialog({
                buttons : [ {
                    text : "Close",
                    click : function(){ //boton para cerrar
                        $(this).dialog("close");
                    }
                }]
            });
        }
    });
}

function infoCompania(company){ //funcion que muestra la informacion de la compañia seleccionada

    let url = "http://localhost:8080/getCompania/" + company;

    $.getJSON(url, function(comp){ // JSON con la compañia
        let tablaComp = $("#tablaComp"); //cogemos la variable tablaComp del html

        let aux = document.createElement("div");
        aux.setAttribute("title","Informacion de la compañia: "); //titulo
        aux.setAttribute("id","tablaComp"); //id

        tablaComp.replaceWith(aux); //reemplazamos para que no se vaya solapando la informacion de la anterior compañia seleccionada

        let aux2 = $("#tablaComp");

        //cocatenamos un string de codigo html que será el que nos muestre las caracteristicas de la compañia
        aux2.append("<p>Nombre: "+ comp.nombre +" </p><p>Código: "+ comp.codigo +"</p>" +
            "<p>Enlace: <a href="+ comp.enlace +">"+ comp.enlace +"</a></p><p>Teléfono: "+ comp.tlf +"</p><div id='valora'></div>");

        $("#valora").rateYo({ //jquery del rateYo para las valoraciones de las compañias aereas
            rating: comp.valoracion, readOnly: true,
        });

        $(aux2).dialog({ //jquery del dialog que muestra el dialogo de la compañia aerea
            width: 276,
            hide : "puff",
            show : "scale"
        });
    });
}

function fechaValida(f1, f2){
    fecha1 = f1.split("-",3); //creamos dos arrays de [año, mes, dia]
    fecha2 = f2.split("-",3); //uno de ida y otro de vuelta

    let ano1 = parseInt(fecha1[0]); //lo pasamos a integer ya que estos datos vienen en string
    let ano2 = parseInt(fecha2[0]);
    let mes1 = parseInt(fecha1[1]);
    let mes2 = parseInt(fecha2[1]);
    let dia1 = parseInt(fecha1[2]);
    let dia2 = parseInt(fecha2[2]);

    //hacemos una comparativa y vemos si la fecha de 1 es menor que l fecha 2
    //en caso de ser una fecha valida devolerá true y en caso contrario false
    if(ano1 <= ano2){
        if(mes1 <= mes2){
            if(dia1 <= dia2){
                return true;
            }
            else{
                return false;
            }
        }
        else{
            return false;
        }
    }
    else{
        return false;
    }
}

function horaValida(h1, h2, f1, f2){

    hora1 = h1.split(":", 1); //cogemos la hora del parametro
    hora2 = h2.split(":", 1);
    hora1 = parseInt(hora1); //convertiemos el string en numero
    hora2 = parseInt(hora2);

    //hacemos lo mismo que en la funcion de fechaValida
    fecha1 = f1.split("-",3); //creamos dos arrays de [año, mes, dia]
    fecha2 = f2.split("-",3);
    let ano1 = parseInt(fecha1[0]);
    let ano2 = parseInt(fecha2[0]);
    let mes1 = parseInt(fecha1[1]);
    let mes2 = parseInt(fecha2[1]);
    let dia1 = parseInt(fecha1[2]);
    let dia2 = parseInt(fecha2[2]);

    //hemos puesto una 4 horas de diferencia entre la ida y la vuelta
    if ((hora1 + 4) < hora2){
        return true;
    }
    if(ano1 < ano2){ //el caso anterior solo tendria sentido en caso de ser el mismo dia
        return true; //en caso de ser de un año, mes o dia anterior devolveria true
    }
    else{
        if(mes1 < mes2){
            return true;
        }
        else{
            if(dia1 < dia2){
                return true;
            }
            else{
                return false;
            }
        }
    }
}