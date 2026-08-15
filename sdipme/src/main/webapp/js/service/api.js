/**
 * Connect API
 */

const API_BASE_URL = '/api';

const api = {
   // Login request
    login: async (correo, password) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ correo, password })
            });

            const data = await response.json();
            return { ok: response.ok, data };
        } catch (error) {
            console.error("Error de conexión en login:", error);
            return { ok: false, data: { message: "Error de conexión con el servidor" } };
        }
    },

    // Registro request
    registro: async (alumnoData) => {
        try {
            console.log(`>>> [CAPA 4 - API.JS] 1. Enviando petición POST a: ${API_BASE_URL}/auth/registro`);
            console.log(`>>> [CAPA 4 - API.JS] 2. Datos enviados:`, alumnoData);
            
            const response = await fetch(`${API_BASE_URL}/auth/registro`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(alumnoData)
            });

            console.log(`>>> [CAPA 4 - API.JS] 3. El servidor respondió con HTTP Status: ${response.status}`);
            const data = await response.json();
            console.log(`>>> [CAPA 4 - API.JS] 4. JSON procesado del servidor:`, data);
            
            return { ok: response.ok, data };
        } catch (error) {
            console.error(">>> [CAPA 4 - RED/CORS ERROR] El navegador ni siquiera pudo alcanzar a Tomcat. Razones posibles: CORS, Servidor apagado, o URL incorrecta.", error);
            return { ok: false, data: { message: "Error de red/conexión. Revisa la consola (F12)." } };
        }
    },

    // Solicitar un prototipo
    solicitarPrototipo: async (solicitudData) => {
        console.log(">>> [API POST] Enviando nueva solicitud a Java:", solicitudData);
        try {
            const response = await fetch(`${API_BASE_URL}/solicitudes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(solicitudData)
            });

            const data = await response.json();
            return { ok: response.ok, data };
        } catch (error) {
            console.error(">>> [API POST FATAL] Fallo al crear solicitud:", error);
            return { ok: false, data: { message: "Error de red al comunicarse con el servidor." } };
        }
    },

    // Fetch prototypes catalog
getPrototipos: async () => {
        console.log(">>> [API GET] Iniciando petición a /api/prototipos...");
        try {
            const response = await fetch(`${API_BASE_URL}/prototipos`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            return { ok: response.ok, data };
        } catch (error) {
            console.error(">>> [API GET FATAL] Fallo crítico al comunicarse con el backend:", error);
            return { ok: false, data: [] };
        }
    },

    // Subir imagen a Cloudinary (Unsigned Upload)
   uploadImageToCloudinary: async (file) => {
        console.log(">>> [API CLOUDINARY] Iniciando subida de imagen...");
        const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/lt47u5el/image/upload';
        const UPLOAD_PRESET = 'sdipme_imagenes'; 

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', UPLOAD_PRESET);
        

        try {
            const response = await fetch(CLOUDINARY_URL, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            
            if (response.ok) {
                console.log(">>> [API CLOUDINARY OK] Imagen subida. URL:", data.secure_url);
                return { ok: true, url: data.secure_url };
            } else {
                console.error(">>> [API CLOUDINARY ERROR DETALLE]:", data.error.message);
                return { ok: false, error: data.error.message };
            }
        } catch (error) {
            console.error(">>> [API CLOUDINARY FATAL] Error de red al subir imagen:", error);
            return { ok: false, error: "Error de red al comunicarse con Cloudinary." };
        }
    },

    publicarPrototipo: async (prototipoData) => {
        console.log(">>> [API POST] Enviando prototipo a Java:", prototipoData);
        try {
            const response = await fetch(`${API_BASE_URL}/prototipos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(prototipoData)
            });

            const data = await response.json();
            return { ok: response.ok, data };
        } catch (error) {
            console.error(">>> [API POST FATAL] Fallo al publicar prototipo:", error);
            return { ok: false, data: { message: "Error de red al comunicarse con el servidor." } };
        }
    },

    getCatalogos: async () => {
        console.log(">>> [API GET] Solicitando catálogos reales al servidor...");
        try {
            const response = await fetch(`${API_BASE_URL}/catalogos`);
            const data = await response.json();
            return { ok: response.ok, data };
        } catch (error) {
            console.error(">>> [API GET FATAL] Fallo al obtener catálogos:", error);
            return { ok: false, data: null };
        }
    },

    // Obtener la información del perfil del usuario en sesión activa
    getPerfilUsuarioLogueado: async () => {
        console.log(">>> [API GET] Obteniendo perfil del usuario en sesión...");
        try {
            const response = await fetch(`${API_BASE_URL}/auth/perfil`);
            const data = await response.json();
            return { ok: response.ok, data };
        } catch (error) {
            console.error(">>> [API GET FATAL] Error al obtener perfil:", error);
            return { ok: false, data: null };
        }
    },

