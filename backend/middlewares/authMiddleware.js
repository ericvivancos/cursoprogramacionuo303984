const jwt = require('jsonwebtoken');
const {query} = require("../database");
const secret = process.env.JWT_SECRET;

// Middleware para autenticación de tokens
module.exports = {
    authenticationToken: (req,res,next) => {
        const token = req.header('Authoritation')?.split(' ')[1];
        if(!token) return res.status(401).json({error: 'Acceso denegado'});

        jwt.verify(token,secret, (err, user) => {
            if(err) return res.status(403).json({error: 'Token no válido'});
            req.user = user;
            next();
        });
    }
};