package com.utez.sdipme.service;

import com.utez.sdipme.dao.SolicitudDao;
import com.utez.sdipme.model.Solicitud;
import java.util.List;

public class SolicitudService {

    private final SolicitudDao solicitudDao = new SolicitudDao();

    public String procesarNuevaSolicitud(Solicitud solicitud, String baseUrl) {
        try {
            boolean disponible = solicitudDao.esPrototipoDisponible(solicitud.getIdPrototipo());
            if (!disponible) return "ERROR_OCUPADO";
            if (solicitudDao.usuarioYaSolicito(solicitud.getIdPrototipo(), solicitud.getIdSolicitante())) return "ERROR_DUPLICADO";
            if (solicitudDao.contarSolicitudesActivasUsuario(solicitud.getIdSolicitante()) >= 5) return "ERROR_LIMITE_ALCANZADO";

            boolean exito = solicitudDao.registrarSolicitud(solicitud);
            if (exito) {
                String correoDueno = solicitudDao.obtenerCorreoDuenoPorPrototipo(solicitud.getIdPrototipo());
                if (correoDueno != null) {
                    EmailService.enviarNotificacionGeneralAsync(correoDueno,
                            "Nueva solicitud recibida",
                            "Alguien ha solicitado ofertado por uno de tus prototipos. Inicia sesión para revisar los detalles y responder.",
                            baseUrl);
                }
                return "EXITO";
            } else {
                return "ERROR_BD";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "ERROR_INTERNO";
        }
    }

    public boolean cambiarEstadoSolicitud(int idSolicitud, String nuevoEstado, String baseUrl) {
        boolean exito = solicitudDao.actualizarEstado(idSolicitud, nuevoEstado);

        if (exito && "ACEPTADA".equals(nuevoEstado)) {
            solicitudDao.marcarPrototipoOcupadoPorSolicitud(idSolicitud);

            String correoSol = solicitudDao.obtenerCorreoSolicitante(idSolicitud);
            if (correoSol != null) {
                EmailService.enviarNotificacionGeneralAsync(correoSol,
                        "¡Solicitud Aprobada!",
                        "El dueño del prototipo ha aceptado tu solicitud. Inicia sesión en SDIPME para ver sus datos de contacto y coordinar la entrega.",
                        baseUrl);
            }
        }
        return exito;
    }

    public List<Integer> obtenerPrototiposPendientes(int idSolicitante) {
        return solicitudDao.obtenerPrototiposPendientes(idSolicitante);
    }
}