import express from 'express';
import { resizeImg, Image } from '../../utilites/thumbnail';
import path from 'path';
import fs from 'fs/promises';

const images = express.Router();
const cache = new Map<string, Image>();

/**
 * This function is to get the api query parameters
 * And call resize function
 * And send resized image back to the client
 */
images.get('/', async (req, res) => {
    const filename = req.query.filename + '.jpg';

    //to check if origianl image avaiable
    const imagePath = path.join(__dirname, '../../../images', filename);

    try {
        await fs.access(imagePath);
    } catch (err) {
        console.log(err);
        res.status(404).json('Oringal Image cannot be found');
        return;
    }

    const width = Number(req.query.width);
    const height = Number(req.query.height);

    //crate data object
    const data: Image = {
        filename: filename,
        width: width,
        height: height
    };

    const key = JSON.stringify(data);
    const cachedImg = cache.get(key);
    if (cachedImg) {
        console.log('Serving cached images');
        const thumbnailPath = path.join(
            __dirname,
            '../../../thumbnail',
            cachedImg.filename
        );
        try {
            await fs.access(thumbnailPath);
            res.sendFile(thumbnailPath);
        } catch (err) {
            console.log(err);
            res.status(404).json('Resized Image cannot be found');
        }
    } else {
        await resizeImg(data);
        cache.set(key, data);
        res.set('Cache-Control', 'public, max-age=31536000');
        const thumbnailPath = path.join(
            __dirname,
            '../../../thumbnail',
            filename
        );
        res.status(200).sendFile(thumbnailPath);
    }
});

export default images;
