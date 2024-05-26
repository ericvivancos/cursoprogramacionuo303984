const presentRepository = require("../repositories/presentRepository");
const { validatePresentData } = require("../validators/presentValidator");
module.exports = {
    /**
     * Crea un nuevo regalo después de validar los datos.
     * @param {string} apiKey - La apiKey del usuario.
     * @param {string} name - El nombre del regalo.
     * @param {string} description - La descripción del regalo.
     * @param {string} url - La URL del regalo.
     * @param {number} price - El precio del regalo.
     * @returns {Object} El regalo creado.
     * @throws {Error} Se lanza un error si los datos no son válidos o si ocurre un problema al crear el regalo.
     */
    createPresent: async (userId,name, description, url, price) => {
        validatePresentData(name, description, url, price);
        const present = await presentRepository.createPresent(userId, name, description, url, price);
        return present;
    },
    /**
    * Obtiene todos los regalos creados por un usuario.
    * @param {number} userId - El ID del usuario.
    * @returns {Array} Una lista de regalos creados por el usuario.
    */
    getPresentsByUserId: async (userId) => {
        const presents = await presentRepository.getPresentsByUserId(userId);
        return presents;
    }
    
}