package com.utez.sdipme.dao;

import com.utez.sdipme.model.Usuario;
import com.utez.sdipme.util.DatabaseConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

// DAO pattern implementation for User database operations.
public class UsuarioDao {

    // Persists a new user in the database safely for Oracle JDBC.
    public boolean insert(Usuario usuario, String tokenActivacion) {
        String sqlUsuario = "INSERT INTO usuarios (matricula, correo, nombre, apellidos, telefono, id_carrera, estado_cuenta, token_verificacion, intentos_fallidos) VALUES (?, ?, ?, ?, ?, ?, 'INACTIVO', ?, 0)";
        String sqlId = "SELECT id_usuario FROM usuarios WHERE correo = ?";
        String sqlPass = "INSERT INTO historial_contrasenas (id_usuario, hash_password, es_actual) VALUES (?, ?, 1)";

        try (Connection con = DatabaseConnection.getConnection()) {

            // Execute user insertion with profile details and career foreign key
            try (PreparedStatement psUser = con.prepareStatement(sqlUsuario)) {
                psUser.setString(1, usuario.getMatricula());
                psUser.setString(2, usuario.getCorreo());
                psUser.setString(3, usuario.getNombre());
                psUser.setString(4, usuario.getApellidos());
                psUser.setString(5, usuario.getTelefono());
                psUser.setInt(6, usuario.getIdCarrera());
                psUser.setString(7, tokenActivacion);

                int affectedRows = psUser.executeUpdate();
                if (affectedRows == 0) return false;
            }

            // Safely retrieve the generated ID to insert initial password hash
            int userId = -1;
            try (PreparedStatement psId = con.prepareStatement(sqlId)) {
                psId.setString(1, usuario.getCorreo());
                try (ResultSet rs = psId.executeQuery()) {
                    if (rs.next()) {
                        userId = rs.getInt("id_usuario");
                    }
                }
            }

            if (userId == -1) return false;

            try (PreparedStatement psPass = con.prepareStatement(sqlPass)) {
                psPass.setInt(1, userId);
                psPass.setString(2, usuario.getPasswordHash());
                psPass.executeUpdate();
            }

            return true;

        } catch (SQLException e) {
            System.err.println(">>> [DAO ERROR - UsuarioDao.java] Error inserting user: " + e.getMessage());
            e.printStackTrace();
            return false;
        }
    }

