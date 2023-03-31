import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

//create a Image type
type Image = {
    filename: string;
    height: number;
    width: number;
};

/**
 * This function is to create directory
 */
async function createDirectory(dir: string): Promise<void> {
    fs.access(dir, (err) => {
        if (err) {
            fs.mkdir(dir, (err) => {
                if (err) {
                    console.log('error in creating directroy');
                } else {
                    console.log('Direcory has been created successfully');
                }
            });
        }
    });
}

/**
 * This function is used to generate a thumbnail image based on the origanl image
 * and required width, height
 */
const resize = async (image: Image): Promise<void> => {
    const imageFolder = path.join(__dirname, '../../images');
    const imagePath = path.join(imageFolder, image.filename + '.jpg');
    console.log(imagePath);
    const outfolder = path.join(__dirname, '../../thumbnail');
    await createDirectory(outfolder);
    const outFile: string = path.join(
        outfolder,
        `${image.filename}_${image.width}_${image.height}.jpg`
    );
    console.log(outFile);
    console.log(image.filename);

    try {
        await sharp(imagePath)
            .resize({ width: image.width, height: image.height })
            .toFile(outFile);
        console.log('Image has been successfully resized');
    } catch (err) {
        console.log(err);
    }
};

export { resize, createDirectory, Image };
