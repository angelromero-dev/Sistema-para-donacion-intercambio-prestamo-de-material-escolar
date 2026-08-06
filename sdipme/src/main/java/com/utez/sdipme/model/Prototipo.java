package com.utez.sdipme.model;

public class Prototipo {
    private int idPrototipo;
    private int idUsuario;
    private String titulo;
    private String descripcionCorta;
    private String descripcionLarga;
    private String urlImagen;
    private int idCarrera;
    private int idCategoria;
    private String tipoTransaccion;
    private String estadoPublicacion;

    public Prototipo() {}

    public int getIdPrototipo() { return idPrototipo; }
    public void setIdPrototipo(int idPrototipo) { this.idPrototipo = idPrototipo; }
    public int getIdUsuario() { return idUsuario; }
    public void setIdUsuario(int idUsuario) { this.idUsuario = idUsuario; }
    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }
    public String getDescripcionCorta() { return descripcionCorta; }
    public void setDescripcionCorta(String descripcionCorta) { this.descripcionCorta = descripcionCorta; }
    public String getDescripcionLarga() { return descripcionLarga; }
    public void setDescripcionLarga(String descripcionLarga) { this.descripcionLarga = descripcionLarga; }
    public String getUrlImagen() { return urlImagen; }
    public void setUrlImagen(String urlImagen) { this.urlImagen = urlImagen; }
    public int getIdCarrera() { return idCarrera; }
    public void setIdCarrera(int idCarrera) { this.idCarrera = idCarrera; }
    public int getIdCategoria() { return idCategoria; }
    public void setIdCategoria(int idCategoria) { this.idCategoria = idCategoria; }
    public String getTipoTransaccion() { return tipoTransaccion; }
    public void setTipoTransaccion(String tipoTransaccion) { this.tipoTransaccion = tipoTransaccion; }
    public String getEstadoPublicacion() { return estadoPublicacion; }
    public void setEstadoPublicacion(String estadoPublicacion) { this.estadoPublicacion = estadoPublicacion; }
}
