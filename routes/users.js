//!ESTE ARCHIVO CONTENDRÁ TODAS LAS RUTAS 
//ASI QUE NOS TRAEMOS LA DEPENDENCIA EXPRESS Y LAS RUTAS 

const express = require('express');
const { generateToken, verifyToken } = require('../middlewares/authMiddleware');
const users = require('../data/users');

const router = express.Router(); //

router.post('/login', (req, res) => { 
    const { username, password } = req.body; //SE HACE UN DESTRUCTURING
    const user = users.find(user => user.username === username && user.password === password);
    //AQUI PASAMOS LOS DATOS CON QUE HICIMOS LA FUNCTION //!generateToken 
    
    if (user) { 
        const token = generateToken(user); 
        req.session.token = token; 
        res.redirect('/dashboard'); 
    } else { res.status(401).json({ message: 'Credenciales incorrectas' }); 
    } //ESTE ERROR 401 ES QUE NO ESTAS AUTORIZADO
});

//NOS TRAEMOS EL MIDDLEWARE AQUI EL //!verifyToken

router.get('/dashboard', verifyToken, (req, res) => { 
    const user = users.find(user => user.id === req.user); 
    if (user) { 
        res.send(` 
            <h1>Bienvenido, ${user.name}</h1> 
            <p>ID: ${user.id}</p> 
            <p>Username: ${user.username}</p> 
            <a href="/">Inicio</a> 
            <form action="/logout" method="post"> 
                <button type="submit">Cerrar sesión</button> 
            </form> 
            `); 
        } else { res.status(401).json({ message: 'Usuario no autorizado, token invalido' }); 
        } 
});

//aquí haremos un logout para así hacer un destroy del usuario y así destruimos esa
//sesion y luego nos vamos al app.get del dashboard y creamos
//un form con el action, method y el boton de cerrar sesion para el logout

router.post('/logout', (req, res) => { 
    req.session.destroy(); 
    res.json({ mensaje: 'Has cerrado sesión'});
    res.redirect('/'); 
});

//?Exportamos ahora la ruta 'ROUTER'

module.exports = router;