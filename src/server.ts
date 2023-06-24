import express from 'express';
import router from './routes';

const DEFAULT_PORT = 3001;

const app = express();
app.use(express.json());
app.use(router);

app.listen(DEFAULT_PORT, () => console.log('Server is running at 3001'));
