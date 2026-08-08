package com.utez.sdipme.filter;

import jakarta.servlet.*;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.io.IOException;

/**
 * Security filter to protect restricted routes from unauthorized access.
 */
@WebFilter("/pages/*")
public class AuthFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        // Obtain session without creating a new one if it doesn't exist
        HttpSession session = httpRequest.getSession(false);

        // Check if session exists and user is logged in
        boolean isLoggedIn = (session != null && session.getAttribute("idUsuario") != null);

        if (isLoggedIn) {
            // Allow request to proceed to the destination
            chain.doFilter(request, response);
        } else {
            // Block and redirect to the public index/login page
            System.err.println(">>> [SECURITY FILTER] Acceso denegado a ruta protegida. Redirigiendo a login.");
            httpResponse.sendRedirect(httpRequest.getContextPath() + "/index.jsp");
        }
    }
}