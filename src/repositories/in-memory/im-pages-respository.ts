import { Pages } from 'prisma/generated/client';
import { PagesUncheckedCreateInput } from 'prisma/generated/models';
import { PagesRepository } from '../pages-repository';
import { randomUUID } from 'node:crypto';

export class InMemoryPagesRepository implements PagesRepository {
  public pages: Pages[] = [];

  async findBySlug(slug: string) {
    return this.pages.find(page => page.slug === slug) ?? null;
  }

  async create(data: PagesUncheckedCreateInput) {
    const page = {
      id: data.id || randomUUID(),
      userId: data.userId,
      title: data.title,
      description: data.description,
      slug: data.slug,
      settings: JSON.stringify(data.settings) || null
    };

    this.pages.push(page);

    return page;
  }

  async findById(id: string) {
    return this.pages.find(page => page.id === id) ?? null;
  }
}
