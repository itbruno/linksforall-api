import { prisma } from '@/lib/prisma';
import { Pages, Prisma } from '@prisma/client';

class PageModel {
  async findById(id: Pages['id']) {
    const page = await prisma.pages.findUnique({
      where: {
        id: id
      }
    });

    return page;
  }

  async findLinks(id: Pages['id']) {
    const link = await prisma.links.findMany({
      where: {
        pageId: id
      }
    });

    return link;
  }

  async findBySlug(slug: Pages['slug']) {
    const page = await prisma.pages.findUnique({
      where: {
        slug: slug
      },
    });

    return page;
  }

  async create({
    slug,
    userId
  }: Prisma.PagesUncheckedCreateInput) {
    const pageToCreate = await prisma.pages.create({
      data: {
        slug,
        userId
      }
    });

    return pageToCreate;
  }

  async update(
    id: Pages['id'],
    { slug, settings }: Prisma.PagesUncheckedUpdateInput) {
    const pageToUpdate = await prisma.pages.update({
      where: {
        id
      },
      data: {
        slug,
        settings
      }
    });

    return pageToUpdate;
  }

  async delete(id: Pages['id']) {
    const pageToDelete = await prisma.pages.delete({
      where: {
        id
      }
    });

    return pageToDelete;
  }
}

export default new PageModel();
