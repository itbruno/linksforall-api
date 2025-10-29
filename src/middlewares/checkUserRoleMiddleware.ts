import { NextFunction, Request, Response} from 'express';

function checkUserRoleMiddleware(role: 'ADMIN' | 'USER') {
  return async function(req: Request, res: Response, next: NextFunction) {
    const currentUserRole = req.user?.role;

    if(currentUserRole !== role) {
      return res.status(401).send();
    }

    return next();
  };
}

export {checkUserRoleMiddleware};
