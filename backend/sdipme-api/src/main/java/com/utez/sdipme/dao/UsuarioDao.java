package com.utez.sdipme.dao;

import com.utez.sdipme.model.Usuario;
import com.utez.sdipme.util.DatabaseConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

// DAO pattern implementation for User database operations.
public class UsuarioDao {

    // Persists a new user in the database.
    public boolean insert(Usuario usuario) {
        String sql = "INSERT INTO usuarios (matricula, correo) VALUES (?, ?)";

        // try-with-resources ensures that connections are closed automatically to prevent memory leaks.
        try (Connection con = DatabaseConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql, new String[]{"id_usuario"})) {

            ps.setString(1, usuario.getMatricula());
            ps.setString(2, usuario.getCorreo());

            int affectedRows = ps.executeUpdate();

            // If the user was created, we fetch the generated ID to insert the password in the history table.
            if (affectedRows > 0) {
                try (ResultSet generatedKeys = ps.getGeneratedKeys()) {
                    if (generatedKeys.next()) {
                        int userId = generatedKeys.getInt(1);
                        return insertPasswordHistory(userId, usuario.getPasswordHash(), con);
                    }
                }
            }
            return false;

        } catch (SQLException e) {
            System.err.println("Database error during user registration: " + e.getMessage());
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

    // Retrieves a user by their email for authentication purposes.
    public Usuario findByCorreo(String correo) {
        // SQL query with JOIN to get user data along with their current active password.
        String sql = "SELECT u.id_usuario, u.matricula, u.correo, u.intentos_fallidos, u.estado, h.hash_password " +
                "FROM usuarios u " +
                "INNER JOIN historial_contrasenas h ON u.id_usuario = h.id_usuario " +
                "WHERE u.correo = ? AND h.es_actual = 1";

        try (Connection con = DatabaseConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setString(1, correo);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    Usuario user = new Usuario();
                    user.setIdUsuario(rs.getInt("id_usuario"));
                    user.setMatricula(rs.getString("matricula"));
                    user.setCorreo(rs.getString("correo"));
                    user.setIntentosFallidos(rs.getInt("intentos_fallidos"));
                    user.setEstado(rs.getString("estado"));
                    user.setPasswordHash(rs.getString("hash_password"));
                    return user;
                }
            }
        } catch (SQLException e) {
            System.err.println("Database error while fetching user by email: " + e.getMessage());
        }
        return null;
    }
}