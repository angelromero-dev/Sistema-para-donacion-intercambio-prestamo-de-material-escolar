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

        // 1. Divisiones
        json.append("\"divisiones\":[");
        String sqlDivisiones = "SELECT id_division, acronimo FROM cat_divisiones ORDER BY acronimo ASC";
        try (Connection con = DatabaseConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sqlDivisiones);
             ResultSet rs = ps.executeQuery()) {
            boolean first = true;
            while (rs.next()) {
                if (!first) json.append(",");
                json.append("{\"id\":").append(rs.getInt("id_division"))
                        .append(",\"nombre\":\"").append(rs.getString("acronimo")).append("\"}");
                first = false;
            }
        } catch (SQLException e) {
            System.err.println(">>> [DAO ERROR] Fallo al obtener divisiones: " + e.getMessage());
        }
        json.append("],");

        // 2. Categorías
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

        // 3. Carreras
        json.append("\"carreras\":[");
        String sqlCarreras = "SELECT id_carrera, nombre FROM cat_carreras ORDER BY nombre ASC";
        try (Connection con = DatabaseConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sqlCarreras);
             ResultSet rs = ps.executeQuery()) {
            boolean first = true;
            while (rs.next()) {
                if (!first) json.append(",");
                json.append("{\"id\":").append(rs.getInt("id_carrera"))
                        .append(",\"nombre\":\"").append(rs.getString("nombre")).append("\"}");
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