package com.utez.sdipme.dao;

import com.utez.sdipme.model.Prototipo;
import com.utez.sdipme.util.DatabaseConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class PrototipoDAO {

    public boolean registrarPrototipo(Prototipo p) {
        System.out.println(">>>   [DAO POST] Iniciando conexion a Oracle...");
        String sql = "INSERT INTO prototipos (id_usuario, titulo, descripcion_corta, descripcion_larga, url_imagen, id_carrera, id_categoria, tipo_transaccion) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

        try (Connection con = DatabaseConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            System.out.println(">>>   [DAO POST] Conexion exitosa. Preparando variables para el INSERT...");

            ps.setInt(1, p.getIdUsuario());
            ps.setString(2, p.getTitulo());
            ps.setString(3, p.getDescripcionCorta());
            ps.setString(4, p.getDescripcionLarga());
            ps.setString(5, p.getUrlImagen());
            ps.setInt(6, p.getIdCarrera());
            ps.setInt(7, p.getIdCategoria());
            ps.setString(8, p.getTipoTransaccion());

            System.out.println(">>>   [DAO POST] Ejecutando Query...");
            int filasAfectadas = ps.executeUpdate();

            System.out.println(">>>   [DAO POST] Query finalizado. Filas afectadas: " + filasAfectadas);
            return filasAfectadas > 0;

        } catch (SQLException e) {
            System.err.println(">>>   [DAO POST ERROR SQL] Oracle ha rechazado la insercion.");
            System.err.println(">>>   [CODIGO DE ERROR ORACLE]: " + e.getErrorCode());
            System.err.println(">>>   [MENSAJE EXACTO]: " + e.getMessage());
            return false;
        }
    }

    public String obtenerPrototiposParaTarjetasJSON() {
        System.out.println(">>>   [DAO GET] Ejecutando SELECT con INNER JOINs ampliado...");
        StringBuilder json = new StringBuilder("[");

        // Añadimos u.reputacion y p.descripcion_larga a la consulta
        String sql = "SELECT p.id_prototipo, p.titulo, p.descripcion_corta, p.descripcion_larga, p.url_imagen, p.tipo_transaccion, " +
                "u.matricula, u.reputacion, div.acronimo AS division, cat.nombre AS categoria, car.nombre AS carrera " +
                "FROM prototipos p " +
                "INNER JOIN usuarios u ON p.id_usuario = u.id_usuario " +
                "INNER JOIN cat_carreras car ON p.id_carrera = car.id_carrera " +
                "INNER JOIN cat_divisiones div ON car.id_division = div.id_division " +
                "INNER JOIN cat_categorias cat ON p.id_categoria = cat.id_categoria " +
                "WHERE p.estado_publicacion = 'ACTIVA'";

        try (Connection con = DatabaseConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            boolean first = true;
            int contador = 0;
            while (rs.next()) {
                if (!first) json.append(",");
                json.append("{")
                        .append("\"id\":").append(rs.getInt("id_prototipo")).append(",")
                        .append("\"titulo\":\"").append(rs.getString("titulo")).append("\",")
                        .append("\"matriculaOferente\":\"").append(rs.getString("matricula")).append("\",")
                        .append("\"reputacion\":").append(rs.getDouble("reputacion")).append(",")
                        .append("\"descripcionCorta\":\"").append(rs.getString("descripcion_corta")).append("\",")
                        .append("\"descripcionLarga\":\"").append(rs.getString("descripcion_larga")).append("\",")
                        .append("\"urlImagen\":\"").append(rs.getString("url_imagen")).append("\",")
                        .append("\"tipoTransaccion\":\"").append(rs.getString("tipo_transaccion")).append("\",")
                        .append("\"etiquetas\":[")
                        .append("{\"tipo\":\"division\",\"valor\":\"").append(rs.getString("division")).append("\"},")
                        .append("{\"tipo\":\"categoria\",\"valor\":\"").append(rs.getString("categoria")).append("\"},")
                        .append("{\"tipo\":\"carrera\",\"valor\":\"").append(rs.getString("carrera")).append("\"}")
                        .append("]")
                        .append("}");
                first = false;
                contador++;
            }
            System.out.println(">>>   [DAO GET] Lectura exitosa. Prototipos encontrados: " + contador);
        } catch (SQLException e) {
            System.err.println(">>>   [DAO GET ERROR SQL] Fallo al consultar prototipos: " + e.getMessage());
        }
        json.append("]");
        return json.toString();
    }
}