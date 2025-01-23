//!AQUI COLOCAREMOS LAS VARIABLES CRYPTO Y BCRYPT Y NOS TRAEMOS ESAS DEPENDENCIAS

const crypto = require('crypto'); //crea claves aleatorias en base a unas opciones dadas
const bcrypt = require('bcrypt'); // encripta o desencripta, hashea lo que digamos las veces que le digamos

const secret = crypto.randomBytes(64).toString('hex');
// crea una clave aleatoria de 64 digitos y lo convierte en hexadecimales
const hashedSecret = bcrypt.hashSync(secret, 10);
// encripta la clave aleatoria generada con crypto 10 veces

//?Usamos el module.exports para exportar esas dos variables (secret y hashedSecret)

module.exports = { secret, hashedSecret };