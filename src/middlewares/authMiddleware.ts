import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayloadProps {
  id: string;
  iat: number;
  expires: number;
}

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if(!authorization) {
    return res.status(401).send();
  }

  const token = authorization.replace('Bearer', '').trim();

  try {
    const data = jwt.verify(token, String(process.env.AUTH_TOKEN));
    const { id } = data as TokenPayloadProps;
    res.set('userId', id);

    return next();
  } catch {
    return res.status(401).send();
  }
}

export { authMiddleware };
