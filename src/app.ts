import express, { ErrorRequestHandler } from 'express';
import cors from 'cors';
import router from '@/http/routes';
import { ZodError } from 'zod';

export const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (error instanceof ZodError) {
    return res.status(400).send({
      message: error.message,
      issues: error.issues,
    });
  }

  if (process.env.NODE_ENV !== 'production') {
    console.error(error);
  }

  res.status(500).send({
    error: 'Server internal error',
  });

  next(error);
};

app.use(errorHandler);
