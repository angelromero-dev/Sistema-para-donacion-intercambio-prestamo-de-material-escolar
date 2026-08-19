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
      content="Plataforma institucional de la UTEZ para préstamo, intercambio y donación de Materiales."
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
          <a
            href="https://www.tiktok.com/@utezoficial"
            class="header-socials__link"
            ><i class="bx bxl-tiktok"></i
          ></a>
          <a
            href="https://www.instagram.com/utezoficial/"
            class="header-socials__link"
            ><i class="bx bxl-instagram"></i
          ></a>
          <a
            href="https://x.com/utezoficial"
            class="header-socials__link d-flex align-items-center"
          >
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
          <a
            href="https://www.facebook.com/utezoficial/"
            class="header-socials__link"
            ><i class="bx bxl-facebook-circle"></i
          ></a>
          <a
            href="https://www.youtube.com/@utezoficial"
            class="header-socials__link"
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
            <a href="mis-ofertas.jsp" class="nav-menu__link">
              Mis publicaciones
            </a>
          </li>
          <li class="nav-menu__item">
            <a href="mis-solicitudes.jsp" class="nav-menu__link">
              Mis solicitudes
            </a>
          </li>
          <li class="nav-menu__item">
            <a href="configuracion.jsp" class="nav-menu__link">
              Configuración
            </a>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Hero de Bienvenida -->
    <hero>
      <section
        class="l-hero animate__animated animate__fadeIn"
        id="dashboard-hero"
      >
        <div class="hero-bg-mask"></div>
        <div class="l-container">
          <div
            class="hero-content d-flex flex-column align-items-start text-left"
          >
            <h1 class="hero-content__title animate__animated animate__fadeInUp">
              ¡Bienvenido!
            </h1>
            <p
              class="hero-content__text animate__animated animate__fadeInUp animate__delay-1s"
            >
              Explora el catálogo de publicaciones para encontrar lo que
              necesitas o dale una segunda vida a los materiales que ya no uses.
            </p>
          </div>
        </div>
      </section>
    </hero>

    <!-- Contenedores de Incentivo -->
    <section class="l-container">
      <div class="dashboard-incentives">
        <!-- Tarjeta 1: Publicar -->
        <div class="incentive-card">
          <i class="bx bx-layer-plus incentive-deco-icon"></i>
          <div class="incentive-card__content">
            <h3 class="incentive-card__title">
              <i class="bx bx-rocket"></i> Dale vida a tu material
            </h3>
            <p class="incentive-card__text">
              ¿Tienes componentes, libros o herramientas que ya no usas?
              Publícalos en el catálogo. Ayuda a otros compañeros donando o
              pidiendo un intercambio justo.
            </p>
            <a href="mis-ofertas.jsp" class="incentive-card__action">
              <i class="bx bx-plus-circle"></i> Publicar prototipo
            </a>
          </div>
        </div>

        <!-- Tarjeta 2: Notificaciones y Correos -->
        <div class="incentive-card">
          <i class="bx bx-bell incentive-deco-icon"></i>
          <div class="incentive-card__content">
            <h3 class="incentive-card__title">
              <i class="bx bx-envelope-open"></i> Revisa tus respuestas
            </h3>
            <p class="incentive-card__text mb-0">
              Mantente al tanto de tus peticiones. Recuerda que el sistema
              también te avisa directamente a tu bandeja institucional.
            </p>

            <!-- Captura de correo simulada -->
            <div class="email-mockup">
              <div class="email-mockup__icon">
                <i class="bx bx-check-shield"></i>
              </div>
              <div class="email-mockup__lines">
                <div></div>
                <div></div>
              </div>
              <span
                style="
                  margin-left: auto;
                  font-size: 0.7rem;
                  font-weight: 700;
                  color: #128970;
                "
                >¡Aprobada!</span
              >
            </div>

            <a href="mis-solicitudes.jsp" class="incentive-card__action mt-3">
              <i class="bx bx-history"></i> Ver mis solicitudes
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Searcher and Filters -->
    <section class="l-container mt-4 mb-4">
      <div class="smart-dashboard-toolbar animate__animated animate__fadeInUp">
        <!-- Search Input -->
        <div class="smart-search-box">
          <i class="bx bx-search search-icon"></i>
          <input
            type="text"
            id="searchInput"
            class="smart-search-box__input"
            placeholder="Buscar material por título o matrícula..."
            autocomplete="off"
          />
          <div class="search-focus-indicator"></div>
        </div>

        <!-- Dynamic Filter Tags -->
        <div class="smart-filter-scroll">
          <div class="smart-filter-tags" id="filterContainer">
            <button class="smart-tag smart-tag--active" data-tag="all">
              <i class="bx bx-grid-alt"></i> Todos
            </button>
            <!-- JS inyectará el resto aquí manteniendo las clases smart-tag -->
          </div>
        </div>
      </div>
    </section>

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
            <div
              class="footer-actions d-flex"
              style="gap: 5rem; justify-content: center"
            >
              <a
                href="#"
                class="footer-actions__link"
                data-bs-toggle="modal"
                data-bs-target="#modalSoporte"
              >
                <i class="bx bx-support"></i>
                <span>Soporte y Ayuda</span>
              </a>
              <a
                href="#"
                class="footer-actions__link"
                data-bs-toggle="modal"
                data-bs-target="#modalCorreo"
              >
                <i class="bx bx-envelope"></i>
                <span>Correo de Contacto</span>
              </a>
            </div>

            <!-- Social Links -->
            <div class="footer-socials d-flex">
              <a
                href="https://www.tiktok.com/@utezoficial"
                class="footer-socials__link"
                ><i class="bx bxl-tiktok"></i
              ></a>
              <a
                href="https://www.instagram.com/utezoficial/"
                class="footer-socials__link"
                ><i class="bx bxl-instagram"></i
              ></a>
              <a
                href="https://x.com/utezoficial"
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
              <a
                href="https://www.facebook.com/utezoficial/"
                class="footer-socials__link"
                ><i class="bx bxl-facebook-circle"></i
              ></a>
              <a
                href="https://www.youtube.com/@utezoficial"
                class="footer-socials__link"
                ><i class="bx bxl-youtube"></i
              ></a>
            </div>
          </div>
        </div>
      </div>
    </footer>

    <!-- Modal Soporte -->
    <div class="modal fade" id="modalSoporte" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content border-0 shadow-lg">
          <div class="modal-body text-center p-4">
            <i class="bx bx-support text-primary" style="font-size: 3.5rem"></i>
            <h5 class="fw-bold mt-2">Soporte y Ayuda</h5>
            <p class="text-muted small">
              Para reportar fallas en el sistema, publicaciones
              malintencionadas, conflictos con algún usuario o cualquier otro
              problema técnico, comunícate con nosotros:
            </p>
            <a
              href="mailto:support@sdipme.online"
              class="fw-bold text-primary text-decoration-none"
              style="font-size: 1.1rem"
              >support@sdipme.online</a
            >
            <button
              type="button"
              class="btn btn-light btn-sm w-100 mt-4"
              data-bs-dismiss="modal"
            >
              Entendido
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Correo -->
    <div class="modal fade" id="modalCorreo" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content border-0 shadow-lg">
          <div class="modal-body text-center p-4">
            <i
              class="bx bx-envelope text-primary"
              style="font-size: 3.5rem"
            ></i>
            <h5 class="fw-bold mt-2">Contacto Oficial</h5>
            <p class="text-muted small">
              Para dudas generales, sugerencias, convenios o consultas de
              carácter administrativo, escríbenos a nuestro correo principal:
            </p>
            <a
              href="mailto:contacto@sdipme.online"
              class="fw-bold text-primary text-decoration-none"
              style="font-size: 1.1rem"
              >contacto@sdipme.online</a
            >
            <button
              type="button"
              class="btn btn-light btn-sm w-100 mt-4"
              data-bs-dismiss="modal"
            >
              Entendido
            </button>
          </div>
        </div>
      </div>
    </div>

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
              Detalles del
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
                    src="../assets/images/NoImage.png"
                    id="modalProtoImg"
                    alt="Prototipo"
                    class="proto-detail-info__img"
                  />
                </div>

                <div class="proto-offerer-box mt-3 mb-2">
                  <div class="proto-offerer-avatar">
                    <img
                      id="modalProtoFoto"
                      src="../assets/images/NoImage.png"
                      alt=""
                    />
                  </div>
                  <div class="proto-offerer-info">
                    <span class="text-muted small d-block lh-1 mb-1"
                      >Ofertante:</span
                    >
                    <strong
                      class="text-primary fs-6 d-block lh-1"
                      id="modalProtoOferente"
                      >Matrícula</strong
                    >
                    <span
                      class="text-muted small d-block mt-1"
                      id="modalProtoCarrera"
                      style="font-size: 0.75rem"
                      >Carrera</span
                    >
                  </div>
                  <div class="proto-offerer-rating">
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
                  <h6 class="fw-bold mb-1">Descripción del Material</h6>
                  <p class="text-muted small lh-sm" id="modalProtoDescLarga">
                    Cargando descripción...
                  </p>
                </div>
              </div>

              <div
                class="proto-detail-action p-3 bg-light rounded-3 d-flex flex-column"
              >
                <h6 class="fw-bold mb-2 text-primary">Solicitar o Ofertar</h6>
                <p class="text-muted small mb-3">
                  Selecciona la modalidad para ver los requisitos.
                </p>

                <div
                  class="notif-tabs mb-3"
                  id="tabs-solicitud"
                  style="border-bottom: 2px solid var(--color-border-base)"
                >
                  <button class="notif-tab active" data-target="pill-prestamo">
                    Préstamo
                  </button>
                  <button class="notif-tab" data-target="pill-intercambio">
                    Intercambio
                  </button>
                  <button class="notif-tab" data-target="pill-donacion">
                    Donación
                  </button>
                </div>

                <div id="pills-tabContent">
                  <div
                    class="tab-pane-solicitud"
                    id="pill-prestamo"
                    style="display: block"
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
                          placeholder="Explica brevemente para qué necesitas el material..."
                          maxlength="256"
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        class="btn auth-btn btn-sm w-100 mt-2"
                      >
                        <i class="bx bx-send me-1"></i> Enviar Solicitud
                      </button>
                    </form>
                    <div class="form-disabled-msg mt-2">
                      <i class="bx bx-x-circle"></i> El dueño no habilitó
                      préstamos.
                    </div>
                  </div>

                  <div
                    class="tab-pane-solicitud"
                    id="pill-intercambio"
                    style="display: none"
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
                          />
                          <p
                            class="drag-drop-zone__text mb-0 small"
                            id="dragDropOfertaText"
                          >
                            Arrastra la foto de tu artículo
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
                          placeholder="Describe tu artículo..."
                          maxlength="256"
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
                    <div class="form-disabled-msg mt-2">
                      <i class="bx bx-x-circle"></i> El dueño no aceptará
                      intercambios.
                    </div>
                  </div>

                  <div
                    class="tab-pane-solicitud"
                    id="pill-donacion"
                    style="display: none"
                  >
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
                          placeholder="¿Por qué te sería de gran ayuda recibir este material?"
                          maxlength="256"
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        class="btn auth-btn btn-sm w-100 mt-2"
                      >
                        <i class="bx bx-gift me-1"></i> Solicitar Donación
                      </button>
                    </form>
                    <div class="form-disabled-msg mt-2">
                      <i class="bx bx-x-circle"></i> Este material no está en
                      donación.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="modalConfirmSolicitud"
      tabindex="-1"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-centered modal-sm"
        style="z-index: 1060"
      >
        <div class="modal-content border-0 shadow">
          <div class="modal-body text-center p-4">
            <i
              class="bx bx-paper-plane text-primary"
              style="font-size: 3.5rem"
            ></i>
            <h5 class="fw-bold mt-2">¿Enviar solicitud?</h5>
            <p class="text-muted small">
              El dueño del material recibirá tu petición y si acepta, podra ver
              tus datos de contacto.
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
                id="btnConfirmSendSolicitud"
              >
                Sí, enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- alert modal -->
    <div
      class="modal fade"
      id="modalYaSolicitado"
      tabindex="-1"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-centered modal-sm"
        style="z-index: 1070"
      >
        <div class="modal-content border-0 shadow">
          <div class="modal-body text-center p-4">
            <i
              class="bx bx-time-five text-warning"
              style="font-size: 3.5rem"
            ></i>
            <h5 class="fw-bold mt-2">En espera</h5>
            <p class="text-muted small">
              Ya solicitaste este material. Debes esperar a que el dueño
              responda tu petición en la sección "Mis Solicitudes".
            </p>
            <button
              type="button"
              class="btn btn-warning btn-sm w-100 mt-2 text-dark"
              data-bs-dismiss="modal"
            >
              Entendido
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="modalLimiteAlcanzado"
      tabindex="-1"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-centered modal-sm"
        style="z-index: 1070"
      >
        <div class="modal-content border-0 shadow">
          <div class="modal-body text-center p-4">
            <i
              class="bx bx-stop-circle text-danger"
              style="font-size: 3.5rem"
            ></i>
            <h5 class="fw-bold mt-2">Límite Alcanzado</h5>
            <p class="text-muted small">
              Solo puedes tener hasta 5 solicitudes activas al mismo tiempo para
              no acaparar el catálogo.
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

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <script src="../js/service/cards.js"></script>
    <script src="../js/ui/prototipo-detalle-ui.js"></script>
    <script src="../js/main.js"></script>
    <script src="../js/service/api.js"></script>
    <script src="../js/ui/hero.js"></script>
  </body>
</html>
