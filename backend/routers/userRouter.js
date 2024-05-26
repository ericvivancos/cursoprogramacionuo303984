/**
 * Maneja las solicitudes relacionadas con los usuarios.
 * @module UserRouter
 */
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
    })
}