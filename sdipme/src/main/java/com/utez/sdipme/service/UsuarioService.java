package com.utez.sdipme.service;

import com.utez.sdipme.dao.UsuarioDao;
import com.utez.sdipme.model.Usuario;
import com.utez.sdipme.service.EmailService;
import com.utez.sdipme.util.PasswordUtil;

// Business logic layer for User operations.
public class UsuarioService {

    private final UsuarioDao usuarioDao;

    public UsuarioService() {
        this.usuarioDao = new UsuarioDao();
    }

    // Handles user registration and business rules validation.
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
        return exito ? "EXITO" : "Error: El correo o matrícula ya están registrados.";
    }

    // Generates a new token and resends the activation email.
    public String reenviarTokenActivacion(String correo) {
        if (correo == null || correo.trim().isEmpty()) return "El correo es obligatorio.";

        String nuevoToken = java.util.UUID.randomUUID().toString();
        boolean actualizado = usuarioDao.actualizarTokenActivacion(correo, nuevoToken);

        if (!actualizado) return "El correo no está registrado o la cuenta ya está activa.";

        boolean correoEnviado = EmailService.enviarCorreoVerificacion(correo, nuevoToken);
        return correoEnviado ? "EXITO" : "Error al enviar el correo de activación.";
    }

    // Authenticates user and manages brute-force lock mechanism.
    public String autenticarUsuario(String correo, String passwordPlana) {
        if (correo == null || correo.isEmpty() || passwordPlana == null || passwordPlana.isEmpty()) {
            return "Error: El correo y la contraseña son obligatorios.";
        }

        Usuario usuario = usuarioDao.findByCorreo(correo);
        if (usuario == null) return "Error: Credenciales incorrectas o cuenta inexistente.";

        if ("INACTIVO".equals(usuario.getEstado())) {
            return "Error: La cuenta no ha sido activada. Revisa tu correo institucional.";
        }
        if ("BLOQUEADO".equals(usuario.getEstado())) {
            return "Error: La cuenta ha sido BLOQUEADA. Solicita recuperar contraseña para desbloquearla.";
        }

        boolean passwordValid = PasswordUtil.checkPassword(passwordPlana, usuario.getPasswordHash());

        if (!passwordValid) {
            int intentos = usuarioDao.registrarIntentoFallido(correo);
            if (intentos >= 3) {
                return "Error: Has acumulado 3 intentos fallidos. Tu cuenta ha sido BLOQUEADA.";
            } else {
                int restantes = 3 - intentos;
                return "Error: Credenciales incorrectas. Te quedan " + restantes + " intento(s).";
            }
        }

        usuarioDao.resetearIntentosFallidos(correo);
        return "EXITO";
    }

    // Initiates password recovery process.
    public String solicitarRecuperacionPassword(String correo) {
        if (correo == null || correo.trim().isEmpty()) return "El correo es obligatorio.";

        Usuario usuario = usuarioDao.findByCorreo(correo);
        if (usuario == null) return "Error: Correo no encontrado en la base de datos.";

        String token = java.util.UUID.randomUUID().toString();
        boolean guardado = usuarioDao.guardarTokenRecuperacion(correo, token);

        if (guardado) {
            boolean correoEnviado = EmailService.enviarCorreoRecuperacion(correo, token);
            return correoEnviado ? "EXITO" : "Error al enviar el correo de recuperación.";
        }
        return "Error interno al procesar la solicitud.";
    }

    // Verifies token and updates user password.
    public String restablecerPassword(String token, String nuevaPasswordPlana) {
        if (token == null || token.trim().isEmpty()) return "Token inválido o expirado.";
        if (nuevaPasswordPlana == null || nuevaPasswordPlana.length() < 6 || nuevaPasswordPlana.length() > 20) {
            return "Error: La contraseña debe tener entre 6 y 20 caracteres.";
        }
        if (!nuevaPasswordPlana.matches(".*[A-Z].*")) {
            return "Error: La contraseña debe contener al menos una letra mayúscula.";
        }

        String nuevoHash = PasswordUtil.hashPassword(nuevaPasswordPlana);
        boolean exito = usuarioDao.restablecerPasswordConToken(token, nuevoHash);

        return exito ? "EXITO" : "Error: El enlace de recuperación es inválido o ya fue utilizado.";
    }
}