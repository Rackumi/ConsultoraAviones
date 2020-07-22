package urjc.group2ak.distribuidos2.model;

import javax.persistence.*;

@Entity
public class Aeropuerto {

    // atributos
    @Id
    private String codigo; //4 letras MAYUS
    @Column(nullable = false)
    private String nombre; // ejemplo -> Madrid (Barajas-Adolfo Suarez)

    // constructor sin argumentos
    public Aeropuerto(){
    }

    // constructor con argumentos
    public Aeropuerto(String codigo, String nombre){
        this.codigo = codigo;
        this.nombre = nombre;
    }

    // getters and setters
    public String getCodigo() {
        return codigo;
    }

    public String getNombre() {
        return nombre;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    // toString
    @Override
    public String toString(){
        return this.codigo+""+this.nombre;
    }
}