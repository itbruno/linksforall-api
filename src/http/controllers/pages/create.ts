import { PageSlugAlreadyExistsError } from '@/use-cases/errors/page-slug-already-exists-error';
import { createPageUseCase } from '@/use-cases/factories/create-page-factory';
import { Request, Response } from 'express';
import * as z from 'zod';

export async function createPageController(req: Request, res: Response) {
  const createPageSchema = z.object({
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    settings: z.object({}).optional(),
    userId: z.string()
  });

  const pageUseCase = createPageUseCase();

  const { slug, title, description, settings, userId } = createPageSchema.parse(req.body);

  try {
    const { page } = await pageUseCase.execute({
      slug,
      title,
      description,
      settings,
      userId
    });

    return res.status(201).send(page);

  } catch (err) {
    if (err instanceof PageSlugAlreadyExistsError) {
      return res.status(409).send({ message: err.message });
    }
    return err;
  }
}
