const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.middlewares();

        // Rutas de mi aplicación

        this.routes();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Directorio público
        this.app.use(express.static('public'));
    }   

    routes() {

        this.app.get('/api', (req, res) => {
            res.send('Hello World!');
        });

        this.app.get('/about', (req, res) => {
            res.send('About page');
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor escuchando puerto ${this.port}`);
        });
    }
}

module.exports = Server;