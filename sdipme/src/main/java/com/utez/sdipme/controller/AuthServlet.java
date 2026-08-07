package com.utez.sdipme.controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.utez.sdipme.service.UsuarioService;
import com.utez.sdipme.util.EmailService; // Importar tu servicio de correos
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.UUID; // Para generar el Token

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
            String correo = jsonRequest.get("correo").getAsString().toLowerCase().trim(); // Limpiamos el correo
            String password = jsonRequest.get("password").getAsString();

            // [NUEVO] 1. REGLA DE NEGOCIO: Bloqueo de dominio
            if (!correo.endsWith("@utez.edu.mx")) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                JsonObject err = new JsonObject();
                err.addProperty("status", "error");
                err.addProperty("message", "Solo se permiten correos institucionales (@utez.edu.mx)");
                response.getWriter().write(err.toString());
                return; // Cortamos el flujo aquí
            }

            // [NUEVO] 2. Generar el Token Único
            String tokenActivacion = UUID.randomUUID().toString();

            // Delegate to Service layer (Enviando el token)
            String resultado = usuarioService.registrarUsuario(matricula, correo, password, tokenActivacion);

            JsonObject jsonResponse = new JsonObject();

            if ("EXITO".equals(resultado)) {
                // [NUEVO] 3. Disparamos el correo
                boolean correoEnviado = EmailService.enviarCorreoVerificacion(correo, tokenActivacion);

                response.setStatus(HttpServletResponse.SC_CREATED);
                jsonResponse.addProperty("status", "success");

                if (correoEnviado) {
                    jsonResponse.addProperty("message", "Usuario registrado. Revisa tu correo institucional para activar tu cuenta.");
                } else {
                    jsonResponse.addProperty("message", "Usuario registrado, pero hubo un problema al enviar el correo de activación. Contacta soporte.");
                }
            } else {
                // Return 400 Bad Request status with business logic error.
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                jsonResponse.addProperty("status", "error");
                jsonResponse.addProperty("message", resultado);
            }

            response.getWriter().write(jsonResponse.toString());

        } catch (Exception e) {
            // Global exception handler for malformed requests.
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            JsonObject error = new JsonObject();
            error.addProperty("status", "error");
            error.addProperty("message", "Error procesando la solicitud.");
            response.getWriter().write(error.toString());
        }
    }
}