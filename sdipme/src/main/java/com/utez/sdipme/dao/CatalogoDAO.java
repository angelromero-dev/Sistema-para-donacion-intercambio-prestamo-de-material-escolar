package com.utez.sdipme.dao;

import com.utez.sdipme.util.DatabaseConnection;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class CatalogoDAO {

    public String obtenerCatalogosJSON() {
        StringBuilder json = new StringBuilder();
        json.append("{");

        json.append("\"categorias\":[");
        String sqlCategorias = "SELECT id_categoria, nombre FROM cat_categorias ORDER BY nombre ASC";

        try (Connection con = DatabaseConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sqlCategorias);
             ResultSet rs = ps.executeQuery()) {

            boolean first = true;
            while (rs.next()) {
                if (!first) json.append(",");
                json.append("{\"id\":").append(rs.getInt("id_categoria"))
                        .append(",\"nombre\":\"").append(rs.getString("nombre")).append("\"}");
                first = false;
            }
        } catch (SQLException e) {
            System.err.println(">>> [DAO ERROR] Fallo al obtener categorias: " + e.getMessage());
        }
        json.append("],");

        json.append("\"carreras\":[");
        String sqlCarreras = "SELECT id_carrera, nombre FROM cat_carreras ORDER BY nombre ASC";

        try (Connection con = DatabaseConnection.getConnection();
             PreparedStatement ps2 = con.prepareStatement(sqlCarreras);
             ResultSet rs2 = ps2.executeQuery()) {

            boolean first = true;
            while (rs2.next()) {
                if (!first) json.append(",");
                json.append("{\"id\":").append(rs2.getInt("id_carrera"))
                        .append(",\"nombre\":\"").append(rs2.getString("nombre")).append("\"}");
                first = false;
            }
        } catch (SQLException e) {
            System.err.println(">>> [DAO ERROR] Fallo al obtener carreras: " + e.getMessage());
        }
        json.append("]");

        json.append("}");
        return json.toString();
    }
}