import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';
import { userAuthenticateUseCase } from '@/use-cases/factories/authenticate-user-factory';
import { Request, Response } from 'express';
import * as z from 'zod';
import jwt from 'jsonwebtoken';
import { env } from '@/env';

export async function authenticateUserController(req: Request, res: Response) {
  const authenticateBodySchema = z.object({
    email: z.email(),
    password: z.string().min(3)
  });

  const authenticateUseCase = userAuthenticateUseCase();

  const { email, password } = authenticateBodySchema.parse(req.body);

  try {
    const { user } = await authenticateUseCase.execute({ email, password });

    const token = jwt.sign({
      sub: user.id,
      role: user.role
    }, env.JWT_SECRET);

    return res.status(200).json({token});

  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return res.status(400).send({ message: err.message });
    }

    return err;
  }
}
