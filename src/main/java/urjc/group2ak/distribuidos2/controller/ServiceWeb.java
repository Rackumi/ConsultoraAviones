package urjc.group2ak.distribuidos2.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import urjc.group2ak.distribuidos2.model.Aeropuerto;
import urjc.group2ak.distribuidos2.model.Compania;
import urjc.group2ak.distribuidos2.model.Vuelo;
import urjc.group2ak.distribuidos2.repository.AeropuertoRepository;
import urjc.group2ak.distribuidos2.repository.CompaniaRepository;
import urjc.group2ak.distribuidos2.repository.VueloRepository;
import javax.annotation.PostConstruct;
import java.util.List;

@Component
public class ServiceWeb {

    @Autowired
    private AeropuertoRepository aeropuertoRepository; //union con el repositorio aeropuerto

    @Autowired
    private CompaniaRepository companiaRepository; //union con el repositorio compañia

    @Autowired
    private VueloRepository vueloRepository; //union con el repositorio vuelo

    @PostConstruct
    public void initAeropuerto(){ //Aeropuertos para la base de datos
        aeropuertoRepository.save(new Aeropuerto("BDBC","Madrid"));
        aeropuertoRepository.save(new Aeropuerto("DGTS","Barcelona"));
        aeropuertoRepository.save(new Aeropuerto("GKAO","Berlin"));
        aeropuertoRepository.save(new Aeropuerto("VNAU","Vigo"));
        aeropuertoRepository.save(new Aeropuerto("SUQF","Paris"));
        aeropuertoRepository.save(new Aeropuerto("VIUL","Moscú"));
        aeropuertoRepository.save(new Aeropuerto("HCHF","Caracas"));
        aeropuertoRepository.save(new Aeropuerto("FCCG","La Habana"));
        aeropuertoRepository.save(new Aeropuerto("GSGS","Brujas"));
        aeropuertoRepository.save(new Aeropuerto("VFBD","Ámsterdam"));
        aeropuertoRepository.save(new Aeropuerto("QWQR","Bruselas"));
        aeropuertoRepository.save(new Aeropuerto("NHGS","Tokyo"));
        aeropuertoRepository.save(new Aeropuerto("AQRF","Hanói"));
        aeropuertoRepository.save(new Aeropuerto("HAEG","Wuhan"));
        aeropuertoRepository.save(new Aeropuerto("QPMD","Arizona"));
        aeropuertoRepository.save(new Aeropuerto("GAHA","Texas"));
        aeropuertoRepository.save(new Aeropuerto("QTJA","Varsovia"));
        aeropuertoRepository.save(new Aeropuerto("JATC","Cracovia"));
        aeropuertoRepository.save(new Aeropuerto("QVZG","Nueva Delhi"));
    }

    @PostConstruct
    public void initCompania(){ //Compañias aereas para la base de datos
        companiaRepository.save(new Compania("IB","Iberia","https://www.iberia.com/es/",901111500,4));
        companiaRepository.save(new Compania("FC","Ryanair","https://www.ryanair.com/es/es",902059712,1));
        companiaRepository.save(new Compania("FE","Emirates","https://www.emirates.com/es/spanish/",902791213,4));
        companiaRepository.save(new Compania("VI","Delta","https://es.delta.com/us/es",902123456,4));
        companiaRepository.save(new Compania("UL","AmericanAirlines","https://www.americanairlines.es/intl/es/index.jsp?locale=es_ES",902987654,2));
        companiaRepository.save(new Compania("GA","GulfAir","https://www.gulfair.com/",902489124,4));
        companiaRepository.save(new Compania("EJ","Easyjet","https://www.easyjet.com/es",902791582,2));
        companiaRepository.save(new Compania("AC","AirCaraibes","https://es.aircaraibes.com/es",902456852,5));
        companiaRepository.save(new Compania("OA","OlympicAir","https://www.olympicair.com/",902753159,3));
        companiaRepository.save(new Compania("WA","WizzAir","https://wizzair.com/es-es#/",902456951,2));
        companiaRepository.save(new Compania("AM","AirMalta","https://www.airmalta.com/",902789123,2));
        companiaRepository.save(new Compania("CD","Condor","https://www.condor.com/es",902746158,4));
        companiaRepository.save(new Compania("EA","EvaAir","https://www.evaair.com/",902482615,1));
        companiaRepository.save(new Compania("AP","AirEuropa","https://www.aireuropa.com/es/vuelos",902,3));
    }

