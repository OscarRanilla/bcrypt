//*ESTE ARCHIVO MANEJARÁ LA GENERACIÓN Y VERIFICACIÓN DE LOS TOKENS

//*NOS TRAEMOS LA VARIABLE Y DEPENDENCIA JWT (JSON WEB TOKEN)

const jwt = require('jsonwebtoken');

//NOS TRAEMOS LA VARIBALE SECRET CON LA RUTA DE LA CARPETA CRYPTO/CONFIG

const { secret } = require('../crypto/config');

//?GENERAMOS EL TOKEN CON LA DEPENDENCIA DE LIBRERIA JWT
//!TAMBIEN SE LE PASA EL SECRETO QUE SERÍA LA VARIABLE QUE CREAMOS 
//!CON EL CRYPTO QUE ES 'SECRET' Y EL TIEMPO DE EXPIRACION DE 1 HORA

function generateToken(user) { 
    return jwt.sign({ user: user.id }, secret, { expiresIn: '1h' }); }


//*HACEMOS ESA VERIFICACION CON EL MIDDLEWARE

function verifyToken(req, res, next) { 
    const token = req.session.token; 
    if (!token) { 
        return res.status(401).json({ message: 'Token no generado' }); 
    }         
    jwt.verify(token, secret, (err, decoded) => { 
        if (err) { 
            return res.status(401).json({ message: 'Token inválido' }); 
        } 
        req.user = decoded.user; 
        next(); //SIEMPRE COLOCAR EL NEXT PORQUE SINO DA ERROR Y NO PASA AL SIGUIENTE SE ESTANCA
    }); 
}

//!EXPORTAMOS ESTE CODIGO CON LAS FUNCIONES CREADAS

module.exports = { generateToken, verifyToken };
