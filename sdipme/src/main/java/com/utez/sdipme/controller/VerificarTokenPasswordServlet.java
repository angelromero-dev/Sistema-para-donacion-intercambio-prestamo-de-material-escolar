package com.utez.sdipme.controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.utez.sdipme.dao.UsuarioDao;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/api/auth/verificar-token-password")
public class VerificarTokenPasswordServlet extends HttpServlet {

    private final UsuarioDao usuarioDao = new UsuarioDao();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json; charset=UTF-8");
        JsonObject jsonResponse = new JsonObject();
        String token = request.getParameter("token");

        if (token == null || token.trim().isEmpty()) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            jsonResponse.addProperty("valido", false);
            response.getWriter().write(jsonResponse.toString());
            return;
        }

        String nombreUsuario = usuarioDao.obtenerNombrePorToken(token);

        if (nombreUsuario != null) {
            response.setStatus(HttpServletResponse.SC_OK);
            JsonObject data = new JsonObject();
            data.addProperty("valido", true);
            data.addProperty("nombreUsuario", nombreUsuario);
            jsonResponse.add("data", data);
            jsonResponse.addProperty("status", "success");
        } else {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            jsonResponse.addProperty("valido", false);
        }

        response.getWriter().write(jsonResponse.toString());
    }
}