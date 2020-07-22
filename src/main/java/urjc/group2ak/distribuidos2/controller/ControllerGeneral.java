package urjc.group2ak.distribuidos2.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import urjc.group2ak.distribuidos2.model.*;
import urjc.group2ak.distribuidos2.repository.*;
import java.util.ArrayList;
import java.util.List;

@RestController
public class ControllerGeneral {

    @Autowired
    private AeropuertoRepository aeropuertoRepository; //union con el repositorio aeropuerto

    @Autowired
    private CompaniaRepository companiaRepository; //union con el repositorio compañia

    @Autowired
    private VueloRepository vueloRepository; //union con el repositorio vuelo

    @Autowired
    private ServiceWeb serv; //union con el el controllador serviceWeb

    //Obtiene los vuelos disponibles en la base de datos segun los parametros origen, destino y fecha de salida que se le pasan y los devuelve en una lista de vuelos
    @RequestMapping(value = "/getVuelos/{Origen}/{Destino}/{Fecha}", method = RequestMethod.GET)
    public List<Vuelo> getVuelos(@PathVariable("Origen") String origen, @PathVariable("Destino") String destino, @PathVariable("Fecha") String fecha){
        return (vueloRepository.findByOrigenAndDestinoAndFechaIgnoreCase(origen,destino,fecha));
    }

    //Obtiene los vuelos disponibles en la base de datos segun los parametros origen, destino y fecha salida y de regreso que se le pasan y los devuelve en una lista de vuelos
    //Como hay pasarle dos tipos de vuelos, primero le pasamos a la lista a devolver los vuelos con los parametro origen, destino y fecha salida (fecha) y luego le pasamos los vuelos
    //con los parametro de destino y origen intercambiados ya que será la vuelta y la fecha será la de regreso (fecha2)
    @RequestMapping(value = "/getVuelosIdaYVuelta/{Origen}/{Destino}/{Fecha}/{Fecha2}", method = RequestMethod.GET)
    public List<Vuelo> getVuelosIdaYVuelta(@PathVariable("Origen") String origen, @PathVariable("Destino") String destino, @PathVariable("Fecha") String fecha, @PathVariable("Fecha2") String fecha2){
        List<Vuelo> vlo1;
        List<Vuelo> vlo2;
        vlo1 = (vueloRepository.findByOrigenAndDestinoAndFechaIgnoreCase(origen,destino,fecha));
        vlo2 = (vueloRepository.findByOrigenAndDestinoAndFechaIgnoreCase(destino,origen,fecha2));
        vlo1.addAll(vlo2);
        return vlo1;
    }

    //Como en los anteriores casos pero ahora devuelve una lista de aeropuertos segun el nombre
    @RequestMapping (value = "/getAeropuertos/{Nombre}", method = RequestMethod.GET)
    public List<Aeropuerto> getAeropuertos(@PathVariable("Nombre") String nombre){
        return (aeropuertoRepository.findAeropuertoByNombreIgnoreCase(nombre));
    }

    //Como en los anteriores casos pero ahora devuelve una solo una compañia segun el nombre de esta
    @RequestMapping (value = "/getCompania/{Nombre}", method = RequestMethod.GET)
    public Compania getCompania(@PathVariable("Nombre") String nombre){
        return (companiaRepository.findByNombreIgnoreCase(nombre));
    }

    //Como en los anteriores casos pero ahora devuelve una lista con los nombre de los aeropuertos
    @RequestMapping(value ="/nombreAeropuertos",method = RequestMethod.GET)
    public List<String> getAeropuertosNombres() {
        List<Aeropuerto> aeropuertos = serv.getAeropuertos();
        List<String> aeropuertosNombre = new ArrayList<>();
        for (Aeropuerto a : aeropuertos) {
            aeropuertosNombre.add(a.getNombre());
        }
        return aeropuertosNombre;
    }
}