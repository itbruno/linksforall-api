import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import UserModel from '@/useCases/User';

class AuthController {
  async authenticate(req: Request, res: Response) {
    const {
      password,
      email
    } = req.body;

    if(!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET must be set');
    }

    const user = await UserModel.findByEmail(email);

    if(email.trim() == '' || password.trim() == '') {
      return res.status(400).send({
        error: 'Some fields are missing'
      });
    }

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

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET ?? '', {
      expiresIn: '1d'
    });

    return res.status(200).send({
      token,
    });

  }
}

export default new AuthController();

