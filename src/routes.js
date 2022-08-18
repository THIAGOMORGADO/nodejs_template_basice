import { Router } from 'express';

// Controllers 
import UserController from './controller/UserController';
import RepositoriesController from './controller/RepositoriesController';
import SessionController from './controller/SessionController';

//middlewares
import Auth from './middlewares/auth';

const routes = new Router();



// Rota de Authentication JWT

routes.post('/sessions', SessionController.create);

routes.use(Auth);

// MIddleWare Jwt Authentication

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.create);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.destroy);

// Routes de repositories 

routes.get('/users/:user_id/repo', RepositoriesController.index);
routes.post('/users/:user_id/repo', RepositoriesController.create);
routes.delete('/users/:user_id/repo', RepositoriesController.destroy);


export default routes;