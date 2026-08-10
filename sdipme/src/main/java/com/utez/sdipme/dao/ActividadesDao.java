package com.utez.sdipme.dao;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.utez.sdipme.util.DatabaseConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ActividadesDao {

    public String obtenerSolicitudesRecibidas(int idUsuarioDueno) {
        JsonArray lista = new JsonArray();

        String sql = "SELECT s.id_solicitud, s.estado, s.fecha_solicitud, s.mensaje_justificacion, " +
                "s.dias_prestamo, s.oferta_intercambio, s.foto_intercambio, " +
                "p.id_prototipo, p.titulo AS prototipo_titulo, p.tipo_transaccion, " +
                "u.matricula AS matricula_solicitante, u.nombre, u.apellidos, u.reputacion " +
                "FROM solicitudes s " +
                "INNER JOIN prototipos p ON s.id_prototipo = p.id_prototipo " +
                "INNER JOIN usuarios u ON s.id_solicitante = u.id_usuario " +
                "WHERE p.id_usuario = ? AND s.estado = 'PENDIENTE' " +
                "ORDER BY s.fecha_solicitud DESC";

        try (Connection con = DatabaseConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setInt(1, idUsuarioDueno);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    JsonObject obj = new JsonObject();
                    obj.addProperty("idSolicitud", rs.getInt("id_solicitud"));
                    obj.addProperty("estado", rs.getString("estado"));
                    obj.addProperty("fecha", rs.getTimestamp("fecha_solicitud").toString());
                    obj.addProperty("mensaje", rs.getString("mensaje_justificacion"));

                    if (rs.getObject("dias_prestamo") != null) {
                        obj.addProperty("diasPrestamo", rs.getInt("dias_prestamo"));
                    }
                    if (rs.getString("oferta_intercambio") != null) {
                        obj.addProperty("ofertaIntercambio", rs.getString("oferta_intercambio"));
                        obj.addProperty("fotoIntercambio", rs.getString("foto_intercambio"));
                    }

                    obj.addProperty("idPrototipo", rs.getInt("id_prototipo"));
                    obj.addProperty("prototipoTitulo", rs.getString("prototipo_titulo"));
                    obj.addProperty("prototipoTransaccion", rs.getString("tipo_transaccion"));

                    obj.addProperty("solicitanteMatricula", rs.getString("matricula_solicitante"));
                    obj.addProperty("solicitanteNombre", rs.getString("nombre") + " " + rs.getString("apellidos"));
                    obj.addProperty("solicitanteReputacion", rs.getDouble("reputacion"));

                    lista.add(obj);
                }
            }
        } catch (SQLException e) {
            System.err.println(">>> [DAO ERROR] Fallo al obtener solicitudes recibidas: " + e.getMessage());
        }
        return lista.toString();
    }

    public String obtenerMisPrototiposPublicados(int idUsuario) {
        JsonArray lista = new JsonArray();

        String sql = "SELECT id_prototipo, titulo, descripcion_corta, url_imagen, tipo_transaccion, estado_publicacion " +
                "FROM prototipos WHERE id_usuario = ? ORDER BY fecha_publicacion DESC";

        try (Connection con = DatabaseConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setInt(1, idUsuario);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    JsonObject obj = new JsonObject();
                    obj.addProperty("idPrototipo", rs.getInt("id_prototipo"));
                    obj.addProperty("titulo", rs.getString("titulo"));
                    obj.addProperty("descripcionCorta", rs.getString("descripcion_corta"));
                    obj.addProperty("urlImagen", rs.getString("url_imagen"));
                    obj.addProperty("tipoTransaccion", rs.getString("tipo_transaccion"));
                    obj.addProperty("estado", rs.getString("estado_publicacion"));
                    lista.add(obj);
                }
            }
        } catch (SQLException e) {
            System.err.println(">>> [DAO ERROR] Fallo al obtener mis prototipos: " + e.getMessage());
        }
        return lista.toString();
    }
}
