const jwt = require('jsonwebtoken');
const {query} = require("../database");
const presentRepository = require('../repositories/presentRepository');
const secret = process.env.JWT_SECRET;

// Middleware para autenticación de tokens
module.exports = {
    authenticationToken: (req,res,next) => {
        const token = req.header('Authorization')?.split(' ')[1];
        if(!token) return res.status(401).json({error: 'Acceso denegado'});

        jwt.verify(token,secret, (err, user) => {
            if(err) return res.status(403).json({error: 'Token no válido'});
            req.user = user;
            next();
        });
    },
    /**
     * Verifica que al regalo al que se quiere acceder, tiene el usuario permisos
     */
    verifyPresentOwner: async (req,res,next) => {
        const presentId = parseInt(req.params.id, 10);
        const present = await presentRepository.getPresentById(presentId);
        console.log(present);
        if(!present){
            return res.status(404).json({ error: "Regalo no encontrado"});
        }
        if(present.user_id !== req.user.id) {
            return res.status(403).json({ error: "No tiene permiso para acceder a este regalo"});
        }
        next();
    }
};