import { ResourceNotFoundError } from '@/use-cases/errors/not-found-error';
import { getUserProfileUseCase } from '@/use-cases/factories/get-user-factory';
import { Request, Response } from 'express';
import * as z from 'zod';

export async function getUserProfileController(req: Request, res: Response) {
  const userParams = z.object({
    id: z.coerce.string()
  });

  const userUseCase = getUserProfileUseCase();

  const { id } = userParams.parse(req.params);

  if (id !== req.user?.id) {
    return res.status(403).send();
  }

  try {
    const { user } = await userUseCase.execute({id});
    delete user.password;

    return res.status(200).send(user);
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return res.status(404).send({ message: err.message });
    }
    return err;
  }
}
