package com.utez.sdipme.dao;

import com.utez.sdipme.model.Solicitud;
import com.utez.sdipme.util.DatabaseConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class SolicitudDao {

    public boolean registrarSolicitud(Solicitud s) {
        String sql = "INSERT INTO solicitudes (id_prototipo, id_solicitante, mensaje_justificacion, dias_prestamo, oferta_intercambio, foto_intercambio, estado) VALUES (?, ?, ?, ?, ?, ?, 'PENDIENTE')";
        try (Connection con = DatabaseConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setInt(1, s.getIdPrototipo());
            ps.setInt(2, s.getIdSolicitante());
            ps.setString(3, s.getMensajeJustificacion());

            if (s.getDiasPrestamo() != null) {
                ps.setInt(4, s.getDiasPrestamo());
            } else {
                ps.setNull(4, java.sql.Types.INTEGER);
            }

            ps.setString(5, s.getOfertaIntercambio());
            ps.setString(6, s.getFotoIntercambio());

            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            System.err.println(">>> [DAO ERROR] Fallo al registrar solicitud: " + e.getMessage());
            e.printStackTrace();
        }
        return false;
    }

    public boolean esPrototipoDisponible(int idPrototipo) {
        String sql = "SELECT COUNT(*) FROM solicitudes WHERE id_prototipo = ? AND estado IN ('ACEPTADA', 'ENTREGADA', 'DEVUELTA')";
        try (Connection con = DatabaseConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setInt(1, idPrototipo);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) return rs.getInt(1) == 0;
            }
        } catch (SQLException e) {
            System.err.println(">>> [DAO ERROR] Fallo al verificar disponibilidad: " + e.getMessage());
        }
        return false;
    }

    public boolean actualizarEstado(int idSolicitud, String nuevoEstado) {
        String sql = "UPDATE solicitudes SET estado = ? WHERE id_solicitud = ?";
        try (Connection con = DatabaseConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setString(1, nuevoEstado);
            ps.setInt(2, idSolicitud);
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            System.err.println(">>> [DAO ERROR] Fallo al actualizar estado: " + e.getMessage());
        }
        return false;
    }

    public boolean usuarioYaSolicito(int idPrototipo, int idSolicitante) {
        String sql = "SELECT COUNT(*) FROM solicitudes WHERE id_prototipo = ? AND id_solicitante = ? AND estado = 'PENDIENTE'";
        try (Connection con = DatabaseConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setInt(1, idPrototipo);
            ps.setInt(2, idSolicitante);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) return rs.getInt(1) > 0;
            }
        } catch (SQLException e) {
            System.err.println(">>> [DAO ERROR] Error al verificar duplicados: " + e.getMessage());
        }
        return false;
    }

    public boolean marcarPrototipoOcupadoPorSolicitud(int idSolicitud) {
        String sql = "UPDATE prototipos SET estado_publicacion = 'OCUPADO' WHERE id_prototipo = (SELECT id_prototipo FROM solicitudes WHERE id_solicitud = ?)";
        try (Connection con = DatabaseConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setInt(1, idSolicitud);
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            System.err.println(">>> [DAO ERROR] Fallo al ocupar prototipo: " + e.getMessage());
        }
        return false;
    }

    public int contarSolicitudesActivasUsuario(int idSolicitante) {
        String sql = "SELECT COUNT(*) FROM solicitudes WHERE id_solicitante = ? AND estado = 'PENDIENTE'";
        try (Connection con = DatabaseConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setInt(1, idSolicitante);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) return rs.getInt(1);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    public List<Integer> obtenerPrototiposPendientes(int idSolicitante) {
        List<Integer> lista = new ArrayList<>();
        String sql = "SELECT id_prototipo FROM solicitudes WHERE id_solicitante = ? AND estado = 'PENDIENTE'";
        try (Connection con = DatabaseConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setInt(1, idSolicitante);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) lista.add(rs.getInt(1));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return lista;
    }

    public String obtenerCorreoDuenoPorPrototipo(int idPrototipo) {
        String sql = "SELECT u.correo FROM prototipos p INNER JOIN usuarios u ON p.id_usuario = u.id_usuario WHERE p.id_prototipo = ?";
        try (Connection con = DatabaseConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setInt(1, idPrototipo);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) return rs.getString("correo");
            }
        } catch (SQLException e) { e.printStackTrace(); }
        return null;
    }

    public String obtenerCorreoSolicitante(int idSolicitud) {
        String sql = "SELECT u.correo FROM solicitudes s INNER JOIN usuarios u ON s.id_solicitante = u.id_usuario WHERE s.id_solicitud = ?";
        try (Connection con = DatabaseConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setInt(1, idSolicitud);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) return rs.getString("correo");
            }
        } catch (SQLException e) { e.printStackTrace(); }
        return null;
    }

    public String obtenerTituloPrototipo(int idPrototipo) {
        String sql = "SELECT titulo FROM prototipos WHERE id_prototipo = ?";
        try (Connection con = DatabaseConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setInt(1, idPrototipo);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) return rs.getString("titulo");
            }
        } catch (SQLException e) { e.printStackTrace(); }
        return "un prototipo";
    }

    public String[] obtenerDatosParaCorreo(int idSolicitud) {
        // Retorna: [0]=Titulo, [1]=Dias, [2]=Oferta
        String sql = "SELECT p.titulo, s.dias_prestamo, s.oferta_intercambio " +
                "FROM solicitudes s INNER JOIN prototipos p ON s.id_prototipo = p.id_prototipo " +
                "WHERE s.id_solicitud = ?";
        try (Connection con = DatabaseConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setInt(1, idSolicitud);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return new String[]{
                            rs.getString("titulo"),
                            rs.getString("dias_prestamo"),
                            rs.getString("oferta_intercambio")
                    };
                }
            }
        } catch (SQLException e) { e.printStackTrace(); }
        return new String[]{"un prototipo", null, null};
    }
}