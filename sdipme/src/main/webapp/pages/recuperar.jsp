<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SDIPME - Recuperar Contraseña</title>
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
  <body
    class="auth-layout d-flex justify-content-center align-items-center vh-100"
  >
    <div class="text-center">
      <div
        class="spinner-border text-primary"
        role="status"
        id="loadingRecuperacion"
      ></div>
      <p class="mt-3 text-muted" id="textoRecuperacion">
        Validando enlace seguro...
      </p>
    </div>

    <!-- Modal Restablecer Contraseña -->
    <div
      class="modal fade modal-scale"
      id="modalRestablecerPassword"
      tabindex="-1"
      aria-hidden="true"
      data-bs-backdrop="static"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow">
          <div class="modal-header bg-light border-0">
            <h5 class="fw-bold mb-0 text-primary">Restablecer Contraseña</h5>
          </div>
          <div class="modal-body p-4">
            <p class="text-muted small mb-3">
              Ingresa tu nueva contraseña para
              <span id="nombreUsuarioRestablecer" class="fw-bold"></span>.
            </p>
            <form id="form-restablecer-password">
              <div class="mb-3">
                <label class="form-label">Nueva Contraseña</label>
                <input
                  type="password"
                  id="nuevaPassword"
                  class="form-control"
                  required
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Confirmar Contraseña</label>
                <input
                  type="password"
                  id="confirmarPassword"
                  class="form-control"
                  required
                />
              </div>
              <button
                type="submit"
                id="btn-restablecer-password"
                class="btn auth-btn w-100"
              >
                Guardar Contraseña
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Enlace Inválido -->
    <div
      class="modal fade modal-scale"
      id="modalEnlaceInvalido"
      tabindex="-1"
      aria-hidden="true"
      data-bs-backdrop="static"
    >
      <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content border-0 shadow text-center p-4">
          <i
            class="bx bx-x-circle text-danger mb-2"
            style="font-size: 3.5rem"
          ></i>
          <h5 class="fw-bold mb-2">Enlace inválido</h5>
          <p class="text-muted small mb-3">
            Este enlace ha expirado o ya fue utilizado.
          </p>
          <a href="login.jsp" class="btn btn-outline-secondary w-100"
            >Volver al Login</a
          >
        </div>
      </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="../js/service/api.js"></script>
    <script src="../js/main.js"></script>
  </body>
</html>
