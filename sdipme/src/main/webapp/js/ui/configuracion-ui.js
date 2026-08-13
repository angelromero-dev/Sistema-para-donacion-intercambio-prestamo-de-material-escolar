/**
 * configuracion-ui.js
 */

document.addEventListener('DOMContentLoaded', () => {
  const settingsNav = document.getElementById('settingsNav');
  if (!settingsNav) return; // Not on the settings page, skip entirely

  /* ---------------------------------------------------------------- */
  /* Panel switching (Perfil / Seguridad)                             */
  /* ---------------------------------------------------------------- */
  const navLinks = settingsNav.querySelectorAll('.settings-nav__link[data-panel]');
  const panels = document.querySelectorAll('.settings-panel');
  const breadcrumbActive = document.getElementById('breadcrumbActive');
  const pageTitle = document.getElementById('settingsPageTitle');

  const PANEL_META = {
    'panel-perfil': { label: 'Perfil', title: 'Perfil de usuario' },
    'panel-seguridad': { label: 'Seguridad', title: 'Seguridad de la cuenta' },
  };

  function switchPanel(targetId) {
    panels.forEach((panel) => {
      if (panel.id === targetId) {
        panel.style.display = 'flex';
        // Restart the CSS entry animation
        panel.classList.remove('settings-panel');
        void panel.offsetWidth;
        panel.classList.add('settings-panel');
      } else {
        panel.style.display = 'none';
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle(
        'settings-nav__link--active',
        link.dataset.panel === targetId
      );
    });

    const meta = PANEL_META[targetId];
    if (meta) {
      if (breadcrumbActive) breadcrumbActive.textContent = meta.label;
      if (pageTitle) pageTitle.textContent = meta.title;
    }
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', () => switchPanel(link.dataset.panel));
  });

  const privacidadBtn = document.getElementById('btnPrivacidadDatos');
  if (privacidadBtn) {
    privacidadBtn.addEventListener('click', () => {
      showToast('Esta sección estará disponible próximamente.', 'info');
    });
  }

  /* ---------------------------------------------------------------- */
  /* Toast helper (reuses .toast-alert / .toast-alert--* from CSS)    */
  /* ---------------------------------------------------------------- */
  const toastEl = document.getElementById('settingsToast');
  const toastIcon = document.getElementById('settingsToastIcon');
  const toastMsg = document.getElementById('settingsToastMsg');
  let toastTimer = null;

  function showToast(message, type) {
    if (!toastEl) return;
    toastMsg.textContent = message;
    toastEl.classList.remove('toast-alert--success', 'toast-alert--error');

    if (type === 'success') {
      toastEl.classList.add('toast-alert--success');
      toastIcon.className = 'bx bx-check-circle';
    } else if (type === 'error') {
      toastEl.classList.add('toast-alert--error');
      toastIcon.className = 'bx bx-x-circle';
    } else {
      toastIcon.className = 'bx bx-info-circle';
    }

    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 3200);
  }
  // Expose globally so main.js can trigger feedback after API calls
  window.showToast = showToast;

  function openErrorModal(message) {
    const modalEl = document.getElementById('modalErrorGenerico');
    if (!modalEl) return;
    document.getElementById('errorGenericoMensaje').textContent =
      message || 'No pudimos procesar tu solicitud. Intenta de nuevo más tarde.';
    bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }
  window.openErrorModal = openErrorModal;

  /* ---------------------------------------------------------------- */
  /* Validation helpers                                                */
  /* ---------------------------------------------------------------- */

  const NAME_REGEX = /^[A-Za-zÁÉÍÓÚÑÜáéíóúñü]+(?:\s[A-Za-zÁÉÍÓÚÑÜáéíóúñü]+)*$/;
  const JUNK_WORDS = ['asdf', 'qwerty', 'test', 'prueba', 'xxxx', 'nombre', 'sinnombre'];

  function isValidHumanName(value) {
    const trimmed = value.trim();
    if (trimmed.length < 2 || trimmed.length > 40) return false;
    if (!NAME_REGEX.test(trimmed)) return false;
    if (/(.)\1{2,}/i.test(trimmed.replace(/\s/g, ''))) return false; // "aaaa"
    const lower = trimmed.toLowerCase();
    if (JUNK_WORDS.some((word) => lower.includes(word))) return false;
    return true;
  }
  window.isValidHumanName = isValidHumanName;

  function isValidPhone(value) {
    return /^\d{10}$/.test(value.trim());
  }
  window.isValidPhone = isValidPhone;

  function toggleFieldError(inputEl, errorEl, isValid) {
    if (!inputEl) return;
    inputEl.classList.toggle('is-invalid', !isValid);
    if (errorEl) errorEl.classList.toggle('show', !isValid);
    if (!isValid) {
      inputEl.classList.remove('settings-shake');
      void inputEl.offsetWidth;
      inputEl.classList.add('settings-shake');
    }
  }
  window.toggleFieldError = toggleFieldError;

  // Live validation: nombre / apellidos inside the "editar perfil" modal
  const modalNombre = document.getElementById('modalNombre');
  const modalApellidos = document.getElementById('modalApellidos');
  const errorModalNombre = document.getElementById('errorModalNombre');
  const errorModalApellidos = document.getElementById('errorModalApellidos');

  if (modalNombre) {
    modalNombre.addEventListener('input', () => {
      if (modalNombre.value.trim() === '') return;
      toggleFieldError(modalNombre, errorModalNombre, isValidHumanName(modalNombre.value));
    });
  }
  if (modalApellidos) {
    modalApellidos.addEventListener('input', () => {
      if (modalApellidos.value.trim() === '') return;
      toggleFieldError(modalApellidos, errorModalApellidos, isValidHumanName(modalApellidos.value));
    });
  }

  // Live validation: teléfono (numeric only, max 10 digits)
  const telefonoInput = document.getElementById('telefono');
  const errorTelefono = document.getElementById('errorTelefono');
  if (telefonoInput) {
    telefonoInput.addEventListener('input', () => {
      telefonoInput.value = telefonoInput.value.replace(/\D/g, '').slice(0, 10);
      if (telefonoInput.value.length === 0) return;
      toggleFieldError(telefonoInput, errorTelefono, isValidPhone(telefonoInput.value));
    });
  }

  // Live validation: confirmar contraseña + strength meter
  const passwordNueva = document.getElementById('passwordNueva');
  const passwordConfirmar = document.getElementById('passwordConfirmar');
  const errorPasswordConfirmar = document.getElementById('errorPasswordConfirmar');
  const strengthMeter = document.getElementById('strengthMeter');

  function passwordStrength(value) {
    let score = 0;
    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/\d/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;
    return score;
  }

  if (passwordNueva && strengthMeter) {
    passwordNueva.addEventListener('input', () => {
      const score = passwordStrength(passwordNueva.value);
      strengthMeter.classList.remove(
        'settings-strength--weak',
        'settings-strength--medium',
        'settings-strength--strong'
      );
      if (passwordNueva.value.length === 0) return;
      if (score <= 1) strengthMeter.classList.add('settings-strength--weak');
      else if (score <= 3) strengthMeter.classList.add('settings-strength--medium');
      else strengthMeter.classList.add('settings-strength--strong');
    });
  }

  if (passwordConfirmar) {
    passwordConfirmar.addEventListener('input', () => {
      if (passwordConfirmar.value.length === 0) return;
      const matches = passwordConfirmar.value === passwordNueva.value;
      toggleFieldError(passwordConfirmar, errorPasswordConfirmar, matches);
    });
  }

  // Password visibility toggles
  document.querySelectorAll('.settings-password-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.target);
      if (!target) return;
      const icon = btn.querySelector('i');
      const isHidden = target.type === 'password';
      target.type = isHidden ? 'text' : 'password';
      icon.className = isHidden ? 'bx bx-hide' : 'bx bx-show';
    });
  });

  /* ---------------------------------------------------------------- */
  /* Avatar upload (drag & drop, reuses .drag-drop-zone component)    */
  /* ---------------------------------------------------------------- */
  const dropZone = document.getElementById('dragDropZoneAvatar');
  const fileInput = document.getElementById('inputFotoPerfil');
  const avatarPreview = document.getElementById('avatarPreview');
  const avatarPreviewImg = document.getElementById('avatarPreviewImg');
  const avatarPreviewIcon = document.getElementById('avatarPreviewIcon');
  const btnGuardarFoto = document.getElementById('btn-guardar-foto');
  const dragDropFotoText = document.getElementById('dragDropFotoText');

  const MAX_AVATAR_BYTES = 2 * 1024 * 1024; // 2MB
  const ALLOWED_AVATAR_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
  const ALLOWED_AVATAR_EXTENSIONS = /\.(jpe?g|png)$/i;
  let selectedAvatarFile = null;
  function isAllowedImageFile(file) {
    const typeOk = ALLOWED_AVATAR_TYPES.includes(file.type);
    const extensionOk = ALLOWED_AVATAR_EXTENSIONS.test(file.name || '');
    return typeOk && extensionOk;
  }

  function handleAvatarFile(file) {
    if (!file) return;

    const isValidType = isAllowedImageFile(file);
    const isValidSize = file.size <= MAX_AVATAR_BYTES;

    dropZone.classList.remove('success', 'error');

    if (!isValidType || !isValidSize) {
      dropZone.classList.add('error');
      dragDropFotoText.innerHTML = !isValidType
        ? 'Solo se permiten imágenes en formato JPEG o PNG.'
        : 'La imagen supera los 2MB permitidos.';
      btnGuardarFoto.disabled = true;
      selectedAvatarFile = null;
      if (fileInput) fileInput.value = '';
      return;
    }

    selectedAvatarFile = file;
    dropZone.classList.add('success');
    dragDropFotoText.innerHTML = `<span>${file.name}</span> listo para subir`;
    btnGuardarFoto.disabled = false;

    const reader = new FileReader();
    reader.onload = (e) => {
      avatarPreviewImg.src = e.target.result;
      avatarPreviewImg.style.display = 'block';
      avatarPreviewIcon.style.display = 'none';
      avatarPreview.classList.remove('settings-avatar-preview--pulse');
      void avatarPreview.offsetWidth;
      avatarPreview.classList.add('settings-avatar-preview--pulse');
    };
    reader.readAsDataURL(file);
  }
  window.getSelectedAvatarFile = () => selectedAvatarFile;

  if (dropZone && fileInput) {
    fileInput.addEventListener('change', (e) => handleAvatarFile(e.target.files[0]));

    ['dragenter', 'dragover'].forEach((evt) => {
      dropZone.addEventListener(evt, (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach((evt) => {
      dropZone.addEventListener(evt, (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
      });
    });

    dropZone.addEventListener('drop', (e) => {
      const file = e.dataTransfer.files[0];
      if (file) handleAvatarFile(file);
    });
  }

  /* ---------------------------------------------------------------- */
  /* Delete-account modal: enable submit only when everything is set  */
  /* ---------------------------------------------------------------- */
  const passwordEliminar = document.getElementById('passwordEliminar');
  const confirmTextoEliminar = document.getElementById('confirmTextoEliminar');
  const checkEntiendoEliminar = document.getElementById('checkEntiendoEliminar');
  const btnConfirmarEliminar = document.getElementById('btn-confirmar-eliminar');

  function refreshDeleteButtonState() {
    if (!btnConfirmarEliminar) return;
    const passwordOk = passwordEliminar.value.trim().length > 0;
    const textOk = confirmTextoEliminar.value.trim().toUpperCase() === 'ELIMINAR';
    const checkOk = checkEntiendoEliminar.checked;
    btnConfirmarEliminar.disabled = !(passwordOk && textOk && checkOk);
  }

  [passwordEliminar, confirmTextoEliminar, checkEntiendoEliminar].forEach((el) => {
    if (el) el.addEventListener('input', refreshDeleteButtonState);
    if (el) el.addEventListener('change', refreshDeleteButtonState);
  });

  const modalOlvidePasswordEl = document.getElementById('modalOlvidePassword');
  const olvideEstados = {
    cargando: document.getElementById('olvideEstadoCargando'),
    exito: document.getElementById('olvideEstadoExito'),
    error: document.getElementById('olvideEstadoError'),
  };

  function setOlvidePasswordState(state) {
    Object.entries(olvideEstados).forEach(([key, el]) => {
      if (!el) return;
      el.classList.toggle('is-active', key === state);
    });
  }
  window.setOlvidePasswordState = setOlvidePasswordState;

  if (modalOlvidePasswordEl) {
    modalOlvidePasswordEl.addEventListener('show.bs.modal', () => {
      setOlvidePasswordState('cargando');
    });
  }

  /* ---------------------------------------------------------------- */
  /* Editar carrera                                                    */
  /* ---------------------------------------------------------------- */
  const modalCarrera = document.getElementById('modalCarrera');
  const errorModalCarrera = document.getElementById('errorModalCarrera');
  if (modalCarrera) {
    modalCarrera.addEventListener('change', () => {
      toggleFieldError(modalCarrera, errorModalCarrera, modalCarrera.value !== '');
    });
  }

  /* ---------------------------------------------------------------- */
  /* Logout / suspend confirmation modals                             */
  /* ---------------------------------------------------------------- */
  const btnAbrirLogout = document.getElementById('btnAbrirLogout');
  if (btnAbrirLogout) {
    btnAbrirLogout.addEventListener('click', () => {
      bootstrap.Modal.getOrCreateInstance(
        document.getElementById('modalConfirmLogout')
      ).show();
    });
  }

  const btnConfirmLogout = document.getElementById('btnConfirmLogout');
  if (btnConfirmLogout) {
    btnConfirmLogout.addEventListener('click', () => {
      window.location.href = 'login.jsp';
    });
  }

  const btnAbrirSuspender = document.getElementById('btnAbrirSuspender');
  if (btnAbrirSuspender) {
    btnAbrirSuspender.addEventListener('click', () => {
      bootstrap.Modal.getOrCreateInstance(
        document.getElementById('modalSuspenderCuenta')
      ).show();
    });
  }

  const btnAbrirEliminar = document.getElementById('btnAbrirEliminar');
  if (btnAbrirEliminar) {
    btnAbrirEliminar.addEventListener('click', () => {
      bootstrap.Modal.getOrCreateInstance(
        document.getElementById('modalEliminarCuenta')
      ).show();
    });
  }
});