/**
 * Connect API
 */

const API_BASE_URL = '/sdipme_war_exploded/api';

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
            const response = await fetch(`${API_BASE_URL}/auth/registro`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(alumnoData)
            });

            const data = await response.json();
            return { ok: response.ok, data };
        } catch (error) {
            console.error("Error de conexión en registro:", error);
            return { ok: false, data: { message: "Error de conexión con el servidor" } };
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
    }
};