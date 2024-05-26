const { query } = require("../database");
/**
 * Repositorio de usuarios
 * @module UserRepository
 */
module.exports = {
   /**
   * Crea un nuevo usuario en la base de datos.
   * @param {string} email - El correo electrónico del usuario.
   * @param {string} name - El nombre del usuario.
   * @param {string} password - La contraseña del usuario.
   * @returns {Promise<object>} El resultado de la operación de inserción en la base de datos.
   */
  createUser: async (email, name, password) => {
    const result = await query('INSERT INTO users (email, username, password) VALUES (?, ?, ?)', [email, name, password,]);
    return result;
  },
  /**
   * Obtiene un usuario de la base de datos mediante su correo electrónico.
   * @param {string} email - El correo electrónico del usuario a buscar.
   * @returns {Promise<object|null>} El usuario encontrado o null si no se encuentra ninguno.
   */
  getUserByEmail: async (email) => {
    const result = await query('SELECT * FROM users WHERE email = ?', [email]);
    return result[0]; // Suponiendo que el email es único y solo hay un usuario con ese email
  },

  /**
   * Almacena una apiKey para un usuario en la base de datos.
   * @param {number} userId - El ID del usuario para el que se almacenará la apiKey.
   * @param {string} apiKey - La apiKey que se almacenará para el usuario.
   */
  storeApiKey: async (userId, apiKey) => {
    await query('INSERT INTO active_keys (user_id, api_key) VALUES (?, ?) ON DUPLICATE KEY UPDATE api_key = VALUES(api_key)', [userId, apiKey]);
  },
  /**
     * Elimina la apiKey asociada a un usuario de la lista de claves activas.
     * @param {number} userId - El ID del usuario cuya apiKey se eliminará.
     * @returns {Promise<void>} Una promesa que indica que la apiKey se ha eliminado correctamente.
     * @throws {Error} Se lanza un error si ocurre algún problema al eliminar la apiKey del usuario.
     */
  deleteApiKey: async (userId) => {
    try {
        await query('DELETE FROM active_keys WHERE api_key = ?', [userId]);
    } catch (error) {
        throw new Error("Error al eliminar la apiKey del usuario: " + error.message);
    }
  },
  /**
 * Busca una apiKey en la base de datos utilizando el valor proporcionado.
 * @param {string} apiKey - El valor de la apiKey a buscar.
 * @returns {Promise<object|null>} La apiKey encontrada o null si no se encuentra ninguna.
 */
  getApiKey: async (apiKey) => {
    const result = await query('SELECT * FROM active_keys WHERE api_key = ?', [apiKey]);
    return result[0]; // Suponiendo que la apiKey es única y solo hay una asociada al usuario
  },
};
