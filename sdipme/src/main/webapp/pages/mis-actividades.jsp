<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!doctype html>
<html lang="es">
  <head>
    <!-- Meta tags -->
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta
      name="description"
      content="Plataforma institucional de la UTEZ para préstamo, intercambio y donación de prototipos."
    />
    <meta name="author" content="Equipo 4" />

    <link
      rel="shortcut icon"
      href="../assets/svg/logo.svg"
      type="image/x-icon"
    />
    <title>SDIPME-Mis Actividades</title>

    <!-- External fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&family=Roboto:wght@400;500&display=swap"
      rel="stylesheet"
    />

    <!-- External libraries -->
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
    />
    <link
      href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
    />

    <!-- Styles -->
    <link rel="stylesheet" href="../css/base.css" />
    <link rel="stylesheet" href="../css/layout.css" />
    <link rel="stylesheet" href="../css/components.css" />
  </head>
  <body class="bg-light">
    <header class="l-navbar d-flex align-items-center px-4">
      <h4 class="text-white m-0 font-monospace">SDIPME</h4>
    </header>

    <main class="l-container l-activity-panel">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <div>
          <h1 class="header-titles__main">Mi Espacio</h1>
          <p class="header-titles__sub text-muted">
            Gestiona tus ofertas y prototipos publicados.
          </p>
        </div>
        <button class="btn auth-btn px-4 py-2">
          <i class="bx bx-plus-circle"></i> Publicar Nuevo
        </button>
      </div>

      <div class="l-tabs-wrapper">
        <button class="activity-tab active" data-target="panel-notificaciones">
          Notificaciones y Solicitudes
          <span class="badge bg-danger rounded-pill ms-1">2</span>
        </button>
        <button class="activity-tab" data-target="panel-mis-publicaciones">
          Mis Prototipos Publicados
        </button>
      </div>

      <section
        id="panel-notificaciones"
        class="tab-panel"
        style="display: block"
      >
        <div class="l-activity-grid">
          <article class="activity-card">
            <div class="activity-card__icon">
              <i class="bx bx-time-five"></i>
            </div>
            <div class="activity-card__content">
              <div class="activity-card__header">
                <h3 class="activity-card__title">Solicitud de Préstamo</h3>
                <span class="activity-card__time">Hace 2 horas</span>
              </div>
              <p class="activity-card__message">
                El alumno <b>20233001</b> ha solicitado tu
                <i>Kit Arduino Uno Rev3</i>.
              </p>

              <div class="activity-card__details">
                <span
                  ><i class="bx bx-calendar-event"></i> Requiere el préstamo
                  por: <b>3 días</b></span
                >
              </div>

              <div class="activity-card__actions">
                <button class="btn-action btn-action--approve">
                  <i class="bx bx-check"></i> Aprobar
                </button>
                <button class="btn-action btn-action--reject">
                  <i class="bx bx-x"></i> Rechazar
                </button>
              </div>
            </div>
          </article>

          <article class="activity-card">
            <div class="activity-card__icon">
              <i class="bx bx-transfer-alt"></i>
            </div>
            <div class="activity-card__content">
              <div class="activity-card__header">
                <h3 class="activity-card__title">Oferta de Intercambio</h3>
                <span class="activity-card__time">Hace 1 día</span>
              </div>
              <p class="activity-card__message">
                El alumno <b>20215099</b> ha ofertado un intercambio por tu
                <i>Multímetro Digital</i>.
              </p>

              <div
                class="activity-card__details activity-card__details--exchange"
              >
                <span>Ofrece: <b>Cautín de estación Weller</b></span>
                <button class="btn-link-action btn-view-exchange">
                  [Ver foto]
                </button>
              </div>

              <div class="activity-card__actions">
                <button class="btn-action btn-action--approve">
                  <i class="bx bx-check"></i> Aceptar Oferta
                </button>
                <button class="btn-action btn-action--reject">
                  <i class="bx bx-x"></i> Rechazar
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section
        id="panel-mis-publicaciones"
        class="tab-panel"
        style="display: none"
      >
        <div class="text-center py-5">
          <i class="bx bx-package text-muted" style="font-size: 4rem"></i>
          <p class="text-muted mt-3">
            Aquí se verán tus prototipos activos usando las mismas tarjetas del
            catálogo.
          </p>
        </div>
      </section>
    </main>

    <div class="exchange-overlay" id="exchange-overlay">
      <div class="exchange-modal">
        <div class="exchange-modal__header">
          <h3 class="exchange-modal__title">Detalles de la Oferta</h3>
          <button class="exchange-modal__close" id="btn-close-modal">
            <i class="bx bx-x"></i>
          </button>
        </div>
        <p class="text-muted small m-0">
          El usuario ofrece este artículo a cambio:
        </p>
        <img
          src="https://images.unsplash.com/photo-1581092160607-ee22621dd758"
          alt="Oferta de Intercambio"
          class="exchange-modal__img"
        />
        <p class="mb-0 fw-bold">Cautín de estación Weller Digital</p>
        <p class="text-muted small">
          "Funciona perfecto, solo le falta esponja nueva."
        </p>
      </div>
    </div>

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <script src="../js/ui/actividades-ui.js"></script>
    <script src="../js/service/api.js"></script>
  </body>
</html>
