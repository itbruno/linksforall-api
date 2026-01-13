import { ResourceNotFoundError } from '@/use-cases/errors/not-found-error';
import { updateLinkUseCase } from '@/use-cases/factories/update-link-factory';
import { Request, Response } from 'express';
import * as z from 'zod';

export async function updateLinkController(req: Request, res: Response) {
  const updateLinkSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    url: z.string().url().optional(),
    type: z.string().optional(),
    pageId: z.string().optional()
  });

  const urlParamsSchema = z.object({
    id: z.string()
  });

  const { id } = urlParamsSchema.parse(req.params);
  const { title, description, url, type, pageId } = updateLinkSchema.parse(req.body);

  const linkUseCase = updateLinkUseCase();

  try {
    const { link } = await linkUseCase.execute({
      id,
      data: {
        title,
        description,
        url,
        type,
        pageId
      }
    });

    return res.status(200).send(link);

  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return res.status(404).send({ message: err.message });
    }

    return err;
  }
}
