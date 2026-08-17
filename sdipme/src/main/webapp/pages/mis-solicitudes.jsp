<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SDIPME - Mis Solicitudes</title>

    <link
      rel="shortcut icon"
      href="../assets/svg/logo.svg"
      type="image/x-icon"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&family=Roboto:wght@400;500&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
    />
    <link
      href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
      rel="stylesheet"
    />

    <link rel="stylesheet" href="../css/base.css" />
    <link rel="stylesheet" href="../css/layout.css" />
    <link rel="stylesheet" href="../css/components.css" />
  </head>

  <body>
    <header class="l-activity-header">
      <a href="dashboard.jsp" class="back-link">
        <i class="bx bx-left-arrow-alt fs-3"></i> Volver al Catálogo
      </a>
    </header>

    <main class="l-activity-container">
      <div>
        <h1 class="header-titles__main">Mis Solicitudes</h1>
        <p class="header-titles__sub text-muted">
          Rastrea el estado de los materiales que has pedido a otros compañeros.
        </p>
      </div>

      <div
        class="notif-tabs mb-4"
        id="notifTabs"
        style="border-bottom: 2px solid var(--color-border-base)"
      >
        <button class="notif-tab active" data-target="panel-en-espera">
          En Espera
          <span
            class="badge bg-warning text-dark rounded-pill ms-1"
            id="badge-espera"
            style="display: none"
            >0</span
          >
        </button>
        <button class="notif-tab" data-target="panel-historial-mio">
          Mi Historial
        </button>
      </div>

      <section id="panel-en-espera" class="notif-panel" style="display: block">
        <div class="l-notif-list" id="lista-en-espera">
          <div class="text-center py-5">
            <div class="spinner-border text-warning" role="status"></div>
            <p class="text-muted mt-2">Buscando tus solicitudes...</p>
          </div>
        </div>
      </section>

      <section
        id="panel-historial-mio"
        class="notif-panel"
        style="display: none"
      >
        <div class="l-notif-list" id="lista-historial-mio">
          <div class="text-center py-5">
            <i class="bx bx-history text-muted" style="font-size: 3.5rem"></i>
            <p class="text-muted mt-2">
              Aquí aparecerán las respuestas de los dueños.
            </p>
          </div>
        </div>
      </section>
    </main>

    <div
      class="modal fade"
      id="modalVerContacto"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content border-0 shadow-lg">
          <div class="modal-header bg-success text-white">
            <h5 class="modal-header-title text-white mb-0">
              <i class="bx bx-user-check me-2"></i> Contacto del Dueño
            </h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body p-4 text-center">
            <div class="mb-3">
              <div class="bg-light rounded-circle d-inline-flex p-3 mb-2">
                <i class="bx bx-user fs-1 text-success"></i>
              </div>
              <h5 class="fw-bold mb-0" id="contactoNombre">Cargando...</h5>
              <p class="text-muted small" id="contactoMatricula">Matrícula</p>
            </div>

            <div class="bg-light p-3 rounded-3 text-start mb-3">
              <p class="mb-2 small">
                <i class="bx bx-phone text-success me-2"></i>
                <strong id="contactoTelefono">***</strong>
              </p>
              <p class="mb-0 small">
                <i class="bx bx-envelope text-success me-2"></i>
                <strong id="contactoCorreo">***</strong>
              </p>
            </div>

            <p class="small text-muted fst-italic mb-0">
              Ponte en contacto para coordinar la entrega de forma segura dentro
              del campus.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Confirmar Cancelación de Solicitud -->
    <div
      class="modal fade"
      id="modalConfirmCancelarMiSolicitud"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content border-0 shadow">
          <div class="modal-body text-center p-4">
            <i class="bx bx-trash text-danger" style="font-size: 3.5rem"></i>
            <h5 class="fw-bold mt-2">¿Cancelar solicitud?</h5>
            <p class="text-muted small">
              El dueño del prototipo será notificado y perderás tu lugar de
              espera.
            </p>
            <input type="hidden" id="hiddenIdSolicitudCancelar" />
            <div class="d-flex gap-2 justify-content-center mt-3">
              <button
                type="button"
                class="btn btn-light btn-sm px-3"
                data-bs-dismiss="modal"
              >
                Atrás
              </button>
              <button
                type="button"
                class="btn btn-danger btn-sm px-3"
                id="btnEjecutarCancelarSolicitud"
              >
                Sí, cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast para reemplazar los alert() del navegador -->
    <div class="toast-alert" id="actionToast">
      <i class="bx bx-info-circle fs-5" id="toastIcon"></i>
      <span id="toastMessage" style="font-weight: 500; font-size: 0.9rem"
        >Acción realizada</span
      >
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="../js/service/api.js"></script>
    <script src="../js/ui/mis-solicitudes-ui.js"></script>
  </body>
</html>
