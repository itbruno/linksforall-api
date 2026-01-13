import { ResourceNotFoundError } from '@/use-cases/errors/not-found-error';
import { createLinkUseCase } from '@/use-cases/factories/create-link-factory';
import { Request, Response } from 'express';
import * as z from 'zod';

export async function createLinkController(req: Request, res: Response) {
  const createLinkSchema = z.object({
    title: z.string(),
    description: z.string(),
    url: z.string().url(),
    type: z.string(),
    pageId: z.string()
  });

  const linkUseCase = createLinkUseCase();

  const { title, description, url, type, pageId } = createLinkSchema.parse(req.body);

  try {
    const { link } = await linkUseCase.execute({
      title,
      description,
      url,
      type,
      pageId
    });

    return res.status(201).send(link);

  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return res.status(404).send({ message: err.message });
    }
    return err;
  }
}
