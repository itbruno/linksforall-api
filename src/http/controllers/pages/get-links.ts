import { ResourceNotFoundError } from '@/use-cases/errors/not-found-error';
import { getPageLinksUseCase } from '@/use-cases/factories/get-page-links-factory';
import { Request, Response } from 'express';
import * as z from 'zod';

export async function getPageLinksController(req: Request, res: Response) {
  const pageParams = z.object({
    id: z.string()
  });

  const pageUseCase = getPageLinksUseCase();

  const { id } = pageParams.parse(req.params);

  try {
    const { links } = await pageUseCase.execute(id);

    return res.status(200).send(links);
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return res.status(404).send({ message: err.message });
    }
    return err;
  }
}
