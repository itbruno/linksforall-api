import { exclude } from '../utils/excludeKeys';
import { User } from '@prisma/client';
import { Request, Response } from 'express';

import UserModel, { UserOrderBy } from '../useCases/User';
import { encryptString } from '../services/encryptString';

class UserController {
  async index(req: Request, res: Response) {
    const { orderBy } = req.query;

    const users = await UserModel.findAll(orderBy as UserOrderBy ?? 'desc');

    return res.send(users).status(200);
  }

  async show(req: Request<{id: User['id']}>, res: Response) {
    const { id } = req.params;

    const user = await UserModel.findById(id);

    if(!user) {
      res.status(404).send({
        error: 'User not found'
      });
    }

    const userWithoutPassword = user && exclude(user, ['password']);

    return res.send(userWithoutPassword).status(200);
  }

  async store(req: Request, res: Response) {
    const {
      fullname,
      password,
      email,
      slug
    } = req.body;

    const hashPassword = await encryptString(password);

    const userAlreadyExists = await UserModel.findByEmail(email);

    if(userAlreadyExists) {
      return res.status(409).send({
        error: 'The e-mail already exists.'
      });
    }

    const newUser = await UserModel.create({
      fullname,
      password: hashPassword,
      email,
      slug
    });

    const newUserWithoutPassword = exclude(newUser, ['password']);
    return res.send(newUserWithoutPassword).status(201);
  }

  async update(req: Request, res: Response) {
    const { id } =  req.params;
    const {
      email,
      fullname,
      bio,
      password,
      profile_photo,
      slug
    }: User= req.body;

    const userExists = await UserModel.findById(id);

    if(!userExists) {
      return res.status(404).send({
        error: 'User not found'
      });
    }

    if(!fullname) {
      return res.status(400).send({
        error: 'Fullname is required'
      });
    }

    const userEmail = await UserModel.findByEmail(email);
    if(userEmail && id !== userEmail.id) {
      return res.status(400).send({
        error: 'This e-mail is already in use',
      });
    }

    const hashPassword = await encryptString(password);

    await UserModel.update(id, {
      fullname,
      email,
      bio,
      password: hashPassword,
      profile_photo,
      slug
    });

    return res.status(204).send();
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await UserModel.delete(id);

    return res.status(202).send();
  }
}

export default new UserController();

