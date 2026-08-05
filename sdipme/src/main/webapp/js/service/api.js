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
    }
};