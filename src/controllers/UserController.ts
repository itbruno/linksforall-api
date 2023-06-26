import bcrypt, { hash } from 'bcrypt';
import { exclude } from '../utils/excludeKeys';
import { User } from '@prisma/client';
import { Request, Response } from 'express';

import UserModel, { UserOrderBy } from '../useCases/User';

class UserController {
  async index(req: Request, res: Response) {
    const { orderBy } = req.query;

    const users = await UserModel.findAll(orderBy as UserOrderBy ?? 'desc');

    return res.send(users).status(200);
  }

  async show(req: Request<{id: User['id']}>, res: Response) {
    const { id } = req.params;

    const user = await UserModel.findById(id);

    const userWithoutPassword = user && exclude(user, ['password']);

    return res.send(userWithoutPassword).status(200);
  }

  async store(req: Request, res: Response) {
    const {
      fullname,
      password,
      email,
    } = req.body;

    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);

    const userAlreadyExists = await UserModel.findByEmail(email);

    if(userAlreadyExists) {
      return res.status(409).send({
        error: 'The e-mail already exists.'
      });
    }

    const newUser = await UserModel.create({
      fullname,
      password: hashPassword,
      email
    });

    const newUserWithoutPassword = exclude(newUser, ['password']);

    return res.send(newUserWithoutPassword).status(201);
  }
}

export default new UserController();

