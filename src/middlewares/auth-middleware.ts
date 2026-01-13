import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

declare module 'express' {
  export interface Request {
    user?: {
      id: string,
      role: 'ADMIN' | 'USER'
    }
  }
}
interface TokenPayloadProps {
  sub: string;
  role: 'ADMIN' | 'USER'
}

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if(!authorization) {
    return res.status(401).send();
  }

  const token = authorization.replace('Bearer', '').trim();

  if(!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET must be set');
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const { sub, role } = data as TokenPayloadProps;
    res.setHeader('userId', sub);

    req.user = {
      id: sub,
      role
    };

    return next();
  } catch {
    return res.status(401).send();
  }
}

export { authMiddleware };
