package com.utez.sdipme.controller;


import com.google.gson.Gson;
import com.utez.sdipme.dao.PrototipoDAO;
import com.utez.sdipme.model.Prototipo;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;

@WebServlet("/api/prototipos")
public class PrototipoServlet extends HttpServlet {

    private PrototipoDAO prototipoDAO = new PrototipoDAO();
    private Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        String jsonTarjetas = prototipoDAO.obtenerPrototiposParaTarjetasJSON();
        response.getWriter().write(jsonTarjetas);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        StringBuilder sb = new StringBuilder();
        BufferedReader reader = request.getReader();
        String line;
        while ((line = reader.readLine()) != null) {
            sb.append(line);
        }

        Prototipo nuevoPrototipo = gson.fromJson(sb.toString(), Prototipo.class);


        boolean exito = prototipoDAO.registrarPrototipo(nuevoPrototipo);

        if (exito) {
            response.setStatus(HttpServletResponse.SC_CREATED); // 201 Created
            response.getWriter().write("{\"mensaje\": \"Prototipo publicado con éxito\"}");
        } else {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR); // 500 Error
            response.getWriter().write("{\"mensaje\": \"Error al guardar en la base de datos\"}");
        }
    }
}