const express = require('express');
const cors = require('cors');
const { dbConection } = require('../database/config');

class Server {

    constructor(){
        //Variables de configuración
        this.app = express();
        this.port = process.env.PORT;
        this.usuarioPath = '/api/categoria';

        //Conectar a base de datos
        this.conectarDB();

        //Middlewares
        this.middlewares();
        
        //Rutas de mi app
        this.routes();

    }


    //Metodo de conección a Mongo
    async conectarDB(){
        await dbConection();
    }

    
    middlewares(){

        //CORS
        this.app.use( cors() );

        //Lectura y parseo del body
        this.app.use( express.json() );

        //Directorio publico del proyecto
        this.app.use(  express.static('public') );

    }


    routes(){
        this.app.use( this.usuarioPath , require('../routes/categoria') );
    }


    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`)
        })
    }


}



module.exports = Server;