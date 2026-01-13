import { ResourceNotFoundError } from '@/use-cases/errors/not-found-error';
import { getLinkUseCase } from '@/use-cases/factories/get-link-factory';
import { Request, Response } from 'express';
import * as z from 'zod';

export async function getLinkController(req: Request, res: Response) {
  const linkParams = z.object({
    id: z.string()
  });

  const linkUseCase = getLinkUseCase();

  const { id } = linkParams.parse(req.params);

  try {
    const { link } = await linkUseCase.execute(id);

    return res.status(200).send(link);
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return res.status(404).send({ message: err.message });
    }
    return err;
  }
}
