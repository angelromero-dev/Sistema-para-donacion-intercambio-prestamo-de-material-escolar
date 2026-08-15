package com.utez.sdipme.controller;

import com.utez.sdipme.dao.UsuarioDao;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/api/activar")
public class ActivacionServlet extends HttpServlet {

    private final UsuarioDao usuarioDao = new UsuarioDao();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json; charset=UTF-8");
        System.out.println("\n====");
        System.out.println(">>> [CONTROLLER] Petición GET recibida en /api/activar");

        String token = request.getParameter("token");

        if (token == null || token.trim().isEmpty()) {
            System.err.println(">>> [CONTROLLER ERROR] Se intentó acceder sin token.");
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("{\"status\":\"error\",\"message\":\"Token no proporcionado.\"}");
            return;
        }

        System.out.println(">>> [CONTROLLER] Intentando activar cuenta con token: " + token);
        boolean exito = usuarioDao.activarCuenta(token);

        if (exito) {
            System.out.println(">>> [CONTROLLER OK] Cuenta activada con éxito.");
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write("{\"status\":\"success\",\"activada\":true}");
        } else {
            System.err.println(">>> [CONTROLLER WARN] Token inválido o ya usado.");
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("{\"status\":\"error\",\"activada\":false,\"message\":\"El token es inválido o la cuenta ya fue activada.\"}");
        }
    }
}