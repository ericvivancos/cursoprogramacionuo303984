/**
 * Maneja las solicitudes relacionadas con los usuarios.
 * @module presenRouter
 */
const express = require('express');
const router = express.Router();
const presentService = require('../services/presentService');
const authMiddleware = require('../middlewares/authMiddleware');
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
    router.post("/",authMiddleware.authenticationToken, async(req,res) => {
        const {name,description,url,price} = req.body;
        try{
            await presentService.createPresent(req.user.id,name,description,url,price);
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
    /**
     * Lista los regalos de un usuario específico si son amigos.
     * @name GET/presents
     * @param {string} userEmail - El correo electrónico del usuario cuyos regalos se quieren listar.
     * @throws {Error} Se lanza un error si ocurre algún problema durante la obtención de los regalos.
     */
    router.get("/", authMiddleware.authenticationToken, async (req, res) => {
        const { userEmail } = req.query;

        if (userEmail) {
            // Listar los regalos de un usuario específico si son amigos
            try {
                await authMiddleware.verifyUserExists(userEmail);
                await authMiddleware.verifyFriendship(req.user.email, userEmail);               
                await presentService.getPresentsByUserEmail(userEmail);
                res.status(200).json(presents);
            } catch (error) {
                console.error("Error al obtener los regalos:", error.message);
                res.status(500).json({ error: error.message });
            }
        } else {
            // Listar todos los regalos creados por el usuario autenticado
            try {
                const presents = await presentService.getPresentsByUserId(req.user.id);
                res.status(200).json(presents);
            } catch (error) {
                console.error("Error al obtener regalos:", error.message);
                res.status(500).json({ error: error.message });
            }
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
    router.get("/:id", authMiddleware.authenticationToken, async(req,res) => {
        const presentId = parseInt(req.params.id, 10);
        try{
            await authMiddleware.verifyPresentOwner(req.user.id,presentId);
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
    router.delete("/:id", authMiddleware.authenticationToken, async(req,res) => {
        const presentId = parseInt(req.params.id,10);
        try{
            await authMiddleware.verifyPresentOwner(req.user.id,presentId);
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
    router.put("/:id", authMiddleware.authenticationToken, async (req,res) => {
        const presentId = parseInt(req.params.id,10);
        const presentData = req.body;
        try{
            const present = await presentService.getPresentById(presentId);
           console.log(present);
            //Actualización por el dueño del regalo
            if(Object.keys(presentData).length > 0){
                await authMiddleware.verifyPresentOwner(req.user.id,presentId);
                await presentService.updatePresent(req.user.id, presentId, presentData);
                res.status(200).json({ message: "Regalo modificado exitosamente"});
            }
            else {
                await authMiddleware.verifyFriendship(req.user.email,present.user_email);
                await authMiddleware.verifyNotChosen(present, req.user.email);
                await presentService.updatePresentForFriend(presentId, req.user.email);
                res.status(200).json({ message: "Regalo elegido exitosamente" });
            }
        } catch (error) {
            console.error("Error al modificar regalo:", error.message);
            res.status(500).json({ error: error.message});
        }
    });
    
module.exports = router;