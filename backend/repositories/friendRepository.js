const { query } = require("../database");

/**
 * Repositorio de amigos.
 * @module FriendRepository
 */
module.exports = {
    /**
     * Agrega un amigo a la lista de amigos del usuario.
     * @param {string} emailMainUser - El correo electrónico del usuario principal.
     * @param {string} emailFriend - El correo electrónico del amigo.
     * @returns {Promise<void>}
     */
    addFriend: async (emailMainUser, emailFriend) => {
      await query('INSERT INTO friends (emailMainUser, emailFriend) VALUES (?, ?)', [emailMainUser, emailFriend]);
    },
    /**
     * Comprueba si dos usuarios son amigos.
     * @param {string} userEmail - El correo electrónico del usuario principal.
     * @param {string} friendEmail - El correo electrónico del amigo.
     * @returns {Promise<boolean>} Devuelve true si son amigos, false en caso contrario.
     */
    areFriends: async (userEmail, friendEmail) => {
        const result = await query('SELECT * FROM friends WHERE emailMainUser = ? AND emailFriend = ?', [userEmail, friendEmail]);
        return result.length > 0;
    },
    getFriends: async (userEmail) => {
        const result = await query('SELECT emailFriend FROM friends WHERE emailMainUser = ?', [userEmail]);
        return result.map(row => row.emailFriend);
    }
  };