package com.utez.sdipme.controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.utez.sdipme.service.UsuarioService;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/api/auth/reenviar-token")
public class ReenviarTokenServlet extends HttpServlet {

    private final UsuarioService usuarioService = new UsuarioService();
    private final Gson gson = new Gson();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        request.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        JsonObject jsonResponse = new JsonObject();

        try {
            // 1. Construir la URL base dinámica
            String baseUrl = request.getScheme() + "://" + request.getServerName() +
                    (("http".equals(request.getScheme()) && request.getServerPort() == 80) ||
                            ("https".equals(request.getScheme()) && request.getServerPort() == 443) ? "" : ":" + request.getServerPort()) +
                    request.getContextPath();

            JsonObject jsonRequest = gson.fromJson(request.getReader(), JsonObject.class);

            if (jsonRequest == null || !jsonRequest.has("correo")) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                jsonResponse.addProperty("status", "error");
                jsonResponse.addProperty("message", "El campo 'correo' es obligatorio.");
                response.getWriter().write(jsonResponse.toString());
                return;
            }

            String correo = jsonRequest.get("correo").getAsString();

            // 2. Pasar el baseUrl al método
            String resultado = usuarioService.reenviarTokenActivacion(correo, baseUrl);

            if ("EXITO".equals(resultado)) {
                response.setStatus(HttpServletResponse.SC_OK);
                jsonResponse.addProperty("status", "success");
                jsonResponse.addProperty("message", "Se ha enviado un nuevo enlace de activación a tu correo.");
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