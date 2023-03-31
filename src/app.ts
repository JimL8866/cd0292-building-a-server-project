import express, { Application } from 'express';
import routes from './routes/index';

const app: Application = express();
const port = 8000;

app.use('/api', routes);

app.listen(port, (): void => {
    console.log(`Server is currenlty running on http://localhost:${port}`);
});

export default app;
