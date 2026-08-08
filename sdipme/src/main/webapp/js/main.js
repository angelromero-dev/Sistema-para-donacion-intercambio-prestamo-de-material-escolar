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
        registerForm.addEventListener('submit', async (e) => {
            // 1. DETENEMOS LA RECARGA DE LA PÁGINA
            e.preventDefault(); 
            
            try {
                // 2. VALIDAMOS EL CORREO
                const correoInput = document.getElementById('correo').value;
                if (!correoInput.toLowerCase().endsWith('@utez.edu.mx')) {
                    alert("Por políticas de la plataforma, solo puedes registrarte usando tu correo institucional (@utez.edu.mx).");
                    return;
                }

                // 3. VALIDAMOS CONTRASEÑAS
                const pass = document.getElementById('password').value;
                const confirmPass = document.getElementById('confirmPassword').value;

                if (pass !== confirmPass) {
                    alert("Las contraseñas no coinciden. Verifica e intenta de nuevo.");
                    return;
                }

                // 4. BLOQUEAMOS EL BOTÓN PARA EVITAR DOBLE CLIC
                const btnRegister = document.getElementById('btn-register');
                btnRegister.disabled = true;
                btnRegister.innerText = 'Registrando...';

                // 5. ARMAMOS EL JSON EXACTO QUE ESPERA EL BACKEND
                const alumnoData = {
                    nombre: document.getElementById('nombre').value,
                    apellidos: document.getElementById('apellidos').value,
                    telefono: document.getElementById('telefono').value,
                    matricula: document.getElementById('matricula').value,
                    correo: correoInput,
                    idCarrera: parseInt(document.getElementById('idCarrera').value), 
                    password: pass
                };
                
                // 6. ENVIAMOS A LA API
                const response = await api.registro(alumnoData);

                if (response.ok) {
                    alert("Cuenta creada con éxito. Revisa tu correo para activarla.");
                    window.location.href = "login.jsp";
                } else {
                    alert(response.data.message || "Error al registrar la cuenta");
                    btnRegister.disabled = false;
                    btnRegister.innerText = 'Crear Cuenta';
                }

            } catch (error) {
                console.error(">>> [JS ERROR] Fallo en el script de registro:", error);
                alert("Ocurrió un error en el navegador. Revisa la consola.");
            }
        });
    }
});