getMisPendientes: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/solicitudes`);
            const data = await response.json();
            return { ok: response.ok, data: data.data || [] };
        } catch (error) { return { ok: false, data: [] }; }
    },

    cancelarPrototipo: async (idPrototipo) => {
        try {
            const response = await fetch(`${API_BASE_URL}/actividades/prototipos?idPrototipo=${idPrototipo}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            return { ok: response.ok, data };
        } catch (error) { return { ok: false, data: { message: "Error de red" } }; }
    },
    
    getSolicitudesRecibidas: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/actividades/solicitudes`);
            const data = await response.json();
            return { ok: response.ok, data: data.data || [] };
        } catch (error) { return { ok: false, data: [] }; }
    },

    getMisPrototiposPublicados: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/actividades/prototipos`);
            const data = await response.json();
            return { ok: response.ok, data: data.data || [] };
        } catch (error) { return { ok: false, data: [] }; }
    },

    responderSolicitud: async (idSolicitud, estado) => {
        try {
            const response = await fetch(`${API_BASE_URL}/solicitudes`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idSolicitud, estado }) // estado = 'ACEPTADA' o 'RECHAZADA'
            });
            const data = await response.json();
            return { ok: response.ok, data };
        } catch (error) { return { ok: false, data: { message: "Error de red" } }; }
    },

    getMisSolicitudesEnviadas: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/actividades/mis-solicitudes`);
            const data = await response.json();
            return { ok: response.ok, data: data.data || [] };
        } catch (error) { return { ok: false, data: [] }; }
    },

    obtenerPerfil: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/perfil`, {
                method: 'GET'
            });
            const data = await response.json();
            return { ok: response.ok, data };
        } catch (error) {
            return { ok: false, data: { message: "Error de conexión" } };
        }
    },

    // Update names
    actualizarPerfil: async (datos) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/perfil`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: "actualizar_nombres", ...datos })
            });
            const data = await response.json();
            return { ok: response.ok, data };
        } catch (error) { return { ok: false, data: { message: "Error de red" } }; }
    },

    // Fetch careers for the select dropdown
    obtenerCarreras: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/catalogos`);
            const data = await response.json();
            // Maps the data depending on your CatalogosServlet response structure
            if (response.ok && data.carreras) {
                return { ok: true, data: data.carreras };
            }
            return { ok: false, data: [] };
        } catch (error) { return { ok: false, data: [] }; }
    },

    // Update career
    actualizarCarrera: async (idCarrera) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/perfil`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: "actualizar_carrera", idCarrera })
            });
            const data = await response.json();
            return { ok: response.ok, data };
        } catch (error) { return { ok: false, data: { message: "Error de red" } }; }
    },

    // Update phone
    actualizarTelefono: async (telefono) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/perfil`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: "actualizar_telefono", telefono })
            });
            const data = await response.json();
            return { ok: response.ok, data };
        } catch (error) { return { ok: false, data: { message: "Error de red" } }; }
    },

    // Update password
    cambiarPassword: async (passwords) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/perfil`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: "cambiar_password", ...passwords })
            });
            const data = await response.json();
            return { ok: response.ok, data };
        } catch (error) { return { ok: false, data: { message: "Error de red" } }; }
    },

    // Suspend account (Soft delete)
    suspenderCuenta: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/perfil`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: "suspender_cuenta" })
            });
            const data = await response.json();
            return { ok: response.ok, data };
        } catch (error) { return { ok: false, data: { message: "Error de red" } }; }
    },

    // Hard delete account
    eliminarCuenta: async (password) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/perfil`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });
            const data = await response.json();
            return { ok: response.ok, data };
        } catch (error) { return { ok: false, data: { message: "Error de red" } }; }
    },

    // Upload to Cloudinary and save to DB in a single flow
    actualizarFotoPerfil: async (file) => {
        // 1. Upload to Cloudinary first
        const uploadRes = await api.uploadImageToCloudinary(file);
        
        if (!uploadRes.ok) {
            return { ok: false, data: { message: uploadRes.error } };
        }

        // 2. Tell Java backend to save the URL
        try {
            const response = await fetch(`${API_BASE_URL}/auth/perfil`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    action: "actualizar_foto", 
                    fotoUrl: uploadRes.url 
                })
            });
            const data = await response.json();
            
            // Attach the Cloudinary URL so main.js can update the UI instantly
            if (response.ok) {
                data.fotoUrl = uploadRes.url; 
            }
            return { ok: response.ok, data };
        } catch (error) { 
            return { ok: false, data: { message: "Error al guardar URL en base de datos" } }; 
        }
    },

    activarCuenta: async (token) => {
        try {
            const response = await fetch(`${API_BASE_URL}/activar?token=${token}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await response.json();
            return { ok: response.ok, data };
        } catch (error) {
            console.error(">>> [API ERROR] Error de red al activar cuenta:", error);
            return { ok: false, data: { message: "Error de red al intentar activar la cuenta." } };
        }
    },

    solicitarRecuperacion: async (correo) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/recuperar-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ correo })
            });
            const data = await response.json();
            return { ok: response.ok, data };
        } catch (error) {
            return { ok: false, data: { message: "Error de red" } };
        }
    },

    verificarTokenPassword: async (token) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/verificar-token-password?token=${token}`);
            const data = await response.json();
            return { ok: response.ok, data };
        } catch (error) {
            return { ok: false, data: { message: "Error de red" } };
        }
    },

    enviarMensajeAdmin: async (idUsuario, mensaje) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/mensaje-admin`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idUsuario, mensaje })
            });
            const data = await response.json();
            return { ok: response.ok, data };
        } catch (error) {
            return { ok: false, data: { message: "Error de red" } };
        }
    },

    restablecerPassword: async (password) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/restablecer-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });
            const data = await response.json();
            return { ok: response.ok, data };
        } catch (error) {
            return { ok: false, data: { message: "Error de red al conectar con el servidor." } };
        }
    },
};