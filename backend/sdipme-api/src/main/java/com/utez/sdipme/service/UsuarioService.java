package com.utez.sdipme.service;

import com.utez.sdipme.dao.UsuarioDao;
import com.utez.sdipme.model.Usuario;
import com.utez.sdipme.util.PasswordUtil;

// Business logic layer for User operations.
public class UsuarioService {

    private final UsuarioDao usuarioDao;

    // Dependency injection via constructor.
    public UsuarioService() {
        this.usuarioDao = new UsuarioDao();
    }

    // Handles the business logic for registering a new student.
    public String registrarUsuario(String matricula, String correo, String passwordPlana) {

        // 1. Business Rule Validation: Password constraints.
        if (passwordPlana == null || passwordPlana.length() < 6 || passwordPlana.length() > 20) {
            return "Error: La contraseña debe tener entre 6 y 20 caracteres.";
        }

        if (!passwordPlana.matches(".*[A-Z].*")) {
            return "Error: La contraseña debe contener al menos una letra mayúscula.";
        }

        // 2. Business Rule Validation: Identity constraints.
        if (matricula == null || matricula.isEmpty() || correo == null || correo.isEmpty()) {
            return "Error: La matrícula y el correo son obligatorios.";
        }

        // 3. Security: Hash the password before creating the model.
        String hash = PasswordUtil.hashPassword(passwordPlana);
        Usuario nuevoUsuario = new Usuario(matricula, correo, hash);

        // 4. Persistence: Delegate to DAO.
        boolean exito = usuarioDao.insert(nuevoUsuario);

        if (exito) {
            return "EXITO";
        } else {
            return "Error: No se pudo registrar el usuario. Es posible que el correo o matrícula ya existan.";
        }
    }
}
