import express from 'express';
import { resize, Image } from '../../utilites/thumbnail';
import { fileExists, inputValidation } from '../../utilites/validation';
import path from 'path';

const images = express.Router();

/**
 * This function is to get the api query parameters
 * validate input query data
 * check if cached image available, then sever it
 * Otherwise resized image, then server it
 */
images.get('/', async (req, res): Promise<void> => {
    const filename = req.query.filename;
    const width = req.query.width;
    const height = req.query.height;

    //input sanitizing
    if (!inputValidation(filename, width, height)) {
        res.status(400).json(
            'Invalid Request! Please check your Query Parameters'
        );
        return;
    }

    const originalImg = path.join(
        __dirname,
        '../../../images',
        filename + '.jpg'
    );

    //to check if origianl image avaiable
    if (!fileExists(originalImg)) {
        res.status(404).json(
            'Cannot find your Original Image that need to be processed!'
        );
        return;
    }

    /**
     * check if resized image(cached image) exists
     * if not exists, start resizing
     */
    const resizedImg = path.join(
        __dirname,
        '../../../thumbnail',
        `${filename}_${width}_${height}.jpg`
    );

    if (fileExists(resizedImg)) {
        res.status(200).sendFile(resizedImg);
        console.log('Serving cached image');
    } else {
        //create data object
        const data: Image = {
            filename: filename as string,
            width: Number(width),
            height: Number(height)
        };
        await resize(data);
        res.status(200).sendFile(resizedImg);
        console.log('Serving first resized image');
    }
});

export default images;
