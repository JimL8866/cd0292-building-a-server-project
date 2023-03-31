import express from 'express';
import routes from './routes/index';

const app = express();
const port = 8000;

app.use('/api', routes);

app.listen(port, () => {
    console.log(`Server is currenlty running on http://localhost:${port}`);
});

export default app;
