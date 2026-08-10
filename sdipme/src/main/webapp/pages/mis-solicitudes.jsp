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

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="../js/service/api.js"></script>
    <script src="../js/ui/mis-solicitudes-ui.js"></script>
  </body>
</html>
