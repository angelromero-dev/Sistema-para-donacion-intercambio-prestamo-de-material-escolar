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

    <link rel="shortcut icon" href="assets/svg/logo.svg" type="image/x-icon" />
    <title>SDIPME</title>

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
    <link rel="stylesheet" href="css/base.css" />
    <link rel="stylesheet" href="css/layout.css" />
    <link rel="stylesheet" href="css/components.css" />
    <link rel="stylesheet" href="css/slider.css" />
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
            src="assets/images/logo-light-txt.png"
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
            <a href="pages/login.jsp" class="nav-menu__link">
              <i class="bx bx-log-in"></i> Iniciar Sesión
            </a>
          </li>
          <li class="nav-menu__item">
            <a href="pages/registro.jsp" class="nav-menu__link">
              <i class="bx bx-user-plus"></i> Registrarse
            </a>
          </li>
          <li class="nav-menu__item">
            <a href="#" class="nav-menu__link" data-bs-toggle="modal" data-bs-target="#modalCorreo">
              <i class="bx bx-envelope"></i> Contacto
            </a>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Hero container -->
    <hero>
      <section class="l-hero animate__animated animate__fadeIn" id="smart-hero">
        <div class="hero-bg-mask"></div>

        <div class="l-container">
          <div
            class="hero-content d-flex flex-column align-items-center text-center"
          >
            <h1
              class="hero-content__title animate__animated animate__fadeInUp animate__delay-1s"
            >
              Intercambia Prototipos<br />Universitarios
            </h1>

            <p
              class="hero-content__text animate__animated animate__fadeInUp animate__delay-1s"
            >
              Plataforma exclusiva de la UTEZ para la gestión, préstamo y
              donación de prototipos.
            </p>

            <a
              href="/pages/login.jsp"
              class="btn-primary animate__animated animate__fadeInUp animate__delay-2s"
            >
              Buscar Prototipos
            </a>
          </div>
        </div>
      </section>
    </hero>

    </hero>

