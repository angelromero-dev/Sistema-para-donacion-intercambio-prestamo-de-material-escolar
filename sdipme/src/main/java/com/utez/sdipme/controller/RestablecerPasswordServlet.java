package com.utez.sdipme.controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.utez.sdipme.service.UsuarioService;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

// Endpoint for applying the new password via secure token.
@WebServlet("/api/auth/restablecer-password")
public class RestablecerPasswordServlet extends HttpServlet {

    private final UsuarioService usuarioService = new UsuarioService();
    private final Gson gson = new Gson();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        request.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        JsonObject jsonResponse = new JsonObject();
        try {
            JsonObject jsonRequest = gson.fromJson(request.getReader(), JsonObject.class);
            String token = jsonRequest.get("token").getAsString();
            String nuevaPassword = jsonRequest.get("password").getAsString();

            String resultado = usuarioService.restablecerPassword(token, nuevaPassword);

            if ("EXITO".equals(resultado)) {
                response.setStatus(HttpServletResponse.SC_OK);
                jsonResponse.addProperty("status", "success");
                jsonResponse.addProperty("message", "Contraseña actualizada y cuenta desbloqueada.");
            } else {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                jsonResponse.addProperty("status", "error");
                jsonResponse.addProperty("message", resultado);
            }
            response.getWriter().write(jsonResponse.toString());
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            jsonResponse.addProperty("status", "error");
            jsonResponse.addProperty("message", "Error interno en el servidor.");
            response.getWriter().write(jsonResponse.toString());
        }
    }
}