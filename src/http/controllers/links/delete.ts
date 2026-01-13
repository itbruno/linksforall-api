import { ResourceNotFoundError } from '@/use-cases/errors/not-found-error';
import { deleteLinkUseCase } from '@/use-cases/factories/delete-link-factory';
import { Request, Response } from 'express';
import * as z from 'zod';

export async function deleteLinkController(req: Request, res: Response) {
  const paramsSchema = z.object({
    id: z.string()
  });

  const { id } = paramsSchema.parse(req.params);

  const linkUseCase = deleteLinkUseCase();

  try {
    await linkUseCase.execute(id);
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return res.status(404).send({ message: err.message });
    }
    return err;
  }

  return res.status(204).send();
}
