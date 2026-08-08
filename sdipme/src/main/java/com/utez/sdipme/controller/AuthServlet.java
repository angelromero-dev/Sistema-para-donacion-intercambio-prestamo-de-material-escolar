package com.utez.sdipme.controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.utez.sdipme.service.UsuarioService;
import com.utez.sdipme.service.EmailService;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.UUID;

/**
 * Endpoint exposed to the Frontend for authentication and user registration processes.
 */
@WebServlet("/api/auth/registro")
public class AuthServlet extends HttpServlet {

    private final UsuarioService usuarioService = new UsuarioService();
    private final Gson gson = new Gson();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

        request.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        JsonObject jsonResponse = new JsonObject();

        try {
            // Parse incoming JSON payload from the Frontend containing profile data
            JsonObject jsonRequest = gson.fromJson(request.getReader(), JsonObject.class);

            String matricula = jsonRequest.has("matricula") ? jsonRequest.get("matricula").getAsString() : "";
            String correo = jsonRequest.has("correo") ? jsonRequest.get("correo").getAsString().toLowerCase().trim() : "";
            String nombre = jsonRequest.has("nombre") ? jsonRequest.get("nombre").getAsString() : "";
            String apellidos = jsonRequest.has("apellidos") ? jsonRequest.get("apellidos").getAsString() : "";
            String telefono = jsonRequest.has("telefono") ? jsonRequest.get("telefono").getAsString() : "";
            int idCarrera = jsonRequest.has("idCarrera") ? jsonRequest.get("idCarrera").getAsInt() : 0;
            String password = jsonRequest.has("password") ? jsonRequest.get("password").getAsString() : "";

            // Generate a secure unique token for email verification
            String tokenActivacion = UUID.randomUUID().toString();

            // Delegate registration logic to Service layer
            String resultado = usuarioService.registrarUsuario(matricula, correo, nombre, apellidos, telefono, idCarrera, password, tokenActivacion);

            if ("EXITO".equals(resultado)) {
                boolean correoEnviado = EmailService.enviarCorreoVerificacion(correo, tokenActivacion);

                response.setStatus(HttpServletResponse.SC_CREATED);
                jsonResponse.addProperty("status", "success");

                if (correoEnviado) {
                    jsonResponse.addProperty("message", "Usuario registrado. Revisa tu correo institucional para activar tu cuenta.");
                } else {
                    jsonResponse.addProperty("message", "Usuario registrado, pero hubo un problema al enviar el correo de activación. Contacta soporte.");
                }
            } else {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                jsonResponse.addProperty("status", "error");
                jsonResponse.addProperty("message", resultado);
            }

            response.getWriter().write(jsonResponse.toString());

        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            JsonObject error = new JsonObject();
            error.addProperty("status", "error");
            error.addProperty("message", "Error procesando la solicitud de registro.");
            response.getWriter().write(error.toString());
        }
    }
}