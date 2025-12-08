import { Pages } from 'prisma/generated/client';
import { PagesUncheckedCreateInput, PagesUncheckedUpdateInput } from 'prisma/generated/models';
import { PagesRepository } from '../pages-repository';
import { randomUUID } from 'node:crypto';
import { describe } from 'vitest';

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

  async delete(id: string) {
    const page = this.pages.find(item => item.id === id);

    if (page) {
      this.pages = this.pages.filter(page => page.id !== id);
    }
  }

  async update(data: { id: string, title?: string, description?: string, slug?: string, settings?: string}) {
    this.pages = this.pages.map((item) => {
      if (item.id === data.id) {
        return {
          id: data.id ?? item.id,
          title: data.title ?? item.title,
          description: data.description ?? item.description,
          settings: data.settings ?? item.settings,
          slug: data.slug ?? item.slug,
          userId: item.userId
        };
      }

      return item;
    });

    const currentPageIndex = this.pages.findIndex(item => item.id === data.id);
    return this.pages[currentPageIndex];
  }
}
