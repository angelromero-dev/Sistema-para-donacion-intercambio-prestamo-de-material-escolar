package com.utez.sdipme.model;

public class Usuario {

    private int idUsuario;
    private String matricula;
    private String correo;
    private String nombre;
    private String apellidos;
    private String telefono;
    private int idCarrera;
    private String passwordHash;
    private int intentosFallidos;
    private String estado;
    private double reputacion;
    private String ultimoAcceso;

    // 1. Default constructor required by DAO for fetching records
    public Usuario() {}

    // 2. Parameterized constructor for new user registration
    public Usuario(String matricula, String correo, String nombre, String apellidos, String telefono, int idCarrera, String passwordHash) {
        this.matricula = matricula;
        this.correo = correo;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.telefono = telefono;
        this.idCarrera = idCarrera;
        this.passwordHash = passwordHash;
        this.estado = "INACTIVO";
        this.intentosFallidos = 0;
        this.reputacion = 5.0; // Default value matching DB schema
    }

    // --- GETTERS & SETTERS ---

    public int getIdUsuario() { return idUsuario; }
    public void setIdUsuario(int idUsuario) { this.idUsuario = idUsuario; }

    public String getMatricula() { return matricula; }
    public void setMatricula(String matricula) { this.matricula = matricula; }

    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getApellidos() { return apellidos; }
    public void setApellidos(String apellidos) { this.apellidos = apellidos; }

    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }

    public int getIdCarrera() { return idCarrera; }
    public void setIdCarrera(int idCarrera) { this.idCarrera = idCarrera; }

    public String getPasswordHash() { return passwordHash; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }

    public int getIntentosFallidos() { return intentosFallidos; }
    public void setIntentosFallidos(int intentosFallidos) { this.intentosFallidos = intentosFallidos; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public double getReputacion() { return reputacion; }
    public void setReputacion(double reputacion) { this.reputacion = reputacion; }

    public String getUltimoAcceso() { return ultimoAcceso; }
    public void setUltimoAcceso(String ultimoAcceso) { this.ultimoAcceso = ultimoAcceso; }
}