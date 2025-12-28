import { randomUUID } from 'node:crypto';
import { Links } from 'prisma/generated/client';
import { LinksUncheckedCreateInput } from 'prisma/generated/models';
import { LinksRepository } from '../links-repository';
import { prisma } from '@/lib/prisma';

export class PrismaLinksRepository implements LinksRepository {
  private links: Links[] = [];

  async create(data: LinksUncheckedCreateInput) {
    const link = await prisma.links.create({
      data
    });

    return link;
  }

  async findById(id: string) {
    const link = await prisma.links.findUnique({
      where: {
        id
      }
    });
    return link;
  }

  async update(id: string, data: {
    title: string,
    description: string,
    url: string,
    pageId: string,
    type: string
  }) {
    const link = await prisma.links.update({
      where: {
        id
      },
      data
    });

    return link;
  }

  async delete(id: string) {
    await prisma.links.delete({
      where: {
        id
      }
    });
  }
}
