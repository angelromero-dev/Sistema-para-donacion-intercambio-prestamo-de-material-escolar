package com.utez.sdipme.dto;

public record UsuarioPerfilDTO(
        int idUsuario,
        String nombre,
        String apellidos,
        String telefono,
        String matricula,
        String correo,
        String carrera,
        int idCarrera,
        String fotoUrl,
        double reputacion,
        boolean isAdmin
) {}