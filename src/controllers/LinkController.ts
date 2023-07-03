import { Request, Response } from 'express';
import { Links, Prisma } from '@prisma/client';

import LinksModel from '../useCases/Links';
import PagesModel from '../useCases/Pages';

class LinkController {
  async show(req: Request<{id: Links['id']}>, res: Response) {
    const { id } = req.params;

    const link = await LinksModel.findById(id);

    if(!link) {
      res.status(404).send({
        error: 'Link not found'
      });
    }

    return res.status(200).send(link);
  }

  async store(req: Request, res: Response) {
    const {
      title,
      url,
      description,
      order,
      type,
      pageId
    }: Prisma.LinksUncheckedCreateInput = req.body;

    const page = await PagesModel.findById(pageId);

    if(!pageId) {
      return res.status(400).send({
        error: 'Page id is required'
      });
    }

    if(!page?.id) {
      return res.status(404).send({
        error: 'Page not found'
      });
    }

    const newLink = await LinksModel.create({
      title,
      url,
      description,
      order,
      type,
      pageId
    });

    return res.status(201).send(newLink);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { title, description, order, type, url }: Prisma.LinksUncheckedUpdateInput = req.body;

    await LinksModel.update(id, {
      title, description, order, type, url
    });

    return res.status(202).send();
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await LinksModel.delete(id);

    return res.status(202).send();
  }
}

export default new LinkController();
