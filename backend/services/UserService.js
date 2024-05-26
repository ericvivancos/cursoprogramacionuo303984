const userRepository = require("../repositories/userRepository");
const validator = require("../validators/userValidator");

module.exports = {
    /**
   * Crea un nuevo usuario después de validar los datos y comprobar si el usuario ya existe.
   * @param {string} email - El correo electrónico del usuario.
   * @param {string} name - El nombre del usuario.
   * @param {string} password - La contraseña del usuario.
   * @returns {Object} El usuario creado.
   * @throws {Error} Se lanza un error si los datos no son válidos o si ya existe un usuario con el mismo correo electrónico.
   */
    createUser: async (email , name , password) => {
        validator.validateUserData(email,name,password);

        const existingUser = await userRepository.getUserByEmail(email);
        if(existingUser){
            throw new Error("Ya existe un usuario con este email");
        }

        const user = await userRepository.createUser(email,name,password);
        return user;
    }
};