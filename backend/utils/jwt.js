const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

 // Función para generar un token JWT basado en la información de usuario proporcionada
module.exports = {
    generateToken: (user) => {
        const payload = {
            id: user.id,
            email: user.email
        };
        return jwt.sign(payload,secret, {expiresIn: '1h'});
    }
};