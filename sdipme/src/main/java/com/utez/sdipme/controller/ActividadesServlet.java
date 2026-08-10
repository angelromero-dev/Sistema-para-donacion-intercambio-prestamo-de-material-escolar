package com.utez.sdipme.controller;

import com.google.gson.JsonObject;
import com.utez.sdipme.dao.ActividadesDao;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;

@WebServlet("/api/actividades/*")
public class ActividadesServlet extends HttpServlet {

    private final ActividadesDao actividadesDao = new ActividadesDao();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("idUsuario") == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("{\"status\":\"error\", \"message\":\"Sesión expirada.\"}");
            return;
        }

        int idUsuario = (int) session.getAttribute("idUsuario");

        String pathInfo = request.getPathInfo();

        if (pathInfo == null) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("{\"status\":\"error\", \"message\":\"Ruta incompleta.\"}");
            return;
        }

        try {
            String jsonResult = "";

            if (pathInfo.equals("/solicitudes")) {
                System.out.println(">>> [API] Solicitando notificaciones para usuario ID: " + idUsuario);
                jsonResult = actividadesDao.obtenerSolicitudesRecibidas(idUsuario);

            } else if (pathInfo.equals("/prototipos")) {
                System.out.println(">>> [API] Solicitando prototipos propios para usuario ID: " + idUsuario);
                jsonResult = actividadesDao.obtenerMisPrototiposPublicados(idUsuario);

            } else {
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                response.getWriter().write("{\"status\":\"error\", \"message\":\"Endpoint no encontrado.\"}");
                return;
            }

            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write("{\"status\":\"success\", \"data\":" + jsonResult + "}");

        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"status\":\"error\", \"message\":\"Error interno en el servidor.\"}");
        }
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        JsonObject jsonResponse = new JsonObject();

        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("idUsuario") == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("{\"status\":\"error\", \"message\":\"Sesión expirada.\"}");
            return;
        }

        int idUsuario = (int) session.getAttribute("idUsuario");
        String idProtoStr = request.getParameter("idPrototipo");

        if (idProtoStr == null) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            jsonResponse.addProperty("status", "error");
            jsonResponse.addProperty("message", "ID de prototipo no proporcionado.");
            response.getWriter().write(jsonResponse.toString());
            return;
        }

        int idPrototipo = Integer.parseInt(idProtoStr);
        boolean exito = actividadesDao.cancelarPrototipo(idPrototipo, idUsuario);

        if (exito) {
            response.setStatus(HttpServletResponse.SC_OK);
            jsonResponse.addProperty("status", "success");
            jsonResponse.addProperty("message", "Publicación cancelada correctamente.");
        } else {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            jsonResponse.addProperty("status", "error");
            jsonResponse.addProperty("message", "No se pudo cancelar el prototipo.");
        }
        response.getWriter().write(jsonResponse.toString());
    }
}