package com.utez.sdipme.controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.utez.sdipme.util.DatabaseConnection;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

@WebServlet("/api/auth/mensaje-admin")
public class MensajeAdminServlet extends HttpServlet {

    private final Gson gson = new Gson();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        request.setCharacterEncoding("UTF-8");
        response.setContentType("application/json; charset=UTF-8");
        JsonObject jsonResponse = new JsonObject();

        try {
            JsonObject jsonRequest = gson.fromJson(request.getReader(), JsonObject.class);
            int idUsuario = jsonRequest.get("idUsuario").getAsInt();
            String mensaje = jsonRequest.get("mensaje").getAsString().trim();

            if (mensaje.isEmpty() || mensaje.length() > 255) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                jsonResponse.addProperty("message", "El mensaje debe tener entre 1 y 255 caracteres.");
                response.getWriter().write(jsonResponse.toString());
                return;
            }

            try (Connection con = DatabaseConnection.getConnection()) {
                // Verificar si ya envió un mensaje en los últimos 7 días
                String sqlCheck = "SELECT COUNT(*) AS total FROM apelaciones_baneo WHERE id_usuario = ? AND fecha_envio >= CURRENT_TIMESTAMP - INTERVAL '7' DAY";
                try (PreparedStatement psCheck = con.prepareStatement(sqlCheck)) {
                    psCheck.setInt(1, idUsuario);
                    try (ResultSet rs = psCheck.executeQuery()) {
                        if (rs.next() && rs.getInt("total") > 0) {
                            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                            jsonResponse.addProperty("status", "error");
                            jsonResponse.addProperty("message", "Ya has enviado una apelación recientemente. Debes esperar 7 días entre mensajes.");
                            response.getWriter().write(jsonResponse.toString());
                            return;
                        }
                    }
                }

                // Insertar el mensaje
                String sqlInsert = "INSERT INTO apelaciones_baneo (id_usuario, mensaje) VALUES (?, ?)";
                try (PreparedStatement psInsert = con.prepareStatement(sqlInsert)) {
                    psInsert.setInt(1, idUsuario);
                    psInsert.setString(2, mensaje);
                    psInsert.executeUpdate();
                }

                response.setStatus(HttpServletResponse.SC_OK);
                jsonResponse.addProperty("status", "success");
            }
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            jsonResponse.addProperty("status", "error");
            jsonResponse.addProperty("message", "Error procesando el mensaje.");
        }
        response.getWriter().write(jsonResponse.toString());
    }
}