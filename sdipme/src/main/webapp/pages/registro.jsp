<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SDIPME - Registro</title>
    <link
      rel="shortcut icon"
      href="../assets/svg/logo.svg"
      type="image/x-icon"
    />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&family=Roboto:wght@400;500;600&display=swap"
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
    <link rel="stylesheet" href="../css/component-auth.css" />
  </head>
  <body>
    <div class="auth-page">
      <div class="auth-card">
        <div class="text-center mb-3">
          <img
            src="../assets/images/logo-light-txt.png"
            alt="Logo SDIPME"
            class="auth-card__logo"
          />
        </div>
        <h2 class="auth-title">Crear Cuenta</h2>

        <form id="form-register" novalidate>
          <div class="row mb-3">
            <div class="col-md-6 mb-3 mb-md-0">
              <label for="nombre" class="auth-label">Nombre(s)</label>
              <input
                type="text"
                id="nombre"
                class="form-control auth-input"
                placeholder="Nombre(s)"
                autocomplete="off"
              />
            </div>
            <div class="col-md-6">
              <label for="apellidos" class="auth-label">Apellidos</label>
              <input
                type="text"
                id="apellidos"
                class="form-control auth-input"
                placeholder="Apellidos"
                autocomplete="off"
              />
            </div>
          </div>

          <div class="mb-3">
            <label for="correo" class="auth-label">Correo Institucional</label>
            <input
              type="email"
              id="correo"
              class="form-control auth-input"
              placeholder="ejemplo@utez.edu.mx"
              autocomplete="off"
            />
          </div>

          <div class="mb-3">
            <label for="telefono" class="auth-label">Teléfono</label>
            <input
              type="tel"
              id="telefono"
              class="form-control auth-input"
              placeholder="10 dígitos"
              maxlength="10"
              autocomplete="off"
            />
          </div>

          <div class="mb-3">
            <label for="carrera" class="auth-label">Carrera</label>
            <select id="carrera" class="form-select auth-input">
              <option value="" selected disabled>Cargando carreras...</option>
            </select>
          </div>

          <div class="row mb-4">
            <div class="col-md-6 mb-3 mb-md-0">
              <label for="password" class="auth-label">Contraseña</label>
              <div class="password-wrapper">
                <input
                  type="password"
                  id="password"
                  class="form-control auth-input"
                  placeholder="Min. 6 caracteres, 1 mayúscula"
                />
                <i
                  class="bx bx-hide password-toggle"
                  data-target="password"
                ></i>
              </div>
            </div>
            <div class="col-md-6">
              <label for="confirmPassword" class="auth-label"
                >Confirmar Contraseña</label
              >
              <div class="password-wrapper">
                <input
                  type="password"
                  id="confirmPassword"
                  class="form-control auth-input"
                  placeholder="Repite tu contraseña"
                />
                <i
                  class="bx bx-hide password-toggle"
                  data-target="confirmPassword"
                ></i>
              </div>
            </div>
          </div>

          <button
            type="submit"
            id="btn-register-init"
            class="btn auth-btn w-100"
          >
            Registrarse
          </button>
        </form>

        <div class="auth-footer">
          <span>¿Ya tienes cuenta?</span>
          <a href="login.jsp">Inicia sesión</a>
        </div>
      </div>
    </div>

    <div
      class="modal fade modal-scale"
      id="modalValidacion"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content border-0 shadow">
          <div class="modal-body text-center p-4">
            <i
              class="bx bx-error-circle text-warning mb-2"
              style="font-size: 3.5rem"
            ></i>
            <h5 class="fw-bold mb-2">Datos incompletos</h5>
            <p class="text-muted small mb-3" id="txtErrorValidacion">
              Ocurrió un error en el formulario.
            </p>
            <button
              type="button"
              class="btn auth-btn w-100 py-2"
              data-bs-dismiss="modal"
            >
              Entendido
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade modal-scale"
      id="modalConfirmacion"
      tabindex="-1"
      aria-hidden="true"
      data-bs-backdrop="static"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg">
          <div class="modal-header bg-light border-0">
            <h5 class="fw-bold mb-0 text-primary">
              <i class="bx bx-check-shield"></i> Confirma tus Datos
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body p-4">
            <p class="text-muted small mb-3">
              Verifica que tu información sea correcta antes de completar tu
              registro.
            </p>
            <div class="summary-data">
              <p>
                <strong>Nombre completo:</strong> <span id="sumNombre"></span>
              </p>
              <p><strong>Matrícula:</strong> <span id="sumMatricula"></span></p>
              <p><strong>Correo:</strong> <span id="sumCorreo"></span></p>
              <p><strong>Teléfono:</strong> <span id="sumTelefono"></span></p>
              <p><strong>Carrera:</strong> <span id="sumCarrera"></span></p>
              <p><strong>División:</strong> <span id="sumDivision"></span></p>
            </div>
            <div class="d-flex gap-2 mt-4">
              <button
                type="button"
                class="btn btn-outline-secondary w-50 fw-bold"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                type="button"
                class="btn auth-btn w-50"
                id="btn-submit-final"
              >
                Confirmar y Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="modalLoading"
      tabindex="-1"
      aria-hidden="true"
      data-bs-backdrop="static"
    >
      <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content border-0 bg-transparent shadow-none">
          <div class="modal-body text-center">
            <div
              class="spinner-border"
              style="
                width: 3.5rem;
                height: 3.5rem;
                border-width: 0.3em;
                color: var(--color-brand-primary);
              "
              role="status"
            ></div>
            <h6 class="mt-3 fw-bold" style="color: var(--color-brand-primary)">
              Cargando ...
            </h6>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade modal-scale"
      id="modalExito"
      tabindex="-1"
      aria-hidden="true"
      data-bs-backdrop="static"
    >
      <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content border-0 shadow">
          <div class="modal-body text-center p-4">
            <i
              class="bx bx-check-circle text-success mb-2"
              style="font-size: 3.5rem"
            ></i>
            <h5 class="fw-bold mb-2">¡Registro Exitoso!</h5>
            <p class="text-muted small mb-2">
              Revisa tu correo institucional para activar tu cuenta.
            </p>
            <p class="text-muted small mb-0">
              Redirigiendo en
              <span id="countdown" class="fw-bold text-primary">4</span>s...
            </p>
          </div>
        </div>
      </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="../js/service/api.js"></script>
    <script src="../js/main.js"></script>
  </body>
</html>
