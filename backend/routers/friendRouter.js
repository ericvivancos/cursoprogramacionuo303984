// routers/friendRouter.js
const express = require('express');
const router = express.Router();
const friendService = require("../services/friendService");
const authMiddleware = require('../middlewares/authMiddleware');

    /**
     * Agrega un amigo a la lista de amigos del usuario.
     * @name POST/friends
     * @param {string} apiKey - La apiKey del usuario.
     * @param {string} email - El correo electrónico del amigo.
     * @returns {Object} Un mensaje indicando si la adición fue exitosa.
     * @throws {Error} Se lanza un error si el amigo no existe en el sistema.
     */
    router.post("/", authMiddleware.authenticationToken, async (req, res) => {
      const { email } = req.body; 
      try {
        await authMiddleware.verifyUserExists(email);
        await authMiddleware.verifyNotFriends(req.user.email,email);
        await friendService.addFriend(req.user.email, email);
        res.status(201).json({ message: "Amigo agregado exitosamente" });
      } catch (error) {
        console.error("Error al agregar amigo:", error.message);
        res.status(500).json({ error: error.message });
      }
    });
    router.get("/", authMiddleware.authenticationToken, async (req, res) => {
        try{
            const userEmail = req.user.email;
            const friends = await friendService.getFriends(userEmail);
            res.status(200).json(friends);
        } catch(error) {
            console.error("Error al obtener la lista de amigos:", error.message);
            res.status(500).json({ error: error.message});
        }
    });;
     /**
     * Elimina un amigo de la lista de amigos del usuario.
     * @name DELETE/friends/:email
     * @param {string} email - El correo electrónico del amigo a eliminar.
     * @throws {Error} Se lanza un error si ocurre algún problema durante la eliminación del amigo.
     */
    router.delete("/:email",authMiddleware.authenticationToken,authMiddleware.verifyUserExists ,async (req,res) => {
      const {email} = req.params;
      const {email: mainUserEmail} = req.user;
      authMiddleware.verifyFriendship(req.user,req.params)
      try{
        await friendService.removeFriend(mainUserEmail,email);
        res.status(200).json({message: "Amigo eliminado exitosamente"});
      }
      catch (error) {
        console.error("Error al eliminar amigo:", error.message);
        res.status(500).json({error: error.message});
      }
    });
module.exports = router;