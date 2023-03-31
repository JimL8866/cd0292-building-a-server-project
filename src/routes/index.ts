import express from 'express';
import images from './api/images';

const routes = express.Router();

routes.get('/', () => {
    console.log('main routes is running');
});

routes.use('/images', images);

export default routes;
