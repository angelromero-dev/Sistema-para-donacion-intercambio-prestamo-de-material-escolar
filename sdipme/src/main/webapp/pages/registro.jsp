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
    <link rel="stylesheet" href="../css/layout.css" />
  </head>
  <body>
    <div class="auth-page">
      <div class="auth-card">
        <div class="text-center mb-4">
          <img
            src="../assets/images/logo-light-txt.png"
            alt="Logo SDIPME"
            style="height: 60px; filter: invert(1)"
          />
        </div>
        <h2 class="auth-title">Crea tu cuenta</h2>

        <form id="form-register" novalidate>
          <div class="row mb-3">
            <div class="col-md-6 mb-3 mb-md-0">
              <label class="auth-label">Nombre(s)</label>
              <input
                type="text"
                id="nombre"
                class="form-control auth-input"
                placeholder="Ej. Ana María"
                autocomplete="off"
              />
            </div>
            <div class="col-md-6">
              <label class="auth-label">Apellidos</label>
              <input
                type="text"
                id="apellidos"
                class="form-control auth-input"
                placeholder="Ej. López Cruz"
                autocomplete="off"
              />
            </div>
          </div>

          <div class="mb-3">
            <label class="auth-label">Correo Institucional</label>
            <input
              type="email"
              id="correo"
              class="form-control auth-input"
              placeholder="ejemplo@utez.edu.mx"
              autocomplete="off"
            />
            <small class="text-muted" style="font-size: 0.75rem"
              >Tu matrícula se extraerá automáticamente.</small
            >
          </div>

          <div class="mb-3">
            <label class="auth-label">Teléfono (10 dígitos)</label>
            <input
              type="tel"
              id="telefono"
              class="form-control auth-input"
              placeholder="777 123 4567"
              maxlength="10"
              autocomplete="off"
            />
          </div>

          <div class="mb-3">
            <label class="auth-label">Carrera</label>
            <select id="carrera" class="form-select auth-input">
              <option value="" selected disabled>Cargando carreras...</option>
            </select>
          </div>

          <div class="row mb-4">
            <div class="col-md-6 mb-3 mb-md-0">
              <label class="auth-label">Contraseña</label>
              <div class="password-wrapper">
                <input
                  type="password"
                  id="password"
                  class="form-control auth-input"
                  placeholder="Mín. 8 caracteres"
                />
                <i
                  class="bx bx-hide password-toggle"
                  data-target="password"
                ></i>
              </div>
            </div>
            <div class="col-md-6">
              <label class="auth-label">Confirmar Contraseña</label>
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
            Revisar datos y continuar
          </button>
        </form>

        <div class="text-center mt-4">
          <span class="text-muted">¿Ya tienes cuenta?</span>
          <a
            href="login.jsp"
            style="color: var(--color-brand-primary); font-weight: 600"
            >Inicia sesión</a
          >
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
              class="bx bx-error-circle text-warning"
              style="font-size: 4rem"
            ></i>
            <h5 class="fw-bold mt-3">Revisa tus datos</h5>
            <p class="text-muted small" id="txtErrorValidacion">
              El formulario contiene errores.
            </p>
            <button
              type="button"
              class="btn btn-warning w-100 fw-bold"
              data-bs-dismiss="modal"
            >
              Corregir
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
              <i class="bx bx-check-shield"></i> Confirma tu información
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body p-4">
            <p class="text-muted small">
              Por favor verifica que todo sea correcto antes de crear tu cuenta.
              Una vez registrada, no podrás cambiar tu matrícula ni tu correo.
            </p>
            <div class="summary-data">
              <p>
                <strong>Nombre completo:</strong> <span id="sumNombre"></span>
              </p>
              <p>
                <strong>Matrícula (Auto):</strong>
                <span id="sumMatricula"></span>
              </p>
              <p><strong>Correo:</strong> <span id="sumCorreo"></span></p>
              <p><strong>Teléfono:</strong> <span id="sumTelefono"></span></p>
              <p><strong>Carrera:</strong> <span id="sumCarrera"></span></p>
              <p><strong>División:</strong> <span id="sumDivision"></span></p>
            </div>
            <div class="d-flex gap-2 mt-4">
              <button
                type="button"
                class="btn btn-light w-50 fw-bold"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                type="button"
                class="btn auth-btn w-50"
                id="btn-submit-final"
              >
                Sí, crear cuenta
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
              class="spinner-border text-light"
              style="width: 4rem; height: 4rem; border-width: 0.35em"
              role="status"
            ></div>
            <h5 class="text-white mt-3 fw-bold shadow-sm">Creando cuenta...</h5>
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
              class="bx bx-check-circle text-success"
              style="font-size: 4rem"
            ></i>
            <h5 class="fw-bold mt-3">¡Registro Exitoso!</h5>
            <p class="text-muted small">
              Revisa la bandeja de entrada de tu correo institucional para
              activar tu cuenta.
            </p>
            <p class="text-muted small">
              Redirigiendo al login en <span id="countdown">4</span>...
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
