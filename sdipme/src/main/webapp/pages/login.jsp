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
    <title>SDIPME-Inicio de sesion</title>

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

    <!-- ITCSS Architecture -->
    <link rel="stylesheet" href="../css/base.css" />
    <link rel="stylesheet" href="../css/layout.css" />
    <link rel="stylesheet" href="../css/components.css" />
  </head>
  <body class="auth-layout">
    <!-- Perfect vertical and horizontal centering -->
    <main
      class="container d-flex flex-column justify-content-center align-items-center vh-100"
    >
      <!-- Logo -->
      <div class="mb-4 text-center">
        <img
          src="../assets/images/Logotipo-UTEZ.png"
          alt="Logo UTEZ"
          class="auth-logo"
        />
      </div>

      <!-- Form Card -->
      <div class="auth-card p-4">
        <h1 class="auth-card__title mb-4">Inicio de sesión</h1>

        <form id="form-login">
          <!-- Username Input -->
          <div class="mb-3">
            <input
              type="text"
              id="usuario"
              class="form-control auth-input"
              placeholder="Tu usuario"
              autocomplete="username"
              required
            />
          </div>

          <!-- Password Input -->
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

          <!-- Bottom Options (Remember me & Forgot password) -->
          <div
            class="d-flex justify-content-between align-items-center mb-4 auth-options"
          >
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="recuerdame" />
              <label class="form-check-label text-muted" for="recuerdame">
                Recuérdame
              </label>
            </div>
            <a href="#" class="auth-link">¿Olvidaste tu contraseña?</a>
          </div>

          <!-- Submit Button -->
          <button type="submit" id="btn-login" class="btn auth-btn w-100">
            Iniciar
          </button>
        </form>

        <!-- Card Footer -->
        <div class="text-center mt-4 auth-footer">
          <span class="text-muted">¿No tienes cuenta?</span>
          <a href="registro.jsp" class="auth-link">Crear cuenta aquí</a>
        </div>
      </div>
    </main>
    <script src="../js/main.js"></script>
    <script src="../js/service/api.js"></script>
  </body>
</html>
