package com.utez.sdipme.dao;

import com.utez.sdipme.model.Solicitud;
import com.utez.sdipme.util.DatabaseConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class SolicitudDao {

    public boolean registrarSolicitud(Solicitud s) {
        String sql = "INSERT INTO solicitudes (id_prototipo, id_solicitante, mensaje_justificacion, dias_prestamo, oferta_intercambio, foto_intercambio, estado) VALUES (?, ?, ?, ?, ?, ?, 'PENDIENTE')";

        try (Connection con = DatabaseConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setInt(1, s.getIdPrototipo());
            ps.setInt(2, s.getIdSolicitante());
            ps.setString(3, s.getMensajeJustificacion());

            // Manejo seguro de nulos para los días de préstamo
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
            return false;
        }
    }

    public boolean esPrototipoDisponible(int idPrototipo) {
        String sql = "SELECT COUNT(*) FROM solicitudes WHERE id_prototipo = ? AND estado IN ('ACEPTADA', 'ENTREGADA', 'DEVUELTA')";

        try (Connection con = DatabaseConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setInt(1, idPrototipo);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return rs.getInt(1) == 0;
                }
            }
        } catch (SQLException e) {
            System.err.println(">>> [DAO ERROR] Fallo al verificar disponibilidad: " + e.getMessage());
            e.printStackTrace();
        }
        return false;
    }
}