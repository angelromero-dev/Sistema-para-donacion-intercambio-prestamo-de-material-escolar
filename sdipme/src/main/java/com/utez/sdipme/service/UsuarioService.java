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
    public String registrarUsuario(String matricula, String correo, String nombre, String apellidos, String telefono, int idCarrera, String passwordPlana, String tokenActivacion) {

        if (matricula == null || matricula.isEmpty() || correo == null || correo.isEmpty() || nombre == null || nombre.isEmpty() || apellidos == null || apellidos.isEmpty() || telefono == null || telefono.isEmpty() || idCarrera <= 0) {
            return "Error: Todos los campos del perfil y la carrera son obligatorios.";
        }

        if (!correo.toLowerCase().endsWith("@utez.edu.mx")) {
            return "Error: Solo se permiten correos institucionales de la UTEZ (@utez.edu.mx).";
        }

        if (passwordPlana == null || passwordPlana.length() < 6 || passwordPlana.length() > 20) {
            return "Error: La contraseña debe tener entre 6 y 20 caracteres.";
        }
        if (!passwordPlana.matches(".*[A-Z].*")) {
            return "Error: La contraseña debe contener al menos una letra mayúscula.";
        }
        if (telefono == null || !telefono.matches("\\d{10}")) {
            return "Error: El número de teléfono debe contener exactamente 10 dígitos.";
        }

        String hash = PasswordUtil.hashPassword(passwordPlana);
        Usuario nuevoUsuario = new Usuario(matricula, correo, nombre, apellidos, telefono, idCarrera, hash);

        boolean exito = usuarioDao.insert(nuevoUsuario, tokenActivacion);
        return exito ? "EXITO" : "Error al registrar el usuario. El correo o matrícula ya existen.";
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

    public com.utez.sdipme.dto.UsuarioPerfilDTO obtenerPerfil(int idUsuario) {
        return usuarioDao.getPerfilCompleto(idUsuario);
    }

    public String actualizarPerfilBasico(int idUsuario, String nombre, String apellidos) {
        if (nombre == null || nombre.trim().isEmpty() || apellidos == null || apellidos.trim().isEmpty()) {
            return "El nombre y los apellidos son obligatorios.";
        }
        boolean exito = usuarioDao.actualizarNombres(idUsuario, nombre, apellidos);
        return exito ? "EXITO" : "Error al actualizar la información personal.";
    }

    public String actualizarTelefono(int idUsuario, String telefono) {
        if (telefono == null || !telefono.matches("\\d{10}")) {
            return "El número de teléfono debe contener exactamente 10 dígitos.";
        }
        boolean exito = usuarioDao.actualizarTelefono(idUsuario, telefono);
        return exito ? "EXITO" : "Error al actualizar el teléfono.";
    }

    public String actualizarCarrera(int idUsuario, int idCarrera) {
        if (idCarrera <= 0) return "Carrera inválida.";
        boolean exito = usuarioDao.actualizarCarrera(idUsuario, idCarrera);
        return exito ? "EXITO" : "Error al actualizar la carrera.";
    }

    public String suspenderCuenta(int idUsuario) {
        boolean exito = usuarioDao.suspenderCuenta(idUsuario);
        return exito ? "EXITO" : "Error al suspender la cuenta.";
    }

    /**
     * Validates current password before changing to a new one.
     */
    public String cambiarPasswordSeguro(int idUsuario, String correo, String passwordActual, String passwordNueva) {
        Usuario usuario = usuarioDao.findByCorreo(correo);

        if (usuario == null || !PasswordUtil.checkPassword(passwordActual, usuario.getPasswordHash())) {
            return "La contraseña actual es incorrecta.";
        }
        if (passwordNueva == null || passwordNueva.length() < 8 || !passwordNueva.matches(".*[A-Z].*") || !passwordNueva.matches(".*\\d.*")) {
            return "La nueva contraseña no cumple con los requisitos de seguridad.";
        }

        String nuevoHash = PasswordUtil.hashPassword(passwordNueva);
        boolean exito = usuarioDao.cambiarPassword(idUsuario, nuevoHash);
        return exito ? "EXITO" : "Error al actualizar la contraseña.";
    }

    /**
     * Enforces password verification before permanently deleting the account.
     */
    public String eliminarCuentaPermanente(int idUsuario, String correo, String passwordConfirmacion) {
        Usuario usuario = usuarioDao.findByCorreo(correo);

        if (usuario == null || !PasswordUtil.checkPassword(passwordConfirmacion, usuario.getPasswordHash())) {
            return "Contraseña incorrecta. Acción denegada.";
        }

        boolean exito = usuarioDao.eliminarCuentaPermanente(idUsuario);
        return exito ? "EXITO" : "Error crítico al intentar eliminar la cuenta.";
    }
}