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
                    String titulo = solicitudDao.obtenerTituloPrototipo(solicitud.getIdPrototipo());
                    String accionDetalle = "";

                    if (solicitud.getDiasPrestamo() != null) {
                        accionDetalle = "pedirte prestado '" + titulo + "' por " + solicitud.getDiasPrestamo() + " días";
                    } else if (solicitud.getOfertaIntercambio() != null && !solicitud.getOfertaIntercambio().isEmpty()) {
                        accionDetalle = "ofrecerte '" + solicitud.getOfertaIntercambio() + "' a cambio de tu '" + titulo + "'";
                    } else {
                        accionDetalle = "solicitar la donación de '" + titulo + "'";
                    }

                    EmailService.enviarNotificacionGeneralAsync(correoDueno,
                            "Nueva solicitud en tu catálogo",
                            "Alguien quiere " + accionDetalle + ". Inicia sesión en SDIPME para revisar los detalles y aceptar o rechazar la petición.",
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

        if (exito) {
            String[] datos = solicitudDao.obtenerDatosParaCorreo(idSolicitud);
            String titulo = datos[0];
            String dias = datos[1];
            String oferta = datos[2];

            String tipoTransaccion = (dias != null) ? "préstamo" : (oferta != null ? "intercambio" : "donación");

            if ("ACEPTADA".equals(nuevoEstado)) {
                solicitudDao.marcarPrototipoOcupadoPorSolicitud(idSolicitud);

                // === LÓGICA NUEVA: Rechazar a la competencia y avisarles ===
                int idPrototipo = solicitudDao.obtenerIdPrototipoPorSolicitud(idSolicitud);
                if (idPrototipo != -1) {
                    List<String> correosRechazados = solicitudDao.rechazarOtrasYObtenerCorreos(idSolicitud, idPrototipo);
                    for (String correoPerdedor : correosRechazados) {
                        EmailService.enviarNotificacionGeneralAsync(correoPerdedor,
                                "Solicitud Rechazada Automáticamente",
                                "El dueño ya ha elegido otra petición para el material '" + titulo + "'. Tu solicitud ha sido descartada.",
                                baseUrl);
                    }
                }

                // Avisar al ganador
                String correoSol = solicitudDao.obtenerCorreoSolicitante(idSolicitud);
                if (correoSol != null) {
                    EmailService.enviarNotificacionGeneralAsync(correoSol,
                            "¡Solicitud Aprobada!",
                            "Tu solicitud de " + tipoTransaccion + " para '" + titulo + "' ha sido aceptada. Inicia sesión en SDIPME para ver los datos del contacto.",
                            baseUrl);
                }

            } else if ("RECHAZADA".equals(nuevoEstado)) {
                // Rechazo manual directo del dueño
                String correoSol = solicitudDao.obtenerCorreoSolicitante(idSolicitud);
                if (correoSol != null) {
                    EmailService.enviarNotificacionGeneralAsync(correoSol,
                            "Solicitud Rechazada",
                            "El dueño ha rechazado tu petición de " + tipoTransaccion + " para '" + titulo + "'.",
                            baseUrl);
                }
            }
        }
        return exito;
    }
    public List<Integer> obtenerPrototiposPendientes(int idSolicitante) {
        return solicitudDao.obtenerPrototiposPendientes(idSolicitante);
    }
}