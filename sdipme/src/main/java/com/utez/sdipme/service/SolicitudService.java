package com.utez.sdipme.service;

import com.utez.sdipme.dao.SolicitudDao;
import com.utez.sdipme.model.Solicitud;
import java.util.List;

public class SolicitudService {

    private final SolicitudDao solicitudDao = new SolicitudDao();

    public String procesarNuevaSolicitud(Solicitud solicitud) {
        System.out.println(">>> [SERVICE] Iniciando procesamiento de solicitud para el prototipo ID: " + solicitud.getIdPrototipo());

        try {
            boolean disponible = solicitudDao.esPrototipoDisponible(solicitud.getIdPrototipo());
            if (!disponible) {
                System.err.println(">>> [SERVICE WARN] El prototipo ya está ocupado.");
                return "ERROR_OCUPADO";
            }

            if (solicitudDao.usuarioYaSolicito(solicitud.getIdPrototipo(), solicitud.getIdSolicitante())) {
                System.err.println(">>> [SERVICE WARN] El usuario ya tiene una solicitud pendiente para este prototipo.");
                return "ERROR_DUPLICADO";
            }

            if (solicitudDao.contarSolicitudesActivasUsuario(solicitud.getIdSolicitante()) >= 5) {
                System.err.println(">>> [SERVICE WARN] El usuario ha alcanzado el límite de 5 solicitudes activas.");
                return "ERROR_LIMITE_ALCANZADO";
            }

            boolean exito = solicitudDao.registrarSolicitud(solicitud);

            if (exito) {
                System.out.println(">>> [SERVICE OK] Solicitud registrada correctamente.");
                return "EXITO";
            } else {
                System.err.println(">>> [SERVICE ERROR] El DAO devolvió false al intentar insertar.");
                return "ERROR_BD";
            }

        } catch (Exception e) {
            System.err.println(">>> [SERVICE FATAL] Excepción no controlada: " + e.getMessage());
            e.printStackTrace();
            return "ERROR_INTERNO";
        }
    }

    public boolean cambiarEstadoSolicitud(int idSolicitud, String nuevoEstado) {
        return solicitudDao.actualizarEstado(idSolicitud, nuevoEstado);
    }

    public List<Integer> obtenerPrototiposPendientes(int idSolicitante) {
        return solicitudDao.obtenerPrototiposPendientes(idSolicitante);
    }
}