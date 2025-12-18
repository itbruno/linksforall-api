import { randomUUID } from 'node:crypto';
import { Links } from 'prisma/generated/client';
import { LinksUncheckedCreateInput } from 'prisma/generated/models';
import { LinksRepository } from '../links-repository';

export class InMemoryLinksRepository implements LinksRepository {
  private links: Links[] = [];

  async create(data: LinksUncheckedCreateInput) {
    const link = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description,
      url: data.url,
      type: data.type,
      pageId: data.pageId,
      createdAt: new Date()
    };

    this.links.push(link);
    return link;
  }

  async findById(id: string) {
    const link = this.links.find(link => link.id === id) || null;
    return link;
  }

  async update(id: string, data: {
    title: string,
    description: string,
    url: string,
    pageId: string,
    type: string
  }) {
    this.links = this.links.map((item) => {
      if (item.id === id) {
        return {
          id,
          title: data.title ?? item.title,
          description: data.description ?? item.description,
          url: data.url ?? item.url,
          pageId: data.pageId ?? item.pageId,
          type: data.type,
          createdAt: item.createdAt
        };
      }

      return item;
    });

    const currentLinkIndex = this.links.findIndex(item => item.id === id);

    return this.links[currentLinkIndex];
  }

  async delete(id: string) {
    const listWithDeletedLink = this.links.filter(link => link.id !== id);

    this.links = listWithDeletedLink;
  }
}
