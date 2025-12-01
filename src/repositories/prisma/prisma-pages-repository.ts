import { PagesUncheckedCreateInput } from 'prisma/generated/models';
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

}
