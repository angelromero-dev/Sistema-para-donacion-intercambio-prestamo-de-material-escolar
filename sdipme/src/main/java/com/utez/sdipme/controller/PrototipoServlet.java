package com.utez.sdipme.controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.utez.sdipme.dao.PrototipoDAO;
import com.utez.sdipme.model.Prototipo;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/api/prototipos")
public class PrototipoServlet extends HttpServlet {

    private final PrototipoDAO prototipoDAO = new PrototipoDAO();
    private final Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        System.out.println(">>> [DEBUG] Entrando a GET /api/prototipos");

        request.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        try {
            String jsonTarjetas = prototipoDAO.obtenerPrototiposParaTarjetasJSON();
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write(jsonTarjetas);
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            JsonObject error = new JsonObject();
            error.addProperty("status", "error");
            error.addProperty("message", "Error interno generando las tarjetas.");
            response.getWriter().write(error.toString());
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        System.out.println(">>> [DEBUG] Entrando a POST /api/prototipos");

        request.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        JsonObject jsonResponse = new JsonObject();

        try {
            // 1. Leer el JSON entrante de la misma forma exacta que en LoginServlet
            JsonObject jsonRequest = gson.fromJson(request.getReader(), JsonObject.class);

            // 2. Extraer los datos manualmente (Evita colapsos silenciosos de Gson)
            Prototipo nuevoPrototipo = new Prototipo();
            nuevoPrototipo.setIdUsuario(jsonRequest.get("idUsuario").getAsInt());
            nuevoPrototipo.setTitulo(jsonRequest.get("titulo").getAsString());
            nuevoPrototipo.setDescripcionCorta(jsonRequest.get("descripcionCorta").getAsString());
            nuevoPrototipo.setDescripcionLarga(jsonRequest.get("descripcionLarga").getAsString());
            nuevoPrototipo.setUrlImagen(jsonRequest.get("urlImagen").getAsString());
            nuevoPrototipo.setIdCarrera(jsonRequest.get("idCarrera").getAsInt());
            nuevoPrototipo.setIdCategoria(jsonRequest.get("idCategoria").getAsInt());
            nuevoPrototipo.setTipoTransaccion(jsonRequest.get("tipoTransaccion").getAsString());

            // 3. Enviar a base de datos
            boolean exito = prototipoDAO.registrarPrototipo(nuevoPrototipo);

            if (exito) {
                response.setStatus(HttpServletResponse.SC_CREATED);
                jsonResponse.addProperty("status", "success");
                jsonResponse.addProperty("message", "Prototipo publicado con éxito.");
            } else {
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                jsonResponse.addProperty("status", "error");
                jsonResponse.addProperty("message", "Error al guardar en la BD. Verifica que el ID de usuario exista.");
            }

            response.getWriter().write(jsonResponse.toString());

        } catch (Exception e) {
            e.printStackTrace(); // Esto escupirá cualquier error en la consola de IntelliJ
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            jsonResponse.addProperty("status", "error");
            jsonResponse.addProperty("message", "Error interno en el servidor: " + e.getMessage());
            response.getWriter().write(jsonResponse.toString());
        }
    }
}