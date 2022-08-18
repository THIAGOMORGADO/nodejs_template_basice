import express from 'express';
import cors from 'cors'


// Arquivo de rotas
import routes from './routes';

//Configuração do base dados
import "./database";

// VARIABLE CONNECTION HEROKU DEPLOY



class App {
   constructor() {
     this.server = express();
     this.middlewares();
     this.routes(); 
   }
   middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
   }
   routes(){
    this.server.use(routes);
    
   }
}

export default new App().server;