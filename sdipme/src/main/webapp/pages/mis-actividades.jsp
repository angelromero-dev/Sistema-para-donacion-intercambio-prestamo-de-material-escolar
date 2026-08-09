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

      <div class="notif-tabs" id="notifTabs">
        <button class="notif-tab active" data-target="panel-solicitudes">
          Solicitudes Recibidas
          <span class="badge bg-danger rounded-pill ms-1">2</span>
        </button>
        <button class="notif-tab" data-target="panel-mis-prototipos">
          Mis Prototipos Publicados
        </button>
      </div>

      <section
        id="panel-solicitudes"
        class="notif-panel"
        style="display: block"
      >
        <div class="l-notif-list" id="lista-solicitudes">
          <article class="notif-card" data-id="101">
            <div class="notif-card__avatar">
              <i class="bx bx-user"></i>
            </div>
            <div class="notif-card__body">
              <div class="d-flex align-items-center">
                <h3 class="notif-card__title">Solicitud de Préstamo</h3>
                <span class="notif-card__time">Hace 25 min</span>
              </div>
              <p class="notif-card__text">
                El alumno <b>20233001</b> quiere solicitar tu prototipo
                <i>"Kit Arduino Uno Rev3"</i>.
              </p>

              <div class="notif-card__detail-box">
                <span
                  ><i class="bx bx-calendar-event me-1"></i> Solicitado por:
                  <b>3 días de préstamo</b></span
                >
              </div>

              <div class="d-flex gap-2 mt-3">
                <button class="btn-approve-custom">
                  <i class="bx bx-check"></i> Aprobar
                </button>
                <button class="btn-reject-custom">
                  <i class="bx bx-x"></i> Rechazar
                </button>
              </div>
            </div>
          </article>

          <article class="notif-card" data-id="102">
            <div class="notif-card__avatar" style="background-color: #f77702">
              <i class="bx bx-transfer-alt"></i>
            </div>
            <div class="notif-card__body">
              <div class="d-flex align-items-center">
                <h3 class="notif-card__title">Oferta de Intercambio</h3>
                <span class="notif-card__time">Hace 2 horas</span>
              </div>
              <p class="notif-card__text">
                El alumno <b>20215099</b> ofrece un artículo a cambio de tu
                <i>"Multímetro Digital"</i>.
              </p>

              <div
                class="notif-card__detail-box notif-card__detail-box--exchange"
              >
                <span>Ofrece: <b>Cautín de estación Weller</b></span>
                <button class="btn-detail-link">[Ver detalles]</button>
              </div>

              <div class="d-flex gap-2 mt-3">
                <button class="btn-approve-custom">
                  <i class="bx bx-check"></i> Aceptar Oferta
                </button>
                <button class="btn-reject-custom">
                  <i class="bx bx-x"></i> Rechazar
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section
        id="panel-mis-prototipos"
        class="notif-panel"
        style="display: none"
      >
        <div class="text-center py-5">
          <i class="bx bx-package text-muted" style="font-size: 3.5rem"></i>
          <p class="text-muted mt-2">
            Aquí se inyectarán tus publicaciones activas.
          </p>
        </div>
      </section>
    </main>

    <div
      class="modal fade"
      id="modalConfirmApprove"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content border-0 shadow">
          <div class="modal-body text-center p-4">
            <i
              class="bx bx-check-circle text-success"
              style="font-size: 3.5rem"
            ></i>
            <h5 class="fw-bold mt-2">¿Aprobar solicitud?</h5>
            <p class="text-muted small">
              Se le notificará al alumno para coordinar la entrega.
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
                class="btn btn-success btn-sm px-3"
                id="btnConfirmApprove"
              >
                Sí, aprobar
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
        <div class="modal-content border-0 shadow">
          <div class="modal-header border-0 pb-0">
            <h5 class="modal-title fw-bold">Prototipo de Intercambio</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body p-4 text-center">
            <img
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758"
              alt="Prototipo Ofrecido"
              class="img-fluid rounded mb-3"
              style="max-height: 220px; width: 100%; object-fit: cover"
            />
            <h6 class="fw-bold text-start mb-1" id="exchangeTitle">
              Cautín de Estación Weller Digital
            </h6>
            <p class="text-muted small text-start" id="exchangeDesc">
              Cautín regulable en temperatura con base metálica. En excelente
              estado operativo.
            </p>
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
                    required
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
                    <select
                      id="pubCategoria"
                      class="publish-form__select"
                      required
                    >
                      <option value="" disabled selected>Selecciona...</option>
                      <option value="1">Componentes Electrónicos</option>
                      <option value="2">Herramientas</option>
                      <option value="3">Libros y Manuales</option>
                      <option value="4">Material de Papelería</option>
                      <option value="5">Impresiones 3D</option>
                    </select>
                  </div>
                  <div class="col-md-6">
                    <label for="pubCarrera" class="publish-form__label"
                      >Carrera Perteneciente *</label
                    >
                    <select
                      id="pubCarrera"
                      class="publish-form__select"
                      required
                    >
                      <option value="" disabled selected>Selecciona...</option>
                      <option value="1">Desarrollo de Software</option>
                      <option value="2">Redes Digitales</option>
                      <option value="3">Mantenimiento Industrial</option>
                      <option value="4">Mecatrónica</option>
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
                      required
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
                    required
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
                    required
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
                      src="https://images.unsplash.com/photo-1581092160607-ee22621dd758"
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
                      <span class="prototype-card__matricula"
                        >Tu Matrícula</span
                      >
                      <div class="prototype-card__rating">
                        <i class="bx bxs-star prototype-card__star-icon"></i>
                        <span class="prototype-card__score">5.0</span>
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

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <script src="../js/ui/actividades-ui.js"></script>
    <script src="../js/service/api.js"></script>
  </body>
</html>
