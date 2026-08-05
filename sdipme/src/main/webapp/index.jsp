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
            <a href="#" class="nav-menu__link">
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
              href="#"
              class="btn-primary animate__animated animate__fadeInUp animate__delay-2s"
            >
              Buscar Prototipos
            </a>
          </div>
        </div>
      </section>
    </hero>

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

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <script src="js/components/hero.js"></script>
    <script src="js/main.js"></script>
    <script src="js/api.js"></script>
  </body>
</html>
