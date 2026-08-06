package com.utez.sdipme.dao;

import com.utez.sdipme.model.Prototipo;
import com.utez.sdipme.util.DatabaseConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class PrototipoDAO {

    public boolean registrarPrototipo(Prototipo p) {
        String sql = "INSERT INTO prototipos (id_usuario, titulo, descripcion_corta, descripcion_larga, url_imagen, id_carrera, id_categoria, tipo_transaccion) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

        try (Connection con = DatabaseConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setInt(1, p.getIdUsuario());
            ps.setString(2, p.getTitulo());
            ps.setString(3, p.getDescripcionCorta());
            ps.setString(4, p.getDescripcionLarga());
            ps.setString(5, p.getUrlImagen());
            ps.setInt(6, p.getIdCarrera());
            ps.setInt(7, p.getIdCategoria());
            ps.setString(8, p.getTipoTransaccion());

            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public String obtenerPrototiposParaTarjetasJSON() {
        StringBuilder json = new StringBuilder("[");

        String sql = "SELECT p.id_prototipo, p.titulo, p.descripcion_corta, p.url_imagen, p.tipo_transaccion, " +
                "u.matricula, div.acronimo AS division, cat.nombre AS categoria, car.nombre AS carrera " +
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
            while (rs.next()) {
                if (!first) json.append(",");
                json.append("{")
                        .append("\"id\":").append(rs.getInt("id_prototipo")).append(",")
                        .append("\"titulo\":\"").append(rs.getString("titulo")).append("\",")
                        .append("\"matriculaOferente\":\"").append(rs.getString("matricula")).append("\",")
                        .append("\"descripcionCorta\":\"").append(rs.getString("descripcion_corta")).append("\",")
                        .append("\"urlImagen\":\"").append(rs.getString("url_imagen")).append("\",")
                        .append("\"tipoTransaccion\":\"").append(rs.getString("tipo_transaccion")).append("\",")
                        .append("\"etiquetas\":[")
                        .append("{\"tipo\":\"division\",\"valor\":\"").append(rs.getString("division")).append("\"},")
                        .append("{\"tipo\":\"categoria\",\"valor\":\"").append(rs.getString("categoria")).append("\"},")
                        .append("{\"tipo\":\"carrera\",\"valor\":\"").append(rs.getString("carrera")).append("\"}")
                        .append("]")
                        .append("}");
                first = false;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        json.append("]");
        return json.toString();
    }
}