const { query } = require("../database");

module.exports = {
    /**
     * Crea un nuevo regalo en la base de datos.
     * @param {number} userId - El ID del usuario que crea el regalo.
     * @param {string} name - El nombre del regalo.
     * @param {string} description - La descripción del regalo.
     * @param {string} url - La URL del regalo.
     * @param {number} price - El precio del regalo.
     * @returns {Promise<object>} El resultado de la operación de inserción en la base de datos.
     */
    createPresent: async (userId, name, description, url, price) => {
        const result = await query('INSERT INTO presents (user_id, name, description, url, price) VALUES (?, ?, ?, ?, ?)', 
            [userId, name, description, url, price]);
        return result;
    },
    /**
    * Obtiene todos los regalos creados por un usuario.
    * @param {number} userId - El ID del usuario.
    * @returns {Promise<Array>} Una lista de regalos creados por el usuario.
    */
    getPresentsByUserId: async (userId) => {
    const result = await query('SELECT * FROM presents WHERE user_id = ?', [userId]);
    return result;
    },
    /**
    * Obtiene un regalo por su ID.
    * @param {number} id - El ID del regalo.
    * @returns {Promise<object|null>} El regalo encontrado o null si no se encuentra ninguno.
    */
    getPresentById: async (id) => {
      const result = await query('SELECT p.*, u.email AS user_email FROM presents p JOIN users u ON p.user_id = u.id WHERE p.id = ?', [id]);
      return result[0]; // Suponiendo que el ID es único y solo hay un regalo con ese ID
    },
    /**
    * Elimina un regalo por su ID.
    * @param {number} id - El ID del regalo.
    * @returns {Promise<void>}
    */
    deletePresent: async (id) => {
       return await query('DELETE FROM presents WHERE id = ?', [id]);
    },
    /**
    * Actualiza un regalo en la base de datos.
    * @param {number} id - El ID del regalo.
    * @param {Object} presentData - Los datos del regalo a modificar.
    * @param {string} presentData.name - El nombre del regalo.
    * @param {string} presentData.description - La descripción del regalo.
    * @param {string} presentData.url - La URL del regalo.
    * @param {number} presentData.price - El precio del regalo.
    * @returns {Promise<void>}
    */
    updatePresent: async (id, presentData) => {
      const { name, description, url, price } = presentData;
      await query(
        'UPDATE presents SET name = ?, description = ?, url = ?, price = ? WHERE id = ?',
        [name, description, url, price, id]
      );
    },
    getUserEmailByPresentId: async (presentId) => {
      const result = await query('SELECT u.email FROM presents p JOIN users u ON p.user_id = u.id WHERE p.id = ?', [presentId]);
      return result[0]?.email;
  },
  setChosenBy: async (presentId, friendEmail) => {
    await query('UPDATE presents SET chosen_by = ? WHERE id = ?', [friendEmail, presentId]);
}
}