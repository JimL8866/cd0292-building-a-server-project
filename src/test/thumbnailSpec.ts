import { resizeImg, Image } from '../utilites/thumbnail';
import path from 'path';
import fs from 'fs';

describe('resizeImg function', () => {
    it('should resize the image and save it in the thumbnail directory', async () => {
        const image: Image = {
            filename: 'encenadaport.jpg',
            width: 100,
            height: 100
        };
        // const imagePath = path.join(__dirname, '../../images', image.filename);
        const outfolder = path.join(__dirname, '../../thumbnail');
        const outFile: string = path.join(outfolder, image.filename);

        //Clean up the test files before running the test
        if (fs.existsSync(outFile)) {
            fs.unlinkSync(outFile);
            console.log('delete');
        }

        await resizeImg(image);

        // Check if the output file exists
        const outputFileExists = fs.existsSync(outFile);
        expect(outputFileExists).toBe(true);
    });
});
