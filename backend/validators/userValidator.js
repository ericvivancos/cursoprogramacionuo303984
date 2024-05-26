/**
 * Módulo para la validación de datos de usuario.
 * @module UserValidator
 */
module.exports = {
     /**
   * Valida los datos de un usuario.
   * @param {string} email - El correo electrónico del usuario.
   * @param {string} name - El nombre del usuario.
   * @param {string} password - La contraseña del usuario.
   * @throws {Error} Se lanza un error si algún campo está vacío, si la contraseña tiene menos de 5 caracteres o si el correo electrónico no tiene un formato válido.
   */
    validateUserData: (email,name,password) => {
        console.log(email,name,password);
        if(!email || !name || !password){
            throw new Error("Todos los campos son obligatorios");
        }
        if(password.length < 5){
            throw new Error("La contraseña debe tener al menos 5 carácteres");
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          throw new Error("El email no tiene un formato válido");
        }
    }
}