const presentRepository = require("../repositories/presentRepository");
const { validatePresentData } = require("../validators/presentValidator");
const userRepository = require("../repositories/userRepository");
const authMiddleware = require('../middlewares/authMiddleware');
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
    getPresentById:  async (userId, presentId) => {
      const present = await presentRepository.getPresentById(presentId);
      return present;
    },
    /**
    * Elimina un regalo por su ID después de verificar que pertenece al usuario autenticado.
    * @param {number} presentId - El ID del regalo.
    * @returns {Promise<void>}
    * @throws {Error} Se lanza un error si el regalo no pertenece al usuario o si no se encuentra.
    */
    deletePresent: async ( presentId) => {      
       return await presentRepository.deletePresent(presentId);
      },
    /**
    * Modifica un regalo existente.
    * @param {number} userId - El ID del usuario autenticado.
    * @param {number} presentId - El ID del regalo.
    * @param {Object} presentData - Los datos del regalo a modificar.
    * @param {string} presentData.name - El nombre del regalo.
    * @param {string} presentData.description - La descripción del regalo.
    * @param {string} presentData.url - La URL del regalo.
    * @param {number} presentData.price - El precio del regalo.
    * @returns {Promise<void>}
    * @throws {Error} Se lanza un error si el regalo no pertenece al usuario o si no se encuentra.
      */
    updatePresent: async (userId, presentId, presentData) => {
      
      // Validar los datos del regalo
      validatePresentData(presentData.name, presentData.description, presentData.url, presentData.price);

      await presentRepository.updatePresent(presentId, presentData);
    },
    /**
     * Obtiene los regalos de un usuario por su email.
     * @param {string} email - El email del usuario.
     * @returns {Promise<Object[]>} Una lista de regalos.
     */
    getPresentsByUserEmail: async (email) => {
      const user = await userRepository.getUserByEmail(email);
      if (!user) {
          throw new Error("Usuario no encontrado");
      }
      return await presentRepository.getPresentsByUserId(user.id);
  }    
}