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
    <title>SDIPME-Mis Ofertas</title>

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

  <body>
    <header class="l-activity-header">
      <a href="dashboard.jsp" class="back-link">
        <i class="bx bx-left-arrow-alt fs-3"></i> Volver
      </a>
      <button
        class="btn auth-btn px-3 py-2 btn-sm"
        data-bs-toggle="modal"
        data-bs-target="#modalPublicarPrototipo"
      >
        <i class="bx bx-plus-circle"></i> Publicar Prototipo
      </button>
    </header>

    <main class="l-activity-container">
      <div>
        <h1 class="header-titles__main">Mi Espacio y Solicitudes</h1>
        <p class="header-titles__sub text-muted">
          Gestiona tus ofertas recibidas y material publicado.
        </p>
      </div>

      <div
        class="notif-tabs mb-4"
        id="notifTabs"
        style="border-bottom: 2px solid var(--color-border-base)"
      >
        <button class="notif-tab active" data-target="panel-solicitudes">
          Pendientes
          <span
            class="badge bg-danger rounded-pill ms-1"
            id="badge-pendientes"
            style="display: none"
            >0</span
          >
        </button>
        <button class="notif-tab" data-target="panel-historial-sol">
          Historial Solicitudes
        </button>
        <button class="notif-tab" data-target="panel-mis-prototipos">
          Publicaciones Activas
        </button>
        <button class="notif-tab" data-target="panel-historial-pub">
          Historial Publicaciones
        </button>
      </div>

      <section
        id="panel-solicitudes"
        class="notif-panel"
        style="display: block"
      >
        <div class="l-notif-list" id="lista-solicitudes">
          <div class="text-center py-5">
            <div class="spinner-border text-primary" role="status"></div>
            <p class="text-muted mt-2">Cargando solicitudes...</p>
          </div>
        </div>
      </section>

      <section
        id="panel-historial-sol"
        class="notif-panel"
        style="display: none"
      >
        <div class="l-notif-list" id="lista-historial-sol"></div>
      </section>

      <section
        id="panel-mis-prototipos"
        class="notif-panel"
        style="display: none"
      >
        <div class="l-notif-list" id="lista-mis-prototipos">
          <div class="text-center py-5">
            <i class="bx bx-package text-muted" style="font-size: 3.5rem"></i>
            <p class="text-muted mt-2">Cargando tus publicaciones...</p>
          </div>
        </div>
      </section>

      <section
        id="panel-historial-pub"
        class="notif-panel"
        style="display: none"
      >
        <div class="l-notif-list" id="lista-historial-pub"></div>
      </section>
    </main>

    <div
      class="modal fade"
      id="modalConfirmApprove"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow">
          <div class="modal-body p-4">
            <div class="text-center mb-3">
              <i
                class="bx bx-shield-quarter text-success"
                style="font-size: 3.5rem"
              ></i>
              <h5 class="fw-bold mt-2">Aprobar Solicitud</h5>
            </div>

            <div
              class="alert alert-warning border-0 bg-warning bg-opacity-10 text-dark small mb-3"
            >
              <i class="bx bx-error-circle"></i>
              <strong>Aviso de Privacidad:</strong> Al aprobar esta solicitud,
              la plataforma compartirá tu
              <b>Nombre Real, Teléfono y Correo</b> con el solicitante para que
              puedan coordinar el intercambio. Tú también recibirás sus datos.
            </div>

            <div class="form-check mb-4">
              <input
                class="form-check-input"
                type="checkbox"
                id="chkPrivacyConsent"
              />
              <label
                class="form-check-label small text-muted"
                for="chkPrivacyConsent"
              >
                Comprendo y acepto compartir mis datos de contacto con este
                alumno.
              </label>
            </div>

            <div class="d-flex gap-2 justify-content-center">
              <button
                type="button"
                class="btn btn-light btn-sm px-4"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                type="button"
                class="btn btn-success btn-sm px-4"
                id="btnConfirmApprove"
                disabled
              >
                Sí, aprobar y compartir datos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="modalConfirmReject"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content border-0 shadow">
          <div class="modal-body text-center p-4">
            <i class="bx bx-x-circle text-danger" style="font-size: 3.5rem"></i>
            <h5 class="fw-bold mt-2">¿Rechazar solicitud?</h5>
            <p class="text-muted small">Esta acción no se puede deshacer.</p>
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
                class="btn btn-danger btn-sm px-3"
                id="btnConfirmReject"
              >
                Sí, rechazar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="modalPrototypeDetail"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-header-title text-white mb-0" id="exchangeTitle">
              Oferta de Intercambio
            </h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body p-4">
            <div class="exchange-modal-img-wrapper mb-3">
              <img
                src=""
                id="exchangeModalImg"
                alt="Artículo ofrecido"
                class="exchange-modal-img"
              />
            </div>
            <div class="bg-light p-3 rounded-3">
              <h6 class="fw-bold text-dark mb-1">
                <i class="bx bx-message-square-detail text-primary me-1"></i>
                Mensaje del Solicitante:
              </h6>
              <p class="text-muted small mb-0 lh-sm" id="exchangeDesc">
                Sin mensaje adicional.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="modalConfirmCancelProto"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content border-0 shadow">
          <div class="modal-body text-center p-4">
            <i class="bx bx-trash text-danger" style="font-size: 3.5rem"></i>
            <h5 class="fw-bold mt-2">¿Cancelar publicación?</h5>
            <p class="text-muted small">
              Tu prototipo ya no estará disponible en el catálogo general.
            </p>
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
                id="btnConfirmCancelProtoFinal"
              >
                Sí, cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="toast-alert" id="actionToast">
      <i class="bx bx-info-circle text-warning fs-5"></i>
      <span id="toastMessage">Acción realizada</span>
    </div>

    <div
      class="modal fade modal-publish"
      id="modalPublicarPrototipo"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content modal-publish__content">
          <div class="modal-header modal-publish__header">
            <h5 class="modal-publish__title">
              <i class="bx bx-upload me-2"></i> Publicar Nuevo Material
            </h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div class="modal-body p-0">
            <div class="modal-publish__grid">
              <form id="formPublicarPrototipo" class="publish-form">
                <div>
                  <label for="pubTitulo" class="publish-form__label">
                    Título del Prototipo *
                    <span class="publish-form__char-counter" id="counterTitulo"
                      >0/100</span
                    >
                  </label>
                  <input
                    type="text"
                    id="pubTitulo"
                    class="publish-form__input"
                    placeholder="Ej. Kit Arduino Uno Rev3 con Sensores"
                    maxlength="100"
                  />
                </div>

                <div>
                  <label class="publish-form__label"
                    >Tipo de Transacción * (Selecciona al menos 1)</label
                  >
                  <div class="transaction-checkbox-group">
                    <label class="transaction-checkbox">
                      <input
                        type="checkbox"
                        value="Préstamo"
                        class="cb-transaccion"
                        checked
                      />
                      Préstamo
                    </label>
                    <label class="transaction-checkbox">
                      <input
                        type="checkbox"
                        value="Intercambio"
                        class="cb-transaccion"
                      />
                      Intercambio
                    </label>
                    <label class="transaction-checkbox">
                      <input
                        type="checkbox"
                        value="Donación"
                        class="cb-transaccion"
                      />
                      Donación
                    </label>
                  </div>
                </div>

                <div class="row g-2">
                  <div class="col-md-6">
                    <label for="pubCategoria" class="publish-form__label"
                      >Categoría *</label
                    >
                    <select id="pubCategoria" class="publish-form__select">
                      <option value="" disabled selected>
                        Cargando categorías...
                      </option>
                    </select>
                  </div>
                  <div class="col-md-6">
                    <label for="pubCarrera" class="publish-form__label"
                      >Carrera Perteneciente *</label
                    >
                    <select id="pubCarrera" class="publish-form__select">
                      <option value="" disabled selected>
                        Cargando carreras...
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label class="publish-form__label"
                    >Fotografía del Prototipo *</label
                  >
                  <div class="drag-drop-zone" id="dragDropZone">
                    <input
                      type="file"
                      id="pubImagenArchivo"
                      class="drag-drop-zone__input"
                      accept="image/png, image/jpeg, image/jpg, image/webp"
                    />
                    <div class="drag-drop-zone__content">
                      <i class="bx bx-cloud-upload drag-drop-zone__icon"></i>
                      <p class="drag-drop-zone__text" id="dragDropText">
                        Arrastra y suelta tu imagen aquí<br />o
                        <span>haz clic para explorar</span>
                      </p>
                      <p class="drag-drop-zone__hint">
                        Archivos soportados: JPG, PNG, WEBP (Máx. 5MB)
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label for="pubDescCorta" class="publish-form__label">
                    Descripción Corta (Vista de Tarjeta) *
                    <span
                      class="publish-form__char-counter"
                      id="counterDescCorta"
                      >0/100</span
                    >
                  </label>
                  <input
                    type="text"
                    id="pubDescCorta"
                    class="publish-form__input"
                    placeholder="Resumen breve para el catálogo..."
                    maxlength="100"
                  />
                </div>

                <div>
                  <label for="pubDescLarga" class="publish-form__label">
                    Descripción Detallada *
                    <span
                      class="publish-form__char-counter"
                      id="counterDescLarga"
                      >0/256</span
                    >
                  </label>
                  <textarea
                    id="pubDescLarga"
                    class="publish-form__textarea"
                    placeholder="Especifica el estado del material, reglas de entrega o accesorios incluidos..."
                    maxlength="256"
                  ></textarea>
                </div>

                <div class="pt-2">
                  <button
                    type="submit"
                    id="btnSubmitPublicar"
                    class="btn auth-btn w-100 py-2"
                  >
                    <i class="bx bx-check-circle me-1"></i> Publicar Prototipo
                  </button>
                </div>
              </form>

              <div class="live-preview-panel">
                <span class="live-preview-panel__title">
                  <i class="bx bx-show"></i> Vista Previa
                </span>

                <article class="prototype-card" style="margin: 0">
                  <div class="prototype-card__media">
                    <img
                      src="../assets/images/NoImage.png"
                      id="prevImg"
                      alt="Vista Previa"
                      class="prototype-card__img"
                    />
                  </div>
                  <div class="prototype-card__body">
                    <div class="prototype-card__tags" id="prevTags">
                      <span class="badge-tag badge-tag--loan">Préstamo</span>
                      <span class="badge-tag badge-tag--category">General</span>
                    </div>
                    <h3 class="prototype-card__title" id="prevTitle">
                      Título del Prototipo
                    </h3>
                    <p class="prototype-card__description" id="prevDesc">
                      Descripción corta del prototipo que aparecerá en la
                      tarjeta del catálogo.
                    </p>
                    <div class="prototype-card__footer">
                      <span class="prototype-card__matricula" id="prevMatricula"
                        >Tu Matrícula</span
                      >
                      <div class="prototype-card__rating">
                        <i class="bx bxs-star prototype-card__star-icon"></i>
                        <span class="prototype-card__score" id="prevScore"
                          >5.0</span
                        >
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="modalConfirmPublicar"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content border-0 shadow">
          <div class="modal-body text-center p-4">
            <i
              class="bx bx-cloud-upload text-primary"
              style="font-size: 3.5rem"
            ></i>
            <h5 class="fw-bold mt-2">¿Publicar prototipo?</h5>
            <p class="text-muted small">
              Tu prototipo será visible para toda la comunidad UTEZ.
            </p>
            <div class="d-flex gap-2 justify-content-center mt-3">
              <button
                type="button"
                class="btn btn-light btn-sm px-3"
                data-bs-dismiss="modal"
              >
                Revisar de nuevo
              </button>
              <button
                type="button"
                class="btn btn-primary btn-sm px-3"
                id="btnConfirmPublicarFinal"
              >
                Sí, publicar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="modalVerContactoSol"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content border-0 shadow-lg">
          <div class="modal-header bg-success text-white">
            <h5 class="modal-header-title text-white mb-0">
              <i class="bx bx-user-check me-2"></i> Contacto del Solicitante
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
              <h5 class="fw-bold mb-0" id="solNombre">Cargando...</h5>
              <p class="text-muted small" id="solMatricula">Matrícula</p>
            </div>

            <div class="bg-light p-3 rounded-3 text-start mb-3">
              <p class="mb-2 small">
                <i class="bx bx-phone text-success me-2"></i>
                <strong id="solTelefono">***</strong>
              </p>
              <p class="mb-0 small">
                <i class="bx bx-envelope text-success me-2"></i>
                <strong id="solCorreo">***</strong>
              </p>
            </div>

            <p class="small text-muted fst-italic mb-0">
              Ponte en contacto con el alumno para coordinar el préstamo o
              intercambio dentro del campus.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="../js/ui/publicar-modal-ui.js"></script>
    <script src="../js/ui/actividades-ui.js"></script>
    <script src="../js/service/api.js"></script>
  </body>
</html>
