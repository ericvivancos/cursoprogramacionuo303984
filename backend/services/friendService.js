

const friendRepository = require("../repositories/friendRepository");
module.exports = {
  /**
   * Agrega un amigo a la lista de amigos del usuario.
   * @param {string} emailMainUser - El correo electrónico del usuario principal.
   * @param {string} emailFriend - El correo electrónico del amigo.
   * @returns {Promise<void>}
   * @throws {Error} Si el amigo no existe en el sistema.
   */
  addFriend: async (emailMainUser, emailFriend) => {
    
    await friendRepository.addFriend(emailMainUser, emailFriend);
  },
   /**
     * Obtiene la lista de amigos de un usuario.
     * @param {string} userEmail - El correo electrónico del usuario.
     * @returns {Promise<string[]>} Una lista de correos electrónicos de amigos.
     */
  getFriends: async (userEmail) => {
    console.log(userEmail);
    const friends = await friendRepository.getFriends(userEmail);
    return friends;
  },
  /**
     * Elimina un amigo de la lista de amigos del usuario.
     * @param {string} mainUserEmail - El correo electrónico del usuario principal.
     * @param {string} friendEmail - El correo electrónico del amigo a eliminar.
     * @returns {Promise<void>}
     */
  removeFriend: async (mainUserEmail, friendEmail) => {
    await friendRepository.removeFriend(mainUserEmail, friendEmail);
  }
};