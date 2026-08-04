package org.utez.sdipme.model;

public class Usuario {

    private int idUsuario;
    private String matricula;
    private String correo;
    private String passwordHash;

    // Security fields
    private int intentosFallidos;
    private String estado;

    // Default constructor required by JavaBean conventions
    public Usuario() {
    }

    // Parameterized constructor for registration
    public Usuario(String matricula, String correo, String passwordHash) {
        this.matricula = matricula;
        this.correo = correo;
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

    public String getPasswordHash() { return passwordHash; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }

    public int getIntentosFallidos() { return intentosFallidos; }
    public void setIntentosFallidos(int intentosFallidos) { this.intentosFallidos = intentosFallidos; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
}