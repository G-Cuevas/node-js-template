const express = require('express');
const cors = require('cors');
const dbConnection = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';
        this.authPath = '/api/auth';

        // Conectar a base de datos
        this.connectDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio público
        this.app.use(express.static('public'));
    }   

    routes() {
        this.app.use(this.usersPath, require('../routes/users-routes'));
        this.app.use(this.authPath, require('../routes/auth-routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor escuchando puerto ${this.port}`);
        });
    }
}

module.exports = Server;