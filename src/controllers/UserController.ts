import UserModel, { UserOrderBy } from '../useCases/User';
import { User } from '@prisma/client';
import { Request, Response } from 'express';

class UserController {
  async index(req: Request, res: Response) {
    const { orderBy } = req.query;

    const users = await UserModel.findAll(orderBy as UserOrderBy ?? 'desc');

    return res.send(users).status(200);
  }

  async show(req: Request<{id: User['id']}>, res: Response) {
    const { id } = req.params;

    const user = await UserModel.findById(id);

    const userWithoutPassword = user && Object.fromEntries(
      Object.entries(user).filter(([keys]) => !keys.includes('password'))
    );

    return res.send(userWithoutPassword).status(200);
  }
}

export default new UserController();

