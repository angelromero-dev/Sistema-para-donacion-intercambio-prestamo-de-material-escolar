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
    <title>SDIPME-Dashboard</title>

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
    <!-- Header -->
    <header class="l-header">
      <div
        class="l-container d-flex justify-content-between align-items-center"
      >
        <!-- Brand logo -->
        <div class="header-brand">
          <img
            src="../assets/images/logo-light-txt.png"
            alt="Logo SDIPME"
            class="header-brand__img"
          />
        </div>

        <!-- Main titles -->
        <div class="header-titles text-center">
          <h2 class="header-titles__sub">UNIVERSIDAD TECNOLÓGICA</h2>
          <h2 class="header-titles__sub">
            EMILIANO ZAPATA DEL ESTADO DE MORELOS
          </h2>
        </div>

        <!-- Social links -->
        <div class="header-socials">
          <a href="#" class="header-socials__link"
            ><i class="bx bxl-tiktok"></i
          ></a>
          <a href="#" class="header-socials__link"
            ><i class="bx bxl-instagram"></i
          ></a>
          <a href="#" class="header-socials__link d-flex align-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-twitter-x"
              viewBox="0 0 16 16"
            >
              <path
                d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z"
              />
            </svg>
          </a>
          <a href="#" class="header-socials__link"
            ><i class="bx bxl-facebook-circle"></i
          ></a>
          <a href="#" class="header-socials__link"
            ><i class="bx bxl-youtube"></i
          ></a>
        </div>
      </div>
    </header>

    <!-- Navbar -->
    <nav class="l-navbar" id="smart-navbar">
      <div class="l-container h-100">
        <ul
          class="nav-menu d-flex justify-content-center align-items-center h-100 mb-0"
        >
          <!-- Default item -->
          <li class="nav-menu__item">
            <a href="#" class="nav-menu__link nav-menu__link--active">
              <i class="bx bx-home-alt"></i> Inicio
            </a>
          </li>

          <!-- Items -->
          <li class="nav-menu__item">
            <a href="pages/mis-actividades.jsp" class="nav-menu__link">
              Mi actividad
            </a>
          </li>
          <li class="nav-menu__item">
            <a href="pages/registro.jsp" class="nav-menu__link">
              <i class="bx bx-user-plus"></i> Registrarse
            </a>
          </li>
          <li class="nav-menu__item">
            <a href="#" class="nav-menu__link">
              <i class="bx bx-envelope"></i> Contacto
            </a>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Searcher -->

    <!-- Cards section -->
    <main class="l-container my-4">
      <div class="l-catalog-grid" id="grid-prototipos"></div>
    </main>

    <!-- FOOTER -->
    <footer class="l-footer">
      <div class="l-container">
        <div class="footer-wrapper d-flex flex-column">
          <!-- Top Section: Contact Info -->
          <div class="footer-contact">
            <div class="footer-contact__item">
              <i class="bx bx-map"></i>
              <span
                >Dirección: Av. Universidad Tecnológica 1, Palo Escrito, 62765
                Emiliano Zapata, Mor.</span
              >
            </div>
            <div class="footer-contact__item">
              <i class="bx bx-phone"></i>
              <span>777 368 1165</span>
            </div>
            <div class="footer-contact__item">
              <i class="bx bxl-whatsapp"></i>
              <span>777 184 40 51</span>
            </div>
          </div>

          <!-- Divider -->
          <hr class="footer-divider" />

          <!-- Bottom Section: Actions & Socials -->
          <div
            class="footer-bottom d-flex justify-content-between align-items-center flex-wrap"
          >
            <!-- Action Links -->
            <div class="footer-actions d-flex">
              <a href="#" class="footer-actions__link">
                <i class="bx bx-box"></i>
                <span>Buzón de sugerencias y<br />quejas</span>
              </a>
              <a href="#" class="footer-actions__link">
                <i class="bx bx-envelope"></i>
                <span>Correo electrónico</span>
              </a>
              <a href="#" class="footer-actions__link">
                <i class="bx bx-lock-alt"></i>
                <span>Avisos de privacidad</span>
              </a>
              <a href="#" class="footer-actions__link">
                <i class="bx bx-dollar-circle"></i>
                <span>Políticas de pago en<br />línea</span>
              </a>
              <a href="#" class="footer-actions__link">
                <i class="bx bx-file"></i>
                <span>Políticas de entrega<br />producto/servicio</span>
              </a>
            </div>

            <!-- Social Links -->
            <div class="footer-socials d-flex">
              <a href="#" class="footer-socials__link"
                ><i class="bx bxl-tiktok"></i
              ></a>
              <a href="#" class="footer-socials__link"
                ><i class="bx bxl-instagram"></i
              ></a>
              <a
                href="#"
                class="footer-socials__link d-flex align-items-center"
              >
                <!-- Icons -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z"
                  />
                </svg>
              </a>
              <a href="#" class="footer-socials__link"
                ><i class="bx bxl-facebook-circle"></i
              ></a>
              <a href="#" class="footer-socials__link"
                ><i class="bx bxl-youtube"></i
              ></a>
            </div>
          </div>
        </div>
      </div>
    </footer>

    <!-- details modal -->
    <div
      class="modal fade modal-publish"
      id="modalDetallePrototipo"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content modal-publish__content">
          <div class="modal-header modal-publish__header">
            <h5 class="modal-publish__title" id="modalProtoTitulo">
              Detalles del Prototipo
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
              <div class="proto-detail-info">
                <div class="proto-detail-info__media">
                  <img
                    src="../assets/svg/logo.svg"
                    id="modalProtoImg"
                    alt="Prototipo"
                    class="proto-detail-info__img"
                  />
                </div>

                <div
                  class="d-flex justify-content-between align-items-center mt-3 pb-2 border-bottom"
                >
                  <div>
                    <span class="text-muted small d-block">Publicado por:</span>
                    <strong class="text-primary fs-6" id="modalProtoOferente"
                      >Matrícula</strong
                    >
                  </div>
                  <div class="prototype-card__rating">
                    <i class="bx bxs-star prototype-card__star-icon fs-5"></i>
                    <span
                      class="prototype-card__score fs-6"
                      id="modalProtoScore"
                      >5.0</span
                    >
                  </div>
                </div>

                <div
                  class="prototype-card__tags mt-3"
                  id="modalProtoTags"
                ></div>

                <div class="mt-3">
                  <h6 class="fw-bold mb-1">Descripción del Prototipo</h6>
                  <p class="text-muted small lh-sm" id="modalProtoDescLarga">
                    Cargando descripción...
                  </p>
                </div>
              </div>

              <div class="proto-detail-action p-3 bg-light rounded-3">
                <h6 class="fw-bold mb-2 text-primary">Solicitar o Ofertar</h6>
                <p class="text-muted small mb-3">
                  Selecciona la modalidad deseada para iniciar la transacción.
                </p>

                <div
                  class="nav nav-pills nav-fill mb-3 gap-1"
                  id="pills-tab-solicitud"
                  role="tablist"
                >
                  <button
                    class="nav-link btn-sm active"
                    id="pill-prestamo-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pill-prestamo"
                    type="button"
                    style="display: none"
                  >
                    Préstamo
                  </button>
                  <button
                    class="nav-link btn-sm"
                    id="pill-intercambio-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pill-intercambio"
                    type="button"
                    style="display: none"
                  >
                    Intercambio
                  </button>
                  <button
                    class="nav-link btn-sm"
                    id="pill-donacion-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pill-donacion"
                    type="button"
                    style="display: none"
                  >
                    Donación
                  </button>
                </div>

                <div class="tab-content" id="pills-tabContent">
                  <div
                    class="tab-pane fade show active"
                    id="pill-prestamo"
                    role="tabpanel"
                  >
                    <form
                      id="formSolicitudPrestamo"
                      class="d-flex flex-column gap-2"
                    >
                      <div>
                        <label class="form-label small fw-bold mb-1"
                          >Días de Préstamo (Mín. 1 - Máx. 20) *</label
                        >
                        <input
                          type="number"
                          id="solDiasPrestamo"
                          class="form-control form-control-sm"
                          min="1"
                          max="20"
                          value="3"
                          required
                        />
                      </div>
                      <div>
                        <label class="form-label small fw-bold mb-1"
                          >Mensaje o Motivo *</label
                        >
                        <textarea
                          id="solMsgPrestamo"
                          class="form-control form-control-sm"
                          rows="3"
                          placeholder="Explica brevemente para qué proyecto o práctica necesitas el material..."
                          maxlength="256"
                          required
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        class="btn auth-btn btn-sm w-100 mt-2"
                      >
                        <i class="bx bx-send me-1"></i> Enviar Solicitud de
                        Préstamo
                      </button>
                    </form>
                  </div>

                  <div
                    class="tab-pane fade"
                    id="pill-intercambio"
                    role="tabpanel"
                  >
                    <form
                      id="formSolicitudIntercambio"
                      class="d-flex flex-column gap-2"
                    >
                      <div>
                        <label class="form-label small fw-bold mb-1"
                          >Artículo que Ofreces *</label
                        >
                        <input
                          type="text"
                          id="solTituloOferta"
                          class="form-control form-control-sm"
                          placeholder="Ej. Cautín digital Weller 60W"
                          maxlength="100"
                          required
                        />
                      </div>
                      <div>
                        <label class="form-label small fw-bold mb-1"
                          >Fotografía del Artículo *</label
                        >
                        <div class="drag-drop-zone p-2" id="dragDropZoneOferta">
                          <input
                            type="file"
                            id="solImagenOfertaFile"
                            class="drag-drop-zone__input"
                            accept="image/png, image/jpeg, image/jpg, image/webp"
                            required
                          />
                          <p
                            class="drag-drop-zone__text mb-0 small"
                            id="dragDropOfertaText"
                          >
                            Haz clic o arrastra la foto de tu artículo
                          </p>
                        </div>
                      </div>
                      <div>
                        <label class="form-label small fw-bold mb-1"
                          >Mensaje para el Dueño *</label
                        >
                        <textarea
                          id="solMsgIntercambio"
                          class="form-control form-control-sm"
                          rows="2"
                          placeholder="Describe las condiciones de tu artículo..."
                          maxlength="256"
                          required
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        class="btn auth-btn btn-sm w-100 mt-2"
                      >
                        <i class="bx bx-transfer-alt me-1"></i> Proponer
                        Intercambio
                      </button>
                    </form>
                  </div>

                  <div class="tab-pane fade" id="pill-donacion" role="tabpanel">
                    <form
                      id="formSolicitudDonacion"
                      class="d-flex flex-column gap-2"
                    >
                      <div>
                        <label class="form-label small fw-bold mb-1"
                          >Justificación o Motivo *</label
                        >
                        <textarea
                          id="solMsgDonacion"
                          class="form-control form-control-sm"
                          rows="4"
                          placeholder="Cuéntale al donador por qué te sería de gran ayuda recibir este material..."
                          maxlength="256"
                          required
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        class="btn auth-btn btn-sm w-100 mt-2"
                      >
                        <i class="bx bx-gift me-1"></i> Solicitar Donación
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <script src="../js/service/cards.js"></script>
    <script src="../js/ui/prototipo-detalle-ui.js"></script>
    <script src="../js/main.js"></script>
    <script src="../js/service/api.js"></script>
  </body>
</html>
