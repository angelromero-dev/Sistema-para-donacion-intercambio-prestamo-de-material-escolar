package com.utez.sdipme.model;
import java.sql.Timestamp;

public class Solicitud {
    private int idSolicitud;
    private int idPrototipo;
    private int idSolicitante;
    private String mensajeJustificacion;
    private Integer diasPrestamo;
    private String ofertaIntercambio;
    private String fotoIntercambio;
    private String estado;
    private Timestamp fechaSolicitud;
    private Timestamp fechaActualizacion;

    public Solicitud() {}

    public int getIdSolicitud() { return idSolicitud; }
    public void setIdSolicitud(int idSolicitud) { this.idSolicitud = idSolicitud; }

    public int getIdPrototipo() { return idPrototipo; }
    public void setIdPrototipo(int idPrototipo) { this.idPrototipo = idPrototipo; }

    public int getIdSolicitante() { return idSolicitante; }
    public void setIdSolicitante(int idSolicitante) { this.idSolicitante = idSolicitante; }

    public String getMensajeJustificacion() { return mensajeJustificacion; }
    public void setMensajeJustificacion(String mensajeJustificacion) { this.mensajeJustificacion = mensajeJustificacion; }

    public Integer getDiasPrestamo() { return diasPrestamo; }
    public void setDiasPrestamo(Integer diasPrestamo) { this.diasPrestamo = diasPrestamo; }

    public String getOfertaIntercambio() { return ofertaIntercambio; }
    public void setOfertaIntercambio(String ofertaIntercambio) { this.ofertaIntercambio = ofertaIntercambio; }

    public String getFotoIntercambio() { return fotoIntercambio; }
    public void setFotoIntercambio(String fotoIntercambio) { this.fotoIntercambio = fotoIntercambio; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public Timestamp getFechaSolicitud() { return fechaSolicitud; }
    public void setFechaSolicitud(Timestamp fechaSolicitud) { this.fechaSolicitud = fechaSolicitud; }

    public Timestamp getFechaActualizacion() { return fechaActualizacion; }
    public void setFechaActualizacion(Timestamp fechaActualizacion) { this.fechaActualizacion = fechaActualizacion; }
}