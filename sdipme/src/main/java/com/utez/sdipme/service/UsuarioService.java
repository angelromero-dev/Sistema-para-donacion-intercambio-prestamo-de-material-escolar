package com.utez.sdipme.service;

import com.utez.sdipme.dao.UsuarioDao;
import com.utez.sdipme.model.Usuario;
import com.utez.sdipme.service.EmailService;
import com.utez.sdipme.util.PasswordUtil;

// Business logic layer for User operations.
public class UsuarioService {

    private final UsuarioDao usuarioDao;

    // Dependency injection via constructor.
    public UsuarioService() {
        this.usuarioDao = new UsuarioDao();
    }

    // Handles the business logic for registering a new student.
    public String registrarUsuario(String matricula, String correo, String carrera, String passwordPlana, String tokenActivacion) {

        if (passwordPlana == null || passwordPlana.length() < 6 || passwordPlana.length() > 20) {
            return "Error: La contraseña debe tener entre 6 y 20 caracteres.";
        }

        if (!passwordPlana.matches(".*[A-Z].*")) {
            return "Error: La contraseña debe contener al menos una letra mayúscula.";
        }

        if (matricula == null || matricula.isEmpty() || correo == null || correo.isEmpty() || carrera == null || carrera.isEmpty()) {
            return "Error: Matrícula, correo y carrera son obligatorios.";
        }

        String hash = PasswordUtil.hashPassword(passwordPlana);

        Usuario nuevoUsuario = new Usuario(matricula, correo, carrera, hash);

        boolean exito = usuarioDao.insert(nuevoUsuario, tokenActivacion);

        if (exito) {
            return "EXITO";
        } else {
            return "Error: No se pudo registrar el usuario. Es posible que el correo o matrícula ya existan.";
        }
    }

    // Generates a new activation token and resends the email to an inactive user
    public String reenviarTokenActivacion(String correo) {
        if (correo == null || correo.trim().isEmpty()) {
            return "El correo electrónico es obligatorio.";
        }

        String nuevoToken = java.util.UUID.randomUUID().toString();

        boolean actualizado = usuarioDao.actualizarTokenActivacion(correo, nuevoToken);

        if (!actualizado) {
            return "El correo no está registrado o la cuenta ya se encuentra activa.";
        }

        boolean correoEnviado = EmailService.enviarCorreoVerificacion(correo, nuevoToken);

        if (!correoEnviado) {
            return "Error al enviar el correo electrónico. Intenta nuevamente.";
        }

        return "EXITO";
    }

    // Handles the business logic for user authentication.
    public String autenticarUsuario(String correo, String passwordPlana) {

        if (correo == null || correo.isEmpty() || passwordPlana == null || passwordPlana.isEmpty()) {
            return "Error: El correo y la contraseña son obligatorios.";
        }

        // 1. Fetch user from database.
        Usuario usuario = usuarioDao.findByCorreo(correo);

        if (usuario == null) {
            System.out.println(">>> [DEBUG SERVICE] El usuario devuelto por el DAO es NULL.");
            return "Error: Credenciales incorrectas o cuenta inexistente.";
        }

        if (!"ACTIVO".equals(usuario.getEstado())) {
            return "Error: La cuenta se encuentra bloqueada o no ha sido activada (Revisa tu correo).";
        }

        // 2. Verify password using BCrypt.
        System.out.println(">>> [DEBUG SERVICE] Comparando contraseña plana con el Hash usando BCrypt...");
        boolean passwordValid = PasswordUtil.checkPassword(passwordPlana, usuario.getPasswordHash());
        System.out.println(">>> [DEBUG SERVICE] Resultado de la validación BCrypt: " + passwordValid);

        if (!passwordValid) {
            return "Error: Credenciales incorrectas.";
        }

        return "EXITO";
    }
}