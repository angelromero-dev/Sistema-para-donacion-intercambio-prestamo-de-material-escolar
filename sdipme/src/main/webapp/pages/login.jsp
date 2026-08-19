<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta
      name="description"
      content="Plataforma institucional de la UTEZ para préstamo, intercambio y donación de prototipos."
    />
    <title>SDIPME - Inicio de sesión</title>

    <link
      rel="shortcut icon"
      href="../assets/svg/logo.svg"
      type="image/x-icon"
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
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
  <body class="auth-layout">
    <main
      class="container d-flex flex-column justify-content-center align-items-center vh-100"
    >
      <div class="mb-4 text-center">
        <img
          src="../assets/images/Logotipo-UTEZ.png"
          alt="Logo UTEZ"
          class="auth-logo"
        />
      </div>

      <div class="auth-card p-4">
        <h1 class="auth-card__title mb-4">Inicio de sesión</h1>

        <form id="form-login">
          <div class="mb-3">
            <input
              type="email"
              id="usuario"
              class="form-control auth-input"
              placeholder="Correo institucional"
              autocomplete="username"
              required
            />
          </div>
          <div class="mb-3">
            <input
              type="password"
              id="password"
              class="form-control auth-input"
              placeholder="Tu contraseña"
              autocomplete="current-password"
              required
            />
          </div>

          <div
            class="d-flex justify-content-between align-items-center mb-4 auth-options"
          >
            <!-- CASO 1: Disparador del modal de recuperación -->
            <a
              href="#"
              class="auth-link"
              data-bs-toggle="modal"
              data-bs-target="#modalOlvidePassword"
              >¿Olvidaste tu contraseña?</a
            >
          </div>

          <button type="submit" id="btn-login" class="btn auth-btn w-100">
            Iniciar
          </button>
        </form>

        <div class="text-center mt-4 auth-footer">
          <span class="text-muted">¿No tienes cuenta?</span>
          <a href="registro.jsp" class="auth-link">Crear cuenta aquí</a>
        </div>
      </div>
    </main>

    <!-- ========================================== -->
    <!-- MODALES DE AUTENTICACIÓN Y RECUPERACIÓN    -->
    <!-- ========================================== -->

    <!-- Modal 1: Olvidé mi Contraseña (Caso 1) -->
    <div
      class="modal fade modal-scale"
      id="modalOlvidePassword"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow">
          <div class="modal-header bg-light border-0">
            <h5 class="fw-bold mb-0 text-primary">Recuperar Contraseña</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body p-4">
            <p class="text-muted small mb-3">
              Ingresa tu correo institucional. Te enviaremos un enlace seguro
              para restablecer tu acceso.
            </p>
            <form id="form-olvide-password">
              <div class="mb-3">
                <input
                  type="email"
                  id="correoRecuperacion"
                  class="form-control auth-input"
                  placeholder="ejemplo@utez.edu.mx"
                  required
                />
              </div>
              <button
                type="submit"
                id="btn-enviar-recuperacion"
                class="btn auth-btn w-100"
              >
                Enviar enlace
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal 2: Revisa tu Correo (Casos 1 y 2) -->
    <div
      class="modal fade modal-scale"
      id="modalRevisaCorreo"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content border-0 shadow text-center p-4">
          <i
            class="bx bx-envelope text-primary mb-2"
            style="font-size: 3.5rem"
          ></i>
          <h5 class="fw-bold mb-2">Revisa tu correo</h5>
          <p class="text-muted small mb-3">
            Hemos enviado las instrucciones a tu bandeja de entrada para
            continuar con el proceso.
          </p>
          <button
            type="button"
            class="btn auth-btn w-100"
            data-bs-dismiss="modal"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>

    <!-- Modal 3: Cuenta Suspendida / Bloqueada por intentos (Caso 2) -->
    <div
      class="modal fade modal-scale"
      id="modalCuentaSuspendida"
      tabindex="-1"
      aria-hidden="true"
      data-bs-backdrop="static"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow">
          <div class="modal-header bg-light border-0">
            <h5 class="fw-bold mb-0 text-warning">
              <i class="bx bx-error-circle"></i> Cuenta Bloqueada
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body p-4">
            <p class="text-muted small mb-3">
              Tu cuenta se encuentra suspendida o ha sido bloqueada por exceder
              el límite de intentos fallidos. Puedes reactivarla recibiendo un
              enlace en tu correo.
            </p>
            <form id="form-reactivar-cuenta">
              <input type="hidden" id="correoReactivacionOculto" />
              <button
                type="submit"
                id="btn-reactivar-cuenta"
                class="btn auth-btn w-100"
              >
                Enviar enlace de reactivación
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal 4: Baneado por el Administrador (Caso 3) -->
    <div
      class="modal fade modal-scale"
      id="modalBaneado"
      tabindex="-1"
      aria-hidden="true"
      data-bs-backdrop="static"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow">
          <div class="modal-header bg-light border-0">
            <h5 class="fw-bold mb-0 text-danger">
              <i class="bx bx-block"></i> Acceso Restringido
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body p-4">
            <p class="text-muted small mb-3">
              Tu cuenta ha sido bloqueada permanentemente por un administrador
              del sistema. Si consideras que esto es un error, puedes enviar una
              apelación (Límite: 1 mensaje cada 7 días).
            </p>
            <form id="form-mensaje-admin">
              <input type="hidden" id="idUsuarioBaneado" />
              <div class="mb-3">
                <textarea
                  id="mensajeAdminTexto"
                  class="form-control auth-input"
                  rows="3"
                  maxlength="255"
                  placeholder="Escribe tu justificación aquí (Máx. 255 caracteres)..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                id="btn-enviar-admin"
                class="btn btn-danger w-100 fw-bold"
              >
                Enviar Apelación
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Activación Exitosa (Usuario Nuevo) -->
    <div
      class="modal fade modal-scale"
      id="modalActivacionExito"
      tabindex="-1"
      aria-hidden="true"
      data-bs-backdrop="static"
    >
      <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content border-0 shadow text-center p-4">
          <i
            class="bx bx-check-circle text-success mb-2"
            style="font-size: 3.5rem"
          ></i>
          <h5 class="fw-bold mb-2">¡Cuenta Activada!</h5>
          <p class="text-muted small mb-3">
            Tu cuenta ha sido validada exitosamente. Ya puedes iniciar sesión.
          </p>
          <button
            type="button"
            class="btn auth-btn w-100"
            data-bs-dismiss="modal"
          >
            Ir al Login
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Activación Error -->
    <div
      class="modal fade modal-scale"
      id="modalActivacionError"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content border-0 shadow text-center p-4">
          <i
            class="bx bx-x-circle text-danger mb-2"
            style="font-size: 3.5rem"
          ></i>
          <h5 class="fw-bold mb-2">Error de activación</h5>
          <p class="text-muted small mb-3" id="activacionErrorMsg">
            El enlace es inválido o la cuenta ya fue activada.
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
