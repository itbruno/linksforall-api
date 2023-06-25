import { prisma } from '@/services/prismaConnect';
import { Links } from '@prisma/client';

class LinkModel {
  async findById({ id }: Links) {
    const link = await prisma.links.findUnique({
      where: {
        id
      },
    });

    return link;
  }

  async findManyByUserId({userId}:Links ) {
    const links = await prisma.links.findMany({
      where: {
        userId
      }
    });

    return links;
  }

  async create(linkData: Links) {
    const newLink = await prisma.links.create({
      data: linkData
    });

    return newLink;
  }

  async delete({id}: Links) {
    const deletedLink = await prisma.links.delete({
      where: {
        id
      }
    });

    return deletedLink;
  }

  async update(linkData: Links) {
    const updateLink = await prisma.user.update({
      where: {
        id: linkData.id,
      },
      data: linkData
    });

    return updateLink;
  }
}

export { LinkModel };
