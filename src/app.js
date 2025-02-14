import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import routes from './routes';

class App{

    constructor(){
        this.server = express(); 

        mongoose.connect('mongodb+srv://sthefaniefernanda07:eP51y8wODc2prqxJ@cluster0.1a5vj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.server.use(
            '/files',
            express.static(path.resolve(__dirname, '..', 'uploads'))
        )

        this.server.use(express.json());
    }

    routes(){
        this.server.use(routes);
    }
}

export default new App().server;