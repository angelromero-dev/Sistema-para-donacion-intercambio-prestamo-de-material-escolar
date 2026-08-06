package com.utez.sdipme.model;

public class Carrera {
    private int idCarrera;
    private int idDivision;
    private String nombre;

    public Carrera() {}

    public int getIdCarrera() { return idCarrera; }
    public void setIdCarrera(int idCarrera) { this.idCarrera = idCarrera; }
    public int getIdDivision() { return idDivision; }
    public void setIdDivision(int idDivision) { this.idDivision = idDivision; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
}