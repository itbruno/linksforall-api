import { prisma } from '@/lib/prisma';
import { Links, Prisma } from '@prisma/client';

class LinkModel {
  async findById(id: Links['id']) {
    const link = await prisma.links.findUnique({
      where: {
        id: id
      },
      include: {
        page: true
      }
    });

    return link;
  }

  async create({
    title,
    url,
    description,
    order,
    type,
    pageId
  }: Prisma.LinksUncheckedCreateInput) {
    const linkToCreate = await prisma.links.create({
      data: {
        title,
        url,
        description,
        order,
        type,
        pageId
      }
    });

    return linkToCreate;
  }

  async update(
    id: Links['id'],
    { title, description, url, order, type  }: Prisma.LinksUncheckedUpdateInput) {
    const linkToUpdate = await prisma.links.update({
      where: {
        id
      },
      data: {
        title, description, url, order, type
      }
    });

    return linkToUpdate;
  }

  async delete(id: Links['id']) {
    const linkToDelete = await prisma.links.delete({
      where: {
        id
      }
    });

    return linkToDelete;
  }
}

export default new LinkModel();
