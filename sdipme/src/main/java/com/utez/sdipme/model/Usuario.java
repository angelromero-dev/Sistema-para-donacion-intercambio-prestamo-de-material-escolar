package com.utez.sdipme.model;

public class Usuario {

    private int idUsuario;
    private String matricula;
    private String correo;
    private String carrera;
    private String passwordHash;

    private int intentosFallidos;
    private String estado;

    public Usuario() {}

    public Usuario(String matricula, String correo, String carrera, String passwordHash) {
        this.matricula = matricula;
        this.correo = correo;
        this.carrera = carrera;
        this.passwordHash = passwordHash;
        this.estado = "ACTIVO";
        this.intentosFallidos = 0;
    }

    // --- Getters and Setters ---
    public int getIdUsuario() { return idUsuario; }
    public void setIdUsuario(int idUsuario) { this.idUsuario = idUsuario; }

    public String getMatricula() { return matricula; }
    public void setMatricula(String matricula) { this.matricula = matricula; }

    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }

    // ESTOS SON LOS MÉTODOS QUE TU DAO ESTÁ BUSCANDO:
    public String getCarrera() { return carrera; }
    public void setCarrera(String carrera) { this.carrera = carrera; }

    public String getPasswordHash() { return passwordHash; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }

    public int getIntentosFallidos() { return intentosFallidos; }
    public void setIntentosFallidos(int intentosFallidos) { this.intentosFallidos = intentosFallidos; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
}