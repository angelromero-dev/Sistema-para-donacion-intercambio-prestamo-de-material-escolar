package com.utez.sdipme.controller;

import com.utez.sdipme.dao.CatalogoDAO;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/api/catalogos")
public class CatalogosServlet extends HttpServlet {

    private final CatalogoDAO catalogoDAO = new CatalogoDAO();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        System.out.println(">>> [DEBUG] Entrando a GET /api/catalogos");

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        try {
            String jsonRespuesta = catalogoDAO.obtenerCatalogosJSON();

            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write(jsonRespuesta);

            System.out.println(">>> [DEBUG] Catálogos enviados al Frontend con éxito.");
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"status\":\"error\", \"message\":\"Fallo interno al obtener catálogos\"}");
        }
    }
}