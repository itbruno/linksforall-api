import { EmailAlreadyExistsError } from '@/use-cases/errors/email-already-exists-error';
import { createUserUseCase } from '@/use-cases/factories/create-user-factory';
import { Request, Response } from 'express';
import * as z from 'zod';

export async function createUserController(req: Request, res: Response) {
  const createUserSchema = z.object({
    fullname: z.string(),
    email: z.email(),
    password: z.string().min(6)

  });

  const userUseCase = createUserUseCase();

  const { fullname, email, password } = createUserSchema.parse(req.body);

  try {
    const { user } = await userUseCase.execute({
      fullname,
      email,
      password
    });

    delete user.password;

    return res.status(201).send(user);

  } catch (err) {
    if (err instanceof EmailAlreadyExistsError) {
      return res.status(409).send({ message: err.message });
    }
    return err;
  }
}
