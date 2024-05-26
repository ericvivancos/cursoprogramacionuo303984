/**
 * Maneja las solicitudes relacionadas con los usuarios.
 * @module presenRouter
 */
const authMiddleware = require('../middlewares/authMiddleware');
module.exports = function(app,userService,presentService){
     /**
     * Crea un nuevo regalo.
     * @name POST/presents
     * @param {string} apiKey - La apiKey del usuario.
     * @param {string} name - El nombre del regalo.
     * @param {string} description - La descripción del regalo.
     * @param {string} url - La URL del regalo.
     * @param {number} price - El precio del regalo.
     * @throws {Error} Se lanza un error si ocurre algún problema durante la creación del regalo.
     */
    app.post("/presents",authMiddleware.authenticationToken, async(req,res) => {
        const {name,description,url,price} = req.body;
        try{
            const present = await presentService.createPresent(req.user.id,name,description,url,price);
            res.status(201).json({ message: "Regalo creado exitosamente", present });
        } catch (error) {
            console.error("Error al crear regalo:", error.message);
            res.status(500).json({ error: error.message });
        }
    })
}