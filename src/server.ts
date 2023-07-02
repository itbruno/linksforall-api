import express, { ErrorRequestHandler } from 'express';
import router from './routes';

const DEFAULT_PORT = 3001;

const app = express();
app.use(express.json());
app.use(router);

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.error(error);
  res.status(500).send({
    error: 'Server internal error',
  });

  next(error);
};

app.use(errorHandler);

app.listen(DEFAULT_PORT, () => console.log('Server is running at 3001'));
