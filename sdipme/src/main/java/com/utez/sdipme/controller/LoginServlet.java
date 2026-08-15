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
                jsonResponse.addProperty("message", "Faltan parámetros.");
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
                sesion.setAttribute("idCarreraUsuario", usuarioLogueado.getIdCarrera());
                sesion.setAttribute("rol", usuarioLogueado.getRol());

                response.setStatus(HttpServletResponse.SC_OK);
                jsonResponse.addProperty("status", "success");
                jsonResponse.addProperty("message", "Inicio de sesión exitoso.");
                jsonResponse.addProperty("idUsuario", usuarioLogueado.getIdUsuario());
                jsonResponse.addProperty("rol", usuarioLogueado.getRol());

            } else {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                jsonResponse.addProperty("status", "error");
                jsonResponse.addProperty("message", resultado);

                Usuario usuarioInfo = new UsuarioDao().findByCorreo(correo);
                if (usuarioInfo != null) {
                    jsonResponse.addProperty("estadoCuenta", usuarioInfo.getEstado());
                    jsonResponse.addProperty("bloqueadoPorAdmin", usuarioInfo.getBloqueadoPorAdmin() == 1);
                    jsonResponse.addProperty("idUsuario", usuarioInfo.getIdUsuario());
                }
            }

            response.getWriter().write(jsonResponse.toString());

        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            jsonResponse.addProperty("status", "error");
            jsonResponse.addProperty("message", "Error interno.");
            response.getWriter().write(jsonResponse.toString());
        }
    }
}