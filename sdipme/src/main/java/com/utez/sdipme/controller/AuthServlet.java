package com.utez.sdipme.controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.utez.sdipme.service.UsuarioService;
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
        System.out.println("\n>>> [CAPA 3 - SERVLET] Petición POST recibida en /api/auth/registro");
        try {

            JsonObject jsonRequest = gson.fromJson(request.getReader(), JsonObject.class);
            System.out.println(">>> [CAPA 3 - SERVLET] Payload recibido del Frontend: " + jsonRequest.toString());

            String matricula = jsonRequest.has("matricula") ? jsonRequest.get("matricula").getAsString() : "";
            String correo = jsonRequest.has("correo") ? jsonRequest.get("correo").getAsString().toLowerCase().trim() : "";
            String nombre = jsonRequest.has("nombre") ? jsonRequest.get("nombre").getAsString() : "";
            String apellidos = jsonRequest.has("apellidos") ? jsonRequest.get("apellidos").getAsString() : "";
            String telefono = jsonRequest.has("telefono") ? jsonRequest.get("telefono").getAsString() : "";
            int idCarrera = jsonRequest.has("idCarrera") ? jsonRequest.get("idCarrera").getAsInt() : 0;
            String password = jsonRequest.has("password") ? jsonRequest.get("password").getAsString() : "";

            String tokenActivacion = UUID.randomUUID().toString();

            // Construcción dinámica de la URL
            String baseUrl = request.getScheme() + "://" + request.getServerName() +
                    (("http".equals(request.getScheme()) && request.getServerPort() == 80) ||
                            ("https".equals(request.getScheme()) && request.getServerPort() == 443) ? "" : ":" + request.getServerPort()) +
                    request.getContextPath();

            // Se envía la baseUrl al Service. El Service se encargará de guardar en BD y enviar el correo.
            String resultado = usuarioService.registrarUsuario(matricula, correo, nombre, apellidos, telefono, idCarrera, password, tokenActivacion, baseUrl);

            System.out.println(">>> [CAPA 3 - SERVLET] Respuesta generada por el Service: " + resultado);

            if ("EXITO".equals(resultado)) {
                response.setStatus(HttpServletResponse.SC_CREATED);
                jsonResponse.addProperty("status", "success");
                jsonResponse.addProperty("message", "Usuario registrado. Revisa tu correo institucional para activar tu cuenta.");
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