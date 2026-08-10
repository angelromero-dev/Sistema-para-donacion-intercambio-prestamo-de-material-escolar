package com.utez.sdipme.controller;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.utez.sdipme.model.Solicitud;
import com.utez.sdipme.service.SolicitudService;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.util.List;

@WebServlet("/api/solicitudes")
public class SolicitudServlet extends HttpServlet {

    private final SolicitudService solicitudService = new SolicitudService();
    private final Gson gson = new Gson();

    // =========================================================
    // MÉTODO GET: DEVOLVER LOS IDs DE LOS PROTOTIPOS PENDIENTES
    // =========================================================
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        JsonObject jsonResponse = new JsonObject();

        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("idUsuario") == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("{\"status\":\"error\"}");
            return;
        }

        int idSolicitante = (int) session.getAttribute("idUsuario");
        List<Integer> pendientes = solicitudService.obtenerPrototiposPendientes(idSolicitante);

        JsonArray array = new JsonArray();
        for (int id : pendientes) {
            array.add(id);
        }

        jsonResponse.addProperty("status", "success");
        jsonResponse.add("data", array);
        response.getWriter().write(jsonResponse.toString());
    }

    // =========================================================
    // MÉTODO POST: CREAR SOLICITUD (El alumno pide)
    // =========================================================
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        request.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        JsonObject jsonResponse = new JsonObject();

        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("idUsuario") == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            jsonResponse.addProperty("status", "error");
            jsonResponse.addProperty("message", "Sesión no válida o expirada.");
            response.getWriter().write(jsonResponse.toString());
            return;
        }
        int idSolicitante = (int) session.getAttribute("idUsuario");

        try {
            JsonObject jsonRequest = gson.fromJson(request.getReader(), JsonObject.class);
            Solicitud nuevaSolicitud = new Solicitud();

            nuevaSolicitud.setIdSolicitante(idSolicitante);
            nuevaSolicitud.setIdPrototipo(jsonRequest.get("idPrototipo").getAsInt());
            nuevaSolicitud.setMensajeJustificacion(jsonRequest.get("mensajeJustificacion").getAsString());

            if (jsonRequest.has("diasPrestamo") && !jsonRequest.get("diasPrestamo").isJsonNull()) {
                nuevaSolicitud.setDiasPrestamo(jsonRequest.get("diasPrestamo").getAsInt());
            }
            if (jsonRequest.has("ofertaIntercambio") && !jsonRequest.get("ofertaIntercambio").isJsonNull()) {
                nuevaSolicitud.setOfertaIntercambio(jsonRequest.get("ofertaIntercambio").getAsString());
            }
            if (jsonRequest.has("fotoIntercambio") && !jsonRequest.get("fotoIntercambio").isJsonNull()) {
                nuevaSolicitud.setFotoIntercambio(jsonRequest.get("fotoIntercambio").getAsString());
            }

            String resultado = solicitudService.procesarNuevaSolicitud(nuevaSolicitud);

            if ("EXITO".equals(resultado)) {
                response.setStatus(HttpServletResponse.SC_CREATED);
                jsonResponse.addProperty("status", "success");
                jsonResponse.addProperty("message", "Solicitud creada con éxito.");
            } else if ("ERROR_OCUPADO".equals(resultado)) {
                response.setStatus(HttpServletResponse.SC_CONFLICT);
                jsonResponse.addProperty("status", "error");
                jsonResponse.addProperty("message", "El prototipo ya no está disponible.");
            } else if ("ERROR_DUPLICADO".equals(resultado)) {
                response.setStatus(HttpServletResponse.SC_CONFLICT);
                jsonResponse.addProperty("status", "error");
                jsonResponse.addProperty("message", "Ya tienes una solicitud pendiente para este prototipo.");
            } else if ("ERROR_LIMITE_ALCANZADO".equals(resultado)) {
                response.setStatus(HttpServletResponse.SC_FORBIDDEN); // 403
                jsonResponse.addProperty("status", "error");
                jsonResponse.addProperty("errorType", "LIMIT_REACHED");
                jsonResponse.addProperty("message", "Has alcanzado el límite de 5 solicitudes activas.");
            } else {
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                jsonResponse.addProperty("status", "error");
                jsonResponse.addProperty("message", "Error al guardar en base de datos.");
            }
            response.getWriter().write(jsonResponse.toString());

        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            jsonResponse.addProperty("status", "error");
            jsonResponse.addProperty("message", "Estructura JSON inválida.");
            response.getWriter().write(jsonResponse.toString());
        }
    }

    // =========================================================
    // MÉTODO PUT: CAMBIAR ESTADO
    // =========================================================
    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws IOException {
        request.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        JsonObject jsonResponse = new JsonObject();

        try {
            JsonObject jsonRequest = gson.fromJson(request.getReader(), JsonObject.class);
            int idSolicitud = jsonRequest.get("idSolicitud").getAsInt();
            String nuevoEstado = jsonRequest.get("estado").getAsString().toUpperCase();

            boolean exito = solicitudService.cambiarEstadoSolicitud(idSolicitud, nuevoEstado);

            if (exito) {
                response.setStatus(HttpServletResponse.SC_OK);
                jsonResponse.addProperty("status", "success");
                jsonResponse.addProperty("message", "Estado actualizado a " + nuevoEstado);
            } else {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                jsonResponse.addProperty("status", "error");
                jsonResponse.addProperty("message", "No se pudo actualizar la solicitud.");
            }
            response.getWriter().write(jsonResponse.toString());

        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            jsonResponse.addProperty("status", "error");
            jsonResponse.addProperty("message", "Error de formato en los datos enviados.");
            response.getWriter().write(jsonResponse.toString());
        }
    }
}