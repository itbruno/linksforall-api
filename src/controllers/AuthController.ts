import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import UserModel from '../useCases/User';
import { exclude } from '@/utils/excludeKeys';

class AuthController {
  async authenticate(req: Request, res: Response) {
    const {
      password,
      email
    } = req.body;

    const user = await UserModel.findByEmail(email);

    if(!user) {
      return res.status(401).send({
        error: 'Wrong e-mail or password'
      });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if(!passwordIsValid) {
      return res.status(401).send({
        error: 'Wrong e-mail or password'
      });
    }

    const token = jwt.sign({ id: user.id }, String(process.env.AUTH_TOKEN), {
      expiresIn: '1d'
    });

    return res.status(200).send({
      user: {
        id: user.id,
        name: user.fullname,
        profile_photo: user.profile_photo
      },
      token,
    });

  }
}

export default new AuthController();

