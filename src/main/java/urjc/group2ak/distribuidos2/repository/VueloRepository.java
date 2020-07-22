package urjc.group2ak.distribuidos2.repository;

import org.springframework.data.jpa.repository.*;
import urjc.group2ak.distribuidos2.model.*;
import java.util.List;

// se buscan los vuelos por origen, destino y fecha y se guardan en una lista de vuelos
public interface VueloRepository extends JpaRepository<Vuelo, Integer> {
    List<Vuelo> findByOrigenAndDestinoAndFechaIgnoreCase(String origen, String destino, String fecha);
}
