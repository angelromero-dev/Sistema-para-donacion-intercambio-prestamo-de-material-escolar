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
        String sqlUsuario = "INSERT INTO usuarios (matricula, correo, carrera, estado_cuenta, token_verificacion) VALUES (?, ?, ?, 'INACTIVO', ?)";
        String sqlId = "SELECT id_usuario FROM usuarios WHERE correo = ?";
        String sqlPass = "INSERT INTO historial_contrasenas (id_usuario, hash_password, es_actual) VALUES (?, ?, 1)";

        try (Connection con = DatabaseConnection.getConnection()) {

            try (PreparedStatement psUser = con.prepareStatement(sqlUsuario)) {
                psUser.setString(1, usuario.getMatricula());
                psUser.setString(2, usuario.getCorreo());
                psUser.setString(3, usuario.getCarrera());
                psUser.setString(4, tokenActivacion);

                int affectedRows = psUser.executeUpdate();
                if (affectedRows == 0) {
                    return false;
                }
            }

            // 2. Safely retrieve the generated ID by querying the unique email
            int userId = -1;
            try (PreparedStatement psId = con.prepareStatement(sqlId)) {
                psId.setString(1, usuario.getCorreo());
                try (ResultSet rs = psId.executeQuery()) {
                    if (rs.next()) {
                        userId = rs.getInt("id_usuario");
                    }
                }
            }

            if (userId == -1) {
                return false;
            }

            // 3. Insert the hashed password into the history table
            try (PreparedStatement psPass = con.prepareStatement(sqlPass)) {
                psPass.setInt(1, userId);
                psPass.setString(2, usuario.getPasswordHash());
                return psPass.executeUpdate() > 0;
            }

        } catch (SQLException e) {
            System.err.println("Database error during user registration:");
            e.printStackTrace();
            return false;
        }
    }

    // Inserts the hashed password into the history table.
    private boolean insertPasswordHistory(int idUsuario, String hashPassword, Connection con) throws SQLException {
        String sql = "INSERT INTO historial_contrasenas (id_usuario, hash_password, es_actual) VALUES (?, ?, 1)";
        try (PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setInt(1, idUsuario);
            ps.setString(2, hashPassword);
            return ps.executeUpdate() > 0;
        }
    }

    // Token Email
    public boolean activarCuenta(String token) {
        String sql = "UPDATE usuarios SET estado_cuenta = 'ACTIVO', token_verificacion = NULL WHERE token_verificacion = ?";

        try (Connection con = DatabaseConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setString(1, token);
            return ps.executeUpdate() > 0;

        } catch (SQLException e) {
            System.err.println(">>> [DAO ERROR] Fallo al intentar activar cuenta con token: " + e.getMessage());
            e.printStackTrace();
            return false;
        }
    }

    // Updates the activation token for an inactive user
    public boolean actualizarTokenActivacion(String correo, String nuevoToken) {
        String sql = "UPDATE usuarios SET token_verificacion = ? WHERE correo = ? AND estado_cuenta = 'INACTIVO'";

        try (Connection con = DatabaseConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setString(1, nuevoToken);
            ps.setString(2, correo);

            int filasAfectadas = ps.executeUpdate();
            return filasAfectadas > 0;

        } catch (SQLException e) {
            System.err.println("Database error while updating activation token:");
            e.printStackTrace();
            return false;
        }
    }

    // Retrieves a user by their email for authentication purposes.
    public Usuario findByCorreo(String correo) {
        String sql = "SELECT u.id_usuario, u.matricula, u.correo, u.carrera, u.intentos_fallidos, u.estado_cuenta, h.hash_password " +
                "FROM usuarios u " +
                "INNER JOIN historial_contrasenas h ON u.id_usuario = h.id_usuario " +
                "WHERE u.correo = ? AND h.es_actual = 1";

        try (Connection con = DatabaseConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setString(1, correo);
            System.out.println(">>> [DEBUG DAO] Buscando en BD el correo: " + correo);

            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    Usuario user = new Usuario();
                    user.setIdUsuario(rs.getInt("id_usuario"));
                    user.setMatricula(rs.getString("matricula"));
                    user.setCorreo(rs.getString("correo"));
                    user.setCarrera(rs.getString("carrera"));

                    user.setIntentosFallidos(rs.getInt("intentos_fallidos"));
                    user.setEstado(rs.getString("estado_cuenta"));
                    user.setPasswordHash(rs.getString("hash_password"));

                    return user;
                }
            }
        } catch (SQLException e) {
            System.err.println("Database error while fetching user by email:");
            e.printStackTrace();
        }
        return null;
    }
}