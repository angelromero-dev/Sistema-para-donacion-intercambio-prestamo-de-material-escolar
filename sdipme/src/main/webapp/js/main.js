/**
 * main.js (DOM)
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // LOGIN
    const loginForm = document.getElementById('form-login');
    
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const btnLogin = document.getElementById('btn-login');
            const usuarioInput = document.getElementById('usuario');
            const passwordInput = document.getElementById('password');
            
            btnLogin.disabled = true;
            btnLogin.innerText = 'Iniciando...';
            usuarioInput.classList.remove('is-invalid');
            passwordInput.classList.remove('is-invalid');

            const response = await api.login(usuarioInput.value, passwordInput.value);

            if (response.ok) {
                console.log("Login exitoso", response.data);
                window.location.href = "dashboard.jsp";
            } else {
                usuarioInput.classList.add('is-invalid');
                passwordInput.classList.add('is-invalid');
                alert(response.data.message || "Credenciales incorrectas");
            }

            btnLogin.disabled = false;
            btnLogin.innerText = 'Iniciar';
        });
    }

   // REGISTRO
   const registerForm = document.getElementById('form-register');
    
    if (registerForm) {
        /**
         * Selectors
         */
        const nombreInput = document.getElementById('nombre');
        const apellidosInput = document.getElementById('apellidos');
        const correoInput = document.getElementById('correo');
        const telefonoInput = document.getElementById('telefono');
        const carreraSelect = document.getElementById('carrera');
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirmPassword');
        
        // Modal Instances
        const modalValidacion = new bootstrap.Modal(document.getElementById('modalValidacion'));
        const modalConfirmacion = new bootstrap.Modal(document.getElementById('modalConfirmacion'));
        const modalLoading = new bootstrap.Modal(document.getElementById('modalLoading'));
        const modalExito = new bootstrap.Modal(document.getElementById('modalExito'));

        const loadCareers = async () => {
            try {
                const res = await api.getCatalogos();
                
                if (res.ok && res.data && res.data.carreras) {
                    carreraSelect.innerHTML = '<option value="" selected disabled>Selecciona tu carrera</option>';
                    
                    // Extraemos las divisiones por si el backend las manda como una lista separada
                    const divisiones = res.data.divisiones || [];

                    res.data.carreras.forEach(car => {
                        const option = document.createElement('option');
                        option.value = car.id || car.idCarrera;
                        option.text = car.nombre;

                        // LÓGICA 100% DINÁMICA DE INFERENCIA
                        // 1. Si tu backend de Java (DAO) hizo un JOIN y ya trae el acrónimo:
                        let acronimo = car.acronimoDivision || car.acronimo;

                        // 2. Si el backend solo mandó el idDivision, lo buscamos en el catálogo de divisiones:
                        if (!acronimo && car.idDivision) {
                            const divMatched = divisiones.find(d => d.idDivision === car.idDivision || d.id === car.idDivision);
                            if (divMatched) acronimo = divMatched.acronimo;
                        }

                        // Guardamos el acrónimo real de la BD en el dataset del option
                        option.dataset.division = acronimo || 'División Desconocida';
                        
                        carreraSelect.appendChild(option);
                    });
                }
            } catch (e) {
                console.error(">>> [JS ERROR] Error cargando el catálogo de carreras desde la BD:", e);
            }
        };
        
        loadCareers();

        /**
         * Toggle Password Visibility
         */
        document.querySelectorAll('.password-toggle').forEach(icon => {
            icon.addEventListener('click', function() {
                const targetId = this.getAttribute('data-target');
                const targetInput = document.getElementById(targetId);
                if (targetInput.type === 'password') {
                    targetInput.type = 'text';
                    this.classList.replace('bx-hide', 'bx-show');
                    this.style.color = 'var(--color-brand-primary)';
                } else {
                    targetInput.type = 'password';
                    this.classList.replace('bx-show', 'bx-hide');
                    this.style.color = 'var(--color-text-hint)';
                }
            });
        });

        /**
         * Form Submission & Strict Validation
         */
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // 1. Gather Values
            const nombre = nombreInput.value.trim();
            const apellidos = apellidosInput.value.trim();
            const correo = correoInput.value.trim().toLowerCase();
            const telefono = telefonoInput.value.trim();
            const idCarrera = carreraSelect.value;
            const carreraNombre = carreraSelect.options[carreraSelect.selectedIndex]?.text || '';
            const division = carreraSelect.options[carreraSelect.selectedIndex]?.dataset.division || '';
            const password = passwordInput.value;
            const confirm = confirmPasswordInput.value;

            // 2. Regex Rules
            const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
            const phoneRegex = /^[0-9]{10}$/;
            const emailRegex = /^([a-zA-Z0-9._%-]+)@utez\.edu\.mx$/;

            // 3. Validation Checks
            let errorMsg = '';
            
            if (!nombre || !apellidos || !correo || !telefono || !idCarrera || !password) {
                errorMsg = 'Por favor, completa todos los campos.';
            } else if (!nameRegex.test(nombre) || !nameRegex.test(apellidos)) {
                errorMsg = 'Los nombres y apellidos solo pueden contener letras.';
            } else if (!emailRegex.test(correo)) {
                errorMsg = 'Debes usar un correo institucional válido terminado en @utez.edu.mx';
            } else if (!phoneRegex.test(telefono)) {
                errorMsg = 'El teléfono debe ser un número válido de 10 dígitos (formato México).';
            } else if (password.length < 8) {
                errorMsg = 'La contraseña debe tener al menos 8 caracteres.';
            } else if (password !== confirm) {
                errorMsg = 'Las contraseñas no coinciden.';
            }

            if (errorMsg) {
                document.getElementById('txtErrorValidacion').innerText = errorMsg;
                modalValidacion.show();
                return;
            }

            // 4. Auto-Generate Matrícula
            const matriculaCalculada = correo.split('@')[0];

            // 5. Populate Summary Modal
            document.getElementById('sumNombre').innerText = `${nombre} ${apellidos}`;
            document.getElementById('sumMatricula').innerText = matriculaCalculada;
            document.getElementById('sumCorreo').innerText = correo;
            document.getElementById('sumTelefono').innerText = telefono;
            document.getElementById('sumCarrera').innerText = carreraNombre;
            document.getElementById('sumDivision').innerText = division;

            // 6. Show Confirmation
            modalConfirmacion.show();
        });

        /**
         * Final Submission to API
         */
        document.getElementById('btn-submit-final').addEventListener('click', async () => {
            modalConfirmacion.hide();
            modalLoading.show();

            const matriculaCalculada = correoInput.value.trim().toLowerCase().split('@')[0];

            const payload = {
                nombre: nombreInput.value.trim(),
                apellidos: apellidosInput.value.trim(),
                correo: correoInput.value.trim().toLowerCase(),
                matricula: matriculaCalculada,
                telefono: telefonoInput.value.trim(),
                idCarrera: parseInt(carreraSelect.value),
                passwordPlana: passwordInput.value
            };

            const response = await api.registro(payload);
            
            modalLoading.hide();

            if (response.ok) {
                modalExito.show();
                let count = 4;
                const coundownEl = document.getElementById('countdown');
                const timer = setInterval(() => {
                    count--;
                    coundownEl.innerText = count;
                    if (count <= 0) {
                        clearInterval(timer);
                        window.location.href = "login.jsp";
                    }
                }, 1000);
            } else {
                document.getElementById('txtErrorValidacion').innerText = response.data.message || "Ocurrió un error en el servidor.";
                modalValidacion.show();
            }
        });
    }
    // Editar nombre y apellidos
    const formEditarPerfil = document.getElementById('form-editar-perfil');
    if (formEditarPerfil) {
        formEditarPerfil.addEventListener('submit', async (e) => {
            e.preventDefault();

            const nombreInput = document.getElementById('modalNombre');
            const apellidosInput = document.getElementById('modalApellidos');
            const nombreValido = window.isValidHumanName(nombreInput.value);
            const apellidosValido = window.isValidHumanName(apellidosInput.value);

            window.toggleFieldError(nombreInput, document.getElementById('errorModalNombre'), nombreValido);
            window.toggleFieldError(apellidosInput, document.getElementById('errorModalApellidos'), apellidosValido);

            if (!nombreValido || !apellidosValido) return;

            const btn = document.getElementById('btn-guardar-perfil');
            btn.disabled = true;
            btn.innerText = 'Guardando...';

            try {
                const response = await api.actualizarPerfil({
                    nombre: nombreInput.value.trim(),
                    apellidos: apellidosInput.value.trim(),
                });

                if (response.ok) {
                    document.getElementById('viewNombreCompleto').innerText = `${nombreInput.value.trim()} ${apellidosInput.value.trim()}`;
                    document.getElementById('settingsUserName').innerText = `${nombreInput.value.trim()} ${apellidosInput.value.trim()}`;
                    bootstrap.Modal.getInstance(document.getElementById('modalEditarPerfil')).hide();
                    window.showToast('Tu información personal se actualizó correctamente.', 'success');
                } else {
                    window.openErrorModal(response.data.message || 'No pudimos actualizar tu información.');
                }
            } catch (error) {
                console.error(">>> [JS ERROR] Fallo al actualizar el perfil:", error);
                window.openErrorModal('No pudimos conectar con el servidor.');
            }

            btn.disabled = false;
            btn.innerText = 'Guardar cambios';
        });
    }

    const modalEditarCarreraEl = document.getElementById('modalEditarCarrera');
    const selectCarrera = document.getElementById('modalCarrera');
    if (modalEditarCarreraEl && selectCarrera) {
        modalEditarCarreraEl.addEventListener('show.bs.modal', async () => {
            const carreraActual = document.getElementById('viewCarrera').innerText.trim();

            selectCarrera.innerHTML = '<option value="" selected disabled>Cargando carreras...</option>';
            selectCarrera.disabled = true;

            try {
                const response = await api.obtenerCarreras();
                if (response.ok && Array.isArray(response.data)) {
                    selectCarrera.innerHTML = '<option value="" disabled>Selecciona tu carrera</option>';
                    response.data.forEach((carrera) => {
                        const opt = document.createElement('option');
                        opt.value = carrera.idCarrera;
                        opt.textContent = carrera.nombre;
                        if (carrera.nombre === carreraActual) {
                            opt.selected = true;
                        }
                        selectCarrera.appendChild(opt);
                    });
                } else {
                    selectCarrera.innerHTML = '<option value="" selected disabled>No se pudieron cargar las carreras</option>';
                }
            } catch (error) {
                console.error(">>> [JS ERROR] Fallo al cargar las carreras:", error);
                selectCarrera.innerHTML = '<option value="" selected disabled>No se pudieron cargar las carreras</option>';
            }

            selectCarrera.disabled = false;
        });
    }

    const formEditarCarrera = document.getElementById('form-editar-carrera');
    if (formEditarCarrera) {
        formEditarCarrera.addEventListener('submit', async (e) => {
            e.preventDefault();

            const errorModalCarrera = document.getElementById('errorModalCarrera');
            const carreraValida = selectCarrera.value !== '';
            window.toggleFieldError(selectCarrera, errorModalCarrera, carreraValida);
            if (!carreraValida) return;

            const btn = document.getElementById('btn-guardar-carrera');
            btn.disabled = true;
            btn.innerText = 'Guardando...';

            try {
                const response = await api.actualizarCarrera(parseInt(selectCarrera.value, 10));
                if (response.ok) {
                    const nombreCarrera = selectCarrera.options[selectCarrera.selectedIndex].textContent;
                    document.getElementById('viewCarrera').innerText = nombreCarrera;
                    bootstrap.Modal.getInstance(modalEditarCarreraEl).hide();
                    window.showToast('Tu carrera se actualizó correctamente.', 'success');
                } else {
                    window.openErrorModal(response.data.message || 'No pudimos actualizar tu carrera.');
                }
            } catch (error) {
                console.error(">>> [JS ERROR] Fallo al actualizar la carrera:", error);
                window.openErrorModal('No pudimos conectar con el servidor.');
            }

            btn.disabled = false;
            btn.innerText = 'Guardar cambios';
        });
    }

    // Actualizar teléfono
    const formContacto = document.getElementById('form-actualizar-contacto');
    if (formContacto) {
        formContacto.addEventListener('submit', async (e) => {
            e.preventDefault();

            const telefonoInput = document.getElementById('telefono');
            const telefonoValido = window.isValidPhone(telefonoInput.value);
            window.toggleFieldError(telefonoInput, document.getElementById('errorTelefono'), telefonoValido);
            if (!telefonoValido) return;

            const btn = document.getElementById('btn-guardar-telefono');
            btn.disabled = true;
            btn.innerText = 'Guardando...';

            try {
                const response = await api.actualizarTelefono(telefonoInput.value.trim());
                if (response.ok) {
                    document.getElementById('viewTelefono').innerText = telefonoInput.value.trim() || 'Nulo';
                    window.showToast('Tu número de teléfono se actualizó correctamente.', 'success');
                } else {
                    window.openErrorModal(response.data.message || 'No pudimos actualizar tu teléfono.');
                }
            } catch (error) {
                console.error(">>> [JS ERROR] Fallo al actualizar el teléfono:", error);
                window.openErrorModal('No pudimos conectar con el servidor.');
            }

            btn.disabled = false;
            btn.innerText = 'Guardar teléfono';
        });
    }

    // Cambiar contraseña
    const formPassword = document.getElementById('form-cambiar-password');
    if (formPassword) {
        formPassword.addEventListener('submit', async (e) => {
            e.preventDefault();

            const actual = document.getElementById('passwordActual');
            const nueva = document.getElementById('passwordNueva');
            const confirmar = document.getElementById('passwordConfirmar');
            const errorConfirmar = document.getElementById('errorPasswordConfirmar');

            const nuevaValida = nueva.value.length >= 8 && /[A-Z]/.test(nueva.value) && /\d/.test(nueva.value);
            const coincide = nueva.value === confirmar.value && confirmar.value.length > 0;

            window.toggleFieldError(nueva, null, nuevaValida);
            window.toggleFieldError(confirmar, errorConfirmar, coincide);

            if (actual.value.trim() === '' || !nuevaValida || !coincide) return;

            const btn = document.getElementById('btn-actualizar-password');
            btn.disabled = true;
            btn.innerText = 'Actualizando...';

            try {
                const response = await api.cambiarPassword({
                    passwordActual: actual.value,
                    passwordNueva: nueva.value,
                });

                if (response.ok) {
                    formPassword.reset();
                    window.showToast('Tu contraseña se actualizó correctamente.', 'success');
                } else {
                    window.openErrorModal(response.data.message || 'La contraseña actual no es correcta.');
                }
            } catch (error) {
                console.error(">>> [JS ERROR] Fallo al cambiar la contraseña:", error);
                window.openErrorModal('No pudimos conectar con el servidor.');
            }

            btn.disabled = false;
            btn.innerText = 'Actualizar contraseña';
        });
    }

    const modalOlvidePasswordEl = document.getElementById('modalOlvidePassword');
    if (modalOlvidePasswordEl) {
        modalOlvidePasswordEl.addEventListener('shown.bs.modal', async () => {
            try {
                const correo = document.getElementById('correoRecuperacion').value;
                await api.solicitarRecuperacion(correo);
                // By design we always show the same confirmation message
                // regardless of whether the account exists, so the flow
                // doesn't leak which emails are registered.
                window.setOlvidePasswordState && window.setOlvidePasswordState('exito');
            } catch (error) {
                console.error(">>> [JS ERROR] Fallo al solicitar recuperación:", error);
                window.setOlvidePasswordState && window.setOlvidePasswordState('error');
            }
        });
    }

    // Guardar nueva foto de perfil
    const btnGuardarFoto = document.getElementById('btn-guardar-foto');
    if (btnGuardarFoto) {
        btnGuardarFoto.addEventListener('click', async () => {
            const file = window.getSelectedAvatarFile && window.getSelectedAvatarFile();
            if (!file) return;

            btnGuardarFoto.disabled = true;
            btnGuardarFoto.innerText = 'Subiendo...';

            try {
                const response = await api.actualizarFotoPerfil(file);
                if (response.ok) {
                    const nuevaUrl = response.data.fotoUrl;
                    ['settingsAvatarImg', 'fieldAvatarImg'].forEach((id) => {
                        const img = document.getElementById(id);
                        img.src = nuevaUrl;
                        img.style.display = 'block';
                    });
                    document.getElementById('settingsAvatarInitials').style.display = 'none';
                    document.getElementById('fieldAvatarIcon').style.display = 'none';
                    bootstrap.Modal.getInstance(document.getElementById('modalEditarFoto')).hide();
                    window.showToast('Tu foto de perfil se actualizó correctamente.', 'success');
                } else {
                    window.openErrorModal(response.data.message || 'No pudimos actualizar tu foto de perfil.');
                }
            } catch (error) {
                console.error(">>> [JS ERROR] Fallo al subir la foto de perfil:", error);
                window.openErrorModal('No pudimos conectar con el servidor.');
            }

            btnGuardarFoto.disabled = false;
            btnGuardarFoto.innerText = 'Guardar foto';
        });
    }

    // Suspender cuenta
    const btnConfirmSuspender = document.getElementById('btnConfirmSuspender');
    if (btnConfirmSuspender) {
        btnConfirmSuspender.addEventListener('click', async () => {
            btnConfirmSuspender.disabled = true;
            btnConfirmSuspender.innerText = 'Procesando...';

            try {
                const response = await api.suspenderCuenta();
                if (response.ok) {
                    window.location.href = 'login.jsp';
                } else {
                    bootstrap.Modal.getInstance(document.getElementById('modalSuspenderCuenta')).hide();
                    window.openErrorModal(response.data.message || 'No pudimos suspender tu cuenta.');
                }
            } catch (error) {
                console.error(">>> [JS ERROR] Fallo al suspender la cuenta:", error);
                window.openErrorModal('No pudimos conectar con el servidor.');
            }

            btnConfirmSuspender.disabled = false;
            btnConfirmSuspender.innerText = 'Sí, suspender';
        });
    }

    // Eliminar cuenta permanentemente
    const formEliminar = document.getElementById('form-eliminar-cuenta');
    if (formEliminar) {
        formEliminar.addEventListener('submit', async (e) => {
            e.preventDefault();

            const btn = document.getElementById('btn-confirmar-eliminar');
            btn.disabled = true;
            btn.innerText = 'Eliminando...';

            try {
                const password = document.getElementById('passwordEliminar').value;
                const response = await api.eliminarCuenta(password);
                if (response.ok) {
                    window.location.href = 'login.jsp';
                } else {
                    bootstrap.Modal.getInstance(document.getElementById('modalEliminarCuenta')).hide();
                    window.openErrorModal(response.data.message || 'La contraseña no es correcta. Tu cuenta no fue eliminada.');
                }
            } catch (error) {
                console.error(">>> [JS ERROR] Fallo al eliminar la cuenta:", error);
                window.openErrorModal('No pudimos conectar con el servidor.');
            }

            btn.disabled = false;
            btn.innerText = 'Eliminar mi cuenta';
        });
    }

    const cambiarPasswordContainer = document.getElementById('cambiarPasswordContainer');
    if (cambiarPasswordContainer) {
        const token = window.getQueryParam ? window.getQueryParam('token') : null;

        const verificarEnlacePassword = async () => {
            window.showAccountState('cambiarPasswordContainer', 'stateVerificando');

            if (!token) {
                window.showAccountState('cambiarPasswordContainer', 'stateInvalido');
                return;
            }

            try {
                const response = await api.verificarTokenPassword(token);
                if (response.ok && response.data && response.data.valido) {
                    window.showAccountState('cambiarPasswordContainer', 'stateFormulario');
                } else {
                    window.showAccountState('cambiarPasswordContainer', 'stateInvalido');
                }
            } catch (error) {
                console.error(">>> [JS ERROR] Fallo al verificar el enlace de recuperación:", error);
                window.showAccountState('cambiarPasswordContainer', 'stateSinConexion');
            }
        };

        verificarEnlacePassword();

        const btnReintentarVerificacion = document.getElementById('btn-reintentar-verificacion');
        if (btnReintentarVerificacion) {
            btnReintentarVerificacion.addEventListener('click', verificarEnlacePassword);
        }

        const formRestablecer = document.getElementById('form-restablecer-password');
        if (formRestablecer) {
            formRestablecer.addEventListener('submit', async (e) => {
                e.preventDefault();

                const nueva = document.getElementById('nuevaPassword');
                const confirmar = document.getElementById('confirmarPassword');
                const errorConfirmar = document.getElementById('errorConfirmarPassword');

                const nuevaValida = nueva.value.length >= 8 && /[A-Z]/.test(nueva.value) && /\d/.test(nueva.value);
                const coincide = nueva.value === confirmar.value && confirmar.value.length > 0;

                nueva.classList.toggle('is-invalid', !nuevaValida);
                confirmar.classList.toggle('is-invalid', !coincide);
                if (errorConfirmar) errorConfirmar.classList.toggle('show', !coincide);

                if (!nuevaValida || !coincide) return;

                const btn = document.getElementById('btn-restablecer-password');
                btn.disabled = true;
                btn.innerText = 'Actualizando...';

                try {
                    const response = await api.restablecerPassword(token, nueva.value);
                    if (response.ok) {
                        bootstrap.Modal.getOrCreateInstance(document.getElementById('modalPasswordActualizada')).show();
                    } else {
                        document.getElementById('errorRestablecerMensaje').innerText =
                            response.data.message || 'No pudimos actualizar tu contraseña. Intenta de nuevo más tarde.';
                        bootstrap.Modal.getOrCreateInstance(document.getElementById('modalErrorRestablecer')).show();
                    }
                } catch (error) {
                    console.error(">>> [JS ERROR] Fallo al restablecer la contraseña:", error);
                    document.getElementById('errorRestablecerMensaje').innerText =
                        'No pudimos conectar con el servidor.';
                    bootstrap.Modal.getOrCreateInstance(document.getElementById('modalErrorRestablecer')).show();
                }

                btn.disabled = false;
                btn.innerText = 'Actualizar contraseña';
            });
        }
    }

    const cuentaBloqueadaContainer = document.getElementById('cuentaBloqueadaContainer');
    if (cuentaBloqueadaContainer) {
        let countdownTimer = null;

        const formatMinutosSegundos = (totalSegundos) => {
            const m = Math.floor(totalSegundos / 60);
            const s = totalSegundos % 60;
            return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
        };

        const iniciarConteo = (segundosRestantes) => {
            const countdownEl = document.getElementById('tiempoRestanteBloqueo');
            const textoEl = document.getElementById('textoTiempoRestante');
            let restante = segundosRestantes;

            clearInterval(countdownTimer);
            countdownEl.innerText = formatMinutosSegundos(Math.max(restante, 0));

            countdownTimer = setInterval(() => {
                restante -= 1;
                if (restante <= 0) {
                    clearInterval(countdownTimer);
                    countdownEl.innerText = '00:00';
                    textoEl.innerText = 'Ya puedes intentar iniciar sesión de nuevo.';
                    return;
                }
                countdownEl.innerText = formatMinutosSegundos(restante);
            }, 1000);
        };

        const verificarBloqueo = async () => {
            window.showAccountState('cuentaBloqueadaContainer', 'stateVerificando');

            try {
                const response = await api.estadoBloqueoCuenta();
                if (response.ok) {
                    window.showAccountState('cuentaBloqueadaContainer', 'stateBloqueada');
                    const segundos = (response.data && response.data.segundosRestantes) || 0;
                    iniciarConteo(segundos);
                } else {
                    window.showAccountState('cuentaBloqueadaContainer', 'stateSinConexion');
                }
            } catch (error) {
                console.error(">>> [JS ERROR] Fallo al consultar el estado de bloqueo:", error);
                window.showAccountState('cuentaBloqueadaContainer', 'stateSinConexion');
            }
        };

        verificarBloqueo();

        const btnReintentarBloqueo = document.getElementById('btn-reintentar-bloqueo');
        if (btnReintentarBloqueo) {
            btnReintentarBloqueo.addEventListener('click', verificarBloqueo);
        }
    }

    const activarCuentaContainer = document.getElementById('activarCuentaContainer');
    if (activarCuentaContainer) {
        const token = window.getQueryParam ? window.getQueryParam('token') : null;

        const activarCuenta = async () => {
            window.showAccountState('activarCuentaContainer', 'stateVerificando');

            if (!token) {
                window.showAccountState('activarCuentaContainer', 'stateInvalido');
                return;
            }

            try {
                const response = await api.verificarTokenActivacion(token);
                if (response.ok && response.data && response.data.activada) {
                    window.showAccountState('activarCuentaContainer', 'stateExito');
                } else {
                    window.showAccountState('activarCuentaContainer', 'stateInvalido');
                }
            } catch (error) {
                console.error(">>> [JS ERROR] Fallo al activar la cuenta:", error);
                window.showAccountState('activarCuentaContainer', 'stateSinConexion');
            }
        };

        activarCuenta();

        const btnReintentarActivacion = document.getElementById('btn-reintentar-activacion');
        if (btnReintentarActivacion) {
            btnReintentarActivacion.addEventListener('click', activarCuenta);
        }

        const formReenviarActivacion = document.getElementById('form-reenviar-activacion');
        if (formReenviarActivacion) {
            formReenviarActivacion.addEventListener('submit', async (e) => {
                e.preventDefault();

                window.showAccountState('modalReenviarActivacion', 'reenvioEstadoCargando');

                const btn = document.getElementById('btn-reenviar-activacion');
                btn.disabled = true;

                try {
                    const correo = document.getElementById('correoReactivacion').value;
                    await api.reenviarActivacion(correo);
                    window.showAccountState('modalReenviarActivacion', 'reenvioEstadoExito');
                } catch (error) {
                    console.error(">>> [JS ERROR] Fallo al reenviar la activación:", error);
                    window.showAccountState('modalReenviarActivacion', 'reenvioEstadoError');
                }

                btn.disabled = false;
            });
        }
    }
});