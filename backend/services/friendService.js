

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
  getFriends: async (userEmail) => {
    console.log(userEmail);
    const friends = await friendRepository.getFriends(userEmail);
    return friends;
}
};