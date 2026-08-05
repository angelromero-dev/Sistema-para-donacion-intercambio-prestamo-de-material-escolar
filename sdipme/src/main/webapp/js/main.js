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
            e.preventDefault();
            
            const pass = document.getElementById('password').value;
            const confirmPass = document.getElementById('confirmPassword').value;

            if (pass !== confirmPass) {
                alert("Las contraseñas no coinciden. Verifica e intenta de nuevo.");
                return;
            }

            const btnRegister = document.getElementById('btn-register');
            btnRegister.disabled = true;
            btnRegister.innerText = 'Registrando...';

            // DTO
            const alumnoData = {
                matricula: document.getElementById('matricula').value,
                correo: document.getElementById('correo').value,
                password: pass
            };
            
            const response = await api.registro(alumnoData);

            if (response.ok) {
                alert("Cuenta creada con éxito. Ya puedes iniciar sesión.");
                window.location.href = "login.jsp";
            } else {
                alert(response.data.message || "Error al registrar la cuenta");
            }

            btnRegister.disabled = false;
            btnRegister.innerText = 'Crear Cuenta';
        });
    }
});