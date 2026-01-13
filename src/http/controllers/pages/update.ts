import { PageSlugAlreadyExistsError } from '@/use-cases/errors/page-slug-already-exists-error';
import { updatePageUseCase } from '@/use-cases/factories/update-page-factory';
import { Request, Response } from 'express';
import * as z from 'zod';

export async function updatePageController(req: Request, res: Response) {
  const updatePageSchema = z.object({
    slug: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    settings: z.object({}).optional()
  });

  const urlParamsSchema = z.object({
    id: z.string()
  });

  const { id } = urlParamsSchema.parse(req.params);
  const { slug, title, description, settings } = updatePageSchema.parse(req.body);

  const pageUseCase = updatePageUseCase();

  try {
    const { page } = await pageUseCase.execute({
      id,
      slug,
      title,
      description,
      settings
    });

    return res.status(200).send(page);

  } catch (err) {
    if (err instanceof PageSlugAlreadyExistsError) {
      return res.status(409).send({ message: err.message });
    }

    return err;
  }
}
