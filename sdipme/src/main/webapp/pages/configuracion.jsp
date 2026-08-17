<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SDIPME - Configuración</title>

    <link
      rel="shortcut icon"
      href="../assets/svg/logo.svg"
      type="image/x-icon"
    />

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

    <!-- Styles -->
    <link rel="stylesheet" href="../css/base.css" />
    <link rel="stylesheet" href="../css/layout.css" />
    <link rel="stylesheet" href="../css/components.css" />
  </head>
  <body>
    <div class="l-settings-shell">
      <!-- ==================== SIDEBAR ==================== -->
      <aside class="l-settings-sidebar" id="settingsSidebar">
        <div class="settings-sidebar__logo">
          <img
            src="../assets/images/logo-light-txt.png"
            alt="Logo SDIPME"
            class="settings-sidebar__logo-img"
          />
        </div>

        <div class="settings-user">
          <div class="settings-user__avatar" id="settingsUserAvatar">
            <img
              id="settingsAvatarImg"
              src=""
              alt="Foto de perfil"
              style="display: none"
            />
            <span id="settingsAvatarInitials">--</span>
          </div>
          <div class="settings-user__info">
            <p class="settings-user__name" id="settingsUserName">Cargando...</p>
            <p class="settings-user__matricula" id="settingsUserMatricula">
              Estudiante
            </p>
          </div>
        </div>

        <p class="settings-nav__label">Configuración</p>
        <nav class="settings-nav" id="settingsNav">
          <button
            type="button"
            class="settings-nav__link settings-nav__link--active"
            data-panel="panel-perfil"
          >
            <i class="bx bx-user-circle"></i>
            <span>Perfil</span>
          </button>
          <button
            type="button"
            class="settings-nav__link"
            data-panel="panel-seguridad"
          >
            <i class="bx bx-shield-quarter"></i>
            <span>Seguridad</span>
          </button>
          <button
            type="button"
            class="settings-nav__link"
            id="btnPrivacidadDatos"
          >
            <a
              href="legales.html#privacidad"
              class="settings-nav__link text-decoration-none"
            >
              <i class="bx bx-lock-alt"></i>
              <span>Privacidad y Datos</span>
            </a>
          </button>
        </nav>

        <button type="button" class="settings-logout" id="btnAbrirLogout">
          <i class="bx bx-log-out"></i>
          <span>Cerrar sesión</span>
        </button>
      </aside>

      <!-- ==================== CONTENT ==================== -->
      <main class="l-settings-content">
        <div class="l-settings-wrapper">
          <a href="dashboard.jsp" class="back-link">
            <i class="bx bx-left-arrow-alt fs-3"></i> Volver al Catálogo
          </a>

          <header class="l-settings-header">
            <nav class="settings-breadcrumb">
              <span>Configuración</span>
              <i class="bx bx-chevron-right"></i>
              <span class="settings-breadcrumb__active" id="breadcrumbActive"
                >Perfil</span
              >
            </nav>
            <h1 class="settings-title" id="settingsPageTitle">
              Perfil de usuario
            </h1>
          </header>

          <!-- ================= PANEL: PERFIL ================= -->
          <section class="l-settings-panel settings-panel" id="panel-perfil">
            <!-- Información personal -->
            <div class="settings-card">
              <div class="settings-card__header">
                <i class="bx bx-id-card"></i>
                <h2 class="settings-card__title">Información personal</h2>
              </div>
              <div class="settings-card__body">
                <div class="l-settings-field-list">
                  <div class="settings-field">
                    <div>
                      <p class="settings-field__label">Foto de perfil</p>
                      <div class="settings-avatar-row">
                        <div class="settings-avatar-frame">
                          <img
                            id="fieldAvatarImg"
                            src=""
                            alt="Foto de perfil"
                            style="display: none"
                          />
                          <i class="bx bx-user" id="fieldAvatarIcon"></i>
                        </div>
                        <p class="settings-field__hint mb-0">
                          Formatos: JPEG, PNG · 2MB máximo
                        </p>
                      </div>
                    </div>
                    <div class="settings-field__action">
                      <button
                        type="button"
                        class="settings-btn-edit"
                        data-bs-toggle="modal"
                        data-bs-target="#modalEditarFoto"
                      >
                        <i class="bx bx-edit-alt"></i> Editar
                      </button>
                    </div>
                  </div>

                  <div class="settings-field">
                    <div>
                      <p class="settings-field__label">Nombre y apellidos</p>
                      <p class="settings-field__value" id="viewNombreCompleto">
                        Cargando...
                      </p>
                    </div>
                    <div class="settings-field__action">
                      <button
                        type="button"
                        class="settings-btn-edit"
                        data-bs-toggle="modal"
                        data-bs-target="#modalEditarPerfil"
                      >
                        <i class="bx bx-edit-alt"></i> Editar
                      </button>
                    </div>
                  </div>

                  <div class="settings-field">
                    <div>
                      <p class="settings-field__label">Número de matrícula</p>
                      <p class="settings-field__value" id="viewMatricula">--</p>
                      <p class="settings-field__hint">
                        Generado automáticamente
                      </p>
                    </div>
                    <div class="settings-field__action">
                      <span class="settings-badge-lock"
                        ><i class="bx bx-lock-alt"></i> Solo lectura</span
                      >
                    </div>
                  </div>

                  <div class="settings-field">
                    <div>
                      <p class="settings-field__label">Correo institucional</p>
                      <p class="settings-field__value" id="viewCorreo">--</p>
                      <p class="settings-field__hint">
                        Llave de acceso única, no editable
                      </p>
                    </div>
                    <div class="settings-field__action">
                      <span class="settings-badge-lock"
                        ><i class="bx bx-lock-alt"></i> Solo lectura</span
                      >
                    </div>
                  </div>

                  <div class="settings-field">
                    <div>
                      <p class="settings-field__label">Carrera</p>
                      <p class="settings-field__value" id="viewCarrera">--</p>
                      <p class="settings-field__hint">no editable</p>
                    </div>
                    <div class="settings-field__action">
                      <span class="settings-badge-lock"
                        ><i class="bx bx-lock-alt"></i> Solo lectura</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Actualizar contacto -->
            <div class="settings-card">
              <div class="settings-card__header">
                <i class="bx bx-phone"></i>
                <h2 class="settings-card__title">Actualizar contacto</h2>
              </div>
              <div class="settings-card__body settings-card__body--form">
                <p class="settings-field__label mb-1">Número actual</p>
                <p class="settings-field__value mb-2" id="viewTelefono">Nulo</p>
                <form
                  id="form-actualizar-contacto"
                  class="d-flex flex-column gap-3"
                  novalidate
                >
                  <div>
                    <label class="settings-form-label" for="telefono"
                      >Teléfono celular (10 dígitos)</label
                    >
                    <input
                      type="tel"
                      id="telefono"
                      class="auth-input form-control"
                      inputmode="numeric"
                      maxlength="10"
                      autocomplete="tel"
                      placeholder="777 123 4567"
                    />
                    <span class="settings-input-hint--error" id="errorTelefono">
                      <i class="bx bx-error-circle"></i> Ingresa un número
                      válido a 10 dígitos.
                    </span>
                  </div>
                  <button
                    type="submit"
                    class="btn auth-btn"
                    id="btn-guardar-telefono"
                    style="width: fit-content"
                  >
                    <i class="bx bx-save me-1"></i> Guardar teléfono
                  </button>
                </form>
              </div>
            </div>
          </section>

          <!-- ================= PANEL: SEGURIDAD ================= -->
          <section
            class="l-settings-panel settings-panel"
            id="panel-seguridad"
            style="display: none"
          >
            <!-- Cambiar contraseña -->
            <div class="settings-card">
              <div class="settings-card__header">
                <i class="bx bx-lock-open-alt"></i>
                <h2 class="settings-card__title">Cambiar contraseña</h2>
              </div>
              <div class="settings-card__body settings-card__body--form">
                <form
                  id="form-cambiar-password"
                  class="d-flex flex-column gap-3"
                  novalidate
                >
                  <div>
                    <label class="settings-form-label" for="passwordActual"
                      >Contraseña actual</label
                    >
                    <div class="settings-password-field">
                      <input
                        type="password"
                        id="passwordActual"
                        class="auth-input form-control"
                        autocomplete="current-password"
                      />
                      <button
                        type="button"
                        class="settings-password-toggle"
                        data-target="passwordActual"
                      >
                        <i class="bx bx-show"></i>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label class="settings-form-label" for="passwordNueva"
                      >Nueva contraseña</label
                    >
                    <div class="settings-password-field">
                      <input
                        type="password"
                        id="passwordNueva"
                        class="auth-input form-control"
                        autocomplete="new-password"
                      />
                      <button
                        type="button"
                        class="settings-password-toggle"
                        data-target="passwordNueva"
                      >
                        <i class="bx bx-show"></i>
                      </button>
                    </div>
                    <div class="settings-strength" id="strengthMeter">
                      <span class="settings-strength__bar"></span>
                      <span class="settings-strength__bar"></span>
                      <span class="settings-strength__bar"></span>
                    </div>
                    <p class="settings-input-hint">
                      Mínimo 8 caracteres, una mayúscula y un número.
                    </p>
                  </div>

                  <div>
                    <label class="settings-form-label" for="passwordConfirmar"
                      >Confirmar nueva contraseña</label
                    >
                    <div class="settings-password-field">
                      <input
                        type="password"
                        id="passwordConfirmar"
                        class="auth-input form-control"
                        autocomplete="new-password"
                      />
                      <button
                        type="button"
                        class="settings-password-toggle"
                        data-target="passwordConfirmar"
                      >
                        <i class="bx bx-show"></i>
                      </button>
                    </div>
                    <span
                      class="settings-input-hint--error"
                      id="errorPasswordConfirmar"
                    >
                      <i class="bx bx-error-circle"></i> Las contraseñas no
                      coinciden.
                    </span>
                  </div>

                  <a
                    href="#"
                    class="settings-forgot-link"
                    id="linkOlvidePassword"
                    data-bs-toggle="modal"
                    data-bs-target="#modalOlvidePassword"
                    >¿Olvidaste tu contraseña?</a
                  >

                  <button
                    type="submit"
                    class="btn auth-btn"
                    id="btn-actualizar-password"
                    style="width: fit-content"
                  >
                    <i class="bx bx-check-shield me-1"></i> Actualizar
                    contraseña
                  </button>
                </form>
              </div>
            </div>

            <!-- Gestión de cuenta -->
            <div class="settings-card">
              <div class="settings-card__header settings-card__header--danger">
                <i class="bx bx-error"></i>
                <h2 class="settings-card__title">Gestión de cuenta</h2>
              </div>
              <div class="settings-card__body">
                <div class="settings-danger-row">
                  <div>
                    <p class="settings-danger-row__title">
                      Suspender cuenta temporalmente
                    </p>
                    <p class="settings-danger-row__text">
                      Tu cuenta quedará inactiva. Puedes reactivarla iniciando
                      sesión de nuevo.
                    </p>
                  </div>
                  <button
                    type="button"
                    class="settings-btn-outline-danger"
                    id="btnAbrirSuspender"
                  >
                    Suspender cuenta
                  </button>
                </div>

                <div class="settings-danger-row">
                  <div>
                    <p class="settings-danger-row__title">
                      Cerrar y eliminar cuenta
                    </p>
                    <p class="settings-danger-row__text">
                      Se borrará tu cuenta y todas tus publicaciones de la
                      plataforma de forma permanente.
                    </p>
                  </div>
                  <button
                    type="button"
                    class="settings-btn-outline-danger"
                    id="btnAbrirEliminar"
                  >
                    Eliminar cuenta
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>

    <!-- ==================== MODALS ==================== -->

    <!-- Editar nombre y apellidos -->
    <div
      class="modal fade"
      id="modalEditarPerfil"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg">
          <div
            class="modal-header"
            style="background: var(--gradient-global-horizontal)"
          >
            <h5 class="modal-header-title text-white mb-0">
              <i class="bx bx-id-card me-2"></i> Editar información personal
            </h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body p-4">
            <form
              id="form-editar-perfil"
              class="d-flex flex-column gap-3"
              novalidate
            >
              <div>
                <label class="settings-form-label" for="modalNombre"
                  >Nombre(s)</label
                >
                <input
                  type="text"
                  id="modalNombre"
                  class="auth-input form-control"
                  maxlength="40"
                  autocomplete="given-name"
                  placeholder="Ej. Juan"
                />
                <span class="settings-input-hint--error" id="errorModalNombre">
                  <i class="bx bx-error-circle"></i> Escribe un nombre válido
                  (solo letras).
                </span>
              </div>
              <div>
                <label class="settings-form-label" for="modalApellidos"
                  >Apellidos</label
                >
                <input
                  type="text"
                  id="modalApellidos"
                  class="auth-input form-control"
                  maxlength="40"
                  autocomplete="family-name"
                  placeholder="Ej. Pérez López"
                />
                <span
                  class="settings-input-hint--error"
                  id="errorModalApellidos"
                >
                  <i class="bx bx-error-circle"></i> Escribe apellidos válidos
                  (solo letras).
                </span>
              </div>
              <button
                type="submit"
                class="btn auth-btn w-100 mt-2"
                id="btn-guardar-perfil"
              >
                <i class="bx bx-save me-1"></i> Guardar cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Editar foto de perfil -->
    <div
      class="modal fade"
      id="modalEditarFoto"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content border-0 shadow-lg">
          <div
            class="modal-header"
            style="background: var(--gradient-global-horizontal)"
          >
            <h5 class="modal-header-title text-white mb-0">
              <i class="bx bx-camera me-2"></i> Foto de perfil
            </h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body p-4 text-center">
            <div class="settings-avatar-preview" id="avatarPreview">
              <img
                id="avatarPreviewImg"
                src=""
                alt="Vista previa"
                style="display: none"
              />
              <i
                class="bx bx-user"
                id="avatarPreviewIcon"
                style="font-size: 2.5rem; color: var(--color-text-hint)"
              ></i>
            </div>

            <div class="drag-drop-zone p-3" id="dragDropZoneAvatar">
              <input
                type="file"
                id="inputFotoPerfil"
                class="drag-drop-zone__input"
                accept="image/png, image/jpeg, image/jpg"
              />
              <i class="bx bx-cloud-upload drag-drop-zone__icon"></i>
              <p class="drag-drop-zone__text mb-0" id="dragDropFotoText">
                Arrastra tu foto o <span>selecciona un archivo</span>
              </p>
              <p class="drag-drop-zone__hint">JPEG o PNG · máx. 2MB</p>
            </div>

            <button
              type="button"
              class="btn auth-btn w-100 mt-3"
              id="btn-guardar-foto"
              disabled
            >
              <i class="bx bx-save me-1"></i> Guardar foto
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Olvidé mi contraseña -->
    <div
      class="modal fade"
      id="modalOlvidePassword"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content border-0 shadow-lg">
          <div class="modal-body text-center p-4">
            <!-- Guarda el correo institucional del usuario para el envío automático -->
            <input type="hidden" id="correoRecuperacion" />

            <!-- Estado: enviando -->
            <div class="status-page__state is-active" id="olvideEstadoCargando">
              <div
                class="spinner-border status-page__spinner mb-2"
                role="status"
              >
                <span class="visually-hidden">Enviando...</span>
              </div>
              <h5 class="fw-bold mt-2">Enviando enlace</h5>
              <p class="text-muted small mb-0">
                Estamos generando tu enlace de recuperación, espera un momento.
              </p>
            </div>

            <!-- Estado: enlace enviado -->
            <div class="status-page__state" id="olvideEstadoExito">
              <i
                class="bx bx-envelope text-primary"
                style="font-size: 3.5rem"
              ></i>
              <h5 class="fw-bold mt-2">Revisa tu correo</h5>
              <p class="text-muted small">
                Se ha enviado un correo electrónico a tu cuenta institucional.
                Favor de revisar tu bandeja de entrada y entrar al enlace para
                cambiar tu contraseña.
              </p>
              <button
                type="button"
                class="btn auth-btn w-100"
                data-bs-dismiss="modal"
              >
                Entendido
              </button>
            </div>

            <!-- Estado: sin conexión con el servidor -->
            <div class="status-page__state" id="olvideEstadoError">
              <i
                class="bx bx-wifi-off text-danger"
                style="font-size: 3.5rem"
              ></i>
              <h5 class="fw-bold mt-2">No pudimos conectar</h5>
              <p class="text-muted small">
                No pudimos conectar con el servidor. Intenta de nuevo más tarde.
              </p>
              <button
                type="button"
                class="btn auth-btn w-100"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Editar carrera -->
    <div
      class="modal fade"
      id="modalEditarCarrera"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg">
          <div
            class="modal-header"
            style="background: var(--gradient-global-horizontal)"
          >
            <h5 class="modal-header-title text-white mb-0">
              <i class="bx bx-book-bookmark me-2"></i> Editar carrera
            </h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body p-4">
            <form
              id="form-editar-carrera"
              class="d-flex flex-column gap-3"
              novalidate
            >
              <div>
                <label class="settings-form-label" for="modalCarrera"
                  >Carrera</label
                >
                <select
                  id="modalCarrera"
                  class="auth-input form-control form-select"
                >
                  <option value="" selected disabled>
                    Selecciona tu carrera
                  </option>
                </select>
                <span class="settings-input-hint--error" id="errorModalCarrera">
                  <i class="bx bx-error-circle"></i> Selecciona una carrera
                  válida.
                </span>
              </div>
              <button
                type="submit"
                class="btn auth-btn w-100 mt-2"
                id="btn-guardar-carrera"
              >
                <i class="bx bx-save me-1"></i> Guardar cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Confirmar cierre de sesión -->
    <div
      class="modal fade"
      id="modalConfirmLogout"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content border-0 shadow-lg">
          <div class="modal-body text-center p-4">
            <i class="bx bx-log-out text-primary" style="font-size: 3.5rem"></i>
            <h5 class="fw-bold mt-2">¿Cerrar sesión?</h5>
            <p class="text-muted small">
              Deberás iniciar sesión de nuevo para acceder a tu cuenta.
            </p>
            <div class="d-flex gap-2 justify-content-center mt-3">
              <button
                type="button"
                class="btn btn-light btn-sm px-3"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                type="button"
                class="btn btn-primary btn-sm px-3"
                id="btnConfirmLogout"
              >
                Sí, cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Confirmar suspensión de cuenta -->
    <div
      class="modal fade"
      id="modalSuspenderCuenta"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg">
          <div class="modal-header bg-warning">
            <h5 class="modal-header-title text-dark mb-0">
              <i class="bx bx-pause-circle me-2"></i> ¿Seguro que quieres
              suspender tu cuenta?
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body p-4">
            <p class="text-muted small mb-3">
              Al confirmar la suspensión de tu cuenta, ocurrirá lo siguiente en
              la plataforma:
            </p>
            <ul class="text-muted small mb-4">
              <li class="mb-2">
                <strong>Tus publicaciones:</strong> Todos tus prototipos
                ofertados serán pausados y ya no aparecerán en el catálogo
                público para otros alumnos.
              </li>
              <li class="mb-2">
                <strong>Privacidad de contacto:</strong> En las transacciones en
                curso o solicitudes que hayas aceptado, tu información personal
                (teléfono y correo) se ocultará automáticamente para proteger tu
                privacidad.
              </li>
              <li>
                <strong>Reactivación:</strong> Tus datos no se borrarán. Podrás
                reactivar tu cuenta y restaurar tus prototipos con tan solo
                volver a iniciar sesión cuando lo desees.
              </li>
            </ul>
            <div class="d-flex gap-2 justify-content-end">
              <button
                type="button"
                class="btn btn-light px-4"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                type="button"
                class="btn btn-warning text-dark px-4"
                id="btnConfirmSuspender"
              >
                <i class="bx bx-pause-circle me-1"></i> Sí, suspender cuenta
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Eliminar cuenta permanentemente -->
    <div
      class="modal fade"
      id="modalEliminarCuenta"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-header-title text-white mb-0">
              <i class="bx bx-error-circle me-2"></i> Eliminar cuenta
              permanentemente
            </h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body p-4">
            <p class="text-muted small">
              Esta acción es <strong>irreversible</strong>. Se eliminarán tu
              perfil, tus publicaciones y tu historial de solicitudes de forma
              permanente.
            </p>
            <form
              id="form-eliminar-cuenta"
              class="d-flex flex-column gap-3"
              novalidate
            >
              <div>
                <label class="settings-form-label" for="passwordEliminar"
                  >Confirma tu contraseña</label
                >
                <input
                  type="password"
                  id="passwordEliminar"
                  class="auth-input form-control"
                  autocomplete="current-password"
                />
              </div>
              <div>
                <label class="settings-form-label" for="confirmTextoEliminar"
                  >Escribe <strong>ELIMINAR</strong> para confirmar</label
                >
                <input
                  type="text"
                  id="confirmTextoEliminar"
                  class="auth-input form-control"
                  autocomplete="off"
                  placeholder="ELIMINAR"
                />
              </div>
              <label class="settings-check">
                <input type="checkbox" id="checkEntiendoEliminar" />
                Entiendo que esta acción no se puede deshacer y acepto eliminar
                mi cuenta de forma permanente.
              </label>
              <button
                type="submit"
                class="settings-btn-solid-danger w-100"
                id="btn-confirmar-eliminar"
                disabled
              >
                <i class="bx bx-trash me-1"></i> Eliminar mi cuenta
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Error genérico (placeholder para futuras respuestas del backend) -->
    <div
      class="modal fade"
      id="modalErrorGenerico"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content border-0 shadow-lg">
          <div class="modal-body text-center p-4">
            <i class="bx bx-x-circle text-danger" style="font-size: 3.5rem"></i>
            <h5 class="fw-bold mt-2">Ocurrió un problema</h5>
            <p class="text-muted small" id="errorGenericoMensaje">
              No pudimos procesar tu solicitud. Intenta de nuevo más tarde.
            </p>
            <button
              type="button"
              class="btn btn-danger btn-sm w-100 mt-2"
              data-bs-dismiss="modal"
            >
              Entendido
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast reutilizable de feedback -->
    <div class="toast-alert" id="settingsToast">
      <i class="bx bx-check-circle" id="settingsToastIcon"></i>
      <span id="settingsToastMsg">Cambios guardados</span>
    </div>

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="../js/service/api.js"></script>
    <script src="../js/ui/configuracion-ui.js"></script>
    <script src="../js/main.js"></script>
  </body>
</html>
