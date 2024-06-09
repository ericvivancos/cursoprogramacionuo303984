const jwt = require("jsonwebtoken");
const friendRepository = require("../repositories/friendRepository");
const presentRepository = require("../repositories/presentRepository");
const userRepository = require("../repositories/userRepository")
const secret = process.env.JWT_SECRET;

/**
 * Middleware para la autenticación del token JWT.
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} res - El objeto de respuesta.
 * @param {Function} next - La función next.
 */
const authenticationToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Acceso denegado" });
  jwt.verify(token, secret, (err, user) => {
    if (err) return res.status(403).json({ error: "Token no válido" });
    req.user = user;
    next();
  });
};

/**
 * Verifica si el usuario es propietario del regalo.
 * @param {number} userId - ID del usuario.
 * @param {number} presentId - ID del regalo.
 * @throws {Error} Si el regalo no pertenece al usuario o no se encuentra.
 */
const verifyPresentOwner = async (userId, presentId) => {
    const present = await presentRepository.getPresentById(presentId);
    if (!present) {
      throw new Error("Regalo no encontrado");
    }
    if (present.user_id !== userId) {
      throw new Error("No tiene permiso para acceder a este regalo");
    }
  };
  

/**
 * Verifica si dos usuarios son amigos.
 * @param {string} userEmail - Email del usuario.
 * @param {string} friendEmail - Email del amigo.
 * @throws {Error} Si no son amigos.
 */
const verifyFriendship = async (userEmail, friendEmail) => {
    const areFriends = await friendRepository.areFriends(userEmail, friendEmail);
    if (!areFriends) {
      throw new Error("No tienes permiso para ver los regalos de este usuario");
    }
  };
/**
 * Verifica si el regalo no ha sido elegido por otro usuario.
 * @param {Object} present - El objeto del regalo.
 * @param {string} userEmail - Email del usuario actual.
 * @throws {Error} Si el regalo ya ha sido elegido por otro usuario.
 */
const verifyNotChosen = async (present, userEmail) => {
    if (present.chosen_by) {
      throw new Error("El regalo ya ha sido elegido por otro usuario");
    }
    if (present.user_email === userEmail) {
      throw new Error("No puedes elegir tu propio regalo");
    }
  };
/**
 * Middleware para verificar que el usuario no se agregue a sí mismo como amigo.
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} res - El objeto de respuesta.
 * @param {Function} next - La función next.
 */
const verifyNotFriends = async (userEmail, friendEmail) => {
        const areFriends = await friendRepository.areFriends(userEmail,friendEmail);
        if (areFriends) {
          throw new Error("Ya está agregado en la lista de amigos");
        }
  };
  
/**
 * Middleware para verificar que un usuario existe en la base de datos.
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} res - El objeto de respuesta.
 * @param {Function} next - La función next.
 */
const verifyUserExists = async (email) => {
  console.log(email);
        const user = await userRepository.getUserByEmail(email);
        if (!user) {
            throw new Error("Usuario no encontrado");
        } 
};
  

module.exports = {
  authenticationToken,
  verifyPresentOwner,
  verifyFriendship,
  verifyNotFriends,
  verifyUserExists,
  verifyNotChosen,
};
