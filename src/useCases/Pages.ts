import { prisma } from '@/services/prismaConnect';
import { Pages, Prisma } from '@prisma/client';

class PageModel {
  async findById({ id }: Pages) {
    const page = await prisma.pages.findUnique({
      where: {
        id
      }
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

  async delete({ id }: Pages) {
    const pageToDelete = await prisma.pages.delete({
      where: {
        id
      }
    });

    return pageToDelete;
  }
}

export { PageModel };
