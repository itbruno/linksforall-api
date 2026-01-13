import { ResourceNotFoundError } from '@/use-cases/errors/not-found-error';
import { deleteUserUseCase } from '@/use-cases/factories/delete-user-factory';
import { Request, Response } from 'express';
import * as z from 'zod';

export async function deleteUserController(req: Request, res: Response) {
  const paramsSchema = z.object({
    id: z.uuid(),
  });

  const { id } = paramsSchema.parse(req.params);

  if (id !== req.user?.id && req.user?.role !== 'ADMIN') {
    return res.status(403).send();
  }
  const userUseCase = deleteUserUseCase();

  try {
    await userUseCase.execute(id);
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return res.status(409).send({ message: err.message });
    }
    return err;
  }

  return res.status(204).send();

}
