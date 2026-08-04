package com.utez.sdipme.controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.utez.sdipme.service.UsuarioService;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

// Endpoint exposed to the Frontend for authentication processes.
@WebServlet("/api/auth/registro")
public class AuthServlet extends HttpServlet {

    private final UsuarioService usuarioService = new UsuarioService();
    private final Gson gson = new Gson();

    // Handles POST HTTP requests for user registration.
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

        // Ensure proper character encoding for request and response.
        request.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        try {
            // Parse incoming JSON payload from the Frontend.
            JsonObject jsonRequest = gson.fromJson(request.getReader(), JsonObject.class);

            String matricula = jsonRequest.get("matricula").getAsString();
            String correo = jsonRequest.get("correo").getAsString();
            String password = jsonRequest.get("password").getAsString();

            // Delegate to Service layer.
            String resultado = usuarioService.registrarUsuario(matricula, correo, password);

            JsonObject jsonResponse = new JsonObject();

            if ("EXITO".equals(resultado)) {
                // Return 201 Created status.
                response.setStatus(HttpServletResponse.SC_CREATED);
                jsonResponse.addProperty("status", "success");
                jsonResponse.addProperty("message", "Usuario registrado exitosamente.");
            } else {
                // Return 400 Bad Request status with business logic error.
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                jsonResponse.addProperty("status", "error");
                jsonResponse.addProperty("message", resultado);
            }

            response.getWriter().write(jsonResponse.toString());

        } catch (Exception e) {
            // Global exception handler for malformed requests.
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            JsonObject error = new JsonObject();
            error.addProperty("status", "error");
            error.addProperty("message", "Error procesando la solicitud.");
            response.getWriter().write(error.toString());
        }
    }
}