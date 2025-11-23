import { exclude } from '@/utils/exclude-keys';
import { Request, Response } from 'express';

import UserModel, { UserOrderBy } from '@/use-cases/users-use-case';
import { encryptString } from '@/utils/encrypt-string';
import { UsersUncheckedUpdateWithoutPageInput } from 'prisma/generated/models';

class UserController {
  async index(req: Request, res: Response) {
    const { orderBy } = req.query;

    const users = await UserModel.findAll(orderBy as UserOrderBy ?? 'desc');
    const usersWithoutPassword = users.map(user => exclude(user, ['password']));

    return res.send(usersWithoutPassword).status(200);
  }

  async show(req: Request<{id: string}>, res: Response) {
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
      email
    } = req.body;

    if(email.trim() == '' || password.trim() == '') {
      return res.status(400).send({
        error: 'Some fields are missing'
      });
    }

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
      email
    });

    const newUserWithoutPassword = exclude(newUser, ['password']);
    return res.send(newUserWithoutPassword).status(201);
  }

  async update(req: Request, res: Response) {
    const { id } =  req.params;
    const {
      email,
      fullname,
      password,
      profile_photo
    }: UsersUncheckedUpdateWithoutPageInput = req.body;

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

    const dataToUpdate:UsersUncheckedUpdateWithoutPageInput = {
      email,
      fullname,
      profile_photo
    };

    if (password) {
      const hashPassword = await encryptString(password.toString());
      dataToUpdate.password = hashPassword;
    }

    await UserModel.update(id, dataToUpdate);

    return res.status(204).send();
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await UserModel.delete(id);

    return res.status(202).send();
  }
}

export default new UserController();
