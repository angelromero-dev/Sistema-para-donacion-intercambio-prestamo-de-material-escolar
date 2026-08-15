package com.utez.sdipme.controller;

import com.utez.sdipme.model.Usuario;
import com.utez.sdipme.service.UsuarioService;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.io.IOException;

@WebServlet("/api/auth/verificar-token-password")
public class VerificarTokenPasswordServlet extends HttpServlet {

    private final UsuarioService usuarioService = new UsuarioService();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String token = request.getParameter("token");

        if (token == null || token.trim().isEmpty()) {
            response.sendRedirect(request.getContextPath() + "/pages/login.jsp");
            return;
        }

        Usuario user = usuarioService.procesarTokenRecuperacion(token);

        if (user != null) {
            HttpSession session = request.getSession(true);
            session.setAttribute("idUsuario", user.getIdUsuario());
            session.setAttribute("correoUsuario", user.getCorreo());
            session.setAttribute("rol", user.getRol());
            session.setAttribute("nombreUsuario", user.getNombre());

            response.sendRedirect(request.getContextPath() + "/pages/recuperar.jsp");
        } else {
            response.sendRedirect(request.getContextPath() + "/pages/login.jsp");
        }
    }
}