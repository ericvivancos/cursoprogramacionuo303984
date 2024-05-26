/**
 * Maneja las solicitudes relacionadas con los usuarios.
 * @module UserRouter
 */
const authMiddleware = require('../middlewares/authMiddleware');
module.exports = function(app,userService){
     /**
   * Crea un nuevo usuario.
   * @name POST/users
   * @param {string} email - El correo electrónico del usuario.
   * @param {string} name - El nombre del usuario.
   * @param {string} password - La contraseña del usuario.
   * @throws {Error} Se lanza un error si ocurre algún problema durante la creación del usuario.
   */
    app.post("/users", async (req,res) => {
        const { email, name, password } = req.body;
        try{
            await userService.createUser(email,name,password);
            res.status(201).json({ message: "Usuario creado exitosamente" });
        }catch (error) {
            console.error("Error al crear usuario:", error.message);
            res.status(500).json({ error: error.message});
          }
    });
    
    /**
     * Inicia sesión de un usuario y genera un apiKey (JWT).
     * @name POST/users/login
     * @param {string} email - El correo electrónico del usuario.
     * @param {string} password - La contraseña del usuario.
     * @throws {Error} Se lanza un error si las credenciales son incorrectas.
     */
    app.post("/users/login", async (req,res) => {
        const {email,password} = req.body;
        try {
            const token = await userService.loginUser(email,password);
            res.status(200).json({apiKey : token});
        } catch(error){
            console.error("Error al iniciar sesión:" ,error.message);
            res.status(401).json({error: error.message});
        }
    });

    /**
     * Cierra la sesión del usuario, eliminando la apiKey de la lista de claves activas.
     * @name POST/users/disconnect
     * @throws {Error} Se lanza un error si ocurre algún problema al cerrar la sesión.
     */
    app.post("/users/disconnect",authMiddleware.authenticationToken, async (req,res) => {
        try{
            const apiKey = req.header('Authorization')?.split(' ')[1];
            await userService.disconnectUser(apiKey);
            res.status(200).json({ message: 'Sesión cerrada exitosamente' });
        } catch(error) {
            console.error('Error al cerrar sesión:', error.message);
            res.status(500).json({ error: error.message });
        }
    })
};