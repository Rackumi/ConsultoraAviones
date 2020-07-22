package urjc.group2ak.distribuidos2.repository;

import org.springframework.data.jpa.repository.*;
import urjc.group2ak.distribuidos2.model.Aeropuerto;
import java.util.List;

// se buscan los aeropuertos por nombre y se guardan en una lista de aeropuertos
public interface AeropuertoRepository extends JpaRepository<Aeropuerto, Integer>{
    List<Aeropuerto> findAeropuertoByNombreIgnoreCase(String nombre);
}
