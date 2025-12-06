// src/environments/environment.ts
/**
* Configuración del entorno de la aplicación.
* 
* @constant environment
* @type {Object}
* @property {boolean} production - Indicador que indica si la aplicación está en modo de producción.
* @property {string} apiUrl - La URL base del punto de conexión de los usuarios de la API de backend.
*/
export const environment = {
    production: false,
    // Ajusta a la URL de tu backend (host y puerto)
    apiUrl: 'http://localhost:8081/api/users'
};