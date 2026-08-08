package com.utez.sdipme.filter;

import jakarta.servlet.*;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.io.IOException;

/**
 * Security filter to protect restricted routes while allowing public access to auth pages and static assets.
 */
@WebFilter("/*")
public class AuthFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        String path = httpRequest.getRequestURI().substring(httpRequest.getContextPath().length());

        // Define public routes that do not require authentication
        boolean isPublicPage = path.endsWith("index.jsp") ||
                path.endsWith("login.jsp") ||
                path.endsWith("registro.jsp") ||
                path.equals("/");

        // Define static assets and public API endpoints
        boolean isStaticResource = path.startsWith("/css/") ||
                path.startsWith("/js/") ||
                path.startsWith("/assets/") ||
                path.startsWith("/api/auth/") ||
                path.startsWith("/api/activar");

        // Verify session existence
        HttpSession session = httpRequest.getSession(false);
        boolean isLoggedIn = (session != null && session.getAttribute("idUsuario") != null);

        // Allow request if resource is public, or if user is authenticated
        if (isPublicPage || isStaticResource || isLoggedIn) {
            chain.doFilter(request, response);
        } else {
            // Block unauthorized access to private pages (e.g. /pages/dashboard.jsp) and redirect
            System.err.println(">>> [SECURITY FILTER] Acceso denegado a ruta protegida: " + path + ". Redirigiendo a login.");
            httpResponse.sendRedirect(httpRequest.getContextPath() + "/pages/login.jsp");
        }
    }
}