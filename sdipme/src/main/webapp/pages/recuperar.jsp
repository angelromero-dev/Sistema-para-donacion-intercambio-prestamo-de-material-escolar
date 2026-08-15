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
    <!-- Modal Restablecer Contraseña (Se abre en automático) -->
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
              Hola
              <span class="fw-bold"
                ><%= session.getAttribute("nombreUsuario") != null ?
                session.getAttribute("nombreUsuario") : "" %></span
              >, ingresa tu nueva contraseña. (Opcional, ya estás logueado y tu
              cuenta está desbloqueada).
            </p>
            <form id="form-restablecer-password">
              <div class="mb-3">
                <label class="form-label">Nueva Contraseña</label>
                <div class="password-wrapper position-relative">
                  <input
                    type="password"
                    id="nuevaPassword"
                    class="form-control auth-input"
                    placeholder="Min. 6 caracteres, 1 mayúscula"
                    required
                  />
                  <i
                    class="bx bx-hide password-toggle position-absolute top-50 end-0 translate-middle-y me-3"
                    data-target="nuevaPassword"
                    style="cursor: pointer; color: var(--color-text-hint)"
                  ></i>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">Confirmar Contraseña</label>
                <div class="password-wrapper position-relative">
                  <input
                    type="password"
                    id="confirmarPassword"
                    class="form-control auth-input"
                    placeholder="Repite tu contraseña"
                    required
                  />
                  <i
                    class="bx bx-hide password-toggle position-absolute top-50 end-0 translate-middle-y me-3"
                    data-target="confirmarPassword"
                    style="cursor: pointer; color: var(--color-text-hint)"
                  ></i>
                </div>
              </div>
              <div class="d-flex gap-2">
                <a href="dashboard.jsp" class="btn btn-outline-secondary w-50"
                  >Omitir</a
                >
                <button
                  type="submit"
                  id="btn-restablecer-password"
                  class="btn auth-btn w-50"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Error -->
    <div
      class="modal fade modal-scale"
      id="modalErrorRestablecer"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content border-0 shadow text-center p-4">
          <i class="bx bx-error text-danger mb-2" style="font-size: 3.5rem"></i>
          <h5 class="fw-bold mb-2">No se pudo actualizar</h5>
          <p class="text-muted small mb-3" id="errorRestablecerMensaje">
            Ocurrió un error al procesar tu solicitud.
          </p>
          <button
            type="button"
            class="btn btn-outline-secondary w-100"
            data-bs-dismiss="modal"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="../js/service/api.js"></script>
    <script src="../js/main.js"></script>
  </body>
</html>
