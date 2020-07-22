package urjc.group2ak.distribuidos2.repository;

import org.springframework.data.jpa.repository.*;
import urjc.group2ak.distribuidos2.model.Compania;

// se busca una compañia por su nombre y se devuelve
public interface CompaniaRepository extends JpaRepository<Compania, Integer>{
    Compania findByNombreIgnoreCase(String nombre);
}
