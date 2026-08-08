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
    <title>SDIPME-Registro</title>

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
    <main
      class="container d-flex flex-column justify-content-center align-items-center min-vh-100 py-5"
    >
      <!--Logo -->
      <div class="mb-4 text-center">
        <img
          src="../assets/images/Logotipo-UTEZ.png"
          alt="Logo UTEZ"
          class="auth-logo"
        />
      </div>

      <!-- Form Card -->
      <div class="auth-card auth-card--wide p-4">
        <h1 class="auth-card__title mb-4">Crear cuenta</h1>

        <form id="form-register">
          <div class="row mb-3">
            <div class="col-md-6 mb-3 mb-md-0">
              <label for="nombre" class="auth-label">Nombre(s)</label>
              <input
                type="text"
                id="nombre"
                class="form-control auth-input"
                placeholder="Tu nombre"
                required
              />
            </div>
            <div class="col-md-6">
              <label for="apellidos" class="auth-label">Apellidos</label>
              <input
                type="text"
                id="apellidos"
                class="form-control auth-input"
                placeholder="Tus apellidos"
                required
              />
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-6 mb-3 mb-md-0">
              <label for="telefono" class="auth-label">Teléfono Celular</label>
              <input
                type="tel"
                id="telefono"
                class="form-control auth-input"
                placeholder="10 dígitos"
                pattern="[0-9]{10}"
                maxlength="10"
                required
              />
            </div>
            <div class="col-md-6">
              <label for="idCarrera" class="auth-label">Carrera</label>
              <select id="idCarrera" class="form-control auth-input" required>
                <option value="" disabled selected>
                  Selecciona tu carrera...
                </option>
                <option value="1">
                  Desarrollo de Software Multiplataforma
                </option>
                <option value="2">Infraestructura de Redes Digitales</option>
                <option value="3">Mantenimiento Industrial</option>
                <option value="4">Mecatrónica</option>
              </select>
            </div>
          </div>
          <!-- Section: Academic Data -->
          <h2 class="auth-section-title">Datos Académicos</h2>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="matricula" class="auth-label">Matrícula</label>
              <input
                type="text"
                id="matricula"
                class="form-control auth-input"
                placeholder="Ej. 20243..."
                required
              />
            </div>
            <div class="col-md-6 mb-3">
              <label for="correo" class="auth-label"
                >Correo Institucional</label
              >
              <input
                type="email"
                id="correo"
                class="form-control auth-input"
                placeholder="ejemplo@utez.edu.mx"
                pattern="^[a-zA-Z0-9._%+-]+@utez\.edu\.mx$"
                title="Debes ingresar un correo que termine en @utez.edu.mx"
                required
              />
              <div class="auth-hint">Solo se admiten correos @utez.edu.mx</div>
            </div>
          </div>

          <!-- Section: Security -->
          <h2 class="auth-section-title">Seguridad</h2>
          <div class="row mb-4">
            <div class="col-md-6 mb-3 mb-md-0">
              <label for="password" class="auth-label">Contraseña</label>
              <input
                type="password"
                id="password"
                class="form-control auth-input"
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>
            <div class="col-md-6">
              <label for="confirmPassword" class="auth-label"
                >Confirmar Contraseña</label
              >
              <input
                type="password"
                id="confirmPassword"
                class="form-control auth-input"
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            id="btn-register"
            class="btn auth-btn w-100 mt-2"
          >
            Crear Cuenta
          </button>
        </form>

        <!-- Card Footer -->
        <div class="text-center mt-4 auth-footer">
          <span class="text-muted">¿Ya tienes cuenta?</span>
          <a href="login.jsp" class="auth-link auth-link--bold"
            >Inicia sesión aquí</a
          >
        </div>
      </div>
    </main>
    <script src="../js/main.js"></script>
    <script src="../js/service/api.js"></script>
  </body>
</html>
