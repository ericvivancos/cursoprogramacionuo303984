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
    },
    /**
    * Obtiene un regalo por su ID y verifica que pertenece al usuario autenticado.
    * @param {number} userId - El ID del usuario autenticado.
    * @param {number} presentId - El ID del regalo.
    * @returns {Object} El regalo encontrado.
    * @throws {Error} Se lanza un error si el regalo no pertenece al usuario o si no se encuentra.
    */
    getPresentById: async (userId, presentId) => {
        console.log(presentId);
      const present = await presentRepository.getPresentById(presentId);
      if (!present) {
        throw new Error("Regalo no encontrado");
      }
      console.log(present);
      if (present.user_id !== userId) {
        throw new Error("No tiene permiso para ver este regalo");
      }
      return present;
    }
    
}