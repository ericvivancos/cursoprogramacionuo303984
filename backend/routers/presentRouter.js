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
    });
    /**
     * Lista los regalos de un usuario específico si son amigos.
     * @name GET/presents
     * @param {string} userEmail - El correo electrónico del usuario cuyos regalos se quieren listar.
     * @throws {Error} Se lanza un error si ocurre algún problema durante la obtención de los regalos.
     */
    app.get("/presents", authMiddleware.authenticationToken, authMiddleware.verifyFriendhip, async (req, res) => {
       const { userEmail } = req.query;

       try {
           const presents = await presentService.getPresentsByUserEmail(userEmail);
           res.status(200).json(presents);
       } catch (error) {
           console.error("Error al obtener los regalos:", error.message);
           res.status(500).json({ error: error.message });
       }
    });
    /**
    * Lista todos los regalos creados por el usuario autenticado.
    * @name GET/presents
    * @param {string} apiKey - La apiKey del usuario.
    * @returns {Array} Una lista de regalos creados por el usuario.
    * @throws {Error} Se lanza un error si ocurre algún problema al obtener los regalos.
    */
   app.get("/presents",authMiddleware.authenticationToken,async(req,res) => {
        try{
            const presents = await presentService.getPresentsByUserId(req.user.id);
            res.status(200).json(presents);
        } catch (error) {
            console.error("Error al obtener regalos:", error.message);
            res.status(500).json({ error: error.message });
        }
   });
    /**
    * Obtiene un regalo por su ID.
    * @name GET/presents/:id
    * @param {string} apiKey - La apiKey del usuario.
    * @param {number} id - El ID del regalo.
    * @returns {Object} El regalo encontrado.
    * @throws {Error} Se lanza un error si el regalo no pertenece al usuario o si no se encuentra.
    */
    app.get("/presents/:id", authMiddleware.authenticationToken,authMiddleware.verifyPresentOwner, async(req,res) => {
        const presentId = parseInt(req.params.id, 10);
        try{
            const present = await presentService.getPresentById(req.user.id, presentId);
            res.status(200).json(present);
        } catch (error) {
            console.error("Error al obtener el regalo:", error.message);
            res.status(403).json({ error: error.message});
        }
    });
    /**
    * Elimina un regalo por su ID.
    * @name DELETE/presents/:id
    * @param {string} apiKey - La apiKey del usuario.
    * @param {number} id - El ID del regalo.
    * @returns {Object} Un mensaje indicando si la eliminación fue exitosa.
    * @throws {Error} Se lanza un error si el regalo no pertenece al usuario o si no se encuentra.
    */
    app.delete("/presents/:id", authMiddleware.authenticationToken, authMiddleware.verifyPresentOwner, async(req,res) => {
        const presentId = parseInt(req.params.id,10);
        try{
            await presentService.deletePresent(presentId);
            res.status(200).json({ message: "Regalo eliminado exitosamente"});
        } catch(error) {
            console.error("Error al eliminar regalo:", error.message);
            res.status(500).json({ error: error.message});
        }
    });
    /**
    * Modifica un regalo por su ID.
    * @name PUT/presents/:id
    * @param {string} apiKey - La apiKey del usuario.
    * @param {number} id - El ID del regalo.
    * @param {Object} presentData - Los datos del regalo a modificar.
    * @param {string} presentData.name - El nombre del regalo.
    * @param {string} presentData.description - La descripción del regalo.
    * @param {string} presentData.url - La URL del regalo.
    * @param {number} presentData.price - El precio del regalo.
    * @returns {Object} Un mensaje indicando si la modificación fue exitosa.
    * @throws {Error} Se lanza un error si el regalo no pertenece al usuario o si no se encuentra.
    */
    app.put("/presents/:id", authMiddleware.authenticationToken, authMiddleware.verifyPresentOwner, async (req,res) => {
        const presentId = parseInt(req.params.id,10);
        const presentData = req.body;

        try{
            await presentService.updatePresent(req.user.id, presentId, presentData);
            res.status(200).json({ message: "Regalo modificado exitosamente"});
        } catch (error) {
            console.error("Error al modificar regalo:", error.message);
            res.status(500).json({ error: error.message});
        }
    });
    
}