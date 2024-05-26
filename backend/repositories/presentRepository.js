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
    }
}