    @PostConstruct
    public void initVuelo(){ //Vuelos para la base de datos (predominan los vuelos de madrid barcelona ida y vuelta porque son los que se han usado para ver el correcto funcionamiento)
        vueloRepository.save(new Vuelo("IB1234","Madrid","Barcelona","Iberia","2020-05-31","13:00:00",30,   37,true));
        vueloRepository.save(new Vuelo("IB1572","Madrid","Barcelona","Iberia","2020-05-31","15:00:00",31,   32, false));
        vueloRepository.save(new Vuelo("IB4428","Madrid","Barcelona","Iberia","2020-05-31","17:30:00",29,   41, true));
        vueloRepository.save(new Vuelo("IB7614","Madrid","Barcelona","Iberia","2020-05-31","02:10:00",30,   39, false));
//        vueloRepository.save(new Vuelo("FC5567","Madrid","Barcelona","Ryanair","2020-05-31","07:30:00",32,   59));
//        vueloRepository.save(new Vuelo("IB0043","Madrid","Barcelona","Iberia","2020-05-31","10:30:00",35,   48));
//        vueloRepository.save(new Vuelo("FC1288","Madrid","Barcelona","Ryanair","2020-05-31","12:10:00",37,   35));
//        vueloRepository.save(new Vuelo("AP6410","Madrid","Barcelona","AirEuropa","2020-05-31","13:10:00",33,   44));
//
        vueloRepository.save(new Vuelo("IB1895","Barcelona","Madrid","Iberia","2020-05-31","22:20:00",34,   49, true));
        vueloRepository.save(new Vuelo("FC8642","Barcelona","Madrid","Ryanair","2020-05-31","21:00:00",32,   39,true));
        vueloRepository.save(new Vuelo("FC8643","Barcelona","Madrid","Ryanair","2020-05-31","21:30:00",39,   36,false));
        vueloRepository.save(new Vuelo("FC8644","Barcelona","Madrid","Ryanair","2020-05-31","01:00:00",34,   35,false));
//        vueloRepository.save(new Vuelo("IB0444","Barcelona","Madrid","Iberia","2019-05-31","11:00:00",35,   33));
//        vueloRepository.save(new Vuelo("FC7214","Barcelona","Madrid","Ryanair","2020-05-31","08:00:00",39,   35));
//        vueloRepository.save(new Vuelo("AP9745","Barcelona","Madrid","AirEuropa","2020-05-31","13:45:00",30,   40));
//
//        vueloRepository.save(new Vuelo("FC2512","Brujas","Amsterdam","Ryanair","2020-05-22","21:50:00",120,   129));
//        vueloRepository.save(new Vuelo("FC5153","Bruselas","Amsterdam","Ryanair","2020-05-22","20:00:00",130,   109));
//
//        vueloRepository.save(new Vuelo("FC4001","Madrid","Vigo","Ryanair","2020-05-14","20:00:00",85,   80));
//        vueloRepository.save(new Vuelo("FC5601","Madrid","Vigo","Ryanair","2020-05-14","10:40:00",80,   90));
//
//        vueloRepository.save(new Vuelo("AC2222","Madrid","Caracas","AirCaraibes","2020-05-23","12:30:00",550,   880));
//
//        vueloRepository.save(new Vuelo("UL0371","Madrid","Texas","AmericanAirlines","2020-06-10","11:30:00",750,   1280));
//
//        vueloRepository.save(new Vuelo("UL9174","Madrid","Arizona","AmericanAirlines","2020-07-11","14:00:00",960,   2200));
//
//        vueloRepository.save(new Vuelo("FE7712","Madrid","Moscú","Emirates","2020-08-02","09:00:00",420,   1230));
//        vueloRepository.save(new Vuelo("FE4522","Madrid","Moscú","Emirates","2020-08-02","11:45:00",430,   1100));
//        vueloRepository.save(new Vuelo("FE0012","Moscú","Madrid","Emirates","2020-09-11","07:30:00",425,   980));
//        vueloRepository.save(new Vuelo("FC5521","Moscú","Madrid","Ryanair","2020-09-11","18:00:00",429,   1210));
    }

    public List<Aeropuerto> getAeropuertos(){ //get de los aeropuertos
        return aeropuertoRepository.findAll();
    }
}