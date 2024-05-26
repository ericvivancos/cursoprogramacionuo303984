const friendRepository = require("../repositories/friendRepository");
const userRepository = require("../repositories/userRepository");

module.exports = {
  /**
   * Agrega un amigo a la lista de amigos del usuario.
   * @param {string} emailMainUser - El correo electrónico del usuario principal.
   * @param {string} emailFriend - El correo electrónico del amigo.
   * @returns {Promise<void>}
   * @throws {Error} Si el amigo no existe en el sistema.
   */
  addFriend: async (emailMainUser, emailFriend) => {
    // Verificar si el amigo existe en el sistema
    const friend = await userRepository.getUserByEmail(emailFriend);
    if (!friend) {
      throw new Error("El amigo no existe en el sistema");
    }
    await friendRepository.addFriend(emailMainUser, emailFriend);
  }
};