</hero>

    <!-- Slider Interactivo: Catálogo -->
    <section class="slider-curved-section animate__animated animate__fadeIn">
      <div class="divisions-slider">
        <div class="divisions-track" id="divisionsTrack">
          
          <!-- T1: División DATID -->
          <div class="division-card">
            <span class="division-badge">División</span>
            <div class="division-img-wrapper">
              <img src="assets/images/logo-datid.png" alt="DATID" onerror="this.src='assets/images/logo-light-txt.png'">
            </div>
            <div class="division-header"><h3>DATID</h3></div>
            <div class="division-tags">Tecnologías de la Información e innovación digital</div>
          </div>

          <!-- T2: División DAMI -->
          <div class="division-card">
            <span class="division-badge">División</span>
            <div class="division-img-wrapper">
              <img src="assets/images/logo-dami.png" alt="DAMI" onerror="this.src='assets/images/logo-light-txt.png'">
            </div>
            <div class="division-header"><h3>DAMI</h3></div>
            <div class="division-tags">Ing. Industrial</div>
          </div>

          <!-- T3: Carrera Mecatrónica -->
          <div class="division-card">
            <span class="division-badge" style="background: var(--color-brand-secondary);">Carrera</span>
            <div class="division-img-wrapper">
              <img src="assets/images/carrera-mecatronica.png" alt="Mecatrónica" onerror="this.src='assets/images/logo-light-txt.png'">
            </div>
            <div class="division-header"><h3>Mecatrónica</h3></div>
            <div class="division-tags">Automatización e Instalaciones Electromecánicas</div>
          </div>

          <!-- T4: Categoría Electrónica -->
          <div class="division-card">
            <span class="division-badge" style="background: var(--color-brand-tertiary);">Categoría</span>
            <div class="division-img-wrapper category-icon-wrapper">
              <i class='bx bx-microchip'></i>
            </div>
            <div class="division-header"><h3>Electrónica y Cómputo</h3></div>
            <div class="division-tags">Componentes, placas, arduinos</div>
          </div>

          <!-- T5: División DACEA -->
          <div class="division-card">
            <span class="division-badge">División</span>
            <div class="division-img-wrapper">
              <img src="assets/images/logo-dacea.png" alt="DACEA" onerror="this.src='assets/images/logo-light-txt.png'">
            </div>
            <div class="division-header"><h3>DACEA</h3></div>
            <div class="division-tags">Económica - Administraticion</div>
          </div>

          <!-- T6: Carrera Redes -->
          <div class="division-card">
            <span class="division-badge" style="background: var(--color-brand-secondary);">Carrera</span>
            <div class="division-img-wrapper">
              <img src="assets/images/carrera-redes.png" alt="Redes" onerror="this.src='assets/images/logo-light-txt.png'">
            </div>
            <div class="division-header"><h3>Infraestructura de Redes Digitales</h3></div>
            <div class="division-tags">Infraestructura de Redes Digitales</div>
          </div>

          <!-- T7: Categoría Herramientas -->
          <div class="division-card">
            <span class="division-badge" style="background: var(--color-brand-tertiary);">Categoría</span>
            <div class="division-img-wrapper category-icon-wrapper">
              <i class='bx bx-wrench'></i>
            </div>
            <div class="division-header"><h3>Herramientas y Materiales</h3></div>
            <div class="division-tags">Cautines, pinzas, metales</div>
          </div>

          <!-- T8: División DATEFI -->
          <div class="division-card">
            <span class="division-badge">División</span>
            <div class="division-img-wrapper">
              <img src="assets/images/logo-datefi.png" alt="DATEFI" onerror="this.src='assets/images/logo-light-txt.png'">
            </div>
            <div class="division-header"><h3>DATEFI</h3></div>
            <div class="division-tags">Terapia Física</div>
          </div>

          <!-- T9: Carrera Terapia -->
          <div class="division-card">
            <span class="division-badge" style="background: var(--color-brand-secondary);">Carrera</span>
            <div class="division-img-wrapper">
              <img src="assets/images/carrera-terapia.png" alt="Terapia Física" onerror="this.src='assets/images/logo-light-txt.png'">
            </div>
            <div class="division-header"><h3>Terapia Física</h3></div>
            <div class="division-tags">Rehabilitación Funcional y Salud</div>
          </div>

          <!-- T10: Categoría Salud -->
          <div class="division-card">
            <span class="division-badge" style="background: var(--color-brand-tertiary);">Categoría</span>
            <div class="division-img-wrapper category-icon-wrapper">
              <i class='bx bx-first-aid'></i>
            </div>
            <div class="division-header"><h3>Salud</h3></div>
            <div class="division-tags">Modelos, instrumental, vendajes</div>
          </div>

          <!-- T11: Carrera Software -->
          <div class="division-card">
            <span class="division-badge" style="background: var(--color-brand-secondary);">Carrera</span>
            <div class="division-img-wrapper">
              <img src="assets/images/carrera-software.png" alt="Software" onerror="this.src='assets/images/logo-light-txt.png'">
            </div>
            <div class="division-header"><h3>Des. Software</h3></div>
            <div class="division-tags">Desarrolo de software multiplataforma</div>
          </div>

          <!-- T12: Categoría Software -->
          <div class="division-card">
            <span class="division-badge" style="background: var(--color-brand-tertiary);">Categoría</span>
            <div class="division-img-wrapper category-icon-wrapper">
              <i class='bx bx-cloud-download'></i>
            </div>
            <div class="division-header"><h3>Software</h3></div>
            <div class="division-tags">Scripts, programas, código</div>
          </div>

          <!-- T13: Carrera Negocios -->
          <div class="division-card">
            <span class="division-badge" style="background: var(--color-brand-secondary);">Carrera</span>
            <div class="division-img-wrapper">
              <img src="assets/images/carrera-negocios.png" alt="Negocios" onerror="this.src='assets/images/logo-light-txt.png'">
            </div>
            <div class="division-header"><h3>Mercadotecnia</h3></div>
            <div class="division-tags">Estrategias de Mercado y Comercialización</div>
          </div>

          <!-- T14: Categoría Papelería -->
          <div class="division-card">
            <span class="division-badge" style="background: var(--color-brand-tertiary);">Categoría</span>
            <div class="division-img-wrapper category-icon-wrapper">
              <i class='bx bx-edit-alt'></i>
            </div>
            <div class="division-header"><h3>Papelería y Útiles</h3></div>
            <div class="division-tags">Material gráfico, libretas, reglas</div>
          </div>

          <!-- T15: Categoría Proyectos -->
          <div class="division-card">
            <span class="division-badge" style="background: var(--color-brand-tertiary);">Categoría</span>
            <div class="division-img-wrapper category-icon-wrapper">
              <i class='bx bx-bulb'></i>
            </div>
            <div class="division-header"><h3>Proyectos Escolares</h3></div>
            <div class="division-tags">Maquetas, prototipos físicos</div>
          </div>

        </div>
      </div>
    </section>

        <!-- Sección: Cómo Funciona -->
    <section class="l-container">
      <div class="how-it-works-wrapper animate__animated animate__fadeInUp">
        <div class="how-it-works__image">
          <img
            src="./assets/images/ComoFuncionaImg.avif"
            alt="Equipamiento y herramientas"
            loading="lazy"
          />
          <div class="how-it-works__badge">
            <i class="bx bx-recycle"></i>
            <span>Economía Circular</span>
          </div>
        </div>
        <div class="how-it-works__content">
          <h2 class="how-it-works__title">
            Intercambio inteligente en 3 pasos
          </h2>
          <p class="how-it-works__text">
            Olvídate de gastar en material que solo usarás un cuatrimestre.
            Conecta con otros estudiantes para dar una segunda vida a las
            herramientas y componentes escolares.
          </p>

          <div class="step-list">
            <div class="step-item">
              <div class="step-icon"><i class="bx bx-search-alt"></i></div>
              <div class="step-info">
                <h4>1. Explora el catálogo</h4>
                <p>
                  Filtra por carrera o categoría y encuentra los materiales
                  que necesitas.
                </p>
              </div>
            </div>
            <div class="step-item">
              <div class="step-icon"><i class="bx bx-paper-plane"></i></div>
              <div class="step-info">
                <h4>2. Envía tu propuesta</h4>
                <p>
                  Solicita un préstamo por los días que requieras, propon un
                  intercambio o pide una donación.
                </p>
              </div>
            </div>
            <div class="step-item">
              <div class="step-icon"><i class="bx bx-check-shield"></i></div>
              <div class="step-info">
                <h4>3. Conecta en el campus</h4>
                <p>
                  Si el dueño acepta, el sistema revelará los datos de contacto
                  para que acuerden la entrega en las instalaciones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

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
            <div class="footer-actions d-flex" style="gap: 5rem; justify-content: center;">
              <a href="#" class="footer-actions__link" data-bs-toggle="modal" data-bs-target="#modalSoporte">
                <i class="bx bx-support"></i>
                <span>Soporte y Ayuda</span>
              </a>
              <a href="#" class="footer-actions__link" data-bs-toggle="modal" data-bs-target="#modalCorreo">
                <i class="bx bx-envelope"></i>
                <span>Correo de Contacto</span>
              </a>
            </div>

            <!-- Social Links -->
            <div class="footer-socials d-flex">
              <a href="https://www.tiktok.com/@utezoficial" class="footer-socials__link"
                ><i class="bx bxl-tiktok"></i
              ></a>
              <a href="https://www.instagram.com/utezoficial/" class="footer-socials__link"
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
              <a href="https://www.facebook.com/utezoficial/" class="footer-socials__link"
                ><i class="bx bxl-facebook-circle"></i
              ></a>
              <a href="https://www.youtube.com/@utezoficial" class="footer-socials__link"
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
              Para reportar fallas en el sistema, publicaciones malintencionadas, conflictos con algún usuario o cualquier otro problema técnico, comunícate con nosotros:
            </p>
            <a href="mailto:support@sdipme.online" class="fw-bold text-primary text-decoration-none" style="font-size: 1.1rem;">support@sdipme.online</a>
            <button type="button" class="btn btn-light btn-sm w-100 mt-4" data-bs-dismiss="modal">Entendido</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Correo -->
    <div class="modal fade" id="modalCorreo" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content border-0 shadow-lg">
          <div class="modal-body text-center p-4">
            <i class="bx bx-envelope text-primary" style="font-size: 3.5rem"></i>
            <h5 class="fw-bold mt-2">Contacto Oficial</h5>
            <p class="text-muted small">
              Para dudas generales, sugerencias, convenios o consultas de carácter administrativo, escríbenos a nuestro correo principal:
            </p>
            <a href="mailto:contacto@sdipme.online" class="fw-bold text-primary text-decoration-none" style="font-size: 1.1rem;">contacto@sdipme.online</a>
            <button type="button" class="btn btn-light btn-sm w-100 mt-4" data-bs-dismiss="modal">Entendido</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <script src="js/components/hero.js"></script>
    <script src="js/main.js"></script>
    <script src="js/ui/slider-ui.js"></script>
    <script src="js/api.js"></script>
  </body>
</html>
