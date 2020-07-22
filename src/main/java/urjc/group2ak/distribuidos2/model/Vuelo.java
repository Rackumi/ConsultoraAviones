package urjc.group2ak.distribuidos2.model;

import javax.persistence.*;

@Entity
public class Vuelo {

    // atributos
    @Id
    private String codigo; //codigo es el identificador
    @Column(nullable = false)
    private String origen;
    @Column(nullable = false)
    private String destino;
    @Column(nullable = false)
    private String compania;
    @Column(nullable = false)
    private String fecha;
    @Column(nullable = false)
    private String horaSalida;
    @Column(nullable = false)
    private double duracion;
    @Column(nullable = false)
    private double precio;
    @Column(nullable = false)
    private boolean ecologico;

    // constructor sin argumentos
    public Vuelo() {
    }

    // constructor con argumentos
    public Vuelo(String codigo, String origen, String destino, String compania, String fecha, String horaSalida, double duracion, double precio, boolean ecologico){
        this.codigo = codigo;
        this.origen = origen;
        this.destino = destino;
        this.compania = compania;
        this.fecha = fecha;
        this.horaSalida=horaSalida;
        this.duracion=duracion;
        this.precio=precio;
        this.ecologico=ecologico;
    }

    // getters and setters
    public String getCodigo() { return codigo; }

    public void setCodigo(String codigo) { this.codigo = codigo; }

    public String getFecha() { return fecha; }

    public void setFecha(String fecha) { this.fecha = fecha; }

    public String getHoraSalida() { return horaSalida; }

    public void setHoraSalida(String horaSalida) { this.horaSalida = horaSalida; }

    public double getDuracion() { return duracion; }

    public void setDuracion(double duracion) { this.duracion = duracion; }

    public double getPrecio() { return precio; }

    public void setPrecio(double precio) { this.precio = precio; }

    public String getOrigen() {
        return origen;
    }

    public void setOrigen(String origen) {
        this.origen = origen;
    }

    public String getDestino() {
        return destino;
    }

    public void setDestino(String destino) {
        this.destino = destino;
    }

    public String getCompania() {
        return compania;
    }

    public void setCompania(String compania) {
        this.compania = compania;
    }

    public boolean getEcologico() {
        return ecologico;
    }

    public void setEcologico(boolean ecologico) {
        this.ecologico = ecologico;
    }

    // toString
    @Override
    public String toString(){
        return (this.codigo+" "+this.origen+""+this.destino+""+this.compania+""+this.fecha+""+this.horaSalida+""+this.duracion+""+this.precio+""+this.ecologico);
    }

}