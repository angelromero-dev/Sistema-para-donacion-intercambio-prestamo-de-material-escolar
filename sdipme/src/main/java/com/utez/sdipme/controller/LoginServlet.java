package com.utez.sdipme.controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.utez.sdipme.service.UsuarioService;
import com.utez.sdipme.dao.UsuarioDao;
import com.utez.sdipme.model.Usuario;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;

// Endpoint exposed for user login authentication.
@WebServlet("/api/auth/login")
public class LoginServlet extends HttpServlet {

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

            if (jsonRequest == null || !jsonRequest.has("correo") || !jsonRequest.has("password")) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                jsonResponse.addProperty("status", "error");
                jsonResponse.addProperty("message", "Estructura JSON inválida o faltan parámetros.");
                response.getWriter().write(jsonResponse.toString());
                return;
            }

            String correo = jsonRequest.get("correo").getAsString();
            String password = jsonRequest.get("password").getAsString();

            String resultado = usuarioService.autenticarUsuario(correo, password);

            if ("EXITO".equals(resultado)) {

                UsuarioDao dao = new UsuarioDao();
                Usuario usuarioLogueado = dao.findByCorreo(correo);

                HttpSession sesion = request.getSession(true);

                sesion.setAttribute("idUsuario", usuarioLogueado.getIdUsuario());
                sesion.setAttribute("correoUsuario", usuarioLogueado.getCorreo());
                sesion.setAttribute("carreraUsuario", usuarioLogueado.getCarrera());

                response.setStatus(HttpServletResponse.SC_OK);
                jsonResponse.addProperty("status", "success");
                jsonResponse.addProperty("message", "Inicio de sesión exitoso.");

                jsonResponse.addProperty("idUsuario", usuarioLogueado.getIdUsuario());

            } else {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                jsonResponse.addProperty("status", "error");
                jsonResponse.addProperty("message", resultado);
            }

            response.getWriter().write(jsonResponse.toString());

        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            jsonResponse.addProperty("status", "error");
            jsonResponse.addProperty("message", "Error interno en el servidor.");
            response.getWriter().write(jsonResponse.toString());
        }
    }
}