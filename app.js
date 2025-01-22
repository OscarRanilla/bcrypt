//!1.- CONFIGURACION DEL SERVIDOR EXPRESS, SESION Y DEPENDENCIAS, RUTAS

const express = require('express');
const session = require('express-session');
const bodyparser = require('body-parser');

//NOS TRAEMOS A LA RUTA ROUTES/USERS

const usersRouter = require('./routes/users');

const app = express();
const PORT = 3000;

// Middleware para manejar datos de formulario y JSON

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//1.- Añadimos el session

app.use(
    session({
        //este secreto utiliza una clave para generar el token esta firma debe ser única
        secret: 'tu_secreto_es_secreto',
        //resave permite que si hay un cambio de sesion se guarde colocando como false, si no colocamos ese resave se guardará siempre dentro de nuestra sesion
        resave: false,
        //saveUnitialized esto se coloca en true, para que se guarde nuestra sesion de inicio
        saveUninitialized: true,
        //cookie sirve para mantener nuestra sesion en activo
        //cuando trabajamos en http lo colocamos en false y cuando estemos en https lo colocaremos en true
        cookie: { secure: false },
    })
);

app.use('/', usersRouter);
// -EXPLICACION- DE USERSROUTER

/* La línea app.use('/', usersRouter); se usa para montar el router en la aplicación 
principal de Express. Esto significa que todas las rutas definidas en el usersRouter 
estarán disponibles a partir de la raíz ('/') de tu aplicación. En otras 
palabras, cualquier ruta definida en el archivo routes/users.js se podrá acceder 
a través de la URL principal de la aplicación.
Por ejemplo:

Si en usersRouter defines una ruta /login, en tu navegador podrás acceder a ella con http://localhost:3000/login.

Si defines una ruta /dashboard, podrás acceder a ella con http://localhost:3000/dashboard. */

app.get('/', (req, res) => { 
    if (req.session.token) { 
        res.send(` 
            <a href="/dashboard">Dashboard</a> 
            <form action="/logout" method="post"> 
                <button type="submit">Cerrar sesión</button> 
            </form> 
        `); 
    } else { 
        res.send(` 
            <form action="/login" method="post"> 
                <label for="username">Usuario:</label> 
                <input type="text" id="username" name="username" required><br> 
                <label for="password">Contraseña:</label> 
                <input type="password" id="password" name="password" required><br> 
                <button type="submit">Iniciar sesión</button> 
            </form> 
        `); 
    } 
});

//!escuchamos al servidor con el puerto

app.listen(PORT, () => {
    console.log(`listening server on port http://localhost:${PORT}`);
});