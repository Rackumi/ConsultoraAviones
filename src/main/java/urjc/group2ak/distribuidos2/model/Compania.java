package urjc.group2ak.distribuidos2.model;

import javax.persistence.*;

@Entity
public class Compania {

    // atributos
    @Id
    private String codigo; // codigo es el identificador (dos letras mayus)
    @Column(nullable = false)
    private String nombre;
    @Column(nullable = false)
    private String enlace;
    @Column(nullable = false)
    private int tlf;
    @Column(nullable = false)
    private int valoracion;

    // constructor sin argumentos
    public Compania(){
    }

    // constructor con argumentos
    public Compania(String codigo, String nombre, String enlace, int tlf, int valoracion){
        this.codigo = codigo;
        this.nombre = nombre;
        this.enlace = enlace;
        this.tlf = tlf;
        this.valoracion = valoracion;
    }

    // getters and setters
    public String getNombre() {
        return nombre;
    }

    public String getCodigo() {
        return codigo;
    }

    public String getEnlace() {
        return enlace;
    }

    public int getTlf() {
        return tlf;
    }

    public int getValoracion() {
        return valoracion;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public void setEnlace(String enlace) {
        this.enlace = enlace;
    }

    public void setTlf(int tlf) {
        this.tlf = tlf;
    }

    public void setValoracion(int valoracion) {
        this.valoracion = valoracion;
    }

    // toString
    @Override
    public String toString(){
        return (this.nombre+" "+this.codigo+""+this.enlace+""+this.tlf+""+this.valoracion);
    }
}