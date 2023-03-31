import supertest from 'supertest';
// import routes from "../routes/index";
import app from '../app';

const request = supertest(app);

describe('Test endpoint response', () => {
    it('gets the main route api endpoint', async () => {
        const response = await request.get('/api');
        expect(response.status).toBe(200);
    });

    it('gets the corret images api endpoint', async () => {
        const response = await request.get(
            '/api/images?filename=palmtunnel&width=500&height=500'
        );
        expect(response.status).toBe(200);
    });

    it('gets the incorret images api endpoint', async () => {
        const response = await request.get(
            '/api/images?filename=palmtnel&width=500&height=500'
        );
        expect(response.status).toBe(404);
        expect(response.body).toEqual('Oringal Image cannot be found');
    });
});
