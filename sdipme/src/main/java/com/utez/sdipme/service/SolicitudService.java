package com.utez.sdipme.service;

import com.utez.sdipme.dao.SolicitudDao;
import com.utez.sdipme.model.Solicitud;

public class SolicitudService {

    private final SolicitudDao solicitudDao = new SolicitudDao();

    public String procesarNuevaSolicitud(Solicitud solicitud) {
        System.out.println(">>> [SERVICE - service/SolicitudService.java] Iniciando procesamiento de solicitud para el prototipo ID: " + solicitud.getIdPrototipo());

        try {
            boolean disponible = solicitudDao.esPrototipoDisponible(solicitud.getIdPrototipo());

            if (!disponible) {
                System.err.println(">>> [SERVICE WARN - service/SolicitudService.java] Bloqueo de concurrencia: El prototipo ya está ocupado o en proceso.");
                return "ERROR_OCUPADO";
            }

            boolean exito = solicitudDao.registrarSolicitud(solicitud);

            if (exito) {
                System.out.println(">>> [SERVICE OK - service/SolicitudService.java] Solicitud registrada correctamente en la base de datos.");
                return "EXITO";
            } else {
                System.err.println(">>> [SERVICE ERROR - service/SolicitudService.java] El DAO devolvió false al intentar insertar.");
                return "ERROR_BD";
            }

        } catch (Exception e) {
            System.err.println(">>> [SERVICE FATAL - service/SolicitudService.java] Excepción no controlada en la lógica de negocio: " + e.getMessage());
            e.printStackTrace();
            return "ERROR_INTERNO";
        }
    }

    public boolean cambiarEstadoSolicitud(int idSolicitud, String nuevoEstado) {
        System.out.println(">>> [SERVICE - service/SolicitudService.java] Intentando cambiar solicitud ID " + idSolicitud + " a estado: " + nuevoEstado);

        boolean exito = solicitudDao.actualizarEstado(idSolicitud, nuevoEstado);

        if (exito) {
            System.out.println(">>> [SERVICE OK - service/SolicitudService.java] Máquina de estados actualizada exitosamente.");
        } else {
            System.err.println(">>> [SERVICE ERROR - service/SolicitudService.java] No se pudo cambiar el estado. ¿El ID existe?");
        }

        return exito;
    }
}