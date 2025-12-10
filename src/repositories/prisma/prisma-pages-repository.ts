import { PagesCreateInput, PagesUncheckedCreateInput, PagesUncheckedUpdateInput, PagesUpdateInput, PagesUpdateWithoutLinksInput } from 'prisma/generated/models';
import { PagesRepository } from '../pages-repository';
import { prisma } from '@/lib/prisma';

export class PrismaPagesRepository implements PagesRepository {
  async findBySlug(slug: string) {
    const page = await prisma.pages.findUnique({
      where: {
        slug
      }
    });

    return page;
  }

  async create(data: PagesUncheckedCreateInput){
    const page = await prisma.pages.create({
      data
    });

    return page;
  }

  async findById(id: string) {
    const page = await prisma.pages.findUnique({
      where: {
        id
      }
    });

    return page;
  }

  async delete(id: string) {
    await prisma.pages.delete({
      where: {
        id
      }
    });
  }

  async update(data: {
    id: string,
    title: string,
    description: string,
    slug: string,
    settings: string
  }) {
    const page = await prisma.pages.update({
      where: {
        id: data.id
      },
      data
    });

    return page;
  }
}
