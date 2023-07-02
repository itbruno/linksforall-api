import { Request, Response } from 'express';
import { Pages, Prisma } from '@prisma/client';

import UserModel from '../useCases/User';
import PageModel from '../useCases/Pages';

class PageController {
  async show(req: Request<{id: Pages['id']}>, res: Response) {
    const { id } = req.params;

    const page = await PageModel.findById(id);

    if(!page) {
      res.status(404).send({
        error: 'Page not found'
      });
    }

    return res.status(200).send(page);
  }

  async store(req: Request, res: Response) {
    const {
      slug,
      settings,
      userId
    }: Prisma.PagesUncheckedCreateInput = req.body;

    const getUserId = await UserModel.findById(userId);

    if(!userId || userId !== getUserId?.id) {
      return res.status(404).send({
        error: 'User not found'
      });
    }

    const slugAlreadyExists = await PageModel.findBySlug(slug);
    if(slugAlreadyExists) {
      return res.status(409).send({
        error: 'The slug already exists.'
      });
    }

    const newPage = await PageModel.create({
      userId,
      slug,
      settings
    });

    return res.status(201).send(newPage);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { settings, slug }: Pages = req.body;

    if(!slug || slug.trim() == '') {
      return res.status(400).send({
        error: 'Slug is required'
      });
    }

    const currentSlug = await PageModel.findBySlug(slug);
    const currentPageSlug = await PageModel.findById(id);

    if(currentSlug && currentPageSlug?.slug !== slug) {
      return res.status(409).send({
        error: 'The slug already exists.'
      });
    }

    await PageModel.update(id, {
      settings,
      slug: currentSlug?.slug === slug ? currentSlug.slug : slug
    });

    return res.status(202).send();
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await PageModel.delete(id);

    return res.status(202).send();
  }
}

export default new PageController();
