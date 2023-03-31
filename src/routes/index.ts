import express, { Request, Response, Router } from 'express';
import images from './api/images';

const routes: Router = express.Router();

routes.get('/', (req: Request, res: Response): void => {
    console.log('main routes is running');
    res.status(200).send('main route is running');
});

routes.use('/images', images);

export default routes;
