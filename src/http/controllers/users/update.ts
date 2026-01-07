import { ResourceNotFoundError } from '@/use-cases/errors/not-found-error';
import { updateUserUseCase } from '@/use-cases/factories/update-user-factory';
import { Request, Response } from 'express';
import * as z from 'zod';

export async function updateUserController(req: Request, res: Response) {
  const updateUserSchema = z.object({
    fullname: z.string().optional(),
    email: z.email().optional(),
    password: z.string().min(6).optional(),
    profile_photo: z.string().optional()
  });

  const urlParamsSchema = z.object({
    id: z.uuid()
  });

  const { id } = urlParamsSchema.parse(req.params);
  const { fullname, email, password, profile_photo } = updateUserSchema.parse(req.body);

  const userUseCase = updateUserUseCase();

  if (id !== req.user?.id && req.user?.role !== 'ADMIN') {
    return res.status(403).send();
  }

  try {
    const {user} = await userUseCase.execute({
      id,
      data: {
        fullname,
        email,
        password,
        profile_photo
      }
    });

    delete user.password;

    return res.status(200).send(user);

  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return res.status(404).send({ message: err.message });
    }

    return err;
  }
}
