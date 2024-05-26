const bcrypt = require('bcrypt');
const userRepository = require("../repositories/userRepository");
const validator = require("../validators/userValidator");
const { generateToken } = require('../utils/jwt');

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
        const hashedPassword = await bcrypt.hash(password,10)
        const user = await userRepository.createUser(email,name,hashedPassword);
        return user;
    },
    /**
     * Maneja el proceso de inicio de sesión del usuario.
     * @param {string} email - El correo electrónico del usuario.
     * @param {string} password - La contraseña del usuario.
     * @returns {string} La apiKey generada para el usuario.
     * @throws {Error} Se lanza un error si las credenciales son incorrectas.
     */
    loginUser: async (email,password) => {
        const user = await userRepository.getUserByEmail(email);
        if(!user){
            throw new Error("Credenciales incorrectas");
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            throw new Error("Credenciales incorrectas");
        }
        const token = generateToken(user);
        await userRepository.storeApiKey(user.id,token);
        return token;
    }
};