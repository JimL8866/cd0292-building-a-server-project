import express from 'express';
import images from './api/images';

const routes = express.Router();

routes.get('/', (req, res): void => {
    console.log('main routes is running');
    res.status(200).send('main route is running');
});

routes.use('/images', images);

export default routes;
