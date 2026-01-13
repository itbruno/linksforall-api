import { ResourceNotFoundError } from '@/use-cases/errors/not-found-error';
import { getPageUseCase } from '@/use-cases/factories/get-page-factory';
import { Request, Response } from 'express';
import * as z from 'zod';

export async function getPageController(req: Request, res: Response) {
  const pageParams = z.object({
    id: z.string()
  });

  const pageUseCase = getPageUseCase();

  const { id } = pageParams.parse(req.params);

  try {
    const { page } = await pageUseCase.execute(id);

    return res.status(200).send(page);
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return res.status(404).send({ message: err.message });
    }
    return err;
  }
}