    // Activates user account and clears token.
    public boolean activarCuenta(String token) {
        String sql = "UPDATE usuarios SET estado_cuenta = 'ACTIVO', token_verificacion = NULL, intentos_fallidos = 0 WHERE token_verificacion = ?";

        try (Connection con = DatabaseConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setString(1, token);
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    // Updates the activation token for an inactive user.
    public boolean actualizarTokenActivacion(String correo, String nuevoToken) {
        String sql = "UPDATE usuarios SET token_verificacion = ? WHERE correo = ? AND estado_cuenta = 'INACTIVO'";

        try (Connection con = DatabaseConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setString(1, nuevoToken);
            ps.setString(2, correo);
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    // Retrieves a user by their email for authentication purposes.
    public Usuario findByCorreo(String correo) {
        // Updated SQL query: replaced obsolete 'carrera' column with 'id_carrera'
        String sql = "SELECT u.id_usuario, u.matricula, u.correo, u.nombre, u.apellidos, u.telefono, u.id_carrera, u.intentos_fallidos, u.estado_cuenta, h.hash_password " +
                "FROM usuarios u " +
                "INNER JOIN historial_contrasenas h ON u.id_usuario = h.id_usuario " +
                "WHERE u.correo = ? AND h.es_actual = 1";

        Usuario usuario = null;

        try (Connection con = DatabaseConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setString(1, correo);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    usuario = new Usuario();
                    usuario.setIdUsuario(rs.getInt("id_usuario"));
                    usuario.setMatricula(rs.getString("matricula"));
                    usuario.setCorreo(rs.getString("correo"));
                    usuario.setNombre(rs.getString("nombre"));
                    usuario.setApellidos(rs.getString("apellidos"));
                    usuario.setTelefono(rs.getString("telefono"));
                    usuario.setIdCarrera(rs.getInt("id_carrera")); // Mapped to integer foreign key
                    usuario.setIntentosFallidos(rs.getInt("intentos_fallidos"));
                    usuario.setEstado(rs.getString("estado_cuenta"));
                    usuario.setPasswordHash(rs.getString("hash_password"));
                }
            }
        } catch (SQLException e) {
            System.err.println(">>> [DAO ERROR - UsuarioDao.java] Failed to find user by email: " + e.getMessage());
            e.printStackTrace();
        }
        return usuario;
    }

    // --- SECURITY METHODS ---

    // Increments failed attempts and blocks account if limit is reached.
    public int registrarIntentoFallido(String correo) {
        String sqlIncrementar = "UPDATE usuarios SET intentos_fallidos = intentos_fallidos + 1 WHERE correo = ?";
        String sqlBloquear = "UPDATE usuarios SET estado_cuenta = 'BLOQUEADO' WHERE correo = ? AND intentos_fallidos >= 3";
        String sqlConsultar = "SELECT intentos_fallidos FROM usuarios WHERE correo = ?";

        try (Connection con = DatabaseConnection.getConnection()) {
            try (PreparedStatement ps1 = con.prepareStatement(sqlIncrementar)) {
                ps1.setString(1, correo);
                ps1.executeUpdate();
            }
            try (PreparedStatement ps2 = con.prepareStatement(sqlBloquear)) {
                ps2.setString(1, correo);
                ps2.executeUpdate();
            }
            try (PreparedStatement ps3 = con.prepareStatement(sqlConsultar)) {
                ps3.setString(1, correo);
                try (ResultSet rs = ps3.executeQuery()) {
                    if (rs.next()) return rs.getInt("intentos_fallidos");
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    // Resets failed attempts counter upon successful login.
    public void resetearIntentosFallidos(String correo) {
        String sql = "UPDATE usuarios SET intentos_fallidos = 0 WHERE correo = ?";
        try (Connection con = DatabaseConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setString(1, correo);
            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // Saves recovery token for password reset.
    public boolean guardarTokenRecuperacion(String correo, String token) {
        String sql = "UPDATE usuarios SET token_verificacion = ? WHERE correo = ?";
        try (Connection con = DatabaseConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setString(1, token);
            ps.setString(2, correo);
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    // Resets password, clears token, and unblocks account via transaction.
    public boolean restablecerPasswordConToken(String token, String nuevoPasswordHash) {
        String sqlUserId = "SELECT id_usuario FROM usuarios WHERE token_verificacion = ?";
        String sqlUpdateHistorialOld = "UPDATE historial_contrasenas SET es_actual = 0 WHERE id_usuario = ?";
        String sqlInsertHistorialNew = "INSERT INTO historial_contrasenas (id_usuario, hash_password, es_actual) VALUES (?, ?, 1)";
        String sqlActivarUsuario = "UPDATE usuarios SET estado_cuenta = 'ACTIVO', intentos_fallidos = 0, token_verificacion = NULL WHERE id_usuario = ?";

        try (Connection con = DatabaseConnection.getConnection()) {
            con.setAutoCommit(false);
            int userId = -1;

            try (PreparedStatement ps1 = con.prepareStatement(sqlUserId)) {
                ps1.setString(1, token);
                try (ResultSet rs = ps1.executeQuery()) {
                    if (rs.next()) userId = rs.getInt("id_usuario");
                }
            }

            if (userId == -1) return false;

            try (PreparedStatement ps2 = con.prepareStatement(sqlUpdateHistorialOld)) {
                ps2.setInt(1, userId);
                ps2.executeUpdate();
            }

            try (PreparedStatement ps3 = con.prepareStatement(sqlInsertHistorialNew)) {
                ps3.setInt(1, userId);
                ps3.setString(2, nuevoPasswordHash);
                ps3.executeUpdate();
            }

            try (PreparedStatement ps4 = con.prepareStatement(sqlActivarUsuario)) {
                ps4.setInt(1, userId);
                ps4.executeUpdate();
            }

            con.commit();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
}