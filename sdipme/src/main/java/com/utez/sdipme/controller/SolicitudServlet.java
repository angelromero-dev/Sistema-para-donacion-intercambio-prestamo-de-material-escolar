package com.utez.sdipme.controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.utez.sdipme.model.Solicitud;
import com.utez.sdipme.service.SolicitudService;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/api/solicitudes")
public class SolicitudServlet extends HttpServlet {

    private final SolicitudService solicitudService = new SolicitudService();
    private final Gson gson = new Gson();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        System.out.println("\n=========================================");
        System.out.println(">>> [CONTROLLER - controller/SolicitudServlet.java] Petición POST recibida en /api/solicitudes");

        request.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        JsonObject jsonResponse = new JsonObject();

        try {
            System.out.println(">>> [CONTROLLER - controller/SolicitudServlet.java] Leyendo cuerpo JSON...");
            JsonObject jsonRequest = gson.fromJson(request.getReader(), JsonObject.class);

            Solicitud nuevaSolicitud = new Solicitud();
            nuevaSolicitud.setIdPrototipo(jsonRequest.get("idPrototipo").getAsInt());
            nuevaSolicitud.setIdSolicitante(jsonRequest.get("idSolicitante").getAsInt());
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

            System.out.println(">>> [CONTROLLER - controller/SolicitudServlet.java] Mapeo de JSON a Objeto exitoso. Llamando al Servicio...");

            String resultado = solicitudService.procesarNuevaSolicitud(nuevaSolicitud);

            if ("EXITO".equals(resultado)) {
                response.setStatus(HttpServletResponse.SC_CREATED);
                jsonResponse.addProperty("status", "success");
                jsonResponse.addProperty("message", "Solicitud enviada correctamente. El estado ahora es PENDIENTE.");
            } else if ("ERROR_OCUPADO".equals(resultado)) {
                response.setStatus(HttpServletResponse.SC_CONFLICT);
                jsonResponse.addProperty("status", "error");
                jsonResponse.addProperty("message", "Este prototipo ya fue solicitado o entregado a alguien más.");
            } else {
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                jsonResponse.addProperty("status", "error");
                jsonResponse.addProperty("message", "Error al registrar la solicitud en la base de datos.");
            }

            response.getWriter().write(jsonResponse.toString());

        } catch (Exception e) {
            System.err.println(">>> [CONTROLLER FATAL - controller/SolicitudServlet.java] El Servlet colapsó leyendo el JSON.");
            System.err.println(">>> [MENSAJE EXACTO]: " + e.getMessage());
            e.printStackTrace();

            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            jsonResponse.addProperty("status", "error");
            jsonResponse.addProperty("message", "Datos mal formados en la petición: " + e.getMessage());
            response.getWriter().write(jsonResponse.toString());
        }
    }
}