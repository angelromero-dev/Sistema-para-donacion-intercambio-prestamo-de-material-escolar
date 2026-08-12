package com.utez.sdipme.controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.utez.sdipme.dto.UsuarioPerfilDTO;
import com.utez.sdipme.service.UsuarioService;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.io.IOException;

/**
 * REST API Endpoint for managing user profile settings and account deletion.
 */
@WebServlet("/api/auth/perfil")
public class PerfilServlet extends HttpServlet {

    private final UsuarioService usuarioService = new UsuarioService();
    private final Gson gson = new Gson();

    /**
     * Retrieves the complete profile of the currently logged-in user.
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json; charset=UTF-8");
        HttpSession session = request.getSession(false);

        if (session == null || session.getAttribute("idUsuario") == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("{\"status\": \"error\", \"message\": \"Sesión inválida.\"}");
            return;
        }

        int idUsuario = (int) session.getAttribute("idUsuario");
        UsuarioPerfilDTO perfil = usuarioService.obtenerPerfil(idUsuario);

        if (perfil != null) {
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write(gson.toJson(perfil));
        } else {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            response.getWriter().write("{\"status\": \"error\", \"message\": \"Perfil no encontrado.\"}");
        }
    }

    /**
     * Handles all profile updates based on an "action" payload field.
     */
    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json; charset=UTF-8");
        HttpSession session = request.getSession(false);

        if (session == null || session.getAttribute("idUsuario") == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        int idUsuario = (int) session.getAttribute("idUsuario");
        String correoUsuario = (String) session.getAttribute("correoUsuario");

        try {
            JsonObject jsonRequest = gson.fromJson(request.getReader(), JsonObject.class);
            String action = jsonRequest.has("action") ? jsonRequest.get("action").getAsString() : "";
            String resultado = "Acción no reconocida.";

            switch (action) {
                case "actualizar_nombres":
                    resultado = usuarioService.actualizarPerfilBasico(
                            idUsuario,
                            jsonRequest.get("nombre").getAsString(),
                            jsonRequest.get("apellidos").getAsString()
                    );
                    break;
                case "actualizar_telefono":
                    resultado = usuarioService.actualizarTelefono(
                            idUsuario,
                            jsonRequest.get("telefono").getAsString()
                    );
                    break;
                case "actualizar_foto":
                    resultado = usuarioService.actualizarFotoPerfil(
                            idUsuario,
                            jsonRequest.get("fotoUrl").getAsString()
                    );
                    break;
                case "actualizar_carrera":
                    resultado = usuarioService.actualizarCarrera(
                            idUsuario,
                            jsonRequest.get("idCarrera").getAsInt()
                    );
                    // Actualizamos la sesión para que refleje la nueva carrera inmediatamente
                    if ("EXITO".equals(resultado)) {
                        session.setAttribute("idCarreraUsuario", jsonRequest.get("idCarrera").getAsInt());
                    }
                    break;
                case "cambiar_password":
                    resultado = usuarioService.cambiarPasswordSeguro(
                            idUsuario,
                            correoUsuario,
                            jsonRequest.get("passwordActual").getAsString(),
                            jsonRequest.get("passwordNueva").getAsString()
                    );
                    break;
                case "suspender_cuenta":
                    resultado = usuarioService.suspenderCuenta(idUsuario);
                    if ("EXITO".equals(resultado)) session.invalidate();
                    break;
            }

            JsonObject jsonResponse = new JsonObject();
            if ("EXITO".equals(resultado)) {
                response.setStatus(HttpServletResponse.SC_OK);
                jsonResponse.addProperty("status", "success");
            } else {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                jsonResponse.addProperty("status", "error");
                jsonResponse.addProperty("message", resultado);
            }
            response.getWriter().write(jsonResponse.toString());

        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"status\": \"error\", \"message\": \"Error procesando la solicitud.\"}");
        }
    }

    /**
     * Permanently deletes the user account, verifying password first.
     */
    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json; charset=UTF-8");
        HttpSession session = request.getSession(false);

        if (session == null || session.getAttribute("idUsuario") == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        try {
            JsonObject jsonRequest = gson.fromJson(request.getReader(), JsonObject.class);
            String password = jsonRequest.has("password") ? jsonRequest.get("password").getAsString() : "";

            int idUsuario = (int) session.getAttribute("idUsuario");
            String correoUsuario = (String) session.getAttribute("correoUsuario");

            String resultado = usuarioService.eliminarCuentaPermanente(idUsuario, correoUsuario, password);

            JsonObject jsonResponse = new JsonObject();
            if ("EXITO".equals(resultado)) {
                session.invalidate(); // Matamos la sesión inmediatamente
                response.setStatus(HttpServletResponse.SC_OK);
                jsonResponse.addProperty("status", "success");
            } else {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                jsonResponse.addProperty("status", "error");
                jsonResponse.addProperty("message", resultado);
            }
            response.getWriter().write(jsonResponse.toString());

        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"status\": \"error\", \"message\": \"Error procesando la eliminación.\"}");
        }
    }
}