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
}
};
