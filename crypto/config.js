//!AQUI COLOCAREMOS LAS VARIABLES CRYPTO Y BCRYPT Y NOS TRAEMOS ESAS DEPENDENCIAS

const crypto = require('crypto');
const bcrypt = require('bcrypt');

const secret = crypto.randomBytes(64).toString('hex');
const hashedSecret = bcrypt.hashSync(secret, 10);

//?Usamos el module.exports para exportar esas dos variables (secret y hashedSecret)

module.exports = { secret, hashedSecret };