// routers/friendRouter.js
const express = require('express');
const router = express.Router();
const friendService = require("../services/friendService");
const authMiddleware = require('../middlewares/authMiddleware');

module.exports = (app) => {
    app.use('/friends', router);
  
    /**
     * Agrega un amigo a la lista de amigos del usuario.
     * @name POST/friends
     * @param {string} apiKey - La apiKey del usuario.
     * @param {string} email - El correo electrónico del amigo.
     * @returns {Object} Un mensaje indicando si la adición fue exitosa.
     * @throws {Error} Se lanza un error si el amigo no existe en el sistema.
     */
    router.post("/", authMiddleware.authenticationToken,authMiddleware.authFriends, async (req, res) => {
      const { email } = req.body;
  
      try {
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
    })
  };